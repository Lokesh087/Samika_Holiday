import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: String, required: true }, // e.g. "$450"
    rating: { type: String, default: '4.9' },
    reviewsCount: { type: String, default: '128' },
    image: { type: String, required: true },
    gallery: [{ type: String }],
    amenities: [{ type: String }],
    description: { type: String },
    roomsAvailable: { type: Number, default: 12 },
    isFeatured: { type: Boolean, default: false },
    freeCancellation: { type: Boolean, default: true },
    hasPool: { type: Boolean, default: true },
    hasBreakfast: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.models.Hotel || mongoose.model('Hotel', hotelSchema);
