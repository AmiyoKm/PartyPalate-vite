
import { CalendarIcon, Clock, Users, MapPin, User, PartyPopper, DollarSign } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import useRestaurantInfo from '@/store/Restaurant'
import useUserData from '@/store/auth'
import { Link } from 'react-router-dom'




export function EventConfirmation() {
  const {selectedRestaurantForPlanning} = useRestaurantInfo()
  const {confirmedEvent , user} = useUserData()

const getTotal =()=>{
  let priceRange = selectedRestaurantForPlanning.priceRange
  let value = 0
  if(priceRange === "Inexpensive"){
    value = 10000
  }
  else if(priceRange === "Moderate"){
    value = 20000
  }
  else if(priceRange === "Expensive"){
    value = 30000
  }
  else if(priceRange === "Very Expensive"){
    value = 50000
  }

  return value + (selectedRestaurantForPlanning.costPerPerson * confirmedEvent.guests)
}

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-6">
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <PartyPopper className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-600">Event Confirmed!</CardTitle>
            <CardDescription>Your event has been successfully booked , Wait for {selectedRestaurantForPlanning.restaurantName} to approve you event</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{confirmedEvent.eventName}</h3>
              <p className="text-sm text-muted-foreground">{confirmedEvent.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                <span>{confirmedEvent.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>{confirmedEvent.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>{selectedRestaurantForPlanning.restaurantName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span>{confirmedEvent.guests} guests</span>
              </div>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">Location</h4>
              <p className="text-sm">{selectedRestaurantForPlanning.address}</p>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">Event Planner</h4>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <span>{confirmedEvent.plannerName}</span>
              </div>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">Total Cost</h4>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <span>{getTotal()}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button className="w-full"><Link to={`/event-management/customer/${user._id}`}>Track Events</Link></Button>
            <Button variant="outline" className="w-full"><Link to={`/home/customer/${user._id}`}>Back to Menu</Link></Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}