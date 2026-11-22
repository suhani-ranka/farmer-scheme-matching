import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema({
  schemeCode: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true, trim: true },
  shortName: { type: String, default: '' },
  summary: { type: String, required: true },
  benefit: { type: String, required: true },
  governmentLevel: { type: String, enum: ['Central', 'State'], required: true, index: true },
  stateName: { type: String, default: '' },
  applicableStates: [{ type: String }],
  department: { type: String, default: '' },
  category: { type: String, default: 'Other', index: true },
  tags: [{ type: String }],
  cropTags: [{ type: String }],
  irrigationTags: [{ type: String }],
  farmerTypeTags: [{ type: String }],
  eligibilitySummary: { type: String, default: '' },
  eligibilityCaveats: [{ type: String }],
  applicationProcess: { type: String, default: '' },
  requiredDocuments: [{ type: String }],
  officialUrl: { type: String, required: true },
  sourceName: { type: String, required: true },
  sourceUrl: { type: String, required: true },
  lastVerifiedAt: { type: Date, required: true },
  verificationStatus: { type: String, enum: ['official-source-checked', 'needs-recheck'], default: 'official-source-checked' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

schemeSchema.index({ name: 'text', summary: 'text', tags: 'text', category: 'text' });

export default mongoose.model('Scheme', schemeSchema);
