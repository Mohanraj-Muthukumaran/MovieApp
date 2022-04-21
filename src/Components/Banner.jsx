import React from "react";
import "./styles.css";

const Banner = (props) => {
  const { name, image, summary } = props;

  return (
    <div className='banner-card'>
      <div className='banner-content'>
        <img
          src={image.medium}
          alt='movie-poster'
          style={{ width: "100%", height: "100%", borderRadius: "20px" }}
        />
      </div>
      <div className='banner-content'>
        <h2 className='movie-title'>{name}</h2>
        <div
          className='Container'
          dangerouslySetInnerHTML={{ __html: summary }}
        ></div>
      </div>
    </div>
  );
};

export default Banner;
