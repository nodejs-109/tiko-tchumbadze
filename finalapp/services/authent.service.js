const {z} = require('zod');
const {AuthSchema} = require('../models/authentSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

async function register(req, res) {
  const registerBodySchema = z.object({
    username: z.string().min(5).max(15),
    password: z.string().min(8).max(20),
    email: z.string().email().optional(),
    role: z.enum(['user', 'admin']).default('user'),
    phone: z.string().optional(),
    birthDate: z.string(),
  });

  const registerBody = registerBodySchema.safeParse(req.body);

  if (!registerBody.success) {
    return res.status(400).json({
      success: false,
      message: 'Invalid request body',
      errors: registerBody.error.errors,
    });
  }

  const {password} = registerBody.data;
  const hashedPassword = bcrypt.hashSync(password, 8);
  const newUser = await AuthSchema.create({ 
    ...registerBody.data,
    password: hashedPassword,
  });

  if (!newUser) {
    return res.status(500).json({
      success: false,
      message: 'Failed to register new users',
    });
  }

  res.status(201).json({
    success: true,
    message: 'New user has been registered',
  });
}

async function login(req, res) {
  const loginBodySchema = z.object({
    username: z.string().min(5).max(15),
    password: z.string().min(6).max(20),
  });

  const loginBody = loginBodySchema.safeParse(req.body);

  if (!loginBody.success) {
    return res.status(400).json({
      success: false,
      message: 'Invalid request body',
      errors: loginBody.error.errors,
    });
  }

  const { username, password} = loginBody.data;

  const user = await AuthSchema.findOne({ where: { username } });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: 'Invalid password',
    });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '2h',
  });

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
  });
}


async function updatePassword(req, res) {
  const updatePasswordSchema = z.object({
    password: z.string().min(6).max(20),
    newPassword: z.string().min(6).max(20),
  });

  const parsedBody = updatePasswordSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      success: false,
      message: 'Invalid request body',
      errors: parsedBody.error.errors,
    });
  }

  const { password, newPassword } = parsedBody.data;

  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  const user = await AuthSchema.findByPk(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: 'Current password is incorrect',
    });
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '2h',})

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  await user.save();

  return res.status(200).json({
    success: true,
    message: 'Password updated successfully',
    token,
  });
}

module.exports = {
  register,
  login,
  updatePassword,
};
