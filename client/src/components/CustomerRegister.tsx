
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { User, MapPin, Phone, FileText } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import useUserData from '@/store/auth'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'


const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  phone: z.string().regex(/^(?:\+880|880|0)1[3-9]\d{8}$/,
   {
    message: "Please enter a valid phone number.",
  }),
  bio: z.string().max(500, {
    message: "Bio must not exceed 500 characters.",
  }).optional(),
})

export function CustomerRegister() {
 const {toast}= useToast()
 const navigate = useNavigate()
  const {user , token ,createCustomer} =useUserData()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      bio: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
  const res =   await createCustomer(values , token)
  if(res.success){
    toast({
      title: 'Customer created successfully !',
    })
    navigate(`/home/customer/${user?._id}`)
  }
  if(!res.success){
    toast({
      title: 'Something went wrong !',
      description: 'Customer creation failed  !',
    })
  }
    console.log(values)
    

  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
     
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Register as a Customer</CardTitle>
            <CardDescription>Join Party Palate to start ordering delicious meals!</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="John Doe" className="pl-8" {...field} />
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
                          <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="123 Main St, City, Country" className="pl-8" {...field} />
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
                          <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="+1234567890" className="pl-8" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio (Optional)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FileText className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Textarea 
                            placeholder="Tell us a bit about yourself..." 
                            className="pl-8 min-h-[100px]" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Max 500 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Register</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}