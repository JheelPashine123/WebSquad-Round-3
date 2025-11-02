// --- Configuration ---
// This value MUST match the original width of the Montessori world map image for accurate scaling.
const MAP_NATURAL_WIDTH = 1000; 

// --- DOM Elements ---
const mapAreas = document.querySelectorAll('#worldmap area');
const mapTooltip = document.getElementById('map-tooltip');
const mapImage = document.getElementById('world-map-image');

// --- Event Listeners for Map Areas ---
mapAreas.forEach(area => {
    area.addEventListener('mouseover', (e) => {
        const continentName = area.getAttribute('data-continent');
        let festivalCount = area.getAttribute('data-festivals');
        const page = area.getAttribute('data-page');

        // Check if the continent has a dedicated page (is clickable for exploration)
        if (page && page !== '#') {
            // The hover text encourages clicking to explore
            festivalCount = `Click to Explore ${continentName}'s Festivals`;
        } else {
            // Default text for non-clickable areas (like Antarctica)
            festivalCount = `${festivalCount} Festivals`;
        }
        
        mapTooltip.textContent = `${continentName}: ${festivalCount}`;
        mapTooltip.style.opacity = '1';
        
        // --- Tooltip Positioning Logic ---
        const coords = area.coords.split(',').map(c => parseInt(c.trim()));
        let x, y;

        // Calculate the approximate center for polygon shapes (used for most continents)
        if (area.shape === 'poly') {
            let sumX = 0, sumY = 0;
            for (let i = 0; i < coords.length; i += 2) {
                sumX += coords[i];
                sumY += coords[i + 1];
            }
            x = sumX / (coords.length / 2);
            y = sumY / (coords.length / 2);
        } else if (area.shape === 'rect') {
            x = (coords[0] + coords[2]) / 2;
            y = (coords[1] + coords[3]) / 2;
        } else {
            x = coords[0]; y = coords[1];
        }
        
        // Scale the coordinates based on the current image size versus its natural size
        const scale = mapImage.offsetWidth / MAP_NATURAL_WIDTH;
        const tooltipX = (x * scale);
        const tooltipY = (y * scale);
        
        mapTooltip.style.left = tooltipX + 'px';
        mapTooltip.style.top = tooltipY + 'px';
    });

    area.addEventListener('mouseout', () => {
        mapTooltip.style.opacity = '0';
    });

    area.addEventListener('click', (e) => {
        e.preventDefault(); 
        const continentName = area.getAttribute('data-continent');
        const page = area.getAttribute('data-page');

        // Redirect to the continent's dedicated page if 'data-page' is defined
        if (page && page !== '#') {
            window.location.href = page;
        } else {
            console.log(`Clicked on ${continentName}. No dedicated page.`);
            alert(`You clicked on ${continentName}! (No dedicated festival page available.)`);
        }
    });
});

// --- General Button Functionality ---
document.getElementById('explore-button').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('map-section').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('timeline-button').addEventListener('click', () => {
    console.log('Viewing timeline...');
});