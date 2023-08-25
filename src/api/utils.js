// @Time  : 2023/06/07 13:18:18
// @Author: wy

import apiClient from './api.js'

export function sshParamins(data) {
    return apiClient.post('/micro/remote/sshCommand/', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function nexusComponents() {
    return apiClient.get('/ops/nexusInfofile/')
}

export function nexusComponentPost(data) {
    return apiClient.post('/ops/nexusInfofile/', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
export function nexusMysqlScripts() {
    return apiClient.get('/ops/nexusMysqlScript/')
}

export function mysqlInstallPost(data) {
    return apiClient.post('/ops/mysqlInstall/', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
export function mysqlToslaves(data) {
    return apiClient.post('/ops/mysqlToSlave/', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function getSingleEcs() {
    return apiClient.get('/ops/getSingleEcs/')
}

export function selectSingleEcs(data) {
    return apiClient.post('/ops/selectSingleEcs/', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function addUserPost(data) {
    return apiClient.post('/ops/userAdd/', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function getUser() {
    return apiClient.get('/ops/userGet/')
}

export function aliyunEcsAssets() {
    return apiClient.get('/ops/aliyunEcsAssets/')
}

export function aliyunEcsAsset(data) {
    return apiClient.post('/ops/aliyunEcsAssets/', data, {
        headers: {
            'Content-Type': 'appliction/json'
        }
    })
}

export function getDescribeRegions() {
    return apiClient.get('/ops/getDescribeRegions/')
}

export function getDescribeVpcs() {
    return apiClient.get('/ops/aliyunEcsVpc/')
}