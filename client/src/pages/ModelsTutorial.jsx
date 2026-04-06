import { useState } from 'react'
import AppLayout from '../components/AppLayout'
import { BookOpen, Network, Zap, Settings, Shield, Sparkles, Server, MessageSquare, Lightbulb, ChevronRight, ScanText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

const taxonomyData = [
  {
    id: 'rule-based',
    icon: BookOpen,
    title: '1. Rule-Based & Lexicon-Based Models',
    subtitle: 'Rely on predefined sentiment dictionaries.',
    color: 'from-blue-500 to-cyan-500',
    content: `Lexicon models match words against a dictionary to calculate scores. Very fast but lack context understanding.`,
    examples: ['VADER', 'SentiWordNet', 'AFINN', 'TextBlob', 'LIWC'],
    codeSnippet: `from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
analyzer = SentimentIntensityAnalyzer()
print(analyzer.polarity_scores("The class was okay, but the exam was brutally hard!"))
# Expected: {'neg': 0.28, 'neu': 0.72, 'pos': 0.0, 'compound': -0.54}`
  },
  {
    id: 'traditional-ml',
    icon: Settings,
    title: '2. Traditional Machine Learning',
    subtitle: 'Require feature engineering (TF-IDF, BoW, n-grams).',
    color: 'from-purple-500 to-pink-500',
    content: `Machine Learning algorithms learn from labeled text represented as sparse vectors. Highly interpretable but struggle with nuance.`,
    examples: ['Naive Bayes', 'Logistic Regression', 'Support Vector Machine (SVM)', 'Gradient Boosting (XGBoost/LightGBM)'],
    codeSnippet: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import SVC

vectorizer = TfidfVectorizer(ngram_range=(1,2))
X_train = vectorizer.fit_transform(corpus)
classifier = SVC(kernel='linear').fit(X_train, y_train)`
  },
  {
    id: 'deep-learning',
    icon: Network,
    title: '3. Deep Learning Models',
    subtitle: 'Capture context and semantics better than classical ML.',
    color: 'from-indigo-500 to-purple-600',
    content: `Neural networks use dense embeddings to capture syntactic structures and context, automatically learning features without manual engineering.`,
    examples: ['Multilayer Perceptron (MLP)', 'RNN / LSTM / BiLSTM / GRU', 'Text-CNN'],
    codeSnippet: `import tensorflow as tf
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(vocab_size, 64),
    tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(64)),
    tf.keras.layers.Dense(3, activation='softmax')
])`
  },
  {
    id: 'transformers',
    icon: Sparkles,
    title: '4. Transformer-Based Models (State-of-the-Art 🚀)',
    subtitle: 'Attention is all you need.',
    color: 'from-brand-500 to-fuchsia-500',
    content: `Transformers revolutionized NLP context understanding through self-attention mechanisms. They understand language deeply, yielding near-human capabilities on text sentiment.`,
    examples: ['BERT', 'RoBERTa', 'DistilBERT', 'LLMs: GPT, T5, LLaMA'],
    codeSnippet: `from transformers import pipeline
classifier = pipeline("sentiment-analysis", model="nlptown/bert-base-multilingual-uncased-sentiment")
print(classifier("இது மிகவும் அருமையான முயற்சி!"))`
  },
  {
    id: 'absa',
    icon: ScanText, // Will import from lucide-react or use another
    title: '5. Aspect-Based Sentiment Analysis',
    subtitle: 'Fine-grained sentiment (e.g., “battery good, camera bad”).',
    color: 'from-emerald-500 to-teal-500',
    content: `ABSA splits a sentence into specific entities (aspects) and extracts sentiment for each independently, rather than giving one blanket score.`,
    examples: ['Attention-based LSTM', 'BERT + Attention for ABSA', 'Span-based transformers', 'GNN for sentiment'],
    codeSnippet: `Input: "The professor's slides were great, but grading was unfair."
