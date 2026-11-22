import { Router } from 'express';
import auth from '../middleware/auth.js';
import FarmerProfile from '../models/FarmerProfile.js';
import Scheme from '../models/Scheme.js';
import { matchScheme } from '../services/matcher.js';

const router = Router();

router.get('/', auth, async (req, res, next) => {
  try {
    const profile = await FarmerProfile.findOne({ user: req.userId }).lean();
    if (!profile) return res.status(400).json({ message: 'Complete your farmer profile to see scheme suggestions.' });
    const schemes = await Scheme.find({ isActive: true }).lean();
    const results = schemes.map(scheme => ({ scheme, ...matchScheme(profile, scheme) }));
    results.sort((a, b) =>
      Number(b.potentiallyRelevant) - Number(a.potentiallyRelevant) ||
      Number(b.stateMatches) - Number(a.stateMatches) ||
      a.scheme.name.localeCompare(b.scheme.name)
    );
    res.json({
      matches: results,
      disclaimer: 'AgriMatch provides information discovery only. It cannot confirm eligibility, application availability or approval. Check the official scheme source and current notification.'
    });
  } catch (error) { next(error); }
});

export default router;
