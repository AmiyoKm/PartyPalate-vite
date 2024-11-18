import React, { useState } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Badge } from "./ui/badge"
import { Building2, Mail, Phone, MapPin, Clock, Edit2, Save, Utensils, DollarSign, Users, Calendar } from 'lucide-react'


// Mock data for the restaurant
const initialRestaurantData = {
  name: "Gourmet Delights",
  email: "info@gourmetdelights.com",
  phone: "+1 (555) 987-6543",
  address: "456 Culinary Ave, Foodtown, USA",
  avatar: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  description: "Fine dining experience with a modern twist",
  cuisine: "Contemporary",
  priceRange: "$$$",
  openingHours: "Mon-Sat: 11:00 AM - 10:00 PM, Sun: Closed",
  capacity: 80,
}

export function RestaurantProfile() {
  const [restaurantData, setRestaurantData] = useState(initialRestaurantData)
  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setRestaurantData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // Here you would typically send the updated data to your backend
    console.log("Saving restaurant data:", restaurantData)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
     
      <main className="max-w-4xl mx-auto pt-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Restaurant Profile</h1>
          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="menu">Menu</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={restaurantData.avatar} alt={restaurantData.name} />
                      <AvatarFallback>{restaurantData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{restaurantData.name}</CardTitle>
                      <CardDescription>{restaurantData.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Restaurant Name</Label>
                        <Building2 className="w-4 h-4 text-gray-500" />
                        <Input
                          id="name"
                          name="name"
                          value={restaurantData.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Mail className="w-4 h-4 text-gray-500" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={restaurantData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Phone className="w-4 h-4 text-gray-500" />
                        <Input
                          id="phone"
                          name="phone"
                          value={restaurantData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <Input
                          id="address"
                          name="address"
                          value={restaurantData.address}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cuisine">Cuisine</Label>
                        <Utensils className="w-4 h-4 text-gray-500" />
                        <Input
                          id="cuisine"
                          name="cuisine"
                          value={restaurantData.cuisine}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priceRange">Price Range</Label>
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        <Input
                          id="priceRange"
                          name="priceRange"
                          value={restaurantData.priceRange}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="capacity">Capacity</Label>
                        <Users className="w-4 h-4 text-gray-500" />
                        <Input
                          id="capacity"
                          name="capacity"
                          type="number"
                          value={restaurantData.capacity}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="openingHours">Opening Hours</Label>
                        <Clock className="w-4 h-4 text-gray-500" />
                        <Input
                          id="openingHours"
                          name="openingHours"
                          value={restaurantData.openingHours}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={restaurantData.description}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {isEditing ? (
                    <Button onClick={handleSave}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="menu">
              <Card>
                <CardHeader>
                  <CardTitle>Menu Management</CardTitle>
                  <CardDescription>Add, edit, or remove menu items</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[...Array(5)].map((_, index) => (
                      <li key={index} className="flex items-center justify-between border-b pb-2">
                        <div>
                          <h3 className="font-semibold">Menu Item #{index + 1}</h3>
                          <p className="text-sm text-gray-500">Description of the menu item</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge>${(Math.random() * 20 + 10).toFixed(2)}</Badge>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Add New Menu Item</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Bookings</CardTitle>
                  <CardDescription>Manage your restaurant's reservations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[...Array(5)].map((_, index) => (
                      <li key={index} className="flex items-center justify-between border-b pb-2">
                        <div>
                          <h3 className="font-semibold">Booking #{1000 + index}</h3>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>Date: {new Date(Date.now() + (index + 1) * 86400000).toLocaleDateString()}</span>
                            <Clock className="w-4 h-4 ml-2 mr-1" />
                            <span>Time: 7:00 PM</span>
                            <Users className="w-4 h-4 ml-2 mr-1" />
                            <span>Guests: {Math.floor(Math.random() * 6) + 2}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Manage</Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Bookings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}