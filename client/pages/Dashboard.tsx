import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Wind, Power, Plus, Trash2, AlertCircle } from "lucide-react";

interface Fan {
  id: string;
  name: string;
  isOn: boolean;
  speed: number;
  temperature?: number;
}

export default function Dashboard() {
  const [apiKey, setApiKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fans, setFans] = useState<Fan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock fans for demo
  const mockFans: Fan[] = [
    { id: "1", name: "Living Room Fan", isOn: true, speed: 65, temperature: 28 },
    { id: "2", name: "Bedroom Fan", isOn: false, speed: 0, temperature: 24 },
    { id: "3", name: "Office Fan", isOn: true, speed: 45, temperature: 26 },
  ];

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      setError("Please enter a valid API key");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsAuthenticated(true);
      setFans(mockFans);
      setIsLoading(false);
      setError("");
      setApiKey("");
    }, 1000);
  };

  const toggleFan = (id: string) => {
    setFans(
      fans.map((fan) =>
        fan.id === id ? { ...fan, isOn: !fan.isOn, speed: !fan.isOn ? 50 : 0 } : fan
      )
    );
  };

  const updateFanSpeed = (id: string, speed: number) => {
    setFans(
      fans.map((fan) => (fan.id === id ? { ...fan, speed, isOn: speed > 0 } : fan))
    );
  };

  const removeFan = (id: string) => {
    setFans(fans.filter((fan) => fan.id !== id));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setFans([]);
    setError("");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
        <Header />
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-8 backdrop-blur">
              <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-slate-400 mb-8">
                Enter your Atomberg API key to manage your smart fans
              </p>

              <form onSubmit={handleAuthenticate} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    API Key
                  </label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => {
                      setApiKey(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter your API key"
                    className="w-full px-4 py-3 bg-slate-900 text-white rounded-lg border border-slate-600 focus:border-yellow-400 focus:outline-none placeholder-slate-500 transition-colors"
                  />
                  <p className="text-xs text-slate-400 mt-2">
                    Get your API key from{" "}
                    <a
                      href="https://developer.atomberg-iot.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-400 hover:text-yellow-300"
                    >
                      Atomberg Developer
                    </a>
                  </p>
                </div>

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg flex gap-2 items-start">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 rounded-lg font-semibold hover:shadow-lg hover:shadow-yellow-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Connecting..." : "Connect"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <Header />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">My Fans</h1>
              <p className="text-slate-400">
                You have <span className="text-yellow-400 font-semibold">{fans.length}</span> smart fans connected
              </p>
            </div>
            <button
              onClick={logout}
              className="mt-4 sm:mt-0 px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Fans Grid */}
          {fans.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fans.map((fan) => (
                <div
                  key={fan.id}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 p-6 hover:border-yellow-400/50 transition-all"
                >
                  {/* Fan Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                          fan.isOn
                            ? "bg-yellow-400/20 text-yellow-400"
                            : "bg-slate-700 text-slate-400"
                        }`}
                      >
                        <Wind className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{fan.name}</h3>
                        <p className="text-xs text-slate-400">
                          {fan.isOn ? "Active" : "Inactive"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFan(fan.id)}
                      className="p-2 rounded-lg bg-slate-700/50 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Fan Status */}
                  {fan.temperature && (
                    <div className="mb-6 p-3 bg-slate-900/50 rounded-lg">
                      <p className="text-xs text-slate-400 mb-1">Temperature</p>
                      <p className="text-lg font-semibold text-white">
                        {fan.temperature}°C
                      </p>
                    </div>
                  )}

                  {/* Speed Control */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-white">Speed</p>
                      <p className="text-sm font-semibold text-yellow-400">
                        {fan.speed}%
                      </p>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={fan.speed}
                      onChange={(e) =>
                        updateFanSpeed(fan.id, parseInt(e.target.value))
                      }
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                    />
                  </div>

                  {/* Controls */}
                  <button
                    onClick={() => toggleFan(fan.id)}
                    className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                      fan.isOn
                        ? "bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg hover:shadow-red-500/30 text-white"
                        : "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:shadow-lg hover:shadow-yellow-500/50 text-slate-900"
                    }`}
                  >
                    <Power className="w-4 h-4" />
                    {fan.isOn ? "Turn Off" : "Turn On"}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed border-slate-700 rounded-xl">
              <Wind className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Fans Connected</h3>
              <p className="text-slate-400">
                Add your first fan from the Atomberg Developer portal
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
