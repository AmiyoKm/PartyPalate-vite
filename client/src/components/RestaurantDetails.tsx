import React from 'react'
import { MapPin, Phone, Users, Clock, DollarSign, Utensils, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import useUserData from '@/store/auth'


// Mock data for the restaurant
const restaurant = {
  id: 1,
  name: "Gourmet Delights",
  address: "123 Culinary Avenue, Foodville, FC 12345",
  phoneNumber: "+1 (555) 123-4567",
  capacity: 150,
  openingTime: "11:00 AM",
  closingTime: "10:00 PM",
  rating: 4.5,
  image: "/placeholder.svg?height=400&width=600",
  description: "Experience the epitome of fine dining at Gourmet Delights. Our expert chefs craft exquisite dishes using only the freshest, locally-sourced ingredients. With a warm ambiance and impeccable service, we provide the perfect setting for your special events.",
  priceRange: "Expensive",
  cuisine: "Contemporary French",
}

export function RestaurantDetails() {
  const {user} = useUserData()
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
     
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Card className="overflow-hidden max-w-4xl mx-auto">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-[300px] object-cover"
          />
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl">{restaurant.name}</CardTitle>
                <CardDescription className="text-lg">{restaurant.cuisine}</CardDescription>
              </div>
              <Badge variant="secondary" className="text-lg">
                {restaurant.priceRange}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">{restaurant.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>{restaurant.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>{restaurant.phoneNumber}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span>Capacity: {restaurant.capacity} guests</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>{restaurant.openingTime} - {restaurant.closingTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <span>{restaurant.priceRange}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Utensils className="h-5 w-5 text-muted-foreground" />
                <span>{restaurant.cuisine}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="text-lg font-semibold">{restaurant.rating.toFixed(1)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Plan Event at This Restaurant</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}