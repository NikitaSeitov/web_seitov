const site = document.querySelector("#site");
const languageToggle = document.querySelector(".language-toggle");
const portfolioLink = document.querySelector(".nav-portfolio");
const homeLink = document.querySelector(".nav-home");
const homeArt = document.querySelector(".home-art");
const homeHint = document.querySelector(".home-hint");
const homeVideos = [...document.querySelectorAll(".home-video")];
const projectDetail = document.querySelector(".project-detail");
const idleCursorVisual = document.querySelector(".idle-cursor-visual");
const portfolioUrl = "assets/documents/никита_сеитов_портфолио.pdf?v=2";
const loopTransitionLead = 0.4;
const loopFrameDuration = 1 / 60;
let activeHomeVideo = homeVideos[0];
let standbyHomeVideo = homeVideos[1];
let loopCheckVideo = null;
let loopCheckId = 0;
let standbyPrepareId = 0;
let standbyPrepareFrameId = 0;
let standbyReady = false;
let standbyPreparing = false;
let loopHandoffPending = false;
let standbyPrepareTimer = 0;
let lastRandomProject = null;

const copy = {
  ru: {
    projects: "projects",
    portfolio: "cv&portfolio",
    about: "about",
    artist: "никита сеитов",
    statementTitle: "artist statement",
    intro:
      "Никита Сеитов (2004, Москва) — междисциплинарный художник. В своей практике исследует баланс непосредственности и серьезности, а также новые способы взаимодействий «человек — человек».",
    practice:
      "Автор создает интерактивные инсталляции, скульптуру и видеоарт через призму экологической устойчивости.",
    education:
      "Получил профильное образование по направлению «Бизнес-информатика» в Университете МИСИС, где также продолжил обучение на магистерской программе ArtTECH. Работы художника выставлялись на таких площадках, как Галерея Краснохолмская и экоцентр «Сборка». В 2026 году видеоарт «Петля» вошел в шорт-лист конкурса «Миры Тарковского» от РОСИЗО.",
    statementIntro:
      "Я — междисциплинарный художник, исследующий новые формы взаимодействия в условиях неустойчивости современного мира. Работаю с интерактивными инсталляциями, скульптурой и видеоартом.",
    statementBody:
      "Важным аспектом моей практики является экологичный подход к реализации проектов. Материалом для произведений часто становятся фрагменты дорогих моему сердцу воспоминаний: физические объекты и нематериальные образы, сохранившие след в прошлом. Осмысляя символы метамодерна, я стремлюсь создать устойчивые человеческие связи внутри своих работ.",
  },
  en: {
    projects: "projects",
    portfolio: "cv&portfolio",
    about: "about",
    artist: "nikita seitov",
    statementTitle: "artist statement",
    intro:
      "Nikita Seitov (b. 2004, Moscow) is an interdisciplinary artist. His practice explores the balance between spontaneity and seriousness, as well as new ways for people to interact with one another.",
    practice:
      "He creates interactive installations, sculpture, and video art through the lens of environmental sustainability.",
    education:
      "He studied Business Informatics at NUST MISIS and continued his studies in the ArtTECH master's program. His work has been shown at venues including Krasnokholmskaya Gallery and the Sborska eco-center. In 2026, his video work Loop was shortlisted for the Tarkovsky Worlds competition by ROSIZO.",
    statementIntro:
      "I am an interdisciplinary artist exploring new forms of interaction in an unstable contemporary world. I work with interactive installations, sculpture, and video art.",
    statementBody:
      "An important part of my practice is an environmentally conscious approach to making projects. Works often grow from fragments of memories dear to me: physical objects and intangible images that carry traces of the past. Reflecting on the symbols of metamodernism, I aim to create lasting human connections within my work.",
  },
};

