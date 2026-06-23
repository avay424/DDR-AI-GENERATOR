


export const parseThermalData = (text) => {
  const readings = [];
  
  
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