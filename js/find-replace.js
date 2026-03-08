const editor = document.getElementById('input-text');
const findInput = document.getElementById('find-text');
const replaceInput = document.getElementById('replace-text');
const resultCount = document.querySelector('.result-count');

const matchCaseCheckbox = document.getElementById('match-case-checkbox');
const wholeWordCheckbox = document.getElementById('match-whole-word-checkbox');

let matches = [];
let currentIndex = -1;

/* -------------------- GET CLEAN TEXT -------------------- */
function getText() {
    return editor.innerText;
}

/* -------------------- SET HTML -------------------- */
function setHTML(html) {
    editor.innerHTML = html;
}

/* -------------------- ESCAPE REGEX -------------------- */
function escapeRegex(str) {
    return str.replace(/[.*+?^${ }()|[\]\\]/g, '\\$&');
}

/* -------------------- BUILD REGEX -------------------- */
function buildRegex() {
    let search = findInput.value;
    if (!search) return null;

    search = escapeRegex(search);

    if (wholeWordCheckbox.checked) {
        search = `\\b${search}\\b`;
    }

    const flags = matchCaseCheckbox.checked ? 'g' : 'gi';
    return new RegExp(search, flags);
}

/* -------------------- FIND + HIGHLIGHT -------------------- */
function findMatches() {
    const text = getText();
    const regex = buildRegex();

    matches = [];
    currentIndex = -1;

    if (!regex) {
        setHTML(text);
        resultCount.textContent = "0 of 0";
        return;
    }

    let match;
    while ((match = regex.exec(text)) !== null) {
        matches.push({
            index: match.index,
            length: match[0].length
        });
    }

    if (matches.length === 0) {
        setHTML(text);
        resultCount.textContent = "0 of 0";
        return;
    }

    // highlight all
    const highlighted = text.replace(regex, m => `<mark>${m}</mark>`);
    setHTML(highlighted);

    currentIndex = 0;
    highlightActive();

    resultCount.textContent = `1 of ${matches.length}`;
}

/* -------------------- HIGHLIGHT ACTIVE -------------------- */
function highlightActive() {
    const allMarks = editor.querySelectorAll('mark');
    allMarks.forEach(m => m.style.background = 'yellow');

    if (allMarks[currentIndex]) {
        allMarks[currentIndex].style.background = 'orange';
        allMarks[currentIndex].scrollIntoView({ block: "center" });
    }

    resultCount.textContent = `${currentIndex + 1} of ${matches.length}`;
}

/* -------------------- NEXT / PREVIOUS -------------------- */
document.querySelector('.next-match').addEventListener('click', () => {
    if (matches.length === 0) return;
    currentIndex = (currentIndex + 1) % matches.length;
    highlightActive();
});

document.querySelector('.previous-match').addEventListener('click', () => {
    if (matches.length === 0) return;
    currentIndex = (currentIndex - 1 + matches.length) % matches.length;
    highlightActive();
});

/* -------------------- REPLACE ONE -------------------- */
document.querySelector('.replace-one-btn').addEventListener('click', () => {
    if (matches.length === 0) return;

    const marks = editor.querySelectorAll('mark');
    if (!marks[currentIndex]) return;

    marks[currentIndex].outerHTML = replaceInput.value;

    findMatches();
});

/* -------------------- REPLACE ALL -------------------- */
document.querySelector('.replace-all-btn').addEventListener('click', () => {
    const regex = buildRegex();
    if (!regex) return;

    const newText = getText().replace(regex, replaceInput.value);
    setHTML(newText);

    findMatches();
});

/* -------------------- LIVE SEARCH -------------------- */
findInput.addEventListener('input', findMatches);
matchCaseCheckbox.addEventListener('change', findMatches);
wholeWordCheckbox.addEventListener('change', findMatches);

document.addEventListener("keydown", function (e) {

    const active = document.activeElement;

    // ENTER → Replace
    if (e.key === "Enter" && active !== findInput) {
        e.preventDefault();
        document.querySelector('.replace-one-btn').click();
    }

    // CTRL + ALT + ENTER → Replace All
    if (e.ctrlKey && e.altKey && e.key === "Enter") {
        e.preventDefault();
        document.querySelector('.replace-all-btn').click();
    }

    // ALT + DOWN → Next match
    if (e.altKey && e.key === "ArrowDown") {
        e.preventDefault();
        document.querySelector('.next-match').click();
    }

    // ALT + UP → Previous match
    if (e.altKey && e.key === "ArrowUp") {
        e.preventDefault();
        document.querySelector('.previous-match').click();
    }

    // ALT + SHIFT + F → Focus Find
    if (e.altKey && e.shiftKey && e.key.toLowerCase() === "f") {
        e.preventDefault();
        findInput.focus();
    }

    // ALT + SHIFT + R → Focus Replace
    if (e.altKey && e.shiftKey && e.key.toLowerCase() === "r") {
        e.preventDefault();
        replaceInput.focus();
    }

    // ALT + C → Toggle Match Case
    if (e.altKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        matchCaseCheckbox.checked = !matchCaseCheckbox.checked;
        findMatches();
    }

    // ALT + W → Toggle Whole Word
    if (e.altKey && e.key.toLowerCase() === "w") {
        e.preventDefault();
        wholeWordCheckbox.checked = !wholeWordCheckbox.checked;
        findMatches();
    }

});
