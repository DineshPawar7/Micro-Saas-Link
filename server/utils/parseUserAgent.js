const UAParser = require('ua-parser-js');

module.exports = (userAgentString) => {
  const parser = new UAParser(userAgentString);
  const result = parser.getResult();
  return {
    device: result.device.type || "Desktop",
    browser: result.browser.name || "Unknown"
  };
};
