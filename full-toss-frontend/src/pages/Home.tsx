import virat from "../assets/images/virat.png";
import rcbjersey from '../assets/images/rcbjersey.png';
import HeroCard from "../components/HeroCard";
import ProductCard from "../components/ProductCard";
import data from '../data.json'

const Home = () => {
  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="w-full md:w-5/6 2xl:w-3/5 flex flex-col">

        {/* First section with gradient */}
        <div className="w-full h-1/2 bg-gradient-to-b from-Rcb-red to-[#EAEDED] flex flex-col justify-start md:mb-12">
          <div className="w-full h-1/2 mt-5 md:mt-12 ">
            <div className="flex justify-between mx-2 lg:mx-10">
              {/* Heading and image */}
              <h1 className="w-1/2 text-3xl md:text-5xl text-white font-semibold px-2 pt-10">
                Welcome to RCB Fan Store!
              </h1>
              <div className="w-1/2 sm:w-72 h-64 ">
                <img src={virat} alt="Virat Kohli" className="w-full h-72 object-contain" />
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

        <div className="h-40 md:h-64 w-full bg-Rcb-red mt-24 flex justify-between items-center px-2 rounded-xl">
          <h1 className="text-5xl text-white font-semibold text-center">Popular Item's</h1>
          <div className="w-48 h-full md:w-64 flex items-center py-2">
            <img src={rcbjersey} alt="RCB Jersey" className="w-full h-full object-contain" />
          </div>
        </div>
        </div>

        {/* product list  */}
        <div className="w-full px-2 h-auto my-10 flex flex-wrap justify-center gap-1 md:gap-6">
          {
            data.map((items)=>(
              <ProductCard
              key={items.id}
              {...items}
              />
            ))
          }
       

        </div>
      </div>
    </div>
  );
};

export default Home;
