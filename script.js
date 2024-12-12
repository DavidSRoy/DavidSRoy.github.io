// Initialize cart
let cart = [];

// Function to add product to cart
function addProductToCart(productId) {
    // Check if product is already in cart
    if (cart.includes(productId)) {
        alert("Product is already in cart!");
        return;
    }

    // Add product to cart
    cart.push(productId);

    // Update cart button text
    document.querySelector(".cart-btn").textContent = `Cart (${cart.length})`;
}

// Add event listeners to add to cart buttons
document.querySelectorAll(".add-to-cart-btn").forEach(button => {
    button.addEventListener("click", () => {
        addProductToCart(button.dataset.productId);
    });
});

function openLoginWindow() {
    window.open("login.html", "Login");
}

function closeWindow() {
    window.close();
}
