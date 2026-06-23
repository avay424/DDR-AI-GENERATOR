// export const buildPrompt = (
//   inspectionText,
//   thermalData
// ) => {
//   return `

// You are a senior civil engineer.

// Generate a Detailed Diagnostic Report.

// Required Sections:

// 1 Executive Summary

// 2 Property Issues Summary

// 3 Thermal Findings

// 4 Root Cause Analysis

// 5 Severity Assessment

// 6 Recommended Repairs

// 7 Risks Due To Delay

// 8 Conclusion

// Inspection Data:

// ${inspectionText}

// Thermal Data:

// ${JSON.stringify(
//   thermalData,
//   null,
//   2
// )}

// `;
// };


// 

// export const buildPrompt = (
//   inspectionText,
//   thermalData
// ) => {

//   return `
// You are a Chartered Structural Engineer, Building Pathology Consultant, and Diagnostic Investigation Expert.

// Your responsibility is to generate a professional Detailed Diagnostic Report (DDR) based ONLY on the provided inspection and thermal reports.

// IMPORTANT RULES:

// - Do not hallucinate.
// - Do not invent facts.
// - Use engineering terminology.
// - Write like a consulting engineering firm.
// - Avoid phrases like:
//   "it is difficult to determine"
//   "without more information"
//   "may be possible"
// - Give the most probable engineering interpretation from the supplied data.
// - If information is missing, write "Not Available".

// Generate the report in the following format:

// # PROPERTY DETAILS

// Include:
// - Property Type
// - Property Age
// - Number Of Floors
// - Previous Repairs
// - Inspection Date

// # EXECUTIVE SUMMARY

// Provide a concise overview of major defects and overall condition.

// # AREA WISE FINDINGS TABLE

// Create a table with:

// | Area | Observation | Severity | Probable Cause |

// Cover all observed locations.

// # OBSERVED DEFECTS

// ## Dampness Related Issues

// ## Leakage Related Issues

// ## Crack Related Issues

// ## Tile Joint Issues

// ## Surface Deterioration Issues

// For every issue provide:
// - Observation
// - Severity
// - Technical Impact

// # THERMAL ANALYSIS

// Analyse thermal findings.

// For every thermal reading provide:

// - Hotspot Temperature
// - Coldspot Temperature
// - Temperature Difference
// - Severity Classification

// Explain how thermal evidence supports inspection findings.

// # ROOT CAUSE ANALYSIS

// For every major defect provide:

// ### Issue
// ### Probable Cause
// ### Supporting Evidence
// ### Impact On Structure

// # STRUCTURAL RISK ASSESSMENT

// Create a risk matrix.

// Classify each issue as:

// - Low
// - Moderate
// - High
// - Critical

// Provide justification.

// # RECOMMENDED REPAIR METHODOLOGY

// For every defect provide:

// ### Repair Procedure
// ### Materials Required
// ### Priority Level

// Priority Levels:
// - Immediate
// - High
// - Medium
// - Low

// # RISKS DUE TO DELAY

// Explain engineering consequences of delayed repairs.

// # COST IMPACT ASSESSMENT

// Provide a qualitative assessment:

// - Low Cost
// - Medium Cost
// - High Cost

// Explain how repair costs may increase if delayed.

// # FINAL CONCLUSION

// Provide professional engineering recommendations and next actions.

// --------------------------------------------------

// INSPECTION REPORT:

// ${inspectionText}

// --------------------------------------------------

// THERMAL DATA:

// ${JSON.stringify(
//   thermalData,
//   null,
//   2
// )}

// --------------------------------------------------
// `;
// };


// export const buildPrompt = (
//   inspectionText,
//   thermalData,
//   images = []
// ) => {

//   return `
// You are a Chartered Structural Engineer, Building Pathology Consultant, and Diagnostic Investigation Expert.

// Your responsibility is to generate a professional Detailed Diagnostic Report (DDR) based ONLY on the provided inspection and thermal reports.

// IMPORTANT RULES:

