

import { extractText } from "../services/pdfExtractor.js";
import { parseThermalData } from "../services/thermalParser.js";
import { buildPrompt } from "../services/promptBuilder.js";
import { generateAIReport } from "../services/openaiService.js";
import { generatePDF } from "../services/pdfGenerator.js";
import { extractImages } from "../services/imageExtractor.js";
import path from "path";

export const generateDDR = async (req, res) => {
  try {
    if (!req.files || !req.files.inspection || !req.files.thermal) {
      return res.status(400).json({
        success: false,
        message: "Missing required files: inspection and thermal are both required."
      });
    }

    const inspection = req.files.inspection[0];
    const thermal = req.files.thermal[0];

    console.log("Parsing text contents...");
    const inspectionText = await extractText(inspection.path);
    const thermalText = await extractText(thermal.path);

    const thermalData = parseThermalData(thermalText);

    console.log("Extracting graphic assets contextually...");
    const inspectionImages = await extractImages(inspection.path);
    const thermalImages = await extractImages(thermal.path);
    const allImages = [...inspectionImages, ...thermalImages];

    // Build the clean string catalog array for the AI to dynamically read
    const imageList = allImages.map(img => ({
      filename: path.basename(img.path),
      sourceReport: img.sourceFile,
      pageFoundOn: img.page
    }));

    console.log("Building prompt targeting strict 7-section structure...");
    const prompt = buildPrompt(inspectionText, thermalData, imageList);

    console.log("Awaiting streaming payload generation from OpenAI...");
    const reportText = await generateAIReport(prompt);

    const pdfPath = `generated-reports/DDR_${Date.now()}.pdf`;

    console.log("Compiling final deliverable layout with embedded images...");
    await generatePDF(reportText, pdfPath, allImages);

  res.status(200).json({
  success: true,
  report: reportText,
  images: allImages.map(img => img.path),
  pdfUrl: `${req.protocol}://${req.get("host")}/${pdfPath}`
});
  } catch (error) {
    console.error("Pipeline Failure:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};