
import { Star, DollarSign, Plus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import useRestaurantInfo from '@/store/Restaurant'
import useCart, { Item } from '@/store/Cart'
import { useToast } from '@/hooks/use-toast'





export function RestaurantMenuForCustomer() {
  const {toast} = useToast()
 const {selectedRestaurant} = useRestaurantInfo()
const {addToCart} = useCart()
const handleAddToCart = (item : Item) => {
  if(selectedRestaurant.isRestaurantOpenForOrder ==="OFF"){
    return toast({
      variant: "destructive",
      title : `${selectedRestaurant.restaurantName} is closed`,
      description : 'You can not add items to the cart'
    })
  }
  addToCart(item)
  toast({
    title : `${item.itemName} is added to the Cart`,
    description : 'You can add more items to the cart'
  })
}
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
     
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Card className="mb-6">
          <CardHeader >
            <CardTitle className="text-2xl flex items-center">{selectedRestaurant.restaurantName} <Badge variant={`${selectedRestaurant.isRestaurantOpenForOrder==="OFF" ? 'destructive' : 'secondary' }`} className={`ml-4 ${selectedRestaurant.isRestaurantOpenForOrder ==="ON" ? 'bg-green-500 text-white': ''}`}>{selectedRestaurant.isRestaurantOpenForOrder==="ON" ? 'ON' : "OFF"} </Badge></CardTitle>
            <CardDescription>{selectedRestaurant.cuisine}</CardDescription>
            
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span>{selectedRestaurant.rating}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-green-600 mr-1" />
                <span>{selectedRestaurant.priceRange}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {selectedRestaurant.menu.map((item) => (
              <Card key={item._id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{item.itemName}</CardTitle>
                    <Badge variant="secondary">৳ {item.price.toFixed(2)}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.itemName}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <CardDescription>{item.description}</CardDescription>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={()=>handleAddToCart(item)} className="w-full">

                    <Plus className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  )
}