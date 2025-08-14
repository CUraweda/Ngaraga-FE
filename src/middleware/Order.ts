import apiClient from "./Base";

export const getAllOrder = async (payload: string): Promise<any> => {
  const response = await apiClient.get<any>(
    `/api/v1/transaction/show-all?${payload}`
  );
  return response.data;
};

export const deleteData = async (id: any): Promise<any> => {
  await apiClient.delete<any>(`/api/v1/transaction/delete/${id}`);
};

export const getDetailOrder = async (id: any): Promise<any> => {
  const response = await apiClient.get(`/api/v1/transaction/show-one/${id}`);
  return response.data;
};

export const printData = async (id: string) => {
  const response = await apiClient.get(`/api/v1/transaction/download/${id}`, {
    responseType: "blob",
  });

  const fileURL = window.URL.createObjectURL(response.data);
  const link = document.createElement("a");
  link.href = fileURL;
  link.setAttribute("download", `order-${id}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(fileURL);
};
