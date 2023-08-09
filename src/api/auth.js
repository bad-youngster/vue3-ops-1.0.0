// @Time  : 2023/06/06 13:22:51
// @Author: wy

import apiClient from './api'

export function login(username, password) {
    return apiClient.post('/micro/login/', { username, password })
}
