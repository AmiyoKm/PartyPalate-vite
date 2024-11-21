import {create}from 'zustand'
import axios from 'axios'

interface User {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    _id ?: string;
   
}
interface Customer {
    name : string
    bio : string
    phone : string
    address : string
    _id ?: string
    events : []
    orders : []
    favoriteRestaurants : []
}
interface Restaurant {
    _id: string;
    restaurantName: string;
    address: string;
    phone: string;
    menu: Array<{
        itemName: string;
        price: number;
        description?: string;
        image?: string;
        _id: string
        quantity : number
    }>;
    events: Array<{
        eventName: string;
        date: string;
        time: string;
        description?: string;
        _id: string;
    }>;
    orders: Array<{
        items: Array<{
            itemName: string;
            price: number;
            description?: string;
            image?: string;
            _id: string
            quantity : number
        }>;
        total: number;
        status: string;
        _id: string;
    }>;
}
interface UserData {
    user: User;
    token : string;
    customer : Customer
    restaurant : Restaurant
    setUser: (users: User) => void;
    register: (formData: User) => Promise<({ success: boolean; msg: any })>;
    login : (email : string , password : string , role : string) => any
    logout : () => void
    createCustomer : (formData : any , token :string) =>  Promise<({ success: boolean; msg: any })>
    updateCustomer : (formData : any ,user: any, token : string) => Promise<({ success: boolean; msg: any })> 
}
 const useUserData = create<UserData>((set)=>({
    user : {
        username : '',
        email : '',
        password : '',
        confirmPassword : '',
        role : ''
       
       
    },
    token : '',
    customer : {
        name : '',
        bio : '',
        phone : '',
        address : '',
        _id : '',
        events : [],
        orders : [],
        favoriteRestaurants : []
    },
    restaurant : {
      _id: '',
      restaurantName: '',
      address: '',
      phone: '',
      menu: [],
      events: [],
      orders: [],  
    },
    setUser : (user) => set({user}),
    register : async (formData)=> {
        try {
            const res =   await axios.post('/api/v1/auth/register', formData)
            console.log(res.data);
            set(state =>({ user : state.user =res.data.user}))
            set(state =>({ token : state.token =res.data.token}))
            return { success : true , msg : res.data}
        } catch (error) {
            console.log('error :',error);
            return { success : false , msg : 'Something went wrong'}
        }
    
     
    },
    login : async(email , password ,role ) => {
        if(role === 'customer'){
            try {
                const res =   await axios.post('/api/v1/auth/login', {email , password , role})
                console.log(res.data);
                set(state =>({ user : state.user =res.data.user}))
                set(state =>({ token : state.token =res.data.token}))
                
                const customer = await axios.get(`/api/v1/customer/${res.data.user._id}` ,{
                    headers : {
                        Authorization : `Bearer ${res.data.token}`
                    }
                })
                set(state =>({ customer : state.customer =customer.data.customer}))
    
                return { success : true , msg : res.data}
            } catch (error) {
                return { success : false , msg : 'Something went wrong'}
            }
        }else if(role ==='restaurant'){
            try {
                const res =   await axios.post('/api/v1/auth/login', {email , password , role})
                console.log(res.data);
                set(state =>({ user : state.user =res.data.user}))
                set(state =>({ token : state.token =res.data.token}))
                
                const restaurant = await axios.get(`/api/v1/restaurant/${res.data.user._id}` ,{
                    headers : {
                        Authorization : `Bearer ${res.data.token}`
                    }
                })
                set(state =>({ restaurant : state.restaurant =restaurant.data.restaurant}))
    
                return { success : true , msg : res.data}
            } catch (error) {
                return { success : false , msg : 'Something went wrong'}
            }
        }
       
    },
    logout : ()=> {
       
        set((state)=> ({
            user : state.user ={
                username : '',
                email : '',
                password : '',
                confirmPassword : '',
                role : '',
                
            }
        }))
        
    },
    createCustomer : async (formData , token) => {
        try {
            const res =   await axios.post('/api/v1/customer', formData , {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            
            console.log(res.data);
            set((state)=> ({customer : state.customer = res.data.customer}))
            return { success : true , msg : res.data}
        } catch (error) {
            return { success : false , msg : 'Something went wrong'}
        }
    },
    updateCustomer : async ( formData ,user, token )=>{
        try {
            const res =   await axios.patch(`/api/v1/customer/${user._id}`, formData , {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            
            console.log(res.data);
            set((state)=> ({customer : state.customer = res.data.customer}))
            return { success : true , msg : res.data}
        } catch (error) {
            console.log(error);
            return { success : false , msg : "Something went wrong"}
        }
    }

}))


export default useUserData