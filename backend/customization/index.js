// backend/customization/index.js

module.exports = {
  // Core customization metadata controllers
  colorController: require("./colorController"),
  fabricController: require("./fabricController"),
  patternController: require("./patternController"),

  // Shape / structure
  fitAdjuster: require("./fitAdjuster"),
  lengthController: require("./lengthController"),
  sleeveController: require("./sleeveController"),
  necklineController: require("./necklineController"),

  // Extras
  accessoriesController: require("./accessoriesController"),
};
