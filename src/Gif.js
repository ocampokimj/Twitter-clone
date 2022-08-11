import React from "react";

const Gif = () => {
  return (
    <div className="gif-container">
      <input type="text" className="search-gif" placeholder="Search Gif" />
      <div className="gif-content">
        <div className="gif-heading">What's happening?</div>
      </div>
    </div>
  );
};

export default Gif;
