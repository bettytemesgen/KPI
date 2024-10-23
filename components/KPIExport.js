// components/KPIExport.js
import { Parser } from 'json2csv';
import { jsPDF } from 'jspdf';

export default function KPIExport({ kpis }) {
  const handleExportCSV = () => {
    const fields = ['metric', 'value'];
    const parser = new Parser({ fields });
    const csv = parser.parse(kpis);

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'kpi-data.csv';
    link.click();
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('KPI Data', 10, 10);

    kpis.forEach((kpi, index) => {
      doc.text(`${kpi.metric}: ${kpi.value}`, 10, 20 + index * 10);
    });

    doc.save('kpi-data.pdf');
  };

  return (
    <div>
      <button onClick={handleExportCSV} className="mr-2 p-2 bg-blue-500 text-white rounded">Export as CSV</button>
      <button onClick={handleExportPDF} className="p-2 bg-green-500 text-white rounded">Export as PDF</button>
    </div>
  );
}
