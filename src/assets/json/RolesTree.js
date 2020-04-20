module.exports = {
  data: [{
    id: 101,
    authName: '商品管理',
    path: 'goods',
    children: [{
      id: 1011,
      authName: '商品列表',
      path: 'goods',
      children: [{
        id: 10111,
        authName: '商品修改',
        path: 'goods'
      }, {
        id: 10112,
        authName: '商品删除',
        path: 'goods'
      }, {
        id: 10113,
        authName: '更新商品图片',
        path: 'goods'
      }, {
        id: 10114,
        authName: '更新商品属性',
        path: 'goods'
      }, {
        id: 10115,
        authName: '更新商品状态',
        path: 'goods'
      }, {
        id: 10116,
        authName: '获取商品详情',
        path: 'goods'
      }]
    }, {
      id: 1012,
      authName: '分类参数',
      path: 'goods',
      children: [{
        id: 10121,
        authName: '获取参数列表',
        path: 'goods'
      }, {
        id: 10122,
        authName: '创建商品参数',
        path: 'goods'
      }, {
        id: 10123,
        authName: '删除商品参数',
        path: 'goods'
      }]
    }, {
      id: 1013,
      authName: '商品分类',
      path: 'goods',
      children: [{
        id: 10131,
        authName: '添加分类',
        path: 'goods'
      }, {
        id: 10132,
        authName: '删除分类',
        path: 'goods'
      }, {
        id: 10133,
        authName: '获取分类详情',
        path: 'goods'
      }]
    }]
  }, {
    id: 102,
    authName: '订单管理',
    path: 'orders',
    children: [{
      id: 1021,
      authName: '订单列表',
      path: 'orders',
      children: [{
        id: 10211,
        authName: '添加订单',
        path: 'orders'
      }, {
        id: 10212,
        authName: '删除订单',
        path: 'orders'
      }, {
        id: 10213,
        authName: '获取订单详情',
        path: 'orders'
      }]
    }]
  }, {
    id: 103,
    authName: '权限管理',
    path: 'roles',
    children: [{
      id: 1031,
      authName: '角色列表',
      path: 'roles',
      children: [{
        id: 10311,
        authName: '添加角色',
        path: 'roles'
      }, {
        id: 10312,
        authName: '删除角色',
        path: 'roles'
      }, {
        id: 10313,
        authName: '角色授权',
        path: 'roles'
      }, {
        id: 10314,
        authName: '取消角色授权',
        path: 'roles'
      }, {
        id: 10315,
        authName: '获取角色列表',
        path: 'roles'
      }, {
        id: 10316,
        authName: '获取角色详情',
        path: 'roles'
      }, {
        id: 10317,
        authName: '更新角色信息',
        path: 'roles'
      }, {
        id: 10318,
        authName: '更新角色权限',
        path: 'roles'
      }]
    }, {
      id: 1032,
      authName: '权限列表',
      path: 'orders',
      children: [{
        id: 10321,
        authName: '查看权限',
        path: 'orders'
      }]
    }]
  }, {
    id: 104,
    authName: '用户管理',
    path: 'users',
    children: [{
      id: 1041,
      authName: '用户列表',
      path: 'users',
      children: [{
        id: 10411,
        authName: '添加用户',
        path: 'users'
      }, {
        id: 10412,
        authName: '删除用户',
        path: 'users'
      }, {
        id: 10413,
        authName: '更新用户',
        path: 'users'
      }, {
        id: 10414,
        authName: '获取用户详情',
        path: 'users'
      }, {
        id: 10415,
        authName: '分配用户角色',
        path: 'users'
      }]
    }]
  }, {
    id: 105,
    authName: '数据统计',
    path: 'roles',
    children: [{
      id: 1051,
      authName: '数据报表',
      path: 'roles',
      children: [{
        id: 10511,
        authName: '查看数据',
        path: 'roles',
        children: []
      }]
    }]
  }]

}
