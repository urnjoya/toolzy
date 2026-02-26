function convertCase(mode) {
            const text = document.getElementById('input-text').value;

            if (!text.trim()) {
                showNotification('Please enter some text', 'error');
                return;
            }

            let result = '';
            const words = text.trim().split(/\s+/);

            switch (mode) {
                case 'word-count':
                    {
                        const words = text.trim().match(/\b\w+\b/g);
                        const count = words ? words.length : 0;
                        result = `Word Count: ${count}`;
                    }
                    break;
                case 'char-count-with-space':
                    {
                        result = `Character Count (with spaces): ${text.length}`;
                    }
                    break;
                case 'char-count-without-space':
                    {
                        const noSpaces = text.replace(/\s/g, '');
                        result = `Character Count (without spaces): ${noSpaces.length}`;
                    }
                    break;
                case 'sentence-count':
                    {
                        const sentences = text.match(/[^.!?]+[.!?]+/g);
                        const count = sentences ? sentences.length : 0;
                        result = `Sentence Count: ${count}`;
                    }
                    break;
                case 'paragraph-count':
                    {
                        const paragraphs = text
                            .split(/\n\s*\n/)
                            .filter(p => p.trim() !== '');

                        result = `Paragraph Count: ${paragraphs.length}`;
                    }
                    break;
                case 'line-count':
                    {
                        const lines = text.split(/\r?\n/);
                        result = `Line Count: ${lines.length}`;
                    }
                    break;
                case 'unique-word-count':
                    {
                        const words = text.toLowerCase().match(/\b\w+\b/g);
                        const unique = words ? new Set(words) : new Set();
                        result = `Unique Word Count: ${unique.size}`;
                    }
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
