import request from '@/utils/request'

export default {
    //===================添加课程部分================
    // 1. 添加课程信息
    addCourseInfo(courseInfo) {
        return request({
            url: '/eduservice/educourse/addCourse',
            method:'post',
            data: courseInfo,
        })
    },
    // 2. 查询所有讲师
    getListTeacher() {
        return request({
            url: '/eduservice/edu-teacher/findAll',
            method: 'get',
        })
    },
    // 根据课程id查询课程
    getCourseInfoById(courseId) {
        return request({
            url: '/eduservice/educourse/getCourseInfo/'+courseId,
            method: 'get',
        })
    },
    // 修改课程信息
    updateCourseInfo(courseInfo) {
        return request({
            url: '/eduservice/educourse/updateCourseInfo',
            method: 'post',
            data: courseInfo,
        })
    },
    // 课程最终信息展示
    getPublishCourseInfo(id) {
        return request({
            url: '/eduservice/educourse/getPublishCourseId/'+id,
            method: 'get',
        })
    },
    // 课程最终发布
    publishCourse(id) {
        return request({
            url: '/eduservice/educourse/publishCourse/'+id,
            method: 'post',
        })
    },
    //===================课程列表部分============
    getListCourse() {
        return request({
            url: '/eduservice/educourse/getAllCourseList',
            method: 'get',
        })
    },
    // 条件查询带分页
    getPageCourseCondition(current, limit, courseQuery) {
        return request({
            url: '/eduservice/educourse/pageCourseCondition/'+current+'/'+limit,
            method: 'post',
            data: courseQuery,
        })
    },
    // 删除课程
    deleteCourseById(id) {
        return request({
            url: '/eduservice/educourse/deleteCourse/'+id,
            method: 'delete',
        })
    },
}