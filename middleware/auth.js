export const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers['authorization']?.split(' ')[1];
  if (apiKey !== process.env.API_KEY) return res.status(403).json({ error: 'Unauthorized' });
  next();
};