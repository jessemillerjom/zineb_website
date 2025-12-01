// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Image arrays
const paintingFiles = [
    'Scan of birthday candles.png',
    'Scan of bougainvillea.png',
    'Scan of field of poppies.png',
    'Scan of flowers card.png',
    'Scan of lavender.png',
    'Scan of olive leaves.png',
    'Scan of oranges.png',
    'Scan of outdoor camping card.png',
    'Scan of pomegranets.png',
    'Scan of poppies .png', // Note: filename has trailing space
    'Scan of rainbow olive leaves.png',
    'Scan of roses.png',
    'Scan of sunflowers.png',
    'Scan of sunset.png',
    'Scan of yellow flowers.png'
];

// Pottery pieces - grouped by piece (duplicates together)
const potteryPieces = [
    {
        name: 'All Pottery',
        images: ['All_pottery.jpeg']
    },
    {
        name: 'Bowl - Green & White',
        images: ['Bowl_green_white_1.jpeg']
    },
    {
        name: 'Bowl - Ocean',
        images: ['Bowl_ocean_1.jpeg', 'Bowl_ocean_2.jpeg']
    },
    {
        name: 'Bowl - Sand',
        images: ['Bowl_sand_1.jpeg', 'Bowl_sand_2.jpeg']
    },
    {
        name: 'Bowl - White & Green',
        images: ['Bowl_white_green_2.jpeg']
    },
    {
        name: 'Mug - Pink & Red',
        images: ['Mug_pink_red_1.jpeg', 'Mug_ping_red_2.jpeg'] // Note: keeping both filenames as they are
    },
];

// Flatten array for lightbox navigation
const potteryFiles = potteryPieces.flatMap(piece => piece.images);

const paintingsGrid = document.getElementById('paintingsGrid');
const potteryGrid = document.getElementById('potteryGrid');
let currentImageIndex = 0;
let currentImageArray = [];

// Helper function to encode file paths for URLs
function encodeFilePath(filename) {
    // Split the filename into parts and encode each part
    return filename.split('/').map(part => encodeURIComponent(part)).join('/');
}

// Load hero images
document.addEventListener('DOMContentLoaded', () => {
    const heroImage1 = document.getElementById('heroImage1');
    const heroImage2 = document.getElementById('heroImage2');
    if (heroImage1) heroImage1.src = encodeFilePath('Zineb_in_Lamps.jpeg');
    if (heroImage2) heroImage2.src = encodeFilePath('Zineb_in_Marraketch.jpeg');
});

// Create gallery items for paintings
paintingFiles.forEach((imageFile, index) => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.dataset.index = index;
    galleryItem.dataset.type = 'painting';
    
    const img = document.createElement('img');
    img.src = encodeFilePath(imageFile);
    img.alt = `Painting ${index + 1}`;
    img.loading = 'lazy';
    
    // Add error handling for images
    img.onerror = function() {
        console.error('Failed to load painting image:', imageFile);
        console.error('Encoded path:', encodeFilePath(imageFile));
        this.style.display = 'none';
    };
    
    img.onload = function() {
        console.log('Successfully loaded painting:', imageFile);
    };
    
    galleryItem.appendChild(img);
    paintingsGrid.appendChild(galleryItem);
    
    // Add click event to open lightbox
    galleryItem.addEventListener('click', () => {
        openLightbox(index, paintingFiles);
    });
});

// Create gallery items for pottery (grouped by piece)
let potteryImageIndex = 0;
potteryPieces.forEach((piece, pieceIndex) => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.dataset.type = 'pottery';
    galleryItem.dataset.pieceIndex = pieceIndex;
    
    // Create image container
    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';
    
    // Add all images for this piece
    piece.images.forEach((imageFile, imgIndex) => {
        const img = document.createElement('img');
        img.src = encodeFilePath(imageFile);
        img.alt = `${piece.name} - View ${imgIndex + 1}`;
        img.loading = 'lazy';
        img.className = imgIndex === 0 ? 'active' : '';
        img.dataset.index = potteryImageIndex;
        
        // Add error handling for images
        img.onerror = function() {
            console.error('Failed to load image:', imageFile);
            this.style.display = 'none';
        };
        
        imageContainer.appendChild(img);
        potteryImageIndex++;
    });
    
    galleryItem.appendChild(imageContainer);
    
    // Add multiple images indicator if more than one image
    if (piece.images.length > 1) {
        const indicator = document.createElement('div');
        indicator.className = 'multi-image-indicator';
        indicator.textContent = `${piece.images.length} views`;
        galleryItem.appendChild(indicator);
    }
    
    // Add piece name label
    const label = document.createElement('div');
    label.className = 'piece-label';
    label.textContent = piece.name;
    galleryItem.appendChild(label);
    
    // Add click event to open lightbox (start with first image of this piece)
    galleryItem.addEventListener('click', () => {
        // Calculate the starting index by summing images from all previous pieces
        const firstImageIndex = potteryPieces.slice(0, pieceIndex).reduce((sum, p) => sum + p.images.length, 0);
        openLightbox(firstImageIndex, potteryFiles);
    });
    
    potteryGrid.appendChild(galleryItem);
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

function openLightbox(index, imageArray) {
    currentImageIndex = index;
    currentImageArray = imageArray;
    lightboxImg.src = encodeFilePath(imageArray[index]);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentImageArray = [];
}

function showNextImage() {
    if (currentImageArray.length > 0) {
        currentImageIndex = (currentImageIndex + 1) % currentImageArray.length;
        lightboxImg.src = encodeFilePath(currentImageArray[currentImageIndex]);
    }
}

function showPrevImage() {
    if (currentImageArray.length > 0) {
        currentImageIndex = (currentImageIndex - 1 + currentImageArray.length) % currentImageArray.length;
        lightboxImg.src = encodeFilePath(currentImageArray[currentImageIndex]);
    }
}

// Lightbox event listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', showNextImage);
lightboxPrev.addEventListener('click', showPrevImage);

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
    }
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe gallery items
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
    observer.observe(item);
});

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
});

