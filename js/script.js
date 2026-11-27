document.addEventListener("DOMContentLoaded", function () {
    const revealItems = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealItems.forEach((item) => observer.observe(item));

    if (
        window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        let pointerX = 0;
        let pointerY = 0;
        let spotlightX = 0;
        let spotlightY = 0;
        let spotlightSize = 320;
        let velocityX = 0;
        let velocityY = 0;
        let animationFrame = null;
        let hasPosition = false;

        const animateSpotlight = () => {
            velocityX = (velocityX + (pointerX - spotlightX) * 0.2) * 0.68;
            velocityY = (velocityY + (pointerY - spotlightY) * 0.2) * 0.68;
            spotlightX += velocityX;
            spotlightY += velocityY;

            document.documentElement.style.setProperty("--cursor-x", `${spotlightX}px`);
            document.documentElement.style.setProperty("--cursor-y", `${spotlightY}px`);
            const speed = Math.min(Math.sqrt(velocityX * velocityX + velocityY * velocityY), 24);
            const targetSize = 320 + speed * 2.25;
            spotlightSize += (targetSize - spotlightSize) * 0.18;
            document.documentElement.style.setProperty("--spotlight-size", `${spotlightSize}px`);

            if (
                Math.abs(pointerX - spotlightX) > 0.2 ||
                Math.abs(pointerY - spotlightY) > 0.2 ||
                Math.abs(velocityX) > 0.1 ||
                Math.abs(velocityY) > 0.1
            ) {
                animationFrame = window.requestAnimationFrame(animateSpotlight);
                return;
            }

            spotlightX = pointerX;
            spotlightY = pointerY;
            velocityX = 0;
            velocityY = 0;
            spotlightSize = 320;
            animationFrame = null;
            document.documentElement.style.setProperty("--cursor-x", `${spotlightX}px`);
            document.documentElement.style.setProperty("--cursor-y", `${spotlightY}px`);
            document.documentElement.style.setProperty("--spotlight-size", `${spotlightSize}px`);
        };

        window.addEventListener(
            "pointermove",
            (event) => {
                pointerX = event.clientX;
                pointerY = event.clientY;
                document.body.classList.add("cursor-spotlight-active");

                if (!hasPosition) {
                    spotlightX = pointerX;
                    spotlightY = pointerY;
                    hasPosition = true;
                }

                if (animationFrame === null) {
                    animationFrame = window.requestAnimationFrame(animateSpotlight);
                }
            },
            { passive: true }
        );

        window.addEventListener(
            "pointerleave",
            () => document.body.classList.remove("cursor-spotlight-active"),
            { passive: true }
        );
    }

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            
            // Get inquirer's name
            const nameInput = document.getElementById("inquirerName");
            const inquirerName = nameInput.value.trim() || "Friend";
            
            showThankYouModal(inquirerName);
            contactForm.reset();
        });
    }
});

// Thank You Modal Functions
function showThankYouModal(inquirerName) {
    const modal = document.getElementById("thankYouModal");
    const nameSpan = document.getElementById("modalInquirerName");
    
    // Set the inquirer's name in the modal
    nameSpan.textContent = inquirerName;
    
    modal.classList.add("show");
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        closeThankYouModal();
    }, 5000);
}

function closeThankYouModal() {
    const modal = document.getElementById("thankYouModal");
    modal.classList.remove("show");
}

// Close modal when clicking outside the content
document.addEventListener("click", function (e) {
    const modal = document.getElementById("thankYouModal");
    if (e.target === modal) {
        closeThankYouModal();
    }
});