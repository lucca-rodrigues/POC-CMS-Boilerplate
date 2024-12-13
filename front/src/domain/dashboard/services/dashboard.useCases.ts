import HttpClient from "@infra/httpRequest";

const service = new HttpClient();

export default class DashboardServices {
  async get() {
    const response = await service.get(`/dashboard`);

    return response?.data;
  }

  async getById(id: string) {
    const response = await service.get(`/dashboard/${id}`);

    return response?.data;
  }

  async create(data: any) {
    const response = await service.post(
      `/dashboard`,
      data
    );

    return response?.data;
  }
}
