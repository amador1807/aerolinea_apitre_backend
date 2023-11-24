import { Router } from "express";
import { createRefs, deleteRefs, getRefs, updateRefs } from "../controllers/refFam.controller";

const router = Router();

router.get('/', getRefs);
router.post('/', createRefs);
router.patch('/:id', updateRefs);
router.delete('/:id', deleteRefs);

export { router };