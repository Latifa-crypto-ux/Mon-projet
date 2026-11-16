"""Original soundtrack for the Forever Bright ad: music + SFX, ducked under the voice-over.
Usage: python3 soundtrack.py <vo_dir> <out_dir>   (vo_dir holds vo1..vo6.wav resampled to 44.1 kHz)"""
import sys, wave
import numpy as np

SR, DUR = 44100, 30.0
N = int(SR * DUR)
rng = np.random.default_rng(7)
t_all = np.arange(N) / SR
vo_dir, out_dir = sys.argv[1], sys.argv[2]

def mtof(m): return 440.0 * 2 ** ((m - 69) / 12)
def env_adsr(n, a, r):
    e = np.ones(n); a, r = int(a * SR), int(r * SR)
    if a: e[:a] = np.linspace(0, 1, a) ** 2
    if r: e[-r:] *= np.linspace(1, 0, r) ** 2
    return e
def place(buf, sig, t0, gain=1.0, pan=0.0):
    i = int(t0 * SR); j = min(N, i + len(sig))
    if j <= i: return
    l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
    buf[0, i:j] += sig[: j - i] * gain * l * 1.414
    buf[1, i:j] += sig[: j - i] * gain * r * 1.414

def reverb(x, secs=2.6, mix=0.32, seed=1):
    n = int(secs * SR); g = np.random.default_rng(seed)
    out = np.zeros_like(x)
    for ch in range(2):
        ir = g.standard_normal(n) * np.exp(-np.arange(n) / SR * 6.9 / secs)
        ir = np.convolve(ir, np.ones(8) / 8, "same")  # darken
        ir /= np.sqrt((ir ** 2).sum())
        L = len(x[ch]) + n - 1; F = 1 << (L - 1).bit_length()
        wet = np.fft.irfft(np.fft.rfft(x[ch], F) * np.fft.rfft(ir, F), F)[: len(x[ch])]
        out[ch] = x[ch] * (1 - mix) + wet * mix
    return out

# ---------- harmony: F maj9 · D m9 · Bb maj7 · C6sus · F maj9 · F maj9 (5 s each) ----------
CHORDS = [
    (41, [57, 60, 64, 67]), (38, [53, 57, 60, 64]), (34, [53, 57, 62, 65]),
    (36, [55, 60, 62, 69]), (41, [57, 60, 64, 67]), (41, [57, 60, 64, 69, 72]),
]
CH = 5.0
BEAT = 60 / 96

music = np.zeros((2, N))
# Pad
for k, (bass, notes) in enumerate(CHORDS):
    t0 = k * CH; d = CH + 1.2 if k < 5 else CH
    n = int(d * SR); t = np.arange(n) / SR
    for m in notes:
        f = mtof(m); s = np.zeros(n)
        for det in (-0.12, 0.0, 0.11):
            ff = f * 2 ** (det / 12)
            s += np.sin(2 * np.pi * ff * t + rng.uniform(0, 6)) + 0.25 * np.sin(4 * np.pi * ff * t) + 0.08 * np.sin(6 * np.pi * ff * t)
        s *= (1 + 0.15 * np.sin(2 * np.pi * 0.25 * t + m)) * env_adsr(n, 1.0 if k else 2.5, 1.4 if k < 5 else 4.5)
        place(music, s, t0, 0.010, pan=(m % 5 - 2) * 0.18)
# Sub bass, from 4 s, soft pulses on beats
for k, (bass, _) in enumerate(CHORDS):
    for b in range(int(CH / BEAT) + 1):
        tb = k * CH + b * BEAT
        if tb < 4.0 or tb > 26.2: continue
        n = int(BEAT * 1.05 * SR); t = np.arange(n) / SR
        s = np.sin(2 * np.pi * mtof(bass + 12) * t) * np.exp(-t * 2.2) * env_adsr(n, 0.02, 0.05)
        place(music, s, tb, 0.10)
# Plucked arpeggio (8ths) 4 s → 26 s
for k, (bass, notes) in enumerate(CHORDS):
    pat = notes + notes[-2:0:-1]
    for i in range(int(CH / (BEAT / 2))):
        tb = k * CH + i * BEAT / 2
        if tb < 4.0 or tb >= 26.0: continue
        m = pat[i % len(pat)] + 12
        n = int(1.4 * SR); t = np.arange(n) / SR; f = mtof(m)
        s = sum(np.sin(2 * np.pi * f * h * t) * np.exp(-t * (3.5 + 2.5 * h)) / h ** 1.3 for h in (1, 2, 3, 4))
        s *= env_adsr(n, 0.004, 0.05)
        vel = 0.75 + 0.25 * (i % 2 == 0)
        place(music, s, tb, 0.030 * vel, pan=-0.35 if i % 2 else 0.35)
