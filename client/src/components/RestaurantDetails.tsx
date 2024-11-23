
import { MapPin, Phone, Users, Clock, DollarSign, Utensils, Star  } from 'lucide-react'
import { LuMartini } from "react-icons/lu";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import useUserData from '@/store/auth'
import useRestaurantInfo from '@/store/Restaurant'
import { Link } from 'react-router-dom';

export function RestaurantDetails() {
  const {user } = useUserData()
  const {selectedRestaurantForPlanning} = useRestaurantInfo()
  const priceRangeValue =(value : string) => {
    switch(value){
      case "Inexpensive":
        return 10000
      case "Moderate":
        return 20000
      case "Expensive":
        return 30000
      case "Very Expensive":
        return 50000
    }
  }
    
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
     
      <main className="space-y-4 container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Card className="overflow-hidden max-w-4xl mx-auto">
          <img
            src={selectedRestaurantForPlanning.image}
            alt={selectedRestaurantForPlanning.restaurantName}
            className="w-full h-[300px] object-cover"
          />
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl">{selectedRestaurantForPlanning.restaurantName}</CardTitle>
                <CardDescription className="text-lg">{selectedRestaurantForPlanning.cuisine}</CardDescription>
              </div>
              <Badge variant="secondary" className="text-lg">
                {selectedRestaurantForPlanning.priceRange}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">{selectedRestaurantForPlanning.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>{selectedRestaurantForPlanning.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>{selectedRestaurantForPlanning.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span>Capacity: {selectedRestaurantForPlanning.capacity} guests</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>{selectedRestaurantForPlanning.openingTime} - {selectedRestaurantForPlanning.closingTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <span>{selectedRestaurantForPlanning.priceRange}</span>
                
              </div>
              <div className="flex items-center space-x-2">
                <LuMartini className="h-5 w-5 text-muted-foreground" />
                <span>{priceRangeValue(selectedRestaurantForPlanning.priceRange)} BDT</span>
                
              </div>
              <div className="flex items-center space-x-2">
                <Utensils className="h-5 w-5 text-muted-foreground" />
                <span>{selectedRestaurantForPlanning.cuisine}</span>
                
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="text-lg font-semibold">{selectedRestaurantForPlanning.rating.toFixed(1)}</span>
            </div>
          </CardContent>
          <CardFooter>
           
              <Button className="w-full">  <Link to={`/event-planning/customer/${user._id}/${selectedRestaurantForPlanning._id}/confirm-event`}>Plan Event at This Restaurant</Link></Button>
           
           
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}