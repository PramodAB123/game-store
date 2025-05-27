// Sample game data
const games = [
    {
        id: 1,
        title: "Cyberpunk 2077",
        image: "images/cyberpunk.jpg",
        price: 39.99,
        originalPrice: 59.99,
        discount: 33,
        featured: true,
        free: false
    },
    {
        id: 2,
        title: "The Witcher 3: Wild Hunt",
        image: "images/witcher3.jpg",
        price: 19.99,
        originalPrice: 39.99,
        discount: 50,
        featured: true,
        free: false
    },
    {
        id: 3,
        title: "Red Dead Redemption 2",
        image: "images/rdr2.jpg",
        price: 49.99,
        originalPrice: 59.99,
        discount: 17,
        featured: true,
        free: false
    },
    {
        id: 4,
        title: "Fortnite",
        image: "images/fortnite.jpg",
        price: 0,
        originalPrice: 0,
        discount: 0,
        featured: false,
        free: true
    },
    {
        id: 5,
        title: "Among Us",
        image: "images/amongus.jpg",
        price: 4.99,
        originalPrice: 4.99,
        discount: 0,
        featured: false,
        free: true
    },
    {
        id: 6,
        title: "GTA V",
        image: "images/gtav.jpg",
        price: 29.99,
        originalPrice: 59.99,
        discount: 50,
        featured: true,
        free: false
    },
    {
        id: 7,
        title: "Valorant",
        image: "images/valorant.jpg",
        price: 0,
        originalPrice: 0,
        discount: 0,
        featured: false,
        free: true
    },
    {
        id: 8,
        title: "Elden Ring",
        image: "images/eldenring.jpg",
        price: 59.99,
        originalPrice: 59.99,
        discount: 0,
        featured: true,
        free: false
    }
];

// Load featured games
function loadFeaturedGames() {
    const featuredContainer = document.getElementById('featured-games');
    const featuredGames = games.filter(game => game.featured);
    
    featuredGames.forEach(game => {
        featuredContainer.innerHTML += createGameCard(game);
    });
}

// Load free games
function loadFreeGames() {
    const freeContainer = document.getElementById('free-games');
    const freeGames = games.filter(game => game.free);
    
    freeGames.forEach(game => {
        freeContainer.innerHTML += createGameCard(game);
    });
}

// Create game card HTML
function createGameCard(game) {
    const discountBadge = game.discount > 0 ? `<span class="discount">-${game.discount}%</span>` : '';
    const originalPrice = game.originalPrice > 0 ? `<span class="original-price">$${game.originalPrice.toFixed(2)}</span>` : '';
    const priceDisplay = game.price > 0 ? 
        `<div class="game-price">
            <div>
                <span class="price">$${game.price.toFixed(2)}</span>
                ${originalPrice}
            </div>
            ${discountBadge}
        </div>` :
        `<div class="game-price">
            <span class="price">FREE</span>
        </div>`;
    
    const buttonText = game.price > 0 ? 'Add to Cart' : 'Get for Free';
    
    return `
        <div class="game-card" data-id="${game.id}">
            <img src="${game.image}" alt="${game.title}" class="game-image">
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                ${priceDisplay}
                <button class="add-to-cart" data-id="${game.id}">${buttonText}</button>
            </div>
        </div>
    `;
}

// Initialize cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// Add to cart function
function addToCart(gameId) {
    const game = games.find(g => g.id === gameId);
    
    if (!game) return;
    
    const existingItem = cart.find(item => item.id === gameId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: game.id,
            title: game.title,
            price: game.price,
            image: game.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${game.title} has been added to your cart!`);
}

// Event delegation for add to cart buttons
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedGames();
    loadFreeGames();
    updateCartCount();
    
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const gameId = parseInt(e.target.getAttribute('data-id'));
            addToCart(gameId);
        }
    });
});