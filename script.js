// Selecting elements from the DOM
var block = document.getElementById("block"); // Block element
var hole = document.getElementById("hole"); // Hole element
var character = document.getElementById("character"); // Character element

// Variables for game mechanics
var jumping = 0; // Flag to track if the character is jumping
var counter = 0; // Counter for scoring

// Event listener for when the animation of the hole repeats
hole.addEventListener('animationiteration', () => {
    // Generate a random position for the hole
    var random = -((Math.random() * 300) + 150); // Random position calculation
    hole.style.top = random + "px"; // Set the hole's top position
    counter++; // Increase the counter for scoring
});

// Interval function for game mechanics
setInterval(function(){
    // Get the current position of the character
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));

    // Move the character down if not jumping
    if (jumping == 0) {
        character.style.top = (characterTop + 3) + "px"; // Move character down
    }

    // Get positions of other elements for collision detection
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var cTop = -(500 - characterTop); // Calculate character's top relative to the hole

    // Check for collisions and game over conditions
    if ((characterTop > 480) || ((blockLeft < 20) && (blockLeft > -50) && ((cTop < holeTop) || (cTop > holeTop + 130)))) {
        alert("Game over. Score: " + (counter - 1)); // Show game over alert with score
        character.style.top = 100 + "px"; // Reset character position
        counter = 0; // Reset counter
    }
}, 10); // Interval timing for game loop

// Function for character jump
function jump(){
    jumping = 1; // Set jumping flag
    let jumpCount = 0; // Jump counter

    // Interval for character jump animation
    var jumpInterval = setInterval(function(){
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));

        // Move character up during jump animation
        if ((characterTop > 6) && (jumpCount < 15)) {
            character.style.top = (characterTop - 5) + "px"; // Move character up
        }

        // End jump animation after a certain count
        if (jumpCount > 20) {
            clearInterval(jumpInterval); // Clear jump interval
            jumping = 0; // Reset jumping flag
            jumpCount = 0; // Reset jump count
        }

        jumpCount++; // Increment jump count
    }, 10); // Interval timing for jump animation
}