const projectDetails = {
  decluttering: {
    title: { ru: "decluttering", en: "decluttering" },
    meta: {
      ru: "2026 · инсталляция, электронные рамки, видеоряд",
      en: "2026 · installation, electronic frames, video",
    },
    paragraphs: {
      ru: [
        "Проект выполнен в соавторстве с сообществом ArtTECH МИСИС и представляет собой функционирующий своп, организованный на базе вещей, найденных при расхламлении общей художественной мастерской.",
        "Работа рассматривает проблему перепотребления, трансформируя отношение людей к материальным ценностям. Расхламление здесь играет роль инструмента деконструкции привычного быта, позволяющего создать принципиально новое качество жизни. Композиция обновленного пространства постепенно складывается в гармоничную картину, где место остается лишь для функциональных предметов или тех вещей, что приносят подлинную радость. Целью было запечатлеть историю этой трансформации. Вещи получают шанс на новую жизнь, позволяя владельцам обрести умиротворение и пространство для новых идей.",
      ],
      en: [
        "Created in collaboration with the ArtTECH MISIS community, this project is a functioning swap organized around objects found while decluttering the shared art studio.",
        "The work considers overconsumption and transforms how people relate to material possessions. Here, decluttering becomes a way to deconstruct everyday life and create a fundamentally different quality of living. The reorganized space gradually forms a harmonious composition, making room only for functional objects and things that bring genuine joy. The project documents this transformation: objects get a new life, while their owners gain calm and room for new ideas.",
      ],
    },
    images: [
      "assets/projects/detail/decluttering-1.jpeg",
      "assets/projects/detail/decluttering-2.jpeg",
    ],
  },
  "paralysis-of-choice": {
    title: { ru: "Паралич выбора", en: "Choice Paralysis" },
    meta: { ru: "2025 · пластик", en: "2025 · plastic" },
    paragraphs: {
      ru: [
        "Паралич выбора — это скульптура, сгенерированная на основании набора данных. В основе работы лежит идея визуализировать состояние ступора и тревоги, которое возникает, когда человеку нужно выбрать между несколькими на первый взгляд идентичными объектами. В таких ситуациях люди часто испытывают иррациональный страх принять неправильное решение.",
        "Форма скульптуры получена путём наложения и деформации нескольких идентичных 3D-моделей шоколадного батончика. Характер искажений определялся данными из собранного датасета примет и суеверий разных культур. Эта связь отражает то, как в момент выбора наше мышление часто обращается к иррациональному — навязчивым мыслям и магическому мышлению, наделяя обычное решение мистическим значением.",
        "Работа выполнена в рамках магистерской программы ArtTECH МИСИС.",
      ],
      en: [
        "Choice Paralysis is a data-generated sculpture. The work visualizes the paralysis and anxiety that arise when a person must choose between several objects that appear identical at first glance. In such situations, people often experience an irrational fear of making the wrong decision.",
        "The sculpture was formed by overlapping and deforming several identical 3D models of a chocolate bar. The distortions were determined by a dataset of omens and superstitions from different cultures. This reflects how, at the moment of choice, thought can turn toward the irrational—obsessive ideas and magical thinking—giving an ordinary decision a mystical meaning.",
        "Created as part of the ArtTECH master's program at MISIS.",
      ],
    },
    youtubeUrl: "https://www.youtube.com/watch?v=nCMhWIccDk0",
    images: ["assets/projects-sculpture-hq.png"],
  },
  loop: {
    title: { ru: "Петля", en: "Loop" },
    meta: { ru: "2025 · видеоряд, проектор", en: "2025 · video, projector" },
    paragraphs: {
      ru: [
        "Видео-арт проект в технике pointcloud, который отражает цикличность и замкнутость жизни в ограниченном пространстве.",
        "Работа выполнена в рамках магистерской программы ArtTECH МИСИС в соавторстве с междисциплинарными художниками Екатериной Мелехиной и Даниилом Яновским.",
      ],
      en: [
        "A point-cloud video artwork reflecting the cyclical and enclosed nature of life in a confined space.",
        "Created as part of the ArtTECH master's program at MISIS in collaboration with interdisciplinary artists Ekaterina Melekhina and Daniil Yanovsky.",
      ],
    },
    youtubeUrl: "https://www.youtube.com/watch?v=V4upIZVRkLM&t=1s",
    images: [
      "assets/projects/detail/loop-1.jpeg",
    ],
    video: "assets/projects/detail/loop-trimmed.mp4?v=1",
  },
  "panc-1": {
    title: { ru: "PANC-1", en: "PANC-1" },
    meta: {
      ru: "2026 · клеточный планшет, ПК, печать, клетки серии PANC-1, индикатор",
      en: "2026 · cell culture plate, PC, print, PANC-1 cells, indicator",
    },
    paragraphs: {
      ru: [
        "PANC-1 — это сапёр из живых клеток рака поджелудочной железы, в котором поле генерируется на основе научных исследований и личных факторов риска игрока.",
        "Работа выполнена в рамках магистерской программы ArtTECH МИСИС в соавторстве с междисциплинарными художниками Екатериной Мелехиной, Верой Ае и Данилом lessthree.",
      ],
      en: [
        "PANC-1 is a Minesweeper game made with living pancreatic cancer cells. Its playing field is generated from scientific research and the player's personal risk factors.",
        "Created as part of the ArtTECH master's program at MISIS in collaboration with interdisciplinary artists Ekaterina Melekhina, Vera Ae, and Danil lessthree.",
      ],
    },
    youtubeUrl: "https://www.youtube.com/watch?v=OH_yNTZgaqY",
    images: ["assets/projects-sealed-object-hq.png"],
  },
  "asmr-kuking": {
    title: { ru: "ASMR KUKING", en: "ASMR KUKING" },
    meta: { ru: "2026 · видеоряд", en: "2026 · video" },
    paragraphs: {
      ru: [
        "Что будет, если робот запишет ASMR?",
        "Цель проекта заключается не в создании привычного ASMR-контента, а в исследовании границы роботизации в чувствительных, тактильных практиках. Проект ставит вопрос: может ли промышленный робот действовать с человеческой «нежностью», и как трансформируется восприятие ASMR, когда его исполнителем становится машина.",
        "Работа выполнена в рамках магистерской программы ArtTECH МИСИС в соавторстве с междисциплинарной художницей Екатериной Мелехиной.",
      ],
      en: [
        "What happens when a robot records ASMR?",
        "Rather than creating familiar ASMR content, the project explores the limits of automation in sensitive, tactile practices. It asks whether an industrial robot can act with human “tenderness,” and how the perception of ASMR changes when a machine performs it.",
        "Created as part of the ArtTECH master's program at MISIS in collaboration with interdisciplinary artist Ekaterina Melekhina.",
      ],
    },
    youtubeUrl: "https://www.youtube.com/watch?v=BU1us5mM78Y",
    video: "assets/projects/detail/asmr-kuking.mp4",
  },
  foole: {
    title: { ru: "foole", en: "foole" },
    meta: {
      ru: "2026 · ПК, шутовской колпак, зеркало, фанера, веб-камера",
      en: "2026 · PC, jester hat, mirror, plywood, webcam",
    },
    paragraphs: {
      ru: [
        "Проект позволяет зрителю невольно вжиться в образ шута — воплощение радости, спонтанности и свободы от социальных условностей. Его главная цель — наслаждаться моментом и превращать скучное или серьезное в фарс.",
        "Архетип Шута так или иначе присутствует в каждом человеке, но в разной степени «громкости», отвечая за внутреннюю жизнестойкость и психологическую гибкость. Глядя в зеркало и самостоятельно надевая шутовской колпак, зритель через эффект неожиданности признаёт своего «внутреннего дурака». Этот акт помогает вернуть искреннюю радость и спонтанность.",
        "Работа выполнена в рамках магистерской программы ArtTECH МИСИС.",
      ],
      en: [
        "The project invites viewers to inhabit the figure of the fool—a symbol of joy, spontaneity, and freedom from social conventions. Its central aim is to enjoy the moment and turn the boring or serious into farce.",
        "The Fool archetype exists in everyone, though with varying degrees of “volume,” supporting inner resilience and psychological flexibility. Looking in a mirror and putting on the jester's hat, viewers recognize their “inner fool” through surprise. This act helps restore genuine joy and spontaneity.",
        "Created as part of the ArtTECH master's program at MISIS.",
      ],
    },
    youtubeUrl: "https://www.youtube.com/watch?v=_i9v5kaAC-M",
    video: "assets/projects/detail/foole.mp4?v=1",
  },
  haunted: {
    title: { ru: "HAUNTED", en: "HAUNTED" },
    meta: {
      ru: "2026 · ткань, фанера, пластик, LED-экран, Arduino Nano",
      en: "2026 · fabric, plywood, plastic, LED screen, Arduino Nano",
    },
    paragraphs: {
      ru: [
        "Прошлое всегда присутствует в настоящем, но не в первоначальной своей форме, а в виде следа. Однако определяет ли воспоминание ценность и целостность объекта?",
        "Проект представляет собой скульптуру — сборный образ предметов быта, образующих единый организм. Каждый объект — вместилище воспоминаний, сосуд, хранящий как память о владельцах, так и о событиях, окружавших их. Вещи, в том числе произведения искусства, неизбежно населены призраками прошлого, причём не только идеальными формами, несовершенным выражением которых они являются, но и насыщены тем, что избежало воплощения.",
        "Работа выполнена в рамках магистерской программы ArtTECH МИСИС.",
      ],
      en: [
        "The past is always present, though not in its original form: it remains as a trace. But does memory determine an object's value and integrity?",
        "The project is a sculpture assembled from domestic objects into a single organism. Each object is a vessel of memories, holding recollections of its owners and the events around them. Things, including works of art, are inevitably inhabited by ghosts of the past—not only by ideal forms of which they are imperfect expressions, but also by what never came to be embodied.",
        "Created as part of the ArtTECH master's program at MISIS.",
      ],
    },
    images: ["assets/projects/detail/haunted-hq.png"],
  },
};

