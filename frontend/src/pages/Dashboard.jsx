


import UploadSection from "../components/UploadSection";

function Dashboard() {

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="bg-black text-white p-6">

        <h1 className="text-4xl font-bold">
          AI DDR Generator
        </h1>

        <p className="mt-2">
          Detailed Diagnostic Report using
          Inspection & Thermal Analysis
        </p>

      </div>

      <div className="max-w-6xl mx-auto p-8">

        <div className="grid md:grid-cols-3 gap-5 mb-8">

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-bold">
              Inspection Analysis
            </h3>
            <p className="text-gray-600">
              Extract building defects
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-bold">
              Thermal Analysis
            </h3>
            <p className="text-gray-600">
              Detect hidden anomalies
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-bold">
              AI DDR Report
            </h3>
            <p className="text-gray-600">
              Generate final diagnostics
            </p>
          </div>

        </div>

        <UploadSection />

      </div>

    </div>
  );
}

export default Dashboard;