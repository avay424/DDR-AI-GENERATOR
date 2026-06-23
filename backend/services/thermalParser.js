// export const parseThermalData = (
//   text
// ) => {
//   const readings = [];

//   const regex =
//     /Hotspot\s*:\s*([\d.]+)\s*°C[\s\S]*?Coldspot\s*:\s*([\d.]+)\s*°C/g;

//   let match;

//   while (
//     (match = regex.exec(text))
//   ) {
//     readings.push({
//       hotspot: match[1],
//       coldspot: match[2],
//     });
//   }

//   return readings;
// };


// export const parseThermalData =
//   (text) => {

//     const readings = [];

//     const regex =
//       /Hotspot\s*:\s*([\d.]+)\s*°C[\s\S]*?Coldspot\s*:\s*([\d.]+)\s*°C/g;

//     let match;

//     while (
//       (match =
//         regex.exec(text))
//     ) {
//       readings.push({
//         hotspot:
//           match[1],
//         coldspot:
//           match[2]
//       });
//     }

//     return readings;
//   };


export const parseThermalData = (text) => {
  const readings = [];
  
  // This regex matches standard numbers, optional dollar signs, spaces, 
  // and variations of the degree sign like °C or ^{\circ}C
  const regex = /Hotspot\s*:\s*\$?([\d.]+)\s*(?:°C|\\circ\s*C|\^{\\circ}C)?[\s\S]*?Coldspot\s*:\s*\$?([\d.]+)\s*(?:°C|\\circ\s*C|\^{\\circ}C)?/gi;

  let match;

  while ((match = regex.exec(text)) !== null) {
    readings.push({
      hotspot: match[1],
      coldspot: match[2]
    });
  }

  console.log(`📊 Successfully parsed ${readings.length} thermal temperature readings from the report.`);
  return readings;
};