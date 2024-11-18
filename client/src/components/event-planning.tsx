import React, { useState } from 'react'
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Calendar, Users, Clock, DollarSign, Star, MapPin } from 'lucide-react'


// Mock data for restaurants
const restaurants = [
  { id: 1, name: "Gourmet Palace", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80", rating: 4.5, priceRange: "$$", location: "Downtown", maxCapacity: 100 },
  { id: 2, name: "Seaside Terrace", image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80", rating: 4.2, priceRange: "$$$", location: "Waterfront", maxCapacity: 150 },
  { id: 3, name: "Urban Feast", image: "https://images.unsplash.com/photo-1515669097368-22e68427d265?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80", rating: 4.0, priceRange: "$$", location: "City Center", maxCapacity: 80 },
  { id: 4, name: "Rustic Barn", image: "https://images.unsplash.com/photo-1510076857177-7470076d4098?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80", rating: 4.7, priceRange: "$$$", location: "Countryside", maxCapacity: 200 },
]

const eventTypes = ["Wedding Reception", "Corporate Dinner", "Birthday Party", "Graduation Celebration"]

export function EventPlanning() {
  const [eventDetails, setEventDetails] = useState({
    type: '',
    date: '',
    guests: '',
    duration: '',
    budget: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEventDetails(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setEventDetails(prev => ({ ...prev, type: value }))
  }

  const filterRestaurants = () => {
    return restaurants.filter(restaurant => {
      const budgetMatch = eventDetails.budget ? getPriceRangeValue(restaurant.priceRange) <= parseInt(eventDetails.budget) : true
      const capacityMatch = eventDetails.guests ? restaurant.maxCapacity >= parseInt(eventDetails.guests) : true
      return budgetMatch && capacityMatch
    })
  }

  const getPriceRangeValue = (range: string) => {
    switch (range) {
      case '$': return 1
      case '$$': return 2
      case '$$$': return 3
      default: return 4
    }
  }

  const availableRestaurants = filterRestaurants()

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      
      <main className="max-w-7xl mx-auto pt-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Plan Your Event</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Event Details</h2>
              <Card>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <label htmlFor="event-type" className="text-sm font-medium">Event Type</label>
                    <Select onValueChange={handleSelectChange}>
                      <SelectTrigger id="event-type">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.map((type) => (
                          <SelectItem key={type} value={type.toLowerCase().replace(' ', '-')}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="event-date" className="text-sm font-medium">Event Date</label>
                    <div className="flex">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      <Input type="date" id="event-date" name="date" onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="guest-count" className="text-sm font-medium">Number of Guests</label>
                    <div className="flex">
                      <Users className="w-4 h-4 mr-2 text-gray-500" />
                      <Input type="number" id="guest-count" name="guests" placeholder="Enter number of guests" onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="event-duration" className="text-sm font-medium">Event Duration</label>
                    <div className="flex">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      <Input type="number" id="event-duration" name="duration" placeholder="Enter duration in hours" onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="budget" className="text-sm font-medium">Budget</label>
                    <div className="flex">
                      <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                      <Input type="number" id="budget" name="budget" placeholder="Enter your budget" onChange={handleInputChange} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Find Venues</Button>
                </CardFooter>
              </Card>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Available Restaurants</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {availableRestaurants.map((restaurant) => (
                  <Card key={restaurant.id}>
                    <CardHeader className="p-0">
                      <img src={restaurant.image} alt={restaurant.name} className="w-full h-40 object-cover rounded-t-lg" />
                    </CardHeader>
                    <CardContent className="pt-4">
                      <CardTitle>{restaurant.name}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center mt-2">
                          <Star className="w-4 h-4 mr-1 text-yellow-400" />
                          <span>{restaurant.rating}</span>
                          <span className="mx-2">•</span>
                          <span>{restaurant.priceRange}</span>
                          <span className="mx-2">•</span>
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{restaurant.location}</span>
                        </div>
                        <div className="mt-2">
                          <Users className="w-4 h-4 inline mr-1" />
                          <span>Up to {restaurant.maxCapacity} guests</span>
                        </div>
                      </CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              {availableRestaurants.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">No restaurants available for the selected criteria. Try adjusting your event details.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}