// - Do not hallucinate.
// - Do not invent facts.
// - Use engineering terminology.
// - Write like a consulting engineering firm.
// - Avoid phrases such as:
//   - "it is difficult to determine"
//   - "without more information"
//   - "may be possible"
// - Give the most probable engineering interpretation from the supplied data.
// - If information is missing, write "Not Available".
// - Avoid generic AI-style responses.
// - Be specific, structured, and professional.

// ==================================================

// GENERATE THE REPORT IN THE FOLLOWING FORMAT

// # PROPERTY DETAILS

// Include:

// - Property Type
// - Property Age
// - Number Of Floors
// - Previous Repairs
// - Inspection Date

// # EXECUTIVE SUMMARY

// Provide a concise summary of:

// - Overall building condition
// - Major defects identified
// - Risk level
// - Recommended next actions

// # PROPERTY ISSUE SUMMARY

// Provide a bullet list summarizing all major issues identified from both reports.

// # AREA WISE FINDINGS TABLE

// Create a table:

// | Area | Observation | Severity | Probable Cause |

// Cover every affected location identified in the reports.

// # OBSERVED DEFECTS

// ## Dampness Related Issues

// For each defect provide:

// - Observation
// - Severity
// - Technical Impact

// ## Leakage Related Issues

// For each defect provide:

// - Observation
// - Severity
// - Technical Impact

// ## Crack Related Issues

// For each defect provide:

// - Observation
// - Severity
// - Technical Impact

// ## Tile Joint Issues

// For each defect provide:

// - Observation
// - Severity
// - Technical Impact

// ## Surface Deterioration Issues

// For each defect provide:

// - Observation
// - Severity
// - Technical Impact

// # IMAGE EVIDENCE

// If image information exists:

// For each image provide:

// - Image Name
// - Probable Area
// - Visual Observation
// - Defect Correlation

// If no images are available:

// Image Not Available

// # THERMAL ANALYSIS

// Analyse all thermal findings.

// For each thermal reading provide:

// - Hotspot Temperature
// - Coldspot Temperature
// - Temperature Difference
// - Severity Classification

// Explain:

// - Relationship between thermal anomalies and observed defects
// - Possible moisture intrusion zones
// - Potential concealed leak locations
// - Areas requiring further investigation

// # ROOT CAUSE ANALYSIS

// For every major defect provide:

// ### Issue

// ### Probable Cause

// ### Supporting Evidence

// ### Impact On Structure

// ### Recommended Verification Method

// # STRUCTURAL RISK ASSESSMENT

// Create a risk assessment table:

// | Issue | Risk Classification | Justification |

// Use only:

// - Low
// - Moderate
// - High
// - Critical

// Provide engineering justification.

// # RECOMMENDED REPAIR METHODOLOGY

// For every defect provide:

// ### Defect

// ### Repair Procedure

// ### Materials Required

// ### Priority Level

// Priority Levels:

// - Immediate
// - High
// - Medium
// - Low

// # RISKS DUE TO DELAY

// Explain consequences of delayed repairs including:

// - Structural deterioration
// - Water ingress
// - Corrosion risk
// - Mold/fungal growth
// - Increased repair costs
// - Occupant safety concerns

// # COST IMPACT ASSESSMENT

// Provide qualitative assessment:

// - Low Cost
// - Medium Cost
// - High Cost

// Explain how repair costs may increase if action is delayed.

// # MISSING OR UNCLEAR INFORMATION

// List all unavailable or unclear information.

// Use:

// "Not Available"

// where appropriate.

// # FINAL CONCLUSION

// Provide a professional engineering conclusion including:

// - Overall condition assessment
// - Repair urgency
// - Recommended next actions
// - Long-term maintenance recommendations

// ==================================================

// INSPECTION REPORT:

// ${inspectionText}

// ==================================================

// THERMAL DATA:

// ${JSON.stringify(
//   thermalData,
//   null,
//   2
// )}

// ==================================================

// EXTRACTED IMAGE REFERENCES

// These image files were extracted from the uploaded reports.
// Use them as visual evidence references.

