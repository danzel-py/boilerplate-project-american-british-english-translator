const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    test('Translation with text and locale fields: POST request to /api/translate',()=>{
        chai.request(server)
            .post('/api/translate')
            .send({
                text: "Dr Bro! Have you seen Mrs Kalyani's estate car? We're supposed to leave at 3.45 you know.",
                locale: "british-to-american"
            })
            .end((err,res)=>{
                assert.equal(res.status, 200)
                assert.isObject(res.body)
                assert.property(res.body, 'text')
                assert.property(res.body, 'translation')
                assert.equal(res.body.text, "Dr Bro! Have you seen Mrs Kalyani's estate car? We're supposed to leave at 3.45 you know.")
                assert.equal(res.body.translation, "<span class = 'highlight'>Dr.</span> Bro! Have you seen <span class = 'highlight'>Mrs.</span> Kalyani's <span class = 'highlight'>station wagon</span>? We're supposed to leave at <span class = 'highlight'>3:45</span> you know.")
            })
    })
    test('Translation with text and invalid locale field: POST request to /api/translate',()=>{
        chai.request(server)
            .post('/api/translate')
            .send({
                text: "Dr Bro! Have you seen Mrs Kalyani's estate car? We're supposed to leave at 3.45 you know.",
                locale: "british-to-amserican"
            })
            .end((err,res)=>{
                assert.equal(res.status, 200)
                assert.isObject(res.body)
                assert.property(res.body, 'error')
                assert.equal(res.body.error, 'Invalid value for locale field')
            })
    })
    test('Translation with missing text field: POST request to /api/translate',()=>{
        chai.request(server)
            .post('/api/translate')
            .send({
                locale: "british-to-american"
            })
            .end((err,res)=>{
                assert.equal(res.status, 200)
                assert.isObject(res.body)
                assert.property(res.body, 'error')
                assert.equal(res.body.error, 'Required field(s) missing')
            })
    })
    test('Translation with missing locale field: POST request to /api/translate',()=>{
        chai.request(server)
            .post('/api/translate')
            .send({
                text: "Dr Bro! Have you seen Mrs Kalyani's estate car? We're supposed to leave at 3.45 you know."
            })
            .end((err,res)=>{
                assert.equal(res.status, 200)
                assert.isObject(res.body)
                assert.property(res.body, 'error')
                assert.equal(res.body.error, 'Required field(s) missing')
            })
    })
    test('Translation with empty text: POST request to /api/translate',()=>{
        chai.request(server)
            .post('/api/translate')
            .send({
                text: "",
                locale: 'american-to-british'   
            })
            .end((err,res)=>{
                assert.equal(res.status, 200)
                assert.isObject(res.body)
                assert.property(res.body, 'error')
                assert.equal(res.body.error, 'No text to translate')
            })
    })
    test('Translation with text that needs no translation: POST request to /api/translate',()=>{
        chai.request(server)
            .post('/api/translate')
            .send({
                text: "Bro! Have you seen Kalyani? We're supposed to leave at 3 you know.",
                locale: "british-to-american"
            })
            .end((err,res)=>{
                assert.equal(res.status, 200)
                assert.isObject(res.body)
                assert.property(res.body, 'text')
                assert.property(res.body, 'translation')
                assert.equal(res.body.text, "Bro! Have you seen Kalyani? We're supposed to leave at 3 you know.")
                assert.equal(res.body.translation, "Everything looks good to me!")
            })
    })

});
