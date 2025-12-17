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

// Helper function to get card filename for a painting
function getCardFilename(paintingFile) {
    // Extract base name and extension
    const lastDot = paintingFile.lastIndexOf('.');
    const baseName = paintingFile.substring(0, lastDot);
    const extension = paintingFile.substring(lastDot);
    return baseName + '_card' + extension;
}

// Image arrays - paintings
const paintingFiles = [
    'bougainvillea.png',
    'field of poppies.png',
    'flowers card.png',
    'lavender.png',
    'olive leaves.png',
    'oranges.png',
    'outdoor camping card.png',
    'pomegranets.png',
    'poppies .png', // Note: filename has trailing space
    'rainbow olive leaves.png',
    'roses.png',
    'sunflowers.png',
    'sunset.png',
    'yellow flowers.png'
];

// Create painting pieces - structure similar to pottery
// Each piece will have [card, painting] if card exists, or just [painting]
const paintingPieces = paintingFiles.map(paintingFile => {
    const cardFile = getCardFilename(paintingFile);
    const name = paintingFile.replace('.png', '').replace('.jpg', '').replace('.jpeg', '').replace(' card', '');
    
    // Start with just painting, will add card if it exists
    return {
        name: name,
        images: [paintingFile], // Default to just painting, will update if card exists
        card: cardFile,
        painting: paintingFile
    };
});

// Pottery pieces - grouped by piece (duplicates together)
const potteryPieces = [
    {
        name: 'All Pottery',
        images: ['All_pottery.jpeg']
    },
    {
        name: 'Blue Bowls',
        images: ['blue_bowls_1.jpeg', 'blue_bowls_2.jpeg', 'blue_bowls_3.jpeg', 'blue_bowls_4.jpeg', 'blue_bowls_5.jpeg', 'blue_bowls_6.jpeg', 'blue_bowls_7.jpeg', 'blue_bowls_8.jpeg']
    },
    {
        name: 'Bowl - Green & White',
        images: ['Bowl_green_white_1.jpeg', 'Bowl_white_green_2.jpeg']
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
        name: 'Mug - Blue & Green',
        images: ['blue_green_mugs_1.jpeg', 'blue_green_mugs_2.jpeg', 'blue_green_mugs_4.jpeg', 'blue_green_mugs_5.jpeg']
    },
    {
        name: 'Mug - Green',
        images: ['green_mug_1.jpeg', 'green_mug_2.jpeg', 'green_mug_3.jpeg']
    },
    {
        name: 'Mug - Pink & Red',
        images: ['Mug_pink_red_1.jpeg', 'Mug_ping_red_2.jpeg'] // Note: keeping both filenames as they are
    },
];

// Flatten array for lightbox navigation
const potteryFiles = potteryPieces.flatMap(piece => piece.images);

// Photography images
const photographyFiles = [
    'Broadmarsh_1.JPG',
    'CocaCola_Denmark.JPG',
    'light_through_trees.JPG',
    'old_sheldon_church.JPG',
    'Palm_under_water.JPG',
    'red_mushroom.JPG',
    'Small_flowers.JPG',
    'sun_ray_through_trees.JPG',
    'water_on_leaf.JPG'
];

let currentImageIndex = 0;
let currentImageArray = [];

// Helper function to encode file paths for URLs
// Handles GitHub Pages case-sensitivity and spaces in filenames
function encodeFilePath(filename) {
    // Split the filename into parts and encode each part
    // This preserves folder structure while encoding special characters
    return filename.split('/').map(part => encodeURIComponent(part)).join('/');
}

// Load hero images when DOM is ready
function loadHeroImages() {
    const heroImage1 = document.getElementById('heroImage1');
    const heroImage2 = document.getElementById('heroImage2');
    if (heroImage1) {
        heroImage1.src = encodeFilePath('Zineb_in_Lamps.jpeg');
        heroImage1.onerror = function() {
            console.error('Failed to load hero image 1:', 'Zineb_in_Lamps.jpeg');
            console.error('Tried path:', this.src);
        };
    }
    if (heroImage2) {
        heroImage2.src = encodeFilePath('Zineb_in_Marraketch.jpeg');
        heroImage2.onerror = function() {
            console.error('Failed to load hero image 2:', 'Zineb_in_Marraketch.jpeg');
            console.error('Tried path:', this.src);
        };
    }
}

