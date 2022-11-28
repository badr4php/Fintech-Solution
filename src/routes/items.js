import { Router } from "express";
import { create, update, list, show, destroy } from '../controllers/item'

const router = Router();

router.post("/", create);
router.put('/:id', update);
router.get('/', list);
router.get('/:id', show);
router.delete('/:id', destroy);

export default router;
