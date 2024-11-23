
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription,CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Badge } from "./ui/badge"
import { Calendar, Clock, Users, MapPin } from 'lucide-react'
import useUserData from '@/store/auth'


export function EventManagement() {
 const {customer , updateEventForCustomer , token , user} = useUserData()
 const handleStatusColor = (status : string)=>{
  switch(status) {
    case "waiting" : return "outline"
    case "accepted" : return "secondary"
    case "rejected" : return "destructive"
    case "cancelled" : return "destructive"
    case "completed" : return "default"
  }
 }
 const upcomingEvents = () => {
  let number = 0

  customer.events.forEach((event)=> {
    if(event.status ==="accepted") number++

  })
  return number
 }
 const totalGuests =()=> {
  const number = customer.events.reduce((sum , event)=> sum + event.guests , 0)
  return number
 }
 async function handleUpdateEventStatus(event : any , status : string) {
   const updatedEvent = { ...event , status : status}
   console.log(updatedEvent);
   
   await updateEventForCustomer(user._id , updatedEvent , token)
 }
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
   
      <main className="max-w-7xl mx-auto pt-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Your Events</h1>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Manage your booked events</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event Name</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Guests</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customer.events.map((event) => (
                      <TableRow key={event._id}>
                        <TableCell>{event.eventName}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {event.date}
                          </div>
                          <div className="flex items-center mt-1">
                            <Clock className="w-4 h-4 mr-2" />
                            {event.time}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            {event.guests}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {event.restaurantName}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={handleStatusColor(event.status) }>
                            {event.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button onClick={()=> handleUpdateEventStatus(event , event.status==='cancelled' ? "waiting" : "cancelled")}  variant={event.status !== "cancelled" ? "destructive" : "default"} size="sm">{event.status !== "cancelled" ? "Cancel" : "Undo"}</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Event Statistics</CardTitle>
                <CardDescription>Overview of your event history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{customer.events.length}</div>
                      
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{upcomingEvents()}</div>
                      
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{totalGuests()}</div>
                     
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}