// import PDFDocument from "pdfkit";
// import fs from "fs";

// export const generatePDF =
//   async (
//     content,
//     outputPath
//   ) => {
//     return new Promise(
//       (resolve) => {
//         const doc =
//           new PDFDocument();

//         const stream =
//           fs.createWriteStream(
//             outputPath
//           );

//         doc.pipe(stream);

//         doc
//           .fontSize(24)
//           .text(
//             "Detailed Diagnostic Report",
//             {
//               align: "center",
//               underline: true,
//             }
//           );

//         doc.moveDown();

//         doc
//           .fontSize(12)
//           .text(content);

//         doc.end();

//         stream.on(
//           "finish",
//           () => {
//             resolve(outputPath);
//           }
//         );
//       }
//     );
//   };

// import PDFDocument from "pdfkit";
// import fs from "fs";

// export const generatePDF =
//   async (
//     content,
//     outputPath
//   ) => {

//     return new Promise(
//       (resolve) => {

//         const doc =
//           new PDFDocument();

//         const stream =
//           fs.createWriteStream(
//             outputPath
//           );

//         doc.pipe(stream);

//         doc
//           .fontSize(24)
//           .text(
//             "Detailed Diagnostic Report",
//             {
//               align:
//                 "center"
//             }
//           );

//         doc.moveDown();

//         doc
//           .fontSize(12)
//           .text(content);

//         doc.end();

//         stream.on(
//           "finish",
//           () => {
//             resolve(
//               outputPath
//             );
//           }
//         );
//       }
//     );
//   };


// import PDFDocument from "pdfkit";
// import fs from "fs";
// import path from "path";

// export const generatePDF = async (
//   content,
//   outputPath,
//   images = []
// ) => {

//   const dir =
//     path.dirname(
//       outputPath
//     );

//   if (
//     !fs.existsSync(dir)
//   ) {
//     fs.mkdirSync(
//       dir,
//       {
//         recursive: true
//       }
//     );
//   }

//   return new Promise(
//     (
//       resolve,
//       reject
//     ) => {

//       const doc =
//         new PDFDocument({
//           margin: 50
//         });

//       const stream =
//         fs.createWriteStream(
//           outputPath
//         );

//       doc.pipe(stream);

//       doc
//         .fontSize(22)
//         .text(
//           "Detailed Diagnostic Report",
//           {
//             align:
//               "center"
//           }
//         );

//       doc.moveDown();

//       doc
//         .fontSize(11)
//         .text(content);

//       if (
//         images.length > 0
//       ) {

//         images.forEach(
//           (imagePath) => {

//             if (
//               fs.existsSync(
//                 imagePath
//               )
//             ) {

//               doc.addPage();

//               doc
//                 .fontSize(18)
//                 .text(
//                   "Image Evidence"
//                 );

//               doc.moveDown();

//               doc.image(
//                 imagePath,
//                 {
//                   fit: [
//                     450,
//                     350
//                   ],
//                   align:
//                     "center"
//                 }
//               );

//             }

//           }
//         );

//       }

//       doc.end();

//       stream.on(
//         "finish",
//         () => {
//           resolve(
//             outputPath
//           );
//         }
//       );

//       stream.on(
//         "error",
//         reject
//       );

//     }
//   );
// };

// import PDFDocument from "pdfkit";
// import fs from "fs";
// import path from "path";

// export const generatePDF = async (content, outputPath, images = []) => {
//   const dir = path.dirname(outputPath);
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir, { recursive: true });
//   }

//   return new Promise((resolve, reject) => {
//     const doc = new PDFDocument({ margin: 50 });
//     const stream = fs.createWriteStream(outputPath);

//     doc.pipe(stream);

//     // Document Main Title - Standard PDFKit way to set font styles
//     doc.font("Helvetica-Bold").fontSize(24).text("Detailed Diagnostic Report (DDR)", { align: "center" });
//     doc.moveDown(2);

