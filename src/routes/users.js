import { Router } from "express";
import { create, update, list, show, destroy } from '../controllers/user';
import { canCreateUser, canUpdateUser, canListUser, canDestroyUser } from '../middleware/user';

const router = Router();

router.post("/create", canCreateUser, create);
router.put('/:id', canUpdateUser,update);
router.get('/', canListUser, list);
router.get('/:id', canUpdateUser, show);
router.delete('/:id', canDestroyUser, destroy);

export default router;
