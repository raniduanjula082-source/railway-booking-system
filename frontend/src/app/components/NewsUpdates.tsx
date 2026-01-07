import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { Newspaper, AlertCircle, Info, Clock, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface NewsItem {
  id: string;
  title: string;
  category: "announcement" | "alert" | "update" | "service";
  date: string;
  time: string;
  description: string;
  image?: string;
  priority: "high" | "medium" | "low";
}

const newsData: NewsItem[] = [
  {
    id: "1",
    title: "New Coastal Railway Extension Announced",
    category: "announcement",
    date: "Jan 5, 2026",
    time: "10:30 AM",
    description:
      "The government has announced a new coastal railway extension connecting Colombo to Jaffna via the scenic western coast. The project will enhance connectivity and tourism.",
    image: "https://images.unsplash.com/photo-1759138097007-3d50dbffe2df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2FzdGFsJTIwdHJhaW4lMjBvY2VhbnxlbnwxfHx8fDE3Njc2MTM0OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    priority: "high",
  },
  {
    id: "2",
    title: "Track Maintenance on Kandy-Ella Route",
    category: "alert",
    date: "Jan 4, 2026",
    time: "06:00 PM",
    description:
      "Scheduled maintenance work on the scenic Kandy-Ella route from Jan 10-12. Some trains may experience delays of 30-45 minutes. Passengers are advised to check updated schedules.",
    priority: "high",
  },
  {
    id: "3",
    title: "New E-Ticketing Features Launched",
    category: "update",
    date: "Jan 3, 2026",
    time: "02:15 PM",
    description:
      "Enhanced mobile app with real-time seat availability, virtual queue system, and instant refunds. Download the latest version to access new features.",
    priority: "medium",
  },
  {
    id: "4",
    title: "Premium Lounge Services at Fort Railway Station",
    category: "service",
    date: "Jan 2, 2026",
    time: "09:00 AM",
    description:
      "New premium lounge now available at Colombo Fort Railway Station. Enjoy complimentary refreshments, Wi-Fi, and comfortable seating while you wait for your train.",
    image: "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcmklMjBsYW5rYSUyMHRyYWlufGVufDF8fHx8MTc2NzYxMzQ5NXww&ixlib=rb-4.1.0&q=80&w=1080",
    priority: "low",
  },
  {
    id: "5",
    title: "Monsoon Special Services Announced",
    category: "announcement",
    date: "Jan 1, 2026",
    time: "11:45 AM",
    description:
      "Additional trains and extended routes during monsoon season. Special fares and flexible cancellation policies available for affected routes.",
    priority: "medium",
  },
  {
    id: "6",
    title: "Hill Country Train Journey - UNESCO Heritage",
    category: "update",
    date: "Dec 30, 2025",
    time: "03:30 PM",
    description:
      "The iconic Kandy to Ella train journey through tea plantations has been recognized as a UNESCO World Heritage railway route. Experience the world's most scenic train ride.",
    image: "https://images.unsplash.com/photo-1721071048287-f89965c9fade?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFpbiUyMG1vdW50YWluJTIwdGVhfGVufDF8fHx8MTc2NzYxMzQ5Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    priority: "medium",
  },
];

export function NewsUpdates() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "announcement":
        return <Newspaper size={18} />;
      case "alert":
        return <AlertCircle size={18} />;
      case "update":
        return <TrendingUp size={18} />;
      case "service":
        return <Info size={18} />;
      default:
        return <Newspaper size={18} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "announcement":
        return "bg-blue-100 text-blue-800";
      case "alert":
        return "bg-red-100 text-red-800";
      case "update":
        return "bg-green-100 text-green-800";
      case "service":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-500">Important</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Info</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl mb-2">News & Updates</h2>
            <p className="text-gray-600">
              Stay informed with the latest railway announcements and services
            </p>
          </div>
          <Newspaper className="text-blue-600" size={32} />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
            All Updates
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
            Announcements
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
            Alerts
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
            Services
          </button>
        </div>
      </Card>

      {/* News Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {newsData.map((news, index) => (
          <motion.div
            key={news.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
              {news.image && (
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    {getPriorityBadge(news.priority)}
                  </div>
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`flex items-center gap-1 px-3 py-1 rounded text-xs ${getCategoryColor(
                      news.category
                    )}`}
                  >
                    {getCategoryIcon(news.category)}
                    {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
                  </span>
                  {!news.image && getPriorityBadge(news.priority)}
                </div>

                <h3 className="text-xl mb-3">{news.title}</h3>

                <p className="text-gray-600 mb-4 flex-1">{news.description}</p>

                <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{news.date}</span>
                  </div>
                  <span>•</span>
                  <span>{news.time}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
          Load More Updates
        </button>
      </div>
    </div>
  );
}