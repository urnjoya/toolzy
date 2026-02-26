 function convertCase(mode) {
            const text = document.getElementById('input-text').value;

            if (!text.trim()) {
                showNotification('Please enter some text', 'error');
                return;
            }

            let result = '';
            const words = text.trim().split(/\s+/);

            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            }


            switch (mode) {
                case 'shuffle-text':
                    {
                        const chars = text.split('');
                        result = shuffleArray(chars).join('');
                    }
                    break;

                case 'shuffle-sentences':
                    {
                        const sentences = text.match(/[^.!?]+[.!?]*\s*/g);

                        if (sentences) {
                            result = shuffleArray(sentences).join('').trim();
                        } else {
                            result = text;
                        }
                    }
                    break;

                case 'shuffle-lines':
                    {
                        const lines = text.split(/\r?\n/);
                        result = shuffleArray(lines).join('\n');
                    }
                    break;

                case 'shuffle-words':
                    {
                        const words = text.trim().split(/\s+/);
                        result = shuffleArray(words).join(' ');
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
