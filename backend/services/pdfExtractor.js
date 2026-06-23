// import fs from "fs";
// import { PDFParse } from "pdf-parse";

// export const extractText = async (filePath) => {
//   const buffer = fs.readFileSync(filePath);

//   const parser = new PDFParse({ data: buffer });

//   const result = await parser.getText();

//   await parser.destroy();

//   return result.text;
// };


// import fs from "fs";
// import pkg from 'pdf-parse';
// const { PDFParse } = pkg;


// export const extractText =
//   async (filePath) => {
//     const buffer =
//       fs.readFileSync(filePath);

//     const parser =
//       new PDFParse({
//         data: buffer
//       });

//     const result =
//       await parser.getText();

//     await parser.destroy();

//     return result.text;
//   };


// import fs from "fs";
// import pdf from "pdf-parse";

// export const extractText = async (filePath) => {
//   const buffer = fs.readFileSync(filePath);
//   const result = await pdf(buffer);
//   return result.text;
// };


// import fs from "fs";

// export const extractText = async (filePath) => {
//   const buffer = fs.readFileSync(filePath);

//   const pdf = await import("pdf-parse");
//   const result = await pdf.default(buffer);

//   return result.text;
// };

// import fs from "fs";
// import pdf from "pdf-parse";

// export const extractText = async (filePath) => {
//   const buffer = fs.readFileSync(filePath);

//   const result = await pdf(buffer);

//   return result.text;
// };


// import fs from "fs";
// import pdfParse from 'pdf-parse';

// export const extractText = async (filePath) => {
//   try {
//     const buffer = fs.readFileSync(filePath);

//     // pdf-parse is a function, not a constructor class
//     const result = await pdfParse(buffer);

//     return result.text;
//   } catch (error) {
//     console.error("Error extracting text from PDF:", error);
//     throw error;
//   }
// };


import fs from "fs";
import pdfParse from 'pdf-parse';

export const extractText = async (filePath) => {
  try {
    const buffer = fs.readFileSync(filePath);
    
    // pdf-parse is a function module, not a class constructor
    const result = await pdfParse(buffer);
    
    return result.text;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw error;
  }
};