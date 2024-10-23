// components/Navbar.js

import Link from 'next/link';
import { useRouter } from 'next/router';
import UserProfile from './UserProfile'; // Ensure to import UserProfile component

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="backdrop-blur-xs bg-glass p-4 border-b border-glass shadow-neon">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-neonGreen text-2xl font-bold tracking-wide">
            KPI Tracker
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <UserProfile /> {/* User profile component */}
          <button
            onClick={() => {
              sessionStorage.clear();
              router.push('/login');
            }}
            className="bg-neonPink text-white px-4 py-2 rounded-md shadow-neon hover:bg-neonPink/80 transition-transform transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
