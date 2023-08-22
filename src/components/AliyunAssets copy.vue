<!-- @Time  : 2023/06/06 15:15:04 -->
<!-- @Author: wy -->

<template>
    <!-- Page Heading -->
    <h3 class="h6 mb-2 text-gray-800">资源运维</h3>
    <!-- Begin Page Content -->
    <div class="container-fluid">
        <!-- DataTales Example -->
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <!--   <div class="mb-2">
                        <button type="button" class="btn btn-outline-primary btn-sm" data-toggle="modal"
                            data-target="#createHost" @click="createNewHost">创建主机</button>
                    </div> -->
                    <table class="table table-bordered" id="myTable" width="100%" cellspacing="0">
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
                            <tr v-for="item in paginatedData" :key="item.id">
                                <td>
                                    <div class="vertical-values">
                                        <span>{{ item.instance_name }}</span>
                                        <span>{{ item.instance_id }}</span>
                                    </div>
                                </td>
                                <td>{{ item.private_ip }}(私有)</td>
                                <td>
                                    <span v-if="item.status === 'Running'" class="status-icon text-success">
                                        <i class="fas fa-check-circle"></i>
                                    </span>
                                    <span v-else class="status-icon text-danger">
                                        <i class="fas fa-times-circle"></i>
                                    </span>
                                    <!-- {{ item.status }} -->
                                </td>
                                <td>{{ item.cpu }}vCPU {{ item.memory / 1024 }} GiB</td>
                                <td>{{ item.os_name }}</td>
                                <td>{{ item.os_type }}</td>
                                <td>{{ item.creation_time }}</td>
                                <td>{{ item.expired_time }}</td>
                                <td>
                                    <a class="text-decoration-none">删除</a>
                                </td>
                                <!-- 更多数据列 -->
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <span>total: {{ totalPages }}</span>&nbsp;
                        <button type="button" class="btn btn-outline-primary btn-sm" @click="previousPage"
                            :disabled="currentPage === 1">上一页</button>&nbsp;
                        <span>当前页: {{ currentPage }}</span>&nbsp;
                        <button type="button" class="btn btn-outline-primary btn-sm" @click="nextPage"
                            :disabled="currentPage === totalPages">下一页</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /.container-fluid -->

    <!-- End of Main Content -->
</template>

<script>
import { aliyunEcsAssets } from '@/api/utils'
import { ref, onMounted, computed } from 'vue'
export default {
    setup() {
        const tableData = ref([])
        const currentPage = ref(1);
        const pageSize = 10;
        const totalPages = ref(0);
        const formData = ref({
        });
        onMounted(() => {
        })
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
        return { paginatedData, nextPage, previousPage };
    },
}
</script>
<style scoped>
.vertical-values {
    display: flex;
    flex-direction: column;
}

.table-header {
    font-size: 14px;
}

.table-tbody {
    font-size: 14px;
}


.table-wrapper {
    max-height: 300px;
    /* 设置表格最大高度 */
    overflow-y: auto;
    /* 设置垂直滚动条 */
}

.span1 {
    display: flex;
    align-items: center;
    /* 水平居中 */
}

.input-bottom-border {
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #ccc;
    box-shadow: none !important;
}

.duration-button {
    margin-right: 15px;
    /* 设置按钮之间的右侧外边距 */
}
</style>