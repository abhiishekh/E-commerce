import { useEffect, useState } from 'react'

const useCount = () => {
    const storedCount = localStorage.getItem('count')
    const initialCount = storedCount ? parseInt(storedCount, 10) : 1;
    const [count, setCount] = useState<number>(initialCount)
    const increaseCount=()=>{
        if(count >= 5){
            alert("can not add more than 5 products")
            return
        }
        setCount(count+1)
    }
    const decreaseCount=()=>{
        if(count <= 1 ){
            alert("can do below 0 Please remove item manually")
            return
        }
        setCount(count-1)
    }
    


    useEffect(()=>{
        localStorage.setItem('count',count.toString());
    },[count])

  return {
    count,
    setCount,
    increaseCount,
    decreaseCount,
  }
}

export default useCount