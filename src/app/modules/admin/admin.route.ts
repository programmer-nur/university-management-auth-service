import express from 'express';
import { AdminController } from './admin.controller';
import { adminValidation } from './admin.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.get('/:id', AdminController.getSingleAdmin);
router.delete('/:id', AdminController.deleteAdmin);

router.patch(
  '/:id',
  validateRequest(adminValidation.updateAdminZodSchema),
  AdminController.updateAdmin
);

router.get('/', AdminController.getAllAdmins);

export const AdminRoutes = router;
