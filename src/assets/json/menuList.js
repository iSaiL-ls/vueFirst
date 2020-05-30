module.exports = {

  data: [{
      id: 101,
      authName: '用户管理',
      path: null,
      children: [{
        id: 104,
        authName: '用户列表',
        path: 'users',
        children: []
      }]
    },
    {
      id: 102,
      authName: '权限管理',
      path: null,
      children: [{
        id: 204,
        authName: '角色列表',
        path: 'roles',
        children: []
      }, {
        id: 205,
        authName: '权限列表',
        path: 'rights',
        children: []
      }]
    },
    {
      id: 103,
      authName: '商品管理',
      path: null,
      children: [{
        id: 304,
        authName: '商品列表',
        path: 'goods',
        children: []
      }, {
        id: 305,
        authName: '分类参数',
        path: 'params',
        children: []
      }, {
        id: 306,
        authName: '商品分类',
        path: 'categories',
        children: []
      }]
    },
    {
      id: 104,
      authName: '订单管理',
      path: null,
      children: [{
        id: 404,
        authName: '订单列表',
        path: 'orders',
        children: []
      }]
    }, {
      id: 105,
      authName: '数据统计',
      path: null,
      children: [{
        id: 504,
        authName: '数据报表',
        path: 'reports',
        children: []
      }]
    }
  ],
  meta: {
    msg: '获取菜单列表成功',
    status: 200
  }

}
