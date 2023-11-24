import { Router } from "express";
import { createDestino, deleteDestino, getDestino, updateDestino } from "../controllers/destino.controller";

const router = Router();
router.get('/', getDestino);
router.post('/', createDestino);
router.patch('/:id', updateDestino);
router.delete('/:id', deleteDestino);

export { router };