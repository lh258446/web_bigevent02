$(function () {
    //定义时间过滤器
    template.defaults.imports.dateFormat = function (dtstr) {
        var dt = new Date(dtstr)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    };
    //在各位数左侧补0
    function padZero(n) {
        return n > 9 ? n : '0' + n
    };
    //1.定义提交参数
    var q = {
        pagenum: 1,//页码值
        pagesize: 2,//每页显示几页
        cate_id: '',//文章分类的id
        state:''//文章的状态
    }

    //2.初始化文章列表
    initTable()
    function initTable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                var str = template('tpl-table', res)
                $('tbody').html(str)
                //分页
                renderPage(res.total)
            }
        })
    }

    //3.初始化分类
    var form = layui.form
    initCate()
    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.msg(res.message)
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }

    //4.筛选功能
    $('#form-search').on('submit', function (e) {
        e.prentventDefault()
        //获取
        var state = $('[name=state]').val()
        var caye_id = $('[name=cate_id]').val()
        //赋值
        q.state = state
        q.cate_id = caye_id
        // 初始化文章列表
        initTable()
    })

    //5.分页
    var laypage=layui.laypage
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,//数据总数
            limit: q.pagesize,//每页几条
            curr: q.pagenum,//第几页
            // 分页模块设置,显示哪些子模块
            layout: ['count', 'limit', 'prey', 'page', 'next', 'skip'],
            limits:[2,3,5,10],
            jump: function (obj, first) {
                //赋值
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                //首次不执行
                if (!first) {
                    initTable()
                }
            }
        })
    }

    //6.删除
    var layer = layui.layer
    $('tbody').on('click', '.btn-delete', function () {
        //先获取id
        var Id = $(this).attr('data-Id')
        //显示对话框
        layer.confirm('是否删除?', { icon: 3, title: '提示' }, function () {
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + Id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('恭喜你删除成功')
                    if($('.btn-delete').length == 1 && q.pagenum >1) q.pagenum --
                    initTable()
                }
            })
            layer.closeAll()
        })
    })
})