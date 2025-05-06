// Authentication JavaScript for Nike Store

// DOM Elements
const loginForm = document.getElementById("loginForm")
const registerForm = document.getElementById("registerForm")

// User storage
const USERS_STORAGE_KEY = "nikeStoreUsers"
const CURRENT_USER_KEY = "nikeStoreCurrentUser"

// Initialize users array from localStorage
const getUsers = () => {
  return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY)) || []
}

// Save users array to localStorage
const saveUsers = (users) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

// Get current user
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) || null
}

// Set current user
const setCurrentUser = (user) => {
  if (user) {
    // Remove password before storing in localStorage for security
    const { password, ...userWithoutPassword } = user
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword))
  } else {
    localStorage.removeItem(CURRENT_USER_KEY)
  }
}

// Check if user is logged in
const isLoggedIn = () => {
  return getCurrentUser() !== null
}

// Login user
const login = (email, password) => {
  const users = getUsers()
  const user = users.find((u) => u.email === email && u.password === password)

  if (user) {
    setCurrentUser(user)
    return true
  }

  return false
}

// Register user
const register = (userData) => {
  const users = getUsers()

  // Check if email already exists
  if (users.some((u) => u.email === userData.email)) {
    return { success: false, message: "Email already registered" }
  }

  // Add user with default profile image and empty addresses array
  const newUser = {
    id: Date.now().toString(),
    ...userData,
    profileImage: "/placeholder.svg?height=200&width=200",
    addresses: [],
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  saveUsers(users)

  // Auto login after registration
  setCurrentUser(newUser)

  return { success: true }
}

// Update the logout function to include a confirmation dialog
const logout = () => {
  // Show confirmation dialog
  if (!confirm("Are you sure you want to log out?")) {
    return // User canceled the logout
  }

  // Clear user data from localStorage
  setCurrentUser(null)

  // Show toast notification
  showToast("You have been logged out successfully", "info")

  // Redirect to home page after a short delay
  setTimeout(() => {
    window.location.href = "index.html"
  }, 1000)
}

// Update user profile
const updateProfile = (userData) => {
  const currentUser = getCurrentUser()
  if (!currentUser) return false

  const users = getUsers()
  const userIndex = users.findIndex((u) => u.id === currentUser.id)

  if (userIndex === -1) return false

  // Update user data
  users[userIndex] = {
    ...users[userIndex],
    ...userData,
    updatedAt: new Date().toISOString(),
  }

  saveUsers(users)
  setCurrentUser(users[userIndex])
  return true
}

// Change password
const changePassword = (currentPassword, newPassword) => {
  const currentUser = getCurrentUser()
  if (!currentUser) return false

  const users = getUsers()
  const userIndex = users.findIndex((u) => u.id === currentUser.id)

  if (userIndex === -1) return false

  // Need to get the full user with password
  const fullUser = users[userIndex]

  // Verify current password
  if (fullUser.password !== currentPassword) {
    return { success: false, message: "Current password is incorrect" }
  }

  // Update password
  users[userIndex].password = newPassword
  users[userIndex].updatedAt = new Date().toISOString()

  saveUsers(users)
  return { success: true, message: "Password updated successfully" }
}

// Add address to user profile
const addAddress = (address) => {
  const currentUser = getCurrentUser()
  if (!currentUser) return false

  const users = getUsers()
  const userIndex = users.findIndex((u) => u.id === currentUser.id)

  if (userIndex === -1) return false

  // Add address with unique ID
  const newAddress = {
    id: Date.now().toString(),
    ...address,
    createdAt: new Date().toISOString(),
  }

  if (!users[userIndex].addresses) {
    users[userIndex].addresses = []
  }

  users[userIndex].addresses.push(newAddress)
  users[userIndex].updatedAt = new Date().toISOString()

  saveUsers(users)
  setCurrentUser(users[userIndex])
  return true
}

// Remove address from user profile
const removeAddress = (addressId) => {
  const currentUser = getCurrentUser()
  if (!currentUser) return false

  const users = getUsers()
  const userIndex = users.findIndex((u) => u.id === currentUser.id)

  if (userIndex === -1) return false

  // Remove address
  users[userIndex].addresses = users[userIndex].addresses.filter((a) => a.id !== addressId)
  users[userIndex].updatedAt = new Date().toISOString()

  saveUsers(users)
  setCurrentUser(users[userIndex])
  return true
}

// Update profile image
const updateProfileImage = (imageUrl) => {
  return updateProfile({ profileImage: imageUrl })
}

// Toast Notification
const showToast = (message, type = "info") => {
  // Remove existing toasts
  const existingToasts = document.querySelectorAll(".toast")
  existingToasts.forEach((toast) => toast.remove())

  // Create new toast
  const toast = document.createElement("div")
  toast.className = `toast toast-${type}`
  toast.innerHTML = `
    <div class="flex items-center">
      <i class="fas ${
        type === "success"
          ? "fa-check-circle text-green-500"
          : type === "error"
            ? "fa-exclamation-circle text-red-500"
            : "fa-info-circle text-blue-500"
      } mr-2"></i>
      <p>${message}</p>
    </div>
  `

  // Add to DOM
  document.body.appendChild(toast)

  // Show toast
  setTimeout(() => {
    toast.classList.add("show")
  }, 10)

  // Hide toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show")
    setTimeout(() => {
      toast.remove()
    }, 300)
  }, 3000)
}

