import React from "react";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Dog Gallery</h1>
      <div className="gallery">
        {/* Example Dog Images, can replace with real gallery images */}
        <img src="dog1.jpg" alt="Dog 1" />
        <img src="dog2.jpg" alt="Dog 2" />
        <img src="dog3.jpg" alt="Dog 3" />
        {/* Add more dog images */}
      </div>
    </div>
  );
};

export default HomePage;
