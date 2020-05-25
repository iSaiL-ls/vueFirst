module.exports = {
  papgenum: 0,
  papgesize: 5,
  total: 30,
  data: [{
    cat_id: 1,
    cat_name: '手机',
    cat_pid: 0,
    cat_level: 0,
    cat_deleted: false,
    children: [{
      cat_id: 11,
      cat_name: 'ios',
      cat_pid: 1,
      cat_level: 1,
      cat_deleted: false,
      children: [{
        cat_id: 111,
        cat_name: 'iphone11',
        cat_pid: 3,
        cat_level: 2,
        cat_deleted: false
      }, {
        cat_id: 112,
        cat_name: 'iphone8',
        cat_pid: 3,
        cat_level: 2,
        cat_deleted: true
      }, {
        cat_id: 113,
        cat_name: 'iphoneX',
        cat_pid: 3,
        cat_level: 2,
        cat_deleted: false
      }]
    }, {
      cat_id: 12,
      cat_name: '安卓',
      cat_pid: 1,
      cat_level: 1,
      cat_deleted: false,
      children: [{
        cat_id: 121,
        cat_name: '华为',
        cat_pid: 3,
        cat_level: 2,
        cat_deleted: false
      }, {
        cat_id: 122,
        cat_name: '小米',
        cat_pid: 3,
        cat_level: 2,
        cat_deleted: false
      }, {
        cat_id: 123,
        cat_name: '魅族',
        cat_pid: 3,
        cat_level: 2,
        cat_deleted: false
      }]
    }]
  }, {
    cat_id: 2,
    cat_name: '电脑',
    cat_pid: 0,
    cat_level: 0,
    cat_deleted: false,
    children: [{
      cat_id: 21,
      cat_name: 'ios',
      cat_pid: 1,
      cat_level: 1,
      cat_deleted: false,
      children: [{
        cat_id: 211,
        cat_name: 'macbook',
        cat_pid: 3,
        cat_level: 2,
        cat_deleted: false
      }]
    }, {
      cat_id: 22,
      cat_name: 'windows',
      cat_pid: 1,
      cat_level: 1,
      cat_deleted: false,
      children: [{
        cat_id: 221,
        cat_name: 'legion',
        cat_pid: 3,
        cat_level: 2,
        cat_deleted: false
      }]
    }]
  }, {
    cat_id: 3,
    cat_name: '家具',
    cat_pid: 0,
    cat_level: 0,
    cat_deleted: false,
    children: [{
      cat_id: 31,
      cat_name: '床',
      cat_pid: 1,
      cat_level: 1,
      cat_deleted: false,
      children: [{
        cat_id: 311,
        cat_name: '垃圾',
        cat_pid: 3,
        cat_level: 2,
        cat_deleted: false
      }]
    }]
  }]

}
