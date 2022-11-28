import { Router } from "express";
import { create, update, list, show, destroy } from '../controllers/group'
import { canManageGroup } from '../middleware/group';

const router = Router();

router.post("/create", canManageGroup, create);
router.put('/:id', canManageGroup, update);
router.get('/', canManageGroup, list);
router.get('/:id', canManageGroup, show);
router.delete('/:id', canManageGroup, destroy);

export default router;
