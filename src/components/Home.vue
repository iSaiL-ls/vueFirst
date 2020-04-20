<template>
  <el-container class="home-contatiner">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img
          src="../assets/logo.png"
          style="
      width: 22%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    "
        />
        <span>iSaiL管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主题 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="iscollapse?'64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单去 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409bff"
          unique-opened
          :collapse="iscollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单的模板 -->
            <template slot="title">
              <i :class="iconsObj[item.id]+''"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/'+subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/'+subItem.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧主体 -->
      <el-main>
        <!-- Welcome路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入的假数据
import menuList from '../assets/json//menuList'
const menulists = menuList.data
// console.log(menuList)
// console.log(menulists)

export default {
  data () {
    // this.menulist = menulists
    return {
      menulist: menulists,
      iconsObj: {
        101: 'iconfont icon-yonghu',
        102: 'iconfont icon-permissions',
        103: 'iconfont icon-mima',
        104: 'iconfont icon-order',
        105: 'iconfont icon-shuju'
      },
      // 是否折叠
      iscollapse: false,
      // 被激活的链接地址
      activePath: ''

    }
  },
  created () {
    this.getMenList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 点击按钮的折叠与展开
    toggleCollapse () {
      this.iscollapse = !this.iscollapse
    },
    // 从后台左侧菜单列表数据
    async getMenList () {
      // 由于没有后台不能使用这种方式 所以我选择直接定义一个数组对象来渲染数据到页面中
      // const { data: res } = await this.$http.get('menus')
      // if (res.meta.status !== 200) return this.$message.error.(res.meta.msg)
      // this.menulist = res.data
    },
    // 保存链接的激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoed>
.home-contatiner{
  height: 100%;
}
.el-header{
  display: flex;
  background-color: #373d41;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  >div{
    display: flex;
    align-items: center;
    >span{
      padding-left: 10px;
    }
  }
}
.el-aside{
  background-color: #333744;
  .el-menu{
    border-right: 0;
  }

}
.el-main{
  background-color: #eaedf1;

}
.iconfont{
  margin-right: 5px;
}
.toggle-button{
  background-color: #4a5064;
  color: #fff;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

</style>
