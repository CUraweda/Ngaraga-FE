import apiClient from "./Base";

export const getAllSeries = async (payload: string): Promise<any> => {
  const response = await apiClient.get<any>(
    `/api/v1/series/show-all?${payload}`
  );
  return response.data;
};
export const getSeriesById = async (id: string): Promise<any> => {
  const response = await apiClient.get<any>(`/api/v1/series/show-one/${id}`);
  return response.data;
};
export const createSeries = async (data: any): Promise<any> => {
  const response = await apiClient.post<any>(`/api/v1/series/create`, data);
  return response.data;
};
export const updateSeries = async (id: string, data: any): Promise<any> => {
  const response = await apiClient.put<any>(
    `/api/v1/series/update/${id}`,
    data
  );
  return response.data;
};
export const deleteSeries = async (id: string): Promise<any> => {
  const response = await apiClient.delete<any>(`/api/v1/series/delete/${id}`);
  return response.data;
};
