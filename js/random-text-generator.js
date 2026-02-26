document.addEventListener("DOMContentLoaded", function () {

            const textMode = document.getElementById("text-mode");
            const languageSelect = document.getElementById("language");
            const rangeInput = document.getElementById("range");
            const resultBox = document.getElementById("result");

            console.log(textMode.value, languageSelect, rangeInput, resultBox);
            // =========================
            // Mode Change Logic
            // =========================
            textMode.addEventListener("change", handleModeChange);

            function handleModeChange() {
                const mode = textMode.value;
                const options = languageSelect.options;

                for (let i = 0; i < options.length; i++) {
                    const val = options[i].value;

                    if (mode === "lorem") {
                        // Enable only US & UK English
                        if (val === "en-us" || val === "en-uk") {
                            options[i].disabled = false;
                        } else {
                            options[i].disabled = true;
                        }
                    } else {
                        options[i].disabled = false;
                    }
                }

                // Auto-switch if current selection becomes invalid
                if (mode === "lorem" &&
                    !["en-us", "en-uk"].includes(languageSelect.value)) {
                    languageSelect.value = "en-us";
                }
            }

            // Run once on page load
            handleModeChange();

            // =========================
            // Generate Button Logic
            // =========================
            window.generateRandomText = function () {

                const mode = textMode.value;
                const language = languageSelect.value;
                const wordCount = parseInt(rangeInput.value) || 10;

                if (mode === "lorem") {

                    if (!["en-us", "en-uk"].includes(language)) {
                        resultBox.textContent = "Lorem Ipsum supports only English.";
                        return;
                    }

                    resultBox.textContent = generateLorem(wordCount);
                    return;
                }

                if (mode === "plain") {
                    resultBox.textContent = generateWords(wordCount, language);
                }

                if (mode === "html") {
                    resultBox.innerHTML = generateStructuredHTML(wordCount, language);
                }

            };
            // ==================
            // html generator
            // ==================
            function generateStructuredHTML(count, lang) {

                const words = generateWords(count, lang).split(" ");
                let html = "";
                let i = 0;

                while (i < words.length) {

                    const randomBlock = Math.random();

                    // 20% chance heading
                    if (randomBlock < 0.2 && i + 5 < words.length) {
                        const headingWords = words.slice(i, i + 5).join(" ");
                        html += `&lt;h2&gt;${capitalize(headingWords)}&lt;/h2&gt;`;
                        i += 5;
                    }

                    // 20% chance list
                    else if (randomBlock < 0.4 && i + 6 < words.length) {
                        html += "&lt;ul&gt;";
                        for (let j = 0; j < 3; j++) {
                            const liWords = words.slice(i, i + 4).join(" ");
                            html += `&lt;li&gt;${liWords}&lt;/li&gt;`;
                            i += 4;
                        }
                        html += "&lt;/ul&gt;";
                    }

                    // Otherwise paragraph
                    else {
                        const paraSize = Math.floor(Math.random() * 20) + 10;
                        const paraWords = words.slice(i, i + paraSize).join(" ");
                        html += `&lt;p&gt;${paraWords}&lt;/p&gt;`;
                        i += paraSize;
                    }
                }

                return html;
            }

            // =========================
            // Lorem Generator
            // =========================
            function generateLorem(count) {

                const loremBase = `
            lorem ipsum dolor sit amet consectetur adipiscing elit
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae quasi impedit, consequatur ipsa in
                    id dolorem, harum expedita accusantium delectus quia. Veritatis fugiat qui dolores natus odit vel
                    harum nulla ullam excepturi. Repellat nemo a molestiae debitis quibusdam voluptate voluptatem
                    obcaecati similique pariatur eligendi, perspiciatis odio, iusto sed sit sunt. Dolorum omnis dolorem
                    laborum magni doloremque, ipsa minima dicta officiis iusto ut inventore cupiditate provident
                    molestiae aliquam rem rerum aliquid laboriosam aperiam optio adipisci. Nam, atque accusamus! Illo
                    eum reiciendis minima cumque vero dolorem, veritatis harum perferendis expedita ad, nesciunt,
                    accusamus repellendus. Dolorem doloribus maxime cum officiis, incidunt aliquam sed quasi deleniti
                    corporis explicabo recusandae libero. Architecto sunt expedita, mollitia nemo fugiat perferendis
                    debitis pariatur soluta ullam enim sit molestias animi porro adipisci! Cupiditate nam iusto iste
                    nobis labore tenetur ab est perspiciatis itaque consequuntur corporis debitis quam maiores aliquam
                    ullam maxime aperiam saepe hic ex sequi, eveniet amet quos molestiae nemo? Recusandae atque cum
                    obcaecati maiores error soluta, debitis maxime laudantium iure ea tempore reprehenderit cupiditate,
                    a neque perspiciatis labore ad. Commodi nesciunt sunt explicabo voluptatem porro enim aperiam, nulla
                    iusto quibusdam assumenda aliquam est. Neque libero sint eaquLe, quisquam magnam, voluptate,
                    doloremque consequatur corporis cumque. Voluptas, deleniti. Doloremque consequatur corporis cumque.
                    Voluptas, deleniti.
        `.trim().split(/\s+/);

                let result = [];

                for (let i = 0; i < count; i++) {
                    result.push(loremBase[i % loremBase.length]);
                }

                result[0] = capitalize(result[0]);

                return result.join(" ") + ".";
            }

            // =========================
            // Random Word Generator
            // =========================
            function generateWords(count, lang) {

                const wordPools = {
                    "en-us": ["technology", "future", "system", "design", "growth", "network", "the", "is", "am", "are", "I", "you", "we", "he", "she", "it",
                        "a", "an", "this", "that", "these", "those", "and", "but", "or", "so",
                        "technology", "future", "system", "design", "growth", "network", "data", "internet", "computer", "software",
                        "information", "development", "science", "research", "innovation", "market", "business", "learning", "education", "knowledge",
                        "experience", "process", "solution", "method", "strategy", "planning", "team", "project", "goal", "success",
                        "community", "environment", "world", "health", "money", "time", "energy", "space", "power", "mind",
                        "life", "work", "idea", "problem", "question", "answer", "culture", "language", "country", "city",
                        "family", "friend", "child", "people", "person", "place", "home", "school", "company", "office",
                        "car", "house", "food", "water", "air", "fire", "earth", "sun", "moon", "star",
                        "day", "night", "morning", "evening", "week", "month", "year", "today", "tomorrow", "yesterday"
                    ],
                    "en-uk": ["technology", "future", "system", "design", "growth", "network", "the", "is", "am", "are", "I", "you", "we", "he", "she", "it",
                        "a", "an", "this", "that", "these", "those", "and", "but", "or", "so",
                        "technology", "future", "system", "design", "growth", "network", "data", "internet", "computer", "software",
                        "information", "development", "science", "research", "innovation", "market", "business", "learning", "education", "knowledge",
                        "experience", "process", "solution", "method", "strategy", "planning", "team", "project", "goal", "success",
                        "community", "environment", "world", "health", "money", "time", "energy", "space", "power", "mind",
                        "life", "work", "idea", "problem", "question", "answer", "culture", "language", "country", "city",
                        "family", "friend", "child", "people", "person", "place", "home", "school", "company", "office",
                        "flat", "lorry", "holiday", "queue", "biscuit", "petrol", "football", "shop", "lift", "pavement",
                        "crisps", "trousers", "autumn", "boot", "bonnet", "dustbin", "car park", "chemist", "post", "football pitch"],
                    "es": ["tecnologia", "futuro", "sistema", "diseno", "crecimiento"],
                    "fr": ["technologie", "avenir", "systeme", "croissance"],
                    "de": ["technologie", "zukunft", "system", "entwicklung"],
                    "hi": ["takneek", "bhavishya", "vikas", "system", "मैं", "तुम", "वह", "वे", "हम", "है", "हूँ", "हैं", "था", "थे",
                        "यह", "वह", "इन", "उन", "और", "लेकिन", "या", "तो", "क्योंकि", "यदि",
                        "तकनीक", "भविष्य", "प्रणाली", "डिज़ाइन", "विकास", "नेटवर्क", "डेटा", "इंटरनेट", "कंप्यूटर", "सॉफ़्टवेयर",
                        "सूचना", "विकास", "विज्ञान", "अनुसंधान", "नवाचार", "बाजार", "व्यवसाय", "अध्ययन", "शिक्षा", "ज्ञान",
                        "अनुभव", "प्रक्रिया", "समाधान", "तरीका", "रणनीति", "योजना", "टीम", "परियोजना", "लक्ष्य", "सफलता",
                        "समुदाय", "पर्यावरण", "दुनिया", "स्वास्थ्य", "पैसा", "समय", "ऊर्जा", "अंतरिक्ष", "शक्ति", "मन",
                        "जीवन", "काम", "विचार", "समस्या", "प्रश्न", "उत्तर", "संस्कृति", "भाषा", "देश", "शहर",
                        "परिवार", "मित्र", "बच्चा", "लोग", "व्यक्ति", "स्थान", "घर", "स्कूल", "कंपनी", "कार्यालय",
                        "गाड़ी", "घर", "भोजन", "पानी", "हवा", "आग", "पृथ्वी", "सूर्य", "चाँद", "तारा"],
                    "ar": ["تقنية", "مستقبل", "نظام"]
                };

                const pool = wordPools[lang] || wordPools["en-us"];

                let result = [];

                for (let i = 0; i < count; i++) {
                    result.push(pool[Math.floor(Math.random() * pool.length)]);
                }

                return result.join(" ");
            }

            // =========================
            // Copy Function
            // =========================
            window.copyResult = function () {

                const text = resultBox.innerText;

                if (text === '' || text === 'Your generated text will appear here...') {
                    showNotification('No result to copy', 'error');
                    return;
                }
                copyToClipboard(text, document.getElementById('copy-btn'));
            };

            // =========================
            // Utility
            // =========================
            function capitalize(word) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }

        });


        function clearAll() {
            document.getElementById('input-text').value = '';
            document.getElementById('result').textContent = 'Your generated slug will appear here...';
        }
