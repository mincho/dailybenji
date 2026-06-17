// Home hero email carousel
(function () {
    const carousel = document.querySelector(".email-carousel");
    if (!carousel) return;

    const track = carousel.querySelector(".carousel-track");
    const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
    const dots = Array.from(carousel.querySelectorAll(".carousel-dot"));
    const caption = carousel.querySelector(".carousel-caption");
    const prev = carousel.querySelector(".carousel-arrow.prev");
    const next = carousel.querySelector(".carousel-arrow.next");
    const captions = [
        "Your morning summary",
        "Mondays · spending by category",
        "Wednesdays · worth noticing",
        "Thursdays · discretionary spending",
        "Sundays · your weekly review",
    ];

    // Flip data-autoplay="true" on the .email-carousel to auto-advance.
    const autoplay = carousel.dataset.autoplay === "true";
    const interval = 6000;
    let i = 0;
    let timer = null;

    function go(n) {
        i = (n + slides.length) % slides.length;
        slides.forEach((s, k) => s.classList.toggle("is-active", k === i));
        dots.forEach((d, k) => d.classList.toggle("is-active", k === i));
        if (caption) caption.textContent = captions[i] || "";
    }

    function start() {
        if (!autoplay) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;
        timer = setInterval(() => go(i + 1), interval);
    }
    function restart() {
        if (timer) {
            clearInterval(timer);
            start();
        }
    }

    next.addEventListener("click", () => {
        go(i + 1);
        restart();
    });
    prev.addEventListener("click", () => {
        go(i - 1);
        restart();
    });
    dots.forEach((d, k) =>
        d.addEventListener("click", () => {
            go(k);
            restart();
        }),
    );

    carousel.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
            go(i + 1);
            restart();
        }
        if (e.key === "ArrowLeft") {
            go(i - 1);
            restart();
        }
    });

    // Touch swipe
    let startX = null;
    carousel.addEventListener(
        "touchstart",
        (e) => {
            startX = e.touches[0].clientX;
        },
        { passive: true },
    );
    carousel.addEventListener("touchend", (e) => {
        if (startX === null) return;
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 40) {
            go(dx < 0 ? i + 1 : i - 1);
            restart();
        }
        startX = null;
    });

    carousel.addEventListener("mouseenter", () => {
        if (timer) clearInterval(timer);
    });
    carousel.addEventListener("mouseleave", start);

    go(0);
    start();
})();
