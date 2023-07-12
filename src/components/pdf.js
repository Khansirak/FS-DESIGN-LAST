import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFPreview = () => {
  const [pdfData, setPdfData] = useState(null);

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.text('Hello, this first a PDF file!', 10, 10);

   const pdfDataUri = doc.output('datauristring');
    setPdfData(pdfDataUri);
    
  };

const forsubmit = () =>{
    doc.save('generated-pdf.pdf');

};


  return (
    <div>
      <h1>PDF Preview</h1>
      <button onClick={handleGeneratePDF}>Preview the pdf</button>
      {pdfData && (
        <div>
         
          <Document file={pdfData} onLoadError={(error) => console.log('Error', error)}>
            <Page pageNumber={1} />
          </Document>
        </div>
      )}
    </div>
  );
};

export default PDFPreview;