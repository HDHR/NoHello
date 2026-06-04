const translations = {
  id: {
    brandTagline: "singkat, ramah, jelas",
    navWhy: "Kenapa?",
    navExample: "Contoh",
    navCopy: "Teks singkat",
    heroEyebrow: "Catatan kecil sebelum DM aku",
    heroTitle: 'Tolong jangan cuma bilang <span>"halo"</span>.',
    heroLead: "Kirim pertanyaan, konteks, dan hal yang kamu butuhkan dalam satu pesan. Aku tetap senang ngobrol, cuma lebih cepat kalau masalahnya langsung ikut datang.",
    heroCta: "Lihat contoh",
    githubCta: "Buka NoHello di GitHub",
    whyEyebrow: "Lebih sedikit nunggu, lebih cepat dibantu",
    whyTitle: "Kenapa?",
    whyOneTitle: "Waktu tunggu berkurang",
    whyOneText: "Kalau kamu langsung kirim masalahnya, aku bisa baca dan jawab saat aku online tanpa bolak-balik nunggu.",
    whyTwoTitle: "Konteks tidak hilang",
    whyTwoText: "Detail kecil seperti error, link, deadline, atau tujuan sering jadi pembeda antara jawaban cepat dan tebak-tebakan.",
    whyThreeTitle: "Tetap ramah",
    whyThreeText: "Boleh tetap pakai sapaan. Cukup lanjutkan dengan isi pesannya di baris yang sama.",
    exampleEyebrow: "Tetap ramah, tapi lebih jelas",
    exampleTitle: "Contoh pesan",
    badTitle: "Kurang ideal",
    badText: "Halo",
    badMeta: "Lalu menunggu balasan sebelum menjelaskan apa yang dibutuhkan.",
    goodTitle: "Lebih enak",
    goodText: "Halo, bisa bantu aku pilih jadwal buat meeting minggu ini? Aku kosong Selasa sore atau Kamis pagi, dan butuh sekitar 30 menit.",
    goodMeta: "Sapaan tetap ada, konteks juga langsung lengkap.",
    copyEyebrow: "Butuh balasan yang pas?",
    copyTitle: "Teks singkat",
    copyText: 'Hai! Biar lebih cepat, langsung kirim pertanyaan atau konteksnya ya. Tidak perlu nunggu aku balas "halo" dulu.',
    copyButton: "Salin",
    copied: "Copied",
    typing: "Sapaannya boleh. Konteksnya jangan ketinggalan.",
    chatHello: "Halo",
    chatBetter: "Halo, bisa bantu cek ini? Aku sudah kirim konteksnya juga.",
    chatThanks: "Siap, ini jauh lebih gampang dibantu."
  },
  en: {
    brandTagline: "short, kind, clear",
    navWhy: "Why?",
    navExample: "Example",
    navCopy: "Short text",
    heroEyebrow: "A small note before you DM me",
    heroTitle: 'Please do not just say <span>"hello"</span>.',
    heroLead: "Send the question, context, and what you need in one message. I still like friendly chats, it is just faster when the problem arrives with the greeting.",
    heroCta: "See example",
    githubCta: "Open NoHello on GitHub",
    whyEyebrow: "Less waiting, more helping",
    whyTitle: "Why?",
    whyOneTitle: "Less waiting",
    whyOneText: "When the actual request is included upfront, I can read it and answer when I am online without a greeting-only round trip.",
    whyTwoTitle: "Context survives",
    whyTwoText: "Small details like errors, links, deadlines, or the goal often decide whether the reply is useful or just guesswork.",
    whyThreeTitle: "Still friendly",
    whyThreeText: "Greetings are welcome. Just continue with the message in the same send.",
    exampleEyebrow: "Same friendly tone, more useful message",
    exampleTitle: "Message example",
    badTitle: "Less ideal",
    badText: "Hello",
    badMeta: "Then waiting for a reply before explaining what is needed.",
    goodTitle: "Better",
    goodText: "Hello, can you help me pick a time for a meeting this week? I am free Tuesday afternoon or Thursday morning, and it should take around 30 minutes.",
    goodMeta: "The greeting stays, and the context arrives with it.",
    copyEyebrow: "Need a good reply?",
    copyTitle: "Short text",
    copyText: 'Hey! To make this faster, please send the question or context directly. No need to wait for me to reply to "hello" first.',
    copyButton: "Copy",
    copied: "Copied",
    typing: "Greetings are good. Context makes them useful.",
    chatHello: "Hello",
    chatBetter: "Hello, can you help check this? I sent the context too.",
    chatThanks: "Sure, this is much easier to help with."
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("current-year");
  const typing = document.getElementById("typing-effect");
  const copyButton = document.getElementById("copyButton");
  const copyText = document.getElementById("copyText");
  const transitionDuration = 120;
  let typingRun = 0;
  let activeLang = getLangFromPath() || getLangFromQuery() || "en";

  year.textContent = new Date().getFullYear();

  function setLanguage(lang) {
    activeLang = translations[lang] ? lang : "en";
    document.documentElement.lang = activeLang;

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.dataset.i18n;
      node.textContent = translations[activeLang][key] || node.textContent;
    });

    document.querySelectorAll("[data-i18n-html]").forEach((node) => {
      const key = node.dataset.i18nHtml;
      node.innerHTML = translations[activeLang][key] || node.innerHTML;
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
      const key = node.dataset.i18nAria;
      const label = translations[activeLang][key];
      if (label) {
        node.setAttribute("aria-label", label);
        node.setAttribute("title", label);
      }
    });

    document.querySelectorAll("[data-lang]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.lang === activeLang);
    });

    copyButton.textContent = translations[activeLang].copyButton;
    typeText(translations[activeLang].typing, typing, ++typingRun);

    document.querySelector("[data-chat='hello']").textContent = translations[activeLang].chatHello;
    document.querySelector("[data-chat='better']").textContent = translations[activeLang].chatBetter;
    document.querySelector("[data-chat='thanks']").textContent = translations[activeLang].chatThanks;
  }

  function getLangFromPath() {
    const firstSegment = window.location.pathname.split("/").filter(Boolean)[0];
    return translations[firstSegment] ? firstSegment : "";
  }

  function getLangFromQuery() {
    const queryLang = new URLSearchParams(window.location.search).get("lang");
    return translations[queryLang] ? queryLang : "";
  }

  function routeForLang(lang) {
    if (window.location.protocol === "file:") return "";
    const hash = window.location.hash || "";
    return lang === "en" ? `/en/${hash}` : `/id/${hash}`;
  }

  function updateUrlForLang(lang) {
    const route = routeForLang(lang);
    if (route && window.location.pathname + window.location.hash !== route) {
      window.history.pushState({ lang }, "", route);
    }
  }

  function typeText(message, target, runId, index = 0) {
    if (!target) return;
    if (runId !== typingRun) return;
    if (index === 0) target.textContent = "";
    if (index < message.length) {
      target.textContent += message.charAt(index);
      window.setTimeout(() => typeText(message, target, runId, index + 1), 34);
    }
  }

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", (event) => {
      const nextLang = button.dataset.lang;
      event.preventDefault();
      if (nextLang === activeLang) return;

      document.body.classList.add("is-switching");

      window.setTimeout(() => {
        setLanguage(nextLang);
        updateUrlForLang(nextLang);
        window.requestAnimationFrame(() => {
          document.body.classList.remove("is-switching");
        });
      }, transitionDuration);
    });
  });

  window.addEventListener("popstate", () => {
    setLanguage(getLangFromPath() || getLangFromQuery() || "en");
  });

  copyButton.addEventListener("click", async () => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(copyText.textContent);
    } else {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(copyText);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      selection.removeAllRanges();
    }

    copyButton.textContent = translations[activeLang].copied;
    window.setTimeout(() => {
      copyButton.textContent = translations[activeLang].copyButton;
    }, 1200);
  });

  setLanguage(activeLang);
  startCanvas();
});

