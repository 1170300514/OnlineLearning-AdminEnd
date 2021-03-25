<template>
  <div class="app-container">
    讲师表单
     <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" min="0"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- 讲师头像：TODO -->
      <el-form-item label="讲师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar"/>
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
        </el-button>
        <!--
            v-show：是否显示上传组件
            :key：类似于id，如果一个页面多个图片上传控件，可以做区分
            :url：后台上传的url地址
            @close：关闭上传组件
            @crop-upload-success：上传成功后的回调 -->
         <image-cropper
            v-show="imagecropperShow"
            :width="300"
            :height="300"
            :key="imagecropperKey"
            :url="BASE_API+'/eduoss/fileoss'"
            field="file"
            @close="close"
            @crop-upload-success="cropSuccess"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
// 引入teacher.js文件
import teacher from '@/api/edu/teacher'
// 引入上传图片组件
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
    // 声明组件
    components:{ ImageCropper, PanThumb },
    data() {
        return {
            teacher:{
                name: '',
                sort: 0,
                level: 1,
                career: '',
                intro: '',
                avatar: ''
            },
            saveBtnDisabled:false,  // 保存按钮是否禁用,
            // 上传图像弹框
            imagecropperShow:false,
            imagecropperKey:0,// 上传组件key值
            BASE_API:process.env.BASE_API, // 获取dev.env.js里面地址
        }
    },
    created() {
        this.init()
    },
    watch: { // 监听
        $route(to, from) { // 路由变化方式 路由变化方法就会执行
            console.log('watch $route')
            this.init()
        }
    },
    methods: {
        // 关闭上传弹框
        close() {
            this.imagecropperShow=false
            // 上传组件初始化
            this.imagecropperKey = this.imagecropperKey+1
        },
        // 上传成功方法
        cropSuccess(data) {
            this.imagecropperShow=false
            this.teacher.avatar = data.url
            this.imagecropperKey = this.imagecropperKey+1
        },
        init() {
            // 判断路径中是否传入id值,有id则做修改
            if(this.$route.params && this.$route.params.id) {
                // 从路径中获取id
                const id = this.$route.params.id
                // 获取数据回显
                this.getInfo(id)
            } else {
                this.teacher = {}
            }
        },
        // 根据讲师id查询信息 用于修改时回显信息
        getInfo(id) {
            teacher.getTeacherInfo(id)
                .then(Response => {
                    this.teacher = Response.data.item
                })
        },
        saveOrUpdate() {
            // 判断修改还是添加
            // 根据teacher是否有id判断 有id为修改没有id为添加
            if(!this.teacher.id) {
                // 添加
                this.saveTeacher()
            } else {
                // 修改
                this.updateTeacher()
            }
        },

        // 修改讲师
        updateTeacher() {
            teacher.updateTeacher(this.teacher).then(Response => {
                this.$message({
                    type: 'success',
                    message: '修改成功!'
                })
                // 回到列表页面 路由跳转
                this.$router.push({path: '/teacher/table'})
            })
        },
        // 添加讲师
        saveTeacher() {
            teacher.addTeacher(this.teacher)
                .then(Response => {
                    // 添加成功提示信息
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    })
                    // 回到列表页面 路由跳转
                    this.$router.push({path: '/teacher/table'})
                })
        }
    },
}
</script>

<style>

</style>