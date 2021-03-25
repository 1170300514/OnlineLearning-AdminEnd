import request from '@/utils/request'

export default {

    // 1 讲师列表(条件查询分页)
    getTeacherListPage(current,limit,teacherQuery) {
        return request({
            url: '/eduservice/edu-teacher/pageTeacherCondition/' + current + "/" + limit,
            method: 'post',
            // teacherQuery条件对象，后端使用RequestBody获取对象
            // data表示把对象转换为json传递到接口中
            data: teacherQuery,
        })
    },
    // 删除讲师
    deleteTeacherId(id) {
        return request({
            url: '/eduservice/edu-teacher/'+id,
            method: 'delete',
        })
    },
    // 添加讲师
    addTeacher(teacher) {
        return request({
            url:'/eduservice/edu-teacher/addTeacher',
            method:'post',
            data: teacher
        })
    },

    // 根据id查询讲师信息
    getTeacherInfo(id) {
        return request({
            url: '/eduservice/edu-teacher/getTeacher/'+id,
            method: 'get',
        })
    },

    // 根据id修改讲师信息
    updateTeacher(teacher) {
        return request({
            url: '/eduservice/edu-teacher/updateTeacher',
            method: 'post',
            data: teacher,
        })
    }
}
