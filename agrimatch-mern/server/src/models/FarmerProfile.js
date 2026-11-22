import mongoose from 'mongoose';

const farmerProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  state: { type: String, required: true, trim: true },
  district: { type: String, trim: true, default: '' },
  landSizeAcres: { type: Number, min: 0, required: true },
  farmerType: { type: String, enum: ['small', 'marginal', 'other'], required: true },
  category: { type: String, enum: ['general', 'sc', 'st', 'obc', 'not-specified'], default: 'not-specified' },
  irrigation: { type: String, enum: ['yes', 'no', 'partial'], default: 'partial' },
  crops: [{ type: String, trim: true }],
  interests: [{ type: String, trim: true }]
}, { timestamps: true });

export default mongoose.model('FarmerProfile', farmerProfileSchema);
