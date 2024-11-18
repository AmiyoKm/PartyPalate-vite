import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Utensils, User, ChefHat } from 'lucide-react'
import useUserData from "../store/auth"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "./ui/toast"
import { Link, useNavigate } from "react-router-dom"

export default function RegisterPage() {
  const navigate = useNavigate()
  const {toast} = useToast()
  const {register } = useUserData()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer"
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!formData.username.trim()) newErrors.username = "Username is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.password) newErrors.password = "Password is required"
    if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      if(formData.role === 'customer'){
        try {
          const res = await register(formData)
          console.log(res);
          
          if(res.success){
            navigate('/home/customer/'+res.msg.user._id)
            toast({
              title: 'Account created successfully !',
              description: `You can now login with your credentials`,
              //action: <Link to="/login"><ToastAction color="secondary"  altText="Try again">Login</ToastAction></Link>
            })
    
          }else{
            toast({
              title: 'Something went wrong !',
               description: `Reason maybe duplicated email or username`,
            })
          }
         
         } catch (error) {
           console.log('error :',error);
         }
      }else {
        try {
          const res = await register(formData)
          console.log(res);
          
          if(res.success){
            navigate('/register/restaurant/')
            toast({
              title: 'Account created successfully !',
              description: `You can now login with your credentials`,
              //action: <Link to="/register/restaurant"><ToastAction color="secondary"  altText="Try again">Login</ToastAction></Link>
            })
    
          }else{
            toast({
              title: 'Something went wrong !',
               description: `Reason maybe duplicated email or username`,
            })
          }
         
         } catch (error) {
           console.log('error :',error);
         }
      }
     
      
      //const res = await axios.get('api/v1/auth/login', {withCredentials: true})
      //console.log(res.data);
      //console.log("Form submitted:", formData)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-900 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center">
            <Utensils className="h-8 w-8" />
            <CardTitle className="text-2xl font-bold">PartyPalate</CardTitle>
          </div>
          <CardDescription>Create an account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="enter username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Role</Label>
                <RadioGroup defaultValue="customer" name="role" onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="customer" id="customer" />
                    <Label htmlFor="customer" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Customer
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="restaurant" id="restaurant" />
                    <Label htmlFor="restaurant" className="flex items-center">
                      <ChefHat className="mr-2 h-4 w-4" />
                      Restaurant
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <Button className="w-full" type="submit">
                Register
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-center text-gray-700 dark:text-gray-300">
            By clicking Register, you agree to our{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}