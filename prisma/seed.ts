import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌸 Seeding TOKI & TOMO database...\n");

  // ── Ritual Prompts — 52 weeks, "sakura-letters" theme (English) ──

  console.log("Creating ritual prompts (en)...");

  const enPrompts: { week: number; title: string; prompt: string }[] = [
    { week: 1, title: "First Marks", prompt: "Write your name slowly with a new pen. Notice how the ink meets the paper. What does your handwriting say about you today?" },
    { week: 2, title: "Morning Pages", prompt: "Before checking your phone, write three sentences about how you feel. Let the words be imperfect." },
    { week: 3, title: "Letter to a Stranger", prompt: "Write a short letter to someone you'll never meet. What would you want them to know about this moment in time?" },
    { week: 4, title: "Color Story", prompt: "Choose one color from your stationery. Use only that color to write about a memory it reminds you of." },
    { week: 5, title: "The Envelope", prompt: "Decorate an envelope with washi tape. Address it to yourself, one year from now. What do you hope for?" },
    { week: 6, title: "Gratitude List", prompt: "Write five small things you're grateful for today. Use your most beautiful handwriting for each one." },
    { week: 7, title: "Haiku Practice", prompt: "Write three haiku about ordinary things you noticed this week. 5-7-5 syllables. Embrace simplicity." },
    { week: 8, title: "Sticker Journal", prompt: "Create a small collage page using your stickers. Write one word beside each that captures a feeling." },
    { week: 9, title: "Pen Pal Draft", prompt: "Draft the opening paragraph of a letter to an imaginary pen pal in Tokyo. Introduce yourself and your world." },
    { week: 10, title: "Weather Diary", prompt: "Describe today's weather using only sensory details — what you see, hear, feel, smell. No judgments, just observation." },
    { week: 11, title: "Favorite Things", prompt: "Make a list of 10 objects in your home that bring you quiet joy. Draw a tiny sketch next to each." },
    { week: 12, title: "Tea & Write", prompt: "Brew a cup of tea or coffee. Write while drinking it. Describe the warmth, the taste, the steam." },
    { week: 13, title: "Quarter Reflection", prompt: "You're 13 weeks in. Write a letter to the you who started this ritual. What have you learned about slowing down?" },
    { week: 14, title: "Texture Study", prompt: "Run your fingers over each paper in your collection. Write one adjective for each texture you feel." },
    { week: 15, title: "Window View", prompt: "Sit by a window. Describe exactly what you see, as if someone who has never seen this view was reading your words." },
    { week: 16, title: "Childhood Memory", prompt: "Write about a stationery item you loved as a child — a pencil case, a notebook, crayons. What did it mean to you?" },
    { week: 17, title: "Mono no Aware", prompt: "Write about something beautiful that won't last. A blooming flower, a sunset, a season changing. Feel the gentle sadness." },
    { week: 18, title: "Washi Tape Art", prompt: "Create a border or pattern on a blank page using only washi tape. Inside, write a single sentence that matters to you." },
    { week: 19, title: "Sound Map", prompt: "Close your eyes for 2 minutes. Then write down every sound you heard. Map them spatially on the page." },
    { week: 20, title: "Hand Warmth", prompt: "Write continuously for 5 minutes without stopping. Don't think about quality — just let your hand move." },
    { week: 21, title: "Recipe Card", prompt: "Write a recipe — not for food, but for a perfect day. List the ingredients and instructions with care." },
    { week: 22, title: "Night Letter", prompt: "Write at night by lamplight or candlelight. How does the darkness change what you want to say?" },
    { week: 23, title: "Ikigai Sketch", prompt: "Draw four overlapping circles: What you love, what you're good at, what the world needs, what you can earn from. Write one word in each." },
    { week: 24, title: "Midpoint", prompt: "Halfway through the year of rituals. Look back at your pages. Write about how your handwriting and words have changed." },
    { week: 25, title: "Rain Writing", prompt: "Write about rain — a specific rain you remember. Where were you? What were you doing? What did it change?" },
    { week: 26, title: "Stamp Story", prompt: "If you have stamps or stickers, create a tiny scene. Write a one-paragraph story about the characters in it." },
    { week: 27, title: "Kind Words", prompt: "Write a genuine compliment to someone. Actually give it to them — hand-written, folded, delivered." },
    { week: 28, title: "Walking Notes", prompt: "Take a short walk with a small notebook. Write down three things you notice that most people walk past." },
    { week: 29, title: "Color of the Month", prompt: "What color is this month? Not literally — emotionally. Write about why." },
    { week: 30, title: "Slow Copy", prompt: "Find a poem or quote you love. Copy it by hand, as slowly as possible. Notice each letter forming." },
    { week: 31, title: "Object Meditation", prompt: "Pick up one item from your TOKI & TOMO box. Hold it. Write about its weight, shape, texture, and the hands that made it." },
    { week: 32, title: "Dream Record", prompt: "Write about a dream — real or imagined. Use your most colorful pen." },
    { week: 33, title: "Music & Ink", prompt: "Play a song you love. Write while listening. Let the music guide what you write — rhythm, mood, words." },
    { week: 34, title: "Kintsugi Thoughts", prompt: "Write about something broken that became more beautiful. In your life, in the world, in your thinking." },
    { week: 35, title: "Map Drawing", prompt: "Draw a simple map of somewhere meaningful — your childhood street, your daily route, a place you dream of visiting." },
    { week: 36, title: "Autumn Letter", prompt: "Write a letter to the next season. What are you looking forward to? What will you miss about now?" },
    { week: 37, title: "Tiny Book", prompt: "Fold a piece of paper into a tiny 8-page book. Write a micro-story inside, one sentence per page." },
    { week: 38, title: "Scent Memory", prompt: "Write about a scent that transports you somewhere else. Where does it take you? Why?" },
    { week: 39, title: "Wabi-Sabi Page", prompt: "Make intentional imperfections on your page — smudges, crossed-out words, uneven lines. Find beauty in them." },
    { week: 40, title: "Postcard Home", prompt: "Write a postcard to yourself from an imaginary trip. Where did you go? What did you eat? What surprised you?" },
    { week: 41, title: "Three Words", prompt: "Choose three words that describe this year so far. Write each one large, then surround it with smaller words that explain why." },
    { week: 42, title: "Kitchen Table", prompt: "Write about something that happens at a kitchen table — a conversation, a meal, a quiet moment alone." },
    { week: 43, title: "Star Gazing", prompt: "Write about the night sky. When did you last really look at it? What did the darkness hold?" },
    { week: 44, title: "Gift Wrapping", prompt: "Wrap a small item beautifully using paper and tape from your box. Write a tag. Give it to someone." },
    { week: 45, title: "Year's End Approach", prompt: "The year is winding down. Write about what you want to carry into the new year, and what you want to leave behind." },
    { week: 46, title: "Handmade Card", prompt: "Make a card for someone. Use stickers, washi tape, and your best handwriting. No occasion needed." },
    { week: 47, title: "Comfort Words", prompt: "Write the words you most need to hear right now. Write them big. Write them in your favorite ink." },
    { week: 48, title: "Thank You Notes", prompt: "Write three short thank-you notes — to a person, a place, and a thing. Mean every word." },
    { week: 49, title: "Winter Light", prompt: "Describe the quality of light right now. How it falls on your desk, your page, your hands." },
    { week: 50, title: "Year in Pages", prompt: "Flip through everything you've written this year. Write a short reflection on how this practice has changed you." },
    { week: 51, title: "Sealed Letter", prompt: "Write a letter to yourself. Seal it. Don't open it until this time next year." },
    { week: 52, title: "Full Circle", prompt: "Write your name slowly with a pen. Compare it to Week 1. You are the same person, and you are different. Honor both." },
  ];

  for (const rp of enPrompts) {
    await prisma.ritualPrompt.upsert({
      where: {
        locale_weekNumber_themeMonth: {
          locale: "en",
          weekNumber: rp.week,
          themeMonth: "sakura-letters",
        },
      },
      update: { title: rp.title, promptText: rp.prompt },
      create: {
        locale: "en",
        weekNumber: rp.week,
        title: rp.title,
        promptText: rp.prompt,
        themeMonth: "sakura-letters",
      },
    });
  }
  console.log(`  ✓ ${enPrompts.length} ritual prompts seeded (en)`);

  // ── Japanese ritual prompts (first 12 weeks) ────────────────

  console.log("Creating ritual prompts (ja)...");

  const jaPrompts: { week: number; title: string; prompt: string }[] = [
    { week: 1, title: "最初の一筆", prompt: "新しいペンでゆっくり自分の名前を書いてみましょう。インクが紙に触れる瞬間に注目して。今日のあなたの筆跡は何を語っていますか？" },
    { week: 2, title: "朝の3行", prompt: "スマホを見る前に、今の気持ちを3文で書いてみましょう。完璧でなくていい。" },
    { week: 3, title: "見知らぬ人への手紙", prompt: "一生会うことのない誰かに短い手紙を書きましょう。この瞬間について、何を伝えたいですか？" },
    { week: 4, title: "色の物語", prompt: "文具から一色選んで、その色だけで思い出を書いてみましょう。" },
    { week: 5, title: "封筒", prompt: "マスキングテープで封筒を飾りましょう。1年後の自分宛に。何を願いますか？" },
    { week: 6, title: "感謝リスト", prompt: "今日感謝している小さなこと5つを、一番きれいな字で書きましょう。" },
    { week: 7, title: "俳句の練習", prompt: "今週気づいた日常のことについて俳句を3つ。五七五。シンプルさを大切に。" },
    { week: 8, title: "シールジャーナル", prompt: "シールを使って小さなコラージュページを作りましょう。それぞれの横に感情を表す言葉を一つ。" },
    { week: 9, title: "文通の下書き", prompt: "東京にいる架空のペンフレンドへの手紙の書き出しを考えましょう。自分と自分の世界を紹介して。" },
    { week: 10, title: "天気日記", prompt: "今日の天気を五感だけで描写しましょう。見えるもの、聞こえるもの、感じるもの、匂い。判断なし、観察だけ。" },
    { week: 11, title: "大切なもの", prompt: "家にある静かな喜びをもたらす物を10個リストに。それぞれの横に小さなスケッチを。" },
    { week: 12, title: "お茶と筆記", prompt: "お茶かコーヒーを淹れて、飲みながら書きましょう。温もり、味、湯気を描写して。" },
  ];

  for (const rp of jaPrompts) {
    await prisma.ritualPrompt.upsert({
      where: {
        locale_weekNumber_themeMonth: {
          locale: "ja",
          weekNumber: rp.week,
          themeMonth: "sakura-letters",
        },
      },
      update: { title: rp.title, promptText: rp.prompt },
      create: {
        locale: "ja",
        weekNumber: rp.week,
        title: rp.title,
        promptText: rp.prompt,
        themeMonth: "sakura-letters",
      },
    });
  }
  console.log(`  ✓ ${jaPrompts.length} ritual prompts seeded (ja)`);

  // ── French ritual prompts (first 12 weeks) ──────────────────

  console.log("Creating ritual prompts (fr)...");

  const frPrompts: { week: number; title: string; prompt: string }[] = [
    { week: 1, title: "Premières Traces", prompt: "Écrivez votre nom lentement avec un nouveau stylo. Remarquez comment l'encre rencontre le papier. Que dit votre écriture de vous aujourd'hui ?" },
    { week: 2, title: "Pages du Matin", prompt: "Avant de regarder votre téléphone, écrivez trois phrases sur ce que vous ressentez. Laissez les mots être imparfaits." },
    { week: 3, title: "Lettre à un Inconnu", prompt: "Écrivez une courte lettre à quelqu'un que vous ne rencontrerez jamais. Que voudriez-vous qu'ils sachent sur ce moment ?" },
    { week: 4, title: "Histoire de Couleur", prompt: "Choisissez une couleur de votre papeterie. Utilisez uniquement cette couleur pour écrire un souvenir qu'elle vous rappelle." },
    { week: 5, title: "L'Enveloppe", prompt: "Décorez une enveloppe avec du washi tape. Adressez-la à vous-même, dans un an. Qu'espérez-vous ?" },
    { week: 6, title: "Liste de Gratitude", prompt: "Écrivez cinq petites choses pour lesquelles vous êtes reconnaissant aujourd'hui. Utilisez votre plus belle écriture." },
    { week: 7, title: "Pratique du Haïku", prompt: "Écrivez trois haïkus sur des choses ordinaires que vous avez remarquées cette semaine. 5-7-5 syllabes. Embrassez la simplicité." },
    { week: 8, title: "Journal Autocollant", prompt: "Créez une petite page de collage avec vos autocollants. Écrivez un mot à côté de chacun qui capture un sentiment." },
    { week: 9, title: "Brouillon de Correspondance", prompt: "Rédigez le premier paragraphe d'une lettre à un correspondant imaginaire à Tokyo. Présentez-vous et votre monde." },
    { week: 10, title: "Journal Météo", prompt: "Décrivez le temps d'aujourd'hui en utilisant uniquement des détails sensoriels — ce que vous voyez, entendez, ressentez, sentez." },
    { week: 11, title: "Choses Préférées", prompt: "Faites une liste de 10 objets chez vous qui vous apportent une joie tranquille. Dessinez un petit croquis à côté de chacun." },
    { week: 12, title: "Thé & Écriture", prompt: "Préparez une tasse de thé ou de café. Écrivez en buvant. Décrivez la chaleur, le goût, la vapeur." },
  ];

  for (const rp of frPrompts) {
    await prisma.ritualPrompt.upsert({
      where: {
        locale_weekNumber_themeMonth: {
          locale: "fr",
          weekNumber: rp.week,
          themeMonth: "sakura-letters",
        },
      },
      update: { title: rp.title, promptText: rp.prompt },
      create: {
        locale: "fr",
        weekNumber: rp.week,
        title: rp.title,
        promptText: rp.prompt,
        themeMonth: "sakura-letters",
      },
    });
  }
  console.log(`  ✓ ${frPrompts.length} ritual prompts seeded (fr)\n`);

  // ── Vault Items — Past Box Catalog ───────────────────────────

  console.log("Creating vault items...");

  const vaultItems: {
    locale: string;
    month: string;
    title: string;
    description: string;
  }[] = [
    // ─ January 2026 — "New Beginnings" ─
    { locale: "en", month: "2026-01", title: "Tomoe River Notebook", description: "A5 notebook with legendary Tomoe River paper — ultra-thin, fountain-pen-friendly, with a subtle cream tone that makes every ink color sing." },
    { locale: "en", month: "2026-01", title: "Sailor Shikiori Ink", description: "A mini bottle of Sailor's seasonal ink in 'Yuki-akari' (snow light) — a soft, luminous blue-gray inspired by moonlight on fresh snow." },
    { locale: "en", month: "2026-01", title: "Mt. Fuji Eraser", description: "Plus Air-in eraser shaped like Mt. Fuji. As you erase, the snow-capped peak gradually reveals itself." },
    { locale: "en", month: "2026-01", title: "Washi Tape Set — Ume", description: "Three rolls of washi tape featuring plum blossom patterns in red, pink, and gold — traditional motifs for the new year." },
    { locale: "en", month: "2026-01", title: "New Year Postcard Set", description: "5 letterpress postcards on thick cotton paper, featuring minimal geometric designs inspired by Japanese New Year traditions." },

    // ─ February 2026 — "Love Letters" ─
    { locale: "en", month: "2026-02", title: "Midori Letter Set — Rose", description: "Delicate letter set with tissue-lined envelopes in dusty rose, featuring debossed floral borders." },
    { locale: "en", month: "2026-02", title: "Pilot Kakuno Pen — Soft Pink", description: "Beginner-friendly fountain pen with a smiley face nib. Writes smoothly even for first-time fountain pen users." },
    { locale: "en", month: "2026-02", title: "Heart Washi Tape", description: "Semi-transparent washi tape with tiny watercolor hearts — subtle enough for everyday use." },
    { locale: "en", month: "2026-02", title: "Gel Pen Set — Warm Tones", description: "Set of 4 Pentel Energel pens in exclusive warm tones: dusty pink, terracotta, burgundy, and champagne gold." },
    { locale: "en", month: "2026-02", title: "Origami Heart Kit", description: "Premium origami paper in gradient reds and pinks with illustrated folding instructions for 3 heart designs." },

    // ─ March 2026 — "Sakura Letters" (current) ─
    { locale: "en", month: "2026-03", title: "Sakura Letter Paper", description: "Handmade washi letter paper with pressed sakura petals. Each sheet is unique — real flower fragments embedded in the fibers." },
    { locale: "en", month: "2026-03", title: "Pentel Fude Touch — Sakura Set", description: "Brush-tip sign pens in 4 sakura-inspired colors: pale pink, deep rose, spring green, and warm gray." },
    { locale: "en", month: "2026-03", title: "Cherry Blossom Stickers", description: "Foil-stamped sakura stickers with gold accents. 2 sheets of die-cut petals, branches, and hanami scenes." },
    { locale: "en", month: "2026-03", title: "Washi Tape — Hanami", description: "Wide-format washi tape depicting a continuous cherry blossom landscape, perfect for journal borders." },
    { locale: "en", month: "2026-03", title: "Spring Notebook", description: "A6 notebook with sakura-embossed cover and 52 pages of cream MD paper — one page for each week of the year." },

    // ─ April 2026 — "Rainy Day" (preview) ─
    { locale: "en", month: "2026-04", title: "Rain Drop Gel Pens", description: "Set of 5 translucent gel pens in rain-inspired colors: mist blue, cloud gray, puddle lavender, storm navy, and clear." },
    { locale: "en", month: "2026-04", title: "Tsuyu Letter Set", description: "Rainy season letter paper with watercolor hydrangea borders. Includes matching envelopes with rain-drop liner." },
    { locale: "en", month: "2026-04", title: "Frog Sticky Notes", description: "Die-cut sticky notes shaped like tiny frogs sitting on lily pads. Adorable and functional." },
    { locale: "en", month: "2026-04", title: "Umbrella Washi Tape", description: "Slim washi tape with a repeating pattern of colorful umbrellas and raindrops on a soft gray background." },
    { locale: "en", month: "2026-04", title: "MD Paper Pad — Blank", description: "Midori MD paper pad, A5 blank. The gold standard for fountain pen and fine-tip writing." },

    // ─ Japanese locale items ─
    { locale: "ja", month: "2026-01", title: "トモエリバーノート", description: "伝説のトモエリバー紙を使用したA5ノート。極薄で万年筆に最適、クリーム色の色調がインクの色を美しく引き立てます。" },
    { locale: "ja", month: "2026-01", title: "セーラー四季織インク", description: "セーラーの季節インク「雪明り」ミニボトル。新雪に映る月光をイメージした、柔らかく透明感のあるブルーグレー。" },
    { locale: "ja", month: "2026-01", title: "富士山消しゴム", description: "プラス エアイン消しゴム 富士山型。消すほどに雪をかぶった山頂が姿を現します。" },
    { locale: "ja", month: "2026-01", title: "マスキングテープ — 梅", description: "赤、ピンク、金の梅花柄マスキングテープ3巻セット。お正月の伝統的なモチーフ。" },
    { locale: "ja", month: "2026-01", title: "年賀ポストカードセット", description: "厚手のコットン紙に活版印刷したポストカード5枚。日本のお正月の伝統をイメージしたミニマルな幾何学デザイン。" },

    { locale: "ja", month: "2026-02", title: "ミドリ レターセット — ローズ", description: "ダスティローズのティッシュライニング封筒付き繊細なレターセット。型押しフローラルボーダー。" },
    { locale: "ja", month: "2026-02", title: "パイロット カクノ — ソフトピンク", description: "笑顔のニブが特徴の初心者向け万年筆。万年筆が初めての方でもスムーズに書けます。" },
    { locale: "ja", month: "2026-02", title: "ハートマスキングテープ", description: "小さな水彩ハートの半透明マスキングテープ。日常使いにもちょうどいい上品さ。" },
    { locale: "ja", month: "2026-02", title: "ジェルペンセット — ウォームトーン", description: "ぺんてるエナージェル4色セット：ダスティピンク、テラコッタ、バーガンディ、シャンパンゴールド。" },
    { locale: "ja", month: "2026-02", title: "折り紙ハートキット", description: "赤からピンクのグラデーション折り紙。3種類のハートの折り方イラスト付き。" },

    { locale: "ja", month: "2026-03", title: "桜レターペーパー", description: "押し花の桜の花びら入り手漉き和紙レター。一枚一枚が唯一無二 — 本物の花の断片が繊維に織り込まれています。" },
    { locale: "ja", month: "2026-03", title: "ぺんてる筆タッチ — 桜セット", description: "桜をイメージした4色の筆ペン：淡いピンク、深紅、春グリーン、ウォームグレー。" },
    { locale: "ja", month: "2026-03", title: "桜ステッカー", description: "金箔押し桜ステッカー。ダイカットの花びら、枝、花見のシーン2シート入り。" },
    { locale: "ja", month: "2026-03", title: "マスキングテープ — 花見", description: "連続する桜の風景を描いたワイドマスキングテープ。ジャーナルのボーダーにぴったり。" },
    { locale: "ja", month: "2026-03", title: "春ノート", description: "桜のエンボスカバーA6ノート。クリーム色のMD紙52ページ — 一年の各週に1ページ。" },

    // ─ French locale items ─
    { locale: "fr", month: "2026-01", title: "Cahier Tomoe River", description: "Cahier A5 en papier Tomoe River légendaire — ultra-fin, compatible plume, avec un ton crème subtil qui sublime chaque couleur d'encre." },
    { locale: "fr", month: "2026-01", title: "Encre Sailor Shikiori", description: "Mini bouteille d'encre saisonnière Sailor en 'Yuki-akari' (lumière de neige) — un bleu-gris doux et lumineux inspiré du clair de lune sur la neige." },
    { locale: "fr", month: "2026-01", title: "Gomme Mont Fuji", description: "Gomme Plus Air-in en forme de Mont Fuji. En gommant, le sommet enneigé se révèle progressivement." },
    { locale: "fr", month: "2026-01", title: "Set Washi — Ume", description: "Trois rouleaux de washi tape avec motifs de fleurs de prunier en rouge, rose et or — motifs traditionnels du Nouvel An." },
    { locale: "fr", month: "2026-01", title: "Cartes Postales Nouvel An", description: "5 cartes postales typographiées sur papier coton épais, avec designs géométriques minimalistes inspirés du Nouvel An japonais." },

    { locale: "fr", month: "2026-02", title: "Set de Lettres Midori — Rose", description: "Set de lettres délicat avec enveloppes doublées de papier de soie en rose poudré, avec bordures florales en relief." },
    { locale: "fr", month: "2026-02", title: "Pilot Kakuno — Rose Doux", description: "Stylo plume pour débutants avec une plume au sourire. Écriture fluide même pour les novices." },
    { locale: "fr", month: "2026-02", title: "Washi Tape Cœurs", description: "Washi tape semi-transparent avec de petits cœurs aquarelle — assez subtil pour un usage quotidien." },
    { locale: "fr", month: "2026-02", title: "Set Stylos Gel — Tons Chauds", description: "Set de 4 Pentel Energel en tons chauds exclusifs : rose poudré, terracotta, bordeaux et or champagne." },
    { locale: "fr", month: "2026-02", title: "Kit Origami Cœur", description: "Papier origami premium en dégradé de rouges et roses avec instructions illustrées pour 3 designs de cœurs." },

    { locale: "fr", month: "2026-03", title: "Papier à Lettres Sakura", description: "Papier à lettres washi fait main avec pétales de sakura pressés. Chaque feuille est unique — de vrais fragments de fleurs intégrés dans les fibres." },
    { locale: "fr", month: "2026-03", title: "Pentel Fude Touch — Set Sakura", description: "Feutres pinceau en 4 couleurs inspiration sakura : rose pâle, rose profond, vert printemps et gris chaud." },
    { locale: "fr", month: "2026-03", title: "Autocollants Cerisier", description: "Autocollants sakura estampés à la feuille d'or. 2 feuilles de pétales, branches et scènes de hanami découpées." },
    { locale: "fr", month: "2026-03", title: "Washi Tape — Hanami", description: "Washi tape large format représentant un paysage continu de cerisiers en fleurs, parfait pour les bordures de journal." },
    { locale: "fr", month: "2026-03", title: "Cahier Printemps", description: "Cahier A6 avec couverture embossée sakura et 52 pages de papier MD crème — une page pour chaque semaine de l'année." },
  ];

  for (const item of vaultItems) {
    await prisma.vaultItem.upsert({
      where: {
        locale_month_title: {
          locale: item.locale,
          month: item.month,
          title: item.title,
        },
      },
      update: { description: item.description },
      create: {
        locale: item.locale,
        month: item.month,
        title: item.title,
        description: item.description,
      },
    });
  }
  console.log(`  ✓ ${vaultItems.length} vault items seeded\n`);

  console.log("✨ Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
