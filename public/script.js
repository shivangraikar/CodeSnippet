// public/script.js

// Example function to fetch snippets
async function fetchSnippets() {
    try {
      const response = await fetch('/snippets');
      const snippets = await response.json();
      console.log(snippets);
      // Handle snippets data
    } catch (error) {
      console.error(error);
    }
  }
  
  // Example function to create snippet
  async function createSnippet(data) {
    try {
      const response = await fetch('/snippets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const snippet = await response.json();
      console.log(snippet);
      // Handle newly created snippet
    } catch (error) {
      console.error(error);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Add event listener for the signup form
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const email = formData.get('email');
            const password = formData.get('password');
            try {
                const response = await fetch('/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
                if (response.ok) {
                    window.location.href = '/login'; // Redirect to login page after successful signup
                } else {
                    const errorMessage = await response.json();
                    document.getElementById('error-message').textContent = errorMessage.message; // Display server-side error message
                }
            } catch (error) {
                console.error(error);
            }
        });
    } else {
        console.error('Signup form not found in the document');
    }
});



// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Add event listener for the login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        try {
          const response = await fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
          });
          if (response.ok) {
            window.location.href = '/dashboard'; // Redirect to dashboard after successful login
          } else {
            const errorMessage = await response.json();
            displayErrorMessage(errorMessage.message); // Display error message to the user
          }
        } catch (error) {
          console.error(error);
        }
      });
    } else {
      console.error('Login form not found in the document');
    }
  });
  
  function displayErrorMessage(message) {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = message;
    errorMessageElement.classList.remove('hidden');
  }
  