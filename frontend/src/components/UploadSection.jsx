


import { useState } from "react";
import api from "../api/axios";
import Loading from "./Loading";
import ReportViewer from "./ReportViewer";

function UploadSection() {

  const [inspection, setInspection] =
    useState(null);

  const [thermal, setThermal] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [report, setReport] =
    useState("");

  const [pdfUrl, setPdfUrl] =
    useState("");

  const handleSubmit =
    async () => {

      if (!inspection || !thermal) {
        alert(
          "Please upload both PDFs"
        );
        return;
      }

      try {

        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "inspection",
          inspection
        );

        formData.append(
          "thermal",
          thermal
        );

        const response =
          await api.post(
            "/report/generate",
            formData
          );

        setReport(
          response.data.report
        );

        setPdfUrl(
          response.data.pdfUrl
        );

      } catch (error) {

        console.log(error);

        alert(
          "Error generating report"
        );

      } finally {

        setLoading(false);

      }
    };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-3xl font-bold mb-8 text-center">
          Upload Reports
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="border rounded-xl p-6">

            <h3 className="font-semibold mb-3">
              Inspection Report
            </h3>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setInspection(
                  e.target.files[0]
                )
              }
            />

          </div>

          <div className="border rounded-xl p-6">

            <h3 className="font-semibold mb-3">
              Thermal Report
            </h3>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setThermal(
                  e.target.files[0]
                )
              }
            />

          </div>

        </div>

        <div className="text-center mt-8">

          <button
            onClick={handleSubmit}
            className="bg-black text-white px-8 py-3 rounded-lg"
          >
            Generate DDR
          </button>

        </div>

      </div>

      {loading && <Loading />}

      <ReportViewer
        report={report}
        pdfUrl={pdfUrl}
      />
    </>
  );
}

export default UploadSection;