
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Star } from 'lucide-react'
import { Input } from "./ui/input"
import { useEffect } from "react"
import useRestaurantInfo, { Restaurant } from "@/store/Restaurant"
import useUserData from "@/store/auth"
import { useNavigate } from "react-router-dom"
import useCart, { type Item } from "@/store/Cart"
import { useToast } from "@/hooks/use-toast"


export function HomePageComponent() {
  const navigate = useNavigate();
   const {restaurants , getAllRestaurants , getItem , setSelectedRestaurant} = useRestaurantInfo()
  const {addToCart} =useCart()
 const {user ,token} =useUserData()
 const {toast } = useToast()
 const handleFoodItemClick = async(userId : string | undefined ,restaurant : any ,itemId : string) =>{
  console.log(userId ,restaurant._id ,itemId);
  await getItem(restaurant._id ,itemId ,token)
  setSelectedRestaurant(restaurant)
  navigate(`/customer/${userId}/item/${restaurant._id}/${itemId}`);

 }
 const handleAdd = (restaurant : Restaurant ,item : Item)=>{
  addToCart(item )
  toast({
    title : `${item.itemName} is added to the Cart`,
    description : 'You can add more items to the cart'
  })
  setSelectedRestaurant(restaurant)
 }
 const handleSelectedRestaurant = (restaurant : Restaurant)=>{
  setSelectedRestaurant(restaurant)
  navigate(`/customer/${user?._id}/restaurant/${restaurant._id}`)
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
                  <div onClick={()=>handleSelectedRestaurant(restaurant)} className="flex rounded-lg items-center hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-4">
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
                    <Card className="overflow-hidden flex flex-col hover:scale-105 cursor-pointer transition-all duration-300">
                      <div onClick={()=>handleFoodItemClick(user._id , restaurant , item._id)} >
                      <CardHeader  className="p-0">
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
                      </div>
                      
                      <CardFooter className="p-4 pt-0">
                        <Button onClick={()=>handleAdd(restaurant ,item)} className="w-full">Add to Cart</Button>
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