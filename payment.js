// Cart, Payment, and Order History JavaScript

document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const cartButton = document.getElementById("cartButton")
    const mobileCartButton = document.getElementById("mobileCartButton")
    const cartSidebar = document.getElementById("cartSidebar")
    const cartOverlay = document.getElementById("cartOverlay")
    const closeCart = document.getElementById("closeCart")
    const cartPaymentContainer = document.getElementById("cart-payment-container")
    const closeCartPayment = document.getElementById("close-cart-payment")
  
    // Tab Navigation
    const cartTabBtn = document.getElementById("cart-tab-btn")
    const paymentTabBtn = document.getElementById("payment-tab-btn")
    const historyTabBtn = document.getElementById("history-tab-btn")
    const cartTab = document.getElementById("cart-tab")
    const paymentTab = document.getElementById("payment-tab")
    const historyTab = document.getElementById("history-tab")
  
    // Cart Elements
    const emptyCart = document.getElementById("empty-cart")
    const cartItemsList = document.getElementById("cart-items-list")
    const cartItemsBody = document.getElementById("cart-items-body")
    const cartSubtotal = document.getElementById("cart-subtotal")
    const cartShipping = document.getElementById("cart-shipping")
    const cartTax = document.getElementById("cart-tax")
    const cartTotal = document.getElementById("cart-total")
  
    // Payment Elements
    const paymentOrderItems = document.getElementById("payment-order-items")
    const paymentSubtotal = document.getElementById("payment-subtotal")
    const paymentShipping = document.getElementById("payment-shipping")
    const paymentTax = document.getElementById("payment-tax")
    const paymentTotal = document.getElementById("payment-total")
  
    // Buttons
    const startShoppingBtn = document.getElementById("start-shopping-btn")
    const continueShoppingBtn = document.getElementById("continue-shopping-btn")
    const proceedToCheckoutBtn = document.getElementById("proceed-to-checkout-btn")
    const backToCartBtn = document.getElementById("back-to-cart-btn")
    const placeOrderBtn = document.getElementById("place-order-btn")
  
    // Order History Elements
    const emptyHistory = document.getElementById("empty-history")
    const orderHistoryList = document.getElementById("order-history-list")
    const orderDetailsBtns = document.querySelectorAll(".order-details-btn")
    const orderDetailsModal = document.getElementById("order-details-modal")
    const closeOrderDetails = document.getElementById("close-order-details")
  
    // Open Cart Sidebar
    if (cartButton) {
      cartButton.addEventListener("click", () => {
        cartSidebar.classList.remove("translate-x-full")
        cartOverlay.classList.remove("hidden")
        document.body.style.overflow = "hidden"
      })
    }
  
    if (mobileCartButton) {
      mobileCartButton.addEventListener("click", () => {
        cartSidebar.classList.remove("translate-x-full")
        cartOverlay.classList.remove("hidden")
        document.body.style.overflow = "hidden"
      })
    }
  
    // Close Cart Sidebar
    if (closeCart) {
      closeCart.addEventListener("click", () => {
        cartSidebar.classList.add("translate-x-full")
        cartOverlay.classList.add("hidden")
        document.body.style.overflow = ""
      })
    }
  
    if (cartOverlay) {
      cartOverlay.addEventListener("click", () => {
        cartSidebar.classList.add("translate-x-full")
        cartOverlay.classList.add("hidden")
        document.body.style.overflow = ""
      })
    }
  
    // Open Full Cart Page
    const openFullCart = () => {
      cartPaymentContainer.classList.remove("hidden")
      document.body.style.overflow = "hidden"
  
      // Show cart tab by default
      showTab("cart-tab")
  
      // Update cart display
      updateCartDisplay()
    }
  
    // Close Full Cart Page
    if (closeCartPayment) {
      closeCartPayment.addEventListener("click", () => {
        cartPaymentContainer.classList.add("hidden")
        document.body.style.overflow = ""
      })
    }
  
    // Tab Navigation
    const showTab = (tabId) => {
      // Hide all tabs
      cartTab.classList.add("hidden")
      paymentTab.classList.add("hidden")
      historyTab.classList.add("hidden")
  
      // Remove active class from all tab buttons
      cartTabBtn.classList.remove("active", "border-red-600", "text-red-600")
      paymentTabBtn.classList.remove("active", "border-red-600", "text-red-600")
      historyTabBtn.classList.remove("active", "border-red-600", "text-red-600")
  
      cartTabBtn.classList.add("border-transparent")
      paymentTabBtn.classList.add("border-transparent")
      historyTabBtn.classList.add("border-transparent")
  
      // Show selected tab and add active class to tab button
      document.getElementById(tabId).classList.remove("hidden")
  
      if (tabId === "cart-tab") {
        cartTabBtn.classList.add("active", "border-red-600", "text-red-600")
        cartTabBtn.classList.remove("border-transparent")
      } else if (tabId === "payment-tab") {
        paymentTabBtn.classList.add("active", "border-red-600", "text-red-600")
        paymentTabBtn.classList.remove("border-transparent")
      } else if (tabId === "history-tab") {
        historyTabBtn.classList.add("active", "border-red-600", "text-red-600")
        historyTabBtn.classList.remove("border-transparent")
      }
    }
  
    if (cartTabBtn) {
      cartTabBtn.addEventListener("click", () => showTab("cart-tab"))
    }
  
    if (paymentTabBtn) {
      paymentTabBtn.addEventListener("click", () => showTab("payment-tab"))
    }
  
    if (historyTabBtn) {
      historyTabBtn.addEventListener("click", () => showTab("history-tab"))
    }
  
    // Update Cart Display
    const updateCartDisplay = () => {
      // Get cart from localStorage
      const cart = JSON.parse(localStorage.getItem("nikeCart")) || []
  
      if (cart.length === 0) {
        // Show empty cart message
        if (emptyCart) emptyCart.classList.remove("hidden")
        if (cartItemsList) cartItemsList.classList.add("hidden")
      } else {
        // Show cart items
        if (emptyCart) emptyCart.classList.add("hidden")
        if (cartItemsList) cartItemsList.classList.remove("hidden")
  
        // Generate cart items HTML
        if (cartItemsBody) {
          cartItemsBody.innerHTML = cart
            .map(
              (item, index) => `
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <td class="py-4 px-2">
                <div class="flex items-center gap-4">
                  <img src="https://i.pinimg.com/736x/d7/65/d3/d765d3934a6efd8840e03e613f3bf2d7.jpg" alt="${item.name}" class="w-16 h-16 object-contain">
                  <div>
                    <h4 class="font-medium">${item.name}</h4>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Size: US 9 | Color: Black</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-2 text-center">$${item.price.toFixed(2)}</td>
              <td class="py-4 px-2 text-center">
                <div class="flex items-center justify-center">
                  <button class="quantity-decrease px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-l" data-index="${index}">-</button>
                  <input type="number" value="${item.quantity}" min="1" max="10" class="w-12 text-center border-y border-gray-300 dark:border-gray-600 py-1" data-index="${index}">
                  <button class="quantity-increase px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-r" data-index="${index}">+</button>
                </div>
              </td>
              <td class="py-4 px-2 text-center font-medium">$${(item.price * item.quantity).toFixed(2)}</td>
              <td class="py-4 px-2 text-right">
                <button class="remove-item text-red-500 hover:text-red-700" data-index="${index}">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          `,
            )
            .join("")
  
          // Add event listeners to quantity buttons and remove buttons
          document.querySelectorAll(".quantity-decrease").forEach((button) => {
            button.addEventListener("click", () => {
              const index = Number.parseInt(button.getAttribute("data-index"))
              if (cart[index].quantity > 1) {
                cart[index].quantity--
                localStorage.setItem("nikeCart", JSON.stringify(cart))
                updateCartDisplay()
              }
            })
          })
  
          document.querySelectorAll(".quantity-increase").forEach((button) => {
            button.addEventListener("click", () => {
              const index = Number.parseInt(button.getAttribute("data-index"))
              if (cart[index].quantity < 10) {
                cart[index].quantity++
                localStorage.setItem("nikeCart", JSON.stringify(cart))
                updateCartDisplay()
              }
            })
          })
  
          document.querySelectorAll(".remove-item").forEach((button) => {
            button.addEventListener("click", () => {
              const index = Number.parseInt(button.getAttribute("data-index"))
              cart.splice(index, 1)
              localStorage.setItem("nikeCart", JSON.stringify(cart))
              updateCartDisplay()
            })
          })
        }
  
        // Calculate totals
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
        const shipping = subtotal > 100 ? 0 : 10
        const tax = subtotal * 0.08 // 8% tax
        const total = subtotal + shipping + tax
  
        // Update cart summary
        if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`
        if (cartShipping) cartShipping.textContent = shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`
        if (cartTax) cartTax.textContent = `$${tax.toFixed(2)}`
        if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`
  
        // Update payment order items
        if (paymentOrderItems) {
          paymentOrderItems.innerHTML = cart
            .map(
              (item) => `
            <div class="flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-600">
              <img src="https://i.pinimg.com/736x/d7/65/d3/d765d3934a6efd8840e03e613f3bf2d7.jpg" alt="${item.name}" class="w-16 h-16 object-contain">
              <div class="flex-grow">
                <h4 class="font-medium">${item.name}</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Size: US 9 | Color: Black</p>
                <div class="flex justify-between mt-1">
                  <span class="text-sm">Qty: ${item.quantity}</span>
                  <span class="font-medium">$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          `,
            )
            .join("")
        }
  
        // Update payment summary
        if (paymentSubtotal) paymentSubtotal.textContent = `$${subtotal.toFixed(2)}`
        if (paymentShipping) paymentShipping.textContent = shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`
        if (paymentTax) paymentTax.textContent = `$${tax.toFixed(2)}`
        if (paymentTotal) paymentTotal.textContent = `$${total.toFixed(2)}`
      }
    }
  
    // Button Event Listeners
    if (startShoppingBtn) {
      startShoppingBtn.addEventListener("click", () => {
        cartPaymentContainer.classList.add("hidden")
        document.body.style.overflow = ""
      })
    }
  
    if (continueShoppingBtn) {
      continueShoppingBtn.addEventListener("click", () => {
        cartPaymentContainer.classList.add("hidden")
        document.body.style.overflow = ""
      })
    }
  
    if (proceedToCheckoutBtn) {
      proceedToCheckoutBtn.addEventListener("click", () => {
        showTab("payment-tab")
      })
    }
  
    if (backToCartBtn) {
      backToCartBtn.addEventListener("click", () => {
        showTab("cart-tab")
      })
    }
  
    if (placeOrderBtn) {
      placeOrderBtn.addEventListener("click", () => {
        // Validate form
        const firstName = document.getElementById("first-name").value
        const lastName = document.getElementById("last-name").value
        const email = document.getElementById("email").value
        const address = document.getElementById("address").value
        const city = document.getElementById("city").value
        const postalCode = document.getElementById("postal-code").value
        const country = document.getElementById("country").value
        const phone = document.getElementById("phone").value
  
        if (!firstName || !lastName || !email || !address || !city || !postalCode || !country || !phone) {
          alert("Please fill in all required fields")
          return
        }
  
        // Get cart
        const cart = JSON.parse(localStorage.getItem("nikeCart")) || []
  
        if (cart.length === 0) {
          alert("Your cart is empty")
          return
        }
  
        // Create order
        const order = {
          id: `NKE${Math.floor(Math.random() * 90000000) + 10000000}`,
          date: new Date().toISOString(),
          status: "Processing",
          items: cart,
          shipping: {
            firstName,
            lastName,
            email,
            address,
            city,
            postalCode,
            country,
            phone,
          },
          payment: {
            method: document.querySelector('input[name="payment-method"]:checked').value,
            cardNumber: document.getElementById("card-number").value,
            cardExpiry: document.getElementById("expiry-date").value,
            cardCVV: document.getElementById("cvv").value,
            cardName: document.getElementById("card-name").value,
          },
          subtotal: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
          shipping: cart.reduce((sum, item) => sum + item.price * item.quantity, 0) > 100 ? 0 : 10,
          tax: cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.08,
        }
  
        // Save order to localStorage
        const orders = JSON.parse(localStorage.getItem("nikeOrders")) || []
        orders.unshift(order)
        localStorage.setItem("nikeOrders", JSON.stringify(orders))
  
        // Clear cart
        localStorage.setItem("nikeCart", JSON.stringify([]))
  
        // Show success message
        alert("Order placed successfully!")
  
        // Redirect to order history
        showTab("history-tab")
        updateOrderHistory()
      })
    }
  
    // Order History
    const updateOrderHistory = () => {
      const orders = JSON.parse(localStorage.getItem("nikeOrders")) || []
  
      if (orders.length === 0) {
        // Show empty history message
        if (emptyHistory) emptyHistory.classList.remove("hidden")
        if (orderHistoryList) orderHistoryList.classList.add("hidden")
      } else {
        // Show order history
        if (emptyHistory) emptyHistory.classList.add("hidden")
        if (orderHistoryList) orderHistoryList.classList.remove("hidden")
      }
    }
  
    // Order Details
    if (orderDetailsBtns) {
      orderDetailsBtns.forEach((button) => {
        button.addEventListener("click", () => {
          const orderId = button.getAttribute("data-order-id")
  
          // Show order details modal
          if (orderDetailsModal) {
            orderDetailsModal.classList.remove("hidden")
            document.body.style.overflow = "hidden"
  
            // Update order details content
            document.getElementById("order-details-id").textContent = `Order #${orderId}`
          }
        })
      })
    }
  
    if (closeOrderDetails) {
      closeOrderDetails.addEventListener("click", () => {
        orderDetailsModal.classList.add("hidden")
        document.body.style.overflow = ""
      })
    }
  
    // Initialize
    updateCartDisplay()
    updateOrderHistory()
  })
  