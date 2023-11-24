import { Router } from "express";
import { createOrigen, deleteOrigen, getOrigen, updateOrigen } from "../controllers/origen.controller";

const router = Router();
router.get('/',getOrigen);
router.post('/',createOrigen);
router.patch('/:id',updateOrigen);
router.delete('/:id',deleteOrigen);

export { router };