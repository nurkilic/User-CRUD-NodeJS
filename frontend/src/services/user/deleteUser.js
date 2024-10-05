import axiosInstance from "../Axios";

export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

