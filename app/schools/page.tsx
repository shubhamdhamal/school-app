"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface School {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    contact: string;
    email_id: string;
    image: string;
}

export default function ShowSchools() {
    const [schools, setSchools] = useState<School[]>([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await fetch("/api/schools");
                if (response.ok) {
                    const data = await response.json();
                    setSchools(data);
                } else {
                    console.error("Failed to fetch schools");
                }
            } catch (error) {
                console.error("Error fetching schools:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSchools();
    }, []);

    const filteredSchools = schools.filter(
        (school) =>
            school.name.toLowerCase().includes(search.toLowerCase()) ||
            school.city.toLowerCase().includes(search.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <div className="text-white text-xl">Loading schools...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500">
            <header className="bg-blue-600/80 backdrop-blur-sm text-white p-4">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">🏫 School Directory</h1>
                        <nav className="flex flex-col space-y-4">
                            <div className="flex flex-row gap-6">
                                <Link href="/add-school" className="text-white font-semibold hover:underline flex flex-col items-center">
                                    <span>Add</span>
                                    <span>School</span>
                                </Link>
                                <Link href="/schools" className="text-white font-semibold hover:underline flex flex-col items-center">
                                    <span>Show</span>
                                    <span>Schools</span>
                                </Link>
                            </div>
                        </nav>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-8">
                <div className="text-center mb-8">
                    <input
                        type="text"
                        placeholder="🔍 Search by name or city..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full max-w-md p-3 rounded-lg border border-white/30 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                </div>

                {filteredSchools.length === 0 ? (
                    <div className="text-center text-white">
                        <p className="text-xl mb-4">
                            {search ? "No schools found matching your search." : "No schools found."}
                        </p>
                        {!search && (
                            <Link
                                href="/add-school"
                                className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-6 py-3 text-white font-semibold hover:bg-white/30 transition-colors"
                            >
                                Add the first school
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSchools.map((school) => (
                            <div
                                key={school.id}
                                className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 shadow-lg hover:transform hover:scale-105 transition-all duration-200"
                            >
                                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                                    {school.image ? (
                                        <Image
                                            src={school.image}
                                            alt={school.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                            <span className="text-gray-500">No image</span>
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2">{school.name}</h3>
                                <p className="text-white/90 mb-1">{school.address}</p>
                                <p className="text-white/90 mb-2">{school.city}, {school.state}</p>

                                {school.contact && (
                                    <p className="text-white/80 text-sm mb-1">📞 {school.contact}</p>
                                )}
                                {school.email_id && (
                                    <p className="text-white/80 text-sm">📧 {school.email_id}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
