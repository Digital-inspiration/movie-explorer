import { useState, useEffect } from "react"
import MovieCard from "../components/MovieCard"
import '../css/Home.css'
import { searchMovies, getPopularMovies } from "../services/api";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true) 
     
    useEffect(() => {
        const loadPopularMovies = async() => {
        try {
            const popularMovies = await getPopularMovies()
            setMovies(popularMovies)

        } catch (err) {
            console.log(err)
            setError("Failed to load movies")
        }
        finally{
            setLoading(false)
        }}
        loadPopularMovies()
    },[]) 

    // const local_movies = 
    // [
    //     { id: 1, title: "Terminator", release_date: 1999 },
    //     { id: 2, title: "Terminator returns", release_date: 2000 },
    //     { id: 3, title: "Flubber", release_date: 2022 },
    //     { id: 4, title: "Rocky", release_date: 1985 },

    // ];

    const handleSearch = async (e) => {
        e.preventDefault()
        if(!searchQuery.trim()) return 
        if(loading) return
        setLoading(true)

        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (error) {
            console.log(error)
            setError("Failed to Search movies")

        } finally{
            setLoading(false)
        }


    };
    console.log(movies)

    return <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input 
                type="text" 
                className="search-input" 
                placeholder="Search for the movie... " 
                value={searchQuery}
                onChange={ (e) => setSearchQuery(e.target.value) 
                }
                />
            <button type="submit" className="search-button">Search</button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
            <div className="loading">Loading....</div> 
        ):(
        <div className="movies-grid">
            { movies.map((movie) => (
            // movie.title.toLowerCase().startsWith(searchQuery) &&
            <MovieCard movie={movie} key={movie.id} />)
            )}
        </div>
    )}
    </div>
}

export default Home  