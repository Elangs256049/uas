// Main JavaScript for Nike Store

// DOM Elements
const body = document.body
const navbar = document.querySelector("header")
const mobileMenuButton = document.getElementById("mobileMenuButton")
const mobileMenu = document.getElementById("mobileMenu")
const darkToggle = document.getElementById("darkToggle")
const mobileDarkToggle = document.getElementById("mobileDarkToggle")
const backToTopButton = document.getElementById("backToTop")

// Check if current page requires authentication
document.addEventListener("DOMContentLoaded", () => {
  // List of pages that require authentication
  const protectedPages = ["profile.html", "orders.html", "wishlist.html"]

  // Get current page filename
  const currentPage = window.location.pathname.split("/").pop()

  // Check if current page requires authentication and user is not logged in
  const isLoggedIn = () => {
    // Replace this with your actual authentication check
    // For example, check if a token exists in localStorage
    return localStorage.getItem("authToken") !== null
  }

  if (protectedPages.includes(currentPage) && !isLoggedIn()) {
    showToast("Please login to access this page", "error")
    setTimeout(() => {
      window.location.href = "login.html"
    }, 1500)
  }
})

// Cart Elements
const cartButton = document.getElementById("cartButton")
const mobileCartButton = document.getElementById("mobileCartButton")
const closeCart = document.getElementById("closeCart")
const cartSidebar = document.getElementById("cartSidebar")
const cartOverlay = document.getElementById("cartOverlay")
const cartCount = document.getElementById("cartCount")
const mobileCartCount = document.getElementById("mobileCartCount")
const cartItems = document.getElementById("cartItems")
const cartTotal = document.getElementById("cartTotal")

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem("nikeCart")) || []

// Update cart counts on page load
document.addEventListener("DOMContentLoaded", () => {
  // Initialize dark mode
  if (localStorage.getItem("darkMode") === "enabled") {
    document.documentElement.classList.add("dark")
  }

  // Update cart display
  updateCart()

  // Add scroll event listener for navbar
  window.addEventListener("scroll", handleScroll)
})

// Mobile Menu Toggle
if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden")
    // Toggle icon
    const icon = mobileMenuButton.querySelector("i")
    if (icon.classList.contains("fa-bars")) {
      icon.classList.remove("fa-bars")
      icon.classList.add("fa-times")
    } else {
      icon.classList.remove("fa-times")
      icon.classList.add("fa-bars")
    }
  })
}

// Dark Mode Toggle
const toggleDarkMode = () => {
  document.documentElement.classList.toggle("dark")
  // Save preference to localStorage
  if (document.documentElement.classList.contains("dark")) {
    localStorage.setItem("darkMode", "enabled")
  } else {
    localStorage.removeItem("darkMode")
  }
}

if (darkToggle) {
  darkToggle.addEventListener("click", toggleDarkMode)
}

if (mobileDarkToggle) {
  mobileDarkToggle.addEventListener("click", toggleDarkMode)
}

// Shopping Cart Functions
const openCart = () => {
  if (cartSidebar && cartOverlay) {
    cartSidebar.classList.remove("translate-x-full")
    cartOverlay.classList.remove("hidden")
    document.body.style.overflow = "hidden"
  }
}

const closeCartFunc = () => {
  if (cartSidebar && cartOverlay) {
    cartSidebar.classList.add("translate-x-full")
    cartOverlay.classList.add("hidden")
    document.body.style.overflow = ""
  }
}

if (cartButton) {
  cartButton.addEventListener("click", openCart)
}

if (mobileCartButton) {
  mobileCartButton.addEventListener("click", openCart)
}

if (closeCart) {
  closeCart.addEventListener("click", closeCartFunc)
}

if (cartOverlay) {
  cartOverlay.addEventListener("click", closeCartFunc)
}

// Add to Cart
const addToCart = (id, name, price) => {
  // Check if item already in cart
  const existingItem = cart.find((item) => item.id === id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ id, name, price, quantity: 1 })
  }

  // Save to localStorage
  localStorage.setItem("nikeCart", JSON.stringify(cart))

  // Update cart display
  updateCart()

  // Show notification
  showToast(`${name} added to cart!`, "success")

  // Open cart
  openCart()
}

// Initialize product buttons
const initProductButtons = () => {
  document.querySelectorAll(".product-add").forEach((button) => {
    button.addEventListener("click", (e) => {
      const target = e.currentTarget
      const id = target.getAttribute("data-id")
      const name = target.getAttribute("data-name")
      const price = Number.parseFloat(target.getAttribute("data-price"))

      addToCart(id, name, price)
    })
  })
}

// Call this on page load
initProductButtons()

// Update Cart Display
const updateCart = () => {
  if (!cartCount || !mobileCartCount) return

  // Update count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  cartCount.textContent = totalItems
  mobileCartCount.textContent = totalItems

  // Update items list
  if (!cartItems || !cartTotal) return

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="text-center text-gray-500 dark:text-gray-400">Your cart is empty</p>'
    cartTotal.textContent = "$0.00"
    return
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
    <div class="flex justify-between items-center border-b pb-3 mb-3">
      <div>
        <h5 class="font-medium">${item.name}</h5>
        <p class="text-gray-500 dark:text-gray-400 text-sm">$${item.price.toFixed(2)} × ${item.quantity}</p>
      </div>
      <div class="flex items-center">
        <span class="font-medium mr-4">$${(item.price * item.quantity).toFixed(2)}</span>
        <button class="remove-item text-red-500 hover:text-red-700" data-id="${item.id}">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  `,
    )
    .join("")

  // Update total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  cartTotal.textContent = `$${total.toFixed(2)}`

  // Add event listeners to remove buttons
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.currentTarget.getAttribute("data-id")
      removeFromCart(id)
    })
  })
}

// Remove from Cart
const removeFromCart = (id) => {
  cart = cart.filter((item) => item.id !== id)

  // Save to localStorage
  localStorage.setItem("nikeCart", JSON.stringify(cart))

  // Update cart display
  updateCart()

  // Show notification
  showToast("Item removed from cart", "info")
}

// Back to Top Button
if (backToTopButton) {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.remove("opacity-0", "invisible")
      backToTopButton.classList.add("opacity-100", "visible")
    } else {
      backToTopButton.classList.remove("opacity-100", "visible")
      backToTopButton.classList.add("opacity-0", "invisible")
    }
  })

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  })
}

// Navbar Scroll Effect
const handleScroll = () => {
  if (window.scrollY > 50) {
    navbar.classList.add("navbar-scrolled")
  } else {
    navbar.classList.remove("navbar-scrolled")
  }
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

// Image Lazy Loading
const lazyLoadImages = () => {
  const lazyImages = document.querySelectorAll("img[data-src]")

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.removeAttribute("data-src")
          imageObserver.unobserve(img)
        }
      })
    })

    lazyImages.forEach((img) => {
      imageObserver.observe(img)
    })
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyImages.forEach((img) => {
      img.src = img.dataset.src
      img.removeAttribute("data-src")
    })
  }
}

// Call lazy loading on page load
document.addEventListener("DOMContentLoaded", lazyLoadImages)

// Expose functions to global scope for use in HTML
window.addToCart = addToCart
window.removeFromCart = removeFromCart
window.showToast = showToast
