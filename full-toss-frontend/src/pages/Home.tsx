import virat from "../assets/images/virat.png";
import rcbjersey from "../assets/images/rcbjersey.png";
import HeroCard from "../components/HeroCard";
import ProductCard from "../components/ProductCard";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import { useEffect, useState } from "react";

interface itemType {
  _id: string | null | undefined;
  title: string;
  price: string;
  mrp: string;
  imageURL: string;
}
type Team = 'MI' | 'CSK' | 'RCB' | 'KKR' | 'DC' | 'SHR' | 'Punjab' | 'GT' | 'RR';

const Home = () => {
  const savedTeam = localStorage.getItem('selectedTeam') as Team;

  const [team, setTeam] = useState<Team>(savedTeam);
  const { data, loading, Error } = useFetch({
    url: `${import.meta.env.VITE_BACKEND_URL}/product`
  });

  const fetchData = async () => {
    const userId = localStorage.getItem('id');
    if (!userId) {
      console.log("not logged in");
      return;
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}`);
      if (response) {
        const userTeam = response.data.response.iplTeam;
        setTeam(userTeam);
        localStorage.setItem('selectedTeam', userTeam);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log("something went wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  const iplThemes: Record<Team, { primaryColor: string; secondaryColor: string; gradientStart: string; gradientEnd: string }> = {
    MI: {
      primaryColor: '#0051A2',
      secondaryColor: '#FFDD00',
      gradientStart: '#0051A2',
      gradientEnd: '#EAEDED',
    },
    CSK: {
      primaryColor: '#F7D10E',
      secondaryColor: '#0A4D92',
      gradientStart: '#F7D10E',
      gradientEnd: '#EAEDED',
    },
    RCB: {
      primaryColor: '#EC1C24',
      secondaryColor: '#000000',
      gradientStart: '#EC1C24',
      gradientEnd: '#EAEDED',
    },
    KKR: {
      primaryColor: '#512D6D',
      secondaryColor: '#F1C40F',
      gradientStart: '#512D6D',
      gradientEnd: '#EAEDED',
    },
    DC: {
      primaryColor: '#0066B3',
      secondaryColor: '#FFFFFF',
      gradientStart: '#0066B3',
      gradientEnd: '#EAEDED',
    },
    SHR: {
      primaryColor: '#FF6A00',
      secondaryColor: '#000000',
      gradientStart: '#FF6A00',
      gradientEnd: '#EAEDED',
    },
    Punjab: {
      primaryColor: '#E30613',
      secondaryColor: '#0A4D92',
      gradientStart: '#E30613',
      gradientEnd: '#EAEDED',
    },
    GT: {
      primaryColor: '#00A9A6',
      secondaryColor: '#F7D10E',
      gradientStart: '#00A9A6',
      gradientEnd: '#EAEDED',
    },
    RR: {
      primaryColor: '#3E6B92',
      secondaryColor: '#FFB6C1',
      gradientStart: '#3E6B92',
      gradientEnd: '#EAEDED',
    }
  };

  const currentTheme = iplThemes[team] || iplThemes.RCB;

  useEffect(() => {
    if (currentTheme) {
      document.documentElement.style.setProperty('--primary-color', currentTheme.primaryColor);
      document.documentElement.style.setProperty('--secondary-color', currentTheme.secondaryColor);
      document.documentElement.style.setProperty('--gradient-start', currentTheme.gradientStart);
      document.documentElement.style.setProperty('--gradient-end', currentTheme.gradientEnd);
    }
  }, [currentTheme]);
  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="w-spinner h-spinner border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin-fast"></div>
        <p className="ml-4 text-xl">Loading...</p>
      </div>
    );
  }

  if (Error) return <div className="w-full min-h-screen text-center">Page Not Found: {Error}</div>;

  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="w-full md:w-5/6 2xl:w-3/5 flex flex-col">
      
        <div className="w-full h-1/2 bg-gradient-to-b from-[var(--gradient-start)] to-[var(--gradient-end)] flex flex-col justify-start md:mb-12">
          <div className="w-full h-1/2 mt-5 md:mt-12">
            <div className="flex justify-between mx-2 lg:mx-10">
            
              <h1 className="w-1/2 text-3xl md:text-5xl text-white font-semibold px-2 pt-10">
                Welcome to {team} Fan Store!
              </h1>
              <div className="w-1/2 sm:w-72 h-64">
                <img
                  src={virat}
                  alt="Virat Kohli"
                  className="w-full h-80 md:h-72 object-contain"
                />
              </div>
            </div>
          </div>

          {/* HeroProduct Cards */}
          <div className="w-full h-1/2 px-2 flex justify-start md:justify-center gap-6 hide-scrollbar">
            <HeroCard />
            <HeroCard />
            <HeroCard />
          </div>
        </div>

        {/* Popular Items Section */}
        <div className="w-full mx-auto flex justify-center px-2">
          <div className="h-40 md:h-64 w-full bg-[var(--primary-color)] mt-24 flex justify-between items-center px-2 rounded-xl">
            <h1 className="text-5xl text-white font-semibold text-center">
              Popular Item's
            </h1>
            <div className="w-48 h-full md:w-64 flex items-center py-2 hover:scale-110 transform translate-all duration-300">
              <img
                src={rcbjersey}
                alt="RCB Jersey"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Product list */}
        <div className="w-full px-2 h-auto my-10 flex flex-wrap justify-center gap-4 md:gap-6">
          {data && data.length > 0 ? (
            data.map((item: itemType) => (
              <ProductCard
                key={item._id}
                _id={item._id}
                title={item.title}
                price={item.price}
                mrp={item.mrp}
                imageURL={item.imageURL}
              />
            ))
          ) : (
            <div>{loading ? 'loading...' : 'No Product Available'}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
