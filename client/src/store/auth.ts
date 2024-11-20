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

interface UserData {
    user: User;
    token : string;
    setUser: (users: User) => void;
    register: (formData: User) => Promise<({ success: boolean; msg: any })>;
    login : (email : string , password : string , role : string) => Promise<({ success: boolean; msg: any })>
    logout : () => void
    createCustomer : (formData : any , token :string) =>  Promise<({ success: boolean; msg: any })>
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
        try {
            const res =   await axios.post('/api/v1/auth/login', {email , password , role})
            console.log(res.data);
            set(state =>({ user : state.user =res.data.user}))
            set(state =>({ token : state.token =res.data.token}))
            
            
            return { success : true , msg : res.data}
        } catch (error) {
            return { success : false , msg : 'Something went wrong'}
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
            return { success : true , msg : res.data}
        } catch (error) {
            return { success : false , msg : 'Something went wrong'}
        }
    }

}))


export default useUserData