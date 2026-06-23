// export const extractImages = async () => {
//   return [];
// };

// import fs from "fs";
// import path from "path";

// export const extractImages = async (
//   pdfPath
// ) => {

//   const imageDir =
//     "extracted-images";

//   if (
//     !fs.existsSync(imageDir)
//   ) {
//     fs.mkdirSync(imageDir);
//   }

//   /*
//    Placeholder implementation.

//    If images are detected and extracted,
//    push their paths into imagePaths.

//    Example:
//    imagePaths.push(
//      "extracted-images/img1.png"
//    );
//   */

//   const imagePaths = [];

//   return imagePaths;
// };


// import fs from "fs";
// import path from "path";

// export const extractImages = async (
//   pdfPath
// ) => {

//   try {

//     const imageDir =
//       "extracted-images";

//     if (
//       !fs.existsSync(imageDir)
//     ) {
//       fs.mkdirSync(
//         imageDir,
//         {
//           recursive: true
//         }
//       );
//     }

//     console.log(
//       `Checking images in: ${pdfPath}`
//     );

//     /*
//       Placeholder for future image extraction.

//       Current Version:
//       - Creates extraction folder
//       - Supports image workflow
//       - Returns extracted images if available
//       - Returns empty array otherwise

//       DDR will display:
//       "Image Not Available"
//     */

//     return [];

//   } catch (error) {

//     console.log(
//       "Image Extraction Error:",
//       error
//     );

//     return [];

//   }

// };



// import fs from "fs";
// import path from "path";
// import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
// import { createCanvas } from "canvas";

// export const extractImages = async (
//   pdfPath
// ) => {

//   const imageDir =
//     path.join(
//       process.cwd(),
//       "extracted-images"
//     );

//   if (
//     !fs.existsSync(imageDir)
//   ) {
//     fs.mkdirSync(
//       imageDir,
//       { recursive: true }
//     );
//   }

//   const data =
//     new Uint8Array(
//       fs.readFileSync(pdfPath)
//     );

//   const pdf =
//     await pdfjsLib
//       .getDocument({
//         data
//       })
//       .promise;

//   const imagePaths = [];

//   for (
//     let pageNum = 1;
//     pageNum <= pdf.numPages;
//     pageNum++
//   ) {

//     const page =
//       await pdf.getPage(
//         pageNum
//       );

//     const viewport =
//       page.getViewport({
//         scale: 2
//       });

//     const canvas =
//       createCanvas(
//         viewport.width,
//         viewport.height
//       );

//     const context =
//       canvas.getContext(
//         "2d"
//       );

//     await page.render({
//       canvasContext:
//         context,
//       viewport
//     }).promise;

//     const imagePath =
//       path.join(
//         imageDir,
//         `${path.basename(
//           pdfPath,
//           ".pdf"
//         )}_page_${pageNum}.png`
//       );

//     fs.writeFileSync(
//       imagePath,
//       canvas.toBuffer()
//     );

//     imagePaths.push(
//       imagePath
//     );

//   }

//   return imagePaths;
// };


// import path from "path";
// import fs from "fs";
// import { fromPath } from "pdf2pic";

// export const extractImages = async (pdfPath) => {
//   const outputDir = path.join(process.cwd(), "extracted-images");

//   if (!fs.existsSync(outputDir)) {
//     fs.mkdirSync(outputDir, { recursive: true });
//   }

//   const converter = fromPath(pdfPath, {
//     density: 200,
//     saveFilename: "page",
//     savePath: outputDir,
//     format: "png",
//     width: 1200,
//     height: 1600,
//   });

//   const result = await converter.bulk(-1, true);

//   return result.map((r) => r.path);
// };


// import path from "path";
// import fs from "fs";
// import { fromPath } from "pdf2pic";

// export const extractImages = async (pdfPath) => {
//   if (!fs.existsSync(pdfPath)) {
//     throw new Error(`File not found: ${pdfPath}`);
//   }

//   const outputDir = path.join(process.cwd(), "extracted-images");

//   if (!fs.existsSync(outputDir)) {
//     fs.mkdirSync(outputDir, { recursive: true });
//   }

//   const converter = fromPath(pdfPath, {
//     density: 200,
//     saveFilename: "page",
//     savePath: outputDir,
//     format: "png",
//     width: 1200,
//     height: 1600,
//   });

