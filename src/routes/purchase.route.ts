import { Router } from 'express';
import { getPurchases } from '../controllers/purchase.controller';

const router = Router();

router.get('/', getPurchases);

export { router as purchaseRouter };
