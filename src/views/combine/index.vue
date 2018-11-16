<template>
  <div class="app-container">
      <el-upload
        action="http://127.0.0.1:8000/api/UploadFile/"
        class="upload-demo"
        drag
        :auto-upload="false"
        :on-change="OnChange"
        :on-remove="OnRemove"
        :on-preview="handlePreview"
        :before-remove="beforeRemove"
        >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="50%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <el-button type="primary" :loading="uploadLoading" @click="onSubmit">上传处理</el-button>
  </div>
</template>

<style>
.text-wrapper {
  white-space: pre-wrap;
}
</style>

<script>
import { colorPcd } from '@/api/ros'
// import waves from '@/directive/waves' // 水波纹指令

export default {
  data() {
    return {
      param: new FormData(),
      form: {},
      count: 0,
      fileList: [],
      dialogVisible: false,
      dialogImageUrl: '',
      uploadLoading: false
    }
  },
  methods: {
    handlePreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    OnChange(file, fileList) {
      this.fileList = fileList
    },
    OnRemove(file, fileList) {
      this.fileList = fileList
    },
    getFileType(file) {
      const filename = file.name
      const index = filename.lastIndexOf('.')
      const ext = filename.substr(index + 1)
      if (ext === 'pcd') {
        return 'pcd'
      } else if (ext === 'txt') {
        return 'txt'
      }
      return 'image'
    },
    onSubmit() {
      if (this.fileList.length === 0) {
        this.$message.warning('请上传pcd、图片、校准文件')
        return
      }

      for (let i = 0; i < this.fileList.length; i++) {
        const file = this.fileList[i]
        const type = this.getFileType(file)
        this.param.append(type, this.fileList[i].raw)
      }

      console.log(this.fileList)
      colorPcd(this.param).then(res => {
        this.uploadLoading = true
        this.$message.success('开始处理，请等待')

        if (res.data === 1) {
          this.uploadLoading = false
        }
      })
    }
  }
}
</script>
