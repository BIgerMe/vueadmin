<template>
  <div style="padding:30px;">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-card class="box-card">
        <div class="el-card__body" style="border-bottom: 1px #eeeeee solid;margin-bottom: 10px">
          <el-row>
            <el-col :span="24">
              <el-col :span="6">
                <el-form-item label="物品名称" required>
                  <el-input v-model="form.name" show-word-limit />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="数量">
                  <el-input-number v-model="form.qty" controls-position="right" :min="1" />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="单位"><el-input v-model="form.unit" /></el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="重要性">
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
                <el-input v-model="form.content" type="textarea" /></el-form-item>
            </el-col>
            <el-col :span="24">
              <el-col :span="24">
                <el-form-item label="物品图片">
                  <div class="editor-container">
                    <dropzone id="picture" url="http://war3.xxroom.xyz/z/qiniu/uploadImg" @dropzone-removedFile="dropzoneR" @dropzone-success="dropzoneS" />
                  </div>
                </el-form-item>
              </el-col>
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
import Dropzone from '@/components/Dropzone'
import 'jquery'
export default {
  name: 'BearingAdd',
  components: { Dropzone },
  data() {
    return {
      form: {
        'name': '',
        'qty': '',
        'unit': '',
        'is_necessary': '是',
        'mom_use': '否',
        'baby_use': '否',
        'importance': 1,
        'content': '',
        'pictures':''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }]
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
          console.log('error submit!!')
          return false
        }
      })
    },
    changePic(){
      let pictures = []
      $("#picture img").each(function(i,v){
        pictures.push(v.src)
      })
      console.log(pictures)
      this.form.pictures = pictures
    },
    /* 图片上传*/
    dropzoneS(file, response) {
      file.previewElement.getElementsByTagName('img')[0].src = JSON.parse(response)['data'][0] //data替换成七牛URL
      this.changePic()
      this.$message({ message: '上传成功', type: 'success' })
    },
    dropzoneR(file, dom) {
      this.changePic()
      this.$message({ message: '删除成功', type: 'success' })
    }
  }
}
</script>

