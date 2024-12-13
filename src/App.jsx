import { useState } from 'react';
import './style/style.css';

export const App = () => {
  const urlBase = "https://api.themoviedb.org/3/search/movie";
  const apiKey = "02128dcb884b345f3732389fb90762f0";

  const [film, setFilm] = useState('');
  const [data, setData] = useState();

  const fetchData = async (query) => {
    try {
      const response = await fetch(`${urlBase}?api_key=${apiKey}&query=${query}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Surgió un error:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData(film);
  };

  const handleChange = (event) => {
    setFilm(event.target.value);
  };

  return (
    <div className='container'>
      <div className='film-nav'>
      <h1 className='titulo'>Buscador de Películas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={film}
          placeholder='Buscar película'
          onChange={handleChange}
        />
        <button type='submit'>Buscar</button>
      </form>
      </div>

      <div className='film-list'>

        {
          data?.results?.length > 0 ? (
          data.results.map((film) => (
            <div className='film-card' key={film.id}>
                  <h1>{film.title}</h1>
                  <p className='release_date'>{film.release_date}</p>
                  <img 
                  alt={film.title}
                  src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`
                  }
                  ></img>
                  <p>{film.overview}</p>
                  <div className='calificacion'><p>Calificacion</p><p className='calificacion-color'>{`: ${film.popularity}`}</p></div>
            </div>
          ))
          ) : (
          <p> No hay resultados para mostrar</p>)
        }

      </div>
    </div>
  );
};
