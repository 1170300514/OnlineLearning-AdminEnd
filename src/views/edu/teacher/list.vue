<template>
  <div class="app-container">
    讲师列表 
    <!-- 顶部查询表单 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
          <el-input v-model="teacherQuery.name" placeholder="讲师名"></el-input>
      </el-form-item>

      <el-form-item>
          <el-select v-model="teacherQuery.level" placeholder="讲师头衔">
            <el-option :value="1" label='高级讲师'></el-option>
            <el-option :value="2" label='首席讲师'></el-option>
          </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
          <el-date-picker
            v-model="teacherQuery.begin"
            type="datetime"
            placeholder="选择开始时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00"
            style="width: 100%;"
          ></el-date-picker>
          <!-- <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker> -->
      </el-form-item>

      <el-form-item>
          <el-date-picker
            v-model="teacherQuery.end"
            type="datetime"
            placeholder="选择截止时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00"
            style="width: 100%;"
          ></el-date-picker>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>
      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="名称" width="80" />

      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level===1?'高级讲师':'首席讲师' }}
        </template>
      </el-table-column>
      
      <el-table-column prop="intro" label="资历" />
      
      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column prop="sort" label="排序" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
            <!-- 通过隐藏路由跳转 -->
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页-->
    <el-pagination 
        :total="total" 
        :current-page="page" 
        :page-size="limit"
        style="padding: 30px 0; text-align: center;"
        layout="total, prev, pager, next, jumper"
        @current-change="getList" >
    </el-pagination>
  </div>
</template>

<script>
// 引入teacher.js文件
import teacher from '@/api/edu/teacher'

export default {

    data() { // 定义变量和初始值
        return {
            list: null,
            page:1,
            limit: 5,
            total:0,
            teacherQuery:{
                name:'',
                level:'',
                begin:'',
                end:'',
            }
        }
    },
    created() { // 页面渲染前执行
        // 调用
        this.getList()
    },
    methods: { // 创建具体方法
        // 讲师列表方法
        getList(page = 1) {
            this.page = page
            teacher.getTeacherListPage(this.page, this.limit, this.teacherQuery)
                .then(Response => {
                    // response接口返回的数据
                    this.list = Response.data.rows
                    this.total = Response.data.total
                    console.log(this.list)
                    console.log(this.total)
                })
        },
        resetData() { // 清空方法
            this.teacherQuery = {}
            this.getList()
        },
        removeDataById(id) { //删除方法
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                teacher.deleteTeacherId(id)
                    .then(Response => { // 删除成功
                        //提示信息
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        //回到列表页面
                        this.getList()
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    }

}
</script>

<style>

</style>