let language = "ru";

function renderProjectDetail(slug) {
  const project = projectDetails[slug];
  const detail = document.querySelector(".project-detail");
  const title = detail.querySelector("[data-detail-title]");
  const meta = detail.querySelector("[data-detail-meta]");
  const description = detail.querySelector("[data-detail-description]");
  const gallery = detail.querySelector("[data-detail-gallery]");

  title.replaceChildren();
  if (project.youtubeUrl) {
    const titleLink = document.createElement("a");
    titleLink.href = project.youtubeUrl;
    titleLink.target = "_blank";
    titleLink.rel = "noopener noreferrer";
    titleLink.textContent = project.title[language];
    titleLink.setAttribute(
      "aria-label",
      language === "ru"
        ? `Смотреть видео «${project.title[language]}» на YouTube`
        : `Watch ${project.title[language]} on YouTube`,
    );
    title.append(titleLink);
  } else {
    title.textContent = project.title[language];
  }
  document.title = `${project.title[language]} — Никита Сеитов`;
  meta.textContent = project.meta[language];
  description.replaceChildren(
    ...project.paragraphs[language].map((text) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      return paragraph;
    }),
  );
  const images = project.images || [];
  const media = [
    ...images.map((src, index) => {
      const image = document.createElement("img");
      image.src = src;
      image.alt = `${project.title[language]} — ${index + 1}`;
      image.loading = index === 0 ? "eager" : "lazy";
      image.decoding = "async";
      return image;
    }),
  ];

  if (project.video) {
    const video = document.createElement("video");
    video.src = project.video;
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.setAttribute("aria-label", project.title[language]);
    if (slug === "foole") {
      video.classList.add("project-detail-video-portrait");
    }
    media.push(video);
  }

  gallery.replaceChildren(...media);
}

