import dynamic from 'next/dynamic';
import React from 'react';

// Disable SSR for the PDFViewer component using dynamic import
const PDFViewer = dynamic(() => import('./PDFViewerClient'), {
  ssr: false, // This ensures the component is not rendered server-side
});

const PDFPage = ({ file }: { file?: File }) => {
  return (
    <main>
      <div className="container">
        {file ? (
          <PDFViewer file={file} />
        ) : (
          <div>Upload a PDF to view</div>
        )}
      </div>
    </main>
  );
};

export default PDFPage;
