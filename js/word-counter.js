/* =========================================================
   WORD COUNT
   Counts total words in the text
   ========================================================= */
function getWordCount(text) {
    // Remove extra spaces and split by whitespace
    const words = text.trim().split(/\s+/);

    // If text is empty return 0
    if (text.trim() === "") return 0;

    return words.length;
}
/* =========================================================
   SENTENCE COUNT
   Counts sentences based on punctuation (. ! ?)
   ========================================================= */
function getSentenceCount(text) {
    if (!text.trim()) return 0;

    // Split sentences by punctuation
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim() !== "");

    return sentences.length;
}
/* =========================================================
   PARAGRAPH COUNT
   Paragraphs are separated by line breaks
   ========================================================= */
function getParagraphCount(text) {
    if (!text.trim()) return 0;

    const paragraphs = text.split(/\n+/).filter(p => p.trim() !== "");

    return paragraphs.length;
}
/* =========================================================
   LINE COUNT
   Counts number of lines in the text
   ========================================================= */
function getLineCount(text) {

    if (!text.trim()) return 0;

    const lines = text.split(/\r?\n/).filter(line => line.trim() !== "");

    return lines.length;
}
/* =========================================================
   CHARACTER COUNT (WITH SPACES)
   Includes every character
   ========================================================= */
function getCharacterCountWithSpaces(text) {
    return text.length;
}

/* =========================================================
   CHARACTER COUNT (WITHOUT SPACES)
   Removes all whitespace before counting
   ========================================================= */
function getCharacterCountWithoutSpaces(text) {
    return text.replace(/\s/g, "").length;
}

/* =========================================================
   LONGEST WORD
   Finds the longest word in the text
   ========================================================= */
function getLongestWord(text) {

    const words = text.match(/\b\w+\b/g);

    if (!words) return "";

    let longest = "";

    for (let word of words) {
        if (word.length > longest.length) {
            longest = word;
        }
    }

    return longest;
}
/* =========================================================
   SHORTEST WORD
   Finds the shortest word in the text
   ========================================================= */
function getShortestWord(text) {

    const words = text.match(/\b\w+\b/g);

    if (!words) return "";

    let shortest = words[0];

    for (let word of words) {
        if (word.length < shortest.length) {
            shortest = word;
        }
    }

    return shortest;
}
const inputText = document.getElementById("input-text");

/* Run analysis whenever user types */
inputText.addEventListener("input", analyzeText);

/* MAIN ANALYSIS FUNCTION */
function analyzeText() {

    const text = inputText.value.trim();

    if (!text) {
        resetStats();
        return;
    }

    const words = getWords(text);

    update("word", words.length);
    update("sentence", countSentences(text));
    update("paragraph", countParagraphs(text));
    update('line', getLineCount(text));
    update("char-with-space", text.length);
    update("char-with-out-space", text.replace(/\s/g, "").length);

    update("long-word", getLongestWord(words));
    update("short-word", getShortestWord(words));
}

/* ---------------- Helper Functions ---------------- */

/* Extract words */
function getWords(text) {
    return text.match(/\b[\w']+\b/g) || [];
}

/* Sentence counter */
function countSentences(text) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    return sentences.length;
}

// /* Paragraph counter */
function countParagraphs(text) {
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0);
    return paragraphs.length;
}


// /* Longest word */
function getLongestWord(words) {

    if (!words.length) return "-";

    return words.reduce((a, b) =>
        b.length > a.length ? b : a
    );
}

// /* Shortest word */
function getShortestWord(words) {

    if (!words.length) return "-";

    return words.reduce((a, b) =>
        b.length < a.length ? b : a
    );
}

/* Update DOM */
function update(id, value) {
    document.getElementById(id).textContent = value;
}

/* Reset stats */
function resetStats() {

    const ids = [
        "word", "sentence", "paragraph", "line",
        "char-with-space", "char-without-space",
        "long-word", "short-word"
    ];

    ids.forEach(id => update(id, 0));
}

function clearAll() {
    const textarea = document.getElementById('input-text');
    if (document.getElementById('input-text').value == '') {
        showNotification('Nothing to clear!', 'error')
        return;
    }
    else {
        /* Clear input */
        textarea.value = "";

        /* Reset all stats */
        const ids = [
            "word",
            "sentence",
            "paragraph",
            "line",
            "char-with-space",
            "char-with-out-space",
            "long-word",
            "short-word"
        ];

        ids.forEach(id => {
            document.getElementById(id).textContent = "0";
        });
        showNotification("All cleared", 'success');
    }
}
