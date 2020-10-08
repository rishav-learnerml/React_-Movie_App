import React, { useEffect, useState } from "react";
import Movie from "../Movie";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./style.css";

type Props = {
  movies: any;
  setMovies: any;
  setTempMovies: any;
};

type Movie ={
  imdbID: string
  title: string
  image: string
  year: string
}

const API_KEY = "eb7f19c3";

const series = ["avengers", "fast and furious", "iron man", "harry potter", "twilight",  "mirzapur", "sacred games"];

const Movies: React.FC<Props> = (props) => {
  useEffect(() => {
    const promises = series.map((series) => {
      return fetch(
        `http://www.omdbapi.com/?s=${encodeURIComponent(
          series
        )}&apikey=${API_KEY}&page=1`
      ).then((result) => result.json());
    });

    Promise.all(promises).then((movies: any) => {
      const updatedMovies: Movie[] = movies.map((movie: any) => movie.Search).flat(2).map(
        (movie: any) => ({
          title: movie.Title,
          year: movie.Year,
          image: movie.Poster,
          imdb: movie.imdbID

        }))

      props.setMovies(updatedMovies)
      props.setTempMovies(updatedMovies)
    })
  }, [])

  if (props.movies.length === 0) {
    return (
      <div className="loader">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="movies">
      {props.movies.map((movie: Movie) => {
        return (
          <Movie
            key={movie.imdbID}
            title={movie.title}
            year={movie.year}
            image={movie.image}
          />
        );
      })}
    </div>
  );
};

export default Movies;
