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

export default {
    login,
}