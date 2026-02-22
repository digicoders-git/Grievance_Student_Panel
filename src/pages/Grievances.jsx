import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import PageMeta from "../components/common/PageMeta";
import { fetchMyGrievances, deleteGrievance } from "../apis/student";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/common/Loader";

export default function Grievances() {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadGrievances = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchMyGrievances();
      setGrievances(data || []);
    } catch (error) {
      toast.error("Failed to fetch grievances");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGrievances();
  }, [loadGrievances]);

  const handleWithdraw = async (id) => {
    if (!window.confirm("Are you sure you want to withdraw this grievance?"))
      return;

    try {
      await deleteGrievance(id);
      toast.success("Grievance withdrawn successfully");
      loadGrievances();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to withdraw");
    }
  };

  return (
    <>
      <PageMeta
        title="My Grievances | Student Portal"
        description="Track your submitted grievances"
      />

      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              My Grievances
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Check the status and details of your submitted concerns.
            </p>
          </div>
          <button
            onClick={() => navigate("/add-grievance")}
            className="flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-bold transition-all shadow-sm active:scale-95"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            New Grievance
          </button>
        </div>

        {/* List Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Grievance List
            </h2>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Handled By
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <Loader text="Syncing grievances..." size="h-8 w-8" />
                    </td>
                  </tr>
                ) : grievances.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No grievances submitted yet.
                    </td>
                  </tr>
                ) : (
                  grievances.map((g) => (
                    <tr
                      key={g._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/10 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-brand-600">
                            {g.subject}
                          </span>
                          <span className="text-[10px] text-gray-400 font-medium mt-0.5">
                            ID: #{g._id.slice(-6).toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={g.status} />
                      </td>
                      <td className="px-6 py-4">
                        {g.handledBy ? (
                          <button
                            onClick={() =>
                              navigate("/officer-profile", {
                                state: { officer: g.handledBy },
                              })
                            }
                            className="flex items-center gap-2 group/officer"
                            title="View officer profile"
                          >
                            {/* Avatar */}
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-black shrink-0">
                              {g.handledBy.name?.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm font-semibold text-brand-600 dark:text-brand-400 group-hover/officer:underline underline-offset-2 truncate max-w-[120px]">
                              {g.handledBy.name}
                            </span>
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400 italic">
                            Not assigned
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {new Date(g.deadline).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => navigate(`/grievance/${g._id}`)}
                            className="text-brand-600 hover:text-brand-700 text-xs font-bold"
                          >
                            Details
                          </button>
                          {g.status === "Pending" && (
                            <button
                              onClick={() => handleWithdraw(g._id)}
                              className="px-2 py-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                              title="Withdraw"
                            >
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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
      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${config[status] || config["Pending"]}`}
    >
      {status}
    </span>
  );
}
