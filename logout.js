// Dedicated JavaScript file for logout functionality

// Mock functions (replace with actual implementations or imports)
function isLoggedIn() {
    // Replace with your actual login check logic
    return localStorage.getItem("loggedIn") === "true"
  }
  
  function showToast(message, type) {
    // Replace with your actual toast notification logic
    console.log(`Toast: ${message} (${type})`)
  }
  
  function getCurrentUser() {
    // Replace with your actual user retrieval logic
    const userJson = localStorage.getItem("currentUser")
    return userJson ? JSON.parse(userJson) : null
  }
  
  function logout() {
    // Replace with your actual logout logic
    localStorage.removeItem("loggedIn")
    localStorage.removeItem("currentUser")
    showToast("Logged out successfully", "success")
    setTimeout(() => {
      window.location.href = "login.html"
    }, 1000)
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    // Check if user is logged in
    const isUserLoggedIn = isLoggedIn()
  
    // If not logged in, redirect to login page
    if (!isUserLoggedIn) {
      showToast("You are not logged in", "info")
      setTimeout(() => {
        window.location.href = "login.html"
      }, 1000)
      return
    }
  
    // Get user info for personalized message
    const currentUser = getCurrentUser()
    if (currentUser) {
      const userGreeting = document.getElementById("userGreeting")
      if (userGreeting) {
        userGreeting.textContent = `${currentUser.firstName} ${currentUser.lastName}`
      }
    }
  
    // Add event listener to logout button
    const logoutButton = document.getElementById("logoutButton")
    if (logoutButton) {
      logoutButton.addEventListener("click", () => {
        // Show confirmation dialog
        if (confirm("Are you sure you want to log out?")) {
          // Perform logout
          logout()
        }
      })
    }
  
    // Add event listener to cancel button
    const cancelButton = document.getElementById("cancelButton")
    if (cancelButton) {
      cancelButton.addEventListener("click", (e) => {
        e.preventDefault()
        // Redirect back to previous page or home
        window.history.back()
      })
    }
  })
  
  // Function to handle logout with animation
  function animatedLogout() {
    // Show loading state
    const logoutButton = document.getElementById("logoutButton")
    if (logoutButton) {
      logoutButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Logging out...'
      logoutButton.disabled = true
    }
  
    // Perform logout after a short delay for animation
    setTimeout(() => {
      logout()
    }, 800)
  }
  