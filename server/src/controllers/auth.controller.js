const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const prisma = require('../config/db');

// @desc Register Student or Faculty
// @route POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { email, password, role, organizationId } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role || 'STUDENT',
        organizationId,
      },
    });

    res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
};

// @desc Login User
// @route POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { organization: true },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, organizationId: user.organizationId },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        organization: user.organization,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
};

// @desc Create Organization (Super Admin Only)
// @route POST /api/auth/onboard-org
exports.onboardOrg = async (req, res) => {
  try {
    const { name, subDomain, adminEmail, adminPassword } = req.body;

    const org = await prisma.organization.create({
      data: {
        name,
        subDomain,
      },
    });

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        role: 'ORG_ADMIN',
        organizationId: org.id,
      },
    });

    res.status(201).json({ message: 'Organization onboarded', org, adminId: admin.id });
  } catch (error) {
    res.status(500).json({ error: 'Onboarding failed', details: error.message });
  }
};
