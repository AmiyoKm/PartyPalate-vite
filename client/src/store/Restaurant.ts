import { create } from 'zustand';
import axios from 'axios';




export interface Restaurant {
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
    customerName: string;
    customerId: string;
    items: Array<{
      itemName: string;
      itemPrice: number;
      itemQuantity: number
    }>;
    status: string;
  }>;
  capacity: number;
  cuisine: string;
  priceRange: string;
  description: string;
  image: string;
  openingTime: string;
  closingTime: string;
  rating: number;
  isRestaurantRegistered: boolean
}
interface Item {

  itemName: string;
  price: number;
  _id: string
  description: string
  image: string
  quantity : number

}

interface RestaurantStore {
  restaurants: Restaurant[];
  loggedInRestaurant: Restaurant
  selectedRestaurant : Restaurant
  selectedRestaurantForPlanning : Restaurant
  item: Item
  restaurantName: string
  setRestaurants: (restaurant: Restaurant) => void;
  getAllRestaurants: (user: any) => Promise<void>;
  createRestaurant: (formData: any, token: string) => Promise<({ success: boolean, msg: any })>;
  getItem: (restaurantId: string, itemId: string, token: string) => Promise<void>;
  setSelectedRestaurant : (restaurant : Restaurant) => void
  setSelectedRestaurantForPlanning : (restaurant : Restaurant) => void
}

// Zustand store
const useRestaurantInfo = create<RestaurantStore>((set) => ({
  restaurants: [],
  selectedRestaurantForPlanning : {
    _id: '',
    restaurantName: '',
    address: '',
    phone: '',
    menu: [],
    events: [],
    orders: [],
    capacity: 0,
    cuisine: '',
    priceRange: '',
    description: '',
    image: '',
    openingTime: '',
    closingTime: '',
    rating: 0,
    isRestaurantRegistered: false
  },
  loggedInRestaurant: {
    _id: '',
    restaurantName: '',
    address: '',
    phone: '',
    menu: [],
    events: [],
    orders: [],
    capacity: 0,
    cuisine: '',
    priceRange: '',
    description: '',
    image: '',
    openingTime: '',
    closingTime: '',
    rating: 0,
    isRestaurantRegistered: false
  },
  selectedRestaurant : {
    _id: '',
    restaurantName: '',
    address: '',
    phone: '',
    menu: [],
    events: [],
    orders: [],
    capacity: 0,
    cuisine: '',
    priceRange: '',
    description: '',
    image: '',
    openingTime: '',
    closingTime: '',
    rating: 0,
    isRestaurantRegistered: false
  },


  item: {
    itemName: '',
    price: 0,
    _id: '',
    description: '',
    image: '',
    quantity : 1
  },
  restaurantName: '',




  setRestaurants: (restaurant: Restaurant) =>
    set((state) => ({
      restaurants: [...state.restaurants, restaurant],
    })),
  getAllRestaurants: async (token) => {

    console.log(token);


    try {

      const response = await axios.get('/api/v1/restaurant', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ restaurants: response.data.restaurants });
      console.log(response.data);

      return response.data.restaurants;
    } catch (error) {
      console.error('Error fetching restaurants:', error);
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
      set((state) => ({ loggedInRestaurant: state.loggedInRestaurant = response.data.restaurant }))
      return { success: true, msg: response.data.restaurant };
    } catch (error) {
      return { success: false, msg: "Something went wrong" }
    }
  },
  getItem: async (restaurantId, itemId, token) => {
    try {
      const response = await axios.get(`/api/v1/restaurant/${restaurantId}/menu/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(response.data);
      set((state) => ({ item: state.item = response.data.item }))
      
      

      const response2 = await axios.get(`/api/v1/restaurant/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      set((state) => ({ restaurantName: state.restaurantName = response2.data.restaurant.restaurantName }))
      return response.data;
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  },
  setSelectedRestaurant : (restaurant : Restaurant) => 
    set((state) => ({selectedRestaurant : state.selectedRestaurant = restaurant}

    )),
    setSelectedRestaurantForPlanning : (restaurant : Restaurant) => 
    set((state) => ({selectedRestaurantForPlanning : state.selectedRestaurantForPlanning = restaurant}
    )),


  
}));

export default useRestaurantInfo;
