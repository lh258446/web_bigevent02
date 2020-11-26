$(function () {
    //1.自定义规则
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度为1~6个字符'
            }
        }
    })

    //2.用户渲染
    initUserInfo()
    //到处layer
    var layer = layui.layer
    //封装函数
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //成功后渲染
                form.val('formUserInfo',res.data)
            }
        })
    }
    //3.表单重置
    $('#btnReset').on('click', function (e) {
        //阻止重置
        e.preventDefault()
        //从新用户渲染
        initUserInfo()
    })

    //4.修改用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.mag('用户信息修改失败!')
                }
                layer.msg('恭喜你,用户信息修改成功!')
                window.parent. getUserInfo()
            }
        })
    })
})