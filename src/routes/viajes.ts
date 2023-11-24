import { Router } from "express";
import { createViaje, deleteViaje, getViajes, updateViaje } from "../controllers/viajes.controller";

const router = Router();
router.get('/', getViajes);
router.post('/', createViaje);
router.patch('/:id', updateViaje);
router.delete('/:id', deleteViaje);

export { router };