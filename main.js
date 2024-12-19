const inputElt = document.getElementsByTagName("input")[0]
const pElt = document.getElementsByTagName("p")[0]
const articleElt = document.getElementsByTagName("article")[0]
const smallElt = document.getElementsByTagName("small")[0]

const limit = 300
const wordLength = 90

const getEveryWords = (str) => {

    const results = new Set()
    // Lets not crash
    if (results.size >= limit)return

    const generatePermutations = (currentStr, remainingStr) => {
        if (remainingStr.length === 0) {
            // If remaining string is empty, add the permutation to results
            results.add(currentStr)
            return
        }

        // Loop over remaining characters to form all possible permutations
        remainingStr.split('').forEach((char, idx) => {
            const newStr = currentStr + char
            // Form the new remaining string by removing the current character
            const newRemainingStr = remainingStr.slice(0, idx) + remainingStr.slice(idx + 1)
            // Recur for the remaining characters
            generatePermutations(newStr, newRemainingStr)
        })
    }

    // Start recursion
    generatePermutations("", str)
    return Array.from(results)
}

const populatearticle = (e) => {
    const val = e.target.value

    // Clear previous results
    articleElt.innerHTML = ""

    if (val.length > 0) {
        // Get the permutations
        const words = getEveryWords(val)
        // Add each word as a span element in the article
        words.forEach(word => {
            const wordElt = document.createElement("span")
            wordElt.innerText = word
            articleElt.appendChild(wordElt)
        })
        smallElt.innerText =  `${words.length} possible way${words.length>1?"s":""}.`
    } else smallElt.innerText = ""
}

inputElt.addEventListener("input", populatearticle)
