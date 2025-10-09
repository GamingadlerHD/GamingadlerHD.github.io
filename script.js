// Create animated stars background
function createStars() {
  const starsContainer = document.querySelector(".stars");
  const starsCount = 150;

  for (let i = 0; i < starsCount; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    // Random size
    const size = Math.random() * 3;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // Random position
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;

    // Random opacity
    star.style.opacity = Math.random() * 0.8 + 0.2;

    // Random animation
    const duration = Math.random() * 10 + 5;
    star.style.animation = `twinkle ${duration}s infinite alternate`;

    starsContainer.appendChild(star);
  }
}

// Add CSS for twinkling animation
const style = document.createElement("style");
style.textContent = `
            @keyframes twinkle {
                0% { opacity: 0.2; }
                100% { opacity: 0.8; }
            }
        `;
document.head.appendChild(style);

// Initialize when page loads
window.addEventListener("load", () => {
  createStars();

const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

fetch("https://api.github.com/repos/GamingadlerHD/VRCitizen-Launcher/releases/latest")
      .then(response => response.json())
      .then(data => {
        const releaseElement = document.getElementById("release");
        // Extract version after the last '-' or use tag_name as fallback
        let version = data.name ? data.name.split('-').pop() : data.tag_name;
        releaseElement.textContent = `${version}`;
      })
      .catch(error => {
        console.error("Error fetching release:", error);
        document.getElementById("release").textContent = "Failed to load release.";
      });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});

// Image Modal Functions
function openModal(imageSrc, caption) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    modal.style.display = 'block';
    modalImage.src = imageSrc;
    modalCaption.textContent = caption;
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    
    // Re-enable body scrolling
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the image
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
            closeWarningModal();
        }
    });
});

// Warning Modal Functions
function showWarningModal() {
    const warningModal = document.getElementById('warningModal');
    warningModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeWarningModal() {
    const warningModal = document.getElementById('warningModal');
    warningModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function proceedToDownload() {
    // Close the modal
    closeWarningModal();
    // Open the GitHub releases page
    window.open('https://github.com/GamingadlerHD/VRCitizen-Launcher/releases/latest', '_blank');
}
