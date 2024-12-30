// Smooth scrolling

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    function typeWriterEffect(elementId, text, delay = 100) {
        const element = document.getElementById(elementId);
        let index = 0;

        element.textContent = ''; // Clear existing text

        function type() {
            if (index < text.length) {
                element.textContent += text[index]; // Add one character at a time
                index++;
                setTimeout(type, delay);
            } else {
                // Once typing is complete, remove the cursor
                element.classList.add('no-cursor');
            }
        }

        type();
    }

    // Apply the typewriter effect
    typeWriterEffect('name', 'Abdelhmeed Elshorbagy', 100); // Typing for the name
    setTimeout(() => {
        typeWriterEffect('tagline', 'I am not human, I am an Engineer', 100); // Typing for the tagline
    }, 2500); // Start tagline after the name
});

// Gallery hover effect (Optional for a modern look)
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.gallery-grid img');

    images.forEach(img => {
        img.addEventListener('mouseover', () => {
            img.style.transform = 'scale(1.05)';
            img.style.transition = 'transform 0.3s';
        });

        img.addEventListener('mouseout', () => {
            img.style.transform = 'scale(1)';
        });
    });
});

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    // Optionally save the mode to localStorage
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDarkMode ? 'enabled' : 'disabled');
}


// Apply the saved mode on page load
window.onload = () => {
    const savedMode = localStorage.getItem('dark-mode');
    if (savedMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }
};



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        } else {
            window.scrollTo(0, 0);
        }
    });
});



function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    // Save the mode to localStorage
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDarkMode ? 'enabled' : 'disabled');
}

// Apply saved mode on page load
window.onload = () => {
    const savedMode = localStorage.getItem('dark-mode');
    if (savedMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }
};




async function getVisitorInfo() {
    // Get phone model
    const userAgent = navigator.userAgent;
    let device = "Unknown";

    if (/iPhone/.test(userAgent)) {
        const match = userAgent.match(/iPhone\sOS\s([0-9_]+);.*\s(\w+)\s\((\w+)\)/);
        device = match ? `iPhone ${match[2]}` : "iPhone";
    } else if (/Android/.test(userAgent)) {
        const match = userAgent.match(/Android\s([0-9.]+);.*Build\/(\w+)/);
        device = match ? `Android ${match[2]}` : "Android";
    }

    // Get location
    let location = { latitude: "Unknown", longitude: "Unknown" };
    if (navigator.geolocation) {
        try {
            await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    pos => {
                        location = {
                            latitude: pos.coords.latitude,
                            longitude: pos.coords.longitude,
                        };
                        resolve();
                    },
                    error => reject("Permission denied or error fetching location")
                );
            });
        } catch (err) {
            console.error("Geolocation Error:", err);
        }
    }

    // Combine the data
    const visitorInfo = {
        device,
        location,
    };

    // Send data to Formspree
    fetch('https://formspree.io/f/mbllaoyb', { // Replace YOUR_FORM_ID with your actual Formspree ID
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitorInfo),
    })
        .then(() => console.log('Visitor info sent successfully to Formspree!'))
        .catch(err => console.error('Error sending visitor info to Formspree:', err));
}

// Call this function when the page loads
getVisitorInfo();
