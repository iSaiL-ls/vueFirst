module.exports = {

  data: {
    total: 5,
    editForm: {
      username: 'lisailisai',
      email: '631215380@qq.com',
      mobile: '17732279836'
    },
    queryInfo: {

      query: '',
      // 当前的页数
      pagenum: 1,
      // 每页显示多少条数据
      pagesize: 2

    },
    // pagenum: 1,
    users: [{
        id: 1,
        username: 'admin',
        mobile: '13292912073',
        type: 1,
        email: '2450744599@qq.com',
        create_time: '2020-01-01T20:36.000Z',
        msg_status: true, // 用户当前状态
        role_name: '垃圾管理员'
      }, {
        id: 2,
        username: 'lisai',
        mobile: '13292912073',
        type: 2,
        email: '2450744599@qq.com',
        create_time: '2020-01-01T20:36.000Z',
        msg_status: false, // 用户当前状态
        role_name: '超级用户'
      },
      {
        id: 3,
        username: 'lisai2',
        mobile: '13292912073',
        type: 2,
        email: '2450744599@qq.com',
        create_time: '2020-01-01T20:36.000Z',
        msg_status: false, // 用户当前状态
        role_name: '超级用户'
      }, {
        id: 4,
        username: 'lisai3',
        mobile: '13292912073',
        type: 2,
        email: '2450744599@qq.com',
        create_time: '2020-01-01T20:36.000Z',
        msg_status: false, // 用户当前状态
        role_name: '超级用户'
      }, {
        id: 5,
        username: 'lisai5',
        mobile: '13292912073',
        type: 2,
        email: '2450744599@qq.com',
        create_time: '2020-01-01T20:36.000Z',
        msg_status: false, // 用户当前状态
        role_name: '超级用户'
      }
    ]

  },
  meta: {
    msg: '获取菜单列表成功',
    status: 200
  }

}
