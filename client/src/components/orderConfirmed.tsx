
import { Check, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import useCart from '@/store/Cart'
import useUserData from '@/store/auth'
import { Link } from 'react-router-dom'



export function OrderConfirmedPageComponent() {
  const {  order}= useCart()
  const {user ,customer}= useUserData()
  const total = order.items.reduce((sum ,item)=> sum + item.price * item.quantity , 0)
  const tax = total * 0.07
  const grandTotal = total + tax
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
              <Check className="text-white w-6 h-6" />
            </div>
            <CardTitle className="text-2xl font-bold">Order Confirmed!</CardTitle>
            <CardDescription>
              Your order {`${order._id}`} has been placed successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
           
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span>Delivery Address:</span>
              </div>
             <span className="font-semibold">{customer.address}</span>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Order Summary</h3>
              <ul className="space-y-2">
                {order.items.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.quantity}x {item.itemName}</span>
                    <span>৳ {(item.quantity * item.price).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>৳ {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>৳ {tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>৳ {grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full">
            <Link to={`/customer/${user._id}/orders`}>
              Track Order
              {/* <ChevronRight className="w-4 h-4 ml-2" /> */}
              </Link>
            </Button>
           
            <Button variant="outline" className="w-full">
            <Link to={`/home/customer/${user._id}`}>
              Return to Home
              </Link>
            </Button>
          
            
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}