import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                Wandrivo
              </span>
            </h3>
            <p className="text-gray-400">
              Your trusted partner for unforgettable travel experiences and adventures around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="/packages" className="text-gray-400 hover:text-white">Travel Packages</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact Us</a></li>
              <li><a href="/dashboard" className="text-gray-400 hover:text-white">Dashboard</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span className="text-gray-400">+91 9560011802</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <span className="text-gray-400">wandrivo@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span className="text-gray-400">E-202, Aakriti shantiniketan, Sector 143B</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/wandrivo/" className="text-gray-400 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Wandrivo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
