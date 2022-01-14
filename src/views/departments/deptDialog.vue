<template>
  <div>
    <el-form ref="deptForm" :model="form" :rules="deptRules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="form.name"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="form.code"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select
          v-model="form.manager"
          style="width: 80%"
          placeholder="请选择"
        >
          <el-option v-for="item in employees" :key="item.id" :value="item.username" :label="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="form.introduce"
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="submit">确定</el-button>
        <el-button size="small" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getEmployeeSimple } from '@/api/employees'
import { addDepartments, getDepartDetail, updateDepartments } from '@/api/departments'
export default {
  name: '',
  props: {
    id: {
      type: String,
      required: true
    },
    isEdit: {
      type: Boolean,
      required: true
    }

  },
  data() {
    return {
      form: {
        code: '',
        manager: '',
        introduce: '',
        name: '',
        pid: ''
      },
      deptRules: {
        name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入部门编码', trigger: 'blur' }],
        introduce: [{ required: true, message: '请输入部门介绍', trigger: 'blur' }]
      },
      employees: []
    }
  },
  computed: {
  },
  created() {
    this.loadEmployee()
    this.loaddetail()
  },
  methods: {
    async loadEmployee() {
      const res = await getEmployeeSimple()
      if (res.code === 10000) {
        this.employees = res.data
      }
    },
    async submit() {
      this.$refs.deptForm.validate(val => {
        // console.log(val)
        if (val) {
          // if (this.isEdit) {
          //   this.doEdit()
          //   return
          // }
          // this.doAdd()
          this.isEdit ? this.doEdit() : this.doAdd()
        }
      })
    },
    async doAdd() {
      const params = { ...this.form, pid: this.id }
      // console.log(params)
      const res = await addDepartments(params)
      // console.log(res)
      if (res.code === 10000) {
        this.$emit('success')
      }
    },
    async loaddetail() {
      if (this.isEdit) {
        const res = await getDepartDetail(this.id)
        console.log(res)
        if (res.code === 10000) {
          this.form = res.data
        }
      }
    },
    async doEdit() {
      const params = { ...this.form, pid: this.id }
      const res = await updateDepartments(params)
      // console.log(res)
      if (res.code === 10000) {
        this.$emit('success')
      }
    },
    cancel() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="less" scoped></style>
