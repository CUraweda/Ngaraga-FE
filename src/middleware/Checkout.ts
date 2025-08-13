import apiClient from "./Base";

export const createCheckoutNewUser = async (payload: string): Promise<any> => {
  const response = await apiClient.get<any>(
    `/api/v1/transaction/create${payload}`
  );
  return response.data;
};
