const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

/*


tos = tosearch, top = toplace
var tos = 'W3Schools';
var str = "Visit W3Schools!"; 
var n = str.search(tos);
var top = 'MY HOUEs'
let lol = str.slice(0,n)+top+str.slice(n+tos.length)
document.getElementById("demo").innerHTML = lol;
*/

class Translator {
    americanToBritish(text) {
        let rege = /[A-z]|[<]|[>]/
        let newText = text
        while (true) {
            let dummy = newText
            for (const [key, value] of Object.entries(americanOnly)) {
                let toSearch = key
                let toPlace = `<span class="highlight">${value}</span>`
                let textLow = newText.toLowerCase()
                let index = textLow.search(toSearch)
                if (index < 0) continue // not found, go next iteration
                if (index > 1) {
                    if (rege.test(newText[index - 1])) continue
                }
                if (index + toSearch.length < newText.length){
                    if (rege.test(newText[index + toSearch.length])) continue
                }
                newText = newText.slice(0, index) + toPlace + newText.slice(index + toSearch.length)
            }
            for (const [key, value] of Object.entries(americanToBritishSpelling)) {
                let toSearch = key
                let toPlace = `<span class="highlight">${value}</span>`
                let textLow = newText.toLowerCase()
                let index = textLow.search(toSearch)
                if (index < 0) continue // not found, go next iteration
                if (index > 1) {
                    if (rege.test(newText[index - 1])) continue
                }
                if (index + toSearch.length < newText.length){
                    if (rege.test(newText[index + toSearch.length])) continue
                }                newText = newText.slice(0, index) + toPlace + newText.slice(index + toSearch.length)
            }
            for (const [key, value] of Object.entries(americanToBritishTitles)) {
                let toSearch = key
                value = value.charAt(0).toUpperCase() + value.slice(1)
                let toPlace = `<span class="highlight">${value}</span>`
                let textLow = newText.toLowerCase()
                let index = textLow.search(toSearch)
                if (index < 0) continue // not found, go next iteration
                if (index > 1) {
                    if (rege.test(newText[index - 1])) continue
                }
                if (index + toSearch.length < newText.length){
                    if (rege.test(newText[index + toSearch.length])) continue
                }                newText = newText.slice(0, index) + toPlace + newText.slice(index + toSearch.length)
            }
            // replace 12:15 to 12.15
            let regex = /[0-1][0-9][:][0-5][0-9]|[2][0-4][:][0-5][0-9]|[0-9][:][0-5][0-9]/gm
            let found = newText.match(regex)
            if (found) { // not found, do nothing
                found.forEach(clock => {
                    let toSearch = clock
                    let toPlace = `<span class="highlight">${clock.replace(':', '.')}</span>`
                    let index = newText.search(toSearch)
                    newText = newText.slice(0, index) + toPlace + newText.slice(index + toSearch.length)
                })
            }
            // break when nothing can be translated

            // ERROR DOESN'T BREAK WHEN 
            if (dummy === newText) {
                break;
            }
        }
        newText = newText.charAt(0).toUpperCase() + newText.slice(1)
        return (newText)
    }

    britishToAmerican(text) {
        let rege = /[A-z]|[<]|[>]/
        let newText = text
        while (true) {
            let dummy = newText
            for (const [key, value] of Object.entries(britishOnly)) {
                let toSearch = key
                let toPlace = `<span class="highlight">${value}</span>`
                let textLow = newText.toLowerCase()
                let index = textLow.search(toSearch)
                if (index < 0) continue // not found, next iteration
                if (index > 1) {
                    if (rege.test(newText[index - 1])) continue
                }
                if (index + toSearch.length < newText.length){
                    if (rege.test(newText[index + toSearch.length])) continue
                }                newText = newText.slice(0, index) + toPlace + newText.slice(index + toSearch.length)
            }
            for (const [key, value] of Object.entries(americanToBritishSpelling)) {
                let toSearch = value
                let toPlace = `<span class="highlight">${key}</span>`
                let textLow = newText.toLowerCase()
                let index = textLow.search(toSearch)
                if (index < 0) continue // not found, next iteration
                if (index > 1) {
                    if (rege.test(newText[index - 1])) continue
                }
                if (index + toSearch.length < newText.length){
                    if (rege.test(newText[index + toSearch.length])) continue
                }                newText = newText.slice(0, index) + toPlace + newText.slice(index + toSearch.length)
            }
            for (const [key, value] of Object.entries(americanToBritishTitles)) {
                let toSearch = value
                key = key.charAt(0).toUpperCase() + key.slice(1)
                let toPlace = `<span class="highlight">${key}</span>`
                let textLow = newText.toLowerCase()
                let index = textLow.search(toSearch)
                if (index < 0) continue // not found, next iteration
                if (index > 1) {
                    if (rege.test(newText[index - 1])) continue
                }
                    if (rege.test(newText[index + toSearch.length])) continue
                
                if (/\./.test(newText[index + toSearch.length])) continue
                newText = newText.slice(0, index) + toPlace + newText.slice(index + toSearch.length)
            }
            // Replace 12.15 to 12:15
            let regex = /[0-1][0-9][.][0-5][0-9]|[2][0-4][.][0-5][0-9]|[0-9][.][0-5][0-9]/gm
            let found = newText.match(regex)
            if (found) { // not found, do nothing
                found.forEach(clock => {
                    let toSearch = clock
                    let toPlace = `<span class="highlight">${clock.replace('.', ':')}</span>`
                    let index = newText.search(toSearch)
                    newText = newText.slice(0, index) + toPlace + newText.slice(index + toSearch.length)
                })
            }
            // break when nothing can be translated
            if (dummy === newText) {
                break
            }
        }
        newText = newText.charAt(0).toUpperCase() + newText.slice(1)
        return (newText)

    }
}

module.exports = Translator;