import React, { useState, useEffect } from "react";

import { Header } from "./header";
import { About } from "./about";
import { Testimonials } from "./testimonials";
import JsonData from "../../data/data.json";
import SmoothScroll from "smooth-scroll";
// import "./App.css";
export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});
const Home = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      {/* <Navigation /> */}
      <Header data={landingPageData.Header} />
     
      <About data={landingPageData.About} />
      <Testimonials data={landingPageData.Testimonials} />
    </div>
  );
};

export default Home;
