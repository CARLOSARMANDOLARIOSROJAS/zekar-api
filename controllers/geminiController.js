import path from "path";
import { getRespuestaAI } from "../services/openaiService.js";

// Ruta del archivo Excel
const archivoExcel = path.join("services", "datos.xlsx");

export const obtenerRespuesta = async (req, res) => {
    const { pregunta } = req.body; // Obtener la pregunta desde el request

    if (!pregunta) {
        return res.status(400).json({ error: "Falta la pregunta en el request" });
    }

    try {
        const respuesta = await getRespuestaAI(archivoExcel, pregunta);
        res.json({ respuesta });
    } catch (error) {
        console.error("Error en obtenerRespuesta:", error);
        res.status(500).json({ error: "Error al procesar la solicitud." });
    }
};
