import { Request } from 'express';
import { IDiscount } from './discount.interface';
import { CustomRequest } from '../../../interfaces/common';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { Discount } from './discount.model';

const insertIntoDB = async (req: CustomRequest) => {
  const { files } = req;
  const { ...discountData } = req.body as unknown as IDiscount;
  if (!files?.image || !discountData.code || !discountData.discountPercent) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'All field are required');
  }
  let discountImage = undefined;
  if (files?.image) {
    discountImage = `/images/image/${files.image[0].filename}`;
  }
  return await Discount.create({
    ...discountData,
    image: discountImage,
  });
};
const getAll = async () => {
  return await Discount.find({});
};
const getActiveDiscount = async () => {
  return await Discount.find({ isActive: true });
};
const deleteDiscount = async (req: Request) => {
  const { id } = req.params;
  const isExist = await Discount.findById(id);
  if (!isExist) {
    throw new ApiError(404, 'Discount not found');
  }
  return await Discount.findByIdAndDelete(id);
};
const getSingle = async (req: Request) => {
  const { code } = req.params;
  const isExist = await Discount.findOne({
    $and: [{ code: code }, { isActive: true }],
  });
  if (!isExist) {
    throw new ApiError(404, 'Discount not found');
  }
  return isExist;
};
const updateDiscount = async (req: CustomRequest) => {
  const { id } = req.params;
  const { files } = req;
  const isExist = await Discount.findById(id);
  if (!isExist) {
    throw new ApiError(404, 'Discount not found');
  }
  const { ...discountData } = req.body as unknown as IDiscount;
  if (files && files?.image) {
    discountData.image = `/images/image/${files.image[0].filename}`;
  }
  return await Discount.findByIdAndUpdate(id, discountData, {
    new: true,
    runValidators: true,
  });
};
export const DiscountService = {
  insertIntoDB,
  getAll,
  getActiveDiscount,
  deleteDiscount,
  updateDiscount,
  getSingle,
};
