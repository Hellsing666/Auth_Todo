import axios from "axios";
import Navbar from "../components/Navbar";
import Todos from "../components/Todos";
import { Link } from "react-router-dom";

function Home({ user, setUser }) {
  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            🌊 Welcome to TaskFlow
          </h1>
          <p className="text-gray-600 mb-8">
            Please login or register to manage your tasks effectively
          </p>
          <div className="space-y-3">
            <Link
              to="/login"
              className="block w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block w-full px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg border-2 border-indigo-500 hover:bg-indigo-50 transition-all duration-200"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <Navbar user={user} onLogout={handleLogout} />
      <Todos />
    </div>
  );
}

export default Home;
