/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpClient from '@infra/httpRequest';

const service = new HttpClient();

export default class FilesServices {
  async get() {
    const response = await service.get(`/api/files`);
    return response;
  }

  async create(data: any) {
    const response = await service.post(`/api/files`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  }

  async delete(fileName: string) {
    const response = await service.delete(`/api/files/${fileName}`);
    return response;
  }
}
