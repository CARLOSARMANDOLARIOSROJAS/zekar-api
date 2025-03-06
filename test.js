import { getRespuestaAI } from "./services/openaiService.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "services", "datos.xlsx");  // Ruta del archivo

const main = async () => {
    const respuesta = await getRespuestaAI(filePath, "¿Qué años de la Toyota Hilux son compatibles con el producto MC-31587?");
    console.log(respuesta);
};

main();
