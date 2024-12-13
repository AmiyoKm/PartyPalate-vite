
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { CreditCard, Calendar, Lock} from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
 
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import useCart from '@/store/Cart'
import { useNavigate } from 'react-router-dom'
import useUserData from '@/store/auth'
import { FaArrowLeft } from 'react-icons/fa'
import useRestaurantInfo from '@/store/Restaurant'



const formSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, { message: "Card number must be 16 digits" }),
  cardName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Expiry date must be in MM/YY format" }),
  cvv: z.string().regex(/^\d{3,4}$/, { message: "CVV must be 3 or 4 digits" }),
})



export function PaymentPageComponent() {
  const navigate = useNavigate()
  const {cart , payment , orderConfirmed} = useCart()
  const {selectedRestaurant} = useRestaurantInfo()
  const {user , token} = useUserData()
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = total * 0.07
  const grandTotal = total + tax
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    },
  })
//
 async function onSubmit(values: z.infer<typeof formSchema>) {
   await payment(values.cardName ,cart , selectedRestaurant , token , grandTotal)

    console.log(cart ,selectedRestaurant , token)
    await orderConfirmed()
    navigate(`/customer/${user?._id}/order/`)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className='flex items-center mb-6 cursor-pointer' onClick={() => navigate(`/cart/customer/${user?._id}`)} ><FaArrowLeft /> <span className='ml-2 font-bold text-lg'>Go To Cart</span></div>
        <h1 className="text-3xl font-bold mb-6">Complete Your Order</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>Enter your payment information securely</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <CreditCard className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="1234 5678 9012 3456" className="pl-8" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cardName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name on Card</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="MM/YY" className="pl-8" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="123" className="pl-8" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">Pay ৳ {grandTotal.toFixed(2)}</Button>
                  
                </form>
              </Form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Review your order details</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {cart.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.quantity}x {item.itemName}</span>
                    <span>৳ {(item.quantity * item.price).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <Separator className="my-4" />
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
          </Card>
        </div>
      </main>
    </div>
  )
}