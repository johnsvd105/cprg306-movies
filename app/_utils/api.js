const apiKey = process.env.NEXT_PUBLIC_TMDB_API_ACCESS_KEY;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
    }
};


export const fetchMovies = async (type, region ="CA", page = 1) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${type}?language=en-US&page=${page}&region=${region}`,options);
        if (!response.ok) {
            throw new Error('Failed to fetch currently playing movies');
        }
        const data = await response.json();
        return data;
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
        console.log("fetched data: ", data);
        return data
    } 
    catch (error) {
        console.error(error);
        return null;
    }
}