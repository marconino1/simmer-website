document.addEventListener('DOMContentLoaded', function() {
    // Image paths for the scrolling background
    const imagePaths = [
        'images/food1.jpeg',
        'images/food2.jpeg',
        'images/food3.jpeg',
        'images/food4.jpeg',
        'images/food5.jpeg',
        'images/food6.jpeg',
        'images/food7.jpeg',
        'images/food8.jpeg',
        'images/food9.jpeg',
        'images/food10.jpeg',
        'images/food11.jpeg',
        'images/food12.jpeg',
        'images/food13.jpeg'
    ];
    
    // Get the background container
    const backgroundContainer = document.querySelector('.background-container');
    
    // Calculate number of columns based on screen width
    const columnWidth = 200;
    const screenWidth = window.innerWidth;
    const numColumns = Math.floor((screenWidth * 0.9) / columnWidth);

    // Create alternating columns
    for (let i = 0; i < numColumns; i++) {
        const scrollContainer = document.createElement('div');
        scrollContainer.className = i % 2 === 0 ? 'image-scroll-left' : 'image-scroll-right';
        
        // Rotate the array by i positions for each column
        const rotatedPaths = [
            ...imagePaths.slice(i % imagePaths.length),
            ...imagePaths.slice(0, i % imagePaths.length)
        ];
        
        // Add images to the container with rotated starting point
        rotatedPaths.forEach(path => {
            const img = document.createElement('img');
            img.src = path;
            img.alt = 'Food Image';
            scrollContainer.appendChild(img);
        });
        
        // Duplicate first few images for seamless loop
        for (let j = 0; j < 3; j++) {
            const img = document.createElement('img');
            img.src = rotatedPaths[j];
            img.alt = 'Food Image';
            scrollContainer.appendChild(img);
        }
        
        backgroundContainer.appendChild(scrollContainer);
    }
    
    // Modal functionality
    const modal = document.getElementById('contactModal');
    const btn = document.getElementById('contactBtn');
    const span = document.getElementsByClassName('close')[0];
    
    // Open modal when button is clicked
    btn.onclick = function() {
        modal.style.display = 'block';
    }
    
    // Close modal when X is clicked
    span.onclick = function() {
        modal.style.display = 'none';
    }
    
    // Close modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
    // Email form handling
    const form = document.getElementById('emailForm');
    const emailInput = document.getElementById('email');
    const statusMessage = document.getElementById('emailStatus');
    
    form.addEventListener('submit', function(e) {
        // Validate email
        if (!isValidEmail(emailInput.value)) {
            e.preventDefault();
            showStatus('Please enter a valid email address', 'error');
            return;
        }

        // Store email before clearing
        const submittedEmail = emailInput.value;
        
        // Show success message
        showStatus('Thank you! We\'ll notify you when we launch.', 'success');
        
        // Log the email to Google Forms
        const formData = new FormData();
        formData.append('entry.925780745', submittedEmail); // Using the correct field name
        
        fetch('https://docs.google.com/forms/d/e/1FAIpQLSe0Bgq5X--E2iqvpEYywhiqIhltuDdNjKrPFjMF05zvpT6QzA/formResponse', {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        });

        // Clear the email input
        emailInput.value = '';
        
        // Clear the success message after 6 seconds
        setTimeout(() => {
            statusMessage.textContent = '';
            statusMessage.className = 'status-message';
        }, 6000);
    });

    function isValidEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }

    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = `status-message ${type}`;
    }
}); 