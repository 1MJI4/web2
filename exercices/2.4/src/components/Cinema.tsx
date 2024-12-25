import "./Cinema.css"
import { MoviesProps } from "./Type"

interface CinemaProps {
    name: string;
    movies: MoviesProps[];
}

const Cinema = (props: CinemaProps) => (
    <div className="cinema-container">
      <h2>{props.name}</h2>
      <ul>
        {props.movies.map((movie, index) => (
          <li key={index}>
            <strong>{movie.title}</strong> - Réalisateur : {movie.director}
          </li>
        ))}
      </ul>
    </div>
);
  
export default Cinema;