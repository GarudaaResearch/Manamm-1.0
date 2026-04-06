const axios = require('axios');
const prisma = require('../config/db');

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

exports.analyzeText = async (req, res) => {
  try {
    const { text, type } = req.body; // type: 'sentiment', 'emotion', 'sarcasm'

    const response = await axios.post(`${ML_SERVICE_URL}/analyze/${type}`, { text });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: 'ML Service Error',
      details: error.response ? error.response.data : error.message,
    });
  }
};

exports.runExperiment = async (req, res) => {
  try {
    const { datasetId, modelName, config } = req.body;

    const dataset = await prisma.dataset.findUnique({ where: { id: datasetId } });
    if (!dataset) return res.status(404).json({ error: 'Dataset not found' });

    // In a real app, we'd trigger a background task (e.g., BullMQ)
    // For now, we simulate a request to the ML service
    const response = await axios.post(`${ML_SERVICE_URL}/experiment/run`, {
      dataset_path: dataset.filePath,
      model_name: modelName,
      config,
    });

    const experiment = await prisma.experiment.create({
      data: {
        datasetId,
        modelName,
        config,
        results: response.data.results,
        metrics: response.data.metrics,
      },
    });

    res.status(201).json(experiment);
  } catch (error) {
    res.status(500).json({ error: 'Experiment failed', details: error.message });
  }
};
