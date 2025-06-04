import Category from "@/components/LandingPage/Category";
import Hero from "@/components/LandingPage/Hero";
import NewsletterSubscription from "@/components/LandingPage/NewsletterSubscription";
import TopCollector from "@/components/LandingPage/TopCollector";
import TrendingCard from "@/components/LandingPage/TrendingCard";
import Works from "@/components/LandingPage/Works";

const Home = () => {
  return (
    <div className="">
      <div className="">
        <Hero />
      </div>
      
      <div className="">
        <TrendingCard />
      </div>
      <div className="">
        <TopCollector/>
      </div>
      <div className="">
        <Category/>
      </div>
      <div className="">
        <Works/>
      </div>
      <div className="">
        <NewsletterSubscription/>
      </div>
    </div>
  );
};

export default Home;
