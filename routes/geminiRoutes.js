import express from 'express';
import { obtenerRespuesta } from '../controllers/geminiController.js';

const router = express.Router();

router.post("/preguntar", obtenerRespuesta);

export default router;