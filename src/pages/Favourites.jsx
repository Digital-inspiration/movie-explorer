import '../css/Favourites.css'
import { useMovieContext } from '../contexts/MovieContext'
import MovieCard from '../components/MovieCard'

function Favourites() {
    const { favourites } = useMovieContext();

    console.log(favourites)
    if (Array.isArray(favourites) && favourites.length > 0) {
        return (
            <div className="favourites" >
                <h2>Your Favourites</h2>

                <div className="movies-grid">
                    {favourites.map((movie) => ( 
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            </div>
        );
    }

    return <div className="favourites-empty">
        <h2>No favourite movies yet!</h2>
        <p>Start entering your favourite movies and they will appear here</p>
    </div>

}

export default Favourites