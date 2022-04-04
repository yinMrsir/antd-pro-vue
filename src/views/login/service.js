import fetch from '@/utils/fetch';

export const userLogin = params => fetch.post('api/testUser/login', params)