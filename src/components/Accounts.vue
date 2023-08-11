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
                    <table class="table table-bordered custom-table" id="myTable" width="100%" cellspacing="0">
                        <thead class="thead-light table-header">
                            <tr>
                                <th>id</th>
                                <th>用户名</th>
                                <th>类型</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody class="table-tbody">
                            <tr v-for="(item, index) in getUserData" :key="index">
                                <td> {{ index }}</td>
                                <td>{{ item.username }}</td>
                                <td>{{ item.type }}</td>
                                <td>
                                    <button type="button" class="btn btn-outline-primary  custom-button btn-sm">删除</button>
                                </td>
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
                                        <label for="" class="col-sm-4 col-form-label">用户名</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="addUserInfo.username">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="" class="col-sm-4 col-form-label">密码</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="addUserInfo.password">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="" class="col-sm-4 col-form-label">类型</label>
                                        <div class="col-sm-8">
                                            <select class="custom-select" v-model="addUserInfo.type">
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
import { addUserPost, getUser } from '@/api/utils.js'
import { ref, onMounted } from 'vue'
export default {
    setup() {
        const getUserData = ref([])
        const addUserInfo = ref({
            username: '',
            password: '',
            type: ''
        })

        onMounted(() => {
            user()

        })
        const addUser = () => {
            addUserPost(addUserInfo.value).then(res => {
                console.log(res)
            })
        }
        const user = () => {
            getUser().then(res => {
                getUserData.value = res
            })
        }

        return { addUser, addUserInfo, user, getUserData }
    },
}
</script>
<style scoped>
.custom-table {
  font-size: 12px; /* 调整为您希望的字体大小 */
}

/* 如果还想针对表头和表格内容分别调整字体大小 */
.custom-table thead th {
  font-size: 14px; /* 调整为您希望的表头字体大小 */
}

.custom-table tbody td {
  font-size: 12px; /* 调整为您希望的表格内容字体大小 */
}

.custom-button {
  font-size: 0.5rem !important;
  line-height: 1 !important;
}
</style>