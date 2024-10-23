// components/KPIExport.js
import { Parser } from 'json2csv';
import { jsPDF } from 'jspdf';

export default function KPIExport({ kpis }) {
  const handleExportCSV = () => {
    const fields = ['metric', 'value'];
