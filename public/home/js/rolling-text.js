document.addEventListener('DOMContentLoaded', function() {
    // Initialize after a short delay to ensure DOM is fully loaded
    setTimeout(() => {
        const phrases = document.querySelectorAll('.rolling-text span');
        const rollingContainer = document.querySelector('.rolling-text');
        let currentIndex = 0;
        
        if (phrases.length === 0) return; // Exit if no phrases found
    
        // Calculate the maximum width needed for all phrases
        let maxWidth = 0;
        phrases.forEach(phrase => {
            phrase.style.position = 'static';
            phrase.style.visibility = 'hidden';
            phrase.style.opacity = '1';
            const width = phrase.offsetWidth;
            if (width > maxWidth) maxWidth = width;
            phrase.style.position = 'absolute';
            phrase.style.visibility = 'visible';
            phrase.style.opacity = '0';
        });
        
        // Set the container width to the maximum width
        rollingContainer.style.width = maxWidth + 'px';
        
        // Make sure all phrases are hidden initially
        phrases.forEach(phrase => {
            phrase.style.opacity = "0";
            phrase.style.transform = "rotateX(-90deg)";
        });
        
        // Set the first phrase as active after a small delay
        setTimeout(() => {
            phrases[0].classList.add('active');
        }, 200);
        
        // Change phrase every 5 seconds
        setInterval(() => {
            // Remove active class from current phrase and add inactive
            phrases[currentIndex].classList.remove('active');
            phrases[currentIndex].classList.add('inactive');
            
            // Update index to next phrase
            currentIndex = (currentIndex + 1) % phrases.length;
            
            // Small delay before showing the new phrase
            setTimeout(() => {
                // Remove inactive class from all phrases
                phrases.forEach(phrase => {
                    phrase.classList.remove('inactive');
                });
                
                // Add active class to new current phrase
                phrases[currentIndex].classList.add('active');
            }, 500);
        }, 5000);
    }, 100);
});