// Handle login form submission
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    // Simple validation
    if (!email || !password) {
      showToast("Please fill in all fields", "error")
      return
    }

    // Check if we have users in localStorage
    const users = getUsers()

    // For demo purposes, if no users exist, create a demo account
    if (users.length === 0) {
      const demoUser = {
        id: "1",
        firstName: "Demo",
        lastName: "User",
        email: "demo@example.com",
        password: "Password123!",
        profileImage: "/placeholder.svg?height=200&width=200",
        addresses: [],
        createdAt: new Date().toISOString(),
      }

      saveUsers([demoUser])

      // If the entered credentials match the demo account, log them in
      if (email === demoUser.email && password === demoUser.password) {
        login(email, password)
        showToast("Login successful!", "success")
        setTimeout(() => {
          window.location.href = "index.html"
        }, 1500)
        return
      }
    }

    // Attempt login
    if (login(email, password)) {
      showToast("Login successful!", "success")
      setTimeout(() => {
        window.location.href = "index.html"
      }, 1500)
    } else {
      showToast("Invalid email or password", "error")
    }
  })
}

// Handle registration form submission
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const firstName = document.getElementById("firstName").value
    const lastName = document.getElementById("lastName").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const confirmPassword = document.getElementById("confirmPassword").value
    const termsCheckbox = document.getElementById("terms")

    // Simple validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      showToast("Please fill in all fields", "error")
      return
    }

    if (password !== confirmPassword) {
      showToast("Passwords do not match", "error")
      return
    }

    // Password strength validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
    if (!passwordRegex.test(password)) {
      showToast("Password does not meet requirements", "error")
      return
    }

    if (termsCheckbox && !termsCheckbox.checked) {
      showToast("Please agree to the Terms of Service", "error")
      return
    }

    // Register user
    const result = register({
      firstName,
      lastName,
      email,
      password,
    })

    if (result.success) {
      showToast("Registration successful! Redirecting to home page...", "success")
      setTimeout(() => {
        window.location.href = "index.html"
      }, 1500)
    } else {
      showToast(result.message, "error")
    }
  })
}

// Update UI based on authentication state
const updateAuthUI = () => {
  const currentUser = getCurrentUser()
  const authLinks = document.querySelectorAll(".auth-links")
  const mobileAuthLinks = document.querySelectorAll(".mobile-auth-links")

  if (currentUser) {
    // User is logged in - update desktop nav with prominent buttons
    authLinks.forEach((el) => {
      el.innerHTML = `
        <div class="flex items-center space-x-3">
          <span class="text-gray-600 dark:text-gray-300">Hi, ${currentUser.firstName}</span>
          
          <a href="profile.html" class="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 px-4 rounded-lg transition-all duration-300">
            <i class="fas fa-user-circle mr-1"></i>
            <span>Profile</span>
          </a>
          
          <button onclick="logout()" class="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-all duration-300">
            <i class="fas fa-sign-out-alt mr-1"></i>
            <span>Logout</span>
          </button>
        </div>
      `
    })

    // Update mobile nav with prominent buttons
    mobileAuthLinks.forEach((el) => {
      el.innerHTML = `
        <div class="border-t border-gray-200 dark:border-gray-700 pt-3 mt-2">
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Logged in as ${currentUser.firstName} ${currentUser.lastName}</p>
          
          <div class="grid grid-cols-2 gap-2">
            <a href="profile.html" class="flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 px-3 rounded-lg transition-all duration-300">
              <i class="fas fa-user-circle mr-2"></i>
              <span>Profile</span>
            </a>
            
            <button onclick="logout()" class="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg transition-all duration-300">
              <i class="fas fa-sign-out-alt mr-2"></i>
              <span>Logout</span>
            </button>
          </div>
        </div>
      `
    })
  } else {
    // User is not logged in - update desktop nav
    authLinks.forEach((el) => {
      el.innerHTML = `
        <div class="flex items-center space-x-3">
          <a href="login.html" class="hover:text-red-500 font-medium">Login</a>
          <a href="register.html" class="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-full transition-all duration-300">Register</a>
        </div>
      `
    })

    // Update mobile nav
    mobileAuthLinks.forEach((el) => {
      el.innerHTML = `
        <a href="login.html" class="hover:text-red-500 font-medium">Login</a>
        <a href="register.html" class="hover:text-red-500 font-medium">Register</a>
      `
    })
  }
}

// Call this on page load
document.addEventListener("DOMContentLoaded", updateAuthUI)

// Expose functions to global scope for use in HTML
window.login = login
window.register = register
window.logout = logout
window.updateProfile = updateProfile
window.changePassword = changePassword
window.isLoggedIn = isLoggedIn
window.getCurrentUser = getCurrentUser
window.addAddress = addAddress
window.removeAddress = removeAddress
window.updateProfileImage = updateProfileImage
window.showToast = showToast
