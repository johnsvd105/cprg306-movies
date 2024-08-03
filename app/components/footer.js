const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p className="mb-4">
            This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
        <img src="/tmdbLogo.svg" alt="TMDB Logo" className="mx-auto mt-2 w-[30%] max-w-[500px]" />
      </footer>
    );
  };
  
  export default Footer;