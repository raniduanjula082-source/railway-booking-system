import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface SignupProps {
    onNavigateToLogin: () => void;
}

export function Signup({ onNavigateToLogin }: SignupProps) {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://localhost:8080/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // Backend expects: username, email, password, role 
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    role: ["user"]
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            toast.success("Account created successfully! Please log in.");
            onNavigateToLogin();
        } catch (error: any) {
            toast.error(error.message || "Failed to register.");
            console.error("Signup Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center py-12 px-4 bg-gray-50 min-h-[60vh]">
            <motion.div
                {...({
                    initial: { opacity: 0, scale: 0.95 },
                    animate: { opacity: 1, scale: 1 }
                } as any)}
                className="w-full max-w-md"
            >
                <Card className="p-8 shadow-xl border-t-4 border-green-600">
                    <div className="mb-6 text-center">
                        <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                        <p className="text-gray-500 mt-2">Join Sri Lanka Railways today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="bg-gray-50"
                                placeholder="Choose a username"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="bg-gray-50"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="bg-gray-50"
                                placeholder="Create a strong password"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="bg-gray-50"
                                placeholder="Confirm your password"
                            />
                        </div>

                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 mt-2" disabled={loading}>
                            {loading ? "Creating Account..." : "Sign Up"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <p className="text-gray-600">
                            Already have an account?{" "}
                            <button
                                onClick={onNavigateToLogin}
                                className="text-green-600 font-medium hover:underline focus:outline-none"
                            >
                                Sign In
                            </button>
                        </p>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