// Initialize galleries when DOM is ready
function initializeGalleries() {
    const paintingsGrid = document.getElementById('paintingsGrid');
    const potteryGrid = document.getElementById('potteryGrid');
    const photographyGrid = document.getElementById('photographyGrid');
    
    if (!paintingsGrid || !potteryGrid || !photographyGrid) {
        console.error('Gallery grids not found!');
        return;
    }

    // Create gallery items for paintings - check for _card files
    // Similar structure to pottery, but check if card exists first
    let paintingImageIndex = 0;
    paintingPieces.forEach((piece, pieceIndex) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.type = 'painting';
        galleryItem.dataset.pieceIndex = pieceIndex;
        
        // Create image container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        
        // Start with painting as default (most won't have cards)
        const mainImg = document.createElement('img');
        mainImg.src = encodeFilePath(piece.painting);
        mainImg.alt = `${piece.name} - Painting`;
        mainImg.loading = 'lazy';
        mainImg.className = 'active';
        mainImg.dataset.index = paintingImageIndex;
        
        // Create painting image for second view (only used if card exists)
        const paintingImg = document.createElement('img');
        paintingImg.src = encodeFilePath(piece.painting);
        paintingImg.alt = `${piece.name} - Painting`;
        paintingImg.loading = 'lazy';
        paintingImg.className = '';
        paintingImg.style.display = 'none';
        
        // Default to just painting (no card)
        piece.images = [piece.painting];
        
        // Check if card exists by trying to load it
        const testCard = new Image();
        testCard.onload = function() {
            // Card exists - replace main image with card and add painting as second
            mainImg.src = encodeFilePath(piece.card);
            mainImg.alt = `${piece.name} - Card`;
            imageContainer.appendChild(paintingImg);
            paintingImg.dataset.index = paintingImageIndex + 1;
            piece.images = [piece.card, piece.painting];
            
            // Show indicator for 2 photos
            const indicator = galleryItem.querySelector('.multi-image-indicator');
            if (indicator) {
                indicator.textContent = '2 photos';
                indicator.style.display = 'block';
            }
        };
        testCard.onerror = function() {
            // Card doesn't exist - keep just painting, no indicator needed
            // piece.images already set to [piece.painting]
        };
        testCard.src = encodeFilePath(piece.card);
        
        imageContainer.appendChild(mainImg);
        paintingImageIndex++;
        
        galleryItem.appendChild(imageContainer);
        
        // Add multiple images indicator (only shown if card exists - 2 photos)
        const indicator = document.createElement('div');
        indicator.className = 'multi-image-indicator';
        indicator.style.display = 'none';
        indicator.textContent = '2 photos';
        galleryItem.appendChild(indicator);
        
        // Add piece name label
        const label = document.createElement('div');
        label.className = 'piece-label';
        label.textContent = piece.name;
        galleryItem.appendChild(label);
        
        // Add click event to open lightbox
        galleryItem.addEventListener('click', () => {
            // Rebuild lightbox array based on current piece.images arrays
            const lightboxArray = paintingPieces.flatMap(p => p.images);
            // Calculate the starting index by summing images from all previous pieces
            const firstImageIndex = paintingPieces.slice(0, pieceIndex).reduce((sum, p) => sum + p.images.length, 0);
            openLightbox(firstImageIndex, lightboxArray);
        });
        
        paintingsGrid.appendChild(galleryItem);
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
            console.error('Encoded path:', img.src);
            console.error('Current URL:', window.location.href);
            // Try unencoded path as fallback
            if (img.src !== imageFile) {
                console.log('Trying unencoded path...');
                this.src = imageFile;
            } else {
                this.style.display = 'none';
            }
        };
        
        imageContainer.appendChild(img);
        potteryImageIndex++;
    });
    
    galleryItem.appendChild(imageContainer);
    
    // Add multiple images indicator if more than one image
    if (piece.images.length > 1) {
        const indicator = document.createElement('div');
        indicator.className = 'multi-image-indicator';
        indicator.textContent = `${piece.images.length} photos`;
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

    // Create gallery items for photography - using same structure as paintings (simple images)
    photographyFiles.forEach((imageFile, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.index = index;
        galleryItem.dataset.type = 'photography';
        
        // Create image container (same as paintings)
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        
        const img = document.createElement('img');
        img.src = encodeFilePath(imageFile);
        img.alt = `Photography ${index + 1}`;
        img.loading = 'lazy';
        img.className = 'active';
        
        // Add error handling for images
        img.onerror = function() {
            console.error('Failed to load image:', imageFile);
            console.error('Encoded path:', img.src);
            console.error('Current URL:', window.location.href);
            // Try unencoded path as fallback
            if (img.src !== imageFile) {
                console.log('Trying unencoded path...');
                this.src = imageFile;
            } else {
                this.style.display = 'none';
            }
        };
        
        imageContainer.appendChild(img);
        galleryItem.appendChild(imageContainer);
        photographyGrid.appendChild(galleryItem);
        
        // Add click event to open lightbox
        galleryItem.addEventListener('click', () => {
            openLightbox(index, photographyFiles);
        });
    });
}

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        loadHeroImages();
        initializeGalleries();
    });
} else {
    loadHeroImages();
    initializeGalleries();
}

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
    
    // Remove greeting card view (no longer using 3D effect)
    lightbox.classList.remove('greeting-card-view');
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.classList.remove('greeting-card-view');
    document.body.style.overflow = 'auto';
    currentImageArray = [];
}

function showNextImage() {
    if (currentImageArray.length > 0) {
        currentImageIndex = (currentImageIndex + 1) % currentImageArray.length;
        lightboxImg.src = encodeFilePath(currentImageArray[currentImageIndex]);
        lightbox.classList.remove('greeting-card-view');
    }
}

function showPrevImage() {
    if (currentImageArray.length > 0) {
        currentImageIndex = (currentImageIndex - 1 + currentImageArray.length) % currentImageArray.length;
        lightboxImg.src = encodeFilePath(currentImageArray[currentImageIndex]);
        lightbox.classList.remove('greeting-card-view');
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
