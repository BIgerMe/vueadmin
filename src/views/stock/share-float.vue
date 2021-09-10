<template>
  <div>
    <el-card>
      <el-col :span="2" class="text-center" />
    </el-card>
    <pagination v-show="listQuery.total>0" :total="listQuery.total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ts代码" prop="ts_code" min-width="100px" />
      <el-table-column label="解禁日期" prop="float_date" min-width="80px" />
      <el-table-column label="流通股份" prop="float_share" min-width="80px" />
      <el-table-column label="流通股份占总股本比率" prop="float_ratio" min-width="80px" />
      <el-table-column label="股东名称" prop="holder_name" min-width="250px" />
      <el-table-column label="股份类型" prop="share_type" min-width="80px" />
    </el-table>
  </div>
</template>

<script>
import { ShareFloatList } from '@/api/stock'
import Pagination from '@/components/Pagination'
import 'jquery'

export default {
  name: 'ShareFloat',
  components: { Pagination },
  data() {
    return {
      list: null,
      listQuery: {
        page: 1,
        limit: 10,
        total: 0
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      ShareFloatList(this.listQuery).then(response => {
        this.list = response.data
        this.listQuery.total = response.total
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