function stopLoopCheck() {
  if (!loopCheckVideo || !loopCheckId) {
    return;
  }

  if (loopCheckVideo.cancelVideoFrameCallback) {
    loopCheckVideo.cancelVideoFrameCallback(loopCheckId);
  } else {
    window.cancelAnimationFrame(loopCheckId);
  }
  loopCheckVideo = null;
  loopCheckId = 0;
}

function scheduleLoopCheck() {
  stopLoopCheck();

  if (
    document.hidden ||
    site.dataset.page !== "home" ||
    activeHomeVideo.paused ||
    activeHomeVideo.ended
  ) {
    return;
  }

  const checkLoopBoundary = (_now, metadata) => {
    loopCheckId = 0;
    loopCheckVideo = null;

    if (
      document.hidden ||
      site.dataset.page !== "home" ||
      activeHomeVideo.paused
    ) {
      return;
    }

    const mediaTime = metadata?.mediaTime ?? activeHomeVideo.currentTime;
    const remainingTime = activeHomeVideo.duration - mediaTime;
    if (
      !standbyReady &&
      !standbyPreparing &&
      remainingTime <= loopTransitionLead
    ) {
      prepareStandbyVideo();
    }

    if (standbyReady && remainingTime <= loopFrameDuration * 1.5) {
      switchLoopVideo();
      return;
    }

    if (remainingTime <= 0) {
      loopHandoffPending = true;
      if (standbyReady) {
        switchLoopVideo();
      } else if (!standbyPreparing) {
        prepareStandbyVideo();
      }
      return;
    }

    loopCheckVideo = activeHomeVideo;
    if (activeHomeVideo.requestVideoFrameCallback) {
      loopCheckId = activeHomeVideo.requestVideoFrameCallback(
        checkLoopBoundary,
      );
    } else {
      loopCheckId = window.requestAnimationFrame(checkLoopBoundary);
    }
  };

  loopCheckVideo = activeHomeVideo;
  if (activeHomeVideo.requestVideoFrameCallback) {
    loopCheckId = activeHomeVideo.requestVideoFrameCallback(
      checkLoopBoundary,
    );
  } else {
    loopCheckId = window.requestAnimationFrame(checkLoopBoundary);
  }
}

