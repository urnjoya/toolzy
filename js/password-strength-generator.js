/* ===============================
   CONFIG
================================= */

const charSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+{}[]<>?,."
};

const MIN_LENGTH = 8;
const MAX_LENGTH = 64;

/* ===============================
   SECURE RANDOM (NO MODULO BIAS)
================================= */

function secureRandom(max) {
    if (max <= 0) return 0;

    const array = new Uint32Array(1);
    const maxRange = 0xFFFFFFFF;
    const limit = maxRange - (maxRange % max);

    let rand;
    do {
        crypto.getRandomValues(array);
        rand = array[0];
    } while (rand >= limit);

    return rand % max;
}

/* ===============================
   GENERATE PASSWORD
================================= */

function generate() {

    const resultEl = document.getElementById("result");
    const lengthInput = document.getElementById("length");

    const useUpper = document.getElementById("uppercase").checked;
    const useLower = document.getElementById("lowercase").checked;
    const useNumbers = document.getElementById("numbers").checked;
    const useSymbols = document.getElementById("symbols").checked;

    let length = parseInt(lengthInput.value);

    /* ---- VALIDATION ---- */

    if (isNaN(length) || length < MIN_LENGTH || length > MAX_LENGTH) {
        resultEl.innerHTML = `<span style="color:red;">
            Length must be between ${MIN_LENGTH} and ${MAX_LENGTH}.
        </span>`;
        updateStrengthUI("", false);
        return;
    }

    let selectedSets = [];
    if (useUpper) selectedSets.push(charSets.uppercase);
    if (useLower) selectedSets.push(charSets.lowercase);
    if (useNumbers) selectedSets.push(charSets.numbers);
    if (useSymbols) selectedSets.push(charSets.symbols);

    if (selectedSets.length === 0) {
        resultEl.innerHTML = `<span style="color:red;">
            Select at least one character type.
        </span>`;
        updateStrengthUI("", false);
        return;
    }

    /* ---- GENERATION ---- */

    let passwordArray = [];

    // Ensure at least 1 char from each selected type
    selectedSets.forEach(set => {
        passwordArray.push(set[secureRandom(set.length)]);
    });

    const fullPool = selectedSets.join("");

    for (let i = passwordArray.length; i < length; i++) {
        passwordArray.push(fullPool[secureRandom(fullPool.length)]);
    }

    // Secure Fisher-Yates shuffle
    for (let i = passwordArray.length - 1; i > 0; i--) {
        const j = secureRandom(i + 1);
        [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
    }

    const password = passwordArray.join("");

    resultEl.innerHTML = password;
    updateStrengthUI(password, false);
}

/* ===============================
   COPY FUNCTION
================================= */

function copyResult() {
    const text = document.getElementById("result").textContent;
    if (!text) return;
    navigator.clipboard.writeText(text);
}

/* ===============================
   ENTROPY CALCULATION
================================= */

function calculateEntropy(password) {
    if (!password) return 0;

    let pool = 0;

    if (/[A-Z]/.test(password)) pool += 26;
    if (/[a-z]/.test(password)) pool += 26;
    if (/[0-9]/.test(password)) pool += 10;
    if (/[^A-Za-z0-9]/.test(password)) pool += 32;

    if (pool === 0) return 0;

    return password.length * Math.log2(pool);
}

/* ===============================
   STRENGTH METER (5 BARS = 20%)
================================= */

function updateStrengthUI(password, isCustom) {

    const entropy = calculateEntropy(password);
    const maxEntropy = 128; // practical cap
    const percentage = Math.min(100, (entropy / maxEntropy) * 100);

    const filledBars = Math.floor(percentage / 20);

    const colors = [
        "#e74c3c", // Very Weak (Red)
        "#e67e22", // Weak (Orange)
        "#f1c40f", // Medium (Yellow)
        "#2ecc71", // Strong (Green)
        "#27ae60"  // Very Strong (Dark Green)
    ];

    const bars = isCustom
        ? document.querySelectorAll("#custom-strength-bars .strength-meter-visual")
        : document.querySelectorAll("#strength-bars .strength-meter-visual");

    bars.forEach((bar, index) => {
        if (index < filledBars) {
            bar.style.background = colors[filledBars - 1];
        } else {
            bar.style.background = "#ddd";
        }
    });

    let strengthText = "";

    if (percentage < 20) strengthText = "Very Weak";
    else if (percentage < 40) strengthText = "Weak";
    else if (percentage < 60) strengthText = "Medium";
    else if (percentage < 80) strengthText = "Strong";
    else strengthText = "Very Strong";

    if (isCustom) {
        document.getElementById("custom-strength-meter-word").textContent = strengthText;
        document.getElementById("custom-entropy-result").textContent = entropy.toFixed(2);
    } else {
        document.getElementById("strength-meter-word").textContent = strengthText;
        document.getElementById("entropy-result").textContent = entropy.toFixed(2);
    }
}

/* ===============================
   LIVE CUSTOM CHECK
================================= */

document.getElementById("custom-password-input")
.addEventListener("input", function () {
    updateStrengthUI(this.value, true);
});