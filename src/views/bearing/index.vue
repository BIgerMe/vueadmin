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
    <el-table-column label="数量" prop="qty" min-width="150px">
      <template slot-scope="{row}">
        {{ row.qty + row.unit }}
      </template>
    </el-table-column>
    <el-table-column label="是否必备" prop="is_necessary" min-width="150px" />
    <el-table-column label="妈妈用品" prop="mom_use" min-width="150px" />
    <el-table-column label="宝宝用品" prop="baby_use" min-width="150px" />
    <el-table-column label="重要性" prop="importance" min-width="150px">
      <template slot-scope="{row}">
        <el-rate
          v-model="row.importance"
          :max="3"
          :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
        </el-rate>
      </template>
    </el-table-column>
      <el-table-column label="描述" prop="content" min-width="300px" >
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.content" class="edit-input" size="small" />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              cancel
            </el-button>
          </template>
          <span v-else>{{ row.content }}</span>
        </template>
      </el-table-column>
    <el-table-column align="center" label="操作" width="120">
      <template slot-scope="{row}">
        <el-button
          v-if="row.edit"
          type="success"
          size="small"
          icon="el-icon-circle-check-outline"
          @click="confirmEdit(row)"
        >
          Ok
        </el-button>
        <el-button
          v-else
          type="primary"
          size="small"
          icon="el-icon-edit"
          @click="row.edit=!row.edit"
        >
          编辑
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <pagination v-show="listQuery.total>0" :total="listQuery.total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { update, search, del } from '@/api/bearing'
import Pagination from "@/components/Pagination";

export default {
  name: 'Bearing',
  components: { Pagination },
  data() {
    return {
      list: null,
      listQuery:{
        page:1,
        limit:10,
        total:0
      },
      listLoading: false
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
      const {data} = await update({id:row.id,content:row.content})
      row.edit = false
      row.originalContent = row.content
      this.$message({
        message: '描述已更新',
        type: 'success'
      })
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
