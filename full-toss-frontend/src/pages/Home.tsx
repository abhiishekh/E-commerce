import virat from "../assets/images/virat.png";
import rcbjersey from "../assets/images/rcbjersey.png";
import HeroCard from "../components/HeroCard";
import ProductCard from "../components/ProductCard";
import useFetch from "../hooks/useFetch";

interface itemType {
  _id: string | null | undefined;
  title: string;
  price: string;
  mrp: string;
  imageURL: string;
}

const Home = () => {
  const { data, loading, Error } = useFetch({
    url: "http://localhost:3000/api/v1/product"});

  
if(Error)return <div className=" w-full min-h-screen text-center">Page Not Found : {Error}</div>
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
          <div className="h-40 md:h-64 w-full bg-Rcb-red mt-24 flex justify-between items-center px-2 rounded-xl">
            <h1 className="text-5xl text-white font-semibold text-center">
              Popular Item's
            </h1>
            <div className="w-48 h-full md:w-64 flex items-center py-2 hover:scale-110 transform translate-all duration-300 ">
              <img
                src={rcbjersey}
                alt="RCB Jersey"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* product list  */}
        <div className="w-full px-2 h-auto my-10 flex flex-wrap justify-center gap-4 md:gap-6">
        {data && data.length > 0 ? (
            data.map((item:itemType) => (
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
            <div>{loading?'loading...':'No Produt Available'}</div> 
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