// If image names indicate inspection photos,
// mention them in the Image Evidence section.

// If no image data is available,
// write "Image Not Available".

// ${JSON.stringify(
//   images,
//   null,
//   2
// )}

// ==================================================
// `;
// };


export const buildPrompt = (inspectionText, thermalData, imageList = []) => {
  // Converts your image array into a readable checklist for the AI model
  const imageMenu = imageList.map(img => `Filename: ${img.filename} (Found on Page ${img.pageFoundOn} of ${img.sourceReport})`).join("\n");

  return `
You are an expert AI Assistant specialized in translating raw property assessment data into a clear, client-friendly property report.
Your task is to review the raw Site Inspection notes and the Thermal Camera readings, logically merge the findings, and generate a clear, empathetic, and professional Detailed Diagnostic Report (DDR).

CRITICAL ASSIGNMENT RULES:
- Use simple, easy-to-understand language for a regular homeowner. 
- Avoid unnecessary technical engineering jargon. Explain what terms mean clearly.
- Do NOT invent facts. If information is missing, write "Not Available".
- Do not repeat or duplicate points.

YOUR RESPONSE MUST STRICTLY FOLLOW THIS 7-SECTION STRUCTURE WITH EXACT HEADERS:

# 1. PROPERTY ISSUE SUMMARY
Provide a comprehensive, bulleted executive summary listing all major property structural anomalies, damp spots, and plumbing flaws uncovered across both reports.

# 2. AREA-WISE OBSERVATIONS
Break down findings location by location (e.g., Hall, Bedroom, Kitchen, Master Bedroom, Common Bathroom, Parking Area). 
For EVERY single affected area, you MUST write a highly detailed, elaborate paragraph description. 

For each area, elaborately explain:
1. The exact visible symptoms observed on-site (e.g., paint peeling, damp patches on the skirting boards, or water dripping).
2. The exact thermal camera findings associated with that specific area from the thermal dataset. You MUST explicitly quote the relevant Hotspot and Coldspot temperatures.
3. A thorough explanation of how the temperature dropping correlates directly with the moisture trapped inside that specific wall or ceiling.

CRITICAL IMAGE MATCHING INSTRUCTION:
Review the "AVAILABLE IMAGE FILES" list below. For each area you describe, select the images that belong to that room based on the page descriptions. Immediately following that room's text paragraph, you MUST print the exact layout tag on its own line:
[EMBED: filename_here.png]

You MUST format every room using subheadings starting with "## " followed by the exact area name, exactly like this:
## Hall
[Elaborate detailed paragraph analysis goes here...]
[EMBED: Sample Report_page_3_img_1.png]

## Bedroom
[Elaborate detailed paragraph analysis goes here...]
[EMBED: Thermal Images_page_5_img_1.png]

# 3. PROBABLE ROOT CAUSE
Provide a deep, logical analysis explaining exactly where the water or structural damage is originating from and how it is traveling through the building assets.

# 4. SEVERITY ASSESSMENT
Rate the problems overall (e.g., Low, Moderate, Severe) and provide clear, simple engineering justifications explaining why you assigned that specific risk level.

# 5. RECOMMENDED ACTIONS
Give the client a clear, robust, step-by-step sequential list of practical repair instructions to fix the issues permanently.

# 6. ADDITIONAL NOTES
Add extra crucial insights, safety precautions, or recommended dry-out timelines (e.g., 2-3 weeks) before the client applies cosmetic paint over the repaired surfaces.

# 7. MISSING OR UNCLEAR INFORMATION
Explicitly list any crucial details that were not provided in the source documents. If nothing is missing, write "None".

=========================================
AVAILABLE IMAGE FILES TO MATCH AND EMBED:
${imageMenu}
=========================================

=========================================
RAW SOURCE INPUTS TO MERGE:

INSPECTION REPORT DATA:
${inspectionText}

THERMAL REPORT IMAGING DATA:
${JSON.stringify(thermalData, null, 2)}
=========================================
`;
};