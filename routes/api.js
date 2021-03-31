'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      let lang = req.body.locale
      let text = req.body.text
      res.json({
        text: text,
        ...(lang === 'american-to-british' ? {
          translation: translator.americanToBritish(text)}: {
          translation: translator.britishToAmerican(text)})
        })
    });
};
