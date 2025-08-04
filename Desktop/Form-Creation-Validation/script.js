// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Select the form and feedback div elements
    const form = document.getElementById('registration-form');
    const feedbackDiv = document.getElementById('form-feedback');
    
    // Add submit event listener to the form
    form.addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();
        
        // Get and trim the input values
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        
        // Initialize validation variables
        let isValid = true;
        const messages = [];
        
        // Validate username
        if (username.length < 3) {
            isValid = false;
            messages.push('Username must be at least 3 characters long');
        }
        
        // Validate email
        if (!email.includes('@') || !email.includes('.')) {
            isValid = false;
            messages.push('Please enter a valid email address');
        }
        
        // Validate password
        if (password.length < 8) {
            isValid = false;
            messages.push('Password must be at least 8 characters long');
        }
        
        // Display feedback
        feedbackDiv.style.display = 'block';
        
        if (isValid) {
            feedbackDiv.textContent = 'Registration successful!';
            feedbackDiv.style.color = '#28a745';
            feedbackDiv.style.backgroundColor = '#d4edda';
            form.reset(); // Clear the form on success
        } else {
            feedbackDiv.innerHTML = messages.join('<br>');
            feedbackDiv.style.color = '#dc3545';
            feedbackDiv.style.backgroundColor = '#ffbaba';
        }
    });
});
