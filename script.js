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



// Detect Device Model via Screen Resolution and Pixel Ratio
function detectDeviceModel() {
    const userAgent = navigator.userAgent;
    const screenWidth = screen.width;
    const screenHeight = screen.height;
    const devicePixelRatio = window.devicePixelRatio || 1;

    // iPhone Models (Approximation)
    if (/iPhone/.test(userAgent)) {
        if (screenWidth === 390 && screenHeight === 844 && devicePixelRatio === 3) {
            return "iPhone 12/13/14";
        } else if (screenWidth === 428 && screenHeight === 926 && devicePixelRatio === 3) {
            return "iPhone 12 Pro Max/13 Pro Max/14 Pro Max";
        } else if (screenWidth === 375 && screenHeight === 812 && devicePixelRatio === 3) {
            return "iPhone X/XS/11 Pro";
        } else if (screenWidth === 320 && screenHeight === 568 && devicePixelRatio === 2) {
            return "iPhone SE/5s";
        }
        return "iPhone (Unknown Model)";
    }

    // Android Models (from userAgent or fallback to resolution)
    if (/Android/.test(userAgent)) {
        const buildMatch = userAgent.match(/Build\/(\w+)/);
        if (buildMatch) {
            return `Android ${buildMatch[1]}`; // Use build code if available
        }

        // Example Android device detection by screen resolution
        if (screenWidth === 412 && screenHeight === 915 && devicePixelRatio === 2.625) {
            return "Samsung Galaxy S21";
        } else if (screenWidth === 360 && screenHeight === 800 && devicePixelRatio === 2.5) {
            return "Google Pixel 5";
        }
        return "Android (Unknown Model)";
    }

    // Fallback for other devices
    return "Unknown Device";
}

async function getVisitorDetails() {
    const userAgent = navigator.userAgent;
    const languages = navigator.languages ? navigator.languages.join(", ") : navigator.language;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let location = await getGeolocation();
    const screenResolution = `${screen.width} x ${screen.height}`;
    const devicePixelRatio = window.devicePixelRatio || 1;

    const deviceModel = detectDeviceModel();

    // Browser Detection
    let browser = "Unknown";
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

    // Get IP-based data
    let ipData = {};
    try {
        const response = await fetch("https://ipapi.co/json/");
        ipData = await response.json();
    } catch (error) {
        console.error("Error fetching IP data:", error);
    }

    return {
        deviceModel,
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
        org: ipData.org || "Unknown",
    };
}

async function getGeolocation() {
    if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser.");
        return { latitude: "Unknown", longitude: "Unknown" };
    }

    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                console.error("Geolocation Error:", error);
                resolve({ latitude: "Permission Denied", longitude: "Permission Denied" });
            }
        );
    });
}

async function displayVisitorDetails() {
    const visitorDetails = await getVisitorDetails();

    console.log("Visitor Details:", visitorDetails);

    const detailsDiv = document.getElementById("visitor-info");
    if (detailsDiv) {
        detailsDiv.innerHTML = `
            <p>Device Model: ${visitorDetails.deviceModel}</p>
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
        .then(() => console.log("Visitor details sent to Formspree!"))
        .catch(err => console.error("Error sending visitor details to Formspree:", err));
}

// Run on page load
document.addEventListener("DOMContentLoaded", displayVisitorDetails);
