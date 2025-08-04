import React from "react";
import "./style.css";
import Breadcrumb from "../../components/Bredcrumb/BreadCrumb";

const DrawingPage = () => {
  const descText =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim";

  return (
    <div className='home-categories-bg py-15'>
    <div className="container max-w-screen-xl mx-auto px-3 relative">
    <div className="home_bg flex items-center justify-center py-10">
        <Breadcrumb />
      </div>
    <div className="drawing-page">
      <div className="row row-1">
      <div className="image-container">
      <img
          src="https://xstore.b-cdn.net/demos/2/artmaxy/wp-content/uploads/sites/23/2019/06/paint-palette.jpg?id=202"
          alt="Row 1"
        />
            <div className="image-title">Color selection</div>
            </div>
       
        <div className="rectangle">
          <p>{descText}</p>
        </div>
      </div>
      <div className="row row-2">
        <div className="rectangle">
          <p>Lorem ipsum dolor sit amet, consectet</p>
        </div>
        <div className="image-container">
            <img
                src="https://xstore.b-cdn.net/demos/2/artmaxy/wp-content/uploads/sites/23/2019/06/painting.jpg?id=205"
                alt="Row 2"
            />
            <div className="image-title">Choice of canvas</div>
            </div>

        <div className="rectangle">
          <p>Adipisicing elit, sed do
            <br />
          eiusmod tempor incididunt ut laboret dolore</p>
        </div>
      </div>
      <div className="row row-3">
        <div className="rectangle">
          <p>{descText}</p>
        </div>
        <div className="image-container">
        <img
          src="https://xstore.b-cdn.net/demos/2/artmaxy/wp-content/uploads/sites/23/2019/06/paint-roller.jpg?id=203"
          alt="Row 3"
        />
            <div className="image-title">Color selection</div>
            </div>
        
      </div>
      <div className="row row-2">
        <div className="rectangle">
          <p>Lorem ipsum dolor sit amet, consectet</p>
        </div>
        <div className="image-container">
            <img
                src="https://xstore.b-cdn.net/demos/2/artmaxy/wp-content/uploads/sites/23/2019/06/paint.jpg?id=204"
                alt="Row 2"
            />
            <div className="image-title">Selection of frame</div>
            </div>

        <div className="rectangle">
          <p>Adipisicing elit, sed do
            <br />
          eiusmod tempor incididunt ut laboret dolore</p>
        </div>
      </div>
      <div className="row row-1">
      <div className="image-container">
      <img
          src="http://xstore.b-cdn.net/demos/2/artmaxy/wp-content/uploads/sites/23/2019/06/paint-2.jpg?id=201"
          alt="Row 1"
        />
            <div className="image-title">Exhibition</div>
            </div>
       
        <div className="rectangle">
          <p>{descText}</p>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default DrawingPage;
