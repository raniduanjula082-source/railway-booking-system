import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Careers() {
    const jobs = [
        { id: 1, title: "Locomotive Driver", dept: "Operations", location: "Colombo Fort", type: "Full-time", salary: "LKR 85,000 - 120,000" },
        { id: 2, title: "Station Master", dept: "Management", location: "Kandy", type: "Full-time", salary: "LKR 65,000 - 90,000" },
        { id: 3, title: "Railway Civil Engineer", dept: "Engineering", location: "Ratmalana", type: "Contract", salary: "Negotiable" },
        { id: 4, title: "Customer Service Agent", dept: "Support", location: "Galle", type: "Part-time", salary: "LKR 35,000 - 50,000" },
        { id: 5, title: "Signal Technician", dept: "Maintenance", location: "Anuradhapura", type: "Full-time", salary: "LKR 55,000 - 75,000" },
    ];

    return (
        <div className="max-w-5xl mx-auto py-12 px-4">
            <motion.div
                {...({
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 }
                } as any)}
                className="text-center mb-16"
            >
                <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Careers at SLR</span>
                <h1 className="text-4xl font-bold mt-2 mb-4 text-gray-900">Join Our Team</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Help us build the future of transportation in Sri Lanka.
                    We are looking for passionate individuals to join our growing family.
                </p>
            </motion.div>

            <div className="grid gap-6">
                {jobs.map((job, index) => (
                    <motion.div
                        key={job.id}
                        {...({
                            initial: { opacity: 0, y: 20 },
                            animate: { opacity: 1, y: 0 },
                            transition: { delay: index * 0.1 }
                        } as any)}
                    >
                        <Card className="p-6 hover:shadow-lg transition-all border-l-4 border-l-transparent hover:border-l-blue-600 group">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {job.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Briefcase size={16} className="text-gray-400" />
                                            {job.dept}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin size={16} className="text-gray-400" />
                                            {job.location}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={16} className="text-gray-400" />
                                            {job.type}
                                        </span>
                                        <span className="font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
                                            {job.salary}
                                        </span>
                                    </div>
                                </div>
                                <Button className="w-full md:w-auto">
                                    Apply Now <ArrowRight size={16} className="ml-2" />
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="mt-16 text-center bg-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-3">Don't see a fitting role?</h3>
                <p className="text-gray-600 mb-6">
                    We are always looking for talented people. Send us your CV and we will contact you
                    when a matching position opens.
                </p>
                <Button variant="outline" className="bg-white hover:bg-gray-50">
                    Email Your CV
                </Button>
            </div>
        </div>
    );
}
