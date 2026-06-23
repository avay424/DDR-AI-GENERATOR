


import fs from "fs";
import path from "path";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { createCanvas, Image as NodeCanvasImage } from "canvas";

globalThis.Image = NodeCanvasImage;

export const extractImages = async (pdfPath) => {
  const imageDir = path.join(process.cwd(), "extracted-images");

  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
  }

  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const pdfName = path.basename(pdfPath, ".pdf");

  const pdf = await pdfjsLib.getDocument({
    data,
    standardFontDataUrl: "node_modules/pdfjs-dist/standard_fonts/",
  }).promise;

  const imagePaths = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const opList = await page.getOperatorList();
    const fnArray = opList.fnArray;
    const argsArray = opList.argsArray;

    let imgIndex = 1;

    for (let i = 0; i < fnArray.length; i++) {
      if (
        fnArray[i] === pdfjsLib.OPS.paintImageXObject || 
        fnArray[i] === pdfjsLib.OPS.paintInlineImageXObject
      ) {
        const imgRef = argsArray[i][0];
        let imgObj;

        try {
          imgObj = page.objs.get(imgRef);
        } catch (e) {
          continue;
        }

        if (imgObj && imgObj.width && imgObj.height && imgObj.data) {
          const width = imgObj.width;
          const height = imgObj.height;

          const canvas = createCanvas(width, height);
          const ctx = canvas.getContext("2d");
          const imgData = ctx.createImageData(width, height);

          if (imgObj.data.length === width * height * 4) {
            imgData.data.set(imgObj.data);
          } else if (imgObj.data.length === width * height * 3) {
            let srcIdx = 0;
            let destIdx = 0;
            for (let p = 0; p < width * height; p++) {
              imgData.data[destIdx] = imgObj.data[srcIdx];
              imgData.data[destIdx + 1] = imgObj.data[srcIdx + 1];
              imgData.data[destIdx + 2] = imgObj.data[srcIdx + 2];
              imgData.data[destIdx + 3] = 255;
              srcIdx += 3;
              destIdx += 4;
            }
          } else {
            continue;
          }

          ctx.putImageData(imgData, 0, 0);

          const imagePath = path.join(
            imageDir,
            `${pdfName}_page_${pageNum}_img_${imgIndex}.png`
          );

          fs.writeFileSync(imagePath, canvas.toBuffer("image/png"));
          
          imagePaths.push({
            path: imagePath,
            sourceFile: pdfName,
            page: pageNum
          });
          
          imgIndex++;
          // DO NOT break — extract all images
        //   break; // Grab the primary image from the page to avoid layout duplicates
        }
      }
    }
  }

  return imagePaths;
};