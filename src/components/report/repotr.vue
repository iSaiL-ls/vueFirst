<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 2.为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main" style="width: 600px;height:400px;"></div>
    </el-card>
  </div>
</template>
<script>
// 1. 导入echarts
import echarts from 'echarts'
import shju from '../../assets/json/shju'
import _ from 'lodash'
export default {
  data () {
    return {
      // 需要合并的数据
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
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          boundaryGap: false
        }],
        yAxis: [{
          type: 'value'
        }]
      }
    }
  },
  created () { },
  // 当dom加载完后执行
  mounted () {
    // 3.基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))

    // 向后台发请求要数据
    // const { data: res } = await this.$http.get('reports/type/1')
    // if (res.meta.status !== 200) {
    //   return this.$message.error('获取信息失败')
    // }

    // 4.准备配置项和数据
    // 指定图表的配置项和数据
    // 5. 展示数据
    // 使用刚指定的配置项和数据显示图表。
    const result = _.merge(shju.options, this.options)
    myChart.setOption(result)
  },
  methods: {}
}
</script>
<style lang="less" scoped>

</style>
