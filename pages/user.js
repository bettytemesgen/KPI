// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import {
//   FaBriefcase,
//   FaHandHoldingUsd,
//   FaClock,
//   FaTachometerAlt,
//   FaUsers,
//   FaCheckCircle,
//   FaFileSignature,
//   FaSmile,
//   FaUserCheck,
//   FaDollarSign,
//   FaUsersCog
// } from 'react-icons/fa';
// import Image from 'next/image';
// import PieChart from '../components/PieChart'; // Import PieChart component
// import KPIChart from "../components/KPIChart";
// import UserProfile from '../components/UserProfile';
// import { Container, Button } from '@mui/material';

// export default function RecruitersDashboard() {
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   // Fetch user data when component mounts
//   useEffect(() => {
//     const storedUserId = sessionStorage.getItem('userId');
//     const storedUserRole = sessionStorage.getItem('userRole');

//     if (!storedUserId || !storedUserRole) {
//       router.push('/login');
//       return;
//     }

//     axios.get(`/api/users/${storedUserId}`)
//       .then((response) => {
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//         setLoading(false);
//       });

//     // Ensure loading state clears after 5 seconds if no response
//     const timeout = setTimeout(() => setLoading(false), 5000);
//     return () => clearTimeout(timeout);
//   }, [router]);

//   // Handle user logout
//   const handleLogout = () => {
//     sessionStorage.clear();
//     router.push('/login');
//   };

//   // Define chart data and labels before using them in JSX
//   const chartData = [30, 20, 50]; // Example chart data for PieChart
//   const chartLabels = ['Candidates', 'Positions Filled', 'Offers Made']; // Example labels for the PieChart
//   const chartBackgroundColors = ['#36A2EB', '#FF6384', '#FFCE56']; // Background colors for PieChart
//   const chartBorderColors = ['#36A2EB', '#FF6384', '#FFCE56']; // Border colors for PieChart

//   if (loading) {
//     return (
//       <Container className="min-h-screen bg-gray-900 text-white font-sans" maxWidth="lg">
//       </Container>
//     );
//   }

//   return (
//     <div>
//       <div className="dashboard flex h-screen">
//         {/* Sidebar Navigation */}
//         <nav className="sidebar text-white w-64 p-5 shadow-lg flex flex-col justify-between h-full">
//           <div className="logo mb-5 text-center">
//             <Image src="/images/yes.png" alt="YesCompany Logo" width={128} height={64} />
//           </div>

//           <ul className="list-none p-0">
//             <li className="mb-3">
//               <a href="/dashboard" className="flex items-center p-2 hover:bg-gray-700">
//                 <FaTachometerAlt className="mr-2 ml-2" /> Dashboard
//               </a>
//             </li>
//             <li className="mb-3">
//               <a href="/candidates-interviewed" className="flex items-center p-2 hover:bg-gray-700">
//                 <FaUsers className="mr-2" /> Candidates Interviewed
//               </a>
//             </li>
//             <li className="mb-3">
//               <a href="/positions-filled" className="flex items-center p-2 hover:bg-gray-700">
//                 <FaCheckCircle className="mr-4" /> Positions Filled
//               </a>
//             </li>
//             <li className="mb-3">
//               <a href="/offers-made" className="flex items-center p-2 hover:bg-gray-700">
//                 <FaFileSignature className="mr-2" /> Offers Made
//               </a>
//             </li>
//             <li className="mb-3">
//               <a href="/client-satisfaction" className="flex items-center p-2 hover:bg-gray-700">
//                 <FaSmile className="mr-2" /> Client Satisfaction
//               </a>
//             </li>
//             <li className="mb-3">
//               <a href="/candidate-satisfaction" className="flex items-center p-2 hover:bg-gray-700">
//                 <FaUserCheck className="mr-2" /> Candidate Satisfaction
//               </a>
//             </li>
//             <li className="mb-3">
//               <a href="/average-time-to-fill" className="flex items-center p-2 hover:bg-gray-700">
//                 <FaClock className="mr-2" /> Average Time to Fill
//               </a>
//             </li>
//             <li className="mb-3">
//               <a href="/cost-per-hire" className="flex items-center p-2 hover:bg-gray-700">
//                 <FaDollarSign className="mr-2" /> Cost Per Hire
//               </a>
//             </li>
//             <li className="mb-3">
//               <a href="/competitors" className="flex items-center p-2 hover:bg-gray-700">
//                 <FaUsersCog className="mr-2" /> Recruiter Competitors
//               </a>
//             </li>
//           </ul>
//           <div className="footer mt-auto">
//             <a href="/settings" className="block p-2 hover:bg-gray-700 mb-2 text-center">Settings</a>
//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={handleLogout}
//               className="w-full"
//             >
//               LOGOUT
//             </Button>
//           </div>
//         </nav>
//         {/* Main Dashboard */}
//         <main className="dashboard-main flex-1 p-5 bg-gray-200 relative">
//           <aside className="user-profile-container w-64 p-5 shadow-lg h-full fixed right-0 top-0"
//             style={{ background: '#f6f1f1', margin: '-2rem', paddingLeft: '67rem' }}>
//             <UserProfile />
//           </aside>
//           <section className="stats-container">
//             <div className="stat-card candidates p-5 text-gray-700 rounded shadow-lg">
//               <FaUsers className="icon text-green-500" size={24} />
//               <div>
//                 <h2 className="text-lg font-semibold text-left">Candidates Interviewed</h2>
//                 <p className="text-3xl font-bold text-left">75 Candidates </p>
//               </div>
//             </div>
//             <div className="stat-card positions p-5 text-gray-700 rounded shadow-lg">
//               <FaBriefcase className="icon text-blue-500" size={24} />
//               <div>
//                 <h2 className="text-lg font-semibold text-left">Positions Filled</h2>
//                 <p className="text-3xl font-bold text-left">20 Positions</p>
//               </div>
//             </div>
//             <div className="stat-card offers p-5 text-gray-700 rounded shadow-lg">
//               <FaCheckCircle className="icon text-yellow-500" size={24} />
//               <div>
//                 <h2 className="text-lg font-semibold text-left">Offers Made</h2>
//                 <p className="text-3xl font-bold text-left">15 Offers</p>
//               </div>
//             </div>
//             <div className="stat-card time-saved p-5 text-gray-700 rounded shadow-lg">
//               <FaClock className="icon text-red-500" size={24} />
//               <div>
//                 <h2 className="text-lg font-semibold text-left">Time Saved</h2>
//                 <p className="text-3xl font-bold text-left">30 hours</p>
//               </div>
//             </div>
//           </section>

//           <div className="charts-container flex">
//             <div className="chart-card bg-white p-5 shadow rounded flex-1 mr-4">
//               <PieChart
//                 data={chartData}
//                 labels={chartLabels}
//                 backgroundColors={chartBackgroundColors}
//                 borderColors={chartBorderColors}
//               />
//             </div>
//             <div className="kpi-export-container bg-white p-5 shadow rounded w-1/3">
//               <KPIChart />
//             </div>
//           </div>
//         </main>
//       </div>
//       <footer className="custom-footer py-4">
//         <h4 className="text-center text-sm text-white">Design and Developed by Yes Team</h4>
//       </footer>
//     </div>
//   );
// }
