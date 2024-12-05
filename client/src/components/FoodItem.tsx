
import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from 'react-router-dom'
import useUserData from '@/store/auth'
import useRestaurantInfo from '@/store/Restaurant'
import useCart, { Item } from '@/store/Cart'
import { useToast } from '@/hooks/use-toast'


// Mock data for the food item


export function FoodItemDetails() {
  const {user} = useUserData()
  const {toast} = useToast()
 const  {  item , restaurantName , selectedRestaurant} =  useRestaurantInfo()
  const { addToCart} = useCart()

  const handleAddToCart =(item : Item)=> {
    if(selectedRestaurant.isRestaurantOpenForOrder ==="OFF"){
      return toast({
        variant: "destructive",
        title : `${selectedRestaurant.restaurantName} is closed`,
        description : 'You can not add items to the cart'
    })

  }
    addToCart(item)
    toast({
      title : `${item.itemName} is added to the Cart`
     
    })
  
  }
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
            <Button onClick={()=>handleAddToCart(item)} className="w-full">Add to Cart</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}