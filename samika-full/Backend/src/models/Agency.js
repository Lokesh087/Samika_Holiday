import mongoose from 'mongoose';

const agencySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    country: { type: String, required: true },
    specialty: { type: String, required: true },
    description: { type: String, default: '' },
    image: { type: String, required: true },
    rating: { type: String, default: '4.8' },
    reviewsCount: { type: Number, default: 0 },
    verified: { type: Boolean, default: true },
    destinations: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.models.Agency || mongoose.model('Agency', agencySchema);
