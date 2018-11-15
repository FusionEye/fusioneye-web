<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('ros.fileName')" v-model="listQuery.caseName"></el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-button class="filter-item" :loading="codeSyncing" type="primary" icon="el-icon-refresh" @click="handleRecord">{{$t('ros.recordBtn')}}</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-view" @click="handleClose">{{$t('ros.closeBtn')}}</el-button>
    </div>

    <el-container style="width: 100%">
      <el-table :key='tableKey' :data="list" v-loading="listLoading" stripe element-loading-text="给我一点时间" border fit highlight-current-row
                style="width: 100%" @selection-change="handleSelectionChange" >
        <!-- <el-table-column
          type="selection"
          width="55">
        </el-table-column> -->
          <el-table-column align="center" type="index" label="No" min-width="5%">
            <template slot-scope="scope">
              {{scope.$index}}
            </template>
          </el-table-column>
        <el-table-column align="center" :label="$t('ros.fileName')">
          <template slot-scope="scope">
            <span>{{scope.row.fileName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('ros.path')" v-if="false">
          <template slot-scope="scope">
            <span>{{scope.row.path}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('ros.size')" >
          <template slot-scope="scope">
            <span>{{scope.row.size}}M</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('ros.createTime')" >
          <template slot-scope="scope">
            <span>{{scope.row.createTime}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('ros.actions')" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleDownload(scope.$index, scope.row)">{{$t('ros.downloadBtn')}}</el-button>
            <el-button type="primary" size="mini" @click="handleDelete(scope.$index, scope.row)">{{$t('ros.deleteBtn')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-container>
  </div>
</template>

<style>
  .text-wrapper {
    white-space: pre-wrap;
  }
</style>

<script>
  import { record, close, fetchBagList, download, deleteFile } from '@/api/ros'
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
        })
        // 延时恢复
        setInterval(() => {
          this.codeSyncing = false
        }, 3000)
        this.$message.success('录制开始，请等待')
      },
      handleClose() {
        this.codeSyncing = true
        close().then(response => {
          this.codeSyncing = false
          if (response.data.success) {
            this.$message.success('停机完成')
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
        download(row.fileName).then(response => {
          const blob = new Blob([response.data], { type: 'application/octet-stream' })
          const link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = row.fileName
          link.click()
        })
        // 延时恢复
        setInterval(() => {
          this.$set(row, 'running', false)
        }, 3000)
      },
      handleDelete(index, row) {
        this.$set(row, 'running', true)
        deleteFile(row.fileName).then(response => {
          if (response.data.success) {
            this.$message.success('删除完成')
          } else {
            this.$message.error('错了哦，失败 \n ' + response.data.message)
          }
          this.getList()
        })
        // 延时恢复
        setInterval(() => {
          this.$set(row, 'running', false)
        }, 3000)
      }
    }
  }
</script>
