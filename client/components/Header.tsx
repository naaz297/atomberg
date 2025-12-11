import { Link } from "react-router-dom";
import { Wind } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
            <Wind className="w-6 h-6 text-slate-900" />
          </div>
          <span className="text-xl font-bold text-white">Atomberg</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-slate-300 hover:text-white transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 rounded-lg font-semibold hover:shadow-lg hover:shadow-yellow-500/50 transition-all"
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