# Drums: soft kick from 9 s, hats from 9 s, stop at 26 s
for b in range(int(30 / BEAT)):
    tb = b * BEAT
    if 9.0 <= tb < 26.0:
        n = int(0.35 * SR); t = np.arange(n) / SR
        f = 48 + 70 * np.exp(-t * 28)
        kick = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9)
        place(music, kick, tb, 0.20 if b % 2 == 0 else 0.11)
    for half in (0.5,):
        th = tb + BEAT * half
        if 9.0 <= th < 26.0:
            n = int(0.06 * SR); t = np.arange(n) / SR
            hat = np.diff(rng.standard_normal(n + 1)) * np.exp(-t * 70)
            place(music, hat, th, 0.012, pan=0.25)
music = reverb(music, 2.8, 0.38)

# ---------- SFX ----------
sfx = np.zeros((2, N))
def droplet(t0):
    n = int(0.35 * SR); t = np.arange(n) / SR
    f = 600 + 1500 * np.exp(-t * 45)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 18)
    place(sfx, s, t0, 0.20)
    nn = int(0.25 * SR); tt = np.arange(nn) / SR
    splash = np.diff(rng.standard_normal(nn + 1)) * np.exp(-tt * 30)
    place(sfx, splash, t0 + 0.01, 0.04)
def whoosh(t_peak, d=1.1, g=0.10):
    n = int(d * SR); t = np.arange(n) / SR
    x = rng.standard_normal(n)
    a = np.exp(-((t - d * 0.7) / (d * 0.22)) ** 2)
    lp = np.convolve(x, np.ones(24) / 24, "same")
    place(sfx, lp * a, t_peak - d * 0.7, g, pan=-0.3); place(sfx, lp[::-1] * a, t_peak - d * 0.7, g * 0.7, pan=0.3)
def shimmer(t0, base=84):
    for i, m in enumerate([base, base + 4, base + 7, base + 12, base + 16]):
        n = int(1.6 * SR); t = np.arange(n) / SR
        s = (np.sin(2 * np.pi * mtof(m) * t) + 0.3 * np.sin(2 * np.pi * mtof(m) * 2.76 * t)) * np.exp(-t * 3.2)
        place(sfx, s * env_adsr(n, 0.003, 0.1), t0 + i * 0.07, 0.016, pan=-0.5 + i * 0.25)
droplet(0.80)                 # drop hits the aloe leaf (frame 24)
whoosh(4.15, 1.3, 0.07)       # into the product reveal
shimmer(5.65)                 # gold light sweep on the tube
whoosh(9.0, 1.0, 0.08)        # into ingredients
whoosh(12.15, 0.9, 0.06)      # aloe → propolis slide
whoosh(15.0, 1.1, 0.08)       # into freshness
for i, tt in enumerate([17.33, 18.4, 19.47]): shimmer(tt, 91 + i * 2)  # benefit lines appear
whoosh(22.0, 1.2, 0.08)       # into final
shimmer(26.7, 79)             # end card
sfx = reverb(sfx, 1.6, 0.25, seed=3)

# ---------- voice-over ----------
VO_AT = {"vo1": 0.5, "vo2": 4.6, "vo3": 9.4, "vo4": 15.3, "vo5": 22.5, "vo6": 26.0}
vo = np.zeros(N)
for name, t0 in VO_AT.items():
    with wave.open(f"{vo_dir}/{name}.wav") as w:
        assert w.getframerate() == SR
        x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(float) / 32768
    i = int(t0 * SR); vo[i:i + len(x)] += x[: N - i]
vo = vo / np.abs(vo).max() * 0.80
# gentle presence: tiny high-shelf via first difference blend
vo = vo + 0.15 * np.concatenate([[0], np.diff(vo)])
vo_st = np.vstack([vo, vo])

# ---------- duck music under voice ----------
env = np.convolve(np.abs(vo), np.ones(int(0.25 * SR)) / (0.25 * SR), "same")
duck = 1 - 0.55 * np.clip(env / 0.05, 0, 1)
k = int(0.12 * SR); duck = np.convolve(duck, np.ones(k) / k, "same")
music = music / np.sqrt((music ** 2).mean()) * 0.075
bed = music * duck + sfx * (0.85 + 0.15 * duck)
fade = np.ones(N); fl = int(1.8 * SR); fade[-fl:] = np.linspace(1, 0, fl) ** 1.5
fade[: int(0.05 * SR)] = np.linspace(0, 1, int(0.05 * SR))
bed *= fade

def write(path, x):
    x = np.tanh(x * 1.1) / np.tanh(1.1)
    data = (np.clip(x, -1, 1).T * 32767).astype(np.int16)
    with wave.open(path, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(data.tobytes())
write(f"{out_dir}/soundtrack.wav", bed)
write(f"{out_dir}/voiceover.wav", vo_st)
write(f"{out_dir}/mix.wav", bed + vo_st)
rms = lambda a: 20 * np.log10(np.sqrt((a ** 2).mean()) + 1e-9)
print("music+sfx RMS dBFS:", round(rms(bed), 1), " voice RMS (speech parts):", round(rms(vo[np.abs(env) > 0.02]), 1))
