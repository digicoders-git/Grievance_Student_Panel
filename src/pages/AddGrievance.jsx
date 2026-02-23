import { useState } from "react";
import { useNavigate } from "react-router";
import PageMeta from "../components/common/PageMeta";
import { createGrievance } from "../apis/student";
import toast from "react-hot-toast";

export default function AddGrievance() {
  const [formData, setFormData] = useState({ subject: "", description: "" });
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData();
    data.append("subject", formData.subject);
    data.append("description", formData.description);
    if (file) {
      data.append("attachment", file);
    }

    try {
      await createGrievance(data);
      toast.success("Grievance submitted successfully!");
      setTimeout(() => {
        navigate("/my-grievances");
      }, 1500);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to submit grievance",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageMeta
        title="New Grievance | Student Portal"
        description="Post a new grievance"
      />

      <div className="max-w-full mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Submit New Grievance
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Fill in the details below to raise a formal concern.
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="text-sm font-bold text-gray-500 hover:text-brand-600 transition-all flex items-center gap-1"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Go Back
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Subject
              </label>
              <input
                required
                placeholder="What is your grievance about?"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Detailed Description
              </label>
              <textarea
                required
                rows="6"
                placeholder="Briefly explain your concern in detail..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:ring-2 focus:ring-brand-500/20 outline-none transition-all resize-none"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Attachment (Optional)
              </label>
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-brand-50 file:text-brand-600 hover:file:bg-brand-100 transition-all cursor-pointer"
                />
                <p className="text-[10px] text-gray-400 italic">
                  Supported formats: JPG, PNG, PDF (Max 5MB)
                </p>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                disabled={submitting}
                type="submit"
                className="px-10 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-sm shadow-sm transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
              >
                {submitting && (
                  <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                )}
                {submitting ? "Submitting..." : "Submit Grievance"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
