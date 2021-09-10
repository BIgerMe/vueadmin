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
      <el-table-column label="股票代码" prop="symbol" min-width="80px" />
      <el-table-column label="股票名称" prop="name" min-width="80px" />
      <el-table-column label="地域" prop="area" min-width="80px" />
      <el-table-column label="所属行业" prop="industry" min-width="250px" />
      <el-table-column label="市场类型" prop="market" min-width="80px" />
      <el-table-column label="上市日期" prop="list_date" min-width="80px" />
    </el-table>
  </div>
</template>

<script>
import { StockBasicList } from '@/api/stock'
import Pagination from '@/components/Pagination'
import 'jquery'

export default {
  name: 'StockBasic',
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
      StockBasicList(this.listQuery).then(response => {
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
