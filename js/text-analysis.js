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
   READING TIME CALCULATOR
   Calculates reading time for different reading speeds
   ========================================================= */
function getReadingTime(text) {

    const wordCount = getWordCount(text);

    // Words per minute speeds
    const speeds = {
        fast: 300,
        average: 220,
        slow: 150
    };

    return {
        fast: (wordCount / speeds.fast).toFixed(2),
        average: (wordCount / speeds.average).toFixed(2),
        slow: (wordCount / speeds.slow).toFixed(2)
    };
}
/* =========================================================
   SPEAKING TIME CALCULATOR
   Calculates speaking time for different speaking speeds
   ========================================================= */
function getSpeakingTime(text) {

    const wordCount = getWordCount(text);

    // Words per minute speaking speeds
    const speeds = {
        fast: 180,
        average: 150,
        slow: 120
    };

    return {
        fast: (wordCount / speeds.fast).toFixed(2),
        average: (wordCount / speeds.average).toFixed(2),
        slow: (wordCount / speeds.slow).toFixed(2)
    };
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

    update("char-with-space", text.length);
    update("char-with-out-space", text.replace(/\s/g, "").length);

    update("fast-reader", formatTime(words.length, 300));
    update("avg-reader", formatTime(words.length, 220));
    update("slow-reader", formatTime(words.length, 150));

    update("fast-speaker", formatTime(words.length, 180));
    update("avg-speaker", formatTime(words.length, 150));
    update("slow-speaker", formatTime(words.length, 120));

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

// /* Reading/Speaking time */
function formatTime(wordCount, wpm) {

    const minutes = wordCount / wpm;

    if (minutes < 1) {
        return Math.ceil(minutes * 60) + " sec";
    }

    const min = Math.floor(minutes);
    const sec = Math.round((minutes - min) * 60);

    return min + " min " + sec + " sec";
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
        "word", "sentence", "paragraph",
        "char-with-space", "char-without-space",
        "fast-reader", "avg-reader", "slow-reader",
        "fast-speaker", "avg-speaker", "slow-speaker",
        "long-word", "short-word"
    ];

    ids.forEach(id => update(id, 0));
}




// function copyResult() {
//     const text = document.getElementById('result').textContent;
//     if (text === 'Your case converted text will appear here...') {
//         showNotification('No result to copy', 'error');
//         return;
//     }
//     copyToClipboard(text, document.getElementById('copy-btn'));
// }
/* =========================================================
   COPY ANALYSIS REPORT
========================================================= */
function copyResult() {
    if (document.getElementById('input-text').value == '') {
        showNotification('Please enter some text first', 'error');
        return;
    }
    else {
        const report = `
TEXT ANALYSIS REPORT BY abcroot

Words: ${document.getElementById("word").textContent}
Sentences: ${document.getElementById("sentence").textContent}
Paragraphs: ${document.getElementById("paragraph").textContent}

Characters (with spaces): ${document.getElementById("char-with-space").textContent}
Characters (without spaces): ${document.getElementById("char-with-out-space").textContent}

Reading Time
Fast: ${document.getElementById("fast-reader").textContent}
Average: ${document.getElementById("avg-reader").textContent}
Slow: ${document.getElementById("slow-reader").textContent}

Speaking Time
Fast: ${document.getElementById("fast-speaker").textContent}
Average: ${document.getElementById("avg-speaker").textContent}
Slow: ${document.getElementById("slow-speaker").textContent}

Longest Word: ${document.getElementById("long-word").textContent}
Shortest Word: ${document.getElementById("short-word").textContent}
`;

        navigator.clipboard.writeText(report.trim());

        showNotification("Analysis copied to clipboard", "success");
    }
}
// DOWNLOAD AS TXT
function downloadTXT() {

    const textarea = document.getElementById("input-text");

    if (!textarea.value.trim()) {
        showNotification("Nothing to download!", "error");
        return;
    }
    else {

        const report = `
TEXT ANALYSIS REPORT BY abcroot

Words: ${word.textContent}
Sentences: ${sentence.textContent}
Paragraphs: ${paragraph.textContent}

Characters (with spaces): ${document.getElementById("char-with-space").textContent}
Characters (without spaces): ${document.getElementById("char-with-out-space").textContent}

Reading Time
Fast: ${document.getElementById("fast-reader").textContent}
Average: ${document.getElementById("avg-reader").textContent}
Slow: ${document.getElementById("slow-reader").textContent}

Speaking Time
Fast: ${document.getElementById("fast-speaker").textContent}
Average: ${document.getElementById("avg-speaker").textContent}
Slow: ${document.getElementById("slow-speaker").textContent}

Longest Word: ${document.getElementById("long-word").textContent}
Shortest Word: ${document.getElementById("short-word").textContent}
`;

        const blob = new Blob([report.trim()], { type: "text/plain" });

        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);
        link.download = "text-analysis-report.txt";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    showNotification("Download started!", 'success')

}
// DOWNLOAD AS PDF
async function downloadPDF() {

    const textarea = document.getElementById("input-text");

    if (!textarea.value.trim()) {
        showNotification("Nothing to download!", "error");
        return;
    }
    else {

        const { jsPDF } = window.jspdf;

        const doc = new jsPDF();

        /* Background color */
        doc.setFillColor(240, 244, 248);
        doc.rect(0, 0, 210, 297, "F");

        /* Title */
        doc.setFontSize(18);
        doc.text("Text Analysis Report By abcroot", 20, 20);

        doc.setFontSize(12);

        const lines = [
            `Words: ${word.textContent}`,
            `Sentences: ${sentence.textContent}`,
            `Paragraphs: ${paragraph.textContent}`,
            "",
            `Characters (with spaces): ${document.getElementById("char-with-space").textContent}`,
            `Characters (without spaces): ${document.getElementById("char-with-out-space").textContent}`,
            "",
            "Reading Time",
            `Fast: ${document.getElementById("fast-reader").textContent}`,
            `Average: ${document.getElementById("avg-reader").textContent}`,
            `Slow: ${document.getElementById("slow-reader").textContent}`,
            "",
            "Speaking Time",
            `Fast: ${document.getElementById("fast-speaker").textContent}`,
            `Average: ${document.getElementById("avg-speaker").textContent}`,
            `Slow: ${document.getElementById("slow-speaker").textContent}`,
            "",
            `Longest Word: ${document.getElementById("long-word").textContent}`,
            `Shortest Word: ${document.getElementById("short-word").textContent}`
        ];

        let y = 35;

        lines.forEach(line => {
            doc.text(line, 20, y);
            y += 8;
        });

        doc.save("text-analysis-report.pdf");
        showNotification("Download started!", 'success')
    }

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
            "char-with-space",
            "char-with-out-space",
            "fast-reader",
            "avg-reader",
            "slow-reader",
            "fast-speaker",
            "avg-speaker",
            "slow-speaker",
            "long-word",
            "short-word"
        ];

        ids.forEach(id => {
            document.getElementById(id).textContent = "0";
        });
        showNotification("All cleared", 'success');
    }
}
