function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              🌊 TaskFlow
            </h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="text-gray-700 font-medium text-sm sm:text-base">
              <span className="hidden sm:inline">Welcome, </span>{user.name}!
            </span>
            <button
              onClick={onLogout}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
