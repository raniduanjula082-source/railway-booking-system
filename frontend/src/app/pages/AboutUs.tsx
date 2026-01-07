import { Card } from "../components/ui/card";
import { motion } from "framer-motion";
import { Train, History, Target, Eye } from "lucide-react";

export function AboutUs() {
    return (
        <div className="max-w-6xl mx-auto py-12 px-4">
            <motion.div
                {...({
                    initial: { opacity: 0, y: 30 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.5 }
                } as any)}
                className="text-center mb-16"
            >
                <h1 className="text-5xl font-bold mb-6 text-gray-900">About Sri Lanka Railways</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Connecting the nation for over 160 years. Experience the beauty of Sri Lanka through our scenic journeys.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
                <motion.div
                    {...({
                        initial: { opacity: 0, x: -30 },
                        animate: { opacity: 1, x: 0 },
                        transition: { delay: 0.2 }
                    } as any)}
                >
                    <img
                        src="https://www.shutterstock.com/shutterstock/photos/2582183863/display_1500/stock-photo-ella-sri-lanka-january-railway-station-of-ella-resort-in-sri-lanka-asia-2582183863.jpg"
                        alt="Train in Sri Lanka"
                        className="rounded-2xl shadow-2xl"
                    />
                </motion.div>

                <motion.div
                    {...({
                        initial: { opacity: 0, x: 30 },
                        animate: { opacity: 1, x: 0 },
                        transition: { delay: 0.4 }
                    } as any)}
                    className="space-y-6"
                >
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <History className="text-orange-600" />
                        Our Heritage
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Sri Lanka Railways (SLR) is the owner and operator of the railway network in Sri Lanka.
                        Founded in 1858 as the Ceylon Government Railway, it operates approximately 1,508 km
                        (937 mi) of rail tracks across the nation. From the misty mountains of Ella to the coastal
                        breezes of Galle, we provide a vital link that powers the nation's economy and tourism.
                    </p>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                    {...({ whileHover: { y: -10 } } as any)}
                    className="h-full"
                >
                    <Card className="p-8 h-full bg-gradient-to-br from-blue-50 to-white hover:shadow-lg border-t-4 border-blue-500">
                        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <Target className="text-blue-600" size={24} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-gray-900">Our Mission</h3>
                        <p className="text-gray-600">
                            To provide safe, reliable, and affordable transport services
                            to the public while preserving the rich heritage of our railway history
                            and adapting to modern transportation needs.
                        </p>
                    </Card>
                </motion.div>

                <motion.div
                    {...({ whileHover: { y: -10 } } as any)}
                    className="h-full"
                >
                    <Card className="p-8 h-full bg-gradient-to-br from-green-50 to-white hover:shadow-lg border-t-4 border-green-500">
                        <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <Eye className="text-green-600" size={24} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-gray-900">Our Vision</h3>
                        <p className="text-gray-600">
                            To be the most efficient and customer-centric transport provider in South Asia,
                            setting benchmarks for operational excellence and sustainable mobility.
                        </p>
                    </Card>
                </motion.div>

                <motion.div
                    {...({ whileHover: { y: -10 } } as any)}
                    className="h-full"
                >
                    <Card className="p-8 h-full bg-gradient-to-br from-orange-50 to-white hover:shadow-lg border-t-4 border-orange-500">
                        <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <Train className="text-orange-600" size={24} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-gray-900">The Fleet</h3>
                        <p className="text-gray-600">
                            We operate a diverse fleet ranging from iconic steam locomotives for special tours
                            to modern diesel-electric power sets, serving over 300,000 commuters daily.
                        </p>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
