import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { motion } from "motion/react";
import {
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  IndianRupee,
  Check,
  AlertCircle,
} from "lucide-react";
import type { Train } from "./TrainSearch";

interface PaymentCheckoutProps {
  train: Train;
  classType: string;
  seats: string[];
  totalPrice: number;
  onPaymentSuccess: () => void;
  onCancel: () => void;
}

type PaymentMethod = "card" | "upi" | "netbanking" | "wallet";

export function PaymentCheckout({
  train,
  classType,
  seats,
  totalPrice,
  onPaymentSuccess,
  onCancel,
}: PaymentCheckoutProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Form states
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");

  const paymentMethods = [
    { id: "card" as PaymentMethod, icon: <CreditCard size={24} />, label: "Credit/Debit Card" },
    { id: "upi" as PaymentMethod, icon: <Smartphone size={24} />, label: "UPI" },
    { id: "netbanking" as PaymentMethod, icon: <Building2 size={24} />, label: "Net Banking" },
    { id: "wallet" as PaymentMethod, icon: <Wallet size={24} />, label: "Wallet" },
  ];

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setPaymentSuccess(true);

    // Wait a bit then call success callback
    setTimeout(() => {
      onPaymentSuccess();
    }, 2000);
  };

  const convenienceFee = Math.round(totalPrice * 0.02);
  const gst = Math.round((totalPrice + convenienceFee) * 0.05);
  const finalAmount = totalPrice + convenienceFee + gst;

  if (paymentSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center min-h-[500px]"
      >
        <Card className="p-12 text-center max-w-md">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="text-green-600" size={48} />
          </motion.div>
          <h2 className="text-2xl mb-3">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your booking has been confirmed. You will receive a confirmation email shortly.
          </p>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
            <div className="text-sm text-gray-600 mb-1">PNR Number</div>
            <div className="text-2xl text-blue-900">
              {Math.floor(Math.random() * 9000000000) + 1000000000}
            </div>
          </div>
          <Button onClick={onPaymentSuccess} className="w-full">
            View Booking
          </Button>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl mb-6">Payment & Checkout</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Method Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg mb-4">Select Payment Method</h3>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      selectedMethod === method.id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={
                          selectedMethod === method.id ? "text-blue-600" : "text-gray-600"
                        }
                      >
                        {method.icon}
                      </div>
                      <span className="text-sm">{method.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Forms */}
            <div>
              {selectedMethod === "card" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength={19}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      placeholder="Name as on card"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        type="password"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        maxLength={3}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedMethod === "upi" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input
                      id="upiId"
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      You will receive a payment request on your UPI app. Please approve to complete
                      the transaction.
                    </p>
                  </div>
                </motion.div>
              )}

              {selectedMethod === "netbanking" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="bank">Select Bank</Label>
                    <select
                      id="bank"
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option>State Bank of India</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                      <option>Punjab National Bank</option>
                    </select>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      You will be redirected to your bank's secure login page to complete the
                      payment.
                    </p>
                  </div>
                </motion.div>
              )}

              {selectedMethod === "wallet" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <button className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-all text-left">
                    <div className="flex items-center justify-between">
                      <span>Paytm Wallet</span>
                      <span className="text-sm text-gray-500">Balance: ₹5,000</span>
                    </div>
                  </button>
                  <button className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-all text-left">
                    <div className="flex items-center justify-between">
                      <span>PhonePe Wallet</span>
                      <span className="text-sm text-gray-500">Balance: ₹3,500</span>
                    </div>
                  </button>
                  <button className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-all text-left">
                    <div className="flex items-center justify-between">
                      <span>Google Pay</span>
                      <span className="text-sm text-gray-500">Link wallet</span>
                    </div>
                  </button>
                </motion.div>
              )}
            </div>

            {/* Security Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle className="text-green-600 flex-shrink-0" size={20} />
                <div className="text-sm text-gray-700">
                  Your payment information is encrypted and secure. We never store your card details.
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              <Card className="p-4 bg-gray-50">
                <h4 className="mb-4">Booking Summary</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-gray-600 mb-1">Train</div>
                    <div>{train.name}</div>
                    <div className="text-xs text-gray-500">#{train.number}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Route</div>
                    <div>{train.from} → {train.to}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Class</div>
                    <div>{classType}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Seats</div>
                    <div className="flex flex-wrap gap-1">
                      {seats.map((seat) => (
                        <span
                          key={seat}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                        >
                          {seat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="mb-4">Price Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Base Fare ({seats.length} seat{seats.length > 1 ? "s" : ""})</span>
                    <span className="flex items-center gap-1">
                      <IndianRupee size={12} />
                      {totalPrice}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Convenience Fee</span>
                    <span className="flex items-center gap-1">
                      <IndianRupee size={12} />
                      {convenienceFee}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>GST (5%)</span>
                    <span className="flex items-center gap-1">
                      <IndianRupee size={12} />
                      {gst}
                    </span>
                  </div>
                  <div className="pt-2 border-t flex justify-between text-lg">
                    <span>Total Amount</span>
                    <span className="flex items-center gap-1 text-blue-900">
                      <IndianRupee size={16} />
                      {finalAmount}
                    </span>
                  </div>
                </div>
              </Card>

              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full"
              >
                {isProcessing ? "Processing..." : `Pay ₹${finalAmount}`}
              </Button>

              <Button
                variant="outline"
                onClick={onCancel}
                disabled={isProcessing}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
