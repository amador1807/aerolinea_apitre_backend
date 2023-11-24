import { Router } from "express";
import { createViajero, deleteViajero, getViajeros, updateViajero } from "../controllers/viajeros.controller";

const router = Router();
router.get('/',getViajeros);
router.post('/',createViajero);
router.patch('/:id',updateViajero);
router.delete('/:id',deleteViajero);

export { router };