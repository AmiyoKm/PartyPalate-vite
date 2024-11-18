import React, { useState, useEffect } from 'react'
import { Calendar, Clock, Users, Utensils, Plus, Trash2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"


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
  id: number
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

const fetchOrders = async (): Promise<Order[]> => {
  // Replace with actual API call
  return [
    { id: 101, customerName: "John Doe", items: ["Grilled Salmon", "Caesar Salad", "Chocolate Mousse"], total: 89.97, status: "Preparing" },
    { id: 102, customerName: "Jane Smith", items: ["Beef Tenderloin", "Truffle Fries", "Tiramisu"], total: 112.50, status: "Ready" },
    { id: 103, customerName: "Mike Johnson", items: ["Vegetarian Pasta", "Garlic Bread", "Fruit Tart"], total: 67.25, status: "Delivered" },
    { id: 104, customerName: "Emily Brown", items: ["Sushi Platter", "Miso Soup", "Green Tea Ice Cream"], total: 95.00, status: "Preparing" },
    { id: 105, customerName: "Alex Wilson", items: ["Margherita Pizza", "Caprese Salad", "Panna Cotta"], total: 72.80, status: "Ready" },
  ]
}

const updateEventStatus = async (id: number, newStatus: string): Promise<void> => {
  // Replace with actual API call
  console.log(`Updating event ${id} status to ${newStatus}`)
}

const deleteEvent = async (id: number): Promise<void> => {
  // Replace with actual API call
  console.log(`Deleting event ${id}`)
}

const updateOrderStatus = async (id: number, newStatus: string): Promise<void> => {
  // Replace with actual API call
  console.log(`Updating order ${id} status to ${newStatus}`)
}

const deleteOrder = async (id: number): Promise<void> => {
  // Replace with actual API call
  console.log(`Deleting order ${id}`)
}

const addNewMenuItem = async (item: { name: string; description: string; price: string }): Promise<void> => {
  // Replace with actual API call
  console.log('Adding new menu item:', item)
}

export function RestaurantDashboard() {
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false)
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '' })
  const [events, setEvents] = useState<Event[]>([])
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const loadData = async () => {
      const [eventData, orderData] = await Promise.all([fetchEvents(), fetchOrders()])
      setEvents(eventData)
      setOrders(orderData)
    }
    loadData()
  }, [])

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault()
    await addNewMenuItem(newItem)
    setIsAddItemDialogOpen(false)
    setNewItem({ name: '', description: '', price: '' })
  }

  const handleUpdateEventStatus = async (id: number, newStatus: string) => {
    await updateEventStatus(id, newStatus)
    setEvents(events.map(event => 
      event.id === id ? { ...event, status: newStatus } : event
    ))
  }

  const handleDeleteEvent = async (id: number) => {
    await deleteEvent(id)
    setEvents(events.filter(event => event.id !== id))
  }

  const handleUpdateOrderStatus = async (id: number, newStatus: string) => {
    await updateOrderStatus(id, newStatus)
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ))
  }

  const handleDeleteOrder = async (id: number) => {
    await deleteOrder(id)
    setOrders(orders.filter(order => order.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
   
      <main className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Restaurant Dashboard</h1>
          <Dialog open={isAddItemDialogOpen} onOpenChange={setIsAddItemDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add New Food Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Food Item</DialogTitle>
                <DialogDescription>
                  Enter the details of the new food item you want to add to your menu.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddItem}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={newItem.price}
                      onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Item</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
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
                {orders.map((order) => (
                  <div key={order.id} className="mb-4 p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{order.customerName}</h3>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {order.items.join(", ")}
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
                          onValueChange={(value) => handleUpdateOrderStatus(order.id, value)}
                          defaultValue={order.status}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Update status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Preparing">Preparing</SelectItem>
                            <SelectItem value="Ready">Ready</SelectItem>
                            <SelectItem value="Delivered">Delivered</SelectItem>
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
                              <AlertDialogAction onClick={() => handleDeleteOrder(order.id)}>
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