import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';


function HotelCardItem({hotel, index}) {

const [photoUrl, setPhotoUrl] = useState();

     useEffect(() => {
          hotel&&GetPlacePhoto();
     }, [hotel])

     const GetPlacePhoto=async()=>{

          const data={
               textQuery:hotel?.hotelName
               
          }
          
          try {
               const result = await GetPlaceDetails(data).then(res=>{
                    console.log(res.data.places[0].photos[3].name);

                    const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',res.data.places[0].photos[3].name);
                    setPhotoUrl(PhotoUrl);
               })
          } catch (error) {
               
               console.log(error);
          }
          
     }


  return (
     <Link key={index}  to={'https://www.google.com/maps/search/?api=1&query=' + hotel.hotelName + "," + hotel?.hotel_address} target='_blank' className='text-black'>
     <div className='hover:scale-105 transition-all cursor-pointer'>
          <img src={photoUrl?photoUrl: '/placeholder.jpg'} className=' h-[200px] w-full object-cover rounded-xl' />
          <div className='my-3 flex flex-col gap-2'>
               <h2 className='font-medium text-[18px]'>{hotel?.hotelName}</h2>
               <h2 className='text-xs text-gray-500'>📍 {hotel?.hotel_address}</h2>
               <h2 className='text-sm'>💵 {hotel?.price}</h2>
               <h2 className='text-sm'>⭐ {hotel?.rating} stars</h2>

          </div>
     </div>
</Link>
  )
}

export default HotelCardItem