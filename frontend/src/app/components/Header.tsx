import { Train, Menu, User, Bell, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  user?: { username: string } | null;
  onLogout?: () => void;
}

export function Header({ activeTab, onTabChange, user, onLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, title: "Train Delayed", desc: "The 10:30 AM Kandy Express is delayed by 15 mins.", time: "10m ago", read: false },
    { id: 2, title: "Booking Confirmed", desc: "Your booking for Colombo to Galle is confirmed.", time: "2h ago", read: false },
    { id: 3, title: "System Maintenance", desc: "Scheduled maintenance tonight at 11 PM.", time: "5h ago", read: true },
  ]);
  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { id: "home", label: "Home" },
    { id: "search", label: "Book Tickets" },
    { id: "schedule", label: "Train Schedule" },
    { id: "bookings", label: "My Bookings" },
    { id: "news", label: "News & Updates" },
    { id: "services", label: "Services" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onTabChange("home")}>
            <div className="bg-gradient-to-br from-orange-600 to-red-700 p-2 rounded-lg">
              <Train className="text-white" size={28} />
            </div>
            <div>
              <h1 className="font-bold text-xl text-orange-900">Sri Lanka Railways</h1>
              <p className="text-xs text-gray-600">Department of Railways</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`px-4 py-2 rounded-lg transition-all ${activeTab === item.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-50"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={20} className="text-gray-700" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    {...({
                      initial: { opacity: 0, y: 10, scale: 0.95 },
                      animate: { opacity: 1, y: 0, scale: 1 },
                      exit: { opacity: 0, y: 10, scale: 0.95 }
                    } as any)}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                  >
                    <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b hover:bg-gray-50 transition-colors cursor-pointer ${!notification.read ? 'bg-blue-50/50' : ''
                              }`}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <h4 className={`text-sm font-medium ${!notification.read ? 'text-blue-700' : 'text-gray-900'}`}>
                                {notification.title}
                              </h4>
                              <span className="text-xs text-gray-500">{notification.time}</span>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed">
                              {notification.desc}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-gray-500 text-sm">
                          No new notifications
                        </div>
                      )}
                    </div>
                    <div className="p-2 border-t bg-gray-50 text-center">
                      <button className="text-xs text-blue-600 hover:underline font-medium">
                        Mark all as read
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700 hidden sm:block">Hi, {user.username}</span>
                <Button variant="outline" size="sm" onClick={onLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={() => onTabChange("login")} className="hidden sm:flex items-center gap-2">
                <User size={18} />
                <span>Login</span>
              </Button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            {...({
              initial: { height: 0, opacity: 0 },
              animate: { height: "auto", opacity: 1 },
              exit: { height: 0, opacity: 0 }
            } as any)}
            className="lg:hidden border-t overflow-hidden"
          >
            <nav className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${activeTab === item.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-50"
                    }`}
                >
                  {item.label}
                </button>
              ))}
              {!user && (
                <button
                  onClick={() => {
                    onTabChange("login");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 transition-all font-medium"
                >
                  Login
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}