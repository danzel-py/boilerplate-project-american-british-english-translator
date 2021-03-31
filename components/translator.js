const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

/*

<script>
tos = tosearch, top = toplace
var tos = 'W3Schools';
var str = "Visit W3Schools!"; 
var n = str.search(tos);
var top = 'MY HOUEs'
let lol = str.slice(0,n)+top+str.slice(n+tos.length)
document.getElementById("demo").innerHTML = lol;
</script>
*/

class Translator {
    americanToBritish(text) {
        let newText = text
        console.log(newText)
        for (const [key, value] of Object.entries(americanOnly)) {
            let toSearch = key
            let toPlace = value
            let index = newText.search(toSearch)
            if(index<0) {continue} // not found, go next iteration
            newText = newText.slice(0,index) + toPlace + newText.slice(index+toSearch.length)
        }
        for (const [key, value] of Object.entries(americanToBritishSpelling)) {
            let toSearch = key
            let toPlace = value
            let index = newText.search(toSearch)
            if(index<0) {continue} // not found, go next iteration
            newText = newText.slice(0,index) + toPlace + newText.slice(index+toSearch.length)
        }
        for (const [key, value] of Object.entries(americanToBritishTitles)) {
            let toSearch = key
            let toPlace = value
            let index = newText.search(toSearch)
            if(index<0) {continue} // not found, go next iteration
            newText = newText.slice(0,index) + toPlace + newText.slice(index+toSearch.length)
        }
        return (newText)
    }
    
    britishToAmerican(text) {
        let newText = text
        console.log(newText)
        for (const [key, value] of Object.entries(britishOnly)) {
            let toSearch = key
            let toPlace = value
            let index = newText.search(toSearch)
            if(index<0) {continue} // not found, next iteration
            newText = newText.slice(0,index) + toPlace + newText.slice(index+toSearch.length)
        }
        for (const [key, value] of Object.entries(americanToBritishSpelling)) {
            let toSearch = value
            let toPlace = key
            let index = newText.search(toSearch)
            if(index<0) {continue} // not found, next iteration
            newText = newText.slice(0,index) + toPlace + newText.slice(index+toSearch.length)
        }
        for (const [key, value] of Object.entries(americanToBritishTitles)) {
            let toSearch = value
            let toPlace = key
            let index = newText.search(toSearch)
            if(index<0) {continue} // not found, next iteration
            newText = newText.slice(0,index) + toPlace + newText.slice(index+toSearch.length)
        }
        return (newText)
    }
}

module.exports = Translator;