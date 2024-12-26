import React from 'react'

interface userType{
  // _id:string;
  username:string;
  email:string;
  team:string;
}
const UserDetails:React.FC<userType> = ({username,email, team}) => {
  return (
    <div className='w-full h-auto bg-[#D9D9D9] rounded-lg flex justify-between items-center px-2 md:px-8 py-2'>
    {/* //image  */}

    {/* <div className='w-32 h-32 bg-white rounded-lg overflow-hidden'>
      <img src='' alt="" />
    </div>  */}
    
    {/* //details  */}
    <div>
      <h1 className='font-medium text-lg'>{username}</h1>
      <h1 className='font-medium text-lg'>{email}</h1>
      <h1 className='font-medium text-lg'>{team}</h1>
    </div>
    {/* //remove button  */}
    <button className='p-2 bg-white rounded-lg'> Remove</button>
  </div>
  )
}

export default UserDetails