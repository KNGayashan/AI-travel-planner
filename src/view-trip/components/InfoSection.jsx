import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';




function InfoSection({ trip }) {

     const [photoUrl, setPhotoUrl] = useState();

     useEffect(() => {
          trip&&GetPlacePhoto();
     }, [trip])

     const GetPlacePhoto=async()=>{

          const data={
               textQuery:trip?.userSelection?.location?.label
               
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
          <div>
               <img src={photoUrl?photoUrl: '/placeholder.jpg'} className='h-[340px] w-full object-cover rounded-xl' />

               <div className='flex justify-between items-center'>
                    <div className='my-5 flex flex-col gap-2'>
                         <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                         <div className='flex gap-5'>
                              <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-800 text-xs md:text-base '>🗓️ {trip.userSelection?.noOfDays} Day</h2>
                              <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-800 text-xs md:text-base'>💵 {trip.userSelection?.budget} Budget</h2>
                              <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-800 text-xs md:text-base'>🥂 No. of Travelers {trip.userSelection?.traveler}</h2>
                         </div>
                    </div>
                    <Button><IoIosSend /></Button>
               </div>

          </div>

     )
}

export default InfoSection