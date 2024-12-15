document.addEventListener("DOMContentLoaded", function() {
    // Cursor animation
    const cursor = document.createElement("div");
    cursor.classList.add("cursor");
    document.body.appendChild(cursor);

    document.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.pageX}px`;
        cursor.style.top = `${e.pageY}px`;
    });

    document.addEventListener("mouseover", (e) => {
        if (e.target.tagName === "BUTTON" || e.target.tagName === "A") {
            cursor.classList.add("large");
        }
    });

    document.addEventListener("mouseout", (e) => {
        if (e.target.tagName === "BUTTON" || e.target.tagName === "A") {
            cursor.classList.remove("large");
        }
    });

    // Create floating objects (chickens, watermelons, and the new image clown.png)
    const floatingObjects = document.createElement("div");
    floatingObjects.classList.add("floating-objects");
    document.body.appendChild(floatingObjects);

    function createFloatingObject(src, quantity) {
        for (let i = 0; i < quantity; i++) {
            let object = document.createElement("img");
            object.src = src;
            object.classList.add("floating-object"); // Add a class for styling
            object.style.top = `${Math.random() * 100}%`;
            object.style.left = `${Math.random() * 100}%`;
            object.style.animationDuration = `${Math.random() * 10 + 5}s`;  // Random duration for each object
            object.style.animationDelay = `${Math.random() * 5}s`;  // Random delay
            floatingObjects.appendChild(object);
            
            // Add a click event to each clown image
            object.addEventListener('click', function() {
                showModal(object.src);
            });
        }
    }

    // Add chickens, watermelons, and clown images to the floating objects
    createFloatingObject("images/chicken.png", 10);  // Example, you can adjust the quantity
    createFloatingObject("images/watermelon.png", 5);  // Example, you can adjust the quantity
    createFloatingObject("images/clown.png", 5);  // New floating image: clown.png (adjust quantity as needed)

    // Modal for showing the clicked image
    const modal = document.createElement("div");
    modal.classList.add("modal");
    const modalImage = document.createElement("img");
    modal.appendChild(modalImage);
    document.body.appendChild(modal);

    // Show the modal with the clicked image
    function showModal(src) {
        modalImage.src = src;
        modal.style.display = "block";
    }

    // Close the modal when clicking anywhere outside the image
    modal.addEventListener('click', function() {
        modal.style.display = "none";
    });

    // Create and display the welcome text with animated color change
    const welcomeText = document.createElement("h1");
    welcomeText.classList.add("welcome-text");
    welcomeText.innerText = "Welcome to the Clown Zone!";
    document.body.appendChild(welcomeText);

    // Get the audio element and start button
    let audio = document.getElementById('background-audio');
    let startAudioBtn = document.getElementById('start-audio-btn');
    let moreClownsBtn = document.getElementById('more-clowns-btn');

    // Add event listener for the "Start Music" button to play the audio
    if (startAudioBtn) {
        startAudioBtn.addEventListener('click', function() {
            audio.play();
            startAudioBtn.style.display = 'none'; // Hide the button after starting the audio
        });
    }

    // Add event listener for the "More Clowns" button to navigate to clowns.html
    if (moreClownsBtn) {
        moreClownsBtn.addEventListener('click', function() {
            window.location.href = 'clowns.html';  // Redirects to clowns.html
        });
    }
});
