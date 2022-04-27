import React from "react";
import "./styles.css";

const MovieCard = (props) => {
  const { name, image, language, rating } = props;

  return (
    <div className='flip-card'>
      <div className='flip-card-inner'>
        <div className='flip-card-front'>
          <img
            src={image.medium}
            alt='movie-poster'
            style={{ width: "100%", height: "100%", borderRadius: "20px" }}
          />
        </div>
        <div className='flip-card-back'>
          <h2 className='movie-title'>{name}</h2>
          <span>{language}</span>
          {/* <p>{genres.join("-")}</p> */}
          <p className='ratings'> &#9733; {rating.average}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
