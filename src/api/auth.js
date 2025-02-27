import axiosInstance from "./axiosConfig";

const handleLogin = async ({ phone, password }) => {
  try {
    const response = await axiosInstance.post("doctors/login", {
      phone,
      password,
    });
    return response;
  } catch (error) {
    console.error("LOGIN ERROR", error);
  }
};

const handleRegister = async ({ name, phone, password }) => {
  try {
    const response = await axiosInstance.post("doctors/register", {
      name,
      phone,
      password,
    });
    return response;
  } catch (error) {
    console.error("LOGIN ERROR", error);
  }
};

const handleSyncFacilities = async ({ id, phone, password }) => {
  try {
    const response = await axiosInstance.post(`doctors/sync-facilities/${id}`, {
      phone,
      password,
    });
    return response;
  } catch (error) {
    console.error("SYNC FACILITIES ERROR", error);
  }
};

export { handleRegister, handleLogin, handleSyncFacilities };
