import { Schema, model } from 'mongoose';
import { IDiscount } from './discount.interface';

const discountSchema = new Schema<IDiscount>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    discountPercent: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Discount = model('Discount', discountSchema);
