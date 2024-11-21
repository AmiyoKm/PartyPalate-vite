import axios from 'axios'

import { create } from 'zustand'

export interface Item {
    itemName: string;
    price: number;
    description?: string;
    image?: string;
    _id?: string;
    quantity: number;


}
type OrderStatus = "preparing" | "ready" | "delivered"

interface Order  {
    _id: string;
    items: Item[];
    total: number;
    status:  OrderStatus,
}

interface useCart {
    cart: Item[]
    total: number
    order : Order
    orders : Order[]
    addToCart: (item: Item) => void
    removeFromCart: (item: Item) => void
    addOneItemIntoCart: (item: Item) => void
    removeOneItemFromCart: (item: Item) => void
    payment: (cart : any ,selectedRestaurant: any , token : string , total : number) => Promise<void>
    orderConfirmed : () => Promise<void>
    getALlOrders : (user : any , token : string) => Promise<void>
}

const useCart = create<useCart>((set) => ({
    cart: [],
    total: 0,
    order : {
        _id: "",
        items: [
            {
                itemName: "",
                price: 10,
                quantity: 1
            },
            {
                itemName: "",
                price: 0,
                quantity: 1
            }
        ],
        total: 0,
        restaurant: "",
        status: "preparing"
    },
    orders : [],
    addToCart: (item: Item) => {

        set((state) => {
            const existingItem = state.cart.find((cartItem) => item._id === cartItem._id)
            if (existingItem) {
                const updatedCart = state.cart.map((cartItem) =>
                    cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                )
                return { cart: updatedCart }
            }
            else {
                return { cart: [...state.cart, item] }
            }

        })

    },
    removeFromCart: (item: Item) => {
        set((state) => ({ cart: state.cart.filter((cartItem) => cartItem._id !== item._id) }))
    },
    addOneItemIntoCart: (item: Item) => {
        set((state) => {
            const updatedCart = state.cart.map((cartItem) =>
                cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            )


            return { cart: updatedCart }
        })
    },
    removeOneItemFromCart: (item: Item) => {
        set((state) => {
            const updateCart = state.cart.map((cartItem) =>
                cartItem._id === item._id ? (cartItem.quantity === 0 ? cartItem : { ...cartItem, quantity: cartItem.quantity - 1 }) : cartItem
            )
            return { cart: updateCart }
        })
    },
    payment: async(cart , selectedRestaurant: any, token : string , total) => {
       
        try {
            const res =await axios.post(`/api/v1/customer/${selectedRestaurant._id}/orders`, { 
                items : cart ,
                total} ,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res.data);
           // set((state)=> ({cart : state.cart = []}))
            set((state)=> ({order : state.order = res.data.order}))
        } catch (error) {
            console.log(error);
            
        }
    },
    orderConfirmed : async( )=>{
        try {


            set((state)=> ({cart : state.cart = []}))
        } catch (error) {
            console.log(error);
            
        }
    }
    ,
    getALlOrders : async (user ,token : string) => {
        try {
            const res =await axios.get(`/api/v1/customer/${user._id}/orders` ,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res.data);
            set((state)=> ({orders : state.orders = res.data.orders}))
        } catch (error) {
            console.log(error);
            
        }
    }
}))
export default useCart