function prepareStandbyVideo() {
  if (
    standbyReady ||
    standbyPreparing ||
    document.hidden ||
    site.dataset.page !== "home"
  ) {
    return;
  }

  standbyPreparing = true;
  standbyPrepareId += 1;
  const prepareId = standbyPrepareId;

  const markStandbyReady = () => {
    if (prepareId !== standbyPrepareId) {
      return;
    }

    standbyPrepareFrameId = 0;
    standbyHomeVideo.pause();
    standbyPreparing = false;
    standbyReady = true;

    if (loopHandoffPending || activeHomeVideo.ended) {
      switchLoopVideo();
    }
  };

  if (standbyHomeVideo.requestVideoFrameCallback) {
    standbyPrepareFrameId = standbyHomeVideo.requestVideoFrameCallback(
      markStandbyReady,
    );
  }

  standbyHomeVideo.currentTime = 0;
  standbyHomeVideo.play().then(
    () => {
      if (
        prepareId !== standbyPrepareId ||
        standbyHomeVideo.requestVideoFrameCallback
      ) {
        return;
      }
      standbyPrepareFrameId = window.requestAnimationFrame(
        markStandbyReady,
      );
    },
    (error) => {
      if (prepareId !== standbyPrepareId || standbyReady) {
        return;
      }
      if (standbyPrepareFrameId) {
        if (standbyHomeVideo.cancelVideoFrameCallback) {
          standbyHomeVideo.cancelVideoFrameCallback(standbyPrepareFrameId);
        } else {
          window.cancelAnimationFrame(standbyPrepareFrameId);
        }
      }
      standbyPrepareFrameId = 0;
      standbyPreparing = false;
      console.error("Unable to prepare the next portfolio video frame.", error);
    },
  );
}

