import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Search, Train, Clock, MapPin, Calendar as CalendarIcon } from "lucide-react";
import { motion } from "motion/react";

interface ScheduleEntry {
  trainNumber: string;
  trainName: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  days: string[];
  stops: number;
  type: string;
}

const scheduleData: ScheduleEntry[] = [
  {
    trainNumber: "1005",
    trainName: "Podi Menike",
    from: "Colombo Fort",
    to: "Badulla",
    departure: "08:55",
    arrival: "18:50",
    days: ["Daily"],
    stops: 14,
    type: "Express",
  },
  {
    trainNumber: "8050",
    trainName: "Intercity Express",
    from: "Colombo Fort",
    to: "Kandy",
    departure: "07:00",
    arrival: "09:45",
    days: ["Daily"],
    stops: 6,
    type: "Intercity",
  },
  {
    trainNumber: "1015",
    trainName: "Udarata Menike",
    from: "Colombo Fort",
    to: "Badulla",
    departure: "09:45",
    arrival: "19:35",
    days: ["Daily"],
    stops: 18,
    type: "Express",
  },
  {
    trainNumber: "4077",
    trainName: "Galu Kumari",
    from: "Colombo Fort",
    to: "Matara",
    departure: "06:35",
    arrival: "09:55",
    days: ["Daily"],
    stops: 12,
    type: "Express",
  },
  {
    trainNumber: "1045",
    trainName: "Rajarata Rajini",
    from: "Colombo Fort",
    to: "Vavuniya",
    departure: "05:50",
    arrival: "12:20",
    days: ["Mon", "Wed", "Sat"],
    stops: 15,
    type: "Express",
  },
  {
    trainNumber: "1007",
    trainName: "Yal Devi",
    from: "Colombo Fort",
    to: "Jaffna",
    departure: "05:45",
    arrival: "15:00",
    days: ["Daily"],
    stops: 18,
    type: "Express",
  },
  {
    trainNumber: "8722",
    trainName: "Ruhunu Kumari",
    from: "Colombo Fort",
    to: "Matara",
    departure: "15:30",
    arrival: "18:50",
    days: ["Daily"],
    stops: 14,
    type: "Express",
  },
  {
    trainNumber: "8052",
    trainName: "Intercity Express",
    from: "Kandy",
    to: "Colombo Fort",
    departure: "14:30",
    arrival: "17:15",
    days: ["Daily"],
    stops: 6,
    type: "Intercity",
  },
];

export function TrainSchedule() {
  const [searchQuery, setSearchQuery] = useState("");
  const [trainType, setTrainType] = useState("all");
  const [selectedStation, setSelectedStation] = useState("all");

  const trainTypes = ["all", "Express", "Intercity"];
  const stations = [
    "all",
    "Colombo Fort",
    "Badulla",
    "Kandy",
    "Matara",
    "Vavuniya",
    "Jaffna",
  ];

  const filteredSchedule = scheduleData.filter((entry) => {
    const matchesSearch =
      entry.trainName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.trainNumber.includes(searchQuery);
    const matchesType = trainType === "all" || entry.type === trainType;
    const matchesStation =
      selectedStation === "all" ||
      entry.from === selectedStation ||
      entry.to === selectedStation;

    return matchesSearch && matchesType && matchesStation;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Express":
        return "bg-red-100 text-red-800";
      case "Intercity":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl mb-6">Train Schedule & Timetable</h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <Label htmlFor="search">Search Train</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <Input
                id="search"
                placeholder="Train name or number"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="type">Train Type</Label>
            <Select value={trainType} onValueChange={setTrainType}>
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {trainTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === "all" ? "All Types" : type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="station">Station</Label>
            <Select value={selectedStation} onValueChange={setSelectedStation}>
              <SelectTrigger id="station">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {stations.map((station) => (
                  <SelectItem key={station} value={station}>
                    {station === "all" ? "All Stations" : station}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Schedule Results */}
      <div className="space-y-4">
        <h3 className="text-xl">
          {filteredSchedule.length} Train{filteredSchedule.length !== 1 ? "s" : ""} Found
        </h3>

        {filteredSchedule.map((entry, index) => (
          <motion.div
            key={entry.trainNumber}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Train Info */}
                <div className="lg:col-span-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded">
                        <Train className="text-blue-600" size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{entry.trainName}</h4>
                        <p className="text-sm text-gray-600">#{entry.trainNumber}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className={`text-xs px-3 py-1 rounded ${getTypeColor(entry.type)}`}>
                      {entry.type}
                    </span>
                    <span className="text-xs px-3 py-1 rounded bg-purple-100 text-purple-800">
                      {entry.stops} Stops
                    </span>
                  </div>
                </div>

                {/* Route */}
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin size={16} className="text-green-600" />
                        <span className="text-sm text-gray-600">From</span>
                      </div>
                      <div className="font-semibold">{entry.from}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock size={14} className="text-gray-400" />
                        <span className="text-sm">{entry.departure}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center px-4">
                      <div className="w-px h-8 bg-gray-300"></div>
                      <div className="text-xs text-gray-500 my-1">
                        {entry.stops} stops
                      </div>
                      <div className="w-px h-8 bg-gray-300"></div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin size={16} className="text-red-600" />
                        <span className="text-sm text-gray-600">To</span>
                      </div>
                      <div className="font-semibold">{entry.to}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock size={14} className="text-gray-400" />
                        <span className="text-sm">{entry.arrival}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Days & Actions */}
                <div className="lg:col-span-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CalendarIcon size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">Running Days</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {entry.days[0] === "Daily" ? (
                        <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded">
                          Daily
                        </span>
                      ) : (
                        entry.days.map((day) => (
                          <span
                            key={day}
                            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                          >
                            {day}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        {filteredSchedule.length === 0 && (
          <Card className="p-12 text-center">
            <Train className="mx-auto mb-4 text-gray-400" size={48} />
            <h3 className="text-xl mb-2">No trains found</h3>
            <p className="text-gray-600">Try adjusting your filters</p>
          </Card>
        )}
      </div>
    </div>
  );
}