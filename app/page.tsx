import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500">
      <header className="bg-blue-600/80 backdrop-blur-sm text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">🏫 School Directory</h1>
          <nav className="space-x-4">
            <Link href="/add-school" className="hover:underline font-semibold">
              Add School
            </Link>
            <Link href="/schools" className="hover:underline font-semibold">
              Show Schools
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Welcome to School Directory
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Manage and explore schools in your area
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/add-school"
              className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-6 py-3 text-white font-semibold hover:bg-white/30 transition-colors"
            >
              ➕ Add New School
            </Link>
            <Link
              href="/schools"
              className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-6 py-3 text-white font-semibold hover:bg-white/30 transition-colors"
            >
              🏫 View Schools
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
