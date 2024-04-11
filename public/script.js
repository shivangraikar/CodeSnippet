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

  document.getElementById('signup-form').addEventListener('submit', async (event) => {
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
        console.error(errorMessage);
        // Display error message to the user
      }
    } catch (error) {
      console.error(error);
    }
  });
  