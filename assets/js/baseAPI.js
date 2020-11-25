var baserURL = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (params) {
    params.url=baserURL+params.url
})