import React, { useState } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"

import useUserData from '@/store/auth'





export function RestaurantMenu() {
  const {restaurant ,addItem ,token ,deleteItem , updateItem} = useUserData()
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const [currentItem, setCurrentItem] = useState({
    _id : '',
    itemName: '',
    description: '',
    price: 0,
    image: '',
  })

  const handleAddItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newItem = {
      itemName: formData.get('name') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string),
      image: formData.get('image') as string,
      //quantity : formData.get('quantity') as number
    
      
    }
    console.log(newItem);
    try {
      // Await the result of addItem
      const result = await addItem(restaurant._id, newItem, token);
      console.log(newItem);
      
      if (result.success) {
          console.log('Item added successfully:', result);
          setIsAddDialogOpen(false); // Close the dialog on success
      } else {
          console.error('Failed to add item:', result.msg);
          alert('Failed to add the menu item. Please try again.');
      }
  } catch (error) {
      console.error('Error while adding item:', error);
      alert('An unexpected error occurred. Please try again.');
  }
  }

  const handleEditItem = (e: React.FormEvent<HTMLFormElement> , item : any) => {
    e.preventDefault()
    //setIsEditDialogOpen(true)
    setCurrentItem(item)
    const formData = new FormData(e.currentTarget)
    const updatedItem ={
      itemName : formData.get('name') as string,
      description : formData.get('description') as string,
      price :parseFloat(formData.get('price') as string) ,
      image : formData.get('image') as string

    }

    //setIsEditDialogOpen(false)
    updateItem(restaurant._id , item._id , updatedItem , token)
    }
    

  const handleDeleteItem = (id: string) => {
    deleteItem(restaurant._id , id , token)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-6">
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Restaurant Menu</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add New Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Menu Item</DialogTitle>
                <DialogDescription>
                  Enter the details of the new menu item below.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddItem}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" name="name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea id="description" name="description" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price
                    </Label>
                    <Input id="price" name="price" type="number" step="0.01" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right">
                      Image URL
                    </Label>
                    <Input id="image" name="image" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Item</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {restaurant.menu.map((item) => (
            <Card key={item._id}>
              <CardHeader className='p-0 mb-4'>
                <img src={item.image} alt={item.itemName} className="w-full h-48 object-cover rounded-t-lg" />
                <CardTitle className='pl-6'>{item.itemName}</CardTitle>
                <CardDescription className='pl-6'>${item.price.toFixed(2)}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{item.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Dialog >
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setCurrentItem(item)}>
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Menu Item</DialogTitle>
                      <DialogDescription>
                        Make changes to the menu item below.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={(e)=>handleEditItem(e ,item)}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-name" className="text-right">
                            Name
                          </Label>
                          <Input id="edit-name" name="name" defaultValue={currentItem.itemName} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-description" className="text-right">
                            Description
                          </Label>
                          <Textarea id="edit-description" name="description" defaultValue={currentItem.description} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-price" className="text-right">
                            Price
                          </Label>
                          <Input id="edit-price" name="price" type="number" step="0.01" defaultValue={currentItem.price} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-image" className="text-right">
                            Image URL
                          </Label>
                          <Input id="edit-image" name="image" defaultValue={currentItem.image} className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the menu item.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteItem(item._id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}