import re
import string
from indicnlp.tokenize import indic_tokenize
from indicnlp.normalize.indic_normalize import IndicNormalizerFactory

class MultilingualPreprocessor:
    def __init__(self):
        self.normalizer_factory = IndicNormalizerFactory()
        # Normalizers for Tamil and Malayalam
        self.tn_normalizer = self.normalizer_factory.get_normalizer("ta")
        self.ml_normalizer = self.normalizer_factory.get_normalizer("ml")

    def clean_text(self, text):
        # Remove URLs
        text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)
        # Remove User Mentions
        text = re.sub(r'@\w+', '', text)
        # Remove Emojis (Optional: can be kept for sentiment)
        # text = text.encode('ascii', 'ignore').decode('ascii')
        # Remove Punctuation
        text = text.translate(str.maketrans('', '', string.punctuation))
        # Remove extra whitespace
        text = " ".join(text.split())
        return text

    def preprocess_indic(self, text, lang="ta"):
        # Normalize Indic text
        if lang == "ta":
            text = self.tn_normalizer.normalize(text)
        elif lang == "ml":
            text = self.ml_normalizer.normalize(text)
        
        # Tokenize
        tokens = indic_tokenize.trivial_tokenize(text)
        return " ".join(tokens)

    def full_pipeline(self, text, lang="en"):
        text = self.clean_text(text)
        if lang in ["ta", "ml"]:
            text = self.preprocess_indic(text, lang)
        return text.lower()
