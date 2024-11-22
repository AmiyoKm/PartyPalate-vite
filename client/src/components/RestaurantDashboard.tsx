import React, { useState, useEffect } from 'react'
import { Calendar, Clock, Users, Utensils, Plus, Trash2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Link } from 'react-router-dom'
import useUserData from '@/store/auth'


// Types for our data
type Event = {
  id: number
  name: string
  date: string
  time: string
  guests: number
  status: string
}

type Order = {
  id?: string
  customerName: string
  items: string[]
  total: number
  status: string
}

// Placeholder functions for API calls
const fetchEvents = async (): Promise<Event[]> => {
  // Replace with actual API call
  return [
    { id: 1, name: "Corporate Dinner", date: "2023-07-15", time: "19:00", guests: 50, status: "Pending" },
    { id: 2, name: "Wedding Reception", date: "2023-07-20", time: "18:00", guests: 100, status: "Confirmed" },
    { id: 3, name: "Birthday Party", date: "2023-07-22", time: "20:00", guests: 30, status: "Pending" },
    { id: 4, name: "Charity Gala", date: "2023-07-25", time: "19:30", guests: 80, status: "Confirmed" },
    { id: 5, name: "Product Launch", date: "2023-07-28", time: "18:30", guests: 60, status: "Pending" },
  ]
}





export function RestaurantDashboard() {
  const {user , token ,restaurant , updateOrder ,deleteOrder} = useUserData() 

  const [events, setEvents] = useState<Event[]>([])


  // useEffect(() => {
  //   const loadData = async () => {
  //     const [eventData, orderData] = await Promise.all([fetchEvents(), fetchOrders()])
  //     setEvents(eventData)
  //     setOrders(orderData)
  //   }
  //   loadData()
  // }, [])

 

  const handleUpdateEventStatus = async (id: number, newStatus: string) => {

    setEvents(events.map(event => 
      event.id === id ? { ...event, status: newStatus } : event
    ))
  }

  const handleDeleteEvent = async (id: number) => {
   
    setEvents(events.filter(event => event.id !== id))
  }

  const handleUpdateOrderStatus = async (order : any , id: string, newStatus: string ) => {
    // setOrders(restaurant.orders.map(order => 
    //   order._id === id ? { ...order, status: newStatus } : order
    // ))
    console.log(order);
    
    const updatedOrder = {...order , status : newStatus}
    console.log(updatedOrder);
    
    updateOrder(restaurant._id , id , updatedOrder , token)
  }

  const handleDeleteOrder = async (id: string) => {
    deleteOrder(restaurant._id , id , token)
    //setOrders(restaurant.orders.filter(order => order._id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
   
      <main className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Restaurant Dashboard</h1>
            <Link to={`/restaurant/${restaurant._id}/menu`}>
            <Button>Go To Menu</Button>
            </Link>
          
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Events requested by customers</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                {events.map((event) => (
                  <div key={event.id} className=" mb-4 p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{event.name}</h3>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center mt-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            {event.date}
                          </div>
                          <div className="flex items-center mt-1">
                            <Clock className="w-4 h-4 mr-1" />
                            {event.time}
                          </div>
                          <div className="flex items-center mt-1">
                            <Users className="w-4 h-4 mr-1" />
                            {event.guests} guests
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        {/* <Badge variant={event.status === "Confirmed" ? "default" : "secondary"}>
                          {event.status}
                        </Badge> */}
                        <Select
                        
                          onValueChange={(value) => handleUpdateEventStatus(event.id, value)}
                          defaultValue={event.status}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Update status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Confirmed">Confirmed</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the event.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteEvent(event.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Food Orders</CardTitle>
              <CardDescription>Recent orders made by customers</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                {restaurant.orders.map((order) => (
                  <div key={order._id} className="mb-4 p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">Ordered By: <span className='text-primary '>{order.name}</span></h3>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {order.items.map((item) => {
                            return `${item.itemName} x ${item.quantity}`
                          } ).join(", ")}
                        </div>
                        <div className="text-sm font-medium mt-1">
                          Total: ${order.total.toFixed(2)}
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        {/* <Badge variant={
                          order.status === "Preparing" ? "default" :
                          order.status === "Ready" ? "secondary" : "outline"
                        }>
                          {order.status}
                        </Badge> */}
                        <Select
                         value={order.status}
                          onValueChange={(value) => handleUpdateOrderStatus(order ,order._id, value)}
                          
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue  placeholder="Update status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="preparing">Preparing</SelectItem>
                            <SelectItem value="ready">Ready</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                          </SelectContent>
                        </Select>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the order.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction disabled={ order.status === "Delivered" ? true : false} onClick={() => handleDeleteOrder(order._id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}