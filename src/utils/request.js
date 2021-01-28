import axios from 'axios';

// import { Loading, Message } from 'element-ui';

// import config from '../config';

// let { baseUrl } = config;

// let loading;

const Server = axios.create({
    baseURL: '',
    timeout: 5000,
    withCredentials: true
})
Server.interceptors.request.use(config => {
    // if (!config.hideloading) {
    //     loading = Loading.service({
    //         text: '拼命加载中.....',
    //         spinner: 'el-icon-loading',
    //         background: 'rgba(0,0,0,0.7)',
    //         // forbidClick: true
    //     });
    // }

    // let token = sessionStorage.getItem('token');
    // config.headers.Authorization = 'Bearer ' + token;

    return config;
}, error => {
    Message.error({ message: '连接不到服务器，请稍后再试', offset: 150 });
    return Promise.reject(error);
})

Server.interceptors.response.use(response => {
    // loading.close();
    if (response.status == 200) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(response);
    }
}, error => {
    return Promise.reject(error);
})

export default Server
