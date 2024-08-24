import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { DiscountService } from './discount.service';
import sendResponse from '../../../shared/sendResponse';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await DiscountService.insertIntoDB(req as any);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Discount Add Successful',
    data: result,
  });
});
const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await DiscountService.getAll();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const getActiveDiscount = catchAsync(async (req: Request, res: Response) => {
  const result = await DiscountService.getActiveDiscount();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const deleteDiscount = catchAsync(async (req: Request, res: Response) => {
  const result = await DiscountService.deleteDiscount(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const result = await DiscountService.getSingle(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const updateDiscount = catchAsync(async (req: Request, res: Response) => {
  const result = await DiscountService.updateDiscount(req as any);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});

export const DiscountController = {
  insertIntoDB,
  getAll,
  getActiveDiscount,
  deleteDiscount,
  updateDiscount,
  getSingle,
};
