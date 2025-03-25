import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsLetterBox from "../components/NewsLetterBox";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller/>
      <OurPolicy/>
      <NewsLetterBox/>
      <div style={{ position: 'fixed', bottom: '30px', right: '20px' }}>
        <Link to="/chatbot" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>
          Go to Chatbot
        </Link>
      </div>
    </div>
  );
};

export default Home;
