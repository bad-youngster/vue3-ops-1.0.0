<template>
    <!-- Page Heading -->
    <h3 class="h3 mb-2 text-gray-800"></h3>
    <!-- Begin Page Content -->
    <div class="container-fluid">
        <!-- DataTales Example -->
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">DataTables</h6>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <div class="mb-2">
                        <button type="button" class="btn btn-outline-primary btn-sm custom-button" data-toggle="modal"
                            data-target="#new_hosts">创建主机</button>
                    </div>
                    <table class="table table-bordered custom-table" id="myTable" width="100%" cellspacing="0">
                        <thead class="thead-light table-header">
                            <tr>
                                <th>实例ID/名称</th>
                                <th>IP地址</th>
                                <th>状态</th>
                                <th>配置</th>
                                <th>系统版本</th>
                                <th>类型</th>
                                <th>创建时间</th>
                                <th>到期时间</th>
                                <th>操作</th>
                                <!-- 更多表头列 -->
                            </tr>
                        </thead>
                        <tbody class="table-tbody">
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- Modal -->
                    <div class="modal fade" id="new_hosts" tabindex="-1" role="dialog" aria-labelledby="newHostsCenterTitle"
                        aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="newHostsCenterTitle">Title</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <dev class="form-group row">
                                            <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                                            <div class="col-sm-6">
                                                <input type="email" class="form-control" id="inputEmail3"
                                                    placeholder="Email">
                                            </div>
                                        </dev>
                                        <div class="form-group row">
                                            <label for="" class="col-sm-2 col-form-label">Email</label>
                                            <div class="col-sm-6">
                                                <input type="email" class="form-control" id="" placeholder="Email">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="" class="col-sm-2 col-form-label">Email</label>
                                            <div class="col-sm-6">
                                                <input type="email" class="form-control" id="" placeholder="Email">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="" class="col-sm-2 col-form-label">Email</label>
                                            <div class="col-sm-6">
                                                <input type="email" class="form-control" id="" placeholder="Email">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="" class="col-sm-2 col-form-label">Email</label>
                                            <div class="col-sm-6">
                                                <input type="email" class="form-control" id="" placeholder="Email">
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                                    <button type="button" class="btn btn-primary">保存</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span>total: {{ totalPages }}</span>&nbsp;
                        <button type="button" class="btn btn-outline-primary btn-sm custom-button" @click="previousPage"
                            :disabled="currentPage === 1">上一页</button>&nbsp;
                        <span>当前页: {{ currentPage }}</span>&nbsp;
                        <button type="button" class="btn btn-outline-primary btn-sm custom-button" @click="nextPage"
                            :disabled="currentPage === totalPages">下一页</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, onMounted, computed } from 'vue'
export default {
    setup() {

        const paginatedData = computed(() => {
            const startIndex = (currentPage.value - 1) * pageSize
            const endIndex = startIndex + pageSize
            return tableData.value.slice(startIndex, endIndex)
        })

        const nextPage = () => {
            if (currentPage.value < totalPages.value) {
                currentPage.value++;
            }

        };

        const previousPage = () => {
            if (currentPage.value > 1) {
                currentPage.value--;
            }
        };
        return { paginatedData, nextPage, previousPage }
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

.custom-button {
    font-size: 0.5rem !important;
    line-height: 1.5 !important;
}
</style>