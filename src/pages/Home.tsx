import Category from "@/components/LandingPage/Category";
import Hero from "@/components/LandingPage/Hero";
import NewsletterSubscription from "@/components/LandingPage/NewsletterSubscription";
import TopCollector from "@/components/LandingPage/TopCollector";
import TrendingCard from "@/components/LandingPage/TrendingCard";
import Works from "@/components/LandingPage/Works";
import React from "react";

const Home = () => {
  return (
    <div className="px-5 w-5/6 mx-auto flex flex-col gap-10">
      <Hero />
      <div className="mt-30">
        <TrendingCard />
      </div>
      <div className="mt-30">
        <TopCollector/>
      </div>
      <div className="mt-10">
        <Category/>
      </div>
      <div className="mt-10">
        <Works/>
      </div>
      <div className="mt-10">
        <NewsletterSubscription/>
      </div>
    </div>
  );
};

export default Home;
