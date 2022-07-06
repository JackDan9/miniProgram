const uuidv1 = require("uuid/v1");

module.exports = {
  generateUUID() {
    return uuidv1().replace(/-/g, "");
  }
} 