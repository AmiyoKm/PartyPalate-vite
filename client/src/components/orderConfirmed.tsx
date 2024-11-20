import React from 'react'
import { Check, ChevronRight, Clock, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"


// Mock data for the confirmed order
const confirmedOrder = {
  orderNumber: "ORD-12345",
  restaurantName: "Gourmet Delights",
  estimatedDeliveryTime: "30-45 minutes",
  deliveryAddress: "123 Main St, Anytown, AN 12345",
  items: [
    { name: "Spicy Grilled Salmon", quantity: 2, price: 24.99 },
    { name: "Chocolate Lava Cake", quantity: 1, price: 9.99 },
    { name: "Caesar Salad", quantity: 2, price: 15.00 },
  ],
  subtotal: 89.97,
  tax: 7.20,
  total: 97.17,
}

export function OrderConfirmedPageComponent() {
  
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
              Your order #{confirmedOrder.orderNumber} has been placed successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <span>Estimated Delivery Time:</span>
              </div>
              <span className="font-semibold">{confirmedOrder.estimatedDeliveryTime}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span>Delivery Address:</span>
              </div>
              <span className="font-semibold">{confirmedOrder.deliveryAddress}</span>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Order Summary</h3>
              <ul className="space-y-2">
                {confirmedOrder.items.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.quantity}x {item.name}</span>
                    <span>${(item.quantity * item.price).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${confirmedOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${confirmedOrder.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${confirmedOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full">
              Track Order
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" className="w-full">
              Return to Home
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}