import { useEffect, useState } from "react";
import { Package, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import useUserData from "@/store/auth";
import useCart, { Order } from "@/store/Cart";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type OrderStatus = "preparing" | "ready" | "delivered";

export function CustomerOrders() {
  const { user, token ,updateOrderCustomer } = useUserData();
  const { orders, getALlOrders } = useCart();
  const [review , setReview] =useState('');
 
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "preparing":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "ready":
        return "bg-green-500 hover:bg-green-600";
      case "delivered":
        return "bg-blue-500 hover:bg-blue-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };
  const handleUpdateOrderStars =async (order : Order, index : number) => {
   // console.log(order, index);
    const newOrder = { ...order, stars: index + 1 };
    await updateOrderCustomer(user._id , order._id , newOrder , token)
    //console.log(res.msg);
    
  }
  const handleReview =(order : Order)=>{
    const newOrder = { ...order, review: review };
    updateOrderCustomer(user._id , order._id , newOrder , token)
  }
  useEffect(() => {
    async function fetchOrders() {
      try {
        await getALlOrders(user, token);
      } catch (error) {
        console.log(error);
      }
    } 
    fetchOrders();
  }, [orders]);
  const reversedOrders = [...orders].reverse();
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
        <div className="grid gap-6">
          {reversedOrders.map((order) => (
            <Card key={order._id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <CardTitle className="text-xl">Order {order._id}</CardTitle>
                    <Badge
                      className={`${getStatusColor(order.status)} text-white`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </Badge>
                  </div>
                  <CardDescription className="text-lg font-semibold">
                    Total: ${order.total.toFixed(2)}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {order.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.itemName}</TableCell>
                          <TableCell className="text-right">
                            {item.quantity}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
              {order.status === "delivered" && (
                <div>
                  <CardContent>
                    {
                      order.review && <CardDescription className="text-lg font-semibold text-primary">
                      Your Previous Review: {order.review} </CardDescription> 
                    }
                    <div className="flex items-center justify-between">
                    <CardDescription className="text-lg font-semibold">
                      Rate your order
                      
                    </CardDescription>
                    <div className="flex">{
                      [...Array(5)].map((_, index)=>(
                        <Star onClick={()=>handleUpdateOrderStars(order , index)} key={index} className={`h-6 w-6 ml-2 text-yellow-500 ${order.stars > index ? 'fill-yellow-500' : ''}` }/>
                      ))
                      }
                    
                   
                  
                    </div>
                   
                    </div>
                    
                  </CardContent>
                  <CardFooter >
                    <div className="space-x-5 flex grow items-center">
                    <Input className="w-full" type="text" value={review} onChange={(e)=> setReview(e.target.value)}placeholder="Give a Review" />
                    <Button onClick={()=>handleReview(order )}>Submit</Button>
                    </div>
                   
                  </CardFooter>
                </div>
              )}
            </Card>
          ))}
        </div>
        {orders.length === 0 && (
          <Card className="text-center py-8">
            <CardContent>
              <Package className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-lg font-semibold">No orders found</p>
              <p className="text-muted-foreground">
                You haven't placed any orders yet.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
