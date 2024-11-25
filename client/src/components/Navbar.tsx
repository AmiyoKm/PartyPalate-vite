import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Utensils,
  Heart,
  Calendar,
  ShoppingCart,
  ClipboardList,
  LogOut,
} from "lucide-react";
import { FaUser } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";

import { ModeToggle } from "./mode-toggle";
import { Link, useNavigate } from "react-router-dom";
import useUserData from "@/store/auth";
import { MdOutlineEventAvailable } from "react-icons/md";

export function NavbarComponent() {
  const navigate = useNavigate();
  const { user, logout } = useUserData();
  const handleLogOut = () => {
    logout();
    navigate("/login");
  };
  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to={
              user.role === "customer"
                ? `/home/customer/${user._id}`
                : `dashboard/restaurant/${user._id}`
            }
          >
            <div className="flex   items-center">
              <Utensils className="h-8 w-8 text-primary mr-2" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                PartyPalate
              </span>
            </div>
          </Link>
          <div className="flex justify-between items-center">
            {user.role === "customer" ? (
              <div>
                <Link to={`/event-planning/customer/${user._id}`}>
                  <div className="hover:cursor-pointer bg-primary text-foreground dark:bg-gray-900 h-[40px] w-24 flex items-center justify-center rounded-md mr-4">
                    <MdOutlineEventAvailable
                      size={70}
                      color="white"
                      className="mr-2 h-6 w-6"
                    />
                  </div>
                </Link>
              </div>
            ) : null}
            {user.role === "customer" ? (
              <div>
                <Link to={`/cart/customer/${user._id}`}>
                  <div className="hover:cursor-pointer bg-primary text-foreground dark:bg-gray-900 h-[40px] w-24 flex items-center justify-center rounded-md">
                    <ShoppingCart
                      size={70}
                      color="white"
                      className="mr-2 h-6 w-6"
                    />
                  </div>
                </Link>
              </div>
            ) : null}

            <div className="flex items-center ml-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <FaUser size={70} />
                    <span className="sr-only">Open user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link
                    to={`/profile/${
                      user.role === "customer" ? "customer" : "restaurant"
                    }/${user._id}`}
                  >
                    <DropdownMenuItem>
                      <VscAccount className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  {user.role === "customer" && (
                    <Link to={`/customer/${user?._id}/favorite`}>
                    <DropdownMenuItem>
                      
                        <Heart className="mr-2 h-4 w-4" />
                        <span>Favorites</span>
                     
                    </DropdownMenuItem>
                    </Link>
                  )}

                  {user.role === "customer" && (
                    <Link to={`/event-management/customer/${user._id}`}>
                      <DropdownMenuItem>
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Your Events</span>
                      </DropdownMenuItem>
                    </Link>
                  )}
                  {user.role === "customer" && (
                    <Link to={`/customer/${user._id}/orders`}>
                      <DropdownMenuItem>
                        <ClipboardList className="mr-2 h-4 w-4" />
                        <span>Orders</span>
                      </DropdownMenuItem>
                    </Link>
                  )}

                  {/* <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="ml-4">
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
