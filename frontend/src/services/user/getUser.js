import axiosInstance from "../Axios";

export const getUser = async () => {
  try {
    const response = await axiosInstance.get("user/");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
