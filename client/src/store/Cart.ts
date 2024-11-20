import axios from 'axios'
import { create } from 'zustand'

export interface Item {
    itemName: string;
    price: number;
    description?: string;
    image?: string;
    _id: string;
    quantity: number;


}

interface useCart {
    cart: Item[]
    total: number
    addToCart: (item: Item) => void
    removeFromCart: (item: Item) => void
    addOneItemIntoCart: (item: Item) => void
    removeOneItemFromCart: (item: Item) => void
    payment: (cart : any ,selectedRestaurant: any , token : string , total : number) => Promise<void>
}

const useCart = create<useCart>((set) => ({
    cart: [],
    total: 0,
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
            set((state)=> ({cart : state.cart = []}))
            
        } catch (error) {
            console.log(error);
            
        }
    }
}))
export default useCart