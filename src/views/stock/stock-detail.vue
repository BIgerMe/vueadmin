<template>
  <div>
    <div class="app-container">
      <div class="filter-container">
        <el-descriptions title="基础信息" border>
          <el-descriptions-item label="名称">{{ stock_basic.name+'（'+stock_basic.fullname+'）' }}</el-descriptions-item>
          <el-descriptions-item label="代码">{{ stock_basic.symbol }}</el-descriptions-item>
          <el-descriptions-item label="上市日期">{{ stock_basic.list_date }}</el-descriptions-item>
          <el-descriptions-item label="地域">{{ stock_basic.area }}</el-descriptions-item>
          <el-descriptions-item label="所属行业">{{ stock_basic.industry }}</el-descriptions-item>
          <el-descriptions-item label="市场">{{ stock_basic.market }}</el-descriptions-item>
        </el-descriptions>

      </div>
    </div>
    <div>
      <el-col :span="12">
        <daily :ts_code="this.ts_code" height="400px" width="100%" />
      </el-col>
      <el-col :span="12">
        <weekly :ts_code="this.ts_code" height="400px" width="100%" />
      </el-col>
      <el-col :span="12">
        <monthly :ts_code="this.ts_code" height="400px" width="100%" />
      </el-col>
      <el-col :span="12">
        <holderNumber :ts_code="this.ts_code" height="400px" width="100%" />
      </el-col>
    </div>
  </div>
</template>

<script>
import daily from './components/daily'
import weekly from './components/weekly'
import monthly from './components/monthly'
import holderNumber from './components/holdernumber'
import { StockBasicDetail } from '@/api/stock'

export default {
  name: 'StockDetail',
  components: { daily, weekly, monthly, holderNumber },
  data() {
    return {
      ts_code: '',
      stock_basic: {
        name: '',
        symbol: ''
      }
    }
  },
  created() {
    this.ts_code = this.$route.params.ts_code
    this.getDetail()
  },
  methods: {
    getDetail() {
      StockBasicDetail({ ts_code: this.ts_code }).then(response => {
        this.stock_basic = response.data
      })
    }
  }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(150vh - 84px);
}
</style>