//   const result = await converter.bulk(-1, true);

//   return result.map((r) => r.path);
// };


// import fs from "fs";
// import path from "path";

// export const extractImages = async (
//   pdfPath
// ) => {

//   try {

//     const imageDir =
//       "extracted-images";

//     if (
//       !fs.existsSync(imageDir)
//     ) {
//       fs.mkdirSync(
//         imageDir,
//         {
//           recursive: true
//         }
//       );
//     }

//     console.log(
//       `Checking images in: ${pdfPath}`
//     );

//     /*
//       Placeholder for future image extraction.

//       Current Version:
//       - Creates extraction folder
//       - Supports image workflow
//       - Returns extracted images if available
//       - Returns empty array otherwise

//       DDR will display:
//       "Image Not Available"
//     */

//     return [];

//   } catch (error) {

//     console.log(
//       "Image Extraction Error:",
//       error
//     );

//     return [];

//   }

// };


// import fs from "fs";
// import path from "path";
// import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
// import { createCanvas, Image as NodeCanvasImage } from "canvas";

// // Enforce image polyfills globally for runtime checks
// globalThis.Image = NodeCanvasImage;

// export const extractImages = async (pdfPath) => {
//   const imageDir = path.join(process.cwd(), "extracted-images");

//   if (!fs.existsSync(imageDir)) {
//     fs.mkdirSync(imageDir, { recursive: true });
//   }

//   const data = new Uint8Array(fs.readFileSync(pdfPath));

//   const pdf = await pdfjsLib.getDocument({
//     data,
//     standardFontDataUrl: "node_modules/pdfjs-dist/standard_fonts/",
//   }).promise;

//   const imagePaths = [];

//   for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
//     const page = await pdf.getPage(pageNum);
    
//     // Get the structural operator list containing all page drawing commands
//     const opList = await page.getOperatorList();
//     const fnArray = opList.fnArray;
//     const argsArray = opList.argsArray;

//     let imgIndex = 1;

//     for (let i = 0; i < fnArray.length; i++) {
//       // Intercept image commands: paintImageXObject or paintInlineImageXObject
//       if (
//         fnArray[i] === pdfjsLib.OPS.paintImageXObject || 
//         fnArray[i] === pdfjsLib.OPS.paintInlineImageXObject
//       ) {
//         const imgRef = argsArray[i][0];
//         let imgObj;

//         // Extract raw image dependencies safely
//         try {
//           imgObj = page.objs.get(imgRef);
//         } catch (e) {
//           continue; // Skip if resource binding isn't available
//         }

//         if (imgObj && imgObj.width && imgObj.height && imgObj.data) {
//           const width = imgObj.width;
//           const height = imgObj.height;

//           // Create an independent localized canvas block for this image extraction
//           const canvas = createCanvas(width, height);
//           const ctx = canvas.getContext("2d");
//           const imgData = ctx.createImageData(width, height);

//           // Map raw binary buffer streams based on pixel component layouts
//           if (imgObj.data.length === width * height * 4) {
//             // RGBA format
//             imgData.data.set(imgObj.data);
//           } else if (imgObj.data.length === width * height * 3) {
//             // RGB format conversion to RGBA layout
//             let srcIdx = 0;
//             let destIdx = 0;
//             for (let p = 0; p < width * height; p++) {
//               imgData.data[destIdx] = imgObj.data[srcIdx];     // R
//               imgData.data[destIdx + 1] = imgObj.data[srcIdx + 1]; // G
//               imgData.data[destIdx + 2] = imgObj.data[srcIdx + 2]; // B
//               imgData.data[destIdx + 3] = 255;                 // Alpha
//               srcIdx += 3;
//               destIdx += 4;
//             }
//           } else {
//             continue; // Unsupported pixel structure layout
//           }

//           ctx.putImageData(imgData, 0, 0);

//           const imagePath = path.join(
//             imageDir,
//             `${path.basename(pdfPath, ".pdf")}_page_${pageNum}_img_${imgIndex}.png`
//           );

//           fs.writeFileSync(imagePath, canvas.toBuffer("image/png"));
//           imagePaths.push(imagePath);
//           imgIndex++;
//         }
//       }
//     }
//   }

//   return imagePaths;
// };


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