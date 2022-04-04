import fetch from '@/utils/fetch';

export const userAdd = params => fetch.post('api/testUser/add', params)

export const userUpdate = params => fetch.post('api/testUser/update', params)

export const userDel = params => fetch.get('api/testUser/del', params)

export const sysRoleList = params => fetch.get('api/role/list', params)

export const getUserList = params => fetch.get('api/testUser/list', params)