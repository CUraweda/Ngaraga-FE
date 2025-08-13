import apiClient from "./Base";

export const getAllOrder = async (payload: string): Promise<any> => {
  const response = await apiClient.get<any>(
    `/api/v1/transaction/show-all?${payload}`
  );
  return response.data;
};
