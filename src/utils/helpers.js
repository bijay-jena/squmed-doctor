const camelize = text =>
  text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());

const camelToTitleCase = str =>
  str
    .replace(/([A-Z])/g, ' $1') // Add space before uppercase letters
    .replace(/^./, match => match.toUpperCase()) // Capitalize first letter
    .trim(); // Remove leading space if any

export {camelize, camelToTitleCase};
