function convertCase(mode) {
    const text = document.getElementById('input-text').value;

    if (!text.trim()) {
        showNotification('Please enter some text', 'error');
        return;
    }

    let result = '';

    switch (mode) {
        // Line sort atoz
        case 'sort-ascending': {
            const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
            result = lines
                .sort((a, b) =>
                    a.localeCompare(b, undefined, {
                        sensitivity: 'base'
                    })
                )
                .join('\n')
        }
            break;
        // line sort ztoa
        case 'sort-descending': {
            const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
            result = lines
                .sort((a, b) =>
                    b.localeCompare(a, undefined, {
                        sensitivity: 'base'
                    })
                )
                .join('\n')
        }
            break;
        // remove duplicate lines
        case 'remove-duplicates': {
            const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
            const seen = new Set();

            const uniqueLines = lines.filter(line => {
                const normalized = line.toLowerCase();
                if (seen.has(normalized)) return false;
                seen.add(normalized);
                return true;
            });

            result = uniqueLines.join(' ');
        }
            break;
        // line sort by length
        case 'sort-by-length': {
            const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');

            result = lines
                .sort((a, b) => a.length - b.length)
                .join('\n');

        }
            break;

        // WORD SORT A-Z
        case 'word-ascending': {
            const words = text.trim().split(/\s+/);
            const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');

            result = lines
                .sort((a, b) => a.length - b.length)
                .join('\n');
        }
            break;
               // WORD SORT Z-A
        case 'word-descending': {
            const words = text.trim().split(/\s+/);

            result = words
                .sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' }))
                .join(' ');
        }
        break;

        // sort by length word
        case 'sort-by-length-word': {
            const words = text.trim().split(/\s+/);

            result = words
                .sort((a, b) => a.length - b.length)
                .join(' ');
        }
            break;

        // remove duplicate words
        case 'remove-duplicate-words': {
            const words = text.trim().split(/\s+/);
            const seen = new Set();

            const uniqueWords = words.filter(word => {
                const normalized = word.toLowerCase();

                if (seen.has(normalized)) return false;

                seen.add(normalized);
                return true;
            });

            result = uniqueWords.join(' ');
        }
            break;

        default:
            result = text;
    }

    document.getElementById('result').textContent = result;
}
// 
function copyResult() {
    const result1 = document.getElementById('result').textContent;
    if (result1 == "Your result will appear here...") {
        showNotification('Please enter some text first', 'error')
        return
    } else {
        copyToClipboard(result1, document.getElementById('copy-btn'));
    }
}

function clearAll() {
    if (document.getElementById('input-text').value == '' && document.getElementById('result').textContent == 'Your result will appear here...') {
        showNotification('Nothing to clear!', 'error');
        return;
    } else {
        document.getElementById('input-text').value = '';
        document.getElementById('result').textContent = 'Your result will appear here...';
        showNotification('All clear', 'success');
    }
}
