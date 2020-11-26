$(function () {
    //1.定义规则
    var form = layui.form
    form.verify({
        //1.密码
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 1.2 新旧不重复
        samePwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '原密码和酒密码不能一样'
            }
        },
        // 1.3l两次密码必须相同
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次新密码输入不一致'
            }
        }
    })


    //2.表单提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layer.msg('修改密码成功!')
                $('.layui-form')[0].reset()
            }
        })
    })
})