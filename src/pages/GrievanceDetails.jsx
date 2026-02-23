import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import PageMeta from "../components/common/PageMeta";
import { fetchGrievanceDetails } from "../apis/student";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/common/Loader";

export default function GrievanceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [grievance, setGrievance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await fetchGrievanceDetails(id);
        setGrievance(data);
      } catch (error) {
        toast.error("Failed to load grievance details");
        setTimeout(() => navigate("/my-grievances"), 2000);
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader text="Loading grievance details..." size="h-10 w-10" />
      </div>
    );
  }

  if (!grievance) return null;

  return (
    <>
      <PageMeta
        title="Grievance Details | Student Portal"
        description="View grievance details"
      />

      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Grievance Details
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Full information about your submitted concern.
            </p>
          </div>
          <button
            onClick={() => navigate("/my-grievances")}
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-brand-600 transition-all"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to List
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 space-y-8">
            {/* Status + Meta Row */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 pb-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex-1">
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-1">
                  Grievance ID
                </p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  #{grievance._id.slice(-8).toUpperCase()}
                </p>
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-1">
                  Date Submitted
                </p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {new Date(grievance.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-1">
                  Deadline
                </p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {new Date(grievance.deadline).toLocaleDateString()}
                </p>
              </div>
              <div>
                <StatusBadge status={grievance.status} />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-tight">
                Subject
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {grievance.subject}
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-tight">
                Description
              </p>
              <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">
                  {grievance.description}
                </p>
              </div>
            </div>

            {/* Attachment */}
            {grievance.attachment && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-tight">
                  Attachment
                </p>
                <a
                  href={grievance.attachment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded-lg text-sm font-semibold hover:bg-brand-100 transition-all border border-brand-100 dark:border-brand-500/20"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  View Attachment
                </a>
              </div>
            )}

            {/* Handling Officer */}
            {grievance.handledBy ? (
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-tight">
                  Assigned Officer
                </p>
                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold uppercase">
                      {grievance.handledBy.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        {grievance.handledBy.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {grievance.handledBy.designation} &bull;{" "}
                        {grievance.handledBy.department}
                      </p>
                    </div>
                  </div>
                  {grievance.remarks && (
                    <div className="space-y-1">
                      <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                        Officer Remarks
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                        {grievance.remarks}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-4 bg-orange-50 dark:bg-orange-500/5 rounded-xl border border-orange-100 dark:border-orange-500/10 flex items-start gap-3">
                <svg
                  className="text-orange-500 mt-0.5 shrink-0"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-orange-800 dark:text-orange-200">
                    Awaiting Officer Assignment
                  </p>
                  <p className="text-xs text-orange-600/70 dark:text-orange-400/60 mt-0.5">
                    Your grievance is in the queue and will be assigned to an
                    officer shortly.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function StatusBadge({ status }) {
  const config = {
    Pending:
      "bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-500/10 dark:text-orange-400",
    "In Progress":
      "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400",
    Resolved:
      "bg-success-50 text-success-600 border-success-100 dark:bg-success-500/10 dark:text-success-400",
    Rejected:
      "bg-red-50 text-red-600 border-red-100 dark:bg-red-500/10 dark:text-red-400",
  };
  return (
    <span
      className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${config[status] || config["Pending"]}`}
    >
      {status}
    </span>
  );
}
