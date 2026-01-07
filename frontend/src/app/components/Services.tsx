import { Card } from "./ui/card";
import { motion } from "motion/react";
import {
  Utensils,
  Wifi,
  Luggage,
  Accessibility,
  Shield,
  Coffee,
  Hotel,
  Car,
  Phone,
  MapPin,
  Headphones,
  Users,
} from "lucide-react";

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  availability: string;
  color: string;
}

const services: Service[] = [
  {
    id: "1",
    icon: <Utensils size={32} />,
    title: "Onboard Catering",
    description:
      "Enjoy freshly prepared meals, snacks, and beverages delivered to your seat. Pre-order meals through our app or order during your journey.",
    availability: "Available on all premium trains",
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: "2",
    icon: <Wifi size={32} />,
    title: "Free Wi-Fi",
    description:
      "Stay connected with complimentary high-speed internet access available on select trains and all major stations.",
    availability: "Rajdhani, Shatabdi & Duronto trains",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "3",
    icon: <Luggage size={32} />,
    title: "Luggage Assistance",
    description:
      "Porter services and luggage handling assistance available at all major stations. Store your luggage safely with our cloak room facilities.",
    availability: "All major stations",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "4",
    icon: <Accessibility size={32} />,
    title: "Wheelchair Access",
    description:
      "Dedicated wheelchair-accessible coaches, ramps, and assistance for passengers with reduced mobility. Priority boarding available.",
    availability: "All trains",
    color: "bg-green-100 text-green-600",
  },
  {
    id: "5",
    icon: <Shield size={32} />,
    title: "Travel Insurance",
    description:
      "Comprehensive travel insurance covering medical emergencies, trip cancellations, and baggage loss. Add insurance during booking.",
    availability: "Optional add-on",
    color: "bg-red-100 text-red-600",
  },
  {
    id: "6",
    icon: <Coffee size={32} />,
    title: "Premium Lounges",
    description:
      "Relax in our executive lounges with complimentary refreshments, comfortable seating, charging points, and business facilities.",
    availability: "50+ major stations",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: "7",
    icon: <Hotel size={32} />,
    title: "Railway Retiring Rooms",
    description:
      "Book affordable retiring rooms at stations for short stays. AC and non-AC options available with all basic amenities.",
    availability: "150+ stations",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    id: "8",
    icon: <Car size={32} />,
    title: "Taxi & Cab Services",
    description:
      "Pre-book authorized taxis and cabs for pickup and drop-off. Competitive rates with verified drivers for your safety.",
    availability: "All stations",
    color: "bg-teal-100 text-teal-600",
  },
  {
    id: "9",
    icon: <Phone size={32} />,
    title: "24/7 Customer Support",
    description:
      "Round-the-clock helpline for booking assistance, train inquiries, complaints, and emergency support. Multi-language support available.",
    availability: "Always available",
    color: "bg-pink-100 text-pink-600",
  },
  {
    id: "10",
    icon: <MapPin size={32} />,
    title: "Live Train Tracking",
    description:
      "Track your train in real-time with GPS-enabled tracking. Get updates on delays, platform changes, and estimated arrival times.",
    availability: "All trains",
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    id: "11",
    icon: <Headphones size={32} />,
    title: "Lost & Found",
    description:
      "Comprehensive lost and found service across all stations. Report and track lost items through our dedicated portal.",
    availability: "All stations",
    color: "bg-lime-100 text-lime-600",
  },
  {
    id: "12",
    icon: <Users size={32} />,
    title: "Group Bookings",
    description:
      "Special discounts and dedicated support for group travel. Perfect for corporate outings, tours, and family reunions.",
    availability: "Minimum 6 passengers",
    color: "bg-rose-100 text-rose-600",
  },
];

export function Services() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="max-w-3xl">
          <h2 className="text-2xl mb-2">Railway Services</h2>
          <p className="text-gray-600">
            Discover the wide range of services and amenities we offer to make your journey
            comfortable, safe, and enjoyable. From onboard facilities to station services, we've got
            you covered.
          </p>
        </div>
      </Card>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-6 hover:shadow-xl transition-all h-full flex flex-col group cursor-pointer">
              <div
                className={`w-16 h-16 rounded-xl ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                {service.icon}
              </div>

              <h3 className="text-xl mb-3 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>

              <p className="text-gray-600 mb-4 flex-1">{service.description}</p>

              <div className="pt-4 border-t">
                <div className="text-xs text-gray-500 mb-1">Availability</div>
                <div className="text-sm font-semibold text-blue-600">{service.availability}</div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Help Section */}
      <Card className="p-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl mb-4">Need More Information?</h3>
          <p className="text-blue-100 mb-6 text-lg">
            Our customer support team is available 24/7 to assist you with any questions or concerns
            about our services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-900 px-8 py-3 rounded-lg hover:bg-blue-50 transition-all">
              Contact Support
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-900 transition-all">
              View FAQs
            </button>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center text-sm">
            <div>
              <div className="text-blue-200 mb-1">Customer Care</div>
              <div className="text-lg">1800-111-139</div>
            </div>
            <div>
              <div className="text-blue-200 mb-1">Email Support</div>
              <div className="text-lg">support@railconnect.in</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
