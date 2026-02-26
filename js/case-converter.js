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



        function copyResult() {
            const text = document.getElementById('result').textContent;
            if (text === 'Your case converted text will appear here...') {
                showNotification('No result to copy', 'error');
                return;
            }
            copyToClipboard(text, document.getElementById('copy-btn'));
        }

        function clearAll() {
            document.getElementById('input-text').value = '';
            document.getElementById('result').textContent = 'Your case converted text will appear here...';
        }
