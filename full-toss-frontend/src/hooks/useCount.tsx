import { useState } from 'react'

const useCount = () => {

    const [count, setCount] = useState<number>(0)

    

  return {
    count,
    setCount,

  }
}

export default useCount