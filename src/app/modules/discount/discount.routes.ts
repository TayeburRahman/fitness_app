import { Router } from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { DiscountController } from './discount.controller';
import { uploadFile } from '../../middlewares/fileUploader';
const router = Router();

router.post(
  '/add',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  uploadFile(),
  DiscountController.insertIntoDB,
);
router.get(
  '/get-all',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  DiscountController.getAll,
);
router.get(
  '/get-active-discount',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  DiscountController.getActiveDiscount,
);
router.get(
  '/single/:code',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  DiscountController.getSingle,
);
router.delete(
  '/delete/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  DiscountController.deleteDiscount,
);

router.patch(
  '/edit/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  uploadFile(),
  DiscountController.updateDiscount,
);

export const DiscountRoutes = router;
