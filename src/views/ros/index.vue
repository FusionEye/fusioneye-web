<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('pyCase.caseName')" v-model="listQuery.caseName"></el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-button class="filter-item" :loading="codeSyncing" type="primary" icon="el-icon-refresh" @click="handleRecord">{{$t('ros.recordBtn')}}</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-view" @click="handleClose">{{$t('ros.closeBtn')}}</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" stripe element-loading-text="给我一点时间" border fit highlight-current-row
              style="width: 100%" @selection-change="handleSelectionChange" >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
              <el-table-column align="center" type="index" label="No" width="85">
          <template slot-scope="scope">
            {{scope.$index}}
          </template>
        </el-table-column>
      <el-table-column align="center" :label="$t('ros.fileName')" width="600">
        <template slot-scope="scope">
          <span>{{scope.row.fileName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('ros.path')" width="250" v-if="false">
        <template slot-scope="scope">
          <span>{{scope.row.path}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('ros.size')" width="250">
        <template slot-scope="scope">
          <span>{{scope.row.size}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('ros.createTime')" width="250">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('ros.actions')" width="350" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleDownload(scope.$index, scope.row)">{{$t('ros.downloadBtn')}}</el-button>
          <el-button type="primary" size="mini" @click="handleDelete(scope.$index, scope.row)">{{$t('ros.deleteBtn')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
  .text-wrapper {
    white-space: pre-wrap;
  }
</style>

<script>
  import { record, close, fetchBagList } from '@/api/ros'
  // import waves from '@/directive/waves' // 水波纹指令

  export default {
    name: 'complexTable',
    // directives: {
    //   waves
    // },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        codeSyncing: false,
        dialogFormVisible: false,
        dialogIframeComplete: false,
        dialogCaseResVisible: false,
        logDialogVisible: false,
        detailDialogVisible: false,
        dialogCaseHisVisible: false,
        caseResultList: null,
        sinHisCaseList: null,
        stepList: null,
        caseListLoading: true,
        detail: null,
        addIndex: 1,
        watch1: null,
        watch2: null,
        listQuery: {
          page: 1,
          limit: 20,
          caseName: ''
          // sort: '+id'
        },
        caseForm: {
          salt: '',
          caseName: '',
          note: ''
        },
        multipleSelection: []
      }
    },
    filters: {
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        fetchBagList().then(response => {
          this.list = response.data.result
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleRecord() {
        this.codeSyncing = true
        record().then(response => {
          this.codeSyncing = false
          if (response.data.success) {
            this.$message.success('同步完成')
          } else {
            this.$message.error('错了哦，失败 \n ' + response.data.message)
          }
        })
      },
      handleClose() {
        this.codeSyncing = true
        close().then(response => {
          this.codeSyncing = false
          if (response.data.success) {
            this.$message.success('同步完成')
          } else {
            this.$message.error('错了哦，失败 \n ' + response.data.message)
          }
        })
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleDownload(index, row) {
        this.$set(row, 'running', true)
        // TODO download
        // 延时恢复
        setInterval(() => {
          this.$set(row, 'running', false)
        }, 3000)
      },
      handleDelete(index, row) {

      }
    }
  }
</script>
