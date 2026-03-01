import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed Ritual Prompts for Sakura Letters theme
  const prompts = [
    {
      locale: "en",
      weekNumber: 1,
      title: "First Letter",
      promptText:
        "Write a short letter to someone you haven't spoken to in a while. Use the sakura-themed stationery from this month's box. Focus on one memory you share.",
      themeMonth: "sakura-letters",
    },
    {
      locale: "en",
      weekNumber: 2,
      title: "Quiet Observation",
      promptText:
        "Spend 10 minutes observing something in nature. Sketch or describe it using the colored pencils and notepad from your box.",
      themeMonth: "sakura-letters",
    },
    {
      locale: "en",
      weekNumber: 3,
      title: "Gratitude List",
      promptText:
        "Create a gratitude list on the washi tape-bordered page. Write 5 things you're thankful for this week, decorated with the stickers from your box.",
      themeMonth: "sakura-letters",
    },
    {
      locale: "en",
      weekNumber: 4,
      title: "Seal & Send",
      promptText:
        "Seal your letter from Week 1 using the envelope and sticker seal from your box. Send it, or keep it as a time capsule for yourself.",
      themeMonth: "sakura-letters",
    },
    {
      locale: "fr",
      weekNumber: 1,
      title: "Première Lettre",
      promptText:
        "Écrivez une courte lettre à quelqu'un à qui vous n'avez pas parlé depuis longtemps. Utilisez la papeterie sur le thème sakura de la box de ce mois. Concentrez-vous sur un souvenir que vous partagez.",
      themeMonth: "sakura-letters",
    },
    {
      locale: "fr",
      weekNumber: 2,
      title: "Observation Tranquille",
      promptText:
        "Passez 10 minutes à observer quelque chose dans la nature. Dessinez ou décrivez-le avec les crayons de couleur et le bloc-notes de votre box.",
      themeMonth: "sakura-letters",
    },
    {
      locale: "fr",
      weekNumber: 3,
      title: "Liste de Gratitude",
      promptText:
        "Créez une liste de gratitude sur la page bordée de washi tape. Écrivez 5 choses pour lesquelles vous êtes reconnaissant cette semaine, décorées avec les autocollants de votre box.",
      themeMonth: "sakura-letters",
    },
    {
      locale: "fr",
      weekNumber: 4,
      title: "Sceller & Envoyer",
      promptText:
        "Scellez votre lettre de la semaine 1 avec l'enveloppe et le sceau autocollant de votre box. Envoyez-la, ou gardez-la comme capsule temporelle.",
      themeMonth: "sakura-letters",
    },
    {
      locale: "ja",
      weekNumber: 1,
      title: "最初の手紙",
      promptText:
        "しばらく話していない人に短い手紙を書きましょう。今月届いた桜テーマの文具を使って、共有した思い出をひとつ書いてみてください。",
      themeMonth: "sakura-letters",
    },
    {
      locale: "ja",
      weekNumber: 2,
      title: "静かな観察",
      promptText:
        "自然の中で何かを10分間観察してください。ボックスに入っている色鉛筆とメモ帳を使って、スケッチまたは説明を書きましょう。",
      themeMonth: "sakura-letters",
    },
    {
      locale: "ja",
      weekNumber: 3,
      title: "感謝リスト",
      promptText:
        "マスキングテープで縁取りしたページに感謝リストを作りましょう。今週感謝していることを5つ、ボックスのシールで飾りながら書いてください。",
      themeMonth: "sakura-letters",
    },
    {
      locale: "ja",
      weekNumber: 4,
      title: "封をして送る",
      promptText:
        "第1週に書いた手紙を、ボックスに入っている封筒とシールシールで封をしましょう。送るか、自分へのタイムカプセルとして保管してください。",
      themeMonth: "sakura-letters",
    },
  ];

  for (const prompt of prompts) {
    await prisma.ritualPrompt.upsert({
      where: {
        locale_weekNumber_themeMonth: {
          locale: prompt.locale,
          weekNumber: prompt.weekNumber,
          themeMonth: prompt.themeMonth,
        },
      },
      update: prompt,
      create: prompt,
    });
  }

  // Seed Vault Items
  const vaultItems = [
    {
      locale: "en",
      title: "Sakura Washi Tape Set",
      description:
        "A set of 3 delicate washi tapes featuring cherry blossom patterns in pink, gold, and soft white.",
      month: "2025-04",
      imageUrl: "/images/vault/sakura-washi.jpg",
    },
    {
      locale: "en",
      title: "Hanami Letter Paper",
      description:
        "12 sheets of premium letter paper with watercolor sakura illustrations. Includes 6 matching envelopes.",
      month: "2025-04",
      imageUrl: "/images/vault/hanami-paper.jpg",
    },
    {
      locale: "en",
      title: "Petal Pink Gel Pen",
      description:
        "Smooth-writing 0.5mm gel pen in a limited sakura pink color with gold clip detail.",
      month: "2025-04",
      imageUrl: "/images/vault/petal-pen.jpg",
    },
    {
      locale: "en",
      title: "Sakura Sticker Sheet",
      description:
        "40+ stickers featuring cherry blossoms, petals, lanterns, and spring motifs. Perfect for journaling.",
      month: "2025-04",
      imageUrl: "/images/vault/sakura-stickers.jpg",
    },
    {
      locale: "fr",
      title: "Set de Washi Tape Sakura",
      description:
        "Un ensemble de 3 washi tapes délicats avec des motifs de fleurs de cerisier en rose, or et blanc doux.",
      month: "2025-04",
      imageUrl: "/images/vault/sakura-washi.jpg",
    },
    {
      locale: "fr",
      title: "Papier à Lettres Hanami",
      description:
        "12 feuilles de papier à lettres premium avec des illustrations aquarelle de sakura. 6 enveloppes assorties incluses.",
      month: "2025-04",
      imageUrl: "/images/vault/hanami-paper.jpg",
    },
    {
      locale: "fr",
      title: "Stylo Gel Rose Pétale",
      description:
        "Stylo gel 0.5mm à écriture fluide en rose sakura édition limitée avec clip doré.",
      month: "2025-04",
      imageUrl: "/images/vault/petal-pen.jpg",
    },
    {
      locale: "fr",
      title: "Planche d'Autocollants Sakura",
      description:
        "Plus de 40 autocollants avec fleurs de cerisier, pétales, lanternes et motifs printaniers.",
      month: "2025-04",
      imageUrl: "/images/vault/sakura-stickers.jpg",
    },
    {
      locale: "ja",
      title: "桜マスキングテープセット",
      description:
        "ピンク、ゴールド、ソフトホワイトの桜柄マスキングテープ3本セット。",
      month: "2025-04",
      imageUrl: "/images/vault/sakura-washi.jpg",
    },
    {
      locale: "ja",
      title: "花見レターペーパー",
      description:
        "桜の水彩画イラスト入りプレミアムレターペーパー12枚。お揃いの封筒6枚付き。",
      month: "2025-04",
      imageUrl: "/images/vault/hanami-paper.jpg",
    },
    {
      locale: "ja",
      title: "ペタルピンク ジェルペン",
      description:
        "限定桜ピンクの0.5mmジェルペン。ゴールドクリップ付き。",
      month: "2025-04",
      imageUrl: "/images/vault/petal-pen.jpg",
    },
    {
      locale: "ja",
      title: "桜シールシート",
      description:
        "桜、花びら、提灯、春モチーフのシール40枚以上。ジャーナリングに最適。",
      month: "2025-04",
      imageUrl: "/images/vault/sakura-stickers.jpg",
    },
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
      update: item,
      create: item,
    });
  }

  console.log("Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
