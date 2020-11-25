$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    //3.自定义验证规则
    var form = layui.form
    form.verify({
        //密码规则
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6-12位,且不能输入空格'
        ],
        //确认密码规则
        repwd: function (value) {
            var pwd = $('.reg-box input[name=password]').val()
            //比较
            if (value !== pwd) {
                return '两次输入密码不一致'
            }
        }
    })


    //4.注册功能
    var layer=layui.layer
    $('#form_reg').on('submit', function (e) {
        //阻止表单提交
        e.preventDefault()
        //发送ajax
        $.ajax({
            method: 'post',
            url: '/api/register',
            data: {
                username:$('.reg-box [name=username]').val(),
                password:$('.reg-box [name=password]').val()
            },
            success: function (res) {
                //返回状态判断
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //提交成功后处理代码
                layer.msg('注册成功,请登录')
                //手动切换登录表单
                $('#link_login').click()
                //重置form表单
                $('#form_reg')[0].reset()
            }
        })
    })
    //5.登录功能
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                //校验返回状态
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //提交信息,保存token
                layer.msg('恭喜您,登录成功')
                //保存token
                localStorage.setItem('token', res.token)
                //跳转
                location.href='/index.html'
            }
        })
    })
})