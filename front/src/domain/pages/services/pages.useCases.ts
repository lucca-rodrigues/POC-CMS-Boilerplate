import HttpClient from "@infra/httpRequest";

const service = new HttpClient();

export default class PagesServices {
  async get() {
    const response = await service.get(`/pages`);

    return response?.data;
  }

  async getById(id: string) {
    const response = await service.get(`/pages/${id}`);

    return response?.data;
  }

  async create(data: any) {
    const response = await service.post(
      `/pages`,
      data
    );

    return response?.data;
  }
}
