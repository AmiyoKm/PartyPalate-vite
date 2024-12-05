
import { Calendar, Clock, Users,  Trash2, Star } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Link } from 'react-router-dom'
import useUserData from '@/store/auth'



export function RestaurantDashboard() {
  const { token ,restaurant , updateOrder ,deleteOrder ,updateEventForRestaurant ,deleteEvent ,user } = useUserData() 

  


 

  const handleUpdateEventStatus = async ( event : any , value : string) => {
    const updatedEvent = { ...event , status : value}
    updateEventForRestaurant(restaurant._id , updatedEvent , token)
  }

  const handleDeleteEvent = async (event :any) => {
    deleteEvent(user._id , event._id , token) 
   
  }

  const handleUpdateOrderStatus = async (order : any , id: string, newStatus: string ) => {
 
    console.log(order);
    
    const updatedOrder = {...order , status : newStatus}
    console.log(updatedOrder);
    
    updateOrder(restaurant._id , id , updatedOrder , token)
  }

  const handleDeleteOrder = async (id: string) => {
    deleteOrder(restaurant._id , id , token)
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
                {restaurant.events.map((event) => (
                  <div key={event._id} className=" mb-4 p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{event.eventName}</h3>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center mt-1">
                             Planned By : {event.planner} 
                          </div>
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
                        
                        value={event.status}
                          onValueChange={(value) => handleUpdateEventStatus(event , value)}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Update status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="waiting">Pending</SelectItem>
                            <SelectItem value="accepted">Accept</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            {/* <SelectItem value="cancelled">Cancelled</SelectItem> */}
                            <SelectItem value="rejected">Reject</SelectItem>
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
                              <AlertDialogAction onClick={() => handleDeleteEvent(event)}>
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
                        <div className="text-lg font-medium mt-1 text-primary">
                          Review : {order.review}
                        </div>
                        <div className='flex ' >
                          {
                            [...Array(5)].map((_,index) => (
                              <Star key={index} className={`text-sm text-yellow-500 ${order.stars >index ? 'fill-yellow-500' : ''}`} />
                            ))
                          }
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