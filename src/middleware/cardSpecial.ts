import apiClient from "./Base";

export const checkCardSpecial = async (id: string): Promise<any> => {
  const response = await apiClient.get<any>(
    `/api/v1/card-special-user/check/${id}`
  );
  return response.data;
};
