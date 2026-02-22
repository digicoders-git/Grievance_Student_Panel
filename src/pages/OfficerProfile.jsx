import { useLocation, useNavigate } from "react-router";
import PageMeta from "../components/common/PageMeta";

export default function OfficerProfile() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const officer = state?.officer;

  if (!officer) {
    navigate(-1);
    return null;
  }

  return (
    <>
      <PageMeta
        title="Officer Profile | Student Portal"
        description="View grievance officer details"
      />

      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Officer Profile
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Details of the officer handling your grievance.
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
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

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 space-y-8">
            {/* Officer Identity */}
            <div className="flex items-center gap-4 pb-6 border-b border-gray-100 dark:border-gray-700">
              <div className="w-14 h-14 rounded-full bg-brand-500 flex items-center justify-center text-white text-xl font-bold uppercase shrink-0">
                {officer.name?.charAt(0)}
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {officer.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Grievance Officer
                </p>
              </div>
            </div>

            {/* Designation */}
            {officer.designation && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-tight">
                  Designation
                </p>
                <p className="text-base font-semibold text-gray-900 dark:text-white">
                  {officer.designation}
                </p>
              </div>
            )}

            {/* Department */}
            {officer.department && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-tight">
                  Department
                </p>
                <p className="text-base font-semibold text-gray-900 dark:text-white">
                  {officer.department}
                </p>
              </div>
            )}

            {/* Info Note */}
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
                  Assigned to Your Grievance
                </p>
                <p className="text-xs text-orange-600/70 dark:text-orange-400/60 mt-0.5">
                  This officer is responsible for reviewing and resolving your
                  concern. Track the progress from the grievance details page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
