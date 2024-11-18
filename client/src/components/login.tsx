
import { Link, useNavigate } from 'react-router-dom';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import React from 'react';
import useUserData from '@/store/auth';
import { useToast } from '@/hooks/use-toast';


export function Login() {
  const navigate =useNavigate() 
  const {toast} = useToast()
 const {login} = useUserData()
  const [role, setRole] = React.useState("customer");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleSubmit =async()=>{
    try {
      const res = await login(email,password,role)
      console.log(res);
      
      if(res.msg.user.role === 'customer'){

        if(res.success){
          toast({
            title: `Welcome back ${res.msg.user.username}`,
            description : "Login Successful",
          })
          navigate(`/home/customer/${res.msg.user._id}`)
        }else{
          toast({
            title: `wrong Credentials`,
            description : "Login Unsuccessful",
          })
        }

      }
      else {
        if(res.success){
          toast({
            title: `Welcome back ${res.msg.user.username}`,
            description : "Login Successful",
          })
           navigate(`/dashboard/restaurant/${res.msg.user._id}`) 
        }else if(res.success && !res.msg.user.isRestaurantRegistered){
          
          navigate(`/register/restaurant/${res.msg.user._id}`) 
        }else{
          toast({
            title: `wrong Credentials`,
            description : "Login Unsuccessful",
          })
        }
      }
     
    } catch (error) {
      console.log(error);
      
    }
    
    //console.log(res.msg);
  }
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={setRole}  defaultValue="customer">
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem  value="customer">Customer</SelectItem>
                  <SelectItem   value="restaurant">Restaurant</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" required />
            </div>
            <Button onClick={handleSubmit} type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
