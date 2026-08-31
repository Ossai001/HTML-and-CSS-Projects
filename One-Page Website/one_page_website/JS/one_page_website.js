// Select the lightbox elements
const lightbox = document.getElementById("lightbox");
const enlargedImage = document.getElementById("enlarged-image");
const imageCaption = document.getElementById("image-caption");
const closeButton = document.querySelector(".close-lightbox");
const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");
const galleryImages = document.querySelectorAll(".gallery-image");

let currentImageIndex = 0;

// Display the selected image
function showImage(index) {
    currentImageIndex = index;

    enlargedImage.src = galleryImages[index].src;
    enlargedImage.alt = galleryImages[index].alt;
    imageCaption.textContent = galleryImages[index].alt;
}

// Open the lightbox
function openLightbox(index) {
    lightbox.style.display = "flex";
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");

    showImage(index);
}

// Close the lightbox
function closeLightbox() {
    lightbox.style.display = "none";
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
}

// Open each gallery image when clicked
galleryImages.forEach(function (image, index) {
    image.addEventListener("click", function () {
        openLightbox(index);
    });

    image.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openLightbox(index);
        }
    });
});

// Display the previous image
previousButton.addEventListener("click", function () {
    currentImageIndex--;

    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }

    showImage(currentImageIndex);
});

// Display the next image
nextButton.addEventListener("click", function () {
    currentImageIndex++;

    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }

    showImage(currentImageIndex);
});

// Close using the close button
closeButton.addEventListener("click", closeLightbox);

// Close when the background is clicked
lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard controls
document.addEventListener("keydown", function (event) {
    if (lightbox.style.display === "flex") {
        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowLeft") {
            previousButton.click();
        }

        if (event.key === "ArrowRight") {
            nextButton.click();
        }
    }
});