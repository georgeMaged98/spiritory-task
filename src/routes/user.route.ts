import { Router } from 'express';
import { postUser } from '../controllers/user.controller';
import { validatePostUser } from '../validations/user.validation';

const router = Router();

router.post('/', validatePostUser, postUser);

export { router as userRouter };
