$(function () {
    getUserInfo()


    //  退出点击事件2
    var layer = layui.layer

    $('#btnLogout').on('click', function () {
        //  提示用户是否确认退出
        layer.confirm('确认退出登录？', {
                icon: 3,
                title: '提示'
            },
            function (index) {
                localStorage.removeItem('token')
                location.href = '/login.html'
                layui.close(index)
            })
    })
})

//  获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //  headers  就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('thkon') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        }
    })
}

//  渲染用户头像
function renderAvatar(user) {
    //  获取用户的名称
    var name = user.nickname || user.username
    $('#welcome').html("欢迎&nbsp;&nbsp;" + name)
    //  按需选软用户的头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}