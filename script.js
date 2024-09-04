document.addEventListener('DOMContentLoaded', function () {
    // Loading screen
    const loadingScreen = document.getElementById('loading');

    function hideLoadingScreen() {
        loadingScreen.style.opacity = '0';
        setTimeout(function () {
            loadingScreen.style.display = 'none';
        }, 500);
    }

    // Check if the page has already loaded
    if (document.readyState === 'complete') {
        hideLoadingScreen();
    } else {
        window.addEventListener('load', hideLoadingScreen);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Active navigation item highlighting
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-item");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach((item) => {
            item.classList.remove("active");
            if (item.querySelector("a").getAttribute("href").slice(1) === current) {
                item.classList.add("active");
            }
        });
    });

    // Populate key findings
    const keyFindings = [
        "Identified over 100 unique bioactive compounds across 29 plant species",
        "Discovered potential new sources of antioxidants and anti-inflammatory agents",
        "Uncovered novel compounds with promising anticancer properties",
        "Found plant extracts with significant antimicrobial activity against drug-resistant pathogens"
    ];

    const keyFindingsList = document.getElementById('keyFindings');
    keyFindings.forEach(finding => {
        const li = document.createElement('li');
        li.textContent = finding;
        keyFindingsList.appendChild(li);
    });

    // Dynamic plant gallery population with lightbox and filtering
    const plantGallery = document.getElementById('plantGallery');
    const plantSpecies = [
        // Lamiaceae Family
        { name: 'Ocimum tenuiflorum L. Subtype Rama', image: 'plants/HM.jpg', family: 'Lamiaceae' },
        { name: 'Ocimum gratissimum L.', image: 'plants/GT.jpg', family: 'Lamiaceae' },
        { name: 'Hyptis suaveolens (L.) Poit.', image: 'plants/AT.jpg', family: 'Lamiaceae' },
        { name: 'Ocimum tenuiflorum L. Subtype Krishna', image: 'plants/TL.jpg', family: 'Lamiaceae' },
        { name: 'Plectranthus barbatus (Andrews) Benth. ex G.Don', image: 'plants/WK.jpg', family: 'Lamiaceae' },
        { name: 'Plectranthus zatarhendi E.A. Bruce', image: 'plants/IW.jpg', family: 'Lamiaceae' },
        { name: 'Anisomeles indica (L.) Kuntze', image: 'plants/YW.jpg', family: 'Lamiaceae' },
        // Rutaceae Family
        { name: 'Atalantia ceylanica (Arn.) Oliv.', image: 'plants/YN.jpg', family: 'Rutaceae' },
        { name: 'Citrus aurantifolia aurantifolia L.', image: 'plants/DH.jpg', family: 'Rutaceae' },
        { name: 'Acronychia pedunculata (L.) Miq.', image: 'plants/AK.jpg', family: 'Rutaceae' },
        { name: 'Citrus madurensis Lour.', image: 'plants/NN.jpg', family: 'Rutaceae' },
        { name: 'Citrus sinensis (L.) Osbeck', image: 'plants/PD.jpg', family: 'Rutaceae' },
        { name: 'Citrus reticulata L.', image: 'plants/HN.jpg', family: 'Rutaceae' },
        { name: 'Aegle marmelos (L.) Correa', image: 'plants/BL.jpg', family: 'Rutaceae' },
        { name: 'Toddalia asiatica (L.) Lam.', image: 'plants/KM.jpg', family: 'Rutaceae' },
        { name: 'Clausena indica (Dalzell) Oliv.', image: 'plants/MK.jpg', family: 'Rutaceae' },
        { name: 'Ruta chalepensis L.', image: 'plants/AR.jpg', family: 'Rutaceae' },
        { name: 'Limonia acidissima L.', image: 'plants/DV.jpg', family: 'Rutaceae' },
        // Lauraceae Family
        { name: 'Cinnamomum verum J.Presl', image: 'plants/KR.jpg', family: 'Lauraceae' },
        // Poaceae Family
        { name: 'Cymbopogon citratus (DC.) Stapf', image: 'plants/SR.jpg', family: 'Poaceae' },
        // Asteraceae Family
        { name: 'Ageratum conyzoides L.', image: 'plants/HT.jpg', family: 'Asteraceae' },
        { name: 'Tithonia diversifolia (Hemsl.) A.gray', image: 'plants/WSL.jpg', family: 'Asteraceae' }, // Leaves
        { name: 'Tithonia diversifolia (Hemsl.) A.gray', image: 'plants/WSF.jpg', family: 'Asteraceae' }, // Flowers
        // Apiaceae Family
        { name: 'Eryngium foetidum L.', image: 'plants/AN.jpg', family: 'Apiaceae' },
        // Euphorbiaceae Family
        { name: 'Croton laccifer L.', image: 'plants/KP.jpg', family: 'Euphorbiaceae' },
        // Piperaceae Family
        { name: 'Piper betle L.', image: 'plants/BU.jpg', family: 'Piperaceae' },
        // Verbenaceae Family
        { name: 'Vitex negundo L.', image: 'plants/NK.jpg', family: 'Verbenaceae' },
        // Magnoliaceae Family
        { name: 'Michelia champaca (L.) Baill. ex Pierre', image: 'plants/GS.jpg', family: 'Magnoliaceae' },
        // Convolvulaceae Family
        { name: 'Evolvulus alsinoides (L.) L.', image: 'plants/NV.jpg', family: 'Convolvulaceae' }
    ];

    // Populate the plant gallery dynamically
    plantSpecies.forEach((plant) => {
        const plantCard = document.createElement('div');
        plantCard.classList.add('plant-card');
        plantCard.setAttribute('data-family', plant.family);
        
        const nameParts = plant.name.split(' ');
        const italicizedName = nameParts.map((part, index) => index < 2 ? `<i>${part}</i>` : part).join(' ');

        plantCard.innerHTML = `
            <img src="${plant.image}" alt="${plant.name}">
            <p>${italicizedName}</p>
        `;
        plantGallery.appendChild(plantCard);
    });

    // Lightbox functionality
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');

    document.querySelectorAll('.plant-card').forEach(card => {
        card.addEventListener('click', () => {
            lightboxImg.src = card.querySelector('img').src;
            lightboxCaption.innerHTML = card.querySelector('p').innerHTML;
            lightbox.style.display = 'block';
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Family filter functionality
    const filterButtons = document.querySelectorAll('.filter-button');
    const plantCards = document.querySelectorAll('.plant-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const family = button.getAttribute('data-family');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            plantCards.forEach(card => {
                card.style.display = card.getAttribute('data-family') === family || family === 'all' ? 'block' : 'none';
            });
        });
    });

    // Collapsible navigation menu
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', function () {
        navLinks.classList.toggle('show');
    });

    // Close menu when a link is clicked (for mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
        });
    });
});