function switchLoopVideo() {
  if (
    !standbyReady ||
    document.hidden ||
    site.dataset.page !== "home"
  ) {
    loopHandoffPending = true;
    return;
  }

  stopLoopCheck();
  const outgoingVideo = activeHomeVideo;
  const incomingVideo = standbyHomeVideo;
  const playback = incomingVideo.play();
  outgoingVideo.classList.remove("is-active");
  incomingVideo.classList.add("is-active");
  activeHomeVideo = incomingVideo;
  standbyHomeVideo = outgoingVideo;
  standbyReady = false;
  standbyPreparing = false;
  loopHandoffPending = false;
  standbyHomeVideo.currentTime = 0;
  window.clearTimeout(standbyPrepareTimer);
  standbyPrepareTimer = window.setTimeout(() => {
    standbyPrepareTimer = 0;
    prepareStandbyVideo();
  }, 250);

  playback.then(
    scheduleLoopCheck,
    (error) => {
      if (
        error.name !== "AbortError" ||
        (!document.hidden && site.dataset.page === "home")
      ) {
        console.error("Unable to continue the portfolio video.", error);
        if (!document.hidden && site.dataset.page === "home") {
          activeHomeVideo.loop = true;
        }
      }
    },
  );
}

function handleActiveVideoEnded() {
  loopHandoffPending = true;
  if (standbyReady) {
    switchLoopVideo();
  } else {
    prepareStandbyVideo();
  }
}

function setVideoPlayback(shouldPlay) {
  if (!shouldPlay) {
    stopLoopCheck();
    window.clearTimeout(standbyPrepareTimer);
    standbyPrepareTimer = 0;
    if (standbyPreparing) {
      standbyPrepareId += 1;
      if (standbyPrepareFrameId) {
        if (standbyHomeVideo.cancelVideoFrameCallback) {
          standbyHomeVideo.cancelVideoFrameCallback(
            standbyPrepareFrameId,
          );
        } else {
          window.cancelAnimationFrame(standbyPrepareFrameId);
        }
      }
      standbyHomeVideo.pause();
      standbyPreparing = false;
      standbyPrepareFrameId = 0;
    }
    homeVideos.forEach((video) => video.pause());
    return;
  }

  if (activeHomeVideo.ended) {
    loopHandoffPending = true;
    if (standbyReady) {
      switchLoopVideo();
      return;
    }
    prepareStandbyVideo();
    return;
  }

  if (
    activeHomeVideo.duration - activeHomeVideo.currentTime <=
      loopTransitionLead &&
    !standbyReady &&
    !standbyPreparing
  ) {
    prepareStandbyVideo();
  }
  activeHomeVideo.play().then(
    scheduleLoopCheck,
    (error) => {
      if (
        error.name !== "AbortError" ||
        (!document.hidden && site.dataset.page === "home")
      ) {
        console.error("Unable to play the portfolio video.", error);
      }
    },
  );
}

