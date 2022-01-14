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
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table>
              <el-table-column label="序号" width="120" />
              <el-table-column label="角色名称" width="240" />
              <el-table-column label="描述" />
              <el-table-column label="操作">
                <template>
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary">编辑</el-button>
                  <el-button size="small" type="danger">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <!-- 分页组件 -->
              <el-pagination layout="prev,pager,next" />
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getRoles } from '@/api/setting'
export default {
  name: '',
  data() {
    return {
      list: []
    }
  },
  computed: {},
  created() {
    this.loadRoles()
  },
  methods: {
    async loadRoles() {
      const res = await getRoles()
      console.log(res)
    }
  }
}
</script>
<style lang='less'  scoped>
</style>
