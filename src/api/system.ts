import request from "./request";


export function getMenus(){
    return request({
        url: '/system/menus/getTree',
        method: 'get'
    })
}

export function uploadImage(data:FormData){
    return request({
        url: '/file/img',
        method: 'put',
        data,
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    })
}



