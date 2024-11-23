import React, { useState } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"


import { User,  Phone, MapPin,  Edit2, Save, } from 'lucide-react'
import useUserData from '@/store/auth'



export function CustomerProfile() {

  const {user ,updateCustomer , customer ,token} =useUserData()

  const [customerData, setCustomerData] = useState(customer)
  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCustomerData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    updateCustomer(customerData , user ,token)
    console.log("Saving customer data:", customerData)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      
      <main className="max-w-4xl mx-auto pt-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Customer Profile</h1>
          
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                
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
            
        </div>
      </main>
    </div>
  )
}