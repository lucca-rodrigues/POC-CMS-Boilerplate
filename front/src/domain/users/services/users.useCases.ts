import HttpClient from '@infra/httpRequest';

const service = new HttpClient();

export default class UsersServices {
  async get() {
    const response = await service.get(`/api/users`);

    return response;
  }

  async getById(id: string) {
    const response = await service.get(`/users/${id}`);

    return response?.data;
  }

  async create(data: any) {
    const response = await service.post(`/users`, data);

    return response;
  }

  async upload(data: any) {
    const response = await service.post(`/api/users/upload`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  }

  async delete(id: string) {
    const response = await service.delete(`/api/users/${id}`);
    return response;
  }
}
