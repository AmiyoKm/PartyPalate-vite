
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Star } from 'lucide-react'
import { Input } from "./ui/input"
import { useEffect } from "react"
import useRestaurantInfo from "@/store/Restaurant"
import useUserData from "@/store/auth"
import { Link, useNavigate } from "react-router-dom"


export function HomePageComponent() {
  const navigate = useNavigate();
   const {restaurants , getAllRestaurants , getItem} = useRestaurantInfo()
 const {user ,token} =useUserData()
 const handleFoodItemClick = async(userId : string | undefined ,restaurantId : string ,itemId : string) =>{
  console.log(userId ,restaurantId ,itemId);
  await getItem(restaurantId ,itemId ,token)
  navigate(`/customer/${userId}/item/${restaurantId}/${itemId}`);

 }
 useEffect(() => {
  const fetchRestaurants = async () => {
    const data = await getAllRestaurants(token);
    console.log('Fetched Restaurants:', data);
  };
  fetchRestaurants();
}, [getAllRestaurants]);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto pt-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center ">
          <span className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Featured Restaurants</span>
          <div className=" flex items-center justify-center sm:items-stretch sm:justify-start">
            <Input  className='mr-2 border-purple-500' placeholder="Search..." />
            <Button>Search</Button> 
          </div>
          </div>
          
          <div className="space-y-12">
            {restaurants.map((restaurant) => (
              <div key={restaurant._id} className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <img src={restaurant.image} alt={`${restaurant.restaurantName} logo`} className="h-12 w-12 rounded-full mr-4" />
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      {restaurant.restaurantName}
                    </h3>
                  </div>
                  <span className="flex items-center text-sm">
                    <Star className="h-4 w-4 mr-1 fill-yellow-400" />
                    {restaurant.rating}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                  {restaurant.menu.map((item) => (
                    // <Link to={`/customer/${user._id}/item/${restaurant._id}/${item._id}`}>
                    <Card onClick={()=>handleFoodItemClick(user._id,restaurant._id , item._id)} key={item._id} className="overflow-hidden flex flex-col hover:scale-105 transition-all duration-300">
                      <CardHeader className="p-0">
                        <img
                          src={item.image}
                          alt={item.itemName}
                          className="w-full h-48 object-cover"
                        />
                      </CardHeader>
                      <CardContent className="p-4 flex-grow">
                        <CardTitle className="text-lg mb-2">{item.itemName}</CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{item.description}</p>
                        <p className="font-bold text-lg mb-2">${item.price.toFixed(2)}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button className="w-full">Add to Cart</Button>
                      </CardFooter>
                    </Card>
                    // </Link>
                    
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}