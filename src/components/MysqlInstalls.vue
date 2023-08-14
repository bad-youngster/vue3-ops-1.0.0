<!-- @Time  : 2023/08/03 16:25:24 -->
<!-- @Author: wy -->

<template>
    <!-- Begin Page Content -->
    <div class="container-fluid">
        <!-- DataTales Example -->
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">快速安装</h6>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <div class="mb-2">
                    </div>
                    <table class="table table-bordered custom-table" id="myTable" width="100%" cellspacing="0">
                        <thead class="thead-light table-header">
                            <tr>
                                <th>名称</th>
                                <th>ip地址</th>
                                <th>类型</th>
                                <th>操作</th>
                                <!-- 更多表头列 -->
                            </tr>
                        </thead>
                        <tbody class="table-tbody">
                            <tr v-for="item in form_mysql_table_data" :key="item.index">
                                <th>{{ item.server }}</th>
                                <th>{{ item.ip }}</th>
                                <th>{{ item.type }}</th>
                                <th>
                                    <a class="text-decoration-none" data-toggle="modal" data-target="#installs"
                                        @click="randomId(item)">安装</a>
                                </th>
                                <!-- 更多表头行 -->
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal fade" id="installs" tabindex="1" role="dialog" aria-labelledby="installsTitle"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Title</h5>

                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-group row">
                                        <label for="" class="col-sm-4 col-form-label">ID</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="form_mysql_id" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="" class="col-sm-4 col-form-label">主机地址</label>
                                        <div class="col-sm-8">
                                            <select class="custom-select" v-model="form_mysql_data.ip">
                                                <option>{{ form_mysql_ip }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="" class="col-sm-4 col-form-label">执行用户</label>
                                        <div class="col-sm-8">
                                            <select class="custom-select" v-model="form_mysql_data.user"
                                                @click="mysqlInstallUser">
                                                <option v-for="item in form_mysql_user" :key="item.index">{{ item.nickname }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="" class="col-sm-4 col-form-label">类型</label>
                                        <div class="col-sm-8">
                                            <select class="custom-select" @click="nexusComponent"
                                                v-model="form_mysql_data.type">
                                                <option v-for="item in form_mysql" :key="item.index">{{ item.path }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="" class="col-sm-4 col-form-label">集群</label>
                                        <div class="col-sm-8">
                                            <select class="custom-select" @click="nexusMysqlScript"
                                                v-model="form_mysql_data.script_download_url">
                                                <option v-for="item in form_mysql_script" :key="item.index"
                                                    :value="item.downlaod_url">{{ item.path }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="" class="col-sm-4 col-form-label">下载地址</label>
                                        <div class="col-sm-8">
                                            <select class="custom-select" @click="nexusComponent"
                                                v-model="form_mysql_data.download_url">
                                                <option v-for="item in form_mysql_url" :key="item.index">{{
                                                    item.downlaod_url }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                                <button type="button" class="btn btn-primary" @click="mysqlInstallPosts">执行</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { nexusComponents, nexusComponentPost, mysqlInstallPost, nexusMysqlScripts, getUser } from '@/api/utils'
import { generateRandomId } from '@/assets/js/randomId.js'
import { ref, onMounted } from 'vue'

export default {
    setup() {
        const form_mysql = ref([])
        const form_mysql_url = ref([])
        const form_mysql_id = ref([])
        const form_mysql_ip = ref([])
        const form_mysql_user = ref([])
        const form_mysql_script = ref([])
        const form_mysql_table_data = ref([{ server: 'mysql', ip: '192.168.0.176', type: '主从' }, { server: 'mysql', ip: '192.168.0.218', type: '主从' }, { server: 'mysql', ip: '192.168.0.219', type: '主从' }, { server: 'mysql', ip: '192.168.0.220', type: '主从' }])
        const form_mysql_data = ref({
            id: form_mysql_id,
            ip: '',
            user: '',
            type: '',
            download_url: '',
            script_download_url: ''
        })
        onMounted(() => {
        })
        const nexusComponent = () => {
            nexusComponents().then(res => {
                console.log(res)
                form_mysql.value = res
                nexusComponentPosts()
            }).catch(error => {
                console.error(error);
            })
        }
        const nexusComponentPosts = () => {
            nexusComponentPost(form_mysql_data.value).then(res => {
                form_mysql_url.value = res
            }).catch(error => {
                console.error(error);
            })
        }

        const randomId = (item) => {
            form_mysql_id.value = generateRandomId()
            form_mysql_ip.value = item.ip
        }
        const mysqlInstallPosts = () => {
            mysqlInstallPost(form_mysql_data.value).catch(error => {
                console.error(error);
            })
        }
        const mysqlInstallUser = () => {
            getUser().then(res => {
                form_mysql_user.value = res
                console.log(res)
            })
        }
        const nexusMysqlScript = () => {
            nexusMysqlScripts().then(res => {
                form_mysql_script.value = res
            }).catch(error => {
                console.error(error);
            })
        }
        return {
            form_mysql, form_mysql_url, nexusComponent, form_mysql_data, nexusComponentPosts, randomId, form_mysql_id,
            mysqlInstallPosts, form_mysql_table_data, form_mysql_ip, nexusMysqlScript, form_mysql_script, mysqlInstallUser, form_mysql_user

        }

    },
}
</script>

<style scoped>
.custom-table {
    font-size: 12px;
    /* 调整为您希望的字体大小 */
}

/* 如果还想针对表头和表格内容分别调整字体大小 */
.custom-table thead th {
    font-size: 14px;
    /* 调整为您希望的表头字体大小 */
}

.custom-table tbody td {
    font-size: 12px;
    /* 调整为您希望的表格内容字体大小 */
}
</style>