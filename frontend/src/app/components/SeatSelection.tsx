import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { IndianRupee, Users, Check } from "lucide-react";
import type { Train } from "./TrainSearch";

interface SeatSelectionProps {
  train: Train;
  classType: string;
  onConfirmBooking: (seats: string[], totalPrice: number) => void;
  onCancel: () => void;
}

type SeatStatus = "available" | "selected" | "booked";

interface Seat {
  id: string;
  status: SeatStatus;
  row: number;
  column: number;
}

export function SeatSelection({ train, classType, onConfirmBooking, onCancel }: SeatSelectionProps) {
  const selectedClass = train.classes.find((c) => c.type === classType);
  const pricePerSeat = selectedClass?.price || 0;

  // Generate seat layout based on class type
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    let rows = 15;
    let cols = 4;

    if (classType.includes("AC Chair") || classType.includes("Executive")) {
      rows = 12;
      cols = 4;
    } else if (classType.includes("First AC")) {
      rows = 8;
      cols = 4;
    }

    for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= cols; col++) {
        const seatNumber = `${String.fromCharCode(64 + col)}${row}`;
        // Randomly mark some seats as booked
        const isBooked = Math.random() > 0.7;
        seats.push({
          id: seatNumber,
          status: isBooked ? "booked" : "available",
          row,
          column: col,
        });
      }
    }

    return seats;
  };

  const [seats, setSeats] = useState<Seat[]>(generateSeats());
  const selectedSeats = seats.filter((s) => s.status === "selected");
  const totalPrice = selectedSeats.length * pricePerSeat;

  const handleSeatClick = (seatId: string) => {
    setSeats((prev) =>
      prev.map((seat) => {
        if (seat.id === seatId && seat.status !== "booked") {
          return {
            ...seat,
            status: seat.status === "selected" ? "available" : "selected",
          };
        }
        return seat;
      })
    );
  };

  const getSeatColor = (status: SeatStatus) => {
    switch (status) {
      case "available":
        return "bg-green-100 hover:bg-green-200 border-green-300 cursor-pointer";
      case "selected":
        return "bg-blue-600 text-white border-blue-700 cursor-pointer";
      case "booked":
        return "bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed";
    }
  };

  const handleConfirm = () => {
    if (selectedSeats.length > 0) {
      onConfirmBooking(
        selectedSeats.map((s) => s.id),
        totalPrice
      );
    }
  };

  // Group seats by row for display
  const seatsByRow: { [key: number]: Seat[] } = {};
  seats.forEach((seat) => {
    if (!seatsByRow[seat.row]) {
      seatsByRow[seat.row] = [];
    }
    seatsByRow[seat.row].push(seat);
  });

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl mb-2">Select Your Seats</h2>
            <p className="text-gray-600">
              {train.name} - {classType}
            </p>
            <p className="text-sm text-gray-500">
              {train.from} → {train.to} | {train.departure} - {train.arrival}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-1">Price per seat</div>
            <div className="flex items-center gap-1 text-2xl">
              <IndianRupee size={24} />
              <span>{pricePerSeat}</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 border-2 border-green-300 rounded"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 border-2 border-blue-700 rounded"></div>
            <span className="text-sm">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 border-2 border-gray-400 rounded"></div>
            <span className="text-sm">Booked</span>
          </div>
        </div>

        {/* Seat Map */}
        <div className="mb-6">
          <div className="bg-gradient-to-b from-gray-200 to-gray-100 p-3 rounded-t-lg text-center text-sm mb-4">
            Front of Coach
          </div>

          <div className="max-h-[500px] overflow-y-auto px-4">
            <div className="space-y-2">
              {Object.keys(seatsByRow)
                .map(Number)
                .sort((a, b) => a - b)
                .map((rowNum) => (
                  <div key={rowNum} className="flex items-center gap-2">
                    <div className="text-xs text-gray-500 w-8">{rowNum}</div>
                    <div className="flex gap-2 flex-1 justify-center">
                      {seatsByRow[rowNum]
                        .sort((a, b) => a.column - b.column)
                        .map((seat, idx) => (
                          <div key={seat.id} className="flex gap-2">
                            <motion.button
                              whileHover={
                                seat.status !== "booked" ? { scale: 1.1 } : {}
                              }
                              whileTap={
                                seat.status !== "booked" ? { scale: 0.95 } : {}
                              }
                              onClick={() => handleSeatClick(seat.id)}
                              disabled={seat.status === "booked"}
                              className={`w-10 h-10 md:w-12 md:h-12 border-2 rounded-lg text-xs flex items-center justify-center transition-all ${getSeatColor(
                                seat.status
                              )}`}
                            >
                              {seat.status === "selected" ? (
                                <Check size={18} />
                              ) : (
                                seat.id
                              )}
                            </motion.button>
                            {/* Aisle after 2nd column */}
                            {idx === 1 && <div className="w-4"></div>}
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-gradient-to-t from-gray-200 to-gray-100 p-3 rounded-b-lg text-center text-sm mt-4">
            Back of Coach
          </div>
        </div>

        {/* Summary */}
        {selectedSeats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users size={20} className="text-blue-600" />
                  <span className="font-semibold">
                    {selectedSeats.length} Seat{selectedSeats.length > 1 ? "s" : ""} Selected
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map((seat) => (
                    <span
                      key={seat.id}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      {seat.id}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-1">Total Amount</div>
                <div className="flex items-center gap-1 text-3xl text-blue-900">
                  <IndianRupee size={28} />
                  <span>{totalPrice}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={selectedSeats.length === 0}
            className="flex-1"
          >
            Confirm & Proceed to Payment
          </Button>
        </div>
      </Card>
    </div>
  );
}
