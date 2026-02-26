function convertCase(mode) {
            const text = document.getElementById('input-text').value;

            if (!text.trim()) {
                showNotification('Please enter some text', 'error');
                return;
            }

            let result = '';
            const words = text.trim().split(/\s+/);

            switch (mode) {
                case 'rm-line-break':
                    // Replace line breaks with single space
                    result = text.replace(/\r?\n+/g, ' ');
                    break;
                case 'remove-duplicates':
                    {
                        const lines = text.split(/\r?\n/);
                        const uniqueLines = [...new Set(lines)];
                        result = uniqueLines.join('\n');
                    }
                    break;
                case 'remove-extra-lines':
                    {
                        const lines = text.split(/\r?\n/);
                        const filtered = lines.filter(line => line.trim() !== '');
                        result = filtered.join('\n');
                    }
                    break;
                case 'randomize':
                    {
                        const lines = text.split(/\r?\n/);
                        for (let i = lines.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [lines[i], lines[j]] = [lines[j], lines[i]];
                        }
                        result = lines.join('\n');
                    }
                    break;
                case 'add-line-break':
                    result = text.replace(/([.!?])\s*/g, '$1\n');
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
