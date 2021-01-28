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
export default {
    login,
    commodity,
    search
}