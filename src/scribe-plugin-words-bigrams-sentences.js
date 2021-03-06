var reqwest = require('reqwest');
var wordGrams = require('word-ngrams');
var biGrams = require('n-gram');

module.exports = function(config) {

  const URL = config.url;

  return function(scribe) {
      let unWords = [
          (text) => text.replace(/the/g, " "),
          (text) => text.replace(/and/g, " "),
          (text) => text.replace(/but/g, " "),
          (text) => text.replace(/then/g, " "),
          (text) => text.replace(/ a /g, " "),
          (text) => text.replace(/ of /g, " "),
          (text) => text.replace(/ an /g, " "),
          (text) => text.replace(/ in /g, " "),
          (text) => text.replace(/ on /g, " "),
          (text) => text.replace(/ by /g, " "),
          (text) => text.replace(/ to /g, " ")
          ];

      var nGramsCommand = new scribe.api.Command('nGrams');

      nGramsCommand.execute = () => {
          let text = unWords.reduce((val, fn) => {
              return fn(val);
          }, scribe.el.innerText);

          let nGrams = wordGrams.buildNGrams(text);
          let list = wordGrams.listAllNGrams(nGrams);
          let mostCommon = wordGrams.getMostCommonNGrams(nGrams);

          return { nGrams: nGrams,
                   listOfNGrams: list,
                   mostCommon: mostCommon
                 };
      };

      nGramsCommand.queryEnable = () => {
          return true;
      };

      scribe.commands['nGrams'] = nGramsCommand;
  };
};
