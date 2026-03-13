const resultBox = document.getElementById("result");

function generateSlug(type) {
    const textarea = document.getElementById("input-text"); // assuming same textarea
    let text = textarea.value;

    if (!text.trim()) {
        showNotification('Null value', 'error');
    }

    const removeStopWords = document.getElementById("remove-stop-words").checked;
    const removeNumbers = document.getElementById("remove-numbers").checked;

    const separator = type === "with-underscores" ? "_" : "-";

    /* ---------------- STEP 1: Normalize Accents ---------------- */
    text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    /* ---------------- STEP 2: Lowercase ---------------- */
    text = text.toLowerCase();

    /* ---------------- STEP 3: Remove Numbers (Optional) ---------------- */
    if (removeNumbers) {
        text = text.replace(/\d+/g, "");
    }

    /* ---------------- STEP 4: Remove Stop Words (Optional) ---------------- */
    if (removeStopWords) {
        const stopWords = new Set([
            "a", "an", "the", "and", "or", "but", "if", "in", "on", "at", "to",
            "for", "with", "of", "by", "is", "are", "was", "were", "be", "been",
            "this", "that", "these", "those", "it", "as", "from", "so", "than"
        ]);

        text = text
            .split(/\s+/)
            .filter(word => !stopWords.has(word))
            .join(" ");
    }

    /* ---------------- STEP 5: Remove Special Characters ---------------- */
    text = text.replace(/[^a-z0-9\s]/g, " ");

    /* ---------------- STEP 6: Replace Spaces With Separator ---------------- */
    text = text.trim().replace(/\s+/g, separator);

    /* ---------------- STEP 7: Remove Duplicate Separators ---------------- */
    const sepRegex = new RegExp(`${separator}+`, "g");
    text = text.replace(sepRegex, separator);

    /* ---------------- STEP 8: Trim Separator From Edges ---------------- */
    const edgeRegex = new RegExp(`^${separator}|${separator}$`, "g");
    text = text.replace(edgeRegex, "");

    resultBox.textContent = text || "—";
}


function copyResult() {
    const text = document.getElementById('result').textContent;
    if (text === 'Your generated slug will appear here...') {
        showNotification('Please enter some text first', 'error');
        return;
    }
    else {
        copyToClipboard(text, document.getElementById('copy-btn'));
    }
}

function clearAll() {
    if (document.getElementById('input-text').value == '' || document.getElementById('result').textContent == 'Your result will appear here...') {
        showNotification('Nothing to clear!', 'error');
        return;
    }
    else{
        document.getElementById('input-text').value = '';
        document.getElementById('result').textContent = 'Your generated slug will appear here...';
        showNotification("All clear", 'success')
    }
}
