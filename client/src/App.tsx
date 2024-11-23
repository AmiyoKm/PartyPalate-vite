
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { LandingPageComponent } from './components/landing-page'
import { Login } from './components/login'
import RegisterPage from './components/register'
import { HomePageComponent } from './components/HomePage'
import { NavbarComponent } from './components/Navbar'
import { ThemeProvider } from "@/components/theme-provider"
import { Cart } from './components/Cart'
import { EventPlanning } from './components/event-planning'
import { EventManagement } from './components/event-management'
import { CustomerProfile } from './components/Customer-Profile'
import { RestaurantProfile } from './components/RestaurantProfile'
import { RestaurantDashboard } from './components/RestaurantDashboard'
import { RestaurantRegister } from './components/RestaurantRegister'
import { FoodItemDetails } from './components/FoodItem'
import { RestaurantDetails } from './components/RestaurantDetails'
import { PaymentPageComponent } from './components/PaymentPage'
import { OrderConfirmedPageComponent } from './components/orderConfirmed'
import { RestaurantMenuForCustomer } from './components/RestaurantMenuForCustomer'
import { CustomerRegister } from './components/CustomerRegister'
import { CustomerOrders } from './components/CustomerOrders'
import { RestaurantMenu } from './components/RestaurantMenu'
import ConfirmEvent from './components/ConfirmEvent'
import { EventConfirmation } from './components/EventConfirmation'

function App() {
  const location = useLocation()

  const hideNavbar = ['/','/login','/register']

  const shouldHideNavbar = !hideNavbar.includes(location.pathname)

  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    {shouldHideNavbar && <NavbarComponent />}
   
    <Routes>
      <Route path="/" element={<LandingPageComponent />} />  
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/customer/register" element={<CustomerRegister />} />
      <Route path='/register/restaurant' element={<RestaurantRegister/>} />
      <Route path="/home/customer/:id" element={<HomePageComponent />} />
      <Route path="/cart/customer/:id" element={<Cart />} />
      <Route path="/event-planning/customer/:id" element={<EventPlanning />} />
      <Route path="/event-management/customer/:id" element={<EventManagement />} />
      <Route path="/profile/customer/:id" element={<CustomerProfile />} />
      <Route path="/profile/restaurant/:id" element={<RestaurantProfile />} />
      <Route path="/dashboard/restaurant/:id" element={<RestaurantDashboard />} />
      <Route path='/event-planning/customer/:id/:restaurantId' element={<RestaurantDetails/>} />
      <Route path='/event-planning/customer/:id/:restaurantId/confirm-event' element={<ConfirmEvent />} />
      <Route path='/event-planning/customer/:id/:restaurantId/confirmation' element={<EventConfirmation />} />
      <Route path='/customer/payment/:id' element={<PaymentPageComponent/>} />
      <Route path='/customer/:id/order' element={<OrderConfirmedPageComponent/>} />
      <Route path='/customer/:id/restaurant/:restaurantId' element={<RestaurantMenuForCustomer/>} />
      <Route path='/customer/:id/item/:restaurantId/:itemId' element={<FoodItemDetails/>} />
      <Route path='/customer/:id/orders' element={<CustomerOrders/>} />
      <Route path='/restaurant/:id/menu' element={<RestaurantMenu/>} />
      EventConfirmation
    </Routes>
    </ThemeProvider>
    </>
  )
}

export default App
