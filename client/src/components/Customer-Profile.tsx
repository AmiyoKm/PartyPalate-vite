import React, { useState } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Badge } from "./ui/badge"
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, Clock, Utensils } from 'lucide-react'


// Mock data for the customer
const initialCustomerData = {
  name: "Alice Johnson",
  email: "alice@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, Anytown, USA",
  avatar: "https://i.pravatar.cc/150?img=1",
  bio: "Food enthusiast and event planner",
}

export function CustomerProfile() {
  const [customerData, setCustomerData] = useState(initialCustomerData)
  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCustomerData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // Here you would typically send the updated data to your backend
    console.log("Saving customer data:", customerData)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      
      <main className="max-w-4xl mx-auto pt-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Customer Profile</h1>
          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    {/* <Avatar className="w-20 h-20">
                      <AvatarImage src={customerData.avatar} alt={customerData.name} />
                      <AvatarFallback>{customerData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar> */}
                    <div>
                      <CardTitle>{customerData.name}</CardTitle>
                      <CardDescription>{customerData.bio}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <User className="w-4 h-4 text-gray-500" />
                        <Input
                          id="name"
                          name="name"
                          value={customerData.name}
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
                          value={customerData.email}
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
                          value={customerData.phone}
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
                          value={customerData.address}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={customerData.bio}
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
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Your last 5 orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[...Array(5)].map((_, index) => (
                      <li key={index} className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center space-x-2">
                          <Utensils className="w-4 h-4" />
                          <span>Order #{1000 + index}</span>
                        </div>
                        <Badge variant={index === 0 ? "default" : "secondary"}>
                          {index === 0 ? "In Progress" : "Completed"}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Orders</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="events">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Events you're attending or hosting</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                      <li key={index} className="flex items-center justify-between border-b pb-2">
                        <div>
                          <h3 className="font-semibold">Event #{index + 1}</h3>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>Date: {new Date(Date.now() + (index + 1) * 86400000).toLocaleDateString()}</span>
                            <Clock className="w-4 h-4 ml-2 mr-1" />
                            <span>Time: 7:00 PM</span>
                          </div>
                        </div>
                        <Badge>{index === 0 ? "Hosting" : "Attending"}</Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Manage Events</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}