<template>
    <!-- Begin Page Content -->
    <div class="container-fluid">
        <!-- DataTales Example -->
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">手动任务</h6>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <div class="mb-2">
                        <button type="button" class="btn btn-outline-primary btn-sm" data-toggle="modal"
                            data-target="#addUser">新增任务</button>
                    </div>
                    <table class="table table-bordered custom-table" id="myTable" width="100%" cellspacing="0">
                        <thead class="thead-light table-header">
                            <tr>
                                <th>任务名称</th>
                                <th>任务状态</th>
                                <th>开始时间</th>
                                <th>结束时间</th>
                                <th>执行人</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <div>
                                        <button type="button" class="btn btn-outline-primary btn-sm" data-toggle="modal"
                                            data-target="#runTask">执行</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- Modal -->
                    <div class="modal fade" id="runTask" tabindex="-1" role="dialog"
                        aria-labelledby="runTaskModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered custom-modal-size" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="runTaskModalCenterTitle">Title</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="container">
                                        <form class="custom-form">
                                            <div class="form-group row">
                                                <label class="col-sm-2 col-form-label">区域ID</label>
                                                <div class="col-sm-5">
                                                    <select class="custom-select" @click="getDescribeRegion"
                                                        v-model="formData.regionId">
                                                        <option v-for="item in describeRegion" :key="item.index">
                                                            {{ item.regionId }}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-sm-2 col-form-label">实例名称</label>
                                                <div>
                                                    <select class="custom-select" @click="getSingleEcs">
                                                        <option></option>
                                                    </select>
                                                </div>
                                            </div>

                                        </form>
                                        <hr class="bg-secondary">
                                        <p>目标库</p>
                                        <form class="custom-form">
                                            <div class="form-group row">
                                                <label class="col-sm-2 col-form-label">实例名称</label>
                                                <div class="col-sm-5">
                                                    <input value="ttttttttest">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-sm-2 col-form-label">实例规格</label>
                                                <div class="col-sm-5">
                                                    <input value="4c8g">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-sm-2 col-form-label">vpc</label>
                                                <div class="col-sm-5">
                                                    <input>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                                    <button type="button" class="btn btn-primary" @click="selectSingleEcss">运行</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { selectSingleEcs, getDescribeRegions, aliyunEcsAsset } from '@/api/utils.js'
import { ref, onMounted } from 'vue'
export default {
    setup() {
        const regionId = ref([])
        const instance = ref([])
        const describeRegion = ref([])
        const formData = ref({
            regionId: '',
            instanceId: ''

        })

        onMounted(() => {

        })
        const getDescribeRegion = () => {
            getDescribeRegions().then(res => {
                describeRegion.value = res
                console.log(res)
            }).catch(error => {
                console.log(error)
            })
        }
        const getSingleEcs = () => {
            aliyunEcsAsset(formData.value).then(res => {
                console.log(res)
            })

        }

        const selectSingleEcss = () => {
            selectSingleEcs(formData.value).then(res => {
                console.log(res)
                console.log(formData)
            }).catch(error => {
                console.error(error);
            })
        }
        return { describeRegion, selectSingleEcss, regionId, instance, formData, getDescribeRegion, getSingleEcs }
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
    line-height: 1 !important;
}

.custom-modal-size {
    max-width: 50%;
    /* 自定义模态框的最大宽度 */
    max-height: 50%;
}

.custom-form {
    font-size: 12px;
}
</style>