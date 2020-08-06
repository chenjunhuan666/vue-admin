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

                <el-form-item  prop="code" class="item-form">
                    <label>验证码</label>
                    <el-row :gutter="11">
                        <el-col :span="15">
                            <el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input>
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
export default {
    name: "Login",
    data(){
        // 验证用户名-邮箱
        var validateEmail = (rule, value, callback) => {
            var reg = /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
            if (!value) {
                callback(new Error('邮箱不能为空！'));
            }else if(!reg.test(value)){
                callback(new Error('用户名格式有误！'));
            }else {
                
                callback();
            }
           
        };
        // 验证-密码
        var validatePass = (rule, value, callback) => {
            const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
             if (!value) {
                callback(new Error('密码不能为空！'));
            }
            if(!reg.test(value)){
                callback(new Error('请输入大于6位小于20位数字+字母!'));
            }
            callback();
        };
        // 验证-验证码
        var validateCode = (rule, value, callback) => {
            var reg = /^[a-z0-9]{6}$/
            if (!value) {
                callback(new Error('验证码不能为空！'));
            }else if(!reg.test(value)){
                callback(new Error('验证码为6位的数字或字母'));
            }else{
                callback();
            }
        };
        return{
            menuTab: [
                {txt: '登录', id: 0, current: true},
                {txt: '注册', id: 1, current: false}
            ],
            ruleForm: {
                email: '',
                pass: '',
                code: ''
            },
            rules: {
                email: [
                    { validator: validateEmail, trigger: 'change' }
                ],
                pass: [
                    { validator: validatePass, trigger: 'change' }
                ],
                code: [
                    { validator: validateCode, trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        // 切换登录、注册
        toggleMenu(item){
            this.menuTab.forEach(item => {
                item.current = false
            })
            item.current = true
        },  
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        }, 
    }
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
    // display: flex;
    // align-items: center;
    // justify-content: space-around;
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

    // .el-form-item{
    //     margin-bottom: 5px;
    // }
    // // label字体
    // .el-form-item{
    //     .el-form-item__label{
    //         color: white;
    //         font-size: 12px;
    //         margin-bottom: 3px;
    //     }
    // }

}
</style>


