"""Generate the French voice-over lines with Piper (voice: fr-siwis-medium)."""
import sys, wave
from piper import PiperVoice, SynthesisConfig

model, outdir = sys.argv[1], sys.argv[2]
B = "Foréveur Braillte"
LINES = [
    ("vo1", "Et si votre routine avait une touche de fraîcheur en plus ?"),
    ("vo2", f"Découvrez {B} Toutjel."),
    ("vo3", "Une formule à l'aloé véra et à la propolisse, avec une douce saveur de menthe."),
    ("vo4", "Sans fluor, pour toute la famille : une sensation de bouche propre et fraîche, jour après jour."),
    ("vo5", "Faites de votre sourire, un rituel de soin."),
    ("vo6", f"{B}. Commandez dès maintenant sur Ouattsape."),
]
voice = PiperVoice.load(model)
cfg = SynthesisConfig(length_scale=1.08, noise_scale=0.6, noise_w_scale=0.7)
for name, text in LINES:
    with wave.open(f"{outdir}/{name}.wav", "wb") as w:
        voice.synthesize_wav(text, w, syn_config=cfg)
    with wave.open(f"{outdir}/{name}.wav") as r:
        print(name, round(r.getnframes() / r.getframerate(), 2), "s")
