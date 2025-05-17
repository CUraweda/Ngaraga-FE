import apiClient from "./Base";

export const getAll = async (payload: string): Promise<any> => {
  const response = await apiClient.get<any>(
    `/api/v1/card-list/show-all?${payload}`
  );
  return response.data;
};
export const getById = async (id: string): Promise<any> => {
  const response = await apiClient.get<any>(`/api/v1/card/show-one/${id}`);
  return response.data;
};
export const updateCard = async (id: string, data: any): Promise<any> => {
  const response = await apiClient.put<any>(
    `/api/v1/card-list/update/${id}`,
    data
  );
  return response.data;
};
export const updateStock = async (id: string, data: any): Promise<any> => {
  const response = await apiClient.put<any>(
    `/api/v1/card-list/update/${id}`,
    data
  );
  return response.data;
};
export const deleteCard = async (id: string): Promise<any> => {
  const response = await apiClient.delete<any>(`/api/v1/card-list/delete/${id}`);
  return response.data;
};

