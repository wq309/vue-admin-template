<template>
  <div class="department-container">
    <div class="app-container">
      <el-card>
        <el-tabs class="title">
          <el-tab-pane label="组织结构" name="first" />
        </el-tabs>
        <!-- 用一个行列布局 -->
        <div class="content">
          <el-row class="ttt" type="flex" justify="space-between" align="middle" style="height: 40px">
            <el-col :span="20">
              <svg-icon icon-class="form" /><span class="name">  江苏传智播客教育科技股份有限公司</span>
            </el-col>
            <el-col :span="4">
              <el-row type="flex" justify="end">
                <!-- 两个内容 -->
                <el-col>负责人</el-col>
                <!-- 下拉菜单 element -->
                <el-col>
                  <el-dropdown>
                    <span>
                      操作<i class="el-icon-arrow-down" />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="addDep('')">添加子部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!-- 树形组件列表 -->
          <el-tree :default-expand-all="true" :data="data">
            <!--  eslint-disable-next-line vue/no-template-shadow -->
            <template v-slot="{ data }">
              <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%">
                <el-col :span="20">
                  <svg-icon icon-class="home" /><span>{{ data.name }}</span>
                </el-col>
                <el-col :span="4">
                  <el-row type="flex" justify="end" style="text-align: right">
                    <!-- 两个内容 -->
                    <el-col>{{ data.manager }}</el-col>
                    <!-- 下拉菜单 element -->
                    <el-col>
                      <el-dropdown>
                        <span> 操作<i class="el-icon-arrow-down" /> </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item @click.native="addDep(data.id)">添加子部门</el-dropdown-item>
                          <el-dropdown-item @click.native="editDep(data.id)">修改部门</el-dropdown-item>
                          <el-dropdown-item v-if="data.children.length===0" @click.native="delDep(data.id)">删除部门</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </template>
          </el-tree>
        </div>
      </el-card>
      <el-dialog
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :title="isEdit?'修改':'添加'"
        :visible.sync="dialogVisibleAdd"
        width="30%"
      >
        <deptDialog v-if="dialogVisibleAdd" :id="id" :is-edit="isEdit" @close="hClose" @success="hsuccess" />
        <!-- <deptDialog :id="id" ref="deptDialog" :is-edit="isEdit" @success="hsuccess" /> -->
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getDepartments, delDepartment } from '@/api/departments'
import { tranListToTreeData } from '@/api/departments'
import deptDialog from './deptDialog.vue'
export default {
  name: '',
  components: { deptDialog },
  data() {
    return {
      activeName: 'first',
      data: [],
      id: '',
      isEdit: false,
      dialogVisibleAdd: false // 是否显示弹层
    }
  },
  computed: {},
  created() {
    this.loadDepartments()
  },
  methods: {
    async loadDepartments() {
      const { data: res } = await getDepartments()
      console.log(res)
      this.data = tranListToTreeData(res.depts, '')
    },
    addDep(id) {
      // console.log(id)
      this.isEdit = false
      this.id = id
      this.dialogVisibleAdd = true
    },
    hsuccess() {
      this.loadDepartments()
      this.dialogVisibleAdd = false
      this.$message.success('添加成功')
    },
    delDep(id) {
      this.$confirm('确认删除吗', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
        this.doDel(id)
      }).catch(e => e)
    },
    async doDel(id) {
      const res = await delDepartment(id)
      if (res.code === 10000) {
        this.$message.success('删除成功')
        this.loadDepartments()
        return
      }
      this.$message.error('网络错误')
    },
    editDep(id) {
      this.isEdit = true
      this.id = id
      this.dialogVisibleAdd = true
      // 获取子组件的引用
      // this.$nextTick(() => {
      //   // console.log('获取子组件的引用', this.$refs.deptDialog)
      //   this.$refs.deptDialog.loadDepartmentDetailById()
      // })
    },
    hClose() {
      this.dialogVisibleAdd = false
      this.isEdit = false
    }
  }
}
</script>
<style lang='scss'  scoped>
.box-card{
  margin: 30px;
  padding: 30px;
}
.title{
  padding-left: 50px;
}
.content{
  padding: 50px 90px;

  .ttt{
  border-bottom: 1px solid #cfcfcf;
  margin-bottom: 15px ;
  }

  .name{
  font-size:14px;
  font-weight: 600;
  color: #555;
  }
}
</style>
