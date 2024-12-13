import HttpClient from '@infra/httpRequest';

const API_CORE = import.meta.env.VITE_API_CORE_URL;

const service = new HttpClient(API_CORE);

export default class SignInServices {
  async signIn(data) {
    const response = await service.post(`/auth/admin`, data);

    return response?.data;
  }
}
