import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Search } from "lucide-react";
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

  return (
    <nav className="sticky top-0 z-50 bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>International Trips</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-2 p-4">
                      {internationalDestinations.map((item) => (
                        <li key={item.fallbackHref}>
                          <button
                            onClick={() => handleDestinationClick(item.destination, item.fallbackHref)}
                            className="block w-full text-left px-2 py-1 hover:bg-accent rounded-md"
                          >
                            {item.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Domestic Trips</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-2 p-4 grid-cols-2">
                      {domesticDestinations.map((item) => (
                        <li key={item.fallbackHref}>
                          <button
                            onClick={() => handleDestinationClick(item.destination, item.fallbackHref)}
                            className="block w-full text-left px-2 py-1 hover:bg-accent rounded-md"
                          >
                            {item.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href="/packages?category=group" className="px-3 py-2 hover:text-primary transition-colors">
                    Group Trips
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href="/contact" className={cn(
                    "px-3 py-2 hover:text-primary transition-colors",
                    location === "/contact" && "text-primary"
                  )}>
                    Contact Us
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="hover:text-primary"
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
        <div className="md:hidden bg-background border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="p-3">
              <input
                type="text"
                placeholder="Search destinations..."
                className="w-full p-2 border rounded"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    setLocation(`/packages?destination=${encodeURIComponent(e.currentTarget.value.trim())}`);
                    setIsOpen(false);
                  }
                }}
              />
            </div>
            
            <div className="border-t pt-2">
              <p className="px-3 text-sm font-semibold text-gray-500">International Trips</p>
              {internationalDestinations.map((item) => (
                <button
                  key={item.fallbackHref}
                  onClick={() => {
                    handleDestinationClick(item.destination, item.fallbackHref);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:text-primary hover:bg-accent"
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="border-t pt-2">
              <p className="px-3 text-sm font-semibold text-gray-500">Domestic Trips</p>
              {domesticDestinations.map((item) => (
                <button
                  key={item.fallbackHref}
                  onClick={() => {
                    handleDestinationClick(item.destination, item.fallbackHref);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:text-primary hover:bg-accent"
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="border-t pt-2">
              <Link href="/packages?category=group">
                <a className="block px-3 py-2 rounded-md text-base font-medium hover:text-primary hover:bg-accent">
                  Group Trips
                </a>
              </Link>
              <Link href="/contact">
                <a className="block px-3 py-2 rounded-md text-base font-medium hover:text-primary hover:bg-accent">
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
