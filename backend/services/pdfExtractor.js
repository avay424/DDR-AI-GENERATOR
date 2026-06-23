


import fs from "fs";
import pdfParse from 'pdf-parse';

export const extractText = async (filePath) => {
  try {
    const buffer = fs.readFileSync(filePath);
    
    
    const result = await pdfParse(buffer);
    
    return result.text;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw error;
  }
};