import apiClient from "./Base";

export const getAllMaster = async (payload: string): Promise<any> => {
  const response = await apiClient.get<any>(
    `/api/v1/master/show-all?${payload}`
  );
  return response.data;
};
export const getMasterById = async (id: string): Promise<any> => {
  const response = await apiClient.get<any>(`/api/v1/master/show-one/${id}`);
  return response.data;
};
export const createMaster = async (data: any): Promise<any> => {
  const response = await apiClient.post<any>(`/api/v1/master/create`, data);
  return response.data;
};
export const updateMaster = async (id: string, data: any): Promise<any> => {
  const response = await apiClient.put<any>(
    `/api/v1/master/update/${id}`,
    data
  );
  return response.data;
};
export const deleteMaster = async (id: string): Promise<any> => {
  const response = await apiClient.delete<any>(`/api/v1/master/delete/${id}`);
  return response.data;
};
