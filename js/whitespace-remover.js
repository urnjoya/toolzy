 function convertCase(mode) {
            const text = document.getElementById('input-text').value;

            if (!text.trim()) {
                showNotification('Please enter some text', 'error');
                return;
            }

            let result = '';
            const words = text.trim().split(/\s+/);

            switch (mode) {
                case 'extra':
                    // Replace multiple spaces (including tabs) with single space
                    result = text.replace(/\s+/g, ' ').trim();
                    break;

                case 'all':
                    // Remove ALL whitespace characters
                    result = text.replace(/\s+/g, '');
                    break;

                case 'trim':
                    // Remove only leading and trailing whitespace
                    result = text.trim();
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
