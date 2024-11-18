import React, { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from 'react-router-dom'
import useUserData from '@/store/auth'
import useRestaurantInfo from '@/store/Restaurant'


// Mock data for the food item
const foodItem = {
  id: 1,
  name: "Spicy Grilled Salmon",
  description: "Perfectly grilled salmon fillet with a spicy glaze, served with roasted vegetables and lemon wedge.",
  price: 24.99,
  image: "/placeholder.svg?height=300&width=400",
  restaurantName: "Gourmet Delights",
}

export function FoodItemDetails() {
  const {user} = useUserData()
 const  {  item , restaurantName} =  useRestaurantInfo()

  // useEffect( async  ()=>{
  //   await getItem(restaurant._id, foodItem.id)
  // },[])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Link to={ `/home/customer/${user._id }`}>
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Menu
        </Button>
        </Link>
        <Card className="overflow-hidden max-w-2xl mx-auto">
          <img
            src={item.image}
            alt={item.itemName}
            className="w-full h-[300px] object-cover"
          />
          <CardHeader>
            <div className="flex flex-col space-y-2">
              <CardTitle className="text-2xl">{item.itemName}</CardTitle>
              <p className="text-sm text-muted-foreground">{restaurantName}</p>
              <div className="flex justify-between items-center">
                <Badge variant="secondary" className="text-lg">
                  ${Number(item.price)}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{item.description}</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Add to Cart</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}