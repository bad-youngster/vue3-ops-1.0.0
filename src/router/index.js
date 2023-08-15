// @Time  : 2023/06/05 16:33:09
// @Author: wy

import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home.vue'
import Login from '@/views/login.vue'
import Register from '@/views/register.vue'
import AliyunAssets from '@/views/aliyunassets.vue'
import NavPages from '@/components/NavPages.vue'
import sshParamin from '@/views/sshParamin.vue'
import mysqlInstall from '@/views/mysqlInstalls.vue'
import addUser from '@/views/addUsers.vue'
import account from '@/views/accounts.vue'
import testAsset from '@/views/testAssets.vue'
import manualTask from '@/views/manualTasks.vue'
import seven from '@/views/7.vue'
import eight from '@/views/8.vue'
import nine from '@/views/9.vue'
import zero from '@/views/a.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: 'home',
        component: NavPages,
        children: [
            {
                path: 'home',
                name: 'Zero',
                component: Home,
            },
            {
                path: 'sshparamin',
                name: 'SshParamin',
                component: sshParamin,
            },
            {
                path: 'aliyunAssets',
                name: 'AliyunAssets',
                component: AliyunAssets
            },
            {
                path: 'testAsset',
                name: 'TestAsset',
                component: testAsset
            },
            {
                path: 'mysqlInstall',
                name: 'MysqlInstall',
                component: mysqlInstall
            },
            {
                path: 'manualTask',
                name: 'ManualTask',
                component: manualTask
            },
            {
                path: 'addUser',
                name: 'AddUser',
                component: addUser
            },
            {
                path: 'account',
                name: 'Account',
                component: account
            }

        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    }
]

const router = createRouter(
    {
        history: createWebHistory(),
        routes,
    }
)

export default router