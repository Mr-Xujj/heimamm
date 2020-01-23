<template>
  <div class="login-box">
    <div class="form-box">
      <div class="title-box">
        <img src="../../assets/矢量智能对象 拷贝 9.png" alt />
        <span class="title">黑马面面</span>
        <i></i>
        <span class="sub-title">用户登录</span>
      </div>

      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="login-form" >

        <el-form-item  prop="phone" >
          <el-input v-model="ruleForm.phone" placeholder="请输入手机号"  prefix-icon="el-icon-user"></el-input>
        </el-form-item>

        <el-form-item  prop="password">
          <el-input v-model="ruleForm.password" placeholder="请输入密码" show-password prefix-icon="el-icon-lock"></el-input>
        </el-form-item>

        <el-form-item  prop="captcha">
          <el-row>
            <el-col :span="18">
          <el-input v-model="ruleForm.captcha" placeholder="请输入验证码"  prefix-icon="el-icon-key"></el-input>
            </el-col>
            <el-col :span="6">
              <img class="captcha" src="../../assets/captcha.png" alt="">
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="ruleForm.checked">
            我已同意阅读<el-link type="primary"> 用户协议</el-link> 和 <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
       
        <el-form-item>
          <el-button type="primary" @click="submForm" >登录</el-button>
          <el-button class="register-button" type="success">注册</el-button>
        </el-form-item>
      </el-form>
    </div>

    <img class="login-pic" src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    //  自定义验证规则
    var checkphone = (rule,value,callback)=>{
      if(!value){
        return callback(new Error("手机号不能为空"))
      }else{
        const reg  =/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
        if(reg.test(value) == true){
          callback();
        }else{
          callback(new Error("请输入正确手机号"))
        }
      }
    }
    return {
      ruleForm: {
        phone: "",
        password: "",
        captcha:"",
        checked: false,
      
      },
      rules: {
        phone: [
          { required: true, validator:checkphone, trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "change" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "change" }
        ],
        captcha: [
          { required: true, message: "验证码不能为空", trigger: "change" },
          { min: 4, max: 4, message: "验证码长度为4个字符", trigger: "change" }
        ]
       
       
      }
    };
  },
  methods: {
    submForm() {
       if(this.ruleForm.checked ===false){
         this.$message.warning("勾选用户协议")
       }else{
         this.$refs.ruleForm.validate(valid => {
           if (valid) {
             alert("submit!");
           } else {
             window.console.log("error submit!!");
             return false;
           }
         });
       }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less">
.login-box {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  height: 100%;
  .form-box {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 44px;
    box-sizing: border-box;
    .title-box {
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .title {
        font-size: 24px;
        margin-right: 14px;
      }
      i {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 12px;
      }
      .sub-title {
        font-size: 22px;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
    }
    .login-form{
      margin-top: 30px;
      .captcha{
        height: 40px;
        width: 100%;
      }
      .el-checkbox{
        display: flex;
        align-items: center;
        .el-checkbox__label{
          display: flex;
          align-items: center
        }
      }
      .el-button{
        width: 100%;
        margin: 0;
      }
      .register-button{
        margin-top: 30px;
      }
    }
  }
}
</style>