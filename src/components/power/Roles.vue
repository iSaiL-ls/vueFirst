<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加角色对话框 -->
    <el-dialog
      title="添加角色"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addRolesDialogCloesd"
    >
      <!-- 内容主体区 -->
      <el-form :model="addRolesForm" :rules="addFromrules" ref="addFormRef" label-width="90px">
        <el-form-item label="角色名称" prop="authName">
          <el-input v-model="addRolesForm.authName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRolesForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoles">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改角色对话框 -->
    <el-dialog
      title="编辑角色信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClose"
    >
      <!-- 主体 -->
      <el-form :model="addRolesForm" :rules="editFromrules" ref="editFormRef" label-width="90px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRolesForm.roleName" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editRolesForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRolesDialogClose">取 消</el-button>
        <el-button type="primary" @click="editRolesInfo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加角色按钮区 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addDialogVisible=true">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表区 -->
      <el-table border stripe :data="rolelist">
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- 页面渲染 栅格布局 -->
            <el-row
              :class="['dbbottom',i1===0?'dbtop':'','vcenter']"
              v-for="(item1,i1) in scope.row.children"
              :key="item1.id"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row,item.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <!-- 通过for循环渲染二级权限 -->
                <el-row
                  :class="[i2===0?'':'dbtop','vcenter']"
                  v-for="(item2,i2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(scope.row,item2.id)"
                    >{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      :class="[i3===0?'':'dbtop']"
                      v-for="(item3,i3) in item2.children"
                      :key="item3.id"
                      closable
                      @close="removeRightById(scope.row,item3.id)"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <!-- <template slot-scope="scope"> -->
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            >编辑</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeRoliesById(scope.row.id)"
            >删除</el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="showSetRightDialog(scope.row)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- f分配权限的对话框 -->
    <el-dialog
      title="你想让他干啥他就干啥"
      :visible.sync="setRightdialogVisible"
      width="50%"
      @close="setRightDialogClosed"
    >
      <!-- 树形控件 -->
      <el-tree
        :data="rightsTree"
        :props="treeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys"
        ref="treeRef"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// 倒入假数据
import rolesList from '../../assets/json/RolesList'
import rolesTree from '../../assets/json/RolesTree'
// console.log(rolesList.data)
// console.log(rolesTree)

const editForm = rolesList.editForm

export default {
  data () {
    return {
      // 通过打开分配权限对话框的时候保存下来然后 点击确定的时候来传给后台
      roleId: '',
      //  默认选中的节点Id值的数组
      defKeys: [],
      // 树形控件的绑定对象
      treeProps: {
        label: 'authName',
        children: 'children'
      },

      // 分配权限的树形控件数据
      rightsTree: [],
      // 控制分配权限对话框的显示与隐藏
      setRightdialogVisible: false,
      // 所有角色的列表
      rolelist: [],
      // 隐藏添加角色表单
      addDialogVisible: false,
      // 添加角色表单
      addRolesForm: {
        authName: '',
        roleDesc: ''
      },
      // 编辑角色的对话框隐藏
      editDialogVisible: false,
      // 修改角色表单
      editRolesForm: {
        roleName: '',
        roleDesc: ''
      },
      // 修改表单验证规则
      editFromrules: {
        roleDesc: [
          // 这个不知道是什么问题一直编辑不成功
          // { required: true, message: '请输入角色描述', trigger: 'blur' },
          {
            min: 1, max: 20, message: '角色名的长度在3~20哥字符之间', trigger: 'blur'
          }]
      },

      // 表单规则验证
      addFromrules: {
        authName: [{
          required: true, message: '请输入角色名', trigger: 'blur'
        }, {
          min: 1, max: 10, message: '角色名的长度在1~10哥字符之间', trigger: 'blur'
        }],
        roleDesc: [{
          required: true, message: '请输入角色描述', trigger: 'blur'
        }, {
          min: 3, max: 20, message: '角色名的长度在3~20哥字符之间', trigger: 'blur'
        }]
      }
    }
  },
  created () {
    this.getRolesList()
  },
  methods: {
    async getRolesList () {
      // 还是因为没有后台所以我要注掉然后导入假数据
      // const { data: res } = await this.$http('roles')
      // if (res.meta.status !== 200) {
      //   return this.$message.error('获取角色列表失败')
      // }
      // this.rolelist = res.data

      this.rolelist = rolesList.data
    },
    // 添加角色
    addRoles () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // 由于没有后台只能注掉请求同时不会添加数据到页面
        // const { data: res } = this.$http.post('users', this.addRolesForm)
        // if (res.meta.status !== 201) { this.$message.error('添加失败') }
        this.$message.success('添加成功')
        this.addDialogVisible = false
        this.getRolesList()

        // 既可以发起添加用户的网络请求
      })
    },
    // 监听添加用户对话框的关闭事件
    addRolesDialogCloesd () {
      this.$refs.addFormRef.resetFields()
    },
    // 点击确定按钮提交修改信息
    editRolesInfo () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        // 发起修改用户信息的数据请求

        // 由于咩有后台所以注掉异步操作   这一部分是验证完信息的时候去后台发送数据进行数据库修改并返回一个状态信息验证是否成功
        // const { data: res } = await this.$http.put('users', +this.editForm.id, { email: this.editForm.email, mobile: this.editForm.mobile })
        // if (res.meta.status !== 200) { return this.$message.error('编辑角色信息失败') }

        // 关闭对话框
        this.editDialogVisible = false
        this.getRolesList()
        this.$message.success('编辑角色信息成功')
      })
    },
    // 监听修改用户对话框的关闭事件
    editDialogClose () {
      this.$refs.editFormRef.resetFields()
    },
    // 点击编辑按钮根据id查找用户信息
    async showEditDialog (id) {
      // const { data: res } = await this.$http.get('roles//' + id)
      // if (res.meta.status !== 200) { return this.$message.error('查询用户失败') }
      // this.editForm = res.data

      this.editRolesForm = editForm
      this.editDialogVisible = true
    },
    // 修改角色信息里面的取消按钮
    editRolesDialogClose () {
      this.editDialogVisible = false
      this.$message.info('没有做任何修改哦')
    },
    // 按id删除角色
    async removeRoliesById (id) {
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
      // 重新获取角色列表信息
      this.getRolesList()
      return this.$message.success('算你狠')
    },
    // 根据id删除某一个三级权限
    async removeRightById (role, rightId) {
      // 弹框提示
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('您取消了删除')
      }
      // 由于不存在这个后台所以注掉请求部分 默认删除成功
      // const { data: res } = await this.$http.delete(`roles/${role} / rights / ${rightId}`)
      // if (res.meta.status !== 200) { return this.$message.error('删除失败') }
      this.$message.success('您干掉了这个功能')

      // 这个是根据请求的返回值 返回了一个删除过后的对象 然后知把这个返回的对象重新渲染在页面上即可达到局部刷新的功能
      // role.chldren = res.data

      // 不推荐全部渲染 会关闭这个表格下拉
      this.getRolesList()
    },
    // 通过递归的形式获取角色下所有三级权限的id并保存到defKeys数组中
    getLeafKeys (node, arr) {
      // 如果当前node节点没有children这个选项那么就说明他是三级的权限
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item =>
        this.getLeafKeys(item, arr))
    },
    // 展示分配权限的对话框
    async showSetRightDialog (role) {
      this.roleId = role.id
      // 没有后台导入假数据
      // 获取所有权限的数据
      // const { data: res } = await this.$http.get('rights/tree')
      // if (res.meta.status !== 200) { return this.$message.error('查询权限分配树失败') }
      // // 把获取到的数据保存到rightsTree中
      // this.rightsTree = res.data

      // 打入假数据
      this.rightsTree = rolesTree.data
      this.getLeafKeys(role, this.defKeys)
      // console.log(this.defKeys)

      // 显示分配权限对话框
      this.setRightdialogVisible = true
    },
    // 监听分配权限关闭窗口
    setRightDialogClosed () {
      // 置空权限树
      this.defKeys = []
    },
    // 点击为角色分配权限
    async allotRights () {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      // console.log(keys)
      const idStr = keys.join(',')
      console.log(idStr)
      // 由于没有后台 注掉交互部分
      // const { data: res } = await this.$http.post(`roles/${this.roleId}/rights`, { rids: idStr })
      // if (res.meta.status !== 200) { return this.$message.error('分配权限成功') }
      this.$message.success('分配权限成功')
      this.getRolesList()
      this.setRightdialogVisible = false
    }
  }
}
</script>
<style lang="less" scoped>
.el-tag{
  margin: 7px;
}
.dbtop{
  border-top:1px solid #eee;
}
.dbbottom{
  border-bottom: 1px solid #eee;
}
.vcenter{
  display: flex;
  align-items: center
}
</style>
