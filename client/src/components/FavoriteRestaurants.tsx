import useUserData from '@/store/auth'
import { Globe, Heart, MapPin, Phone, Search, Star } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Restaurant } from '@/store/Restaurant'

const FavoriteRestaurants = () => {
    const {customer , getFavorite , token , favoriteRestaurants , addFavorite ,handleRemoveFromFavorite} = useUserData()
    //const [favorites , setFavorites] = useState<Restaurant[]>([])
    const [search , setSearch] = useState('')

    // const filterFavorites = favorites.filter((restaurant)=> 
    // restaurant.restaurantName.toLowerCase().includes(search.toLowerCase()))
    const filteredRestaurants = favoriteRestaurants.filter((restaurant)=> 
    restaurant.restaurantName.toLowerCase().includes(search.toLowerCase()))
    const handleRemoveFavorite =(restaurant : Restaurant)=>{
        addFavorite(customer._id,restaurant , token) 
        
        handleRemoveFromFavorite(restaurant._id)
    }
    useEffect( ()=> {
        const fetchFav = async() => {
            await getFavorite(customer._id , token)
        }
       fetchFav()
    },[addFavorite])
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-6">
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Your Favorite Restaurants</h1>
        {filteredRestaurants.length === 0 && (
          <div className="text-center mt-8">
            <p className="text-xl text-muted-foreground">No favorite restaurants found.</p>
          </div>
        )}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search favorites..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRestaurants.map((restaurant) => (
              <Card key={restaurant._id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={restaurant.image}
                        alt={restaurant.restaurantName}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <CardTitle>{restaurant.restaurantName}</CardTitle>
                        <CardDescription>{restaurant.cuisine}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span>{restaurant.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{restaurant.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{restaurant.phone}</span>
                    </div>
                    
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="destructive"
                    className="w-full"
                     onClick={() => handleRemoveFavorite(restaurant)}
                  >
                    <Heart className="w-4 h-4 mr-2" /> Remove from Favorites
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
       
      </main>
    </div>
  )
}

export default FavoriteRestaurants