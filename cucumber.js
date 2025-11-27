const options = [
  '--require-module ts-node/register',
  '--require graphqlproject/cucumber/helper/world.ts',
  '--require graphqlproject/cucumber/helper/hooks.ts',
  '--require graphqlproject/cucumber/steps/**/*.ts',
  '--format progress'
].join(' ');

module.exports = {
  default: [
    'graphqlproject/cucumber/features/**/*.feature',
    options
  ].join(' ')
};

// const path = require("path");

// function buildProjectConfig(projectName) {
//   return [
//     `./${projectName}/cucumber/features/**/*.feature`,
//     `--require-module ts-node/register`,
//     `--require ./${projectName}/cucumber/helper/world.ts`,
//     `--require ./${projectName}/cucumber/helper/hooks.ts`,
//     `--require ./${projectName}/cucumber/steps/**/*.ts`,
//     `--format progress`
//   ].join(" ");
// }

// module.exports = {
//   // Run all projects at once
//   default: [
//     buildProjectConfig("screwfixproject"),
//     buildProjectConfig("cucumberproject"),
//   ].join(" "),

//   // Run only a specific project
//   screwfix: buildProjectConfig("screwfixproject"),

// };

