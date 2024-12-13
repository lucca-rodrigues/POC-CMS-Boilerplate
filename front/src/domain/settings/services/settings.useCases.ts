import HttpClient from "@infra/httpRequest";

const service = new HttpClient();

export default class SettingsServices {
  async get() {
    const response = await service.get(`/settings`);

    return response?.data;
  }

  async getById(id: string) {
    const response = await service.get(`/settings/${id}`);

    return response?.data;
  }

  async create(data: any) {
    const response = await service.post(
      `/settings`,
      data
    );

    return response?.data;
  }
}
