import { getUserByEmail, saveUser } from '../models/user.model.js';
import { triggerUpdateProfileWorkflow } from '../utils/temporalClient.js';

export const getProfile = (req, res, next) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  getUserByEmail(email, (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  });
};

export const updateProfile = async (req, res, next) => {
  try {
    const userData = req.body; 
    await triggerUpdateProfileWorkflow(userData);
    res.status(200).json({ message: 'Profile update triggered' });
  } catch (error) {
    console.error('Failed to trigger workflow:', error);
    next(error);
  }
};
