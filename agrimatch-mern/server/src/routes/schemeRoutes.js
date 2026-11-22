
import { Router } from 'express';
import mongoose from 'mongoose';
import Scheme from '../models/Scheme.js';

const router = Router();

const escapeRegex = (value) =>
  String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Get all schemes with optional filters
router.get('/', async (req, res, next) => {
  try {
    const { level, state, category, q } = req.query;

    const filter = { isActive: true };

    if (level && ['Central', 'State'].includes(level)) {
      filter.governmentLevel = level;
    }

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (state && state !== 'All') {
      filter.applicableStates = {
        $in: ['All India', state]
      };
    }

    if (q && String(q).trim()) {
      const term = String(q).trim().slice(0, 80);
      const safeTerm = escapeRegex(term);

      filter.$or = [
        { name: { $regex: safeTerm, $options: 'i' } },
        { summary: { $regex: safeTerm, $options: 'i' } },
        { tags: { $regex: safeTerm, $options: 'i' } },
        { category: { $regex: safeTerm, $options: 'i' } }
      ];
    }

    const schemes = await Scheme.find(filter)
      .sort({ governmentLevel: 1, name: 1 })
      .lean();

    res.json({
      success: true,
      schemes,
      count: schemes.length
    });
  } catch (error) {
    console.error('GET SCHEMES ERROR:', error);
    next(error);
  }
});

// Get one scheme by ID
router.get('/:id', async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid scheme ID'
      });
    }

    const scheme = await Scheme.findOne({
      _id: req.params.id,
      isActive: true
    }).lean();

    if (!scheme) {
      return res.status(404).json({
        message: 'Scheme not found.'
      });
    }

    res.json({ success: true, scheme });
  } catch (error) {
    console.error('GET SCHEME ERROR:', error);
    next(error);
  }
});

export default router;