function startCanvas() {
  const canvas = document.getElementById("signal-canvas");
  const context = canvas.getContext("2d");
  const points = Array.from({ length: 48 }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.0007,
    vy: (Math.random() - 0.5) * 0.0007
  }));

  function resize() {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.floor(window.innerWidth * ratio);
    canvas.height = Math.floor(window.innerHeight * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function draw() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    context.clearRect(0, 0, width, height);

    points.forEach((point) => {
      point.x += point.vx;
      point.y += point.vy;
      if (point.x < 0 || point.x > 1) point.vx *= -1;
      if (point.y < 0 || point.y > 1) point.vy *= -1;
    });

    for (let i = 0; i < points.length; i += 1) {
      for (let j = i + 1; j < points.length; j += 1) {
        const a = points[i];
        const b = points[j];
        const ax = a.x * width;
        const ay = a.y * height;
        const bx = b.x * width;
        const by = b.y * height;
        const distance = Math.hypot(ax - bx, ay - by);

        if (distance < 150) {
          context.strokeStyle = `rgba(101, 243, 214, ${0.14 * (1 - distance / 150)})`;
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(ax, ay);
          context.lineTo(bx, by);
          context.stroke();
        }
      }
    }

    points.forEach((point) => {
      context.fillStyle = "rgba(76, 194, 255, 0.55)";
      context.beginPath();
      context.arc(point.x * width, point.y * height, 1.8, 0, Math.PI * 2);
      context.fill();
    });

    window.requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  draw();
}
