import ProgressBar from './ProgressBar';
import KPIChart from './KPIChart';

export default function RecruiterView({ kpis }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your KPIs</h2>
      {kpis.length === 0 ? (
        <p>No KPIs available.</p>
      ) : (
        kpis.map((kpi) => (
          <div key={kpi.id} className="mb-4">
            <p>
              {kpi.period} {kpi.type}: {kpi.currentValue} / {kpi.targetValue}
            </p>
            <ProgressBar value={kpi.targetValue ? (kpi.currentValue / kpi.targetValue) * 100 : 0} label={kpi.type} />
          </div>
        ))
      )}
      <KPIChart kpis={kpis} />
    </div>
  );
}
