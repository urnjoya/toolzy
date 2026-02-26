// No same
// const baseFrom = document.getElementById("base-from");
const baseTo = document.getElementById("base-to");
const baseFrom = document.getElementById("base-from");

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
// code
function perform() {
    const inputEl = document.getElementById("input-text");
    const resultEl = document.getElementById("result");
    const from = document.getElementById("base-from").value;
    const to = document.getElementById("base-to").value;

    if (!from || !to) {
        resultEl.innerHTML = "Please select both From and To options.";
        return;
    }

    if (from === to) {
        resultEl.innerHTML = "From and To cannot be the same.";
        return;
    }

    // Get content properly
    let inputContent = (from === "rich")
        ? inputEl.innerHTML.trim()
        : inputEl.innerText.trim();

    if (!inputContent) {
        resultEl.innerHTML = "Please enter content.";
        return;
    }

    try {

        // ==========================
        // Markdown → Rich Text
        // ==========================
        if (from === "markdown" && to === "rich") {
            const html = marked.parse(inputContent);
            resultEl.innerHTML = html;
            return;
        }

        // ==========================
        // Rich Text → Markdown
        // ==========================
        if (from === "rich" && to === "markdown") {
            const turndownService = new TurndownService({
                headingStyle: "atx",     // ### style
                codeBlockStyle: "fenced" // ``` style
            });

            const markdown = turndownService.turndown(inputContent);
            resultEl.textContent = markdown;
            return;
        }

    } catch (error) {
        resultEl.innerHTML = "Conversion error: " + error.message;
    }
}