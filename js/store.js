// Load all games for store page
function loadAllGames() {
    const gamesContainer = document.getElementById('all-games');
    
    games.forEach(game => {
        gamesContainer.innerHTML += createGameCard(game);
    });
}

// Filter games
function filterGames() {
    const genreFilter = document.getElementById('genre-filter').value;
    const priceFilter = document.getElementById('price-filter').value;
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    
    const filteredGames = games.filter(game => {
        // Genre filter (would need to add genre property to game objects)
        // if (genreFilter !== 'all' && game.genre !== genreFilter) return false;
        
        // Price filter
        if (priceFilter === 'free' && game.price > 0) return false;
        if (priceFilter === 'under20' && game.price >= 20) return false;
        if (priceFilter === '20-50' && (game.price < 20 || game.price > 50)) return false;
        if (priceFilter === 'over50' && game.price <= 50) return false;
        
        // Search filter
        if (searchInput && !game.title.toLowerCase().includes(searchInput)) return false;
        
        return true;
    });
    
    const gamesContainer = document.getElementById('all-games');
    gamesContainer.innerHTML = '';
    
    filteredGames.forEach(game => {
        gamesContainer.innerHTML += createGameCard(game);
    });
}

// Initialize store page
document.addEventListener('DOMContentLoaded', () => {
    loadAllGames();
    
    // Add event listeners for filters
    document.getElementById('genre-filter').addEventListener('change', filterGames);
    document.getElementById('price-filter').addEventListener('change', filterGames);
    document.getElementById('search-input').addEventListener('input', filterGames);
});