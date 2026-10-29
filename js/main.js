const initHeroSwiper = () => {
  const hero = document.querySelector(".hero-swiper");

  if (!hero || typeof Swiper === "undefined") return;

  new Swiper(hero, {
    loop: true,
    speed: 800,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: "#hero .swiper-pagination",
      clickable: true,
      bulletElement: "button",
    },
    a11y: {
      enabled: true,
    },
  });
};

const initSectionReveal = () => {
  const sections = document.querySelectorAll("section, .main .con");

  if (!sections.length) return;

  if (
    typeof IntersectionObserver === "undefined" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    sections.forEach((section) => section.classList.add("active"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px",
    },
  );

  sections.forEach((section) => {
    section.classList.add("reveal-section");
    observer.observe(section);
  });
};

const initHeroControl = () => {
  const control = document.querySelector("#hero .control");
  const hero = document.querySelector(".hero-swiper");

  if (!control || !hero) return;

  control.addEventListener("click", () => {
    const swiper = hero.swiper;
    const isPaused = control.classList.toggle("is-paused");

    if (swiper) {
      if (isPaused) {
        swiper.autoplay.stop();
      } else {
        swiper.autoplay.start();
      }
    }

    control.setAttribute(
      "aria-label",
      isPaused ? "슬라이드 재생" : "슬라이드 일시정지",
    );
  });
};

const duplicateCards = (list, cardSelector, copies = 2) => {
  const originalCards = [...list.querySelectorAll(`:scope > ${cardSelector}`)];

  for (let set = 0; set < copies; set += 1) {
    originalCards.forEach((card) => {
      list.appendChild(card.cloneNode(true));
    });
  }

  return originalCards.length;
};

const initPromotionSlider = () => {
  const slider = document.querySelector(".promotion-swiper");
  const list = slider?.querySelector(".promotion-list");

  if (!slider || !list || typeof Swiper === "undefined") return;

  list.querySelectorAll(".legacy-card").forEach((card) => card.remove());

  const cardCount = duplicateCards(list, ".promotion-card");

  new Swiper(slider, {
    loop: true,
    loopedSlides: cardCount,
    loopAdditionalSlides: cardCount,
    loopPreventsSliding: false,
    speed: 600,
    slidesPerView: "auto",
    spaceBetween: 20,
    navigation: {
      prevEl: ".con1 .slide-button.prev",
      nextEl: ".con1 .slide-button.next",
    },
    breakpoints: {
      768: {
        slidesPerView: "auto",
        spaceBetween: 40,
      },
    },
    a11y: {
      enabled: true,
    },
  });
};

const initPromotionHeartButtons = () => {
  const slider = document.querySelector(".promotion-swiper");
  const heartButtonSelector = ".card-actions button:nth-child(2)";

  if (!slider) return;

  slider.querySelectorAll(heartButtonSelector).forEach((button) => {
    const defaultIcon = button.querySelector("img");

    if (defaultIcon) {
      defaultIcon.classList.add("heart-icon-default");

      const activeIcon = defaultIcon.cloneNode(true);

      activeIcon.src = "images/icon-bookmark-active.svg";
      activeIcon.classList.replace("heart-icon-default", "heart-icon-active");
      activeIcon.setAttribute("aria-hidden", "true");
      button.appendChild(activeIcon);
    }

    button.setAttribute("aria-pressed", "false");
  });

  slider.addEventListener("click", (event) => {
    const button = event.target.closest(heartButtonSelector);

    if (!button || !slider.contains(button)) return;

    const isLiked = button.classList.toggle("is-liked");

    button.setAttribute("aria-pressed", String(isLiked));
    button.setAttribute("aria-label", isLiked ? "저장 취소하기" : "저장하기");
  });
};

const initLiveSlider = () => {
  const slider = document.querySelector(".live-swiper");
  const list = slider?.querySelector(".live-now__list");

  if (!slider || !list || typeof Swiper === "undefined") return;

  list.querySelectorAll(".legacy-live-card").forEach((card) => card.remove());

  const cardCount = duplicateCards(list, ".live-card");

  new Swiper(slider, {
    loop: true,
    loopedSlides: cardCount,
    loopAdditionalSlides: cardCount,
    loopPreventsSliding: false,
    speed: 600,
    slidesPerView: "auto",
    slidesPerGroup: 1,
    spaceBetween: 23,
    navigation: {
      prevEl: ".con2 .live-slide.prev",
      nextEl: ".con2 .live-slide.next",
    },
    a11y: {
      enabled: true,
    },
  });
};

const initLiveCountdown = () => {
  const countdown = document.querySelector(".con2 .live-heading strong");

  if (!countdown) return;

  const timeParts = countdown.textContent
    .split(":")
    .map((part) => Number.parseInt(part.trim(), 10));

  if (timeParts.length !== 3 || timeParts.some(Number.isNaN)) return;

  let remainingSeconds = timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];

  const renderCountdown = () => {
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;

    countdown.textContent = [hours, minutes, seconds]
      .map((value) => String(value).padStart(2, "0"))
      .join(" : ");
  };

  renderCountdown();

  const timer = window.setInterval(() => {
    remainingSeconds = Math.max(remainingSeconds - 1, 0);
    renderCountdown();

    if (remainingSeconds === 0) {
      window.clearInterval(timer);
    }
  }, 1000);
};

