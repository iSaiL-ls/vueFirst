<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <!-- 控制鼠标高亮:show-row-hover="false" -->
      <tree-table
        class="treeTable"
        :data="catelist"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
      >
        <!-- 是否有效 -->
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted===false"
            style="color:lightgreen;font-size:18px;"
          ></i>
          <i class="el-icon-error" v-else style="color:red;font-size:18px;"></i>
        </template>
        <!-- 排序 -->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level===0">一级</el-tag>
          <el-tag type="success" size="mini" v-else-if="scope.row.cat_level===1">二级</el-tag>
          <el-tag type="warning" size="mini" v-else>三级</el-tag>
        </template>
        <!-- 操作 -->
        <template slot="opt" slot-scope>
          <el-button type="primary" icon="el-icon-edit" size="small">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small">删除</el-button>
        </template>
      </tree-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="querInfo.pagenum"
        :page-sizes="[1, 2, 3]"
        :page-size="querInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加分类的对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
      @close="addCateDialogClosed"
    >
      <!-- 添加分类的表单 -->
      <el-form
        ref="addCateFormRef"
        :model="addCateForm"
        :rules="addCateFormRules"
        label-width="100px"
      >
        <el-form-item label="温馨提示：">不选中父级分类将默认为父级分类！</el-form-item>
        <el-form-item label="分类名称：" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类：">
          <!-- options用来制定数据源 -->
          <el-cascader
            expand-trigger="hover"
            v-model="selectedKeys"
            :options="parentCateList"
            :props="cascaderProps"
            @change="parentCateChanged"
            clearable
            change-on-select
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 导入假数据
import cateList from '../../assets/json/Catelist'
console.log(cateList)

export default {
  data () {
    return {
      querInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 3
      },
      // 商品分类数组，默认为空
      catelist: [],
      // 总数据条数
      total: 0,
      // 为table指定列的定义
      columns: [{
        label: '分类名称',
        prop: 'cat_name'
      }, {
        label: '是否有效',
        type: 'template',
        template: 'isok'
      }, {
        label: '排序',
        type: 'template',
        template: 'order'
      }, {
        label: '操作',
        type: 'template',
        template: 'opt'
      }],
      // 控制添加对话框的显示与隐藏
      addCateDialogVisible: false,
      // 添加分类的表单数据对象
      addCateForm: {
        // 将要添加的分类的名称
        cat_name: '',
        // 父级分类的ID
        cat_pid: 0,
        // 分类的等级，默认要添加的是1级分类
        cat_level: 0
      },
      // 添加表单的验证规则对象
      addCateFormRules: {
        cat_name: [{
          required: true, message: '请输入类名称', tigger: 'blur'
        }]
      },
      // 添加分类时获取的父级分类列表
      parentCateList: [],
      // 父级分类配置对象
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 选中的父级分类的ID数组
      selectedKeys: []
    }
  },
  created () {
    this.getCatelist()
  },
  methods: {
    // 店家添加分类的对话框
    showAddCateDialog () {
      // 获取腹肌分类的列表
      this.getParentCateList()
      this.addCateDialogVisible = true
    },
    // 获取商品分类数据
    async getCatelist () {
      // 因为没有后台所以使用假数据，注掉这一部分
      //   const { data: res } = await this.$http.get('categories', { params: this.querInfo })
      //   if (res.meta.status !== 200) {
      //     return this.$message.error('获取商品列表失败')
      //   }
      //   this.catelist = res.data.result
      // this.total = res.data.total

      // }
      this.catelist = cateList.data
      this.total = cateList.total
    },
    // 监听pagesize改变
    handleSizeChange (newSize) {
      this.querInfo.pagesize = newSize
      this.getCatelist()
    },
    // 监听pagenum改变
    handleCurrentChange (newPage) {
      this.querInfo.pagenum = newPage
      this.getCatelist()
    },
    // 获取前两节的父级节点
    async getParentCateList () {
      // 没有后台 向后台发请求获取到父级类型为2的分类
      // const { data: res } = await this.$http.get('categories', { params: { type: 2 } })
      // if (res.meta.status !== 200) {
      //   return this.$message.error('获取父级分类数据失败')
      // }
      // 渲染数据
      // this.parentCateList = res.data
      // console.log(cateList)
      this.parentCateList = cateList.data
      console.log(this.parentCateList)
    },
    // 选择项发生变化触发这个函数
    parentCateChanged () {
      console.log(this.selectedKeys)
      // 如果selectedKeys 数组中delenth大于0
      // 证明选中了父级， 反之，就是没有选中父级分类
      if (this.selectedKeys.length > 0) {
        // 父级分类id发生变化
        this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
        // 为但钱分类的等级赋值
        this.addCateForm.cat_level = this.selectedKeys.length
      } else {
        this.addCateForm.cat_pid = 0
        // 为但钱分类的等级赋值
        this.addCateForm.cat_level = 0
      }
    },
    // 点击按钮，添加新的分类
    addCate () {
      // 默认添加成功
      // this.$refs.addCateForm.validate(
      //   async valid => {
      //   if (!valid) { return }
      //   const { data: res } = await this.$http.post('categorise', this.addCateForm)
      //   if (res.meta.status !== 201) {
      //     return this.$message.error('添加失败')
      //   }
      //   this.$message.success('添加分类成功')
      //   this.getCatelist()
      //   this.addCateDialogVisible = false
      // })
      this.$message.success('添加分类成功')
      this.getCatelist()
      this.addCateDialogVisible = false
    },
    // 关闭对话框的关闭时间
    addCateDialogClosed () {
      this.$refs.addCateFormRef.resetFields()
      this.selectedKeys = []
      this.addCateForm.cat_level = 0
      this.addCateForm.cat_pid = 0
    }
  }

}
</script>

<style lang="less" scoped>
.treeTable{
  margin-top: 15px;
}
.el-cascader{
  width: 100%;
}

</style>
