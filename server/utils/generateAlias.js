const { nanoid } = require('nanoid');

const generateAlias = () => {
  return nanoid(8);
};

module.exports = generateAlias;