//     const lines = content.split("\n");

//     lines.forEach((line) => {
//       // Check for image placeholder tags injected by the prompt
//       const imageTagMatch = line.match(/\[INSERT_IMAGE_PAGE_(\d+)\]/);

//       if (imageTagMatch) {
//         const targetPage = parseInt(imageTagMatch[1], 10);
        
//         // Find the extracted file matching this precise page context
//         const matchingImage = images.find(img => img.page === targetPage);

//         if (matchingImage && fs.existsSync(matchingImage.path)) {
//           doc.moveDown(1);
//           try {
//             doc.image(matchingImage.path, {
//               fit: [400, 250],
//               align: "center"
//             });
//             doc.moveDown(1);
//           } catch (err) {
//             console.error("Error inserting image into PDF structure:", err);
//           }
//         } else {
//           doc.font("Helvetica-Oblique").fontSize(10).fillColor("gray").text("[Image Not Available]");
//           doc.fillColor("black");
//         }
//       } else if (line.startsWith("#")) {
//         // Render headings cleanly with Bold font setting
//         const cleanHeading = line.replace(/#/g, "").trim();
//         doc.moveDown(1);
//         doc.font("Helvetica-Bold").fontSize(16).text(cleanHeading);
//         doc.moveDown(0.5);
//       } else if (line.trim() !== "") {
//         // Render regular body text lines with standard Regular font setting
//         doc.font("Helvetica").fontSize(11).text(line);
//       }
//     });

//     doc.end();

//     stream.on("finish", () => resolve(outputPath));
//     stream.on("error", reject);
//   });
// };
 

import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generatePDF = async (content, outputPath, images = []) => {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, autoFirstPage: true });
    const stream = fs.createWriteStream(outputPath);

    doc.pipe(stream);

    // Corporate Header Layout styling
    doc.font("Helvetica-Bold").fontSize(22).fillColor("#1A365D").text("Detailed Diagnostic Report (DDR)", { align: "center" });
    doc.moveDown(1.5);
    doc.fillColor("#000000");

    const lines = content.split("\n");

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine === "") return;

      // Scan precisely for the embedding instructions: [EMBED: filename.png]
      const imageMatch = trimmedLine.match(/\[EMBED:\s*([^\]]+)\]/i);

      if (imageMatch) {
        const targetFilename = imageMatch[1].trim();
        
        // Find the exact image matching the file name the AI selected
        const matchingImage = images.find(img => path.basename(img.path) === targetFilename);

        if (matchingImage && fs.existsSync(matchingImage.path)) {
          try {
            // Push layout to a new page safely if running low on vertical grid spaces
            if (doc.y > 560) doc.addPage();
            else doc.moveDown(0.5);

            doc.image(matchingImage.path, {
              fit: [360, 210],
              align: "center"
            });
            doc.moveDown(0.8);
          } catch (err) {
            console.error("Error drawing targeted image line into PDFKit stream:", err);
          }
        }
      } else if (trimmedLine.startsWith("##")) {
        // Location Headings layout
        doc.moveDown(1);
        doc.font("Helvetica-Bold").fontSize(14).fillColor("#2B6CB0").text(trimmedLine.replace(/##/g, "").trim());
        doc.moveDown(0.5);
        doc.fillColor("#000000");
      } else if (trimmedLine.startsWith("#")) {
        // Core sections headings (1 to 7) layout
        doc.moveDown(1.5);
        doc.font("Helvetica-Bold").fontSize(16).fillColor("#1A365D").text(trimmedLine.replace(/#/g, "").trim());
        doc.moveDown(0.5);
        doc.fillColor("#000000");
      } else {
        // Standard rich paragraph lines layout
        doc.font("Helvetica").fontSize(11).text(trimmedLine, { lineGap: 4 });
        doc.moveDown(0.5);
      }
    });

    doc.end();
    stream.on("finish", () => resolve(outputPath));
    stream.on("error", reject);
  });
};