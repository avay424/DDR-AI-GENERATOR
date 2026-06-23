


function ReportViewer({
  report,
  pdfUrl
}) {

  if (!report) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Generated DDR Report
        </h2>

        {pdfUrl && (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-black text-white px-5 py-3 rounded-lg"
          >
            Download PDF
          </a>
        )}

      </div>

      <div className="border rounded-lg p-5 bg-gray-50">

        <pre className="whitespace-pre-wrap text-sm">
          {report}
        </pre>

      </div>

    </div>
  );
}

export default ReportViewer;