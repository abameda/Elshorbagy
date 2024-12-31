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
    let device = "Unknown";
    let browser = "Unknown";
    let profileName = null;

    // Detect Browser
    if (/Chrome/.test(userAgent) && !/Edg/.test(userAgent)) {
        browser = "Chrome";
    } else if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) {
        browser = "Safari";
    } else if (/Firefox/.test(userAgent)) {
        browser = "Firefox";
    } else if (/Edg/.test(userAgent)) {
        browser = "Edge";
    } else if (/Opera|OPR/.test(userAgent)) {
        browser = "Opera";
    }

    // Detect Device
    if (/iPhone/.test(userAgent)) {
        const match = userAgent.match(/iPhone\sOS\s([0-9_]+);.*\s(\w+)\s\((\w+)\)/);
        device = match ? `iPhone ${match[2]}` : "iPhone";
    } else if (/Android/.test(userAgent)) {
        const match = userAgent.match(/Android\s([0-9.]+);.*Build\/(\w+)/);
        device = match ? `Android ${match[2]}` : "Android";
    } else if (/Macintosh/.test(userAgent)) {
        device = "Mac";

        // Use screen size for Mac refinement
        const screenWidth = screen.width;
        const screenHeight = screen.height;

        if (screenWidth === 1440 && screenHeight === 900) {
            device = "MacBook Air 13-inch";
        } else if (screenWidth === 2560 && screenHeight === 1600) {
            device = "MacBook Pro 16-inch";
        }
    } else if (/Windows/.test(userAgent)) {
        device = "Windows PC";

        const screenWidth = screen.width;
        const screenHeight = screen.height;

        if (screenWidth === 1366 && screenHeight === 768) {
            device = "Standard Windows Laptop (1366x768)";
        } else if (screenWidth >= 1920 && screenHeight >= 1080) {
            device = "High-Resolution Windows Laptop/PC";
        }
    }

    // Attempt to detect browser sync profile (very rare)
    const profileMatch = userAgent.match(/Profile\/([a-zA-Z0-9._-]+)/);
    if (profileMatch) {
        profileName = profileMatch[1];
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
        device,
        browser,
        profileName: profileName || "Not Available",
        ip: ipData.ip || "Unknown",
        city: ipData.city || "Unknown",
        region: ipData.region || "Unknown",
        country: ipData.country_name || "Unknown",
        org: ipData.org || "Unknown", // This may show ISP or organization
        wifiHint: ipData.org || "Unknown", // Approximation using ISP
    };
}

async function displayVisitorDetails() {
    const visitorDetails = await getVisitorDetails();

    console.log("Visitor Details:", visitorDetails);

    const detailsDiv = document.getElementById("visitor-info");
    if (detailsDiv) {
        detailsDiv.innerHTML = `
            <p>Device: ${visitorDetails.device}</p>
            <p>Browser: ${visitorDetails.browser}</p>
            <p>Profile Name: ${visitorDetails.profileName}</p>
            <p>IP: ${visitorDetails.ip}</p>
            <p>City: ${visitorDetails.city}</p>
            <p>Region: ${visitorDetails.region}</p>
            <p>Country: ${visitorDetails.country}</p>
            <p>Organization (ISP or Network): ${visitorDetails.org}</p>
            <p>Wi-Fi Hint (ISP or Network): ${visitorDetails.wifiHint}</p>
        `;
    }

    // Optionally send this data to Formspree or another service
    fetch("https://formspree.io/f/mbllaoyb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(visitorDetails),
    })
        .then(() => console.log("Visitor details sent to Formspree!"))
        .catch(err => console.error("Error sending visitor details:", err));
}

// Run on page load
document.addEventListener("DOMContentLoaded", displayVisitorDetails);
