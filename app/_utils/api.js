const apiKey = process.env.TMDB_API_ACCESS_KEY;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
    }
};


export const fetchMovies = async (region,type) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${type}?language=en-US&page=1&region=${region}`,options);
        if (!response.ok) {
            throw new Error('Failed to fetch currently playing movies');
        }
        const data = await response.json();
        return data.results;
    } 
    catch (error) {
        console.error(error);
        return [];
    }
}


export const fetchMovieDetails = async (id) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`,options);
        if (!response.ok) {
            throw new Error('Failed to fetch currently playing movies');
        }
        const data = await response.json();
        return data
    } 
    catch (error) {
        console.error(error);
        return null;
    }
}