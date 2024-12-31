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



async function getVisitorDetails() {
    const userAgent = navigator.userAgent;
    const languages = navigator.languages ? navigator.languages.join(", ") : navigator.language;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let device = "Unknown";
    let browser = "Unknown";
    let osVersion = "Unknown";
    let location = { latitude: "Unknown", longitude: "Unknown" };
    const screenResolution = `${screen.width} x ${screen.height}`;
    const devicePixelRatio = window.devicePixelRatio || 1;

    // Detect Browser
    if (/Chrome/.test(userAgent) && !/Edg/.test(userAgent)) {
        browser = `Chrome ${navigator.appVersion.match(/Chrome\/(\d+)/)[1]}`;
    } else if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) {
        browser = `Safari ${navigator.appVersion.match(/Version\/(\d+)/)[1]}`;
    } else if (/Firefox/.test(userAgent)) {
        browser = `Firefox ${navigator.appVersion.match(/Firefox\/(\d+)/)[1]}`;
    } else if (/Edg/.test(userAgent)) {
        browser = `Edge ${navigator.appVersion.match(/Edg\/(\d+)/)[1]}`;
    } else if (/Opera|OPR/.test(userAgent)) {
        browser = `Opera ${navigator.appVersion.match(/OPR\/(\d+)/)[1]}`;
    }

    // Detect Device and OS Version
    if (/iPhone/.test(userAgent)) {
        device = "iPhone";
        const match = userAgent.match(/OS (\d+[_\d]*)/); // Match iOS version
        osVersion = match ? `iOS ${match[1].replace(/_/g, ".")}` : "Unknown iOS";
    } else if (/Android/.test(userAgent)) {
        const match = userAgent.match(/Android\s([0-9.]+)/); // Match Android version
        osVersion = match ? `Android ${match[1]}` : "Unknown Android";
        const buildMatch = userAgent.match(/Build\/(\w+)/);
        device = buildMatch ? `Android ${buildMatch[1]}` : "Android";
    } else if (/Macintosh/.test(userAgent)) {
        device = "Mac";
        const match = userAgent.match(/Mac OS X (\d+[_\d]*)/); // Match macOS version
        osVersion = match ? `macOS ${match[1].replace(/_/g, ".")}` : "Unknown macOS";
    } else if (/Windows/.test(userAgent)) {
        device = "Windows PC";
        const match = userAgent.match(/Windows NT (\d+\.\d+)/); // Match Windows version
        osVersion = match ? `Windows ${match[1]}` : "Unknown Windows";
    }

    // Get Geolocation
    if (navigator.geolocation) {
        try {
            await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        location = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
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

    // Get IP-based data
    let ipData = {};
    try {
        const response = await fetch("https://ipapi.co/json/");
        ipData = await response.json();
    } catch (error) {
        console.error("Error fetching IP data:", error);
    }

    return {
        userAgent,
        device,
        osVersion,
        browser,
        screenResolution,
        devicePixelRatio,
        languages,
        timeZone,
        latitude: location.latitude,
        longitude: location.longitude,
        ip: ipData.ip || "Unknown",
        city: ipData.city || "Unknown",
        region: ipData.region || "Unknown",
        country: ipData.country_name || "Unknown",
        org: ipData.org || "Unknown", // ISP or organization
    };
}

async function displayVisitorDetails() {
    const visitorDetails = await getVisitorDetails();

    console.log("Visitor Details:", visitorDetails);

    // Display details on the page
    const detailsDiv = document.getElementById("visitor-info");
    if (detailsDiv) {
        detailsDiv.innerHTML = `
            <p>Device: ${visitorDetails.device}</p>
            <p>OS Version: ${visitorDetails.osVersion}</p>
            <p>Browser: ${visitorDetails.browser}</p>
            <p>Screen Resolution: ${visitorDetails.screenResolution}</p>
            <p>Device Pixel Ratio: ${visitorDetails.devicePixelRatio}</p>
            <p>Languages: ${visitorDetails.languages}</p>
            <p>Time Zone: ${visitorDetails.timeZone}</p>
            <p>Latitude: ${visitorDetails.latitude}</p>
            <p>Longitude: ${visitorDetails.longitude}</p>
            <p>IP: ${visitorDetails.ip}</p>
            <p>City: ${visitorDetails.city}</p>
            <p>Region: ${visitorDetails.region}</p>
            <p>Country: ${visitorDetails.country}</p>
            <p>Organization: ${visitorDetails.org}</p>
        `;
    }

    // Send details to Formspree
    fetch("https://formspree.io/f/mbllaoyb", { // Replace YOUR_FORM_ID with your actual Formspree form ID
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(visitorDetails),
    })
        .catch(err => console.error("Error sending visitor details to Formspree:", err));
}

// Run on page load
document.addEventListener("DOMContentLoaded", displayVisitorDetails);
