import axiosInstance from "../Axios";

export const putUser = async ({ id, updateData }) => {
  try {
    const response = await axiosInstance.put(`/user/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
