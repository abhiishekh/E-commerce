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
// type Team = 'MI' | 'CSK' | 'RCB' | 'KKR' | 'DC' | 'SHR' | 'Punjab' | 'GT' | 'RR';

const Home = () => {
  const { data, loading, Error } = useFetch({
    url: `${import.meta.env.VITE_BACKEND_URL}/product`,
  });

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

      <div className="w-ful h-full flex flex-col bg-[#EAEDED] ">
      
        <div className="w-full h-full bg-gradient-to-l from-[#4D03DF] to-[#953FE6] flex flex-col justify-start">
          <div className="w-full md:w-5/6 2xl:w-3/5 mx-auto h-1/2 mt-5 md:mt-12">
            <div className="flex justify-between mx-2 lg:mx-10">
            
              <h1 className="w-1/2 text-3xl md:text-5xl text-white font-semibold px-2 pt-10">
                Welcome to IPL Fan Store!
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

          {/*Category HeroProduct Cards */}
          <div className="w-full  h-1/2 px-2 flex justify-start md:justify-center gap-6 hide-scrollbar mb-12">
            <HeroCard />
            <HeroCard />
            <HeroCard />
          </div>
        </div>

        {/* Popular Items Section */}
        <div className="w-full md:w-5/6 2xl:w-3/5 mx-auto flex justify-center px-2">
          <div className="h-40 md:h-64 w-full bg-[#953FE6] mt-24 flex justify-between items-center px-2 rounded-xl">
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
