import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { TrainSearch, type Train } from "./components/TrainSearch";
import { SeatSelection } from "./components/SeatSelection";
import { TrainSchedule } from "./components/TrainSchedule";
import { NewsUpdates } from "./components/NewsUpdates";
import { MyBookings } from "./components/MyBookings";
import { Services } from "./components/Services";
import { PaymentCheckout } from "./components/PaymentCheckout";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AboutUs } from "./pages/AboutUs";
import { Careers } from "./pages/Careers";
import { Toaster, toast } from "sonner";

type BookingStep = "search" | "seats" | "payment" | "success";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [bookingStep, setBookingStep] = useState<BookingStep>("search");
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState<{ username: string } | null>(null);

  const handleLoginSuccess = (token: string, username: string) => {
    localStorage.setItem("token", token);
    setUser({ username });
    setActiveTab("home");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.info("Logged out successfully");
    setActiveTab("home");
  };

  const handleSelectTrain = (train: Train, classType: string) => {
    setSelectedTrain(train);
    setSelectedClass(classType);
    setBookingStep("seats");
    setActiveTab("search");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleConfirmSeats = (seats: string[], price: number) => {
    setSelectedSeats(seats);
    setTotalPrice(price);
    setBookingStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePaymentSuccess = () => {
    toast.success("Booking Confirmed!", {
      description: "Your ticket has been booked successfully. Check your email for details.",
    });
    setBookingStep("success");
    setActiveTab("bookings");
    // Reset booking state
    setTimeout(() => {
      setBookingStep("search");
      setSelectedTrain(null);
      setSelectedClass("");
      setSelectedSeats([]);
      setTotalPrice(0);
    }, 2000);
  };

  const handleCancelBooking = () => {
    setBookingStep("search");
    setSelectedTrain(null);
    setSelectedClass("");
    setSelectedSeats([]);
    setTotalPrice(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookNowClick = () => {
    setActiveTab("search");
    setBookingStep("search");
  };

  const handleExploreRoutesClick = () => {
    setActiveTab("schedule");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" richColors />
      <Header activeTab={activeTab} onTabChange={setActiveTab} user={user} onLogout={handleLogout} />

      <main className="min-h-[calc(100vh-80px)]">
        {/* Home Tab */}
        {activeTab === "home" && (
          <div>
            <Hero onBookNowClick={handleBookNowClick} onExploreRoutesClick={handleExploreRoutesClick} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">🎫</span>
                  </div>
                  <h3 className="text-xl mb-2">Easy Booking</h3>
                  <p className="text-gray-600">
                    Book tickets in just a few clicks with our intuitive booking system
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">💺</span>
                  </div>
                  <h3 className="text-xl mb-2">Choose Your Seat</h3>
                  <p className="text-gray-600">
                    Select your preferred seat from our interactive seat map
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">🚄</span>
                  </div>
                  <h3 className="text-xl mb-2">Real-time Updates</h3>
                  <p className="text-gray-600">
                    Get live train status and platform information
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-orange-600 to-red-700 text-white rounded-2xl p-8 mb-12">
                <h2 className="text-3xl mb-6 text-center">Why Choose Sri Lanka Railways?</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-4xl mb-2">500K+</div>
                    <div className="text-orange-100">Daily Travelers</div>
                  </div>
                  <div>
                    <div className="text-4xl mb-2">200+</div>
                    <div className="text-orange-100">Daily Trains</div>
                  </div>
                  <div>
                    <div className="text-4xl mb-2">1500km</div>
                    <div className="text-orange-100">Railway Network</div>
                  </div>
                  <div>
                    <div className="text-4xl mb-2">145+</div>
                    <div className="text-orange-100">Years History</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search/Booking Tab */}
        {activeTab === "search" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {bookingStep === "search" && (
              <TrainSearch onSelectTrain={handleSelectTrain} />
            )}
            {bookingStep === "seats" && selectedTrain && (
              <SeatSelection
                train={selectedTrain}
                classType={selectedClass}
                onConfirmBooking={handleConfirmSeats}
                onCancel={handleCancelBooking}
              />
            )}
            {bookingStep === "payment" && selectedTrain && (
              <PaymentCheckout
                train={selectedTrain}
                classType={selectedClass}
                seats={selectedSeats}
                totalPrice={totalPrice}
                onPaymentSuccess={handlePaymentSuccess}
                onCancel={handleCancelBooking}
              />
            )}
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === "schedule" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <TrainSchedule />
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <MyBookings />
          </div>
        )}

        {/* News Tab */}
        {activeTab === "news" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <NewsUpdates />
          </div>
        )}

        {/* Services Tab */}
        {activeTab === "services" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Services />
          </div>
        )}

        {/* Auth Tabs */}
        {activeTab === "login" && (
          <Login
            onLoginSuccess={handleLoginSuccess}
            onNavigateToSignup={() => setActiveTab("signup")}
          />
        )}
        {activeTab === "signup" && (
          <Signup onNavigateToLogin={() => setActiveTab("login")} />
        )}

        {/* Info Pages */}
        {activeTab === "about" && <AboutUs />}
        {activeTab === "careers" && <Careers />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-lg mb-4">About Sri Lanka Railways</h4>
              <p className="text-gray-400 text-sm">
                Sri Lanka's premier railway booking platform, connecting travelers across
                the beautiful island with scenic journeys and reliable service.
              </p>
            </div>
            <div>
              <h4 className="text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button onClick={() => setActiveTab("about")} className="hover:text-white transition-colors">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => window.location.href = "mailto:info@railway.gov.lk"} className="hover:text-white transition-colors">
                    Contact
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab("careers")} className="hover:text-white transition-colors">
                    Careers
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Refund Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg mb-4">Contact Us</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>📞 +94 11 234 5678</li>
                <li>📧 info@railway.gov.lk</li>
                <li>📍 Colombo Fort Railway Station</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2026 Sri Lanka Railways - Department of Railways. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}