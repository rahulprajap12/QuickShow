import { LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'

const AdminNavibar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Logout logic (Clerk signOut or redirect)
    navigate('/')
  }

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white border-b border-gray-700 h-16">
      <Link to="/" className="flex items-center gap-2">
        <img src={assets.logo} alt="Logo" className="w-32 h-auto" />
      </Link>

      <div className="flex items-center gap-4">
        <span className="text-gray-400 text-sm hidden sm:block">Admin Panel</span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 transition text-white text-sm px-4 py-2 rounded-lg"
        >
          <LogOut size={16} />
          <span className="hidden sm:block">Exit Admin</span>
        </button>
      </div>
    </div>
  )
}

export default AdminNavibar
