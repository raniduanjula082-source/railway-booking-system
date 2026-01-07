import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import {
  Ticket,
  Download,
  Calendar,
  Clock,
  MapPin,
  Users,
  IndianRupee,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

interface Booking {
  id: string;
  pnr: string;
  trainNumber: string;
  trainName: string;
  from: string;
  to: string;
  date: string;
  departure: string;
  arrival: string;
  classType: string;
  seats: string[];
  passengers: number;
  totalAmount: number;
  status: "confirmed" | "cancelled" | "pending";
  bookingDate: string;
}

const mockBookings: Booking[] = [
  {
    id: "1",
    pnr: "SLR2345678901",
    trainNumber: "1005",
    trainName: "Podi Menike",
    from: "Colombo Fort",
    to: "Badulla",
    date: "Jan 15, 2026",
    departure: "08:55",
    arrival: "18:50",
    classType: "Second Class",
    seats: ["A1", "A2"],
    passengers: 2,
    totalAmount: 900,
    status: "confirmed",
    bookingDate: "Jan 3, 2026",
  },
  {
    id: "2",
    pnr: "SLR1234567890",
    trainNumber: "8050",
    trainName: "Intercity Express",
    from: "Colombo Fort",
    to: "Kandy",
    date: "Jan 8, 2026",
    departure: "07:00",
    arrival: "09:45",
    classType: "Second Class Reserved",
    seats: ["C12"],
    passengers: 1,
    totalAmount: 420,
    status: "confirmed",
    bookingDate: "Dec 28, 2025",
  },
  {
    id: "3",
    pnr: "SLR9876543210",
    trainNumber: "4077",
    trainName: "Galu Kumari",
    from: "Colombo Fort",
    to: "Matara",
    date: "Dec 20, 2025",
    departure: "06:35",
    arrival: "09:55",
    classType: "Second Class",
    seats: ["B5", "B6"],
    passengers: 2,
    totalAmount: 560,
    status: "cancelled",
    bookingDate: "Dec 10, 2025",
  },
];

export function MyBookings() {
  const [bookings] = useState<Booking[]>(mockBookings);
  const [filter, setFilter] = useState<"all" | "upcoming" | "past" | "cancelled">("all");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="text-green-600" size={20} />;
      case "cancelled":
        return <XCircle className="text-red-600" size={20} />;
      case "pending":
        return <AlertCircle className="text-yellow-600" size={20} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "all") return true;
    if (filter === "cancelled") return booking.status === "cancelled";
    // For demo purposes, treating all confirmed as upcoming
    if (filter === "upcoming") return booking.status === "confirmed";
    return true;
  });

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl mb-2">My Bookings</h2>
            <p className="text-gray-600">View and manage your train tickets</p>
          </div>
          <div className="flex items-center gap-2">
            <Ticket className="text-blue-600" size={32} />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Bookings
          </button>
          <button
            onClick={() => setFilter("upcoming")}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              filter === "upcoming"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter("past")}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              filter === "past"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Past
          </button>
          <button
            onClick={() => setFilter("cancelled")}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              filter === "cancelled"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Cancelled
          </button>
        </div>
      </Card>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl">{booking.trainName}</h3>
                      <span
                        className={`flex items-center gap-1 px-3 py-1 rounded text-xs ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {getStatusIcon(booking.status)}
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Train #{booking.trainNumber} • PNR: {booking.pnr}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Booked on {booking.bookingDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">Total Amount</div>
                    <div className="flex items-center gap-1 text-2xl text-blue-900">
                      <IndianRupee size={20} />
                      <span>{booking.totalAmount}</span>
                    </div>
                  </div>
                </div>

                {/* Journey Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin size={18} className="text-green-600" />
                      <div>
                        <div className="text-xs text-gray-600">From</div>
                        <div className="font-semibold">{booking.from}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={18} className="text-gray-400" />
                      <div>
                        <div className="text-xs text-gray-600">Departure</div>
                        <div className="font-semibold">{booking.departure}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin size={18} className="text-red-600" />
                      <div>
                        <div className="text-xs text-gray-600">To</div>
                        <div className="font-semibold">{booking.to}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={18} className="text-gray-400" />
                      <div>
                        <div className="text-xs text-gray-600">Arrival</div>
                        <div className="font-semibold">{booking.arrival}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-xs text-gray-600">Travel Date</span>
                    </div>
                    <div className="font-semibold">{booking.date}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Ticket size={16} className="text-gray-400" />
                      <span className="text-xs text-gray-600">Class</span>
                    </div>
                    <div className="font-semibold">{booking.classType}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Users size={16} className="text-gray-400" />
                      <span className="text-xs text-gray-600">Passengers</span>
                    </div>
                    <div className="font-semibold">{booking.passengers}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Seats</div>
                    <div className="flex flex-wrap gap-1">
                      {booking.seats.map((seat) => (
                        <Badge key={seat} variant="outline">
                          {seat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {booking.status === "confirmed" && (
                  <div className="flex flex-wrap gap-3 pt-4 border-t">
                    <Button className="flex items-center gap-2">
                      <Download size={18} />
                      Download Ticket
                    </Button>
                    <Button variant="outline">View Details</Button>
                    <Button variant="outline" className="text-red-600 hover:text-red-700">
                      Cancel Booking
                    </Button>
                  </div>
                )}

                {booking.status === "cancelled" && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600">
                      This booking has been cancelled. Refund will be processed within 5-7 business
                      days.
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}

        {filteredBookings.length === 0 && (
          <Card className="p-12 text-center">
            <Ticket className="mx-auto mb-4 text-gray-400" size={48} />
            <h3 className="text-xl mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-4">
              You don't have any {filter !== "all" && filter} bookings yet
            </p>
            <Button>Book Your First Journey</Button>
          </Card>
        )}
      </div>
    </div>
  );
}