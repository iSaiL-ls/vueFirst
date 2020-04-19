<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片试图去 -->
    <el-card>
      <!-- 搜索与添加 -->
      <div style="margin-top: 15px;">
        <el-row :gutter="20">
          <el-col :span="7">
            <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
              <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <!-- scope.row是整个这一行的数据 -->
            <el-switch v-model="scope.row.msg_status" @change="userStateChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserById(scope.row.id)"
            ></el-button>
            <!-- 分配权限 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-s-tools" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加用户的对话框 -->
      <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
        <!--  内容主体去 -->
        <el-form :model="addFrom" :rules="addFromrules" ref="ruleFormRef" label-width="70px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addFrom.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addFrom.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addFrom.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="addFrom.mobile"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改用户的对话框 -->
      <el-dialog
        title="修改用户"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="editDialogClose"
      >
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
          <el-form-item label="用户名">
            <el-input v-model="editForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="editForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size.sync="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
import usersList from '../../assets/json/usersList'
const userslist = usersList.data.users
const editForm = usersList.data.editForm
// console.log(userslist)

export default {
  data () {
    // 验证邮箱
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法邮箱'))
    }
    // 验证手机号
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法手机号'))
    }
    return {
      // 获取用户列表的参数对象

      queryInfo: {
        // 搜索框
        query: '',
        // 当前的页数
        pagenum: 1,
        // 每页显示多少条数据
        pagesize: 2
      },
      userlist: [],
      total: 0,
      // 控制添加用户的对话框
      addDialogVisible: false,
      // 添加用户表单
      addFrom: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 查询到的用户信息对象
      editForm: {},
      // 添加表单的验证规则
      addFromrules: {
        username: [{
          required: true, message: '请输入用户名', trigger: 'blur'
        }, {
          min: 3, max: 10, message: '用户名的长度在3~10哥字符之间', trigger: 'blur'
        }],
        password: [{
          required: true, message: '请输入密码', trigger: 'blur'
        }, {
          min: 6, max: 16, message: '用户名的长度在6~16哥字符之间', trigger: 'blur'
        }],
        email: [{
          required: true, message: '请输入邮箱', trigger: 'blur'
        }, { validator: checkEmail, trigger: 'blur' }],
        mobile: [{
          required: true, message: '请输入手机号', trigger: 'blur'
        }, { validator: checkMobile, trigger: 'blur' }]
      },
      // 修改表单的验证规则对象
      editFormRules: {
        email: [{
          required: true, message: '请输入邮箱', trigger: 'blur'
        }, { validator: checkEmail, trigger: 'blur' }],
        mobile: [{
          required: true, message: '请输入手机号', trigger: 'blur'
        }, { validator: checkMobile, trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      console.log('huoqushuju ')

      // 因为没有后台所以使用假数据进行渲染
      // const { data: res } = this.$http.get('users', { params: this.queryInfo })
      // if (res.meta.status !== 200) return this.$message.error('获取用户列表失败')
      // this.userlist = res.data.userlist
      // this.total = res.data.total

      // 假数据赋值
      this.userlist = userslist
      this.total = usersList.data.total
    },
    // 监听pagesize改变事件
    handleSizeChange (val) {
      // console.log('页面获取到的' + val)

      this.queryInfo.pagesize = val
      this.getUserList()
      // console.log('改变之后的' + this.queryInfo.pagesize)
    },
    // 监听页码值改变的事件 可以拿到最新的页码值
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    async userStateChanged (userinfo) {
      // 监听switch的开关
      const { data: res } = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_status}`)
      if (res.meta.status !== 200) {
        userinfo.meg_status = !this.userinfo.status
        return this.$message.error('更新用户状态失败')
      }
      this.$message.success('成功')
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed () {
      this.$refs.ruleFormRef.resetFields()
    },
    // 点击按钮添加用户
    addUser () {
      this.$refs.ruleFormRef.validate(async valid => {
        if (!valid) return
        // 由于没有后台只能注掉请求同时不会添加数据到页面
        // const { data: res } = this.$http.post('users', this.addFrom)
        // if (res.meta.status !== 201) { this.$message.error('添加失败') }
        this.$message.success('添加成功')
        this.addDialogVisible()
        this.getUserList()
        // 既可以发起添加用户的网络请求
      })
    },
    // 展示编辑用户的对话框
    async showEditDialog (id) {
      // const { data: res } = await this.$http.get('users/' + id)
      // if (res.meta.status !== 200) { return this.$message.error('查询用户失败') }
      // this.editForm = res.data\
      this.editForm = editForm
      this.editDialogVisible = true
    },
    // 监听修改用户对话框的关闭事件
    editDialogClose () {
      this.$refs.editFormRef.resetFields()
    },
    // 修改用户信息并提交
    editUserInfo () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        // 发起修改用户信息的数据请求

        // 由于咩有后台所以注掉异步操作   这一部分是验证完信息的时候去后台发送数据进行数据库修改并返回一个状态信息验证是否成功
        // const { data: res } = await this.$http.put('users', +this.editForm.id, { email: this.editForm.email, mobile: this.editForm.mobile })
        // if (res.meta.status !== 200) { return this.$message.error('修改用户失败') }
        // 关闭对话框
        this.editDialogVisible = false
        this.getUserList()
        this.$message.success('修改用户信息成功')
      })
    },
    // 根据id删除用户
    async removeUserById (id) {
      // 弹窗提示
      const confirmResult = await this.$confirm('你TM敢删我?', '恐吓', {
        confirmButtonText: '我敢',
        cancelButtonText: '我不敢',
        type: 'warning'
      }).catch(err => err)
      // 如果用户确认删除，则返回字符串 confirm
      // 如果用过户取消删除，则返回值为字符串 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('就知道你不敢')
      }
      const { data: res } = await this.$http.delete('users/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('就这点实力也想要删我？')
      }
      return this.$message.success('算你狠')
    }
  }
}
</script>
<style lang="less" scoped>

</style>
