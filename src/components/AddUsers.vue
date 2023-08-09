<template>
    <!-- Begin Page Content -->
    <div class="container-fluid">
        <!-- DataTales Example -->
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">权限列表</h6>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <div class="mb-2">
                        <button type="button" class="btn btn-outline-primary btn-sm" data-toggle="modal"
                            data-target="#addUser">新增</button>
                    </div>
                    <table class="table table-bordered" id="myTable" width="100%" cellspacing="0">
                        <thead class="thead-light table-header">
                            <tr>
                                <th>id</th>
                                <th>用户名</th>
                                <th>IP地址</th>
                                <th>类型</th>
                            </tr>
                        </thead>
                        <tbody class="table-tbody">
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal fade" id="addUser" tabindex="1" role="dialog" aria-labelledby="installsTitle"
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
                                        <label for="" class="col-sm-4 col-form-label">主机名</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="userInfo.hostname">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="" class="col-sm-4 col-form-label">IP地址</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="userInfo.ipaddress">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="" class="col-sm-4 col-form-label">用户名</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="userInfo.username">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="" class="col-sm-4 col-form-label">密码</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="userInfo.password">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="" class="col-sm-4 col-form-label">端口号</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="userInfo.port">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="" class="col-sm-4 col-form-label">类型</label>
                                        <div class="col-sm-8">
                                            <select class="custom-select" v-model="userInfo.type">
                                                <option value="1">普通用户</option>
                                                <option value="0">特权用户</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                                <button type="button" class="btn btn-primary" @click="addUser">执行</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { addUserPost } from '@/api/utils.js'
import { ref } from 'vue'
export default {
    setup() {
        const userInfo = ref({
            hostname: '',
            ipaddress: '',
            username: '',
            password: '',
            port: '',
            type: ''
        })

        const addUser = () => {
            addUserPost(userInfo.value).then(res => {
                console.log(res)
            })
        }
        return { addUser, userInfo }
    },
}
</script>