import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Search, ChevronDown, ChevronUp } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";

const domesticDestinations = [
  { name: "Himachal", destination: "Himachal Pradesh", fallbackHref: "/packages?destination=himachal+pradesh" },
  { name: "Uttrakhand", destination: "Uttarakhand", fallbackHref: "/packages?destination=uttrakhand" },
  { name: "Andamans", destination: "Andaman Islands", fallbackHref: "/packages?destination=andaman+islands" },
  { name: "Rajasthan", destination: "Rajasthan", fallbackHref: "/packages?destination=rajasthan" },
  { name: "Golden Triangle", destination: "Delhi-Agra-Jaipur", fallbackHref: "/packages?destination=delhi-agra-jaipur" },
  { name: "Ladakh", destination: "Ladakh", fallbackHref: "/packages?destination=ladakh" },
  { name: "Sikkim-Darjeeling", destination: "Sikkim-Darjeeling", fallbackHref: "/packages?destination=sikkim-darjeeling" },
  { name: "Meghalaya", destination: "Meghalaya", fallbackHref: "/packages?destination=meghalaya" },
  { name: "Kashmir", destination: "Kashmir", fallbackHref: "/packages?destination=kashmir" },
  { name: "Arunachal", destination: "Arunachal Pradesh", fallbackHref: "/packages?destination=arunachal+pradesh" },
  { name: "Goa", destination: "Goa", fallbackHref: "/packages?destination=goa" },
  { name: "Kerala", destination: "Kerala", fallbackHref: "/packages?destination=kerala" },
  { name: "Karnataka", destination: "Karnataka", fallbackHref: "/packages?destination=karnataka" },
  { name: "Tamil Nadu", destination: "Tamil Nadu", fallbackHref: "/packages?destination=tamil+nadu" }
];

