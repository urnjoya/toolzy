const inputField = document.getElementById("input-text");
const baseFrom = document.getElementById("base-from");

inputField.addEventListener("input", function () {
    inputField.value = cleanInput(inputField.value, baseFrom.value);
});

baseFrom.addEventListener("change", function () {
    inputField.value = cleanInput(inputField.value, baseFrom.value);
});
// ==============================
// Allowed Pattern Per Base
// ==============================
function getAllowedPattern(base) {
    switch (base) {
        case "binary":
            return /^[01\s]+$/;
        case "decimal":
            return /^[0-9\s-]+$/;
        case "octal":
            return /^[0-7\s]+$/;
        case "hexadecimal":
            return /^[0-9a-fA-F\s]+$/;
        case "text":
            return null; // allow everything
        default:
            return null;
    }
}
// No same
// const baseFrom = document.getElementById("base-from");
const baseTo = document.getElementById("base-to");

// When the "from" base changes
baseFrom.addEventListener("change", function () {
    const fromValue = baseFrom.value;

    // Enable all options first
    Array.from(baseTo.options).forEach(option => {
        option.disabled = false;
    });

    // Disable the option in "to" that is equal to "from"
    const toOption = Array.from(baseTo.options).find(o => o.value === fromValue);
    if (toOption) {
        toOption.disabled = true;

        // If the currently selected "to" is same as "from", switch to first allowed
        if (baseTo.value === fromValue) {
            baseTo.value = Array.from(baseTo.options).find(o => !o.disabled).value;
        }
    }
});
// ==============================
// Clean Input (Optional Live Use)
// ==============================
function cleanInput(value, base) {
    switch (base) {
        case "binary":
            return value.replace(/[^01\s]/g, "");
        case "decimal":
            return value.replace(/[^0-9\s-]/g, "");
        case "octal":
            return value.replace(/[^0-7\s]/g, "");
        case "hexadecimal":
            return value.replace(/[^0-9a-fA-F\s]/g, "");
        default:
            return value;
    }
}

// ==============================
// Main Conversion Function
// ==============================
function perform() {
    const inputField = document.getElementById("input-text");
    const input = inputField.value.trim();
    const fromBase = document.getElementById("base-from").value;
    const toBase = document.getElementById("base-to").value;
    const resultElement = document.getElementById("result");

    if (!input) {
        resultElement.textContent = "Please enter a value.";
        return;
    }

    if (fromBase === toBase) {
        resultElement.textContent = "From and To bases must be different.";
        return;
    }

    try {

        // ==============================
        // Validate Input Pattern
        // ==============================
        const pattern = getAllowedPattern(fromBase);
        if (pattern && !pattern.test(input)) {
            throw new Error("Invalid characters for selected base.");
        }

        // ==============================
        // TEXT INPUT (UTF-8 Based)
        // ==============================
        if (fromBase === "text") {
            const encoder = new TextEncoder();
            const bytes = encoder.encode(input);

            let output = Array.from(bytes).map(byte => {
                switch (toBase) {
                    case "binary":
                        return byte.toString(2).padStart(8, "0");
                    case "decimal":
                        return byte.toString(10);
                    case "octal":
                        return byte.toString(8);
                    case "hexadecimal":
                        return byte.toString(16).toUpperCase().padStart(2, "0");
                }
            });

            resultElement.textContent = output.join(" ");
            return;
        }

        // ==============================
        // TEXT OUTPUT (UTF-8 Decode)
        // ==============================
        if (toBase === "text") {
            const values = input.split(/\s+/);

            const bytes = values.map(val => {
                let num;

                switch (fromBase) {
                    case "binary":
                        num = parseInt(val, 2);
                        break;
                    case "decimal":
                        num = parseInt(val, 10);
                        break;
                    case "octal":
                        num = parseInt(val, 8);
                        break;
                    case "hexadecimal":
                        num = parseInt(val, 16);
                        break;
                }

                if (isNaN(num) || num < 0 || num > 255) {
                    throw new Error("Invalid byte value: " + val);
                }

                return num;
            });

            const decoder = new TextDecoder();
            resultElement.textContent = decoder.decode(new Uint8Array(bytes));
            return;
        }

        // ==============================
        // NUMERIC ↔ NUMERIC
        // ==============================

        let decimalValue;

        switch (fromBase) {
            case "binary":
                decimalValue = BigInt("0b" + input.replace(/\s+/g, ""));
                break;
            case "decimal":
                decimalValue = BigInt(input);
                break;
            case "octal":
                decimalValue = BigInt("0o" + input.replace(/\s+/g, ""));
                break;
            case "hexadecimal":
                decimalValue = BigInt("0x" + input.replace(/\s+/g, ""));
                break;
        }

        let output;

        switch (toBase) {
            case "binary":
                output = decimalValue.toString(2);
                break;
            case "decimal":
                output = decimalValue.toString(10);
                break;
            case "octal":
                output = decimalValue.toString(8);
                break;
            case "hexadecimal":
                output = decimalValue.toString(16).toUpperCase();
                break;
        }

        resultElement.textContent = output;

    } catch (error) {
        resultElement.textContent = error.message;
    }
}
