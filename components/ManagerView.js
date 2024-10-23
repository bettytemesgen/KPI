import ProgressBar from './ProgressBar';

export default function ManagerView({ kpis }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Team KPIs</h2>
      <div className="space-y-4">
        {kpis.map((kpi) => (
          <div key={kpi.id} className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <p className="text-gray-600 dark:text-gray-300">
              {kpi.period} {kpi.type}: {kpi.currentValue} / {kpi.targetValue}
            </p>
            <ProgressBar value={(kpi.currentValue / kpi.targetValue) * 100} label={kpi.type} />
          </div>
        ))}
      </div>
    </div>
  );
}
