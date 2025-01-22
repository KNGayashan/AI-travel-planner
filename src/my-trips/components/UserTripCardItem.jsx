import React, { useState, useEffect } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {

     const [photoUrl, setPhotoUrl] = useState();

     useEffect(() => {
          trip && GetPlacePhoto();
     }, [trip])

     const GetPlacePhoto = async () => {

          const data = {
               textQuery: trip?.userSelection?.location?.label

          }

          try {
               const result = await GetPlaceDetails(data).then(res => {
                    console.log(res.data.places[0].photos[3].name);

                    const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', res.data.places[0].photos[3].name);
                    setPhotoUrl(PhotoUrl);
               })
          } catch (error) {

               console.log(error);
          }

     }

     return (

          <Link to={'/view-trip/' + trip?.id} className='cursor-pointer'>
          <div className='hover:shadow-lg transition-all'>
               <img src={photoUrl ? photoUrl : '/placeholder.jpg'} alt="" className='h-[250px] w-full object-cover rounded-xl' />

               <div>
                    <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
                    <h2 className='text-base text-gray-800'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} budget</h2>
               </div>

          </div>
          </Link>
     )
}

export default UserTripCardItem