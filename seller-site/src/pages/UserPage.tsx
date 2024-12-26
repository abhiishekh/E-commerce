import { useEffect, useState } from 'react'
import UserDetails from '../components/UserDetails'
import axios from 'axios'
interface userType{
  map(arg0: (items: userType) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
  length: number;
  _id:string;
  username:string;
  email:string;
  team:string;
}
const UserPage = () => {
  const [user, setUser] = useState<userType|null>(null)
  const [userCount, setUserCount] = useState<number|string>()
  const [product, setProduct] = useState<number|string>()

  const fetchUserData = async()=>{
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`)
    if(!res){
      console.log('No data found')
      return
    }
    // console.log(res.data.response.length)
    setUserCount(res.data.response.length)
    setUser(res.data.response)
  }
  const fetchProductData = async()=>{
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product`)
    if(!res){
      console.log('No data found')
      return
    }
    console.log(res.data.response.length)
    setProduct(res.data.response.length)
  }
  useEffect(()=>{
    fetchUserData()
    fetchProductData()
  },[])
    
  return (
    <div className='mx-2 md:mx-12 my-12'>
       <div className=' flex justify-center gap-2 md:gap-12 mt-16 mx-2 sm:m-4 xl:m-12'>
        <div className=' bg-[#D9D9D9] rounded-md py-2 px-3 w-36 md:w-64 flex flex-col justify-center items-center'>
          <h1 className='font-bold text-3xl'>{userCount}+</h1>
        <h1 className='font-semibold text-2xl'>Users</h1>
        </div>
        <div className='bg-[#D9D9D9] rounded-md py-2 px-3 w-36 md:w-64 flex flex-col items-center'>
        <h1 className='font-bold text-3xl'>0 +</h1>
        <h1 className='font-semibold text-2xl'>Sellers</h1>

        </div>
        <div className='bg-[#D9D9D9] rounded-md py-2 px-3 w-36 md:w-64 flex flex-col items-center'>
        <h1 className='font-bold text-3xl'>{product}+</h1>
        <h1 className='font-semibold text-2xl'>Products</h1>

        </div>
      </div>
      <div className='mt-5'>

    <h1 className='font-bold text-3xl mb-8 '>All Users</h1>
    <div className='flex flex-col gap-10'>
      {user && user.length > 0 ?(
        user.map((items:userType)=>(
          <UserDetails
            key={items._id}
            username={items.username}
            email={items.email}
            team={items.team}/>
        ))
      ):('')}
      
    </div>
      </div>
    </div>
  )
}

export default UserPage