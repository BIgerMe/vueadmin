<template>
  <div>
    <el-card>
      <el-col :span="2" class="text-center">
        <router-link class="pan-btn blue-btn" to="/bearing/add">
          新增物品
        </router-link>
      </el-col>
    </el-card>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="id" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="物品名称" prop="name" min-width="150px" />
      <el-table-column label="图片" min-width="100">
        <template slot-scope="{row}">
          <div class="demo-image__preview">
            <el-image
              v-if="row.pictures"
              style="width: 80px; height: 80px"
              :src="row.pictures ? row.pictures[0] : ''"
              :preview-src-list="row.pictures"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="数量" prop="qty" min-width="60px">
        <template slot-scope="{row}">
          {{ row.qty + row.unit }}
        </template>
      </el-table-column>
      <el-table-column label="是否必备" prop="is_necessary" min-width="80px" />
      <el-table-column label="妈妈用品" prop="mom_use" min-width="80px" />
      <el-table-column label="宝宝用品" prop="baby_use" min-width="80px" />
      <el-table-column label="重要性" prop="importance" min-width="100px">
        <template slot-scope="{row}">
          <el-rate
            v-model="row.importance"
            :max="3"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
          />
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="content" min-width="300px">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.content" type="textarea" class="edit-input" style="width: 70%;" size="small" />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              取消
            </el-button>
          </template>
          <span v-else>{{ row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="{row}">
          <el-button v-if="row.edit" type="success" size="mini" icon="el-icon-circle-check-outline" @click="confirmEdit(row)">Ok</el-button>
          <el-button v-else type="primary" size="mini" icon="el-icon-edit" @click="row.edit=!row.edit">编辑描述</el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEdit(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="listQuery.total>0" :total="listQuery.total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog title="编辑" width="80%" :visible.sync="dialogFormVisible" @close="handleCancel">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-card class="box-card">
          <div class="el-card__body" style="border-bottom: 1px #eeeeee solid;margin-bottom: 10px">
            <el-row>
              <el-col :span="24">
                <el-col :span="12">
                  <el-form-item label="物品名称" required>
                    <el-input v-model="form.name" show-word-limit />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
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
                <el-col :span="8">
                  <el-form-item label="数量">
                    <el-input-number v-model="form.qty" controls-position="right" :min="1" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="单位"><el-input v-model="form.unit" /></el-form-item>
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
                      <dropzone id="picture" ref="picture" url="http://war3.xxroom.xyz/z/qiniu/uploadImg" :default-img="form.pictures ? form.pictures : []" @dropzone-removedFile="dropzoneR" @dropzone-success="dropzoneS" />
                    </div>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
          </div>
          <div class="el-footer">
            <el-button type="primary" @click="handleSubmit('form')">更新保存</el-button>
            <el-button @click="handleCancel()">取消</el-button>
          </div>
        </el-card>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { update, updateContent, search } from '@/api/bearing'
import Pagination from '@/components/Pagination'
import Dropzone from '@/components/Dropzone'
import 'jquery'

export default {
  name: 'Bearing',
  components: { Pagination, Dropzone },
  data() {
    return {
      list: null,
      listQuery: {
        page: 1,
        limit: 10,
        total: 0
      },
      listLoading: false,
      dialogFormVisible: false,
      form: {
        'id': '',
        'name': '',
        'qty': '',
        'unit': '',
        'is_necessary': '是',
        'mom_use': '否',
        'baby_use': '否',
        'importance': 1,
        'content': '',
        'pictures': ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      search(this.listQuery).then(response => {
        const items = response.data
        this.listQuery.total = response.total
        this.list = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.originalContent = v.content //  will be used when user click the cancel botton
          return v
        })
      })
    },
    cancelEdit(row) {
      row.content = row.originalContent
      row.edit = false
      this.$message({
        message: '描述未做修改',
        type: 'warning'
      })
    },
    async confirmEdit(row) {
      const { data } = await updateContent({ id: row.id, content: row.content })
      row.edit = false
      row.originalContent = row.content
      this.$message({
        message: '描述已更新',
        type: 'success'
      })
    },
    showEdit(r) {
      this.form = JSON.parse(JSON.stringify(r))
      this.dialogFormVisible = true
    },
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          update(this.form).then(response => {
            this.$notify({
              title: 'Success',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
          this.getList()
          this.dialogFormVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
      $('.dz-preview').remove()
      this.$refs['picture'].initOnceStatus()
    },
    handleCancel() { // 取消
      this.dialogFormVisible = false
      $('.dz-preview').remove()
      this.$refs['picture'].initOnceStatus()
    },
    changePic() {
      const pictures = []
      $('#picture img').each(function(i, v) {
        pictures.push(v.src)
      })
      this.form.pictures = pictures
    },
    /* 图片上传*/
    dropzoneS(file, response) {
      file.previewElement.getElementsByTagName('img')[0].src = JSON.parse(response)['data'][0] // data替换成七牛URL
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

<style lang="scss" scoped>
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;

  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>
