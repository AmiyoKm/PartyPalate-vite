
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Building2, MapPin, Phone, Users, Utensils,  Clock, ImageIcon, Star } from 'lucide-react'

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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card"

import useUserData from '@/store/auth'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'


const formSchema = z.object({
  restaurantName: z.string().min(2, {
    message: "Restaurant name must be at least 2 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  phone: z.string().regex(/^(?:\+880|880|0)1[3-9]\d{8}$/, {
    message: "Please enter a valid phone number.",
  }),
  capacity: z.number().min(1, {
    message: "Capacity must be at least 1.",
  }),
  cuisine: z.string().min(2, {
    message: "Cuisine must be at least 2 characters.",
  }),
  priceRange: z.enum(["Inexpensive","Moderate","Expensive","Very Expensive",]),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  image: z.string().url({
    message: "Please enter a valid URL for the image.",
  }),
  openingTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Please enter a valid time in HH:MM format.",
  }),
  closingTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Please enter a valid time in HH:MM format.",
  }),
  rating : z.number().min(0 , { 
    message: "Rating must be between 0 and 5."
  }).max(5 , {
    message: "Rating must be between 0 and 5."
  })
})

export function RestaurantRegister() {
  const navigate =useNavigate()
  const {toast} = useToast()
 // const {user} = useUserData()
  
  const {token , createRestaurant} = useUserData()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      restaurantName: "",
      address: "",
      phone: "",
      capacity: 0,
      cuisine: "",
      priceRange: "Moderate",
      description: "",
      image: "",
      openingTime: "",
      closingTime: "",
      rating : 0
    },
  })

 async function onSubmit(values: z.infer<typeof formSchema>) {
   try {
     values.rating = Number(values.rating)
     const res =  await createRestaurant(values , token)

     console.log(res)
      if(res.success){
       // loggedInRestaurant.isRestaurantRegistered = true
        toast({
          title: 'Restaurant created successfully !',
        })
        navigate(`/dashboard/restaurant/${res.msg._id}`)
      }
      if(!res.success){
        toast({
          title: 'Something went wrong !',
          description: 'Restaurant creation failed  !',
        })
      }
    } catch (error) {
      
    }
   
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
    
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Register Your Restaurant</CardTitle>
            <CardDescription>Provide details about your restaurant to get started.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="restaurantName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Restaurant Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Building2 className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                          <Input placeholder="Enter restaurant name" className="pl-8" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                          <Input placeholder="Enter restaurant address" className="pl-8" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                          <Input placeholder="Enter phone number" className="pl-8" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacity</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Users className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                          <Input type="number" placeholder="Enter capacity" className="pl-8" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cuisine"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cuisine</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Utensils className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                          <Input placeholder="Enter cuisine type" className="pl-8" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priceRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price Range</FormLabel>
                      <Controller
                        name="priceRange"
                        control={form.control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select price range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Inexpensive">10000 (Inexpensive)</SelectItem>
                              <SelectItem value="Moderate">20000 (Moderate)</SelectItem>
                              <SelectItem value="Expensive">30000 (Expensive)</SelectItem>
                              <SelectItem value="Very Expensive">50000 (Very Expensive)</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter restaurant description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <ImageIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                          <Input placeholder="Enter image URL" className="pl-8" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="openingTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Opening Time</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Clock className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                            <Input placeholder="HH:MM" className="pl-8" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="closingTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Closing Time</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Clock className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                            <Input placeholder="HH:MM" className="pl-8" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Star className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                          <Input  type='number' placeholder="Enter image URL" className="pl-8" {...field} onChange={(e)=>field.onChange(Number(e.target.value))} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Register Restaurant</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}