const rankingProducts = [
  [
    "퓨어코튼 온도조절 고밀도 60수 싱글 차렵이불",
    "포근한 침실을 위한 선택",
    "38%",
    "79,900원",
  ],
  [
    "WOW 아이보리 다용도 파스타볼4P세트",
    "식탁 위 작은 행복",
    "30%",
    "12,530원",
  ],
  [
    "코데트 좌식형 전신거울화장대 콘센트형",
    "감각적인 공간의 완성",
    "22%",
    "139,000원",
  ],
  [
    "[키즈] ON 안전한 스텐304 3칸나눔 2P세트",
    "아이들의 즐거운 식사시간",
    "20%",
    "14,300원",
  ],
  [
    "WOW 클라우디 잘마르는 세면타월 4P 140g",
    "일상에 더하는 부드러움",
    "30%",
    "11,130원",
  ],
  ["마이 포레스트 트리 150cm", "설레는 크리스마스 준비", "39%", "59,900원"],
  ["[라피니라] 리본 테리 거실화 블루", "발끝까지 포근하게", "20%", "12,900원"],
  ["[린넨] 뚱냥이 토프 매트 35x50", "주방에 더하는 귀여움", "30%", "9,030원"],
  [
    "내맘대로 꽂아쓰는 다용도 모듈선반 3단 아이보리",
    "깔끔한 수납의 시작",
    "20%",
    "25,900원",
  ],
  [
    "인테리어 투명 트롤리 4단 바스켓2P 세트",
    "작은 공간도 알차게",
    "10%",
    "39,900원",
  ],
  [
    "모노 오브제 무드등 필터식 가습기1.2L 라임그린",
    "은은하게 밝히는 공간",
    "39%",
    "39,900원",
  ],
  [
    "ON 펫본 방수가 되는 이동형 아웃도어 소파",
    "반려동물의 포근한 쉼터",
    "50%",
    "24,900원",
  ],
  [
    "ON 피그먼트 베개커버 (4 colors 2 sizes)",
    "매일 밤 포근한 잠자리",
    "55%",
    "6,700원",
  ],
  ["ON 카페 멜라민 쟁반 3P세트", "식탁 위 산뜻한 컬러", "44%", "7,100원"],
  [
    "메리리본 리본도자기스템 유리 고블렛 395ml",
    "특별한 순간의 테이블",
    "5%",
    "12,900원",
  ],
  [
    "문에 안 걸리는 욕실화 2P SET 270mm",
    "욕실에 더하는 편안함",
    "30%",
    "7,630원",
  ],
];

const createRankingCard = (product, index) => {
  const [name, description, discount, price] = product;
  const rank = String(index + 1).padStart(2, "0");

  return `
        <li class="ranking-card">
            <a href="#">
                <img class="ranking-image" src="images/rank-${rank}.png" alt="${name}" />
                <div class="ranking-info">
                    <strong class="rank">${rank}</strong>
                    <h3>${name}</h3>
                    <img class="divider" src="images/ranking-divider.svg" alt="" />
                    <p class="product-name">${description}</p>
                    <p class="price"><em>${discount}</em>${price}</p>
                    <p class="ranking-stats">
                        <span><img src="images/icon-play-ranking.svg" alt="재생" />10만</span>
                        <span><img src="images/icon-heart-ranking.svg" alt="좋아요" />5.2만</span>
                    </p>
                </div>
            </a>
        </li>`;
};

const createRankingGroup = (products, offset) => `
    <div class="swiper-slide ranking-group">
        <ul class="ranking-list">
            ${products.map((product, index) => createRankingCard(product, offset + index)).join("")}
        </ul>
    </div>`;

const initRankingSlider = () => {
  const slider = document.querySelector(".ranking-swiper");
  const wrapper = slider?.querySelector(".ranking-wrapper");

  if (!slider || !wrapper || typeof Swiper === "undefined") return;

  wrapper.innerHTML = [
    createRankingGroup(rankingProducts.slice(0, 8), 0),
    createRankingGroup(rankingProducts.slice(8, 16), 8),
  ].join("");

  new Swiper(slider, {
    loop: true,
    speed: 600,
    slidesPerView: 1,
    slidesPerGroup: 1,
    navigation: {
      prevEl: ".con3 .ranking-slide.prev",
      nextEl: ".con3 .ranking-slide.next",
    },
    a11y: {
      enabled: true,
    },
  });
};

const initTopButton = () => {
  const topButton = document.querySelector("#footer .top-button");
  const hero = document.querySelector("#hero");
  const footer = document.querySelector("#footer");

  if (!topButton || !hero || !footer) return;

  let isTicking = false;

  const updateTopButton = () => {
    const heroRect = hero.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();
    const isHeroVisible =
      heroRect.top < window.innerHeight && heroRect.bottom > 0;
    const isFooterVisible =
      footerRect.top < window.innerHeight && footerRect.bottom > 0;

    topButton.classList.toggle("is-hidden", isHeroVisible);
    topButton.classList.toggle("is-footer", !isHeroVisible && isFooterVisible);
    isTicking = false;
  };

  const requestTopButtonUpdate = () => {
    if (isTicking) return;

    isTicking = true;
    window.requestAnimationFrame(updateTopButton);
  };

  topButton.addEventListener("click", (event) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("scroll", requestTopButtonUpdate, { passive: true });
  window.addEventListener("resize", requestTopButtonUpdate);
  updateTopButton();
};

(() => {
  initSectionReveal();
  initHeroSwiper();
  initHeroControl();
  initPromotionSlider();
  initPromotionHeartButtons();
  initLiveSlider();
  initLiveCountdown();
  initRankingSlider();
  initTopButton();
})();
