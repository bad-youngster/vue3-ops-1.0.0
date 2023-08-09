<!-- @Time  : 2023/06/05 15:59:16 -->
<!-- @Author: wy -->
<template>
    <div class="container">

        <!-- Outer Row -->
        <div class="row justify-content-center">

            <div class="col-xl-10 col-lg-12 col-md-9">

                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <!-- Nested Row within Card Body -->
                        <div class="row">
                            <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                    </div>
                                    <form class="user">
                                        <div class="form-group">
                                            <input type="text" class="form-control form-control-user"
                                                id="exampleInputUsername" placeholder="Username" v-model="username">
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="Password" v-model="password">
                                        </div>
                                        <div class="form-group">
                                            <div class="custom-control custom-checkbox small">
                                                <input type="checkbox" class="custom-control-input" id="customCheck">
                                                <label class="custom-control-label" for="customCheck">Remember
                                                    Me</label>
                                            </div>
                                        </div>
                                        <router-link to="/home">
                                            <a @click="handLogin" class="btn btn-primary btn-user btn-block">
                                            Login
                                        </a>
                                        </router-link>
                                        

                                    </form>
                                    <hr>
                                    <div class="text-center">
                                        <a class="small" href="forgot-password.html">Forgot Password?</a>
                                    </div>
                                    <div class="text-center">
                                        <a class="small" href="register.html">Create an Account!</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<!-- cert-7657471 -->
<script>
import { ref } from 'vue'
import { login } from '@/api/auth'
import { useRouter } from 'vue-router'
export default {
    setup() {
        const router = useRouter();
        const handLogin = () => {
            login(username.value, password.value).then(res => {
                console.log(res)
                router.push('/home/');
            }).catch(error => {
                console.error(error)
            })
        }
        const username = ref('')
        const password = ref('')
        return {
            handLogin,
            username,
            password
        }
    },


}
</script>