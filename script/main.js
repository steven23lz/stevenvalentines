const buildCharacterSpans = (element) => {
  if (!element) return;
  element.innerHTML = `<span>${element.textContent
    .split("")
    .join("</span><span>")}</span>`;
};

const animationTimeline = () => {
  buildCharacterSpans(document.querySelector(".hbd-chatbox"));
  buildCharacterSpans(document.querySelector(".wish-hbd"));

  const tl = new TimelineMax();

  // Show container
  tl.to(".container", 0.1, { visibility: "visible" });

  // Greeting Section
  tl.from(".greeting-section", 0.8, { opacity: 0, y: 30 })
    .staggerFrom(".hearts-decoration", 0.6, { opacity: 0, scale: 0 }, 0.3, "-=0.5")
    .from(".main-title", 0.8, { opacity: 0, y: 20, scale: 0.9 }, "-=0.3")
    .from(".subtitle", 0.6, { opacity: 0, y: 15 }, "-=0.3")
    .to(".greeting-section", 0.8, { opacity: 0 }, "+=3");

  // Question Section
  tl.from(".question-section", 0.8, { opacity: 0, y: 30 })
    .from(".section-icon", 0.6, { opacity: 0, scale: 0, rotation: 90 }, "-=0.5")
    .from(".question-text", 0.6, { opacity: 0, x: -30 }, "-=0.2")
    .to(".question-section", 0.8, { opacity: 0 }, "+=2.5");

  // Chat Section
  tl.from(".chat-section", 0.8, { opacity: 0, scale: 0.95 })
    .from(".chat-bubble", 0.8, { opacity: 0, y: 30, rotation: -5 }, "-=0.5")
    .staggerTo(".hbd-chatbox span", 0.4, { visibility: "visible", opacity: 1 }, 0.05, "-=0.3")
    .from(".chat-send", 0.4, { scale: 0, opacity: 0 }, "-=0.2")
    .to(".chat-section", 0.8, { opacity: 0 }, "+=2");

  // Feelings Section - ALL MESSAGES STAY VISIBLE
  tl.from(".feelings-section", 0.8, { opacity: 0, y: 30 });

  tl.from(".feeling-message", 0.6, { opacity: 0, x: -50, rotationY: 20 }, 0.3)
    .to(".feeling-message:nth-child(1)", 0.5, { opacity: 1, x: 0 }, "+=0.8")
    .to(".feeling-message:nth-child(2)", 0.5, { opacity: 1, x: 0 }, "-=0.3")
    .to(".feeling-message:nth-child(3)", 0.5, { opacity: 1, x: 0 }, "-=0.3")
    .to(".feeling-message:nth-child(4)", 0.5, { opacity: 1, x: 0 }, "-=0.3")
    .to(".feeling-message:nth-child(5)", 0.5, { opacity: 1, x: 0, scale: 1.05 }, "-=0.3")
    .staggerTo(".idea-6 span", 0.5, { scale: 1, opacity: 1 }, 0.1, "-=0.3");

  // Balloons Animation
  tl.staggerFromTo(
    ".balloon-item",
    2.5,
    { opacity: 0.9, y: 1400 },
    { opacity: 1, y: -1000 },
    0.15,
    "-=1.5"
  );

  // Picture section appears
  tl.from(
    ".media-section",
    0.8,
    { opacity: 0, y: 40, scale: 0.95 },
    "-=1"
  );

  tl.from(".image-frame", 0.6, { opacity: 0, scale: 0.8, rotation: -10 }, "-=0.5")
    .from(".girl-dp", 0.5, { scale: 1.5, opacity: 0 }, "-=0.3");

  // Audio plays
  tl.call(() => {
    const audio = document.getElementById("audio");
    const playBtn = document.querySelector(".play-btn");
    if (audio && playBtn) {
      audio.muted = false;
      audio.play().catch(() => { });
      playBtn.textContent = "⏸";
      playBtn.classList.add("playing");
    }
  });

  // Spotify player reveals
  tl.from(".spotify-player", 0.7, { opacity: 0, y: 30, scale: 0.95 }, "-=0.5");

  // Wish section
  tl.from(".wish-section", 0.6, { opacity: 0, y: 20 }, "-=0.2")
    .staggerTo(".wish-hbd span", 0.4, { opacity: 1, y: 0 }, 0.08)
    .from("#wishText", 0.5, { opacity: 0, y: 10 }, "-=0.2");

  // Confetti burst
  tl.staggerTo(
    ".confetti-shape",
    1.5,
    {
      visibility: "visible",
      opacity: 0,
      scale: 80,
      repeat: 2,
      repeatDelay: 1,
    },
    0.15,
    "+=0.5"
  );

  // Auto-scroll to player
  tl.call(() => {
    const playerSection = document.querySelector('.media-section');
    if (playerSection) {
      setTimeout(() => {
        playerSection.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 300);
    }
  });

  // Final section
  tl.from(".final-section", 0.8, { opacity: 0, y: 40 }, "+=0.5")
    .from(".final-decoration", 0.6, { opacity: 0, scale: 0 }, "-=0.5")
    .from(".final-message", 0.6, { opacity: 0, y: 20 }, "-=0.2")
    .from(".replay-button", 0.6, { opacity: 0, y: 20, scale: 0.9 }, "-=0.2")
    .from(".last-smile", 0.5, { opacity: 0, rotation: -90 }, "-=0.1");

  // Replay functionality
  const replayBtn = document.getElementById("replay");
  if (replayBtn) {
    replayBtn.addEventListener("click", () => {
      tl.restart();
    });
  }
};

const applyCustomization = (customData) => {
  Object.entries(customData).forEach(([key, value]) => {
    if (value === "") return;

    const element = document.getElementById(key);
    if (!element) return;

    if (key === "imagePath") {
      element.setAttribute("src", value);
      return;
    }

    element.textContent = value;
  });
};

const fetchData = async () => {
  try {
    const response = await fetch("customize.json");

    if (!response.ok) {
      throw new Error(`Unable to load customize.json (${response.status})`);
    }

    const data = await response.json();
    applyCustomization(data);
  } catch (error) {
    console.error(error);
  }
};

const initializePage = async () => {
  await fetchData();
  animationTimeline();
  initializeAudioPlayer();
};

const initializeAudioPlayer = () => {
  const audio = document.getElementById("audio");
  const playBtn = document.querySelector(".play-btn");
  const progressSlider = document.querySelector(".progress-slider");
  const progressBar = document.querySelector(".progress-bar");
  const currentTimeDisplay = document.querySelector(".current-time");
  const durationTimeDisplay = document.querySelector(".duration-time");

  if (!audio || !playBtn) return;

  // Format time for display
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Play/Pause button
  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.muted = false;
      audio.play().catch(() => { });
      playBtn.textContent = "⏸";
      playBtn.classList.add("playing");
    } else {
      audio.pause();
      playBtn.textContent = "▶";
      playBtn.classList.remove("playing");
    }
  });

  // Update progress bar
  audio.addEventListener("timeupdate", () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = percent + "%";
    progressSlider.value = percent;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
  });

  // Set duration when metadata loads
  audio.addEventListener("loadedmetadata", () => {
    durationTimeDisplay.textContent = formatTime(audio.duration);
  });

  // Seek on slider change
  progressSlider.addEventListener("input", (e) => {
    const percent = e.target.value;
    audio.currentTime = (percent / 100) * audio.duration;
  });

  // Previous button (rewind)
  const previousBtn = document.querySelector(".previous-btn");
  if (previousBtn) {
    previousBtn.addEventListener("click", () => {
      audio.currentTime = 0;
    });
  }

  // Next button (skip to end)
  const nextBtn = document.querySelector(".next-btn");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      audio.currentTime = audio.duration;
    });
  }

  // Volume button
  const volumeBtn = document.querySelector(".volume-btn");
  if (volumeBtn) {
    volumeBtn.addEventListener("click", () => {
      if (audio.muted) {
        audio.muted = false;
        volumeBtn.textContent = "🔊";
      } else {
        audio.muted = true;
        volumeBtn.textContent = "🔇";
      }
    });
  }
};

initializePage();
