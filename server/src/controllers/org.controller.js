const prisma = require('../config/db');

exports.getOrgDetails = async (req, res) => {
  try {
    const orgId = req.user.organizationId;
    const org = await prisma.organization.findUnique({
      where: { id: orgId },
      include: { users: { select: { id: true, email: true, role: true } } },
    });
    res.json(org);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch org details', details: error.message });
  }
};

exports.updateOrgBranding = async (req, res) => {
  try {
    const orgId = req.user.organizationId;
    const { name, logoUrl } = req.body;

    const updatedOrg = await prisma.organization.update({
      where: { id: orgId },
      data: { name, logoUrl },
    });

    res.json(updatedOrg);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update branding', details: error.message });
  }
};

exports.bulkCreateUsers = async (req, res) => {
  try {
    const orgId = req.user.organizationId;
    const { users } = req.body; // Array of { email, password, role }

    const createdUsers = await Promise.all(
      users.map(async (u) => {
        const hashedPassword = await require('bcryptjs').hash(u.password, 10);
        return prisma.user.create({
          data: {
            email: u.email,
            password: hashedPassword,
            role: u.role || 'STUDENT',
            organizationId: orgId,
          },
        });
      })
    );

    res.status(201).json({ message: `${createdUsers.length} users created successfully` });
  } catch (error) {
    res.status(500).json({ error: 'Bulk creation failed', details: error.message });
  }
};