# Extracted Aspects:
# -> {"aspect": "slides", "sentiment": "Positive"}
# -> {"aspect": "grading", "sentiment": "Negative"}`
  },
  {
    id: 'multimodal',
    icon: Zap,
    title: '6. Multimodal Sentiment Models',
    subtitle: 'Combine text, audio, video.',
    color: 'from-orange-500 to-red-500',
    content: `Multimodal fusion models analyze tone of voice, facial expressions, and textual transcripts simultaneously to derive highly accurate emotional markers.`,
    examples: ['Multimodal Transformers', 'VisualBERT', 'VideoBERT', 'CNN + LSTM hybrids'],
    codeSnippet: `# Fusion of Text & Audio Embeddings
combined_features = concat([text_bert_features, audio_cnn_features])
emotion = dense_layer(combined_features)`
  },
  {
    id: 'hybrid',
    icon: Shield,
    title: '7. Hybrid Models',
    subtitle: 'Combine multiple AI approaches for robustness.',
    color: 'from-slate-500 to-gray-400',
    content: `Combining architectures often merges the speed of rule-based systems with the accuracy of deep learning, or utilizes CNN for edge detection in text alongside LSTM sequences.`,
    examples: ['Lexicon + ML', 'CNN + LSTM', 'BERT + BiLSTM'],
    codeSnippet: `feature_set_1 = VADER_scores(text)
feature_set_2 = TFIDF_vector(text)
final_prediction = XGBoost_Classifier(feature_set_1 + feature_set_2)`
  },
  {
    id: 'emotion',
    icon: MessageSquare,
    title: '8. Emotion & Advanced Sentiment',
    subtitle: 'Beyond positive/negative boundaries.',
    color: 'from-rose-500 to-pink-500',
    content: `Basic sentiment lacks depth. Emotion classification categorizes text into psychological states (joy, disgust, anger), while advanced models detect sarcasm or specific hostility.`,
    examples: ['Emotion Classification (joy, anger)', 'Sarcasm Detection', 'Hate Speech Detection', 'Opinion Mining'],
    codeSnippet: `classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base")
classifier("I can't believe none of this code works!") 
# [{'label': 'anger', 'score': 0.94}]`
  },
  {
    id: 'api',
    icon: Server,
    title: '9. Pretrained APIs & Industry Tools',
    subtitle: 'Ready-to-use scalable sentiment systems.',
    color: 'from-cyan-500 to-blue-600',
    content: `For rapid deployment without ML expertise, commercial cloud APIs provide high accuracy and managed autoscaling APIs.`,
    examples: ['Google Cloud Natural Language', 'Amazon Comprehend', 'IBM Watson NLU', 'Azure Text Analytics'],
    codeSnippet: `from google.cloud import language_v1
client = language_v1.LanguageServiceClient()
document = language_v1.Document(content="Service was okay", type_=language_v1.Document.Type.PLAIN_TEXT)
response = client.analyze_sentiment(request={'document': document})`
  },
  {
    id: 'emerging',
    icon: Lightbulb,
    title: '10. Emerging Trends (2024–2026)',
    subtitle: 'The frontier of affective computing.',
    color: 'from-amber-400 to-orange-500',
    content: `The immediate future resides in zero-shot learning with Large Language Models and highly domain-adaptive stream processing using explainable AI frameworks.`,
    examples: ['Instruction-tuned models', 'Few-shot / zero-shot sentiment (LLMs)', 'Explainable sentiment AI (XAI)', 'Real-time social media intelligence'],
    codeSnippet: `# LLM Zero-shot Prompting:
prompt = "Analyze the sentiment of this text and return just JSON: { sentiment, reason }. Text: The UI is very clunky."
response = LLaMA3_generate(prompt)`
  }
]

// Adding missing icon map safely
import { Type } from 'lucide-react'
const getIcon = (id) => {
  if(id === 'absa') return Type;
  const match = taxonomyData.find(x => x.id === id);
  return match ? match.icon : BookOpen;
}

