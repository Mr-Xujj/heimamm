<template>
  <div class="login-box">
    <div class="form-box">
      <div class="title-box">
        <img src="../../assets/矢量智能对象 拷贝 9.png" alt />
        <span class="title">黑马面面</span>
        <i></i>
        <span class="sub-title">用户登录</span>
      </div>

      <!-- 登录表单 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="login-form">
        <el-form-item prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="请输入手机号" prefix-icon="el-icon-user"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入密码"
            show-password
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>

        <el-form-item prop="captcha">
          <el-row>
            <el-col :span="18">
              <el-input v-model="ruleForm.captcha" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
            </el-col>
            <el-col :span="6">
              <img class="captcha" :src="captchaURL" @click="changeCaptcha" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="ruleForm.checked">
            我已同意阅读
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submForm">登录</el-button>
          <el-button class="register-button" type="success" @click="dialogFormVisible=true">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img class="login-pic" src="../../assets/login_banner_ele.png" alt />

    <!-- dialog 注册对话框 -->
    <!-- Form -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="regForm" :rules="regRules">
        <el-form-item label="头像" prop="avatar" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" prop="username" :label-width="formLabelWidth">
          <el-input v-model="regForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="regForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="regForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input type="password" v-model="regForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图形码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="regForm.code" autocomplete="off"></el-input>
            </el-col>
            <el-col :offset="1" :span="7">
              <img @click="changeRegCaptcha" class="register-captcha" :src="regFormCaptcha" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="验证码" prop="rcode" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="regForm.rcode" autocomplete="off"></el-input>
            </el-col>
            <el-col :offset="1" :span="7">
              <el-button>获取用户验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    //  自定义验证规则--手机号
    var checkphone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (reg.test(value) == true) {
          callback();
        } else {
          callback(new Error("请输入正确手机号"));
        }
      }
    };
    // 邮箱
    var checkEmail = (rule,value,callback)=>{
          if(!value){
            return callback(new Error("邮箱不能为空"));

          }else{
            const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
            if(reg.test(value)==true){
              callback()
            }else{
              callback(new Error("请输入正确的邮箱"))
            }
          }
    };
    return {
      //  登录表单数据
      ruleForm: {
        phone: "18522222222",
        password: "12345678",
        captcha: "",
        checked: false
      },

      //注册表单数据
      regForm: {
        phone: "",
        // 图片验证码
        code: "",
        // 头像
        avatar: "",
        email: "",
        password: "",
        // 短信验证
        rcode: ""
      },

      // 登录表单验证规则
      rules: {
        phone: [{ required: true, validator: checkphone, trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "change" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "change"
          }
        ],
        captcha: [
          { required: true, message: "验证码不能为空", trigger: "change" },
          { min: 4, max: 4, message: "验证码长度为4个字符", trigger: "change" }
        ]
      },

      //  注册对话框验证规则
        regRules:{
           phone: [{ required: true, validator: checkphone, trigger: "blur" }],
           email:[{ required:true, validator:checkEmail,trigger:"blur"}],
           username:[
             {required:true,message:"用户名不能为空",trigger:"blur"},
             {min:2,max:16,message:"名字长度为2-16",trigger:"change" }
           ],
           password:[
             {required:true,message:"密码不能为空",trigger:"blur"},
             {min:6,max:18,message:"密码长度为2-18",trigger:"change" }
           ],
           rcode:[
             {required:true,message:"验证码不能为空",trigger:"blur"},
             {min:4,max:4,message:"验证码长度为4",trigger:"change" }
           ]
        },
      //  验证码地址 用到环境变量 process.env
      captchaURL: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      // 图片上传地址
      uploadUrl: process.env.VUE_APP_BASEURL + "/uploads",
      // 上传地址
      imageUrl: "",
      //  是否显示dialog对话框
      dialogFormVisible: false,
      // dialog宽度
      formLabelWidth: "80px",
      regFormCaptcha:process.env.VUE_APP_BASEURL+"/captcha?type=sendsms"
    };
  },
  methods: {
    submForm() {
      if (this.ruleForm.checked === false) {
        this.$message.warning("勾选用户协议");
      } else {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            //  alert("登录成功");
            axios({
              url: process.env.VUE_APP_BASEURL + "/login",
              method: "post",
              withCredentials: true,
              data: {
                phone: this.ruleForm.phone,
                password: this.ruleForm.password,
                code: this.ruleForm.captcha
              }
            }).then(res => {
              //成功回调
              window.console.log(res);
            });
          } else {
            window.console.log("信息错误");
            return false;
          }
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //  登录点击获取验证码
    changeCaptcha() {
      //  用时间戳
      this.captchaURL =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&" + Date.now();
    },
    // 注册表单验证码
    changeRegCaptcha(){
         this.regFormCaptcha=`${process.env.VUE_APP_BASEURL}/captcha?type=sendsms&${Date.now()}`
    },
// 头像上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG \ PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
    .login-form {
      margin-top: 30px;
      .captcha {
        height: 40px;
        width: 100%;
      }
      .el-checkbox {
        display: flex;
        align-items: center;
        .el-checkbox__label {
          display: flex;
          align-items: center;
        }
      }
      .el-button {
        width: 100%;
        margin: 0;
      }
      .register-button {
        margin-top: 30px;
      }
    }
  }
  // 注册对话框样式
  .el-dialog {
    width: 630px;
    .el-dialog__header {
      text-align: center;
      background: linear-gradient(to right, #01c4fd, #1294fa);
      .el-dialog__title {
        color: white;
      }
    }
  }
  .register-captcha {
    width: 100%;
    height: 40px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
    // 头像居中
  .avatar-uploader {
    text-align: center;
  }
}
</style>