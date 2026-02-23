import { useState, useEffect } from "react";
import PageMeta from "../components/common/PageMeta";
import { useAuth } from "../context/AuthContext";
import { getStudentProfile } from "../apis/student";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/common/Loader";

export default function Profile() {
  const { updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await getStudentProfile();
        setProfileData(data);
        updateProfile(data);
      } catch (error) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [updateProfile]);

  if (loading)
    return (
      <div className="flex items-center justify-center p-12">
        <div className="w-8 h-8 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin"></div>
      </div>
    );

  if (!profileData)
    return (
      <div className="p-8 text-center text-gray-500">
        No profile data found.
      </div>
    );

  return (
    <>
      <PageMeta
        title="Profile | Student Portal"
        description="Student Profile details"
      />

      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Student Profile
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your account and view your student details
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 space-y-8">
            {/* Header info */}
            <div className="flex flex-col md:flex-row items-center gap-6 pb-8 border-b border-gray-100 dark:border-gray-700">
              <div className="w-20 h-20 rounded-full bg-brand-500 flex items-center justify-center text-white text-2xl font-bold uppercase transition-transform hover:scale-105">
                {profileData.name?.charAt(0)}
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {profileData.name}
                </h3>
                <p className="text-gray-500 text-sm">
                  Enrollment No: {profileData.enrollmentNumber}
                </p>
              </div>
            </div>

            {/* Grid for student details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <DetailItem label="Full Name" value={profileData.name} />
              <DetailItem label="Email Address" value={profileData.email} />
              <DetailItem label="Mobile Number" value={profileData.mobile} />
              <DetailItem
                label="Branch / Department"
                value={profileData.branch}
              />
              <DetailItem
                label="Current Year"
                value={profileData.year ? `${profileData.year} Year` : "N/A"}
              />
              <DetailItem
                label="College / Institute"
                value={profileData.college}
              />
              <DetailItem label="Date of Birth" value={profileData.dob} />
            </div>

            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                <span className="font-bold">Note:</span> These details are
                synchronized with the university records. For any corrections,
                please contact the administrative office.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="space-y-1">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-tight">
        {label}
      </span>
      <p className="text-sm font-medium text-gray-900 dark:text-white">
        {value || "N/A"}
      </p>
    </div>
  );
}
