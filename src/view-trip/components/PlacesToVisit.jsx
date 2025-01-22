import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  // Convert itinerary object to array if it exists
  const getItineraryArray = () => {
    const itinerary = trip?.tripData?.itinerary;
    if (!itinerary) return [];

    // Convert object to array of entries and sort by day number
    return Object.entries(itinerary).sort(([dayA], [dayB]) => {
      const numA = parseInt(dayA.replace('day', ''));
      const numB = parseInt(dayB.replace('day', ''));
      return numA - numB;
    });
  };

  const itineraryArray = getItineraryArray();

  return (
    <div>
      <h2 className="font-bold text-xl my-5">Places To Visit</h2>

      <div className="grid gap-5">
        {itineraryArray.length > 0 ? (
          itineraryArray.map(([day, details], index) => (
            <div key={index} className="border rounded-lg p-4 ">
              <h2 className="font-medium text-lg mb-2">Day {day.replace('day', '')}</h2>

              <div className=''>
              <p className="font-medium text-sm text-orange-600">Best time to visit: {details.best_time_to_visit}</p>

              {/* Access the places array */}
              <div className="my-3 grid md:grid-cols-2 gap-5">
                {details.places && details.places.length > 0 ? (
                  details.places.map((place, placeIndex) => (
                    <div key={placeIndex} className="">
                      <PlaceCardItem place={place} />
                      
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No places available for this day</p>
                )}
              </div>

              </div>

            </div>
          ))
        ) : (
          <p className="text-gray-500">No itinerary available</p>
        )}
      </div>
    </div>
  );
}

export default PlacesToVisit;



// import React from 'react'

// function PlacesToVisit({trip}) {
//   return (
//     <div>
//           <h2 className='font-bold text-xl my-5'>Places To Visit</h2>

//           <div>
          
//           </div>

//     </div>
//   )
// }

// export default PlacesToVisit