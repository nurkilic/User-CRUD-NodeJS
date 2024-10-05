import axiosInstance from "../Axios";

export const postUser = async (newData) => {
  try {
    const response = await axiosInstance.post("user/",newData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
