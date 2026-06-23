
 

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

    
    doc.font("Helvetica-Bold").fontSize(22).fillColor("#1A365D").text("Detailed Diagnostic Report (DDR)", { align: "center" });
    doc.moveDown(1.5);
    doc.fillColor("#000000");

    const lines = content.split("\n");

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine === "") return;

  
      const imageMatch = trimmedLine.match(/\[EMBED:\s*([^\]]+)\]/i);

      if (imageMatch) {
        const targetFilename = imageMatch[1].trim();
        
      
        const matchingImage = images.find(img => path.basename(img.path) === targetFilename);

        if (matchingImage && fs.existsSync(matchingImage.path)) {
          try {
            
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
        
        doc.moveDown(1);
        doc.font("Helvetica-Bold").fontSize(14).fillColor("#2B6CB0").text(trimmedLine.replace(/##/g, "").trim());
        doc.moveDown(0.5);
        doc.fillColor("#000000");
      } else if (trimmedLine.startsWith("#")) {
  
        doc.moveDown(1.5);
        doc.font("Helvetica-Bold").fontSize(16).fillColor("#1A365D").text(trimmedLine.replace(/#/g, "").trim());
        doc.moveDown(0.5);
        doc.fillColor("#000000");
      } else {
    
        doc.font("Helvetica").fontSize(11).text(trimmedLine, { lineGap: 4 });
        doc.moveDown(0.5);
      }
    });

    doc.end();
    stream.on("finish", () => resolve(outputPath));
    stream.on("error", reject);
  });
};