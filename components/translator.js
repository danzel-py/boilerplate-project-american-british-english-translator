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
        for (const [key, value] of Object.entries(americanOnly)) {
            let toSearch = key
            let toPlace = value
            let index = newText.search(toSearch)
            if (index < 0) continue // not found, go next iteration
            newText = newText.slice(0, index) + toPlace + newText.slice(index + toSearch.length)
        }
        for (const [key, value] of Object.entries(americanToBritishSpelling)) {
            let toSearch = key
            let toPlace = value
            let index = newText.search(toSearch)
            if (index < 0) continue // not found, go next iteration
            newText = newText.slice(0, index) + toPlace + newText.slice(index + toSearch.length)
        }
        for (const [key, value] of Object.entries(americanToBritishTitles)) {
            let toSearch = key
            let toPlace = value
            let index = newText.search(toSearch)
            if (index < 0) continue // not found, go next iteration
            newText = newText.slice(0, index) + toPlace + newText.slice(index + toSearch.length)
        }
        // replace 12:15 to 12.15
        let regex = /[0-1][0-9][:][0-5][0-9]|[2][0-4][:][0-5][0-9]|[0-9][:][0-5][0-9]/gm
        let found = newText.match(regex)
        if (found.length < 1) return (newText) // not found, do nothing
        found.forEach(clock => {
            let toSearch = clock
            let toPlace = clock.replace(':', '.')
            let index = newText.search(toSearch)
            newText = newText.slice(0, index) + toPlace + newText.slice(index + toSearch.length)
        })
        return (newText)
    }

    britishToAmerican(text) {
        let newText = text
        for (const [key, value] of Object.entries(britishOnly)) {
            let toSearch = key
            let toPlace = value
            let index = newText.search(toSearch)
            if (index < 0) continue // not found, next iteration
            newText = newText.slice(0, index) + toPlace + newText.slice(index + toSearch.length)
        }
        for (const [key, value] of Object.entries(americanToBritishSpelling)) {
            let toSearch = value
            let toPlace = key
            let index = newText.search(toSearch)
            if (index < 0) continue // not found, next iteration
            newText = newText.slice(0, index) + toPlace + newText.slice(index + toSearch.length)
        }
        for (const [key, value] of Object.entries(americanToBritishTitles)) {
            let toSearch = value
            let toPlace = key
            let index = newText.search(toSearch)
            if (index < 0) continue // not found, next iteration
            newText = newText.slice(0, index) + toPlace + newText.slice(index + toSearch.length)
        }
        // Replace 12.15 to 12:15
        let regex = /[0-1][0-9][.][0-5][0-9]|[2][0-4][.][0-5][0-9]|[0-9][.][0-5][0-9]/gm
        let found = newText.match(regex)
        if (found.length < 1) return (newText) // not found, do nothing
        found.forEach(clock => {
            let toSearch = clock
            let toPlace = clock.replace('.', ':')
            let index = newText.search(toSearch)
            newText = newText.slice(0, index) + toPlace + newText.slice(index + toSearch.length)
        })
        return(newText)

    }
}

module.exports = Translator;