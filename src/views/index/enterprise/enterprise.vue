<template>
  <div class="enterprise-container">
    <!-- 头部卡片 -->
    <el-card class="head-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号">
          <el-input class="short-input" style="width:100px" v-model="formInline.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="formInline.name" style="width:130px"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input class="short-input" style="width:100px" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" style="width:130px" placeholder="请选择状态">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="btn-form-item">
          <el-button type="primary" @click="getData">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button @click="addFormVisible = true" type="primary" icon="el-icon-plus">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 身体卡片 -->
    <el-card class="body-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="eid" label="企业编号"> </el-table-column>
        <el-table-column prop="name" label="企业名称"> </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">
            {{ scope.row.create_time | formatTime }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span class="red" v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="changeStatus(scope.row)">{{
              scope.row.status === 1 ? "禁用" : "启用"
            }}</el-button>
            <el-button type="text" @click="removeItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pageSizes"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 新增框 -->
    <addDialog></addDialog>
    <!-- 编辑框 -->
    <editDialog ref='editDialog'></editDialog>
  </div>
</template>

<script>
// 导入 新增框
import addDialog from "./components/addDialog.vue";
// 导入 编辑框
import editDialog from "./components/editDialog.vue";
// 导入 企业列表接口
import { enterpriseList, enterpriseRemove,enterpriseStatus } from "../../../api/enterprise";
export default {
  name: "enterprise",
  // 注册组件
  components: {
    addDialog,editDialog
  },
  created() {
    this.getData();
  },
  methods: {
    showEdit(item){
      // 显示编辑框
      this.editFormVisible = true;
      // 传递给编辑框 数据
      this.$refs.editDialog.editForm = JSON.parse(JSON.stringify(item))
    },
    // 修改状态
    changeStatus(item){
      enterpriseStatus({id:item.id}).then(res=>{
         if(res.code===200){
              this.$message.success("修改状态成功")
              this.getData()
            }
      })
    },
    // 数据删除
    removeItem(item) {
      this.$confirm("你要删除嘛？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          enterpriseRemove({ id: item.id }).then(res => {
            // window.console.log(res)
            if(res.code===200){
              this.$message.success("删除成功")
              this.getData()
            }
          });
        })
        .catch(() => {});
    },
    // 容量改变
    handleSizeChange(size) {
      this.limit = size;
      // 重新获取数据
      this.getData();
    },
    // 页码改变
    handleCurrentChange(page) {
      this.page = page;
      this.getData();
    },
    // 清除数据
    clear() {
      // 遍历 直接设置空对象
      this.formInline = {};
      // 不能给空字符串
      // this.formInline =''
      this.getData();
    },
    getData() {
      enterpriseList({
        page: this.page,
        limit: this.limit,
        ...this.formInline // 展开运算符（扩展运算符）
      }).then(res => {
        // window.console.log(res)
        this.tableData = res.data.items;
        // 保存总条数
        this.total = res.data.pagination.total;
      });
    }
  },
  data() {
    return {
      // 筛选表单
      formInline: {},
      // 表格数据
      tableData: [],
      // 是否显示新增框
      addFormVisible: false,
      // 是否显示 编辑框
      editFormVisible:false,
      // 页码
      page: 1,
      // 页容量
      limit: 4,
      // 页容量 数组
      pageSizes: [2, 4, 6, 9],
      // 总条数
      total: 0
    };
  }
};
</script>

<style lang="less">
.enterprise-container {
  .head-card {
    // // 设置按钮的容器尺寸
    // .el-form-item__content {
    //   width: 149px;
    // }
    // .short-input .el-form-item__content {
    //   width: 100px;
    // }
    .btn-form-item .el-form-item__content {
      width: 100%;
    }
  }

  // 分页
  .el-pagination {
    text-align: center;
    margin-top: 30px;
  }
  .body-card {
    margin-top: 19px;
  }

  // 高亮的span
  span.red {
    color: #ff4b4b;
  }
}
</style>