export default function ModelsTutorial() {
  const [activeTab, setActiveTab] = useState(taxonomyData[0].id)
  
  const currentModel = taxonomyData.find(t => t.id === activeTab) || taxonomyData[0]
  const Icon = getIcon(currentModel.id)

  return (
    <AppLayout title="Learning Hub: Models & Taxonomy">
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)] animate-fade-in">
        
        {/* Sidebar Nav */}
        <div className="w-full lg:w-80 flex-shrink-0 glass rounded-2xl overflow-hidden flex flex-col h-full border border-surface-border">
          <div className="p-4 border-b border-surface-border bg-surface-card sticky top-0 z-10">
            <h2 className="font-display font-bold text-white">Sentiment Taxonomy</h2>
            <p className="text-xs text-slate-400 mt-1">Select a family of models to explore.</p>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {taxonomyData.map(({ id, title, icon: NavIcon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={clsx(
                  "w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between",
                  activeTab === id 
                    ? "bg-brand-500/20 text-brand-300 border border-brand-500/30 shadow-[inset_0_0_15px_rgba(99,102,241,0.1)]" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-surface-hover border border-transparent"
                )}
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <NavIcon size={16} className={activeTab === id ? 'text-brand-400' : 'text-slate-500'} />
                  <span className="truncate">{title.split('. ')[1]}</span>
                </div>
                {activeTab === id && <ChevronRight size={14} className="text-brand-400" />}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-10">
          {/* Quick Insight specific banner */}
          <div className="glass p-5 rounded-2xl border border-brand-500/30 glow-brand mb-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <Lightbulb size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-lg">💡 Quick Insight from our Senior Researchers</h3>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mt-3">
                <p className="text-sm text-slate-300"><span className="text-brand-400 font-semibold">Best for beginners →</span> VADER, Naïve Bayes</p>
                <p className="text-sm text-slate-300"><span className="text-brand-400 font-semibold">Best for research papers →</span> BERT, RoBERTa</p>
                <p className="text-sm text-slate-300"><span className="text-brand-400 font-semibold">Best for real-time systems →</span> DistilBERT, APIs</p>
                <p className="text-sm text-slate-300"><span className="text-brand-400 font-semibold">Best for advanced AI projects →</span> LLM + ABSA + Multimodal fusion</p>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Header Box */}
              <div className="glass p-8 rounded-2xl relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${currentModel.color} opacity-5 blur-[100px] rounded-full`}></div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${currentModel.color} flex items-center justify-center shadow-lg`}>
                    <Icon size={28} className="text-white" />
                  </div>
                  <div>
                    <h1 className="font-display font-bold text-3xl text-white">{currentModel.title}</h1>
                    <p className="text-brand-400 font-medium text-sm mt-1">{currentModel.subtitle}</p>
                  </div>
                </div>
                
                <p className="text-slate-300 text-base leading-relaxed max-w-3xl mt-6">
                  {currentModel.content}
                </p>
              </div>

              {/* Models List & Example Code Layout */}
              <div className="grid xl:grid-cols-5 gap-6">
                
                {/* Popular Models List */}
                <div className="xl:col-span-2 glass p-6 rounded-2xl">
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <Sparkles size={16} className="text-amber-400" />
                    Key Algorithms / Architectures
                  </h3>
                  <ul className="space-y-2.5">
                    {currentModel.examples.map((ex, i) => (
                      <li key={i} className="flex items-center gap-3 p-3 rounded-lg bg-surface-card border border-surface-border">
                        <span className="w-6 h-6 rounded bg-surface block flex items-center justify-center text-xs font-bold text-slate-400 group-hover:text-brand-400 transition-colors">
                          {i+1}
                        </span>
                        <span className="text-sm text-slate-200 font-medium">{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Code Snippet */}
                <div className="xl:col-span-3 glass rounded-2xl overflow-hidden flex flex-col">
                  <div className="bg-surface-card px-4 py-3 border-b border-surface-border flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <span className="text-xs text-slate-400 font-mono ml-2">Implementation Example</span>
                  </div>
                  <div className="flex-1 p-5 bg-[#0d1117] overflow-x-auto text-sm">
                    <pre className="font-mono text-slate-300 leading-relaxed"><code className="language-python">{currentModel.codeSnippet}</code></pre>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </AppLayout>
  )
}
