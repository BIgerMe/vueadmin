<template>
  <div style="padding:30px;">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-card class="box-card">
        <div class="el-card__body" style="border-bottom: 1px #eeeeee solid;margin-bottom: 10px">
            <el-row>
              <el-col :span=24>
                <el-col :span=6>
                  <el-form-item label="物品名称" required>
                    <el-input v-model="form.name" show-word-limit></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="数量">
                    <el-input-number v-model="form.qty" controls-position="right" :min="1"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="单位"><el-input v-model="form.unit"></el-input></el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item  label="重要性" >
                    <el-rate
                      v-model="form.importance"
                      :max="3"
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                      :low-threshold="1"
                      :high-threshold="3"
                      style="display:inline-block"
                    />
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="12">
                <el-form-item label="必备">
                  <el-radio v-model="form.is_necessary" label="是">是</el-radio>
                  <el-radio v-model="form.is_necessary" label="否">否</el-radio>
                </el-form-item>
                <el-form-item label="妈妈用品">
                  <el-radio v-model="form.mom_use" label="是">是</el-radio>
                  <el-radio v-model="form.mom_use" label="否">否</el-radio>
                </el-form-item>
                <el-form-item label="宝宝用品">
                  <el-radio v-model="form.baby_use" label="是">是</el-radio>
                  <el-radio v-model="form.baby_use" label="否">否</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="描述内容">
                  <el-input type="textarea" v-model="form.content"></el-input></el-form-item>
              </el-col>
            </el-row>
        </div>
        <div class="el-footer">
          <el-button type="primary" @click="handleSubmit('form')">立即创建</el-button>
          <el-button>取消</el-button>
        </div>
      </el-card>
    </el-form>
  </div>
</template>

<script>
import { add } from '@/api/bearing'

export default {
  name: 'BearingAdd',
  data() {
    return {
      form:{
        'name':'',
        'qty':'',
        'unit':'',
        'is_necessary':'是',
        'mom_use':'否',
        'baby_use':'否',
        'importance':1,
        'content':'',
      },
      rules:{
        name:[
          { required: true, message: '请输入活动名称', trigger: 'blur' }],
      }
    }
  },
  created() {
  },
  methods: {
    handleSubmit(formName) {

      this.$refs[formName].validate((valid) => {
        if (valid) {
          add(this.form).then(response => {
            this.$notify({
              title: 'Success',
              message: '新增成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

