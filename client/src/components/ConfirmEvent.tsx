import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

import { Clock, CreditCard, Users } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import useUserData from "@/store/auth";
import useRestaurantInfo from "@/store/Restaurant";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";


const formSchema = z.object({
  eventName: z.string().min(2, {
    message: "Event name must be at least 2 characters.",
  }),
  date: z.string({
    required_error: "Date is required.",
  }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Please enter a valid time in HH:MM format.",
  }),
  description: z.string().min(10, {
    message: "description must be at least 10 characters",
  }),
  guests: z.number().min(1, {
    message: "Guests must be at least 1.",
  }),
  plannerName: z.string().min(2, {
    message: "Planner name must be at least 2 characters.",
  }),
  cardNumber: z.string().regex(/^\d{16}$/, {
    message: "Card number must be 16 digits",
  }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: "Please enter a valid expiry date in MM/YY format.",
  }),
  cvv: z.string().regex(/^\d{3}$/, {
    message: "Please enter a valid CVV.",
  }),
});

const ConfirmEvent = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user , token , createEvent } = useUserData();
  const {selectedRestaurantForPlanning}=useRestaurantInfo()

  const getTotal =()=>{
    let guests = form.watch("guests")
    let pr = selectedRestaurantForPlanning.priceRange
    let value = 0
    if(pr ==='Inexpensive'){
      value = 10000
    }
    if(pr ==='Moderate'){
      value = 20000
    }
    if(pr ==='Expensive'){
      value = 30000
    }
    if(pr ==='Very Expensive'){
      value = 50000
    }
  
   return value + selectedRestaurantForPlanning.costPerPerson*guests
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: "",
      date: "",
      time: "",
      description: "",
      guests: 0,
      plannerName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
   const res =  await createEvent(selectedRestaurantForPlanning._id , values , token)

   if(res.success){
    toast({
      title: 'Event created successfully !',
    })
    //console.log(values);
    navigate(`/event-planning/customer/${user._id}/${selectedRestaurantForPlanning._id}/confirmation`)
  }
  if(!res.success){
    toast({
      title: 'Something went wrong !',
      description: 'Event creation failed  !',
    })
  }
  }
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-6">
      <main className="container mx-auto py-6 sm:px-6 lg:px-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Confirm Your Event</CardTitle>
            <CardDescription>
              Please review and confirm your event details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form} >
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="eventName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Event Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="DD/MM/YY"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Time</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Clock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            className="pl-8"
                            placeholder="HH:MM"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField control={form.control} 
                name='description' 
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Enter event description" className="resize-none" {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name='guests'
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Number of Guests</FormLabel>
                        <FormControl>
                        <div className="relative">
                            
                                <Users className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-8" placeholder="Enter number of guests" type="number"  {...field}
                                onChange={(e)=>field.onChange(parseInt(e.target.value))}/>
                            
                            
                        </div>
                        </FormControl>
                        <FormMessage />
                        
                    </FormItem>
                )}
                />
                <FormField 
                control={form.control}
                name="plannerName"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Planner Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter planner name" {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Payment Information</h3>
                        <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <CreditCard className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input placeholder="1234 5678 901" className="pl-8" {...field}/>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                            control={form.control}
                            name="expiryDate"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Expiry Date</FormLabel>
                                    <FormControl>
                                        <Input placeholder="MM/YY" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="cvv"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>CVV</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="123" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full">Pay {getTotal().toLocaleString()} $</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ConfirmEvent;
