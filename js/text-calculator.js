function convertCase(mode) {
            const text = document.getElementById('input-text').value;

            if (!text.trim()) {
                showNotification('Please enter some text', 'error');
                return;
            }

            let result = '';
            const words = text.trim().split(/\s+/);

            switch (mode) {
                case 'reading-time':
                    {
                        const words = text.trim().match(/\b\w+\b/g);
                        const wordCount = words ? words.length : 0;

                        const wordsPerMinute = 225;
                        const minutes = wordCount / wordsPerMinute;

                        const rounded = minutes < 1
                            ? `${Math.ceil(minutes * 60)} seconds`
                            : `${Math.ceil(minutes)} minute(s)`;

                        result = `Estimated Reading Time: ${rounded}`;
                    }
                    break;
                case 'speaking-time':
                    {
                        const words = text.trim().match(/\b\w+\b/g);
                        const wordCount = words ? words.length : 0;

                        const wordsPerMinute = 150;
                        const minutes = wordCount / wordsPerMinute;

                        const rounded = minutes < 1
                            ? `${Math.ceil(minutes * 60)} seconds`
                            : `${Math.ceil(minutes)} minute(s)`;

                        result = `Estimated Speaking Time: ${rounded}`;
                    }
                    break;
                case 'average-word-length':
                    {
                        const words = text.match(/\b\w+\b/g);

                        if (!words || words.length === 0) {
                            result = 'Average Word Length: 0';
                            break;
                        }

                        const totalLength = words.reduce((sum, word) => sum + word.length, 0);
                        const average = (totalLength / words.length).toFixed(2);

                        result = `Average Word Length: ${average} characters`;
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
