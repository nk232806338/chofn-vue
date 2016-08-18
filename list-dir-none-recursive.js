var fs = require("fs"),
  path = require("path");
var htmlPluginArray = [];
var entryObj = {};
var p = "./demo/src";
var files = fs.readdirSync(p);

files.map(function (file) {
  return file;
}).filter(function (file) {
  return fs.statSync(path.join(p, file)).isDirectory();
}).forEach(function (file) {
  console.log(file);
  entryObj[file] = './' + path.join(p, file) + '/main.js';

  htmlPluginArray.push({
    filename: file + '.html',
    template: path.join(p, file) + '/index.html',
    chunks: ['vendor', file],
  });
});

console.info(entryObj);
console.info(htmlPluginArray);

module.exports = {
  entry: entryObj,
  htmlPluginArray: htmlPluginArray,
};