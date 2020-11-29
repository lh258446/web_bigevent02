var baserURL = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (params) {
    params.url = baserURL + params.url
    //对需要权限的接口配置头信息
    if (params.url.indexOf('/my/') !== -1) {
        params.headers = {
            Authorization:localStorage.getItem('token') || ''
        }
    }

    //3.拦截
    params.complete = function (res) {
        // console.log(res.responseJSON);
        var obj = res.responseJSON
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            localStorage.removeItem('token')
            location.href='/login.html'
        }
    }
})