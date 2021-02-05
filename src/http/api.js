import Server from '../utils/request'

import user from './user'
import qs from 'qs'
function login(data) { //登录
    return Server({
        url: user.login,
        method: 'post',
        data: qs.stringify(data)
    })
}
function commodity(data) {
    return Server({
        url: user.commodity + data,
        method: 'get',
    })
}
function search(name, val) {
    return Server({
        url: user.search + name + '=' + val,
        method: 'get',
    })
}
function setsale(id, status) {
    return Server({
        url: `/api/manage/product/set_sale_status.do?productId=${id}&status=${status}`,
        method: 'get',
    })
}
function detailTo(id) {
    return Server({
        url: `/api/manage/product/detail.do?productId=${id}`,
        mthode: 'get'
    })
}
function selectList() {
    return Server({
        url: '/api/manage/category/get_category.do?categoryId=0',
        method: 'get'
    })
}
function selectList2(id) {
    return Server({
        url: `/api/manage/category/get_category.do?categoryId=${id}`,
        method: 'get'
    })
}
function cateGory() {
    return Server({
        url: '/api/manage/category/get_category.do?categoryId=0',
        method: 'get'
    })
}
function edit(id, name) {
    return Server({
        url: `/api/manage/category/set_category_name.do?categoryId=${id}&categoryName=${name}`,
        method: 'get'
    })
}
function detailCate(id) {
    return Server({
        url: `/api/manage/category/get_category.do?categoryId=${id}`,
        method: 'get'
    })
}
function edits(id, name) {
    return Server({
        url: `/api/manage/category/set_category_name.do?categoryId=${id}&categoryName=${name}`,
        method: 'get'
    })
}
function add(id, name) {
    return Server({
        url: `/api/manage/category/add_category.do?parentId=${id}&categoryName=${name}`,
        method: 'get',
    })
}
export default {
    login,
    commodity,
    search,
    setsale,
    detailTo,
    selectList,
    selectList2,
    cateGory,
    edit,
    detailCate,
    edits,
    add
}