function renderPage() {
  const page = window.location.hash.slice(1);
  const projectSlug = new URLSearchParams(window.location.search).get("project");
  const isProjectDetail =
    (page === "project" || !page) && projectSlug in projectDetails;
  const activePage = isProjectDetail
    ? "project-detail"
    : ["about", "projects"].includes(page)
      ? page
      : "home";
  document
    .querySelectorAll(".project-detail-gallery video")
    .forEach((video) => video.pause());
  site.dataset.page = activePage;
  setVideoPlayback(activePage === "home");
  if (activePage === "project-detail") {
    renderProjectDetail(projectSlug);
  } else {
    document.title = "Никита Сеитов — художник";
  }
  updateLanguageToggleVisibility();

  const navigationPage =
    activePage === "project-detail" ? "projects" : activePage;
  document.querySelectorAll(".navigation a").forEach((link) => {
    if (
      link.hash === `#${navigationPage}` ||
      (navigationPage === "home" && link.classList.contains("nav-home"))
    ) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function updateLanguageToggleVisibility() {
  const isMobile = window.matchMedia("(max-width: 700px)").matches;
  const buttonRect = languageToggle.getBoundingClientRect();
  const content = site.querySelectorAll(
    ".home-art, .portrait, .about-copy p, .project-grid img, .project-detail-meta, " +
      ".project-detail-copy h1, .project-detail-description p, " +
      ".project-detail-gallery img, .project-detail-gallery video",
  );
  const overlapsContent = [...content].some((element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.width > 0 &&
      rect.height > 0 &&
      rect.left < buttonRect.right &&
      rect.right > buttonRect.left &&
      rect.top < buttonRect.bottom &&
      rect.bottom > buttonRect.top
    );
  });
  let shouldHide = overlapsContent;

  if (isMobile && site.dataset.page !== "home") {
    const canScroll =
      document.documentElement.scrollHeight > window.innerHeight + 1;
    shouldHide ||= !canScroll || window.scrollY <= 0;
  }

  languageToggle.classList.toggle("is-hidden", shouldHide);
}

function scrollProjectFromNavigation(event) {
  if (
    window.matchMedia("(max-width: 700px)").matches ||
    site.dataset.page !== "project-detail" ||
    projectDetail.contains(event.target) ||
    projectDetail.scrollHeight <= projectDetail.clientHeight + 1
  ) {
    return;
  }

  event.preventDefault();
  projectDetail.scrollTop += event.deltaY;
}

function renderLanguage() {
  document.documentElement.lang = language;
  homeHint.textContent =
    language === "en" ? "random project" : "рандом проект";
  document.querySelectorAll("[data-copy]").forEach((element) => {
    element.textContent = copy[language][element.dataset.copy];
  });
  languageToggle.setAttribute("aria-pressed", String(language === "en"));
  if (site.dataset.page === "project-detail") {
    renderProjectDetail(
      new URLSearchParams(window.location.search).get("project"),
    );
  }
  updateLanguageToggleVisibility();
}

window.addEventListener("hashchange", renderPage);
window.addEventListener("popstate", renderPage);
window.addEventListener("resize", updateLanguageToggleVisibility);
window.addEventListener("scroll", updateLanguageToggleVisibility);
document.addEventListener("scroll", updateLanguageToggleVisibility, {
  capture: true,
  passive: true,
});
site.addEventListener("scroll", updateLanguageToggleVisibility);
projectDetail.addEventListener("scroll", updateLanguageToggleVisibility);
site.addEventListener("wheel", scrollProjectFromNavigation, {
  passive: false,
});
homeArt.addEventListener("click", (event) => {
  if (site.dataset.page !== "home") {
    return;
  }

  event.preventDefault();
  const projectSlugs = Object.keys(projectDetails);
  const previousSlug =
    new URLSearchParams(window.location.search).get("project") ||
    lastRandomProject;
  const availableSlugs = projectSlugs.filter(
    (slug) => slug !== previousSlug,
  );
  const randomIndex = Math.floor(Math.random() * availableSlugs.length);
  const randomSlug = availableSlugs[randomIndex];
  lastRandomProject = randomSlug;
  const projectUrl = new URL(window.location.href);
  projectUrl.search = "";
  projectUrl.searchParams.set("project", randomSlug);
  projectUrl.hash = "project";
  window.history.pushState(null, "", projectUrl.href);
  renderPage();
});
homeArt.addEventListener("pointerenter", (event) => {
  if (
    event.pointerType === "mouse" &&
    site.dataset.page === "home"
  ) {
    homeHint.classList.add("is-visible");
  }
});
homeArt.addEventListener("pointermove", (event) => {
  if (!homeHint.classList.contains("is-visible")) {
    return;
  }

  const left = Math.min(event.clientX + 12, window.innerWidth - 120);
  const top = Math.min(event.clientY + 14, window.innerHeight - 36);
  homeHint.style.left = `${left}px`;
  homeHint.style.top = `${top}px`;
});
homeArt.addEventListener("pointerleave", () => {
  homeHint.classList.remove("is-visible");
});
homeLink.addEventListener("click", (event) => {
  if (site.dataset.page !== "home") {
    return;
  }
  event.preventDefault();
  const homeUrl = new URL(window.location.href);
  homeUrl.search = "";
  homeUrl.hash = "home";
  window.history.pushState(null, "", homeUrl.href);
  renderPage();
});
homeVideos[0].classList.add("is-active");
homeVideos.forEach((video) => {
  video.addEventListener("ended", () => {
    if (video === activeHomeVideo) {
      handleActiveVideoEnded();
    }
  });
});
portfolioLink.addEventListener("click", () => {
  window.open(new URL(portfolioUrl, document.baseURI).href, "_blank", "noopener");
});
document.addEventListener("visibilitychange", () => {
  setVideoPlayback(site.dataset.page === "home" && !document.hidden);
});
languageToggle.addEventListener("click", () => {
  language = language === "ru" ? "en" : "ru";
  renderLanguage();
});

const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const handCursorTarget =
  "a, button, input, select, textarea, summary, [role='button'], video[controls]";
let idleCursorTimeout = 0;
let idleCursorGrowthInterval = 0;
let idleCursorSize = 32;
let idlePointerX = 0;
let idlePointerY = 0;
let idleCursorHotspotX = 0;
let idleCursorHotspotY = 0;
let idleCursorIsHand = false;
let hasIdlePointerPosition = false;

function updateIdleCursorVisual() {
  idleCursorVisual.width = idleCursorSize;
  idleCursorVisual.height = idleCursorSize;
  idleCursorVisual.style.width = `${idleCursorSize}px`;
  idleCursorVisual.style.height = `${idleCursorSize}px`;
  idleCursorVisual.style.left =
    `${idlePointerX - (idleCursorHotspotX / 32) * idleCursorSize}px`;
  idleCursorVisual.style.top =
    `${idlePointerY - (idleCursorHotspotY / 32) * idleCursorSize}px`;
}

function resetIdleCursor() {
  window.clearTimeout(idleCursorTimeout);
  window.clearInterval(idleCursorGrowthInterval);
  idleCursorTimeout = 0;
  idleCursorGrowthInterval = 0;
  idleCursorSize = 32;
  idleCursorVisual.hidden = true;
  document.documentElement.classList.remove("idle-cursor-active");
}

function startIdleCursorGrowth() {
  if (!finePointer.matches || document.hidden) {
    return;
  }

  const cursorPath = idleCursorIsHand
    ? "assets/cursor-hand-idle.png?v=7"
    : "assets/cursor-arrow-idle.png?v=7";
  idleCursorVisual.src = cursorPath;
  idleCursorVisual.hidden = false;
  document.documentElement.classList.add("idle-cursor-active");
  updateIdleCursorVisual();

  idleCursorGrowthInterval = window.setInterval(() => {
    const maxSize = Math.max(window.innerWidth, window.innerHeight) * 1.5;
    idleCursorSize = Math.min(maxSize, idleCursorSize * 1.12);
    updateIdleCursorVisual();
    if (idleCursorSize >= maxSize) {
      window.clearInterval(idleCursorGrowthInterval);
      idleCursorGrowthInterval = 0;
    }
  }, 1000);
}

function scheduleIdleCursor() {
  window.clearTimeout(idleCursorTimeout);
  if (finePointer.matches && !document.hidden) {
    idleCursorTimeout = window.setTimeout(startIdleCursorGrowth, 60000);
  }
}

document.addEventListener(
  "pointermove",
  (event) => {
    if (!finePointer.matches) {
      return;
    }

    resetIdleCursor();
    idlePointerX = event.clientX;
    idlePointerY = event.clientY;
    hasIdlePointerPosition = true;
    const target =
      event.target instanceof Element ? event.target : event.target.parentElement;
    idleCursorIsHand = Boolean(target?.closest(handCursorTarget));
    idleCursorVisual.src = idleCursorIsHand
      ? "assets/cursor-hand-idle.png?v=7"
      : "assets/cursor-arrow-idle.png?v=7";
    idleCursorHotspotX = idleCursorIsHand ? 6.25 : 0;
    idleCursorHotspotY = 0;
    scheduleIdleCursor();
  },
  { passive: true },
);

document.addEventListener("visibilitychange", () => {
  resetIdleCursor();
  if (hasIdlePointerPosition && !document.hidden) {
    scheduleIdleCursor();
  }
});

renderPage();
renderLanguage();
