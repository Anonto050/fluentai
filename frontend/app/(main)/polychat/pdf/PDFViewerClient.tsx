import { Document, Page, pdfjs } from 'react-pdf';
import { useState, useEffect, useRef } from 'react';

// Load the worker from a CDN or local public directory
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

const PDFViewerClient = ({ file }: { file: File }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const pageContainerRef = useRef<HTMLDivElement>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const container = event.currentTarget;
    const scrollTop = container.scrollTop;
    const clientHeight = container.clientHeight;
    const scrollHeight = container.scrollHeight;

    // Scroll to next page
    if (scrollTop + clientHeight >= scrollHeight * 0.9 && pageNumber < (numPages || 1)) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }

    // Scroll to previous page
    if (scrollTop <= scrollHeight * 0.1 && pageNumber > 1) {
      setPageNumber((prevPageNumber) => prevPageNumber - 1);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown' && pageNumber < (numPages || 1)) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }

    if (event.key === 'ArrowUp' && pageNumber > 1) {
      setPageNumber((prevPageNumber) => prevPageNumber - 1);
    }
  };

  useEffect(() => {
    // Add event listener for keyboard navigation
    window.addEventListener('keydown', handleKeyDown);

    // Clean up event listener when component is unmounted
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [pageNumber, numPages]);

  useEffect(() => {
    // When the page number changes, scroll to the top of the container
    if (pageContainerRef.current) {
      pageContainerRef.current.scrollTop = 0;
    }
  }, [pageNumber]);

  return (
    <>
      <div className="text-center rounded-3xl my-2 z-50 absolute bottom-0 right-4 bg-blue-600 text-white py-1 px-4">
        {pageNumber}/{numPages}
      </div>
      <div
        className="h-[300px] md:h-full overflow-y-scroll"
        onScroll={handleScroll}
        ref={pageContainerRef}
      >
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          className="pdf-document"
        >
          <Page
            pageNumber={pageNumber}
            className="pdf-page"
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        </Document>
      </div>
    </>
  );
};

export default PDFViewerClient;
