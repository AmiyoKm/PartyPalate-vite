import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import {
  Building2,
  Phone,
  MapPin,
  Clock,
  Edit2,
  Save,
  Utensils,
  DollarSign,
  Users,

} from "lucide-react";
import useUserData from "@/store/auth";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function RestaurantProfile() {
  const { restaurant, updateRestaurant, token } = useUserData();
  const [restaurantData, setRestaurantData] = useState(restaurant);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setRestaurantData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateRestaurant(restaurant._id, restaurantData, token);
    console.log("Saving restaurant data:", restaurantData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="max-w-4xl mx-auto pt-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Restaurant Profile
          </h1>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    src={restaurantData.image}
                    alt={restaurantData.restaurantName}
                  />
                  <AvatarFallback>
                    {restaurantData.restaurantName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{restaurantData.restaurantName}</CardTitle>
                  <CardDescription>
                    {restaurantData.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Restaurant Name</Label>
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <Input
                        id="name"
                        name="name"
                        value={restaurantData.restaurantName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <Input
                        id="phone"
                        name="phone"
                        value={restaurantData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <Input
                        id="address"
                        name="address"
                        value={restaurantData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cuisine">Cuisine</Label>
                    <div className="flex items-center space-x-3">
                      <Utensils className="w-4 h-4 text-gray-500" />
                      <Input
                        id="cuisine"
                        name="cuisine"
                        value={restaurantData.cuisine}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priceRange">Price Range</Label>
                    <div className="flex items-center space-x-3">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <Select
                        name="priceRange"
                        value={restaurantData.priceRange}
                        disabled={!isEditing}
                        onValueChange={(value) =>
                          setRestaurantData((prev) => ({
                            ...prev,
                            priceRange: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={restaurantData.priceRange}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Inexpensive">
                              Inexpensive
                            </SelectItem>
                            <SelectItem value="Moderate">Moderate</SelectItem>
                            <SelectItem value="Expensive">Expensive</SelectItem>
                            <SelectItem value="Very Expensive">
                              Very Expensive
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <div className="flex items-center space-x-3">
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
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="openingHours">Opening Hours (am)</Label>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <Input
                        id="openingHours"
                        name="openingHours"
                        value={restaurantData.openingTime}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="openingHours">Closing Hours (pm)</Label>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <Input
                        id="openingHours"
                        name="openingHours"
                        value={restaurantData.closingTime}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Turn ON/OFF Taking Orders</Label>
                    <div className="flex items-center space-x-3">
                      <Select
                        disabled={!isEditing}
                        name="isRestaurantOpenForOrder"
                        value={restaurantData.isRestaurantOpenForOrder}
                        onValueChange={(value) =>
                          setRestaurantData((prev) => ({
                            ...prev,
                            isRestaurantOpenForOrder: value,
                          }))
                        }
                      >
                        <SelectTrigger
                          className={`${
                            restaurantData.isRestaurantOpenForOrder === "ON"
                              ? "bg-green-400 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          <SelectValue
                            placeholder={
                              restaurantData.isRestaurantOpenForOrder
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="ON">ON</SelectItem>
                            <SelectItem value="OFF">OFF</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Turn ON/OFF Events</Label>
                    <div className="flex items-center space-x-3">
                      <Select
                        disabled={!isEditing}
                        name="isRestaurantOpenForEvent"
                        value={restaurantData.isRestaurantOpenForEvent}
                        onValueChange={(value) =>
                          setRestaurantData((prev) => ({
                            ...prev,
                            isRestaurantOpenForEvent: value,
                          }))
                        }
                      >
                        <SelectTrigger
                          className={`${
                            restaurantData.isRestaurantOpenForEvent === "ON"
                              ? "bg-green-400 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          <SelectValue
                            placeholder={
                              restaurantData.isRestaurantOpenForEvent
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="ON">ON</SelectItem>
                            <SelectItem value="OFF">OFF</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
               
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <div className="flex items-center space-x-3">
                    <Textarea
                      id="description"
                      name="description"
                      value={restaurantData.description}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <div className="flex items-center space-x-3">
                    <Input
                      id="image"
                      name="image"
                      value={restaurantData.image}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
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
  );
}