const internationalDestinations = [
  { name: "Bali", destination: "Bali", fallbackHref: "/packages?destination=bali" },
  { name: "Dubai", destination: "Dubai", fallbackHref: "/packages?destination=dubai" },
  { name: "Singapore", destination: "Singapore", fallbackHref: "/packages?destination=singapore" },
  { name: "Vietnam", destination: "Vietnam", fallbackHref: "/packages?destination=vietnam" },
  { name: "Thailand", destination: "Thailand", fallbackHref: "/packages?destination=thailand" },
  { name: "Maldives", destination: "Maldives", fallbackHref: "/packages?destination=maldives" },
  { name: "Malaysia", destination: "Malaysia", fallbackHref: "/packages?destination=malaysia" },
  { name: "Sri Lanka", destination: "Sri Lanka", fallbackHref: "/packages?destination=sri+lanka" }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useLocation();
  
  // Mobile dropdown states
  const [internationalOpen, setInternationalOpen] = useState(false);
  const [domesticOpen, setDomesticOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");

  const handleDestinationClick = (destination: string, fallbackHref: string) => {
    // Direct navigation for both domestic and international packages
    switch (destination) {
      // Domestic Packages
      case "Himachal Pradesh":
        setLocation("/packages/1");
        break;
      case "Uttrakhand":
        setLocation("/packages/2");
        break;
      case "Andaman Islands":
        setLocation("/packages/3");
        break;
      case "Rajasthan":
        setLocation("/packages/4");
        break;
      case "Delhi-Agra-Jaipur":
        setLocation("/packages/5");
        break;
      case "Ladakh":
        setLocation("/packages/6");
        break;
      case "Sikkim-Darjeeling":
        setLocation("/packages/7");
        break;
      case "Meghalaya":
        setLocation("/packages/8");
        break;
      case "Kashmir":
        setLocation("/packages/9");
        break;
      case "Arunachal Pradesh":
        setLocation("/packages/10");
        break;
      case "Goa":
        setLocation("/packages/11");
        break;
      case "Kerala":
        setLocation("/packages/12");
        break;
      case "Karnataka":
        setLocation("/packages/13");
        break;
      case "Tamil Nadu":
        setLocation("/packages/14");
        break;
      // International Packages
      case "Bali":
        setLocation("/packages/15");
        break;
      case "Dubai":
        setLocation("/packages/16");
        break;
      case "Singapore":
        setLocation("/packages/17");
        break;
      case "Vietnam":
        setLocation("/packages/18");
        break;
      case "Thailand":
        setLocation("/packages/19");
        break;
      case "Maldives":
        setLocation("/packages/20");
        break;
      case "Malaysia":
        setLocation("/packages/21");
        break;
      case "Sri Lanka":
        setLocation("/packages/22");
        break;
      default:
        // For any unknown destinations, use the search page
        setLocation(fallbackHref);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/packages?destination=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      setLocation(`/packages?destination=${encodeURIComponent(mobileSearchQuery.trim())}`);
      setIsOpen(false);
      setMobileSearchQuery("");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="hover:scale-105 transition-transform duration-200">
              <Logo />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList className="space-x-2">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-white/10 hover:bg-white/20 text-white hover:text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm">
                    International Trips
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[320px] gap-1 p-4 bg-white shadow-xl rounded-xl border border-gray-100">
                      {internationalDestinations.map((item) => (
                        <li key={item.fallbackHref}>
                          <button
                            onClick={() => handleDestinationClick(item.destination, item.fallbackHref)}
                            className="block w-full text-left px-4 py-2.5 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-all duration-200 text-sm font-medium text-gray-600"
                          >
                            {item.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-white/10 hover:bg-white/20 text-white hover:text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm">
                    Domestic Trips
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[420px] gap-1 p-4 grid-cols-2 bg-white shadow-xl rounded-xl border border-gray-100">
                      {domesticDestinations.map((item) => (
                        <li key={item.fallbackHref}>
                          <button
                            onClick={() => handleDestinationClick(item.destination, item.fallbackHref)}
                            className="block w-full text-left px-4 py-2.5 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-all duration-200 text-sm font-medium text-gray-600"
                          >
                            {item.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink 
                    href="/packages?category=group" 
                    className="px-4 py-2 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200 font-medium text-white/90 backdrop-blur-sm"
                  >
                    Group Trips
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink 
                    href="/about" 
                    className={cn(
                      "px-4 py-2 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200 font-medium backdrop-blur-sm",
                      location === "/about" ? "text-white bg-white/25" : "text-white/90"
                    )}
                  >
                    About Us
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink 
                    href="/contact" 
                    className={cn(
                      "px-4 py-2 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200 font-medium backdrop-blur-sm",
                      location === "/contact" ? "text-white bg-white/25" : "text-white/90"
                    )}
                  >
                    Contact Us
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="hover:text-white hover:bg-white/20 rounded-xl h-10 w-10 transition-all duration-200 text-white/90 backdrop-blur-sm"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-white/20 transition-all duration-200"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t shadow-lg">
          <div className="px-4 pt-4 pb-3 space-y-3">
            {/* Modern Search Bar */}
            <div className="relative">
              <form onSubmit={handleMobileSearch}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search destinations..."
                    value={mobileSearchQuery}
                    onChange={(e) => setMobileSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-sm"
                  />
                  {mobileSearchQuery && (
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors"
                    >
                      Go
                    </button>
                  )}
                </div>
              </form>
            </div>
            
            {/* International Trips Dropdown */}
            <div className="border-t pt-3">
              <button
                onClick={() => setInternationalOpen(!internationalOpen)}
                className="flex items-center justify-between w-full px-3 py-3 text-left font-semibold text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span>International Trips</span>
                {internationalOpen ? (
                  <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                )}
              </button>
              
              {internationalOpen && (
                <div className="mt-2 bg-gray-50 rounded-lg p-2 space-y-1">
                  {internationalDestinations.map((item) => (
                    <button
                      key={item.fallbackHref}
                      onClick={() => {
                        handleDestinationClick(item.destination, item.fallbackHref);
                        setIsOpen(false);
                        setInternationalOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary hover:bg-white transition-colors"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Domestic Trips Dropdown */}
            <div>
              <button
                onClick={() => setDomesticOpen(!domesticOpen)}
                className="flex items-center justify-between w-full px-3 py-3 text-left font-semibold text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span>Domestic Trips</span>
                {domesticOpen ? (
                  <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                )}
              </button>
              
              {domesticOpen && (
                <div className="mt-2 bg-gray-50 rounded-lg p-2 space-y-1 max-h-60 overflow-y-auto">
                  {domesticDestinations.map((item) => (
                    <button
                      key={item.fallbackHref}
                      onClick={() => {
                        handleDestinationClick(item.destination, item.fallbackHref);
                        setIsOpen(false);
                        setDomesticOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary hover:bg-white transition-colors"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Other Menu Items */}
            <div className="border-t pt-3 space-y-1">
              <Link href="/packages?category=group">
                <a 
                  className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Group Trips
                </a>
              </Link>
              <Link href="/about">
                <a 
                  className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </a>
              </Link>
              <Link href="/contact">
                <a 
                  className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Contact Us
                </a>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Search Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Search Destinations</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSearch} className="mt-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </nav>
  );
}
