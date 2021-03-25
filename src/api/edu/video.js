import request from '@/utils/request'

export default {
    // 添加小节
    addVideo(video) {
        return request({
            url: '/eduservice/edu-video/addVideo',
            method: 'post',
            data: video,
        })
    },
    // 删除小节
    deleteVideo(id) {
        return request({
            url: '/eduservice/edu-video/'+id,
            method: 'delete',
        })
    },
    // 修改小节
    updateVideo(video) {
        return request({
            url: '/eduservice/edu-video/updateVideo',
            method: 'post',
            data: video,
        })
    },
    // 删除视频
    deleteAliyunVideo(id) {
        return request({
            url: '/eduvod/video/removeVideo/'+id,
            method: 'delete',
        })
    }
}