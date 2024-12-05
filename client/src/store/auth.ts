import {create}from 'zustand'
import axios from 'axios'

interface User {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    _id : string;
   
}
interface Customer {
    name : string
    bio : string
    phone : string
    address : string
    _id : string
    events : Array<{
        eventName: string;
        date: string;
        time: string;
        description?: string;
        _id: string;
        planner : string;
        guests : number
        restaurantName : string
        status : string
    }>
    orders : []
    favoriteRestaurants : Array<string>
}
interface Restaurant {
    _id: string;
    restaurantName: string;
    image: string;
    address: string;
    phone: string;
    rating : number
    description : string
    priceRange : string
    cuisine : string
    capacity : number
    openingTime : string
    closingTime : string
    isRestaurantRegistered : boolean,
    costPerPerson : number
    menu: Array<{
        itemName: string;
        price: number;
        description: string;
        image: string;
        _id: string
        quantity : number
    }>;
    events: Array<{
        eventName: string;
        date: string;
        time: string;
        description: string;
        _id: string;
        planner : string
        guests : number
        status : string
        plannedBy : string
        
    }>;
    orders: Array<{
        items: Array<{
            itemName: string;
            price: number;
            description: string;
            image: string;
            _id: string
            quantity : number
        }>;
        name : string
        orderedBy : string
        total: number;
        status: string;
        _id: string;
    }>;
}
interface ConfirmedEvent{
    eventName : string
    date : string
    time : string
   
    description : string
    guests : number
    plannerName : string
    cardNumber : string
    expiryDate : string
    cvv : string
} 

interface UserData {
    user: User;
    token : string;
    customer : Customer
    restaurant : Restaurant
    confirmedEvent : ConfirmedEvent
    favoriteRestaurants : Restaurant[]
    setUser: (users: User) => void;
    register: (formData: any) => Promise<({ success: boolean; msg: any })>;
    login : (email : string , password : string , role : string) => any
    logout : () => void
     
