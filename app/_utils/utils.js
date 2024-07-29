export const formatUrlTitle = (title) => {
    return title
        .toLowerCase()
        .replace(/[:\s]/g, '-')
        .replace(/[^a-z0-9-]/g, '') // Remove any remaining invalid characters
        .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen
};


export const formatRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
}