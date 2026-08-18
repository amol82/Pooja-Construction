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