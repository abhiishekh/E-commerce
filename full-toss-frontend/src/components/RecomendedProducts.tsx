import speaker from '../assets/images/speaker-prod-1.webp'

const RecomendedProducts = () => {
  return (
    <div className='w-72 flex flex-col gap-2'>
        <div className='h-full w-full bg-white rounded-md hover:scale-105 duration-300 transform transition-all'>
                <img src={speaker} alt="speaker" className='h-full w-full' />
        </div>
        <div className='flex justify-between items-center'>
            <h1>title</h1>
            <div className='flex gap-2 items-center'>
                <div className='flex gap-1 items-center'>
                    <p>price</p>
                    <p>mrp</p>
                </div>
                <p>discount</p>
            </div>
        </div>
        <button className='p-2 text-white bg-purple-700/80 hover:bg-purple-700 rounded-md'>Add to cart</button>
    </div>

  )
}

export default RecomendedProducts