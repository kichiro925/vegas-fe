import React from 'react';

const GAMES_PER_PAGE = 8;

const GamePagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [cachedPages, setCachedPages] = useState(new Map());
    const [games, setGames] = useState([]);
    const totalPages = 135;
    
    useEffect(() => {
        loadPage(currentPage);
    }, []);
    
    const loadPage = async (page) => {
        if (cachedPages.has(page)) {
        setGames(cachedPages.get(page));
        setCurrentPage(page);
        } else {
        const response = await fetch(`/api/games?page=${page}&limit=${GAMES_PER_PAGE}`);
        const data = await response.json();

        const newCache = new Map(cachedPages);
        newCache.set(page, data);
        setCachedPages(newCache);
        setGames(data);
        setCurrentPage(page);
        }
    };
    
    const handlePrev = () => {
        if (currentPage > 1) {
        loadPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
        loadPage(currentPage + 1);
        }
    };
    
    return (
        <div>
        <h2>Game List (Page {currentPage})</h2>
        <ul>
            {games.map((game, idx) => (
                <li key={idx}>{game.name}</li>
            ))}
        </ul>

        <div style={{ marginTop: 20 }}>
            <button onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
            <span style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
        </div>
        </div>
    );
};

export default GamePagination;