
import { Button } from "./ui/button"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Trash2, Plus, Minus } from 'lucide-react'
import useCart from '@/store/Cart'
import { Link } from "react-router-dom"
import useUserData from "@/store/auth"




export function Cart() {

   const {cart , addOneItemIntoCart , removeOneItemFromCart , removeFromCart} = useCart()
  const {user} = useUserData()
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
   
      <main className="max-w-7xl mx-auto pt-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Your Cart</h1>
          {cart.length > 0 ? (
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell className="flex items-center">
                        <img src={item.image} alt={item.itemName} className="w-12 h-12 object-cover rounded mr-4" />
                        {item.itemName}
                      </TableCell>
                      <TableCell>৳ {item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Button variant="outline" size="icon" onClick={()=>removeOneItemFromCart(item)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button variant="outline" size="icon" onClick={() => addOneItemIntoCart(item)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>৳ {(item.price * item.quantity).toFixed(2)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(item)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="p-4 flex justify-between items-center">
             
                <div className="text-lg font-semibold">Total: ৳ {total.toFixed(2)}</div>
                <Link to={`/customer/payment/${user._id}`}>
                <Button>Proceed to Checkout</Button>
                </Link>
              </div>
            
             
            </div>
          ) : (
            <div className="text-center py-12">
              <Link to={`/home/customer/${user._id}`} >
              <p className="text-xl text-gray-600 dark:text-gray-400">Your cart is empty</p>
              <Button className="mt-4">Continue Shopping</Button>
              </Link>
             
            </div>
          )}
        </div>
      </main>
    </div>
  )
}