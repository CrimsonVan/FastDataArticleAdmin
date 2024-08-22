<template>
   <el-button type="primary" @click="dialogFormVisible = true">
      添加分类
    </el-button>
  
    <el-dialog v-model="dialogFormVisible" title="添加分类" width="500">
      <el-form :model="form">
        <el-form-item label="分类" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="别名" :label-width="formLabelWidth">
          <el-input v-model="form.region" autocomplete="off" />
        </el-form-item>
        
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="addChannel">
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>

  </template>
  
  <script  setup>

import{artAddChannelService}from '../../../api/articles'

import {  ref } from 'vue'
  
const emit = defineEmits(['success'])

  const dialogFormVisible = ref(false)
  const formLabelWidth = '140px'
  
  const form = ref({
    name: '',
    region: ''
  })
  const addChannel=async()=>{
    dialogFormVisible.value = false
   let res=await artAddChannelService({
        cate_name:form.value.name, 
        cate_alias:form.value.region
    })
    form.value={
    name: '',
    region: ''
  }
  emit('success')
      //  console.log('打印添加分类的res',res);
       
}
  </script>