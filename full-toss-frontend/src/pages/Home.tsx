import heroImg from "../assets/images/banner-img.png";
import rcbjersey from "../assets/images/rcbjersey.png";
import ProductCard from "../components/ProductCard";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

interface itemType {
  _id: string | null | undefined;
  title: string;
  price: string;
  mrp: string;
  imageURL: string;
}

const Home = () => {
  const navigate = useNavigate()
  const { data, loading, Error } = useFetch({
    url: `${import.meta.env.VITE_BACKEND_URL}/product`,
  });



  if (Error) return <div className="w-full min-h-screen text-center">Page Not Found: {Error}</div>;

  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="w-full h-full flex flex-col bg-[#EAEDED]">
        <div className="w-full h-screen bg-gradient-to-l from-[#4D03DF] to-[#953FE6] flex flex-col justify-center">
          <div className="w-full md:w-5/6 2xl:w-3/5 mx-auto h-1/2 ">
            <div className="flex justify-between mx-2 lg:mx-12">
            <div className="w-auto md:w-1/2 absolute top-32 left-10 md:static">

              <h1 className="w-full text-5xl md:text-7xl text-white font-semibold px-2 pt-10">
                Welcome to shoppi Store!
              </h1>
              <p className="text-white mt-2">Shop our exclusive items
              at unbeatable prices!</p>
              <div className="flex gap-4  text-white mt-8">

                <button  className="px-4 py-3 bg-transparent border-[1px] border-white rounded-md">Read More </button>
                <button onClick={()=> navigate('/#products')} className="px-4 py-3 bg-white text-black rounded-md">Explore Products </button>
              </div>

              </div>
              <div className=" w-full md:w-1/2 h-96 md:ml-12">
                <img
                  src={heroImg}
                  alt="image"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Category HeroProduct Cards */}
          {/* <div
            ref={carouselRef}
            className="w-full md:w-5/6 2xl:w-3/5 mx-auto h-1/2 px-2 flex justify-start md:justify-center gap-6 hide-scrollbar mb-12 overflow-hidden"
          >
            <HeroCard />
            <HeroCard />
            <HeroCard />
            <HeroCard />
            <HeroCard />
            
            <HeroCard />
            <HeroCard />
          </div> */}
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
        {loading ?(

              <div className=" w-full min-h-screen flex items-center justify-center">
                <div className="w-spinner h-spinner border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin-fast"></div>
                <p className="ml-4 text-xl">Loading...</p>
              </div>

        ):(
          <div className="w-full md:w-5/6 2xl:w-3/5 mx-auto h-full my-10 flex gap-10 px-2 flex-wrap justify-center">
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
        )}
        
      </div>
    </div>
  );
};

export default Home;
