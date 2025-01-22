import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GetPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';
// import { FaMapLocationDot } from "react-icons/fa6";
// import { Button } from "@/components/ui/button";

function PlaceCardItem({ place }) {

     const [photoUrl, setPhotoUrl] = useState();
     
          useEffect(() => {
               place&&GetPlacePhoto();
          }, [place])
     
          const GetPlacePhoto=async()=>{
     
               const data={
                    textQuery:place.placeName
                    
               }
               
               try {
                    const result = await GetPlaceDetails(data).then(res=>{
                         
     
                         const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',res.data.places[0].photos[3].name);
                         setPhotoUrl(PhotoUrl);
                    })
               } catch (error) {
                    
                    console.log(error);
               }
               
          }
     return (
          <Link to={'https://www.google.com/maps/search/?api=1&query='+place.placeName} target='_blank' className='text-black'>
          <div className='border rounded-xl p-2 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
               <img src={photoUrl?photoUrl: '/placeholder.jpg'} alt="" className='w-[150px] h-[150px] rounded-xl object-cover' />
               <div>
                    <h3 className="font-bold text-lg mb-2 mt-">{place.placeName}</h3>
                    <p className="text-sm text-gray-600">{place.place_details}</p>
                    <h2 className='mt-2'>🕛 {place.time}</h2>
                    {/* <Button><FaMapLocationDot /></Button> */}
               </div>
          </div>
          </Link>
     )
}

export default PlaceCardItem