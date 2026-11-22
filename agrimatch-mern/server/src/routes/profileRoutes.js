import { Router } from 'express';
import auth from '../middleware/auth.js';
import FarmerProfile from '../models/FarmerProfile.js';

const router = Router();
router.use(auth);

router.get('/', async (req, res, next) => {
  try {
    const profile = await FarmerProfile.findOne({ user: req.userId }).lean();
    res.json({ profile });
  } catch (error) { next(error); }
});

router.put('/', async (req, res, next) => {
  try {
    const { state, district, landSizeAcres, farmerType, category, irrigation, crops, interests } = req.body;
    if (!state || !['small', 'marginal', 'other'].includes(farmerType)) {
      return res.status(400).json({ message: 'State and a valid farmer type are required.' });
    }
    const land = Number(landSizeAcres);
    if (!Number.isFinite(land) || land < 0) return res.status(400).json({ message: 'Enter a valid land size.' });
    const safeList = value => Array.isArray(value) ? value.map(x => String(x).trim()).filter(Boolean).slice(0, 20) : [];
    const profile = await FarmerProfile.findOneAndUpdate(
      { user: req.userId },
      {
        user: req.userId, state: String(state).trim(), district: String(district || '').trim(),
        landSizeAcres: land, farmerType, category: category || 'not-specified',
        irrigation: ['yes', 'no', 'partial'].includes(irrigation) ? irrigation : 'partial',
        crops: safeList(crops), interests: safeList(interests)
      },
      { new: true, upsert: true, runValidators: true }
    );
    res.json({ profile, message: 'Profile saved.' });
  } catch (error) { next(error); }
});

export default router;
