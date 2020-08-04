<template>
    <div id='login'>

        <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-loginForm">
           
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="loginForm.email"></el-input>
            </el-form-item>
           
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password"></el-input>
            </el-form-item>
    
            <el-form-item label="验证码" prop="code">
                <el-input v-model="loginForm.code"></el-input>
                <el-button type="danger" @click="getCode('loginForm')">获取验证码</el-button>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
            </el-form-item>

        </el-form>

    </div>
</template>


<script>
export default {
    name: "Login",
    // data(){
    //     return{
    //         loginForm: {
    //             email: '',
    //             password: '',
    //             code: ''
    //         },
    //         rules: {
    //             email: [
    //                 { required: true, message: '请输入邮箱', trigger: 'blur' },
    //                 { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    //             ]
    //         },
    //         methods: {
    //             submitForm(formName){
    //                 console.log(666)
    //             }
    //         }
    //     }
    // }
}
</script>


<style lang="scss" scoped>
#login{
    background-color: #344a5f;
    height: 100vh;
}
</style>


