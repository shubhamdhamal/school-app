"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SchoolFormData {
    name: string;
    address: string;
    city: string;
    state: string;
    contact: string;
    email_id: string;
    image: FileList;
}

export default function AddSchool() {
    const { register, handleSubmit, formState: { errors } } = useForm<SchoolFormData>();
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (data: SchoolFormData) => {
        setIsLoading(true);
        try {
            let imagePath = "";
            if (data.image[0]) {
                const formData = new FormData();
                formData.append("image", data.image[0]);
                const res = await fetch("/api/upload-image", {
                    method: "POST",
                    body: formData,
                });
                const uploadResult = await res.json();
                imagePath = uploadResult.image;
            }

            const schoolData = {
                name: data.name,
                address: data.address,
                city: data.city,
                state: data.state,
                contact: data.contact,
                email_id: data.email_id,
                image: imagePath,
            };

            const response = await fetch("/api/schools", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(schoolData),
            });

            if (response.ok) {
                setMessage("✅ School added successfully!");
                setTimeout(() => {
                    router.push("/schools");
                }, 1500);
            } else {
                const error = await response.json();
                setMessage("❌ Error: " + (error.error || "Something went wrong"));
            }
        } catch (err) {
            setMessage("❌ Error: " + (err instanceof Error ? err.message : "Something went wrong"));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500">
            <header className="bg-blue-600/80 backdrop-blur-sm text-white p-4">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">🏫 School Directory</h1>
                    <nav className="space-x-4">
                            <div className="flex flex-row gap-6">
                                <a href="/add-school" className="text-white font-semibold hover:underline flex flex-col items-center">
                                    <span>Add</span>
                                    <span>School</span>
                                </a>
                                <a href="/schools" className="text-white font-semibold hover:underline flex flex-col items-center">
                                    <span>Show</span>
                                    <span>Schools</span>
                                </a>
                            </div>
                    </nav>
                </div>
            </header>

            <main className="max-w-2xl mx-auto p-8">
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-white text-center mb-8">Add a School</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <input
                                placeholder="School Name"
                                {...register("name", { required: "School name is required" })}
                                className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                            {errors.name && (
                                <span className="text-red-200 text-sm mt-1 block">{errors.name.message}</span>
                            )}
                        </div>

                        <div>
                            <input
                                placeholder="Address"
                                {...register("address", { required: "Address is required" })}
                                className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                            {errors.address && (
                                <span className="text-red-200 text-sm mt-1 block">{errors.address.message}</span>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <input
                                    placeholder="City"
                                    {...register("city", { required: "City is required" })}
                                    className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                                />
                                {errors.city && (
                                    <span className="text-red-200 text-sm mt-1 block">{errors.city.message}</span>
                                )}
                            </div>
                            <div>
                                <input
                                    placeholder="State"
                                    {...register("state", { required: "State is required" })}
                                    className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                                />
                                {errors.state && (
                                    <span className="text-red-200 text-sm mt-1 block">{errors.state.message}</span>
                                )}
                            </div>
                        </div>

                        <div>
                            <input
                                placeholder="Contact Number"
                                {...register("contact", {
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Enter valid 10-digit number"
                                    }
                                })}
                                className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                            {errors.contact && (
                                <span className="text-red-200 text-sm mt-1 block">{errors.contact.message}</span>
                            )}
                        </div>

                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                {...register("email_id", {
                                    required: "Email required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Enter valid email"
                                    }
                                })}
                                className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                            {errors.email_id && (
                                <span className="text-red-200 text-sm mt-1 block">{errors.email_id.message}</span>
                            )}
                        </div>

                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("image")}
                                className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white/20 file:text-white hover:file:bg-white/30"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full p-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Adding..." : "Add School"}
                        </button>
                    </form>

                    {message && (
                        <p className="mt-6 text-center text-white font-semibold">{message}</p>
                    )}
                </div>
            </main>
        </div>
    );
}
