<!-- @Time  : 2023/06/06 15:15:04 -->
<!-- @Author: wy -->

<template>
    <!-- Page Heading -->
    <h3 class="h3 mb-2 text-gray-800">资源运维</h3>
    <!-- Begin Page Content -->
    <div class="container-fluid">
        <!-- DataTales Example -->
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <div class="mb-2">
                        <button type="button" class="btn btn-outline-primary btn-sm" data-toggle="modal"
                            data-target="#createHost" @click="createNewHost">创建主机</button>
                    </div>
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
                    <!-- start createhost modal -->
                    <div class="modal fade" id="createHost" data-backdrop="static" data-keyboard="false" tabindex="-1"
                        aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">创建主机</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div class="form-group row">
                                            <label for="colFormLabel" class="col-sm-2 col-form-label">区域</label>
                                            <div class="col-sm-3">
                                                <select class="custom-select input-bottom-border"
                                                    v-model="regions_select.region_id"
                                                    @change="aliyunDescribeAvailableResource">
                                                    <option v-for="item in describe_regions" :key="item.id"
                                                        :value="item.RegionEndpoint">{{ item.LocalName }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="colFormLabel" class="col-sm-2 col-form-label">主机名称</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control input-bottom-border"
                                                    v-model="formData.instance_name">

                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="colFormLabel" class="col-sm-2 col-form-label">支付方式</label>
                                            <div class="col-sm-3">
                                                <select class="custom-select input-bottom-border"
                                                    v-model="regions_select.instance_charge">
                                                    <option v-for="item in instance_charge_type" :key="item.id"
                                                        :value="item.value"> {{ item.item }} </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="colFormLabel" class="col-sm-2 col-form-label">实例配置</label>
                                            <span class="span1">CPU</span>
                                            <div class="col-sm-2">
                                                <select class="custom-select input-bottom-border"
                                                    v-model="regions_select.cores"
                                                    @change="aliyunDescribeAvailableResource">
                                                    <option v-for="item in cores" :key="item.id" :value="item">{{ item }}
                                                    </option>
                                                </select>
                                            </div>
                                            <span class="span1">内存</span>
                                            <div class="col-sm-2">
                                                <select class="custom-select input-bottom-border"
                                                    v-model="regions_select.memory"
                                                    @change="aliyunDescribeAvailableResource">
                                                    <option v-for="item in memory" :key="item.id" :value="item">{{ item }}
                                                    </option>
                                                </select>
                                            </div>
                                            <span class="span1">实例规格</span>
                                            <div class="col-sm-3 input-group">
                                                <input type="text" class="form-control input-bottom-border"
                                                    placeholder="实例规格" v-model="instance_specification">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="colFormLabel" class="col-sm-2 col-form-label"></label>
                                            <div class="col-sm-10">
                                                <div class="table-wrapper">
                                                    <table class="table" width="100%" cellspacing="0">
                                                        <thead class="thead-light table-header">
                                                            <tr>
                                                                <th scope="col"></th>
                                                                <th scope="col">编号</th>
                                                                <th scope="col">实例规格</th>
                                                                <th scope="col">区域</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="(item, index) in filteredZoneSupported" :key="index">
                                                                <td>
                                                                    <input type="checkbox" v-model="zone_supported_select"
                                                                        :value="item" @change="handleRowSelection">
                                                                </td>
                                                                <th scope="row">{{ index }}</th>
                                                                <td>{{ item.supported_resources }}</td>
                                                                <td>{{ item.zone_id }}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="colFormLabel" class="col-sm-2 col-form-label">主机数量</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control input-bottom-border"
                                                    v-model="regions_select.amount" disabled>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="colFormLabel" class="col-sm-2 col-form-label">时长</label>
                                            <div class="col-sm-3">
                                                <button type="button" class="btn btn-light duration-button"
                                                    v-for="duration in durations" :key="duration.id"
                                                    :value="duration.value">{{ duration.key
                                                    }}</button>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="colFormLabel" class="col-sm-2 col-form-label">镜像</label>
                                            <div class="col-sm-3">
                                                <select class="custom-select mr-sm-2 input-bottom-border"
                                                    v-model="regions_select.image_id">
                                                    <option v-for="item in describe_images" :key="item.id"
                                                        :value="item.image_id">{{ item.image_name }}</option>

                                                </select>

                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="colFormLabel" class="col-sm-2 col-form-label">存储</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control input-bottom-border"
                                                    v-model="regions_select.sys_disk_size">
                                            </div>
                                            <div class="col-sm-3">
                                                <select class="custom-select mr-sm-2 input-bottom-border"
                                                    v-model="regions_select.sys_disk_type">
                                                    <option v-for="item in sys_disk_type.disk_categories" :key="item.id"
                                                        :value="item">
                                                        {{ item }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="colFormLabel" class="col-sm-2 col-form-label">网络</label>
                                            <div class="col-sm-3">
                                                <select class="custom-seletct  input-bottom-border"
                                                    v-model="regions_select.security_group" @change="vswitch">
                                                    <option v-for="item in describe_vpcs" :key="item.id"
                                                        :value="item.vpc_id"> {{ item.vpc_name }}/{{ item.vpc_id }}</option>
                                                </select>
                                            </div>
                                            <div class="col-sm-3">
                                                <select class="custom-seletct mr-sm-2 input-bottom-border"
                                                    v-model="regions_select.security_vswitch">
                                                    <option v-for="item in vswitch_ids" :key="item.id" :value="item"> {{
                                                        item
                                                    }}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label for="colFormLabel" class="col-sm-2 col-form-label">密钥对</label>
                                            <div class="col-sm-3">
                                                <select class="custom-select mr-sm-2 input-bottom-border"
                                                    v-model="regions_select.peris_key">
                                                    <option> {{ peris_key }}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="colFormLabel" class="col-sm-2 col-form-label">标签</label>
                                            <div class="col-sm-3">
                                                <select class="custom-select mr-sm-2 input-bottom-border "
                                                    v-model="regions_select.tag_key"
                                                    @click.stop="aliyunEcsChangeTags($event.target.value)">
                                                    <option v-for="(value, key) in tag_keys" :key="value.id" :value="key">{{
                                                        key }}</option>
                                                </select>
                                            </div>
                                            <div class="col-sm-3">
                                                <select class="custom-select mr-sm-2 input-bottom-border"
                                                    v-model="regions_select.tag_value">
                                                    <option v-for="item in tag_value" :key="item.id"> {{ item }}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="colFormLabel" class="col-sm-2 col-form-label">资源组</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control"
                                                    v-model="formData.resource_group_id">
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                                    <button type="submit" class="btn btn-primary" @click="aliyunEcsCreatePost">提交</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end createhost modal -->
                </div>
            </div>
        </div>
    </div>
    <!-- /.container-fluid -->

    <!-- End of Main Content -->
</template>

<script>
import { aliyunAsserts, aliyunEcsCreates, aliyunEcsRescribeRegions, aliyunEcsDescribeAvailableResource, aliyunEcsDescribeImages, aliyunEcsDescribeSecurityGroups, aliyunEcsDescribeVpcs, aliyunEscDescribeZonesDisk, aliyunEcsDescribeVSwitches, aliyunEcsDescribeKeyPairs, aliyunEcsDescribeTags } from '@/api/utils'
import { ref, onMounted, computed } from 'vue'
export default {
    setup() {
        const tableData = ref([])
        const currentPage = ref(1);
        const pageSize = 10;
        const totalPages = ref(0);
        const describe_regions = ref([])
        const zone_supported = ref([])
        const zone_supported_select = ref([])
        const instance_specification = ref('')
        const describe_images = ref([])
        const security_groups = ref([])
        const describe_vpcs = ref([])
        const vswitch_ids = ref([])
        const sys_disk_type = ref([])
        const peris_key = ref([])
        const tag_keys = ref([])
        const tag_value = ref([])
        const durations = ref([{ key: '1个月', value: 1 }, { key: '1年', value: 1 }])
        const memory = ref(["2", "4", "8", "12", "16", "32", "64"])
        const cores = ref(["2", "4", "8", "12", "16", "32", "64"])
        const instance_charge_type = ref([{ 'item': '包年包月', 'value': 'PrePaid' }, { 'item': '按量付费', 'value': 'PostPaid' }])
        const regions_select = ref({
            region_id: 'ecs.cn-shanghai.aliyuncs.com',
            cores: '2',
            memory: '2',
            zone_supported: zone_supported_select,
            instance_charge: 'PrePaid',
            image_id: 'm-uf65k18gpu5xf78xri4r',
            amount: '1',
            security_group: '',
            security_vswitch: '',
            describe_vpc: '',
            sys_disk_type: 'cloud_essd',
            sys_disk_size: '40',
            peris_key: '',
            period: '',
            tag_key: '',
            tag_value: ''

        })
        const formData = ref({
            region_id: regions_select.region_id,
            instance_name: 'xxx',
            instance_charge_type: regions_select.instance_charge,
            instance_type: regions_select.zone_supported,
            amount: regions_select.amount,
            image_id: regions_select.image_id,
            sys_disk_type: regions_select.sys_disk_type,
            sys_disk_size: regions_select.sys_disk_size,
            vswitch_id: '',
            security_group_id: '',
            tags: '',
            resource_group_id: '',
            peris_key: regions_select.peris_key,
            period: regions_select.period,
            tag_key: regions_select.tag_key,
            tag_value: regions_select.tag_value
        });
        onMounted(() => {
            fetchData()

        })
        // 创建新的ECS主机
        const createNewHost = () => {
            aliyunDescribeRegions()
            if (regions_select.value !== '') {
                aliyunDescribeAvailableResource()
            }
            aliyunEcsDescribeImage()
            aliyunEcsDescribeKeyPair()
            aliyunEcsDescribeTag()
        }
        // 获取vswitch
        const vswitch = () => {
            aliyunEcsDescribeVSwitches(regions_select.value).then(response => {
                vswitch_ids.value = response
            }).catch(error => {
                console.log(error)
            })
            /*   if (regions_select.value.security_group !== 0) {
                  for (let item = 0; item < describe_vpcs.value.length; item++) {
                      const element = describe_vpcs.value[item];
                      if (regions_select.value.security_group === element.vpc_id) {
                          vswitch_ids.value = element
                      }
  
                  }
              } */
        }
        // 获取当前的ecs信息
        const fetchData = () => {
            aliyunAsserts().then(response => {
                tableData.value = response.data
                totalPages.value = Math.ceil(tableData.value.length / pageSize);
            })
                .catch(error => {
                    console.error(error);
                })
        }
        // 获取区域
        const aliyunDescribeRegions = () => {
            aliyunEcsRescribeRegions().then(response => {
                describe_regions.value = response.data
            })
                .catch(error => {
                    console.error(error)
                })
        }
        // 获取区域可选的类型
        const aliyunDescribeAvailableResource = () => {
            aliyunEcsDescribeAvailableResource(regions_select.value)
                .then(response => {
                    zone_supported.value = response
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                })
        }

        const filteredZoneSupported = computed(() => {
            const filterText = instance_specification.value.toLowerCase().trim();
            return zone_supported.value.filter(item => item.supported_resources.toLowerCase().includes(filterText));
        });
        // 获取选择的行数
        const handleRowSelection = () => {
            if (zone_supported_select.value.length > 0) {
                zone_supported_select.value.map(row => ({
                    supported_resources: row.supported_resources,
                    zone_id: row.zone_id
                }));
                aliyunEscDescribeZonesDisk(zone_supported_select.value).then(response => {
                    sys_disk_type.value = response
                })
                    .catch(error => {
                        console.log(error)
                    })
                aliyunEcsDescribeVpc()
            } else {
                zone_supported_select.value.splice(0)
            }
        }
        // 获取镜像
        const aliyunEcsDescribeImage = () => {
            aliyunEcsDescribeImages().then(response => {
                describe_images.value = response
            }
            )
        }
        // 获取网络信息
        const aliyunEcsDescribeVpc = () => {
            aliyunEcsDescribeVpcs().then(response => {
                describe_vpcs.value = response
            }).catch(error => {
                console.log(error)
            })
        }
        // 获取安全组信息
        const aliyunEcsDescribeSecurityGroup = () => {
            aliyunEcsDescribeSecurityGroups().then(response => {

            }).catch(error => {
                console.log(error)
            })
        }
        // 获取密钥key
        const aliyunEcsDescribeKeyPair = () => {
            aliyunEcsDescribeKeyPairs().then(response => {
                for (let i = 0; i < response.length; i++) {
                    const element = response[i];
                    peris_key.value = element.key_pair_name
                }
            }).catch(error => {
                console.log(error)
            })
        }
        // 获取标签
        const aliyunEcsDescribeTag = () => {
            aliyunEcsDescribeTags().then(response => {
                tag_keys.value = response
            }).catch(error => {
                console.log(error)
            })
        }
        // 标签筛选
        const aliyunEcsChangeTags = (item) => {
            if (regions_select.tag_key !== 0) {
                tag_value.value = tag_keys.value[item]
            }
        }

        // 创建一台主机
        const aliyunEcsCreatePost = () => {
            aliyunEcsCreates(formData.value)
                .catch(error => {
                    console.error(error);
                });
        };

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
        return {
            paginatedData, currentPage,
            totalPages, fetchData, createNewHost,
            nextPage, previousPage,
            formData, aliyunEcsCreatePost,
            aliyunDescribeRegions, describe_regions,
            regions_select, aliyunDescribeAvailableResource,
            memory, cores,
            zone_supported, zone_supported_select, handleRowSelection,
            instance_specification, filteredZoneSupported,
            instance_charge_type,
            aliyunEcsDescribeImage, describe_images,
            aliyunEcsDescribeSecurityGroup, security_groups,
            aliyunEcsDescribeVpc, describe_vpcs,
            vswitch, vswitch_ids,
            sys_disk_type, aliyunEcsDescribeKeyPair, peris_key, durations, aliyunEcsDescribeTag, aliyunEcsChangeTags, tag_keys, tag_value
        };
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