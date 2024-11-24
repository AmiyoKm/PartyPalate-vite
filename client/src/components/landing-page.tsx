import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Utensils, Calendar, Truck, Star } from 'lucide-react'

export function LandingPageComponent() {
  return (
    <div className="flex flex-col min-h-screen max-w-[1500px] lading-page">
      <header className="px-4 lg:px-6 h-14 flex justify-between  items-center">
        <Link className="flex items-center justify-center" to="/">
          <Utensils className="h-6 w-6" />
          <span className="ml-2 text-2xl font-bold">PartyPalate</span>
        </Link>
       
        <div  className="ml-4 flex gap-2">
          <Link to ='/login'><Button variant="outline" size="sm">Login</Button></Link>
          
          <Link to ='/register'><Button size="sm">Register</Button></Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to PartyPalate
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Your one-stop solution for delicious food ordering and seamless event booking.
                </p>
              </div>
              <div className="space-x-4">
                <Button><Link to='/login'>Order Now</Link></Button>
                <Button variant="outline"><Link to='/login'>Book Event</Link></Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Our Services</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <Utensils className="h-10 w-10 mb-2" />
                  <CardTitle>Food Ordering</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Order from a wide variety of cuisines for any occasion.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Calendar className="h-10 w-10 mb-2" />
                  <CardTitle>Event Booking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Book venues and catering for your special events.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Truck className="h-10 w-10 mb-2" />
                  <CardTitle>Fast Delivery</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Enjoy quick and reliable delivery to your doorstep.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Star className="h-10 w-10 mb-2" />
                  <CardTitle>Quality Assurance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>We ensure top-notch quality in all our services.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
       
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 PartyPalate. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}