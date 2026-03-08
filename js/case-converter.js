function convertCase(mode) {
    const text = document.getElementById('input-text').value;
    if (!text.trim()) {
        showNotification('Please enter some text', 'error');
        return;
    }
    let result = '';
    const words = text.trim().split(/\s+/);
    switch (mode) {
        case 'upper':
            result = text.toUpperCase();
            break;
        case 'lower':
            result = text.toLowerCase();
            break;
        case 'title':
            result = words.map(word =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            ).join(' ');
            break;

        case 'sentence':
            result = text.toLowerCase()
                .replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
            break;

        case 'capitalized':
            result = words.map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
            break;

        case 'toggle':
            result = text.split('').map(char =>
                char === char.toUpperCase()
                    ? char.toLowerCase()
                    : char.toUpperCase()
            ).join('');
            break;

        case 'alternative':
            let toggle = true;
            result = text.split('').map(char => {
                if (char.match(/[a-z]/i)) {
                    const newChar = toggle
                        ? char.toUpperCase()
                        : char.toLowerCase();
                    toggle = !toggle;
                    return newChar;
                }
                return char;
            }).join('');
            break;

        case 'pascal':
            result = words.map(word =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            ).join('');
            break;

        case 'camel':
            result = words.map((word, index) =>
                index === 0
                    ? word.toLowerCase()
                    : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            ).join('');
            break;

        case 'snake':
            result = words.map(word =>
                word.toLowerCase()
            ).join('_');
            break;

        case 'kebab':
            result = words.map(word =>
                word.toLowerCase()
            ).join('-');
            break;

        default:
            result = text;
    }

    document.getElementById('result').textContent = result;
}
// BY KEY
document.addEventListener("keydown", function (e) {
    if (!e.altKey) return;

    const key = e.key.toLowerCase();

    const shortcuts = {
        u: "upper",
        l: "lower",
        t: "title",
        s: "sentence",
        c: "capitalized",
        g: "toggle",
        a: "alternative",
        p: "pascal",
        m: "camel",
        n: "snake",
        k: "kebab"
    };

    if (shortcuts[key]) {

        // stop browser behaviour
        e.preventDefault();

        // stop other JS listeners
        e.stopPropagation();
        e.stopImmediatePropagation();

        convertCase(shortcuts[key]);
    }

}, true); // capture phase
