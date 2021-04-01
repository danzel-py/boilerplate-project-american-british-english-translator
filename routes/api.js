'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      let lang = req.body.locale
      let text = req.body.text
      let translation
      if (!lang) return res.send({error: 'Required field(s) missing'})
      if (text === '') return res.send({ error: 'No text to translate' })
      if (!text) return res.send({error: 'Required field(s) missing'})
      if (lang !== 'american-to-british' && lang!== 'british-to-american') return res.send({ error: 'Invalid value for locale field' })
      lang === 'american-to-british'?
        translation = translator.americanToBritish(text):
        translation = translator.britishToAmerican(text)
      if (text === translation) return res.json({
        text: text,
        translation: "Everything looks good to me!"
      })
      res.json({
        text: text,
        translation: translation
      })
    });
};
