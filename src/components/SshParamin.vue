<template>
    <!-- Begin Page Content -->
    <div class="container-fluid">
        <!-- DataTales Example -->
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">远程执行命令</h6>
            </div>
            <div class="card-body">
                <form>
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">远程主机IP</label>
                        <select class="form-control" v-model="form_data.host_ip">
                            <option>192.168.0.101</option>
                            <option>192.168.0.2</option>
                            <option>192.168.0.3</option>
                            <option>192.168.0.4</option>
                            <option>192.168.0.5</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect2">选择连接方式</label>
                        <select class="form-control" v-model="form_data.passd">
                            <option>密码</option>
                            <option>密钥对</option>
                        </select>

                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">执行命令</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="2"
                            v-model="form_data.run_cmd"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlTextareal">执行结果</label>
                        <textarea class="form-control" id="exampleFormControlTextareal" rows="4"
                            v-model="console_data"></textarea>
                    </div>
                </form>
                <button type="submit" class="btn btn-primary" @click="sshparamin">执行</button>
            </div>
        </div>
    </div>
</template>
<script>
import { sshParamins } from "@/api/utils"
import { onMounted, ref } from 'vue'

export default {
    setup() {
        const form_data = ref({
            host_ip: '',
            run_cmd: '',
            passd:''
        })
        const console_data = ref([])
        onMounted(() => {

        })

        const sshparamin = () => {
            sshParamins(form_data.value).then(response => {
                console_data.value = response
                console.log(form_data)
            })
        }

        return { sshparamin, console_data, form_data }
    },

}
</script>

