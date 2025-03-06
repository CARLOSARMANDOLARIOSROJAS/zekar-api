import "dotenv/config"; // Asegura que las variables de entorno se carguen
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as XLSX from "xlsx";
import fs from "fs";


const genAI = new GoogleGenerativeAI(process.env.GEMAI_API_KEY);

const XLSX_DATE_BASE = new Date(1900, 0, 1);

const convertirFecha = (fechaExcel) => {
    if (typeof fechaExcel === "date") {
        const fecha = new Date(XLSX_DATE_BASE);
        fecha.setDate(fecha.getDate() + fechaExcel - 2);
        return fecha;
    }
    return fechaExcel;
}

const leerExcelComoTexto = (path, maFilas = 200) => {
    const fileBuffer = fs.readFileSync(path);
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });

    let texto = "";
    let data = []; // Asegúrate de declarar `data`

    workbook.SheetNames.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        data = data.slice(0, maFilas);

        texto += `Hoja: ${sheetName}\n`;
        data.forEach((row) => {
            const filaConvertida = row.map((cell) => convertirFecha(cell));
            texto += filaConvertida.join("\t") + "\n";
        });
    });

    return texto;
}


export const getRespuestaAI = async (archivo, pregunta) => {

    const contexto = leerExcelComoTexto(archivo);
    try {
        // Obtener el modelo correcto
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        // Generar contenido con un prompt en formato adecuado
        const result = await model.generateContent(`${contexto}\n${pregunta}`);

        // Obtener la respuesta en texto
        const response = await result.response.text();

        return response;
    } catch (error) {
        console.error("Error al obtener respuesta de Gemini:", error);
        return "Error al procesar la solicitud.";
    }
};

