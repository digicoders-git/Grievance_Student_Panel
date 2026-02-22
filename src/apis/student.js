import API from "../utils/api";

export const loginStudent = async (enrollmentNumber, password) => {
  const response = await API.post("/student/login", {
    enrollmentNumber,
    password,
  });
  return response.data;
};

export const createStudentPassword = async (newPassword) => {
  const response = await API.post("/student/create-password", {
    newPassword,
  });
  return response.data;
};

export const getStudentProfile = async () => {
  const response = await API.get("/student/profile");
  return response.data;
};

export const createGrievance = async (formData) => {
  const response = await API.post("/student/grievance/create", formData);
  return response.data;
};

export const fetchMyGrievances = async () => {
  const response = await API.get("/student/grievance/my");
  return response.data;
};

export const fetchGrievanceDetails = async (id) => {
  const response = await API.get(`/student/grievance/details/${id}`);
  return response.data;
};

export const deleteGrievance = async (id) => {
  const response = await API.delete(`/student/grievance/withdraw/${id}`);
  return response.data;
};
