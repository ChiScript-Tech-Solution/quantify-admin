import axios from "axios";

export const apiUrl = process.env.REACT_APP_BASE_URL;

export const publicRequest = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const userRequest = axios.create({
  baseURL: apiUrl,
});

let accessToken = JSON.parse(localStorage.getItem("user"))?.token;
let refreshNewAccessToken = JSON.parse(localStorage.getItem("user"))?.refreshToken;

export const setAuthToken = (token) => {
  accessToken = token;
  userRequest.defaults.headers.Authorization = `Bearer ${token}`;
};

userRequest.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

userRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
          setAuthToken(newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } else if (refreshNewAccessToken) {
          setAuthToken(refreshNewAccessToken);

          originalRequest.headers.Authorization = `Bearer ${refreshNewAccessToken}`;
          return axios(originalRequest);
        } else {
          handleTokenRefreshError();
          return Promise.reject(error);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        handleTokenRefreshError();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


async function refreshAccessToken() {
  return null;
}


const handleTokenRefreshError = () => {
  localStorage.clear();
  window.location.href = "/";
};
