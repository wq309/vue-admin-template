<template>
  <div class="employees-container">
    <div class="app-container">
      <page-tools>
        <template #left>
          <span>总记录数: 16 条</span>
        </template>
        <template #right>
          <el-button type="warning" size="small">excel导入</el-button>
          <el-button type="danger" size="small">excel导出</el-button>
          <el-button type="primary" size="small">新增员工</el-button>
        </template>
      </page-tools>

      <el-card style="margin-top: 10px;">
        <el-table :data="list" border>
          <el-table-column prop="companyId" label="序号" />
          <el-table-column prop="username" label="姓名" />
          <el-table-column prop="workNumber" label="工号" />
          <el-table-column prop="username" label="聘用形式" />
          <el-table-column prop="departmentName" label="部门" />
          <el-table-column prop="username" label="入职时间" />
          <el-table-column prop="username" label="账户状态" />
          <el-table-column prop="username" label="操作" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">分配角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center`" align="middle" style="height: 60px">
          <el-pagination layout="prev, pager, next" />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import PageTools from '@/components/PageTools'
import { getEmployeeList } from '@/api/employees'

export default {
  name: '',
  components: {
    PageTools
  },
  data() {
    return {
      list: [],
      page: 1,
      size: 10

    }
  },
  computed: {},
  created() {
    this.loadEmployeeList()
  },
  methods: {
    async loadEmployeeList() {
      try {
        const res = await getEmployeeList(this.page, this.size)
        console.log(res)
        this.list = res.data.rows
      } catch (err) {
        console.log(err)
        this.$message.error('加载员工数据失败')
      }
    }
  }
}
</script>
<style lang='less'  scoped>
</style>
