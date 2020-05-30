module.exports = {
  options: {
    title: {
      text: '用户来源'

    },
    tooltio: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#E9eef3'
        }
      }
    },
    legend: {
      data: ['销量']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      data: ['手机', '电脑', '硬盘', '玩具', '游戏']
    }],
    yAxis: [{
      data: ['1%', '2%', '3%']
    }],
    serices: [{
      nme: '销量',
      type: 'bar',
      data: [5, 20, 30, 45, 10, 20, 33]
    }]
  }

}
