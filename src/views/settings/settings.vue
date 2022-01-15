<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height:60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="addRole"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table :data="list">
              <el-table-column type="index" :index="indexMethod" label="序号" width="120" />
              <el-table-column prop="name" label="角色名称" width="240" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作">
                <template v-slot="scoped">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editor(scoped.row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="del(scoped.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <!-- 分页组件 -->
              <el-pagination
                :total="total"
                :page-size="pageParams.pagesize"
                layout="prev,pager,next"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!-- 新增弹框 -->
      <el-dialog
        v-if="showDialog"
        :title="isEdit ? '编辑角色' : '新增角色'"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :visible.sync="showDialog"
      >
        <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="100px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name" />
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="roleForm.description" />
          </el-form-item>
        </el-form>
        <!-- 底部 -->
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" @click="showDialog=false">取消</el-button>
            <el-button size="small" type="primary" @click="hSubmit">确定</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRoles, deleteRole, addRole, updateRole } from '@/api/setting'
export default {
  name: '',
  data() {
    return {
      list: [],
      total: 1,
      pageParams: {
        page: 1, // 查询第一页
        pagesize: 3 // 每页两条  --- 要与pagination中page-size一致
      },
      showDialog: false,
      roleForm: {
        name: '',
        description: ''
      },
      rules: { name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }] },
      isEdit: false
    }
  },
  computed: {},
  created() {
    this.loadRoles()
  },
  methods: {
    async loadRoles() {
      const { data: res } = await getRoles(this.pageParams)
      // console.log(res)
      this.list = res.rows
      this.total = res.total
    },
    handleCurrentChange(curPage) { // curPage当前页
      // console.log(curPage)
      this.pageParams.page = curPage
      this.loadRoles()
    },
    handleSizeChange() {},
    indexMethod(index) {
      return (this.pageParams.page - 1) * this.pageParams.pagesize + index + 1
    },
    del(id) {
      // console.log(id)
      this.$confirm('是否删除?', '提示', { confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning' }).then(() => {
        this.doDel(id)
      }).catch(e => e)
    },
    async doDel(id) {
      const res = await deleteRole(id)
      if (res.code !== 10000) return this.$message.success('网络错误')
      if (this.list.length === 1) {
        this.page.page--
        if (this.list <= 0) {
          this.page.page = 1
        }
      }
      this.$message.success('删除成功')
      this.loadRoles()
    },
    addRole() {
      this.showDialog = true
      this.isEdit = false
    },
    async doAddRole() {
      try {
        const res = await addRole(this.roleForm)
        console.log(res)
        this.loadRoles()
        this.isEdit = false
        this.$message.success('添加成功')
        this.showDialog = false
        this.roleForm = {
          name: '',
          description: ''
        }
      } catch (error) {
        console.log(error)
      }
    },
    hSubmit() {
      this.$refs.roleForm.validate(val => {
        if (!val) return
        this.isEdit ? this.doEdit() : this.doAddRole()
      })
    },
    editor(row) {
      // console.log(id)
      // this.roleForm = row
      this.roleForm = { id: row.id, name: row.name, description: row.description }
      this.showDialog = true
      this.isEdit = true
    },
    async doEdit() {
      try {
        const res = await updateRole(this.roleForm)
        console.log(res)

        this.$message.success('编辑成功')
        this.loadRoles()
        this.showDialog = false
      } catch (err) {
        this.$message.error('编辑失败')
        console.log(err)
      }
    }
  }
}
</script>
<style lang='less'  scoped>
</style>
