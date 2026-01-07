import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface LoginProps {
    onLoginSuccess: (token: string, username: string) => void;
    onNavigateToSignup: () => void;
}

export function Login({ onLoginSuccess, onNavigateToSignup }: LoginProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8080/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            toast.success("Login Successful!");
            onLoginSuccess(data.accessToken, data.username);
        } catch (error: any) {
            toast.error(error.message || "Failed to login. Please check your credentials.");
            console.error("Login Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center py-12 px-4 bg-gray-50 min-h-[60vh]">
            <motion.div
                {...({
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 }
                } as any)}
                className="w-full max-w-md"
            >
                <Card className="p-8 shadow-xl border-t-4 border-blue-600">
                    <div className="mb-6 text-center">
                        <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                        <p className="text-gray-500 mt-2">Sign in to manage your bookings</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="bg-gray-50"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="password">Password</Label>
                                <a href="#" className="text-xs text-blue-600 hover:underline">Forgot password?</a>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-gray-50"
                            />
                        </div>

                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <p className="text-gray-600">
                            Don't have an account?{" "}
                            <button
                                onClick={onNavigateToSignup}
                                className="text-blue-600 font-medium hover:underline focus:outline-none"
                            >
                                Create an account
                            </button>
                        </p>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
