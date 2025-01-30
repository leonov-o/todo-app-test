import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const $api = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_SERVER_URL as string
});

$api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    config.headers["Content-Type"] = 'application/json';
    return config;
});

$api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: unknown) => {
        const axiosError = error as AxiosError;
        const originalRequest = axiosError.config as AxiosRequestConfig & { _isRetry?: boolean };
        if (axiosError.response?.status === 401 && originalRequest && !originalRequest._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get<{ access_token: string }>(
                    `${import.meta.env.VITE_SERVER_URL}/refresh`,
                    { withCredentials: true }
                );
                localStorage.setItem('token', response.data.access_token);
                return $api.request(originalRequest);
            } catch (e) {
                console.error((e as Error).message);
            }
        }
        throw axiosError;
    }
);

export default $api;
