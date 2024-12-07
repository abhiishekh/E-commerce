import axios from "axios";
import { useEffect, useState } from "react";

interface URL {
  url: string;
}

const useFetch = ({ url }:URL) => {
  const [responseData, setResponseData] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [Error, setError] = useState<string>("");
  
  const fetchdata = async () => {
    setLoading(true);
    try {
       const response = await axios.get(url)
       
      if (!response) {
        console.log("data not found");
        return
      }
      if(response?.data){
          // console.log(response.data.response);
          setResponseData(response.data.response);
      }
    } catch (error) {
      console.log("error while fetching data " + error);
      setError(" failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [url]);
  return {
    data:responseData,
    loading,
    Error
  }
};

export default useFetch;
