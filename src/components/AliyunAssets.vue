<!-- @Time  : 2023/06/06 15:15:04 -->
<!-- @Author: wy -->

<template>
    <!-- Page Heading -->
    <h6 class="h6 mb-2 text-gray-800">阿里云资源</h6>
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
                    <table class="table table-bordered custom-table" id="myTable" width="100%" cellspacing="0">
                        <thead class="thead-light table-header">
                            <tr>
                                <th>实例ID/名称</th>
                                <th>IP地址</th>
                                <th>状态</th>
                                <th>配置</th>
                                <th>系统版本</th>
                                <th>创建时间</th>
                                <th>到期时间</th>
                                <th>操作</th>
                                <!-- 更多表头列 -->
                            </tr>
                        </thead>
                        <tbody class="table-tbody">
                            <tr v-for="item in tableData" :key="item.index">
                                <td>{{ item.instanceId }}</td>
                                <td>{{ item.privateIpAddress }}</td>
                                <td>{{ item.status }}</td>
                                <td>{{ item.cpu }}&nbsp;vCPU&nbsp;{{ item.memory / 1024 }}&nbsp;GiB</td>
                                <td>{{ item.osName }}</td>
                                <td>{{ item.startTime }}</td>
                                <td>{{ item.expiredTime }}</td>
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
                    <!-- start createhost modal -->

                    <!-- end createhost modal -->
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
        onMounted(() => {
            aliyunEcsAsset()
        })
        const aliyunEcsAsset = () => {
            aliyunEcsAssets().then(res => {
                tableData.value = res
                console.log(res)
            })
        }
        return { aliyunEcsAsset, tableData }
    }
}
</script>
<style scoped>
.table-header {
    font-size: 14px;
}

.table-tbody {
    font-size: 14px;
}

.custom-table {
    /* 设置表格布局方式 */
    table-layout: fixed;
}

.custom-table th,
.custom-table td {
    /* 设置文字内容自适应宽度 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 0;
}
</style>