    createCustomer : (formData : any , token :string) =>  Promise<({ success: boolean; msg: any })>
    updateCustomer : (formData : any ,user: any, token : string) => Promise<({ success: boolean; msg: any })> 
    addItem : (restaurantId : string , item : any , token : string) => Promise<({ success: boolean; msg: any })>
    deleteItem : (restaurantId : string ,itemId : string , token : string) => Promise<({ success: boolean; msg: any })>
    updateItem : (restaurantId : string ,itemId : string , item : any , token : string) => Promise<({ success: boolean; msg: any })>
    updateOrder : (restaurantId : string ,orderId : string , order : any , token : string) => Promise<({ success: boolean; msg: any })>
    deleteOrder : (restaurantId : string ,orderId : string , token : string) => Promise<({ success: boolean; msg: any })>
    updateRestaurant : (restaurantId : string , formData : any , token : string) => Promise<({ success: boolean; msg: any })>
    createEvent : (restaurantId : string , formData : any , token : string) => Promise<({ success: boolean; msg: any })>
    updateEventForRestaurant : (restaurantId : string , event : any , token : string) => Promise<({ success: boolean; msg: any })>
    updateEventForCustomer : ( userId : string , event : any , token : string) => Promise<({ success: boolean; msg: any })>
    deleteEvent : (restaurantId : string , eventId : string , token : string) => Promise<({ success: boolean; msg: any })>
    createRestaurant : (formData : any , token : string) => Promise<({ success: boolean; msg: any })>
    addFavorite : ( customerId : string , restaurant : Restaurant , token : string) => Promise<({ success: boolean; msg: any })>
    getFavorite : ( customerId : string , token : string) => Promise<({ success: boolean; msg: any })>
    handleRemoveFromFavorite : (id : string) => void
    setToken : (token : string) => void
}
 const useUserData = create<UserData>((set)=>({
    user : {
        username : '',
        email : '',
        password : '',
        confirmPassword : '',
        role : '',
        _id : ''
       
       
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
      image : '',
      phone: '',
      description : '',
      priceRange : '',
      cuisine : '',
      capacity : 0,
      openingTime : '',
    closingTime : '',
      menu: [],
      events: [],
      orders: [],
      rating : 0, 
      isRestaurantRegistered : false ,
      costPerPerson : 0
    },
    favoriteRestaurants : [],
    confirmedEvent : {
        eventName : '',
        date : '',
        time : '',
        description : '',
        guests : 0,
        plannerName : '',
        cardNumber : '',
        expiryDate : '',
        cvv : ''
    },
    setUser : (user) => set({user}),
    setToken: (token) => set(state => ({ token : state.token = token})),
    register : async (formData)=> {
        console.log(formData);
        
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
                //console.log(res.data);
                set(state =>({ user : state.user =res.data.user}))
                set(state =>({ token : state.token = res.data.token }))
                localStorage.setItem('token', res.data.token);
                
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
                //console.log(res.data);
                set(state =>({ user : state.user =res.data.user}))
                set(state =>({ token : state.token = res.data.token }))
                localStorage.setItem('token', res.data.token);
                
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
                _id : ''
                
            }
        }))
        set((state)=> ({
            token : state.token = ''
        }))
        set((state)=> ({
            customer : state.customer = {
                name : '',
                bio : '',
                phone : '',
                address : '',
                _id : '',
                events : [],
                orders : [],
                favoriteRestaurants : []
            }
        }))
        set((state)=> ({
            restaurant : state.restaurant = {
                
                costPerPerson : 0,
                _id: '',
                restaurantName: '',
                address: '',
                image : '',
                rating : 0,
                isRestaurantRegistered : false,
                phone: '',
                description : '',
                priceRange : '',
                cuisine : '',
                capacity : 0,
                openingTime : '',
              closingTime : '',
                menu: [],
                events: [],
                orders: [],
                
            }
        }))
        
    },
    createCustomer : async (formData , token) => {
        console.log(formData);
        try {
            
            const res =   await axios.post('/api/v1/customer', 
                {
                    name : formData.name,
                    bio : formData.bio,
                    phone : formData.phone,
                    address : formData.address
                }
                , {
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
    },
    addItem : async (restaurantId , item , token) =>{
        try {
          const res = await axios.post(`/api/v1/restaurant/${restaurantId}/menu`, item, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
          set((state)=> ({ restaurant : state.restaurant = res.data.restaurant}))
          return  { success : true , msg : res.data}
        } catch (error) {
            return  { success : false , msg : 'Something went wrong'}
          
          
        }
      },
      deleteItem : async (restaurantId , itemId , token) => {
        try {
          const res = await axios.delete(`/api/v1/restaurant/${restaurantId}/menu/${itemId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
          set((state)=> ({ restaurant : state.restaurant = res.data.restaurant}))
          return  { success : true , msg : res.data}
        } catch (error) {
            return  { success : false , msg : 'Something went wrong'}
          
          
        }
      },
      updateItem : async (restaurantId , itemId , item , token) => {
            try {
                const res = await axios.patch(`/api/v1/restaurant/${restaurantId}/menu/${itemId}`, {item : item}, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    }
                })
                set((state)=> ({ restaurant : state.restaurant = res.data.restaurant}))
                return  { success : true , msg : res.data}
            } catch (error) {
                return  { success : false , msg : 'Something went wrong'}
            }

},    updateOrder : async (restaurantId , orderId , order , token) => {
    
     try {
        const res = await axios.patch(`/api/v1/restaurant/${restaurantId}/orders/${orderId}`, {order : order}, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
        })
        set((state)=> ({ restaurant : state.restaurant = res.data.restaurant}))
        return  { success : true , msg : res.data}
    } catch (error) {
        return  { success : false , msg : 'Something went wrong'}
    }
       

},
    deleteOrder : async (restaurantId , orderId , token) => {
        try {
            const res = await axios.delete(`/api/v1/restaurant/${restaurantId}/orders/${orderId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            })
            set((state)=> ({ restaurant : state.restaurant = res.data.restaurant}))
            return  { success : true , msg : res.data}
        } catch (error) {
            return  { success : false , msg : 'Something went wrong'}
        }

},
    updateRestaurant : async (restaurantId , formData , token) => {
        try {
            const res = await axios.patch(`/api/v1/restaurant/${restaurantId}` , formData ,{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            } )
            set((state)=> ({ restaurant : state.restaurant = res.data.restaurant}))
            return { success : true , msg : res.data}
        } catch (error) {   
            return { success : false , msg : 'Something went wrong'}
        }
    },
    createEvent : async (restaurantId , event , token) => {
        console.log(event);
        
        try {
            const res = await axios.post(`/api/v1/restaurant/${restaurantId}/event` , {event : event} ,{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            } )
            //set((state)=> ({ restaurant : state.restaurant = res.data.restaurant}))
            set((state)=> ({customer : state.customer = res.data.customer}))
            set((state)=> ({ confirmedEvent : state.confirmedEvent = event}))
            return { success : true , msg : res.data}
        } catch (error) {   
            return { success : false , msg : 'Something went wrong'}
        }
    },
    updateEventForRestaurant : async ( restaurantId ,  event , token) => {
        try {
            const res = await axios.patch(`/api/v1/restaurant/${restaurantId}/event/${event._id}` , {event : event} ,{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            } )
            
            set((state)=> ({restaurant : state.restaurant = res.data.restaurant}))
            //set((state)=> ({ confirmedEvent : state.confirmedEvent = event}))
            return { success : true , msg : res.data}
        } catch (error) {   
            return { success : false , msg : 'Something went wrong'}
        }


    },
    updateEventForCustomer : async ( userId , event , token) => {
        try {
            const res = await axios.patch(`/api/v1/customer/${userId}/events/${event._id}` , {event : event} ,{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            } )
            set((state)=> ({customer : state.customer = res.data.customer}))
            return { success : true , msg : res.data}
        } catch (error) {
            return { success : false , msg : 'Something went wrong'}
        }
    },
    deleteEvent : async (restaurantId , eventId , token) => {
        try {
            const res = await axios.delete(`/api/v1/restaurant/${restaurantId}/event/${eventId}` , {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            set((state)=> ({restaurant : state.restaurant = res.data.restaurant}))
            return { success : true , msg : res.data}
        } catch (error) {
            return { success : false , msg : 'Something went wrong'}
        }


},
createRestaurant: async (formData, token) => {
    console.log("Token : " + token);

    try {

      const response = await axios.post('/api/v1/restaurant', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.restaurant);
      set((state) => ({ restaurant: state.restaurant = response.data.restaurant }))
      return { success: true, msg: response.data.restaurant };
    } catch (error) {
      return { success: false, msg: "Something went wrong" }
    }
  },
  addFavorite: async (customerId,restaurant, token) => {
    try {
      const response = await axios.post(
        `/api/v1/customer/${customerId}/favorite/${restaurant._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set((state) => ({ customer: state.customer = response.data.customer }));
      return { success: true, msg: response.data.message };
    } catch (error) {
        console.log(error);
        
      return { success: false, msg: "Something went wrong" };
    }
  },
  getFavorite: async (customerId, token) => {
    try {
      const response = await axios.get(
        `/api/v1/customer/${customerId}/favorite`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set((state) => ({ favoriteRestaurants: state.favoriteRestaurants = response.data.favoriteRestaurants }));
      return { success: true, msg: response.data.message };
    } catch (error) {
      return { success: false, msg: "Something went wrong" };
    }
  },
  handleRemoveFromFavorite : (id: string)=> {
    set((state) => ({ favoriteRestaurants: state.favoriteRestaurants.filter((restaurant) => restaurant._id !== id) }));
  }



}


))


export default useUserData