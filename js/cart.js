// Display cart items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty. <a href="games.html">Browse games</a></p>';
        updateSummary();
        return;
    }
    
    cart.forEach(item => {
        const game = games.find(g => g.id === item.id);
        
        if (!game) return;
        
        cartItemsContainer.innerHTML += `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-info">
                    <h3>${item.title}</h3>
                    <div class="cart-item-price">$${game.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        <button class="remove-btn" data-id="${item.id}">Remove</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    updateSummary();
}

// Update order summary
function updateSummary() {
    const subtotal = cart.reduce((sum, item) => {
        const game = games.find(g => g.id === item.id);
        return sum + (game.price * item.quantity);
    }, 0);
    
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Update quantity
function updateQuantity(gameId, change) {
    const itemIndex = cart.findIndex(item => item.id === gameId);
    
    if (itemIndex === -1) return;
    
    cart[itemIndex].quantity += change;
    
    if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

// Remove item
function removeItem(gameId) {
    cart = cart.filter(item => item.id !== gameId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

// Initialize cart page
document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
    
    // Event delegation for quantity buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('quantity-btn')) {
            const gameId = parseInt(e.target.getAttribute('data-id'));
            
            if (e.target.classList.contains('plus')) {
                updateQuantity(gameId, 1);
            } else if (e.target.classList.contains('minus')) {
                updateQuantity(gameId, -1);
            }
        }
        
        if (e.target.classList.contains('remove-btn')) {
            const gameId = parseInt(e.target.getAttribute('data-id'));
            removeItem(gameId);
        }
    });
    
    // Checkout button
    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        alert('Checkout functionality would be implemented here!');
    });
});