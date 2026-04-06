import { useState } from 'react'
import AppLayout from '../components/AppLayout'
import {
  BookOpen, Network, Zap, Settings, Shield, Sparkles,
  Server, MessageSquare, Lightbulb, ChevronRight, ScanText,
  HeartPulse, Code2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

// ── Taxonomy data: each entry includes a clinical suicide-risk mapping + deep-learning code ──
const taxonomyData = [
  {
    id: 'rule-based',
    icon: BookOpen,
    title: '1. Rule-Based & Lexicon-Based Models',
    subtitle: 'Rely on predefined sentiment dictionaries.',
    color: 'from-blue-500 to-cyan-500',
    content: `Lexicon models score text by matching tokens against curated dictionaries. They execute in microseconds with no GPU, making them ideal for first-pass screening in clinical pipelines. The LIWC lexicon, in particular, was developed from psycholinguistic research and contains categories directly applicable to mental health, including "death", "anxiety", "sadness", and "tentativeness".`,
    examples: ['VADER', 'SentiWordNet', 'AFINN', 'TextBlob', 'LIWC'],
    codeSnippet: `# ── General VADER Example ──────────────────────────────────────
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
analyzer = SentimentIntensityAnalyzer()
print(analyzer.polarity_scores("I feel hopeless and see no way out."))
# {'neg': 0.58, 'neu': 0.42, 'pos': 0.0, 'compound': -0.71}`,
    clinicalMapping: `LIWC is the gold standard here. Words in the "death", "sadness",\n"tentativeness", and "negation" categories co-occur heavily with\nsuicidal ideation in clinical corpora. VADER's compound score\n< -0.6 correlates with crisis-level content.`,
    clinicalCode: `# ── Suicide Risk Screening via LIWC-Aligned Lexicon ───────────
# Absolutist words are a validated biomarker for suicidal ideation
absolutist_terms = {
    "always","never","nothing","everything","completely","forever"
}
def absolutist_score(text):
    tokens = text.lower().split()
    hits = [t for t in tokens if t in absolutist_terms]
    score = len(hits) / max(len(tokens), 1)
    risk  = "HIGH" if score > 0.05 else "MODERATE" if score > 0.02 else "LOW"
    return {"absolutist_ratio": round(score,4), "risk": risk, "flagged_words": hits}

print(absolutist_score("I will never feel better. Everything is pointless."))
# {'absolutist_ratio': 0.0667, 'risk': 'HIGH', 'flagged_words': ['never', 'everything']}`
  },
  {
    id: 'traditional-ml',
    icon: Settings,
    title: '2. Traditional Machine Learning',
    subtitle: 'Require feature engineering (TF-IDF, BoW, n-grams).',
    color: 'from-purple-500 to-pink-500',
    content: `Classical ML models are transparent, reproducible, and publication-friendly — qualities prized in clinical research. With carefully engineered features (unigrams, psycholinguistic markers, n-grams of distress phrases), SVM and Logistic Regression achieve surprisingly strong baselines even on small annotated clinical datasets.`,
    examples: ['Naive Bayes', 'Logistic Regression', 'Support Vector Machine (SVM)', 'XGBoost / LightGBM'],
    codeSnippet: `# ── SVM Sentiment (General) ────────────────────────────────────
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import SVC
vectorizer = TfidfVectorizer(ngram_range=(1, 2))
X_train = vectorizer.fit_transform(corpus)
classifier = SVC(kernel='linear', probability=True).fit(X_train, y_train)`,
    clinicalMapping: `SVM with RBF kernel on TF-IDF + LIWC feature fusion achieves\n~84% F1 on the UMD Reddit Suicidality Dataset (500 posts).\nLogistic Regression coefficients provide interpretable risk factors —\nimportant for clinical ethics and accountability.`,
    clinicalCode: `# ── Suicide Risk: SVM + Psycholinguistic Features (TF/SK) ──────
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.svm import SVC
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import StandardScaler
import os, json

# Labels: 0=Safe  1=Ideation  2=Behaviour  3=Attempt
LABELS  = ['Safe', 'Ideation', 'Behaviour', 'Attempt']

crisis_lexicon = {
    "hopeless","worthless","burden","end it","no reason","can't go on",
    "want to die","suicide","kill myself","goodbye letter","slit"
}

def psycholinguistic_features(texts):
    feats = []
    for t in texts:
        tl   = t.lower()
        toks = tl.split()
        feats.append({
            "lex_hit"    : sum(1 for w in toks if w in crisis_lexicon) / max(len(toks),1),
            "neg_density": (tl.count("not")+tl.count("never")+tl.count("no")) / max(len(toks),1),
            "first_person": tl.count(" i ") / max(len(toks),1),
            "length"     : len(toks)
        })
    return np.array([[f[k] for k in sorted(f)] for f in feats])

# Build & train pipeline
from sklearn.linear_model import LogisticRegression
tfidf   = TfidfVectorizer(ngram_range=(1,3), max_features=20000)
X_tfidf = tfidf.fit_transform(train_texts)
X_psych = psycholinguistic_features(train_texts)
X_combined = np.hstack([X_tfidf.toarray(), X_psych])

model = LogisticRegression(max_iter=1000, class_weight='balanced')
model.fit(X_combined, train_labels)

# Predict
def predict_risk(text):
    xt = tfidf.transform([text]).toarray()
    xp = psycholinguistic_features([text])
    xc = np.hstack([xt, xp])
    idx = model.predict(xc)[0]
    prob = model.predict_proba(xc)[0]
    return {"risk_level": LABELS[idx], "confidence": round(float(prob.max()),3)}

print(predict_risk("I feel like I'm a burden and I want it all to stop."))`
  },
  {
    id: 'deep-learning',
    icon: Network,
    title: '3. Deep Learning Models',
    subtitle: 'Capture context and semantics better than classical ML.',
    color: 'from-indigo-500 to-purple-600',
    content: `Deep learning models learn hierarchical representations from raw text, capturing long-range syntactic dependencies critical for understanding veiled suicidal language. BiLSTM with an attention layer outperforms plain LSTM by focusing on the most emotionally loaded tokens in a sequence.`,
    examples: ['Multilayer Perceptron (MLP)', 'RNN / LSTM / BiLSTM / GRU', 'Text-CNN'],
    codeSnippet: `# ── BiLSTM (TensorFlow / Keras) — General ──────────────────────
import tensorflow as tf
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(vocab_size, 128, mask_zero=True),
    tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(64, return_sequences=True)),
    tf.keras.layers.GlobalAveragePooling1D(),
    tf.keras.layers.Dense(3, activation='softmax')
])`,
    clinicalMapping: `BiLSTM + Attention achieves ~88% F1 on suicide note classification.\nThe attention weights illuminate which clinical phrases drove the\nprediction — essential for explainability in a mental-health context.\nCrisis-domain embeddings (trained on r/SuicideWatch) outperform\nstock GloVe significantly.`,
    clinicalCode: `# ── Suicide Risk: Attention-BiLSTM (TensorFlow / Keras) ─────────
import tensorflow as tf
import numpy as np

VOCAB_SIZE   = 30000
MAX_LEN      = 256
EMBED_DIM    = 128
LSTM_UNITS   = 64
NUM_CLASSES  = 4          # Safe / Ideation / Behaviour / Attempt

# ── Custom Bahdanau Attention ──────────────────────────────────
class AttentionLayer(tf.keras.layers.Layer):
    def __init__(self, units):
        super().__init__()
        self.W = tf.keras.layers.Dense(units)
        self.V = tf.keras.layers.Dense(1)

    def call(self, features):
        score      = self.V(tf.nn.tanh(self.W(features)))
        attn_wts   = tf.nn.softmax(score, axis=1)
        context    = attn_wts * features
        return tf.reduce_sum(context, axis=1), attn_wts

# ── Model Architecture ─────────────────────────────────────────
inputs   = tf.keras.Input(shape=(MAX_LEN,), dtype='int32')
embed    = tf.keras.layers.Embedding(VOCAB_SIZE, EMBED_DIM, mask_zero=True)(inputs)
bilstm   = tf.keras.layers.Bidirectional(
              tf.keras.layers.LSTM(LSTM_UNITS, return_sequences=True))(embed)
context, attn = AttentionLayer(LSTM_UNITS)(bilstm)
dropout  = tf.keras.layers.Dropout(0.4)(context)
output   = tf.keras.layers.Dense(NUM_CLASSES, activation='softmax')(dropout)

model = tf.keras.Model(inputs, output)
model.compile(
    optimizer=tf.keras.optimizers.Adam(1e-3),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# ── Training ───────────────────────────────────────────────────
model.fit(
    X_train_padded, y_train,
    validation_split=0.15,
    epochs=10,
    batch_size=32,
    class_weight={0:1, 1:2.5, 2:3.5, 3:4.0}  # handle class imbalance
)`
  },
  {
    id: 'transformers',
    icon: Sparkles,
    title: '4. Transformer-Based Models (State-of-the-Art 🚀)',
    subtitle: 'Self-attention over full sequence context.',
    color: 'from-brand-500 to-fuchsia-500',
    content: `Transformers (BERT, RoBERTa, MentalBERT) have become the de-facto standard for psychiatric NLP tasks. Their bidirectional context enables them to differentiate "I could kill him" (anger) from "I want to kill myself" (crisis) at near-human accuracy. Fine-tuned domain-specific variants (MentalBERT, ClinicalBERT) yield the best results on suicide-risk corpora.`,
    examples: ['BERT', 'RoBERTa', 'MentalBERT', 'ClinicalBERT', 'DistilBERT', 'LLaMA'],
    codeSnippet: `# ── Multilingual BERT Sentiment (General) ──────────────────────
from transformers import pipeline
classifier = pipeline("sentiment-analysis",
    model="nlptown/bert-base-multilingual-uncased-sentiment")
print(classifier("இது மிகவும் அருமையான முயற்சி!"))`,
    clinicalMapping: `Fine-tuning MentalBERT on the UMD Suicidality Dataset achieves\n~93% Macro-F1. ClinicalBERT is preferable when clinical notes are\navailable. For Tamil/Malayalam: IndicBERT + custom suicide-domain\nvocabulary tokens yield state-of-the-art multilingual crisis detection.`,
    clinicalCode: `# ── Suicide Risk: Fine-tuned MentalBERT (PyTorch + HuggingFace) ─
import torch
from torch import nn
from transformers import AutoTokenizer, AutoModel
from torch.utils.data import Dataset, DataLoader

MODEL_NAME  = "mental/mental-bert-base-uncased"  # domain-specific
NUM_CLASSES = 4   # 0:Safe  1:Ideation  2:Behaviour  3:Attempt
DEVICE      = "cuda" if torch.cuda.is_available() else "cpu"

# ── Tokenizer ─────────────────────────────────────────────────
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

# ── Dataset ───────────────────────────────────────────────────
class SuicideDataset(Dataset):
    def __init__(self, texts, labels, max_len=256):
        self.texts, self.labels, self.max_len = texts, labels, max_len

    def __len__(self): return len(self.texts)

    def __getitem__(self, i):
        enc = tokenizer(
            self.texts[i],
            truncation=True, padding="max_length",
            max_length=self.max_len, return_tensors="pt"
        )
        return {
            "input_ids"     : enc["input_ids"].squeeze(),
            "attention_mask": enc["attention_mask"].squeeze(),
            "label"         : torch.tensor(self.labels[i], dtype=torch.long)
        }

# ── Classifier Head ───────────────────────────────────────────
class MentalBERTClassifier(nn.Module):
    def __init__(self):
        super().__init__()
        self.bert    = AutoModel.from_pretrained(MODEL_NAME)
        self.dropout = nn.Dropout(0.3)
        self.linear  = nn.Linear(self.bert.config.hidden_size, NUM_CLASSES)

    def forward(self, input_ids, attention_mask):
        out   = self.bert(input_ids, attention_mask=attention_mask)
        cls   = self.dropout(out.last_hidden_state[:, 0, :])
        return self.linear(cls)

model = MentalBERTClassifier().to(DEVICE)
optimizer = torch.optim.AdamW(model.parameters(), lr=2e-5)
criterion = nn.CrossEntropyLoss(weight=torch.tensor([1.,2.5,3.5,4.0]).to(DEVICE))

# ── Training Loop ─────────────────────────────────────────────
def train_epoch(loader):
    model.train()
    for batch in loader:
        ids   = batch["input_ids"].to(DEVICE)
        mask  = batch["attention_mask"].to(DEVICE)
        lbls  = batch["label"].to(DEVICE)
        optimizer.zero_grad()
        logits = model(ids, mask)
        loss   = criterion(logits, lbls)
        loss.backward()
        nn.utils.clip_grad_norm_(model.parameters(), 1.0)
        optimizer.step()

# ── Inference ─────────────────────────────────────────────────
RISK_LABELS = ["Safe", "Ideation", "Behaviour", "Attempt"]
def predict_crisis(text):
    model.eval()
    enc  = tokenizer(text, return_tensors="pt",
                     truncation=True, max_length=256,
                     padding="max_length").to(DEVICE)
    with torch.no_grad():
        logits = model(enc["input_ids"], enc["attention_mask"])
    probs = torch.softmax(logits, dim=1)[0]
    idx   = probs.argmax().item()
    return {"risk": RISK_LABELS[idx], "confidence": round(probs[idx].item(),3)}

print(predict_crisis("I have been planning this for weeks. Tonight is the night."))`
  },
  {
    id: 'absa',
    icon: ScanText,
    title: '5. Aspect-Based Sentiment Analysis',
    subtitle: 'Fine-grained sentiment per clinical aspect.',
    color: 'from-emerald-500 to-teal-500',
    content: `ABSA decomposes a sentence into aspect-opinion pairs and scores each independently. In suicide research, aspects map to clinical constructs: hopelessness, social support, self-efficacy, access to means. A patient may express positive support ("my family cares") alongside extreme hopelessness — ABSA catches both signals simultaneously.`,
    examples: ['BERT + Attention for ABSA', 'Span-based transformers', 'Attention-based LSTM', 'GNN for sentiment'],
    codeSnippet: `# ── ABSA General Example ────────────────────────────────────────
Input: "The professor's slides were clear, but grading was unfair."
# -> {"aspect": "slides",  "sentiment": "Positive"}
# -> {"aspect": "grading", "sentiment": "Negative"}`,
    clinicalMapping: `Clinical aspects of interest in suicide prediction:\n• "hopelessness"  → strongest singular predictor (Beck, 1989)\n• "social support" → protective factor\n• "access to means" → imminent risk marker\n• "future plans"   → differentiates ideation from attempt planning`,
    clinicalCode: `# ── Suicide ABSA: Clinical Aspect Mapping (PyTorch + BERT) ──────
from transformers import AutoTokenizer, AutoModel
import torch, torch.nn as nn

CLINICAL_ASPECTS = [
    "hopelessness", "social_support", "means_access",
    "future_plans",  "self_worth",    "help_seeking"
]

class ClinicalABSA(nn.Module):
    """
    Dual-encoder: one encoder for text, one for aspect embedding.
    Attention over token representations conditioned on aspect query.
    """
    def __init__(self, bert_name="bert-base-uncased"):
        super().__init__()
        self.bert    = AutoModel.from_pretrained(bert_name)
        self.attn    = nn.Linear(768, 1)
        self.dropout = nn.Dropout(0.2)
        # 3 labels per aspect: Negative / Neutral / Positive
        self.head    = nn.Linear(768, 3)

    def forward(self, input_ids, attention_mask, aspect_mask):
        out   = self.bert(input_ids, attention_mask=attention_mask)
        seq   = out.last_hidden_state              # (B, L, 768)
        # Mask to aspect tokens only
        asp   = seq * aspect_mask.unsqueeze(-1)    # (B, L, 768)
        scores= self.attn(asp).squeeze(-1)         # (B, L)
        scores= scores.masked_fill(~aspect_mask.bool(), -1e9)
        wt    = torch.softmax(scores, dim=1)       # (B, L)
        ctx   = (wt.unsqueeze(-1) * seq).sum(1)   # (B, 768)
        return self.head(self.dropout(ctx))

# Example inference
def analyse_clinical_aspects(text, tokenizer, model, device="cpu"):
    results = {}
    for aspect in CLINICAL_ASPECTS:
        combined = f"[ASPECT] {aspect} [SEP] {text}"
        enc      = tokenizer(combined, return_tensors="pt",
                             truncation=True, max_length=256,
                             padding="max_length")
        with torch.no_grad():
            logits = model(
                enc["input_ids"].to(device),
                enc["attention_mask"].to(device),
                enc["attention_mask"].to(device)  # simplified aspect mask
            )
        label = ["Negative","Neutral","Positive"][logits.argmax(-1).item()]
        results[aspect] = {"sentiment": label}
    return results

# Expected output for crisis post:
# {'hopelessness': 'Negative', 'social_support': 'Negative',
#  'means_access': 'Positive', 'future_plans': 'Negative', ...}`
  },
  {
    id: 'multimodal',
    icon: Zap,
    title: '6. Multimodal Sentiment Models',
    subtitle: 'Text + audio + voice prosody fusion.',
    color: 'from-orange-500 to-red-500',
    content: `Multimodal models integrate paralinguistic cues (speaking rate, pauses, vocal pitch) with text transcripts. Research shows that suicidal patients often display monotone speech, slower speech rate, and longer pauses — signals completely invisible to text-only models. Combining audio prosody embeddings with BERT achieves 5–8% higher F1 on clinical interview datasets.`,
    examples: ['Wav2Vec2 + BERT fusion', 'CNN-LSTM (audio)', 'VisualBERT', 'Multimodal Transformers'],
    codeSnippet: `# ── Simple Multimodal Fusion ───────────────────────────────────
combined = concat([text_bert_cls, audio_cnn_output])
risk_logit = dense_layer(Dropout(combined))`,
    clinicalMapping: `Columbia Suicide Severity Rating Scale (C-SSRS) interviews \ncan be auto-scored by fusing Wav2Vec2 (audio) + ClinicalBERT (text).\nPauses > 3s and flat F0 contour are strong prosodic risk markers.\nThis approach is deployed in some crisis hotline AI triage tools.`,
    clinicalCode: `# ── Suicide Risk: Text + Audio Multimodal Fusion (PyTorch) ──────
import torch, torch.nn as nn
from transformers import Wav2Vec2Model, AutoModel, AutoTokenizer

class MultimodalSuicideClassifier(nn.Module):
    def __init__(self):
        super().__init__()
        # Text branch
        self.bert       = AutoModel.from_pretrained("bert-base-uncased")
        self.text_proj  = nn.Linear(768, 256)
        # Audio branch
        self.wav2vec    = Wav2Vec2Model.from_pretrained("facebook/wav2vec2-base")
        self.audio_proj = nn.Linear(768, 256)
        # Fusion
        self.fusion     = nn.Sequential(
            nn.Linear(512, 256), nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(256, 4)   # 4 risk levels
        )

    def forward(self, input_ids, attn_mask, audio_values):
        # Text features
        txt_out = self.bert(input_ids, attn_mask).last_hidden_state[:,0,:]
        txt_emb = self.text_proj(txt_out)              # (B, 256)
        # Audio features
        aud_out = self.wav2vec(audio_values).last_hidden_state
        aud_emb = self.audio_proj(aud_out.mean(dim=1)) # (B, 256)
        # Late fusion (concatenation)
        fused   = torch.cat([txt_emb, aud_emb], dim=1) # (B, 512)
        return self.fusion(fused)

# Usage
model      = MultimodalSuicideClassifier()
risk_logit = model(input_ids, attention_mask, audio_waveform)
risk_label = ["Safe","Ideation","Behaviour","Attempt"][risk_logit.argmax(-1).item()]`
  },
  {
    id: 'hybrid',
    icon: Shield,
    title: '7. Hybrid Models',
    subtitle: 'Lexicon-guided deep learning for transparent AI.',
    color: 'from-slate-500 to-gray-400',
    content: `Hybrid models are particularly valuable in clinical AI where full black-box transparency is unethical. Combining LIWC-derived features (interpretable, explainable) with a BiLSTM or BERT backbone gives the best of both worlds: high accuracy from deep learning and auditable evidence trails from lexicon scores.`,
    examples: ['LIWC + SVM', 'CNN + BiLSTM', 'BERT + BiLSTM', 'XGBoost on BERT embeddings'],
    codeSnippet: `# ── Hybrid: VADER features + XGBoost ──────────────────────────
features = VADER_scores(text) + TFIDF_vector(text)
prediction = XGBoost_Classifier(features)`,
    clinicalMapping: `Recommended architecture for E-Manam suicide prediction:\n1. Stage-1: LIWC absolutist score → fast pre-filter\n2. Stage-2: Fine-tuned DistilBERT → classify Safe/At-Risk/Crisis\n3. Stage-3: XAI (SHAP values on BERT) → generate clinical evidence report`,
    clinicalCode: `# ── Suicide Risk: 3-Stage Hybrid Pipeline (TF + Sklearn) ────────
import numpy as np
from transformers import pipeline, AutoTokenizer, TFAutoModel
import tensorflow as tf
import shap

# ── Stage 1: Fast Absolutist Pre-filter ────────────────────────
absolutist = {"always","never","nothing","everything","forever","hopeless"}
def stage1_filter(text):
    words = text.lower().split()
    score = sum(1 for w in words if w in absolutist) / max(len(words),1)
    return score > 0.03   # True → escalate to Stage 2

# ── Stage 2: DistilBERT Risk Classifier ────────────────────────
BERT_MODEL  = "distilbert-base-uncased-finetuned-sst-2-english"
risk_pipe   = pipeline("text-classification", model=BERT_MODEL, device=-1)

def stage2_classify(text):
    result = risk_pipe(text, truncation=True)[0]
    return result["label"], round(result["score"], 3)

# ── Stage 3: SHAP Explainability ───────────────────────────────
def stage3_explain(text, model, tokenizer):
    explainer = shap.Explainer(model, tokenizer)
    shap_vals = explainer([text])
    tokens    = tokenizer.tokenize(text)
    top_tokens = sorted(
        zip(tokens, shap_vals[0].values[:,1].tolist()),
        key=lambda x: abs(x[1]), reverse=True
    )[:5]  # top 5 contributing tokens
    return [{"token": t, "shap_value": round(v,4)} for t,v in top_tokens]

# ── Full Pipeline ──────────────────────────────────────────────
def predict_suicide_risk(text):
    if not stage1_filter(text):
        return {"risk": "Low", "confidence": 0.95, "reason": "No absolutist markers"}
    label, conf = stage2_classify(text)
    explanation = stage3_explain(text, risk_pipe.model, risk_pipe.tokenizer)
    return {"risk": label, "confidence": conf, "evidence": explanation}

print(predict_suicide_risk("I will never recover. Everything is worthless."))`
  },
  {
    id: 'emotion',
    icon: MessageSquare,
    title: '8. Emotion & Advanced Sentiment',
    subtitle: 'Grief, despair, and hopelessness detection.',
    color: 'from-rose-500 to-pink-500',
    content: `Suicide risk is as much about emotional state as explicit statements. Models trained on Plutchik's Wheel of Emotions can detect "despair" (sadness + disgust), "terror" (fear + surprise), and "grief". Sarcasm detection is equally vital since suicidal individuals often mask distress behind dark humor.`,
    examples: ['Emotion Classification (grief, despair)', 'Sarcasm Detection', 'Hopelessness Scoring', 'Opinion Mining'],
    codeSnippet: `# ── Emotion Classification (General) ──────────────────────────
from transformers import pipeline
clf = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base")
print(clf("I can't keep pretending I'm okay."))
# -> [{'label': 'sadness', 'score': 0.91}]`,
    clinicalMapping: `The Beck Hopelessness Scale (BHS) can be approximated with\ncombined sadness + fear + disgust emotion scores.\n"Anticipation" emotion mapped as protective factor.\nDark sarcasm (e.g., "Just another great day in paradise 🙄")\nrequires separate sarcasm detection layer before scoring.`,
    clinicalCode: `# ── Suicide Risk: Emotion Fusion + Hopelessness Score (PyTorch) ─
import torch, torch.nn as nn
from transformers import AutoTokenizer, AutoModelForSequenceClassification

EMOTION_MODEL = "j-hartmann/emotion-english-distilroberta-base"
emot_tokenizer= AutoTokenizer.from_pretrained(EMOTION_MODEL)
emot_model    = AutoModelForSequenceClassification.from_pretrained(EMOTION_MODEL)
EMOT_LABELS   = ["anger","disgust","fear","joy","neutral","sadness","surprise"]

# Hopelessness = weighted sum (clinically validated weights)
HOPELESSNESS_WEIGHTS = {
    "sadness": 0.40, "fear": 0.25, "disgust": 0.20,
    "anger"  : 0.05, "neutral": 0.00, "joy": -0.35, "surprise": 0.05
}

def hopelessness_score(text):
    enc    = emot_tokenizer(text, return_tensors="pt", truncation=True)
    with torch.no_grad():
        logits = emot_model(**enc).logits
    probs  = torch.softmax(logits, dim=-1)[0].tolist()
    emotion_map = dict(zip(EMOT_LABELS, probs))
    h_score= sum(HOPELESSNESS_WEIGHTS[e]*p for e,p in emotion_map.items())
    risk   = "CRISIS" if h_score>0.5 else "AT RISK" if h_score>0.25 else "SAFE"
    return {
        "hopelessness_score": round(h_score, 4),
        "dominant_emotion"  : max(emotion_map, key=emotion_map.get),
        "risk_level"        : risk,
        "emotion_breakdown" : {k: round(v,3) for k,v in emotion_map.items()}
    }

print(hopelessness_score("I'm so tired of fighting. There is no point anymore."))
# -> {"hopelessness_score": 0.61, "dominant_emotion": "sadness",
#     "risk_level": "CRISIS", "emotion_breakdown": {...}}`
  },
  {
    id: 'api',
    icon: Server,
    title: '9. Pretrained APIs & Industry Tools',
    subtitle: 'Clinical-grade scalable sentiment APIs.',
    color: 'from-cyan-500 to-blue-600',
    content: `When building mental health triage tools at hospital scale, commercial APIs handle compliance, autoscaling, and global language coverage. Amazon Comprehend Medical offers dedicated NLP for clinical text, capable of extracting DSM-V related entities directly. Azure has a dedicated "Conversational Language Understanding" for mental health chatbot deployment.`,
    examples: ['Amazon Comprehend Medical', 'Google Healthcare NLP', 'IBM Watson NLU', 'Azure Text Analytics for Health'],
    codeSnippet: `# ── Google Cloud Natural Language (General) ────────────────────
from google.cloud import language_v1
client   = language_v1.LanguageServiceClient()
document = language_v1.Document(content="I feel hopeless.",
             type_=language_v1.Document.Type.PLAIN_TEXT)
response = client.analyze_sentiment(request={'document': document})`,
    clinicalMapping: `Amazon Comprehend Medical can extract clinical entities:\n• "hopelessness" → MedicalCondition\n• "suicidal ideation" → MedicalCondition\n• "sertraline 50mg" → Medication (context for existing treatment)\nAzure Text Analytics for Health is HIPAA-compliant, critical\nfor any real patient-data processing.`,
    clinicalCode: `# ── Suicide Risk: Amazon Comprehend Medical Integration ──────────
import boto3, json

comprehend_medical = boto3.client("comprehendmedical", region_name="us-east-1")

RISK_ENTITIES = {
    "suicidal ideation","self-harm","hopelessness",
    "depression","crisis","medication overdose plan"
}

def analyse_clinical_note(note):
    response = comprehend_medical.detect_entities_v2(Text=note)
    entities = response["Entities"]

    flagged, medications = [], []
    for ent in entities:
        text = ent["Text"].lower()
        if ent["Category"] == "MEDICAL_CONDITION" and text in RISK_ENTITIES:
            flagged.append({"entity": ent["Text"], "score": round(ent["Score"],3)})
        if ent["Category"] == "MEDICATION":
            medications.append(ent["Text"])

    risk_level = "CRISIS" if len(flagged)>=2 else "AT RISK" if flagged else "SAFE"
    return {
        "risk_level"    : risk_level,
        "risk_entities" : flagged,
        "current_meds"  : medications,
        "recommendation": "Immediate escalation" if risk_level=="CRISIS" else "Monitor"
    }

result = analyse_clinical_note(
    "Patient reports persistent suicidal ideation with plan. "
    "Current medication: sertraline 50mg. Hopelessness levels extreme."
)
print(json.dumps(result, indent=2))`
  },
  {
    id: 'emerging',
    icon: Lightbulb,
    title: '10. Emerging Trends (2024–2026)',
    subtitle: 'LLM-driven zero-shot clinical assessment.',
    color: 'from-amber-400 to-orange-500',
    content: `The most exciting frontier in 2024–2026 is using instruction-tuned LLMs (GPT-4, LLaMA-3, Gemini) as zero-shot clinical risk assessors. Rather than training on limited labeled data, you prompt the LLM with a structured clinical schema and it generates structured JSON risk assessments. Combined with Retrieval-Augmented Generation (RAG) on clinical guidelines, this approaches expert-level accuracy — even in Tamil and Malayalam.`,
    examples: ['LLM Zero-shot assessor (GPT-4, LLaMA-3)', 'RAG + Clinical guidelines', 'Streaming risk detection (social media)', 'XAI: SHAP for clinical evidence'],
    codeSnippet: `# ── LLM Zero-shot Risk Prompt ──────────────────────────────────
prompt = "Analyze risk. Return JSON: {level, reason, action}."
response = LLaMA3_generate(prompt + patient_text)`,
    clinicalMapping: `Recommended 2025 architecture for E-Manam multilingal research:\n→ Social media posts → LLM screening (GPT-4o / LLaMA-3)\n→ Risk = HIGH → escalate to fine-tuned MentalBERT for validation\n→ Generate SHAP evidence report → clinician review\n→ Tamil/Malayalam posts → IndicBERT + GPT-4o translation fusion`,
    clinicalCode: `# ── Suicide Risk: GPT-4o Zero-Shot Clinical Assessment ───────────
from openai import OpenAI
import json

client = OpenAI()

SYSTEM_PROMPT = """
You are a senior clinical NLP researcher specializing in suicide prevention.
Analyze the given patient text according to the Columbia Suicide Severity
Rating Scale (C-SSRS). Return ONLY valid JSON.

Schema:
{
  "ideation_level": "none|passive|active_without_plan|active_with_plan",
  "hopelessness"  : "low|moderate|high|extreme",
  "protective_factors": ["list of identified protective factors"],
  "risk_level"    : "Safe|At Risk|Crisis|Imminent",
  "clinical_reasoning": "brief evidence-based rationale",
  "recommended_action": "continue monitoring|outreach|immediate intervention"
}
"""

def llm_risk_assessment(patient_text, lang="en"):
    if lang != "en":
        # First translate to EN for best LLM performance
        tr = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role":"user","content":f"Translate to English: {patient_text}"}]
        )
        patient_text = tr.choices[0].message.content

    response = client.chat.completions.create(
        model="gpt-4o",
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user",   "content": f"Patient text: {patient_text}"}
        ],
        temperature=0.1  # low temperature for clinical consistency
    )
    return json.loads(response.choices[0].message.content)

# Test
result = llm_risk_assessment(
    "என்னால் இனி தொடர முடியாது. யாரும் என்னை புரிந்துகொள்வதில்லை.",
    lang="ta"  # Tamil input
)
print(json.dumps(result, indent=2))
# -> {"ideation_level": "active_without_plan",
#     "hopelessness"  : "extreme",
#     "risk_level"    : "Crisis",
#     "recommended_action": "immediate intervention"}`
  }
]

const QUICK_INSIGHTS = [
  { label: 'Best for beginners →',         value: 'VADER, Naïve Bayes' },
  { label: 'Best for research papers →',   value: 'MentalBERT, RoBERTa' },
  { label: 'Best for real-time API →',     value: 'DistilBERT, AWS Comprehend Medical' },
  { label: 'Best for multilingual (Tamil/Malayalam) →', value: 'IndicBERT + GPT-4o' },
  { label: 'Best for clinical explainability →',        value: 'Hybrid: BERT + SHAP' },
  { label: 'Best for your research →',     value: 'MentalBERT → ABSA → LLM Fusion' },
]

export default function ModelsTutorial() {
  const [activeTab, setActiveTab]       = useState(taxonomyData[0].id)
  const [codeView,  setCodeView]        = useState('general')   // 'general' | 'clinical'

  const current = taxonomyData.find(t => t.id === activeTab) || taxonomyData[0]
  const Icon    = current.icon

  return (
    <AppLayout title="Learning Hub · Models & Clinical Mapping">
      <div className="flex flex-col lg:flex-row gap-6 animate-fade-in" style={{ minHeight: 'calc(100vh - 120px)' }}>

        {/* ── Taxonomy Sidebar ─────────────────────────────────── */}
        <div className="w-full lg:w-72 flex-shrink-0 glass rounded-2xl overflow-hidden flex flex-col border border-surface-border">
          <div className="p-4 border-b border-surface-border bg-surface-card">
            <h2 className="font-display font-bold text-white">Sentiment Taxonomy</h2>
            <p className="text-xs text-slate-400 mt-1">Select a model family to explore.</p>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {taxonomyData.map(({ id, title, icon: NavIcon }) => (
              <button
                key={id}
                onClick={() => { setActiveTab(id); setCodeView('general') }}
                className={clsx(
                  'w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between gap-2',
                  activeTab === id
                    ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-surface-hover border border-transparent'
                )}
              >
                <span className="flex items-center gap-2 overflow-hidden">
                  <NavIcon size={15} className={activeTab === id ? 'text-brand-400 flex-shrink-0' : 'text-slate-500 flex-shrink-0'} />
                  <span className="truncate">{title.replace(/^\d+\.\s/, '')}</span>
                </span>
                {activeTab === id && <ChevronRight size={13} className="text-brand-400 flex-shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        {/* ── Content Area ─────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto pb-16 pr-1 space-y-5">

          {/* Quick Insights Banner */}
          <div className="glass p-5 rounded-2xl border border-brand-500/30 glow-brand">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Lightbulb size={18} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-white">💡 Senior Researcher Quick Insights</h3>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5 mt-3">
                  {QUICK_INSIGHTS.map(({ label, value }) => (
                    <p key={label} className="text-sm text-slate-300">
                      <span className="text-brand-400 font-semibold">{label}</span> {value}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Model Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              {/* Header */}
              <div className="glass p-7 rounded-2xl relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-72 h-72 bg-gradient-to-br ${current.color} opacity-5 blur-[120px] rounded-full pointer-events-none`} />
                <div className="flex items-start gap-4">
                  <div className={`w-13 h-13 min-w-[52px] min-h-[52px] rounded-2xl bg-gradient-to-br ${current.color} flex items-center justify-center shadow-lg`}>
                    <Icon size={26} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h1 className="font-display font-bold text-2xl text-white leading-tight">{current.title}</h1>
                    <p className="text-brand-400 font-medium text-sm mt-1 mb-3">{current.subtitle}</p>
                    <p className="text-slate-300 text-sm leading-relaxed">{current.content}</p>
                  </div>
                </div>
              </div>

              {/* Two-column: Algorithms + Clinical Mapping */}
              <div className="grid xl:grid-cols-2 gap-5">
                {/* Key Algorithms */}
                <div className="glass p-5 rounded-2xl">
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2 text-sm">
                    <Sparkles size={15} className="text-amber-400" /> Key Algorithms
                  </h3>
                  <ul className="space-y-2">
                    {current.examples.map((ex, i) => (
                      <li key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-surface-card border border-surface-border">
                        <span className="w-5 h-5 rounded text-xs font-bold text-slate-400 flex items-center justify-center bg-surface flex-shrink-0">{i + 1}</span>
                        <span className="text-sm text-slate-200">{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Clinical Mapping */}
                <div className="glass p-5 rounded-2xl border border-rose-500/20">
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2 text-sm">
                    <HeartPulse size={15} className="text-rose-400" /> Suicide Prediction Mapping
                  </h3>
                  <pre className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">{current.clinicalMapping}</pre>
                </div>
              </div>

              {/* Code Panel: General vs Clinical Toggle */}
              <div className="glass rounded-2xl overflow-hidden border border-surface-border">
                <div className="bg-surface-card px-4 py-3 border-b border-surface-border flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="text-xs text-slate-400 font-mono ml-2">Python</span>
                  </div>
                  {/* Toggle */}
                  <div className="flex items-center gap-1 bg-surface rounded-lg p-1">
                    <button
                      onClick={() => setCodeView('general')}
                      className={clsx('px-3 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1.5',
                        codeView === 'general' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white')}
                    >
                      <Code2 size={11} /> General
                    </button>
                    <button
                      onClick={() => setCodeView('clinical')}
                      className={clsx('px-3 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1.5',
                        codeView === 'clinical' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white')}
                    >
                      <HeartPulse size={11} /> Suicide Risk
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto bg-[#0d1117] p-5">
                  <pre className="font-mono text-sm text-slate-300 leading-relaxed whitespace-pre">
                    <code>{codeView === 'clinical' ? current.clinicalCode : current.codeSnippet}</code>
                  </pre>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </AppLayout>
  )
}
