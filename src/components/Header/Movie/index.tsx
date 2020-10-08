import React from "react";
import "./style.css";
type Props = {
  title: string;
  year: string;
  image: string;
};


const Movie: React.FC<Props> = (props) => {
  console.log(props);
  return (
    <div className="movie">
      <h2>{props.title}</h2>
      <img src={props.image} alt=" Movie Image"/>
      <h3>{props.year}</h3>
    </div>
  );
};

export default Movie;
