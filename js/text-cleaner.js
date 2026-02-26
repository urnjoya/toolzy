const textarea = document.getElementById("input-text");

        function convertCase(type) {
            let text = textarea.value;

            if (!text) return;

            switch (type) {

                /* ---------------- REMOVE DUPLICATE WORDS ---------------- */
                case "remove-duplicate-words":
                    text = removeDuplicateWords(text);
                    break;

                /* ---------------- REMOVE PUNCTUATION ---------------- */
                case "remove-punctuation":
                    text = text.replace(/[.,\/#!$%\^&\*;:{ }=\-_`~()"'?<>[\]\\|]/g, "");
                    break;

                /* ---------------- REMOVE SPECIAL CHARACTERS ---------------- */
                case "remove-special-chars":
                    text = text.replace(/[^a-zA-Z0-9\s]/g, "");
                    break;

                /* ---------------- REMOVE NUMBERS ---------------- */
                case "remove-numbers":
                    text = text.replace(/\d+/g, "");
                    break;

                /* ---------------- REMOVE HTML TAGS ---------------- */
                case "remove-html":
                    text = text.replace(/<\/?[^>]+(>|$)/g, "");
                    break;

                /* ---------------- REMOVE EMOJIS ---------------- */
                case "remove-emojis":
                    text = text.replace(
                        /[\u{1F600}-\u{1F64F}|\u{1F300}-\u{1F5FF}|\u{1F680}-\u{1F6FF}|\u{1F1E0}-\u{1F1FF}]/gu,
                        ""
                    );
                    break;

                /* ---------------- FIX SPACING ISSUES ---------------- */
                case "fix-spacing":
                    text = text
                        .replace(/\s+/g, " ")
                        .replace(/\s([?.!,;:])/g, "$1")
                        .trim();
                    break;

                /* ---------------- NORMALIZE WHITESPACE ---------------- */
                case "normalize-whitespace":
                    text = text.replace(/\s+/g, " ").trim();
                    break;

                /* ---------------- REMOVE STOP WORDS ---------------- */
                case "remove-stop-words":
                    text = removeStopWords(text);
                    break;

                default:
                    return;
            }

            textarea.value = text;
        }

        // 
        function removeDuplicateWords(text) {
            const words = text.split(/\s+/);
            const seen = new Set();

            return words.filter(word => {
                const lower = word.toLowerCase();
                if (seen.has(lower)) return false;
                seen.add(lower);
                return true;
            }).join(" ");
        }

        function removeStopWords(text) {
            const stopWords = new Set([
                "a", "an", "the", "and", "or", "but", "if", "in", "on", "at", "to",
                "for", "with", "of", "by", "is", "are", "was", "were", "be", "been",
                "this", "that", "these", "those", "it", "as", "from", "so", "than"
            ]);

            return text
                .split(/\s+/)
                .filter(word => !stopWords.has(word.toLowerCase()))
                .join(" ");
        }




        function copyResult() {
            const text = document.getElementById('input-text').value;
            if (text === '') {
                showNotification('No result to copy', 'error');
                return;
            }
            copyToClipboard(text, document.getElementById('copy-btn'));
        }

        function clearAll() {
            document.getElementById('input-text').value = '';
            document.getElementById('result').textContent = 'Your cleaned text will appear here...';
        }
