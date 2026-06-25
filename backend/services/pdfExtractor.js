import fs from "fs";
import pdfParse from "pdf-parse";

export const extractText = async (filePath) => {
  try {
    console.log(`Starting text extraction: ${filePath}`);
    console.time(`Text Extraction: ${filePath}`);

    const buffer = fs.readFileSync(filePath);

    const result = await pdfParse(buffer);

    console.timeEnd(`Text Extraction: ${filePath}`);
    console.log(`Completed text extraction: ${filePath}`);

    return result.text;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw error;
  }
};
