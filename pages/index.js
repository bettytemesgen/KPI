import ManagerView from "../components/ManagerView";
import CreateUserCard from "../components/CreateUserCard";
import KPIChart from "../components/KPIChart";
export default function Home() {
    // Sample KPI data for demonstration
    const kpisS = [
      { period: 'January', timeToFill: 5 },
      { period: 'February', timeToFill: 3 },
      { period: 'March', timeToFill: 8 },
      { period: 'April', timeToFill: 6 },
    ];
  // Sample KPI data
  const kpis = [
    {
      id: 1,
      type: 'Sales',
      period: 'Q1',
      currentValue: 75,
      targetValue: 100,
    },
    {
      id: 2,
      type: 'Customer Satisfaction',
      period: 'Q1',
      currentValue: 90,
      targetValue: 95,
    },
  ];

  return (
    <div>
      <ManagerView kpis={kpis} />
      <CreateUserCard />
      <KPIChart kpis={kpisS} />

      <h1>Welcome to the KPI Tracker!</h1>
      <p>This is the homepage of your Next.js app.</p>
    </div>
  );
}
