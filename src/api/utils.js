// @Time  : 2023/06/07 13:18:18
// @Author: wy

import apiClient from './api.js'

export function aliyunAsserts() {
    return apiClient.get('/micro/aliyun/aliyunAssets/')
}

export function aliyunEcsCreates(data) {
    return apiClient.post('/micro/aliyun/aliyunEcsCreates/', data, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export function aliyunEcsRescribeRegions() {
    return apiClient.get('/micro/aliyun/aliyunEcsRescribeRegions/')
}

export function aliyunEscDescribeZonesDisk(data) {
    return apiClient.post('/micro/aliyun/aliyunEscDescribeZonesDisks/', data, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export function aliyunEcsDescribeAvailableResource(data) {
    return apiClient.post('/micro/aliyun/aliyunEcsDescribeAvailableResource/', data)
}

export function aliyunEcsDescribeImages() {
    return apiClient.get('/micro/aliyun/aliyunEcsDescribeImages/')
}

export function aliyunEcsDescribeSecurityGroups() {
    return apiClient.get('/micro/aliyun/aliyunEcsDescribeSecurityGroup/')
}

export function aliyunEcsDescribeVpcs() {
    return apiClient.get('/micro/aliyun/aliyunEcsDescribeVpcs/')
}

export function aliyunEcsDescribeVSwitches(data) {
    return apiClient.post('/micro/aliyun/aliyunEcsDescribeVSwitches/', data, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export function aliyunEcsDescribeKeyPairs() {
    return apiClient.get('/micro/aliyun/aliyunEcsDescribeKeyPairs/')
}

export function aliyunEcsDescribeTags() {
    return apiClient.get('/micro/aliyun/aliyunEcsDescribeTags/')
}

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