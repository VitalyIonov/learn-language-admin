import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

import { getHeaders } from "~/lib/apiClient/helpers/getHeaders";
import { type ApiClientConfig } from "~/lib/apiClient/types/ApiClient";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: getHeaders(),
});

let defaultApiClientConfig: ApiClientConfig = {
  customOptions: {},
};

async function request<ResponseData, RequestData = never>(
  axiosConfig: AxiosRequestConfig<RequestData>,
) {
  const preparedAxiosConfig = { ...axiosConfig };

  try {
    return await axiosClient.request<ResponseData, AxiosResponse<ResponseData>>(
      preparedAxiosConfig,
    );
  } catch (error) {
    throw error;
  }
}

async function get<ResponseData>(url: string, params?: URLSearchParams) {
  return await request<ResponseData>({
    method: "GET",
    params,
    url,
  });
}

async function destroy<ResponseData>(url: string, params?: URLSearchParams) {
  return await request<ResponseData>({
    method: "DELETE",
    params,
    url,
  });
}

async function post<ResponseData, RequestData>(url: string, data: RequestData) {
  return await request<ResponseData, RequestData>({
    method: "POST",
    data,
    url,
  });
}

async function put<ResponseData, RequestData>(url: string, data: RequestData) {
  return await request<ResponseData, RequestData>({
    method: "PUT",
    data,
    url,
  });
}

async function patch<ResponseData, RequestData>(
  url: string,
  data: RequestData,
) {
  return await request<ResponseData, RequestData>({
    method: "PATCH",
    data,
    url,
  });
}

export const apiClient = {
  init: (config: Partial<ApiClientConfig>) => {
    defaultApiClientConfig = { ...defaultApiClientConfig, ...config };
  },
  get,
  post,
  put,
  patch,
  delete: destroy,
};
