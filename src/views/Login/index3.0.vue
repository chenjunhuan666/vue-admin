<template>
    <div id='login'>

        <div class='login-wrap'>
            <ul>
                <li :class="{'current': item.current}" v-for="(item, index) in menuTab" :key='item.id' @click="toggleMenu(item)">
                    {{item.txt}}
                </li>
            </ul>

            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
                <el-form-item  prop="email" class="item-form">
                    <label>邮箱</label>
                    <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item  prop="pass" class="item-form">
                    <label>密码</label>
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>

                <el-form-item  prop="pass2" class="item-form" v-show="model === 'register'">
                    <label>确认密码</label>
                    <el-input type="password" v-model="ruleForm.pass2" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>

                <el-form-item  prop="code" class="item-form">
                    <label>验证码</label>
                    <el-row :gutter="11">
                        <el-col :span="15">
                            <el-input v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-button type="success" class="button-block">获取验证码</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn button-block">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from '@vue/composition-api'
import { stripscript, verifyeEmail, verifyPass, verifyCode } from '@utils/validate'
export default {
    name: "Login",
    setup(props, { refs }){

        // 验证用户名-邮箱
        let validateEmail = (rule, value, callback) => {
            if (!value) {
                callback(new Error('邮箱不能为空！'));
            }else if(verifyeEmail(value)){
                callback(new Error('用户名格式有误！'));
            }else {
                callback();
            }
        };
        // 验证-密码
        let validatePass = (rule, value, callback) => {
            ruleForm.pass = stripscript(value)
            value = ruleForm.pass
            if (!value) {
                callback(new Error('密码不能为空！'));
            }else if(verifyPass(value)){
                callback(new Error('请输入大于6位小于20位数字+字母！'));
            }else{
                callback();
            }
        };
        // 验证-确认密码
        let validatePass2 = (rule, value, callback) => {
            if(model.value === 'login'){
                callback()
            }
            if (value === '') {
                callback(new Error('请再次输入密码！'));
            } else if (value !== ruleForm.pass) {
                callback(new Error('两次输入密码不一致！'));
            } else {
                callback();
            }
        }
        // 验证-验证码
        let validateCode = (rule, value, callback) => {  
            // this.ruleForm.code = stripscript(value)
            // value = this.ruleForm.code
            if (!value) {
                callback(new Error('验证码不能为空！'));
            }else if(verifyCode(value)){
                callback(new Error('验证码格式不正确！'));
            }else{
                callback();
            }
        };

        // 切换菜单值
        const menuTab = reactive([
                {txt: '登录', id: 0, current: true, type: 'login'},
                {txt: '注册', id: 1, current: false, type: 'register'}
        ])
        // model值
        const model = ref('login')
        // 表单绑定数据
        const ruleForm = reactive({
            email: '',
            pass: '',
            pass2: '',
            code: ''
        })
        // 表单的验证
        const rules = reactive({
                email: [
                    { validator: validateEmail, trigger: 'change' }
                ],
                pass: [
                    { validator: validatePass, trigger: 'change' }
                ],
                pass2: [
                    { validator: validatePass2, trigger: 'change' }
                ],
                code: [
                    { validator: validateCode, trigger: 'change' }
                ]
        })
        /* 
            生命周期
        */
        // 挂载完成
        onMounted(() => {

        })

       /* 
        声明函数方法
       */
        // 切换登录、注册
        const toggleMenu = (item => {
            menuTab.forEach(item => {
                item.current = false
            })
            // 高光
            item.current = true
            // 修改模块值
            model.value = item.type
        }) 
        const submitForm = (formName => {
            refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        })
        
        return {
            menuTab,
            model,
            ruleForm,
            rules,
            toggleMenu,
            submitForm
        }
    }, 
}
</script>


<style lang="scss" scoped>
#login{
    background-color: #344a5f;
    height: 100vh;
    display: flex;
    align-items: center;
}
.login-wrap{
    width: 330px;
    margin: auto;
    ul{
        text-align: center;
        li{
            display: inline-block;
            width: 88px;
            line-height: 36px;
            font-size: 14px;
            color: white;
            border-radius: 2px;
            cursor: pointer;
        }
        .current{
            background-color: rgba(0,0,0,.1);
        }
    }
    // 登录表单
    .login-form{
        margin-top: 29px;
        label{
            display: block;
            margin-bottom: 3px;
            font-size: 14px;
            color: white;
        }
        .item-form{
            margin-bottom: 13px;
        }
        .button-block{
            display: block;
            width: 100%;  
        }
        .login-btn{
            margin-top: 19px;
        }
    }
    
}

</style>
<style lang="scss" >

.login-form{


}
</style>


