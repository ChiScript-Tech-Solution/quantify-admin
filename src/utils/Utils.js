import { message } from "antd";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import * as XLSX from 'xlsx';


// a custom function to copy text
export const handleCopyClick = (copyId) => {
  navigator.clipboard.writeText(copyId);
  message.success("Copied Successfully");
};

// a custom function to handle multiple tabs
export const renderSegmentedTab = (component) => {
  if (component) {
    return component;
  }
  return null;
};


export const formatDateAndTime = (created_at) => {
  const dateObj = new Date(created_at);
  const hours = ('0' + dateObj.getHours()).slice(-2);
  const minutes = ('0' + dateObj.getMinutes()).slice(-2);
  const day = ('0' + dateObj.getDate()).slice(-2);
  const month = ('0' + (dateObj.getMonth() + 1)).slice(-2); 
  const year = dateObj.getFullYear().toString().slice(-2);

  return `${hours}:${minutes} ${month}/${day}/${year}`;
}



// a custom function to format amount
export const formatAmount = (amount) => {
  amount = Number(amount);
  if (isNaN(amount)) {
    return "0";
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
};




// custom pdf export function
export const exportToPDF = (tableData, pdfTitle, columns, layout = 'portrait') => {
  const pdf = new jsPDF({
    orientation: layout,
  });

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];

  const pdfColumns = columns.map((column) => ({
    header: column.title,
    dataKey: column.dataIndex,
  }));

  const pdfData = tableData.map((row) =>
    columns.reduce((rowData, column) => {
      rowData[column.dataIndex] = row[column.dataIndex];
      return rowData;
    }, {})
  );

  const title = `Quantify -------  ${pdfTitle}  ------- ${formattedDate}`;
  const xTitle = 10;
  const yTitle = 10;

  pdf.setFontSize(16);
  pdf.text(xTitle, yTitle, title);

  pdf.autoTable({
    columns: pdfColumns,
    body: pdfData,
    startY: 20,
  });

  pdf.save(`${pdfTitle.toLowerCase().replace(/\s/g, '_')}.pdf`);
};



export const exportToExcel = (tableData, excelTitle, columns) => {
  const workbook = XLSX.utils.book_new();

  const excelColumns = columns.map((column) => ({ header: column.title, dataKey: column.dataIndex }));

  const excelData = tableData.map((row) =>
    columns.reduce((rowData, column) => {
      rowData[column.dataIndex] = row[column.dataIndex];
      return rowData;
    }, {})
  );

  const worksheet = XLSX.utils.json_to_sheet(excelData, { header: excelColumns });

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

  try {
    const blob = XLSX.write(workbook, { bookType: 'xlsx', type: 'blob' });

    if (!blob) {
      console.error('Blob is null or undefined.');
      return;
    }

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${excelTitle}.xlsx`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error while generating Excel:', error);
  }
};







