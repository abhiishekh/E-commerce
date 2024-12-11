
import { IoMdLogOut } from "react-icons/io";
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
const Profile = () => {
    const navigate = useNavigate()
    const {logout,isAuthenticated} = useAuth()
    const id = localStorage.getItem('id')
    const {data, loading, Error } = useFetch({url:`${import.meta.env.VITE_BACKEND_URL}/user/${id}`})
    const handlelogout = () => {
        logout();
        navigate('/')
        window.location.reload();
      };
      if(!isAuthenticated){
        navigate('/login')
      }

      if (loading) {
        return (
          <div className="w-full min-h-screen flex items-center justify-center">
            <div className="w-spinner h-spinner border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin-fast"></div>
            <p className="ml-4 text-xl">Loading...</p>
          </div>
        );
      }
      if(Error)return <div>Error: {Error}</div>

  return (
    <div className='w-full  min-h-screen bg-[var(--primary-color)]/10 flex justify-center'>
        <div className='mx-2 bg-transparent h-auto w-full md:w-1/2 flex flex-col '>
           <div className='w-full flex flex-col items-center mt-10 '>
            
            <div className="w-full flex justify-between items-center">
            <h1 className="font-semibold text-2xl md:text-3xl">Login and Security</h1>
            <h1 className='font-medium text-xl cursor-pointer capitalize  p-2 flex items-center gap-2'
            onClick={handlelogout}
            >logout <IoMdLogOut/></h1>
            </div>

            <div className='w-full h-auto flex flex-col   border-[1px] border-gray-400 rounded-lg mt-5'>
            
            <div className="m-4 flex justify-between items-center">
              <div>

              <h2 className=" font-medium capitalize">username</h2>
            <h1 className='font-regular capitalize mb-5 '>{data.username || 'Username'}</h1>
              </div>
              <button className="h-1/2 px-10 border-[1px] border-gray-400 rounded-full">
                Edit
              </button>
            </div>
            <div className="w-full border-b-[1px] border-gray-500"></div>
            <div className="m-4 flex justify-between items-center">
              <div>

              <h2 className=" font-medium capitalize">name</h2>
            <h1 className='font-regular capitalize mb-5 '>{data.name || 'name'}</h1>
              </div>
              <button className="h-1/2 px-10 border-[1px] border-gray-400 rounded-full">
                Edit
              </button>
            </div>
            <div className="w-full border-b-[1px] border-gray-500"></div>
            <div className="m-4 flex justify-between items-center">
              <div>

              <h2 className=" font-medium capitalize">email</h2>
            <h1 className='font-regular capitalize  mb-5 '>{data.email || 'email'}</h1>
              </div>
              <button className="h-1/2 px-10 border-[1px] border-gray-400 rounded-full">
                Edit
              </button>
            </div>
            <div className="w-full border-b-[1px] border-gray-500"></div>
            <div className="m-4 flex justify-between items-center">
              <div>

              <h2 className=" font-medium capitalize">phone</h2>
            <h1 className='font-regular capitalize  mb-5 '>{data.phone || 'phone'}</h1>
              </div>
              <button className="h-1/2 px-10 border-[1px] border-gray-400 rounded-full">
                Edit
              </button>
            </div>
            <div className="w-full border-b-[1px] border-gray-500"></div>
            <div className="m-4 flex justify-between items-center ">
              <div>

              <h2 className=" font-medium capitalize">ipl Team</h2>
            <h1 className='font-regular capitalize mb-5 '>{data.iplTeam || 'ipl Team'}</h1>
              </div>
              <button className="h-1/2 px-10 border-[1px] border-gray-400 rounded-full">
                Edit
              </button>
            </div>
          

            </div>
           </div>

        </div>
        </div>
  )
}

export default Profile