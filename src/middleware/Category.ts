import apiClient from "./Base";

export const getAllCategory = async (payload: string): Promise<any> => {
  const response = await apiClient.get<any>(
    `/api/v1/category/show-all?${payload}`
  );
  return response.data;
};
export const getCategoryById = async (id: string): Promise<any> => {
  const response = await apiClient.get<any>(`/api/v1/category/show-one/${id}`);
  return response.data;
};
export const createCategory = async (data: any): Promise<any> => {
  const response = await apiClient.post<any>(`/api/v1/category/create`, data);
  return response.data;
};
export const updateCategory = async (id: string, data: any): Promise<any> => {
  const response = await apiClient.put<any>(
    `/api/v1/category/update/${id}`,
    data
  );
  return response.data;
};
export const deleteCategory = async (id: string): Promise<any> => {
  const response = await apiClient.delete<any>(`/api/v1/category/delete/${id}`);
  return response.data;
};
