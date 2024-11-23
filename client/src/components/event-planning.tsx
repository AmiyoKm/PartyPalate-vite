import { useEffect } from 'react'
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"


import {  Users, DollarSign, Star, MapPin } from 'lucide-react'
import useRestaurantInfo from '@/store/Restaurant'
import useUserData from '@/store/auth'
import { useNavigate } from 'react-router-dom'






export function EventPlanning() {
  const navigate = useNavigate()
  const {getAllRestaurants , restaurants ,setSelectedRestaurantForPlanning } = useRestaurantInfo()
  const {token ,user} = useUserData()
 

  useEffect( ()=>{
    getAllRestaurants(token)
  },[])


  const handleViewDetails = (restaurant: any) => {
    setSelectedRestaurantForPlanning(restaurant)
    navigate(`/event-planning/customer/${user._id}/${restaurant._id}`)
    console.log(restaurant)
  }



  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      
      <main className="max-w-7xl mx-auto pt-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Plan Your Event</h1>
            <div>
              <h2 className="text-xl font-semibold mb-4">Available Restaurants</h2>
              <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6">
                {restaurants.map((restaurant) => (
                  <Card key={restaurant._id}>
                    <CardHeader className="p-0">
                      <img src={restaurant.image} alt={restaurant.restaurantName} className="w-full h-40 object-cover rounded-t-lg" />
                    </CardHeader>
                    <CardContent className="pt-4">
                      <CardTitle>{restaurant.restaurantName}</CardTitle>
                      <CardDescription>
                        <div className="flex flex-col mt-2 space-y-2">
                          <div className='flex items-center'>
                          <Star className="w-4 h-4 mr-1 text-yellow-400" />
                          <span>{restaurant.rating}</span>
                         
                          </div>
                          <div className='flex items-center'>
                            <DollarSign className="w-4 h-4 mr-1" />
                            <span className='font-semibold '>{restaurant.priceRange}</span>
                          </div>
                          <div className='flex items-center'>
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className='min-w-[150px]'>{restaurant.address}</span>


                          </div>
                          
                         

                        </div>
                        <div className="mt-2">
                          <Users className="w-4 h-4 inline mr-1" />
                          <span>Up to {restaurant.capacity} guests</span>
                        </div>
                      </CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={() => handleViewDetails(restaurant)} variant="outline" className="w-full">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              {/* {availableRestaurants.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">No restaurants available for the selected criteria. Try adjusting your event details.</p>
                </div>
              )} */}
            
          </div>
        </div>
      </main>
    </div>
  )
}