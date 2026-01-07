import { useState } from "react";
import { Search, MapPin, Calendar, Users, ArrowRight, Clock, IndianRupee } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { motion } from "framer-motion";

export interface Train {
  id: string;
  number: string;
  name: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  classes: {
    type: string;
    price: number;
    available: number;
  }[];
  days: string[];
}

interface TrainSearchProps {
  onSelectTrain: (train: Train, classType: string) => void;
}

const popularStations = [
  "Colombo", "Kandy", "Badulla", "Ella", "Nanu Oya",
  "Galle", "Matara", "Anuradhapura", "Jaffna", "Vavuniya",
  "Trincomalee", "Batticaloa"
];

export function TrainSearch({ onSelectTrain }: TrainSearchProps) {
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [searchResults, setSearchResults] = useState<Train[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setHasSearched(false);
    try {
      let url = "http://localhost:8080/api/trains";
      if (fromStation && toStation) {
        url = `http://localhost:8080/api/trains/search?source=${encodeURIComponent(fromStation)}&destination=${encodeURIComponent(toStation)}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch trains");
      }
      const data = await response.json();

      // Adapt backend data to frontend model
      const adaptedTrains: Train[] = data.map((item: any) => ({
        id: item.id,
        number: item.number,
        name: item.name,
        from: item.source,
        to: item.destination,
        departure: item.departureTime,
        arrival: item.arrivalTime,
        duration: "N/A", // Backend doesn't provide duration yet
        days: ["Daily"], // Backend doesn't provide days yet
        classes: [
          { type: "Standard Class", price: item.price, available: item.availableSeats },
          // Mocking other classes since backend only has one price/seat count
          { type: "First Class", price: item.price * 2, available: Math.max(0, item.availableSeats - 50) }
        ]
      }));

      setSearchResults(adaptedTrains);
      setHasSearched(true);
    } catch (error) {
      console.error("Error fetching trains:", error);
      // Fallback or error handling could go here
    } finally {
      setLoading(false);
    }
  };

  const getAvailabilityColor = (available: number) => {
    if (available > 30) return "text-green-600";
    if (available > 10) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <Card className="p-6">
        <h2 className="text-2xl mb-6">Search Trains</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <Label htmlFor="from">From Station</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
              <Input
                id="from"
                placeholder="Departure station"
                value={fromStation}
                onChange={(e) => setFromStation(e.target.value)}
                className="pl-10"
                list="from-stations"
              />
              <datalist id="from-stations">
                {popularStations.map((station) => (
                  <option key={station} value={station} />
                ))}
              </datalist>
            </div>
          </div>

          <div>
            <Label htmlFor="to">To Station</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
              <Input
                id="to"
                placeholder="Arrival station"
                value={toStation}
                onChange={(e) => setToStation(e.target.value)}
                className="pl-10"
                list="to-stations"
              />
              <datalist id="to-stations">
                {popularStations.map((station) => (
                  <option key={station} value={station} />
                ))}
              </datalist>
            </div>
          </div>

          <div>
            <Label htmlFor="date">Travel Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
              <Input
                id="date"
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="pl-10"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="passengers">Passengers</Label>
            <Select value={passengers} onValueChange={setPassengers}>
              <SelectTrigger id="passengers">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "Passenger" : "Passengers"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={handleSearch} className="w-full md:w-auto" disabled={loading}>
          <Search size={18} className="mr-2" />
          {loading ? "Searching..." : "Search Trains"}
        </Button>
      </Card>

      {/* Search Results */}
      {hasSearched && (
        <div className="space-y-4">
          <h3 className="text-xl">{searchResults.length} Trains Available</h3>
          {searchResults.length === 0 ? (
            <p className="text-gray-500">No trains found for this route.</p>
          ) : (
            searchResults.map((train, index) => (
              // Around Row 189 - Update the motion.div wrapper
              <motion.div
                key={train.id}
                {...({
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: {
                    duration: 0.3,
                    delay: index * 0.1
                  }
                } as any)}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* Train Info */}
                    <div className="lg:col-span-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-lg mb-1">{train.name}</h4>
                          <p className="text-sm text-gray-600">#{train.number}</p>
                        </div>
                        <div className="flex gap-1">
                          {train.days.slice(0, 3).map((day) => (
                            <span
                              key={day}
                              className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                            >
                              {day}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Route Timeline */}
                      <div className="flex items-center gap-3 text-sm">
                        <div className="text-center">
                          <div className="text-2xl mb-1">{train.departure}</div>
                          <div className="text-gray-600">{train.from}</div>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                          <div className="flex items-center gap-2 text-gray-500">
                            <Clock size={14} />
                            <span>{train.duration}</span>
                          </div>
                          <div className="w-full h-px bg-gray-300 my-2 relative">
                            <ArrowRight
                              className="absolute right-0 -top-2 text-gray-400"
                              size={16}
                            />
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl mb-1">{train.arrival}</div>
                          <div className="text-gray-600">{train.to}</div>
                        </div>
                      </div>
                    </div>

                    {/* Classes and Pricing */}
                    <div className="lg:col-span-7">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {train.classes.map((classInfo) => (
                          <div
                            key={classInfo.type}
                            className="border rounded-lg p-3 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
                            onClick={() => onSelectTrain(train, classInfo.type)}
                          >
                            <div className="text-sm text-gray-600 mb-1">{classInfo.type}</div>
                            <div className="flex items-center gap-1 mb-2">
                              <IndianRupee size={18} />
                              <span className="text-xl">{classInfo.price}</span>
                            </div>
                            <div className={`text-sm ${getAvailabilityColor(classInfo.available)}`}>
                              {classInfo.available > 0 ? (
                                <span>Available: {classInfo.available}</span>
                              ) : (
                                <span>Waitlist</span>
                              )}
                            </div>
                            <Button size="sm" className="w-full mt-2">
                              Book Now
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
}