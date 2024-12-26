import axios from "axios";
import { useEffect, useState } from "react";

interface URL {
  url: string;
}

const useFetch = ({ url }:URL) => {
  const [responseData, setResponseData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [Error, setError] = useState<string>("");
  const token = localStorage.getItem('token')
  const fetchdata = async () => {
    setLoading(true);
    setError('')
    try {
       const response = await axios.get(url,{
        headers:{
          token:token
        }
      })
      // console.log(response)
      console.log(response.data.arr)
       
      if (!response || !response.data) {
        console.log("data not found");
        setError("no data found")

      }
      if(response.data.message){
        setError(response.data.message)
        return ;
      }
      if(Array.isArray(response.data.arr)){
        if(response.data.arr.length <= 0){
          setError("no data in cart")
        }
        const fetchData = response.data.arr 
        if(fetchData !== responseData){
          setResponseData(fetchData)
        }
      } else if (response.data.response) {
        const fetchData = response.data.response;
        if (fetchData.length === 0) {
          setError("No items available");
        } else {
          setResponseData(fetchData);
        }
      }else{
        console.log('no data available')
        setError("currently no data available")
      }
      console.log(responseData)
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
    Error,
    fetchdata
  }
};

export default useFetch;
