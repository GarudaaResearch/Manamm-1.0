const prisma = require('../config/db');

exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const project = await prisma.project.create({
      data: {
        name,
        description,
        organizationId: req.user.organizationId,
        createdById: req.user.id,
      },
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project', details: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { organizationId: req.user.organizationId },
      include: { datasets: true, createdBy: { select: { email: true } } },
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects', details: error.message });
  }
};

exports.uploadDataset = async (req, res) => {
  try {
    const { projectId, name, format, filePath, metadata } = req.body;

    const dataset = await prisma.dataset.create({
      data: {
        name,
        format,
        filePath, // Normally would be a cloud URL or local path from multer
        metadata,
        projectId,
      },
    });

    res.status(201).json(dataset);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload dataset', details: error.message });
  }
};

exports.getProjectDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        datasets: {
          include: {
            experiments: true,
            annotations: true,
          },
        },
      },
    });

    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project details', details: error.message });
  }
};
