document.addEventListener("DOMContentLoaded", function () {

    const textMode = document.getElementById("text-mode");
    const languageSelect = document.getElementById("language");
    const rangeInput = document.getElementById("range");
    const resultBox = document.getElementById("result");
    const dyc = document.getElementById("dyc");


    // console.log(textMode.value, languageSelect, rangeInput, resultBox);
    // =========================
    // Mode Change Logic
    // =========================
    textMode.addEventListener("change", handleModeChange);

    function handleModeChange() {
        const mode = textMode.value;
        const options = languageSelect.options;
        if (textMode.value == "plain" || textMode.value == 'html') {
            dyc.textContent = "Number of sentence";
        }
        else {
            dyc.textContent = "Number of words";

        }
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
        // parseInt safely with fallback
        const wordCount = parseInt(rangeInput.value) || 10;
        // if too low
        if (/\D/g.test(wordCount)) {
            showNotification(`Only digits allowed! (No symbols/emojis)`, 'warn');
            return;
        }

        else if (wordCount < 1) {
            showNotification(`Minimum range is 1`, 'warn');
        }
        else if (wordCount > 2000) {
            showNotification(`Maximum range is 2000`, 'warn');
        }
        else {
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
        }

    };
    // ==================
    // html generator
    // ==================
    function generateStructuredHTML(count, lang) {

        console.log('count: ' + count);
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
        console.log(html.length + 'HTML');
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
            "en-us": {

                noun: [
                    "technology", "future", "system", "design", "growth", "network", "data", "internet", "computer", "software",
                    "information", "development", "science", "research", "innovation", "market", "business", "learning", "education", "knowledge",
                    "experience", "process", "solution", "method", "strategy", "planning", "team", "project", "goal", "success",
                    "community", "environment", "world", "health", "money", "time", "energy", "space", "power", "mind",
                    "life", "work", "idea", "problem", "question", "answer", "culture", "language", "country", "city",
                    "family", "friend", "child", "people", "person", "place", "home", "school", "company", "office",
                    "platform", "industry", "model", "structure", "resource", "tool", "example", "result", "analysis", "approach",
                    "framework", "database", "application", "interface", "system", "service", "network", "device", "content", "media"
                ],

                verb: [
                    "improves", "creates", "supports", "changes", "develops", "builds", "generates", "provides", "manages", "connects",
                    "controls", "explains", "shows", "learns", "applies", "organizes", "shares", "produces", "expands", "protects",
                    "analyzes", "guides", "establishes", "transforms", "influences", "drives", "creates", "delivers", "maintains",
                    "updates", "simplifies", "optimizes", "integrates", "enhances", "implements"
                ],

                adjective: [
                    "modern", "digital", "fast", "global", "creative", "new", "big", "small", "effective", "successful",
                    "smart", "flexible", "strong", "stable", "secure", "open", "general", "special", "popular", "global",
                    "local", "better", "simple", "complex", "advanced", "active", "practical", "accurate", "positive",
                    "major", "useful", "reliable", "efficient", "dynamic", "innovative", "powerful"
                ],

                connector: [
                    "and", "but", "because", "so", "while", "although", "however", "therefore", "moreover", "besides",
                    "meanwhile", "then", "if", "sometimes", "usually", "together", "as well as", "in addition",
                    "for example", "as a result"
                ],

                stop: ["."]
            },
            "en-uk": {

                noun: [
                    "technology", "future", "system", "design", "growth", "network", "data", "internet", "computer", "software",
                    "information", "development", "science", "research", "innovation", "market", "business", "learning", "education", "knowledge",
                    "experience", "process", "solution", "method", "strategy", "planning", "team", "project", "goal", "success",
                    "community", "environment", "world", "health", "money", "time", "energy", "space", "power", "mind",
                    "life", "work", "idea", "problem", "question", "answer", "culture", "language", "country", "city",
                    "family", "friend", "child", "people", "person", "place", "home", "school", "company", "office",
                    "platform", "industry", "model", "structure", "resource", "tool", "example", "result", "analysis", "approach",

                    "flat", "lorry", "petrol", "biscuit", "holiday", "queue", "pavement", "lift", "boot", "bonnet",
                    "dustbin", "chemist", "post", "football", "pitch", "shop", "car park", "university", "council", "garden"
                ],

                verb: [
                    "improves", "creates", "supports", "changes", "develops", "builds", "generates", "provides", "manages", "connects",
                    "controls", "explains", "shows", "learns", "applies", "organises", "shares", "produces", "expands", "protects",
                    "analyses", "guides", "establishes", "transforms", "influences", "drives", "delivers", "maintains",
                    "updates", "simplifies", "optimises", "integrates", "enhances", "implements"
                ],

                adjective: [
                    "modern", "digital", "fast", "global", "creative", "new", "big", "small", "effective", "successful",
                    "smart", "flexible", "strong", "stable", "secure", "open", "general", "special", "popular", "local",
                    "better", "simple", "complex", "advanced", "active", "practical", "accurate", "positive",
                    "major", "useful", "reliable", "efficient", "dynamic", "innovative", "powerful"
                ],

                connector: [
                    "and", "but", "because", "so", "while", "although", "however", "therefore", "moreover", "besides",
                    "meanwhile", "then", "if", "sometimes", "usually", "together", "as well as", "in addition",
                    "for example", "as a result"
                ],

                stop: "."
            },
            "es": {

                noun: [
                    "tecnología", "futuro", "sistema", "diseño", "crecimiento", "red", "datos", "internet", "computadora", "software",
                    "información", "desarrollo", "ciencia", "investigación", "innovación", "mercado", "negocio", "aprendizaje", "educación", "conocimiento",
                    "experiencia", "proceso", "solución", "método", "estrategia", "plan", "equipo", "proyecto", "objetivo", "éxito",
                    "comunidad", "medio ambiente", "mundo", "salud", "dinero", "tiempo", "energía", "espacio", "poder", "mente",
                    "vida", "trabajo", "idea", "problema", "pregunta", "respuesta", "cultura", "idioma", "país", "ciudad",
                    "familia", "amigo", "niño", "personas", "lugar", "hogar", "escuela", "empresa", "oficina", "industria",
                    "plataforma", "modelo", "estructura", "recurso", "herramienta", "ejemplo", "resultado", "análisis", "servicio", "contenido"
                ],

                verb: [
                    "mejora", "crea", "apoya", "cambia", "desarrolla", "construye", "genera", "proporciona", "gestiona", "conecta",
                    "controla", "explica", "muestra", "aprende", "aplica", "organiza", "comparte", "produce", "expande", "protege",
                    "analiza", "guía", "establece", "transforma", "influye", "impulsa", "mantiene", "actualiza", "simplifica", "optimiza",
                    "integra", "mejora", "implementa"
                ],

                adjective: [
                    "moderno", "digital", "rápido", "global", "creativo", "nuevo", "grande", "pequeño", "efectivo", "exitoso",
                    "inteligente", "flexible", "fuerte", "estable", "seguro", "abierto", "general", "especial", "popular", "local",
                    "mejor", "simple", "complejo", "avanzado", "activo", "práctico", "preciso", "positivo", "principal", "útil",
                    "fiable", "eficiente", "dinámico", "innovador", "potente"
                ],

                connector: [
                    "y", "pero", "porque", "así que", "mientras", "aunque", "sin embargo", "por lo tanto",
                    "además", "también", "mientras tanto", "entonces", "si", "a veces", "generalmente",
                    "junto con", "por ejemplo", "como resultado"
                ],

                stop: "."
            },
            "fr": {

                noun: [
                    "technologie", "avenir", "système", "conception", "croissance", "réseau", "données", "internet", "ordinateur", "logiciel",
                    "information", "développement", "science", "recherche", "innovation", "marché", "entreprise", "apprentissage", "éducation", "connaissance",
                    "expérience", "processus", "solution", "méthode", "stratégie", "plan", "équipe", "projet", "objectif", "succès",
                    "communauté", "environnement", "monde", "santé", "argent", "temps", "énergie", "espace", "pouvoir", "esprit",
                    "vie", "travail", "idée", "problème", "question", "réponse", "culture", "langue", "pays", "ville",
                    "famille", "ami", "enfant", "personne", "lieu", "maison", "école", "société", "bureau", "industrie",
                    "plateforme", "modèle", "structure", "ressource", "outil", "exemple", "résultat", "analyse", "service", "contenu"
                ],

                verb: [
                    "améliore", "crée", "soutient", "change", "développe", "construit", "génère", "fournit", "gère", "connecte",
                    "contrôle", "explique", "montre", "apprend", "applique", "organise", "partage", "produit", "étend", "protège",
                    "analyse", "guide", "établit", "transforme", "influence", "stimule", "maintient", "met à jour", "simplifie",
                    "optimise", "intègre", "renforce", "implémente"
                ],

                adjective: [
                    "moderne", "numérique", "rapide", "global", "créatif", "nouveau", "grand", "petit", "efficace", "réussi",
                    "intelligent", "flexible", "fort", "stable", "sécurisé", "ouvert", "général", "spécial", "populaire", "local",
                    "meilleur", "simple", "complexe", "avancé", "actif", "pratique", "précis", "positif", "principal", "utile",
                    "fiable", "efficace", "dynamique", "innovant", "puissant"
                ],

                connector: [
                    "et", "mais", "parce que", "donc", "pendant que", "bien que", "cependant", "ainsi",
                    "de plus", "aussi", "pendant ce temps", "alors", "si", "parfois", "généralement",
                    "avec", "par exemple", "comme résultat"
                ],

                stop: "."
            },
            "de": {

                noun: [
                    "Technologie", "Zukunft", "System", "Design", "Wachstum", "Netzwerk", "Daten", "Internet", "Computer", "Software",
                    "Information", "Entwicklung", "Wissenschaft", "Forschung", "Innovation", "Markt", "Geschäft", "Lernen", "Bildung", "Wissen",
                    "Erfahrung", "Prozess", "Lösung", "Methode", "Strategie", "Plan", "Team", "Projekt", "Ziel", "Erfolg",
                    "Gemeinschaft", "Umwelt", "Welt", "Gesundheit", "Geld", "Zeit", "Energie", "Raum", "Kraft", "Geist",
                    "Leben", "Arbeit", "Idee", "Problem", "Frage", "Antwort", "Kultur", "Sprache", "Land", "Stadt",
                    "Familie", "Freund", "Kind", "Menschen", "Person", "Ort", "Haus", "Schule", "Firma", "Büro",
                    "Plattform", "Modell", "Struktur", "Ressource", "Werkzeug", "Beispiel", "Ergebnis", "Analyse", "Dienst", "Inhalt"
                ],

                verb: [
                    "verbessert", "erstellt", "unterstützt", "ändert", "entwickelt", "baut", "erzeugt", "liefert", "verwaltet", "verbindet",
                    "kontrolliert", "erklärt", "zeigt", "lernt", "wendet an", "organisiert", "teilt", "produziert", "erweitert", "schützt",
                    "analysiert", "führt", "etabliert", "transformiert", "beeinflusst", "treibt", "erhält", "aktualisiert",
                    "vereinfacht", "optimiert", "integriert", "stärkt", "implementiert"
                ],

                adjective: [
                    "modern", "digital", "schnell", "global", "kreativ", "neu", "groß", "klein", "effektiv", "erfolgreich",
                    "intelligent", "flexibel", "stark", "stabil", "sicher", "offen", "allgemein", "besonders", "beliebt", "lokal",
                    "besser", "einfach", "komplex", "fortschrittlich", "aktiv", "praktisch", "präzise", "positiv", "wichtig", "nützlich",
                    "zuverlässig", "effizient", "dynamisch", "innovativ", "leistungsstark"
                ],

                connector: [
                    "und", "aber", "weil", "also", "während", "obwohl", "jedoch", "deshalb",
                    "außerdem", "auch", "inzwischen", "dann", "wenn", "manchmal", "gewöhnlich",
                    "zusammen mit", "zum Beispiel", "als Ergebnis"
                ],

                stop: "."
            },
            "zh": {

                noun: [
                    "技术", "未来", "系统", "设计", "发展", "网络", "数据", "互联网", "计算机", "软件",
                    "信息", "研究", "创新", "市场", "业务", "学习", "教育", "知识", "经验", "过程",
                    "解决方案", "方法", "策略", "计划", "团队", "项目", "目标", "成功", "社区", "环境",
                    "世界", "健康", "金钱", "时间", "能源", "空间", "力量", "思想", "生活", "工作",
                    "想法", "问题", "答案", "文化", "语言", "国家", "城市", "家庭", "朋友", "孩子",
                    "人类", "地方", "家庭", "学校", "公司", "办公室", "行业", "平台", "模型", "结构",
                    "资源", "工具", "示例", "结果", "分析", "服务", "内容", "设备", "媒体", "应用",
                    "数据库", "接口", "产品", "组织", "系统结构", "信息系统", "技术平台", "数字世界"
                ],

                verb: [
                    "改进", "创建", "支持", "改变", "发展", "建立", "生成", "提供", "管理", "连接",
                    "控制", "解释", "展示", "学习", "应用", "组织", "分享", "生产", "扩展", "保护",
                    "分析", "指导", "建立", "转变", "影响", "推动", "维护", "更新", "简化", "优化",
                    "整合", "增强", "实施", "发现", "解决", "改进", "开发", "设计", "管理", "促进",
                    "提升", "扩展", "连接", "解释", "表达"
                ],

                adjective: [
                    "现代", "数字", "快速", "全球", "创新", "新的", "大的", "小的", "有效", "成功",
                    "智能", "灵活", "强大", "稳定", "安全", "开放", "一般", "特殊", "流行", "本地",
                    "更好", "简单", "复杂", "先进", "活跃", "实用", "准确", "积极", "主要", "有用",
                    "可靠", "高效", "动态", "创新型", "强力", "专业", "重要", "独特", "优秀", "先进的",
                    "稳定的", "安全的", "快速的"
                ],

                connector: [
                    "和", "但是", "因为", "所以", "同时", "虽然", "然而", "因此",
                    "此外", "也", "然后", "如果", "有时", "通常", "一起",
                    "例如", "作为结果", "另外", "同时", "之后", "之前"
                ],

                stop: "。"

            },
            "ja": {

                noun: [
                    "技術", "未来", "システム", "設計", "成長", "ネットワーク", "データ", "インターネット", "コンピューター", "ソフトウェア",
                    "情報", "開発", "科学", "研究", "革新", "市場", "ビジネス", "学習", "教育", "知識",
                    "経験", "プロセス", "解決策", "方法", "戦略", "計画", "チーム", "プロジェクト", "目標", "成功",
                    "コミュニティ", "環境", "世界", "健康", "お金", "時間", "エネルギー", "空間", "力", "思考",
                    "生活", "仕事", "アイデア", "問題", "質問", "答え", "文化", "言語", "国", "都市",
                    "家族", "友人", "子供", "人々", "場所", "家", "学校", "会社", "オフィス", "産業",
                    "プラットフォーム", "モデル", "構造", "資源", "ツール", "例", "結果", "分析", "サービス", "コンテンツ",
                    "デバイス", "メディア", "アプリケーション", "データベース", "インターフェース", "製品", "組織", "社会", "情報システム", "デジタル世界"
                ],

                verb: [
                    "改善する", "作成する", "支援する", "変更する", "開発する", "構築する", "生成する", "提供する", "管理する", "接続する",
                    "制御する", "説明する", "表示する", "学習する", "適用する", "整理する", "共有する", "生産する", "拡張する", "保護する",
                    "分析する", "導く", "確立する", "変換する", "影響する", "推進する", "維持する", "更新する", "簡素化する", "最適化する",
                    "統合する", "強化する", "実装する", "発見する", "解決する", "設計する", "改善する", "促進する", "開発を進める"
                ],

                adjective: [
                    "現代の", "デジタル", "高速", "グローバル", "創造的", "新しい", "大きい", "小さい", "効果的", "成功した",
                    "スマート", "柔軟な", "強力な", "安定した", "安全な", "開かれた", "一般的な", "特別な", "人気のある", "ローカル",
                    "より良い", "簡単な", "複雑な", "高度な", "活発な", "実用的", "正確な", "積極的な", "主要な", "役に立つ",
                    "信頼できる", "効率的", "動的", "革新的", "強力", "専門的", "重要な", "独自の", "優れた"
                ],

                connector: [
                    "そして", "しかし", "なぜなら", "だから", "同時に", "それでも", "そのため", "さらに",
                    "また", "一方で", "その後", "もし", "ときどき", "通常", "一緒に",
                    "例えば", "結果として", "さらに", "その間"
                ],

                stop: "。"

            },
            "ru": {
                noun: [
                    "технология", "будущее", "система", "развитие", "сеть", "данные",
                    "компьютер", "программа", "интернет", "информация",
                    "наука", "исследование", "инновация", "рынок", "бизнес",
                    "образование", "знание", "процесс", "решение", "стратегия",
                    "план", "команда", "проект", "цель", "успех",
                    "сообщество", "окружающая среда", "мир", "здоровье", "время",
                    "энергия", "пространство", "сила", "разум", "жизнь",
                    "работа", "идея", "проблема", "вопрос", "ответ",
                    "культура", "язык", "страна", "город", "семья",
                    "друг", "ребёнок", "люди", "человек", "место",
                    "дом", "школа", "компания", "офис", "машина",
                    "еда", "вода", "воздух", "земля", "солнце",
                    "луна", "звезда", "ресурс", "платформа", "модель"
                ],

                verb: [
                    "создаёт", "улучшает", "развивает", "поддерживает",
                    "изменяет", "строит", "управляет", "анализирует",
                    "обеспечивает", "соединяет", "защищает",
                    "оптимизирует", "расширяет", "обновляет",
                    "контролирует", "влияет", "объясняет",
                    "использует", "формирует", "показывает"
                ],

                adjective: [
                    "современный", "цифровой", "быстрый", "глобальный",
                    "креативный", "эффективный", "мощный", "надёжный",
                    "важный", "умный", "динамичный", "открытый",
                    "активный", "профессиональный", "инновационный",
                    "стабильный", "точный", "гибкий"
                ],

                connector: [
                    "и", "но", "потому что", "поэтому", "однако",
                    "также", "когда", "если", "хотя", "пока"
                ],

                stop: ["."]
            },
            "ar": {
                noun: [
                    "تقنية", "مستقبل", "نظام", "تطوير", "شبكة", "بيانات",
                    "حاسوب", "برنامج", "إنترنت", "معلومات",
                    "علم", "بحث", "ابتكار", "سوق", "أعمال",
                    "تعليم", "معرفة", "عملية", "حل", "استراتيجية",
                    "خطة", "فريق", "مشروع", "هدف", "نجاح",
                    "مجتمع", "بيئة", "عالم", "صحة", "وقت",
                    "طاقة", "فضاء", "قوة", "عقل", "حياة",
                    "عمل", "فكرة", "مشكلة", "سؤال", "إجابة",
                    "ثقافة", "لغة", "دولة", "مدينة", "عائلة",
                    "صديق", "طفل", "ناس", "شخص", "مكان",
                    "منزل", "مدرسة", "شركة", "مكتب", "سيارة",
                    "طعام", "ماء", "هواء", "أرض", "شمس",
                    "قمر", "نجمة", "منصة", "نموذج", "موارد"
                ],

                verb: [
                    "ينشئ", "يطور", "يحسن", "يدعم",
                    "يغير", "يبني", "يدير", "يحلل",
                    "يوفر", "يربط", "يحمي",
                    "يوسع", "يحدث", "يتحكم",
                    "يؤثر", "يشرح", "يستخدم",
                    "ينظم", "يعرض", "يقود"
                ],

                adjective: [
                    "حديث", "رقمي", "سريع", "عالمي",
                    "مبدع", "فعال", "قوي", "موثوق",
                    "مهم", "ذكي", "ديناميكي",
                    "مفتوح", "نشط", "احترافي",
                    "مبتكر", "مستقر", "دقيق"
                ],

                connector: [
                    "و", "لكن", "لأن", "لذلك",
                    "أيضا", "عندما", "إذا",
                    "رغم أن", "بينما"
                ],

                stop: ["."]
            },
            "hi": {

                noun: [
                    "तकनीक", "भविष्य", "प्रणाली", "विकास", "नेटवर्क", "डेटा", "कंप्यूटर", "सॉफ़्टवेयर",
                    "विज्ञान", "अनुसंधान", "ज्ञान", "शिक्षा", "सूचना", "प्रक्रिया", "समाधान", "रणनीति",
                    "परियोजना", "लक्ष्य", "सफलता", "समुदाय", "पर्यावरण", "दुनिया", "स्वास्थ्य", "ऊर्जा",
                    "समय", "पैसा", "अंतरिक्ष", "शक्ति", "मन", "जीवन", "काम", "विचार", "समस्या", "प्रश्न",
                    "उत्तर", "संस्कृति", "भाषा", "देश", "शहर", "परिवार", "मित्र", "लोग", "व्यक्ति",
                    "स्थान", "घर", "स्कूल", "कंपनी", "कार्यालय", "बाजार", "व्यवसाय", "सिस्टम", "डिज़ाइन",
                    "प्लेटफ़ॉर्म", "इंटरनेट", "उद्योग", "मॉडल", "ढांचा", "संसाधन", "उपकरण", "प्रयोग",
                    "उदाहरण", "सिद्धांत", "मौका", "दिशा", "अनुभव", "प्रभाव", "परिणाम", "संगठन", "समूह"
                ],

                verb: [
                    "बनाता है", "सुधारता है", "विकसित करता है", "समर्थन करता है", "प्रभावित करता है",
                    "निर्माण करता है", "उत्पन्न करता है", "प्रदान करता है", "उपयोग करता है",
                    "प्रबंधित करता है", "बदलता है", "समझता है", "सीखता है", "दिखाता है", "लागू करता है",
                    "जोड़ता है", "तैयार करता है", "साझा करता है", "प्रेरित करता है", "संचालित करता है",
                    "निर्देशित करता है", "स्थापित करता है", "विस्तार करता है", "सुरक्षित करता है",
                    "संगठित करता है", "विश्लेषण करता है", "निर्णय लेता है", "वर्णन करता है",
                    "खोजता है", "समझाता है", "उन्नत करता है", "तैयार करता है", "विकास करता है"
                ],

                adjective: [
                    "आधुनिक", "महत्वपूर्ण", "तेज़", "डिजिटल", "रचनात्मक", "नया", "बड़ा", "छोटा",
                    "प्रभावी", "सफल", "स्मार्ट", "लचीला", "मजबूत", "स्थिर", "सुरक्षित", "खुला",
                    "सामान्य", "विशेष", "लोकप्रिय", "वैश्विक", "स्थानीय", "बेहतर", "सरल", "जटिल",
                    "उन्नत", "सक्रिय", "व्यावहारिक", "रचनात्मक", "सटीक", "सकारात्मक", "प्रमुख",
                    "उपयोगी", "अनुकूल", "विश्वसनीय", "तेज़ी से बढ़ता", "महान", "उत्कृष्ट"
                ],

                connector: [
                    "और", "लेकिन", "क्योंकि", "इसलिए", "तथा", "जबकि", "हालांकि", "फिर भी",
                    "साथ ही", "इसके अलावा", "इसके कारण", "इस प्रकार", "इसके बावजूद",
                    "तब", "यदि", "तो", "कभी-कभी", "आमतौर पर", "साथ-साथ", "इसके साथ"
                ],

                stop: ["।"]

            },
            "pt": {
                noun: [
                    "tecnologia", "futuro", "sistema", "desenvolvimento", "rede",
                    "dados", "computador", "software", "internet", "informação",
                    "ciência", "pesquisa", "inovação", "mercado", "negócio",
                    "educação", "conhecimento", "processo", "solução", "estratégia",
                    "plano", "equipe", "projeto", "objetivo", "sucesso",
                    "comunidade", "ambiente", "mundo", "saúde", "tempo",
                    "energia", "espaço", "força", "mente", "vida",
                    "trabalho", "ideia", "problema", "pergunta", "resposta",
                    "cultura", "língua", "país", "cidade", "família",
                    "amigo", "criança", "pessoas", "pessoa", "lugar",
                    "casa", "escola", "empresa", "escritório", "carro",
                    "comida", "água", "ar", "terra", "sol",
                    "lua", "estrela", "plataforma", "modelo", "recurso"
                ],

                verb: [
                    "cria", "melhora", "desenvolve", "suporta",
                    "muda", "constrói", "gerencia", "analisa",
                    "fornece", "conecta", "protege",
                    "otimiza", "expande", "atualiza",
                    "controla", "influencia", "explica",
                    "usa", "organiza", "mostra"
                ],

                adjective: [
                    "moderno", "digital", "rápido", "global",
                    "criativo", "eficiente", "forte", "confiável",
                    "importante", "inteligente", "dinâmico",
                    "aberto", "ativo", "profissional",
                    "inovador", "estável", "preciso"
                ],

                connector: [
                    "e", "mas", "porque", "portanto",
                    "também", "quando", "se",
                    "embora", "enquanto"
                ],

                stop: ["."]
            },
            "nl": {
                noun: [
                    "technologie", "toekomst", "systeem", "ontwikkeling", "netwerk",
                    "gegevens", "computer", "software", "internet", "informatie",
                    "wetenschap", "onderzoek", "innovatie", "markt", "bedrijf",
                    "onderwijs", "kennis", "proces", "oplossing", "strategie",
                    "plan", "team", "project", "doel", "succes",
                    "gemeenschap", "omgeving", "wereld", "gezondheid", "tijd",
                    "energie", "ruimte", "kracht", "geest", "leven",
                    "werk", "idee", "probleem", "vraag", "antwoord",
                    "cultuur", "taal", "land", "stad", "familie",
                    "vriend", "kind", "mensen", "persoon", "plaats",
                    "huis", "school", "bedrijf", "kantoor", "auto",
                    "eten", "water", "lucht", "aarde", "zon",
                    "maan", "ster", "platform", "model", "bron"
                ],

                verb: [
                    "creëert", "verbetert", "ontwikkelt", "ondersteunt",
                    "verandert", "bouwt", "beheert", "analyseert",
                    "levert", "verbindt", "beschermt",
                    "optimaliseert", "breidt uit", "werkt bij",
                    "controleert", "beïnvloedt", "verklaart",
                    "gebruikt", "organiseert", "toont"
                ],

                adjective: [
                    "modern", "digitaal", "snel", "wereldwijd",
                    "creatief", "efficiënt", "krachtig", "betrouwbaar",
                    "belangrijk", "intelligent", "dynamisch",
                    "open", "actief", "professioneel",
                    "innovatief", "stabiel", "nauwkeurig"
                ],

                connector: [
                    "en", "maar", "omdat", "daarom",
                    "ook", "wanneer", "als",
                    "hoewel", "terwijl"
                ],

                stop: ["."]
            },
            "ta": {
                noun: [
                    "தொழில்நுட்பம்", "எதிர்காலம்", "அமைப்பு", "வளர்ச்சி", "பிணையம்",
                    "தரவு", "கணினி", "மென்பொருள்", "இணையம்", "தகவல்",
                    "அறிவு", "ஆராய்ச்சி", "புதுமை", "சந்தை", "வணிகம்",
                    "கல்வி", "அறிவு", "செயல்முறை", "தீர்வு", "திட்டம்",
                    "குழு", "திட்டம்", "இலக்கு", "வெற்றி", "சமூகம்",
                    "சூழல்", "உலகம்", "ஆரோக்கியம்", "நேரம்", "ஆற்றல்",
                    "விண்வெளி", "சக்தி", "மனம்", "வாழ்க்கை", "வேலை",
                    "கருத்து", "பிரச்சனை", "கேள்வி", "பதில்", "கலாசாரம்",
                    "மொழி", "நாடு", "நகரம்", "குடும்பம்", "நண்பர்",
                    "குழந்தை", "மக்கள்", "நபர்", "இடம்", "வீடு",
                    "பள்ளி", "நிறுவனம்", "அலுவலகம்", "கார்", "உணவு",
                    "தண்ணீர்", "காற்று", "பூமி", "சூரியன்", "நிலா",
                    "நட்சத்திரம்", "மேடை", "மாதிரி", "வளம்"
                ],

                verb: [
                    "உருவாக்குகிறது", "மேம்படுத்துகிறது", "வளர்க்கிறது",
                    "ஆதரிக்கிறது", "மாற்றுகிறது", "உருவாக்குகிறது",
                    "நிர்வகிக்கிறது", "பகுப்பாய்வு செய்கிறது",
                    "வழங்குகிறது", "இணைக்கிறது",
                    "பாதுகாக்கிறது", "புதுப்பிக்கிறது",
                    "கட்டுப்படுத்துகிறது", "பயன்படுத்துகிறது",
                    "ஒழுங்குபடுத்துகிறது", "காட்டுகிறது"
                ],

                adjective: [
                    "நவீன", "டிஜிட்டல்", "வேகமான", "உலகளாவிய",
                    "படைப்பாற்றல்", "திறமையான", "வலுவான",
                    "நம்பகமான", "முக்கியமான", "புத்திசாலி",
                    "சுறுசுறுப்பான", "திறந்த", "செயலில்",
                    "தொழில்முறை", "புதுமையான", "நிலையான"
                ],

                connector: [
                    "மற்றும்", "ஆனால்", "ஏனெனில்",
                    "எனவே", "மேலும்", "எப்போது",
                    "என்றால்", "இருப்பினும்", "அதே நேரத்தில்"
                ],

                stop: ["."]
            },
            "te": {
                noun: [
                    "సాంకేతికత", "భవిష్యత్తు", "వ్యవస్థ", "అభివృద్ధి", "నెట్‌వర్క్",
                    "డేటా", "కంప్యూటర్", "సాఫ్ట్‌వేర్", "ఇంటర్నెట్", "సమాచారం",
                    "విజ్ఞానం", "పరిశోధన", "నవీనత", "మార్కెట్", "వ్యాపారం",
                    "విద్య", "జ్ఞానం", "ప్రక్రియ", "పరిష్కారం", "వ్యూహం",
                    "ప్రణాళిక", "బృందం", "ప్రాజెక్ట్", "లక్ష్యం", "విజయం",
                    "సమాజం", "పర్యావరణం", "ప్రపంచం", "ఆరోగ్యం", "సమయం",
                    "శక్తి", "అంతరిక్షం", "బలం", "మనస్సు", "జీవితం",
                    "పని", "ఆలోచన", "సమస్య", "ప్రశ్న", "సమాధానం",
                    "సంస్కృతి", "భాష", "దేశం", "నగరం", "కుటుంబం",
                    "మిత్రుడు", "పిల్ల", "ప్రజలు", "వ్యక్తి", "స్థలం",
                    "ఇల్లు", "పాఠశాల", "కంపెనీ", "కార్యాలయం", "కారు",
                    "ఆహారం", "నీరు", "గాలి", "భూమి", "సూర్యుడు",
                    "చంద్రుడు", "నక్షత్రం", "వేదిక", "మోడల్", "వనరు"
                ],

                verb: [
                    "సృష్టిస్తుంది", "మెరుగుపరుస్తుంది", "అభివృద్ధి చేస్తుంది",
                    "మద్దతు ఇస్తుంది", "మారుస్తుంది", "నిర్మిస్తుంది",
                    "నిర్వహిస్తుంది", "విశ్లేషిస్తుంది", "అందిస్తుంది",
                    "కలుపుతుంది", "రక్షిస్తుంది", "ఆప్టిమైజ్ చేస్తుంది",
                    "విస్తరిస్తుంది", "నవీకరిస్తుంది", "నియంత్రిస్తుంది",
                    "ప్రభావితం చేస్తుంది", "వివరిస్తుంది", "ఉపయోగిస్తుంది",
                    "వ్యవస్థీకరిస్తుంది", "చూపిస్తుంది"
                ],

                adjective: [
                    "ఆధునిక", "డిజిటల్", "వేగవంతమైన", "ప్రపంచవ్యాప్త",
                    "సృజనాత్మక", "సమర్థవంతమైన", "బలమైన",
                    "నమ్మదగిన", "ముఖ్యమైన", "తెలివైన",
                    "చురుకైన", "తెరవెనుక", "సక్రియమైన",
                    "వృత్తిపరమైన", "నవీనమైన", "స్థిరమైన"
                ],

                connector: [
                    "మరియు", "కానీ", "ఎందుకంటే",
                    "అందువల్ల", "అలాగే", "ఎప్పుడు",
                    "అయితే", "అంతేకాక", "ఇప్పటికీ"
                ],

                stop: ["."]
            },
            "kn": {
                noun: [
                    "ತಂತ್ರಜ್ಞಾನ", "ಭವಿಷ್ಯ", "ವ್ಯವಸ್ಥೆ", "ಅಭಿವೃದ್ಧಿ", "ಜಾಲ",
                    "ಡೇಟಾ", "ಕಂಪ್ಯೂಟರ್", "ಸಾಫ್ಟ್‌ವೇರ್", "ಇಂಟರ್‌ನೆಟ್", "ಮಾಹಿತಿ",
                    "ವಿಜ್ಞಾನ", "ಸಂಶೋಧನೆ", "ನವೀನತೆ", "ಮಾರುಕಟ್ಟೆ", "ವ್ಯವಹಾರ",
                    "ಶಿಕ್ಷಣ", "ಜ್ಞಾನ", "ಪ್ರಕ್ರಿಯೆ", "ಪರಿಹಾರ", "ಯೋಜನೆ",
                    "ತಂಡ", "ಪ್ರಾಜೆಕ್ಟ್", "ಗುರಿ", "ಯಶಸ್ಸು", "ಸಮುದಾಯ",
                    "ಪರಿಸರ", "ಲೋಕ", "ಆರೋಗ್ಯ", "ಸಮಯ", "ಶಕ್ತಿ",
                    "ಅಂತರಿಕ್ಷ", "ಬಲ", "ಮನಸ್ಸು", "ಜೀವನ", "ಕೆಲಸ",
                    "ಆಲೋಚನೆ", "ಸಮಸ್ಯೆ", "ಪ್ರಶ್ನೆ", "ಉತ್ತರ", "ಸಂಸ್ಕೃತಿ",
                    "ಭಾಷೆ", "ದೇಶ", "ನಗರ", "ಕುಟುಂಬ", "ಸ್ನೇಹಿತ",
                    "ಮಗು", "ಜನರು", "ವ್ಯಕ್ತಿ", "ಸ್ಥಳ", "ಮನೆ",
                    "ಶಾಲೆ", "ಕಂಪನಿ", "ಕಚೇರಿ", "ಕಾರು", "ಆಹಾರ",
                    "ನೀರು", "ಗಾಳಿ", "ಭೂಮಿ", "ಸೂರ್ಯ", "ಚಂದ್ರ",
                    "ನಕ್ಷತ್ರ", "ವೇದಿಕೆ", "ಮಾದರಿ", "ಸಂಪನ್ಮೂಲ"
                ],

                verb: [
                    "ರಚಿಸುತ್ತದೆ", "ಸುಧಾರಿಸುತ್ತದೆ", "ಅಭಿವೃದ್ಧಿಪಡಿಸುತ್ತದೆ",
                    "ಬೆಂಬಲಿಸುತ್ತದೆ", "ಬದಲಿಸುತ್ತದೆ", "ನಿರ್ಮಿಸುತ್ತದೆ",
                    "ನಿರ್ವಹಿಸುತ್ತದೆ", "ವಿಶ್ಲೇಷಿಸುತ್ತದೆ",
                    "ಒದಗಿಸುತ್ತದೆ", "ಸಂಪರ್ಕಿಸುತ್ತದೆ",
                    "ರಕ್ಷಿಸುತ್ತದೆ", "ಆಪ್ಟಿಮೈಸ್ ಮಾಡುತ್ತದೆ",
                    "ವಿಸ್ತರಿಸುತ್ತದೆ", "ನವೀಕರಿಸುತ್ತದೆ",
                    "ನಿಯಂತ್ರಿಸುತ್ತದೆ", "ಪ್ರಭಾವಿಸುತ್ತದೆ",
                    "ವಿವರಿಸುತ್ತದೆ", "ಬಳಸುತ್ತದೆ",
                    "ಸಂಘಟಿಸುತ್ತದೆ", "ತೋರಿಸುತ್ತದೆ"
                ],

                adjective: [
                    "ಆಧುನಿಕ", "ಡಿಜಿಟಲ್", "ವೇಗವಾದ", "ಜಾಗತಿಕ",
                    "ಸೃಜನಾತ್ಮಕ", "ಕಾರ್ಯಕ್ಷಮ", "ಬಲವಾದ",
                    "ನಂಬಲರ್ಹ", "ಮುಖ್ಯವಾದ", "ಬುದ್ಧಿವಂತ",
                    "ಚುರುಕಾದ", "ತೆರೆದ", "ಸಕ್ರಿಯ",
                    "ವೃತ್ತಿಪರ", "ನವೀನ", "ಸ್ಥಿರ"
                ],

                connector: [
                    "ಮತ್ತು", "ಆದರೆ", "ಏಕೆಂದರೆ",
                    "ಆದ್ದರಿಂದ", "ಹಾಗೂ", "ಯಾವಾಗ",
                    "ಆದರೂ", "ಇದರಲ್ಲಿ", "ಆ ಸಮಯದಲ್ಲಿ"
                ],

                stop: ["."]
            },
            "ml": {
                noun: [
                    "സാങ്കേതികവിദ്യ", "ഭാവി", "സിസ്റ്റം", "വികസനം", "നെറ്റ്‌വർക്ക്",
                    "ഡാറ്റ", "കമ്പ്യൂട്ടർ", "സോഫ്റ്റ്‌വെയർ", "ഇന്റർനെറ്റ്", "വിവരം",
                    "ശാസ്ത്രം", "ഗവേഷണം", "പുതുമ", "വിപണി", "ബിസിനസ്",
                    "വിദ്യാഭ്യാസം", "ജ്ഞാനം", "പ്രക്രിയ", "പരിഹാരം", "യോജന",
                    "ടീം", "പദ്ധതി", "ലക്ഷ്യം", "വിജയം", "സമൂഹം",
                    "പരിസ്ഥിതി", "ലോകം", "ആരോഗ്യം", "സമയം", "ഊർജം",
                    "ബലം", "മനസ്സ്", "ജീവിതം", "ജോലി", "ചിന്ത",
                    "പ്രശ്നം", "ചോദ്യം", "ഉത്തരം", "സംസ്കാരം", "ഭാഷ",
                    "രാജ്യം", "നഗരം", "കുടുംബം", "സുഹൃത്ത്", "കുഞ്ഞ്",
                    "ജനങ്ങൾ", "വ്യക്തി", "സ്ഥലം", "വീട്", "സ്കൂൾ",
                    "കമ്പനി", "ഓഫീസ്", "കാർ", "ഭക്ഷണം", "വെള്ളം",
                    "കാറ്റ്", "ഭൂമി", "സൂര്യൻ", "ചന്ദ്രൻ", "നക്ഷത്രം",
                    "വേദി", "മാതൃക", "സ്രോതസ്"
                ],

                verb: [
                    "സൃഷ്ടിക്കുന്നു", "മെച്ചപ്പെടുത്തുന്നു", "വികസിപ്പിക്കുന്നു",
                    "പിന്തുണയ്ക്കുന്നു", "മാറ്റുന്നു", "നിർമ്മിക്കുന്നു",
                    "നിർവഹിക്കുന്നു", "വിശകലനം ചെയ്യുന്നു",
                    "നൽകുന്നു", "കണക്റ്റ് ചെയ്യുന്നു",
                    "രക്ഷിക്കുന്നു", "ഓപ്റ്റിമൈസ് ചെയ്യുന്നു",
                    "വ്യാപിപ്പിക്കുന്നു", "അപ്ഡേറ്റ് ചെയ്യുന്നു",
                    "നിയന്ത്രിക്കുന്നു", "പ്രഭാവം ചെലുത്തുന്നു",
                    "വിവരിക്കുന്നു", "ഉപയോഗിക്കുന്നു",
                    "സംഘടിപ്പിക്കുന്നു", "കാണിക്കുന്നു"
                ],

                adjective: [
                    "ആധുനിക", "ഡിജിറ്റൽ", "വേഗമുള്ള", "ആഗോള",
                    "സൃഷ്ടിപരമായ", "പ്രഭാവകരമായ", "ശക്തമായ",
                    "വിശ്വസനീയമായ", "പ്രധാനമായ", "ബുദ്ധിമാനായ",
                    "സജീവമായ", "തുറന്ന", "വൃത്തിപരമായ",
                    "നവീനമായ", "സ്ഥിരമായ"
                ],

                connector: [
                    "മറ്റും", "പക്ഷേ", "കാരണം",
                    "അതിനാൽ", "കൂടാതെ", "എപ്പോൾ",
                    "എങ്കിലും", "അതേസമയം"
                ],

                stop: ["."]
            }
        };
        // Fallback language
        const grammar = wordPools[lang] || wordPools["en-us"];
        const stop = grammar.stop || '.'
        let result = [];

        for (let i = 0; i < count; i++) {
            // random helper
            const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
            // sentence templated
            const templates = [
                // adjective + noun + noun + verb
                () => `${rand(grammar.adjective)} ${rand(grammar.noun)} ${rand(grammar.noun)} ${rand(grammar.verb)}`,
                // noun + connecter + noun + verb
                () => `${rand(grammar.noun)} ${rand(grammar.connector)} ${rand(grammar.noun)} ${rand(grammar.verb)}`,
                // adjective + noun + verb
                () => `${rand(grammar.adjective)} ${rand(grammar.noun)} ${rand(grammar.verb)}`
            ]
            // choose random template
            result.push(templates[Math.floor(Math.random() * templates.length)]());
        }
        // Join sentence
        let resultb = document.getElementById('result');
        let text;
        if (lang == "zh" || lang == "ja") {
            text = result.join(stop);
            text = text.replace(/\s+/g, "");
            resultb.style.direction = 'ltr';

        }
        else if (lang == "ar") {
            resultb.style.direction = 'rtl';
            text = result.join('' + stop + ' ');
        }
        else {
            text = result.join('' + stop + ' ');
            resultb.style.direction = 'ltr';
        }
        // console.log(wordPools.lang['join']);
        // capitalize first letter
        text = text.charAt(0).toUpperCase() + text.slice(1) + ".";
        return text;
    }

    // =========================
    // Utility
    // =========================
    function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

});
// COPY & CLEAR
function copyResult() {
    if (document.getElementById('result').textContent == 'Your result will appear here...') {
        showNotification('Nothing to copy!', 'error');
        return;
    }
    else {
        copyToClipboard(document.getElementById('result').textContent, document.getElementById('copy-btn'));
    }
}
function clearAll() {
    if (document.getElementById('result').textContent == 'Your result will appear here...') {
        showNotification('Nothing to clear!', 'error');
        return;
    }
    else {
        document.getElementById('result').textContent = 'Your result will appear here...';
        showNotification('All clear', 'success');
    }
}
