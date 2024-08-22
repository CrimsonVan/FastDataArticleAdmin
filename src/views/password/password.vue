<template>
    <div  style="display: flex;flex-direction: column;width: 100%;height: 90%;background-color:#ffffff;"> 
       <div style="display: flex;justify-content: space-between;align-items: center;height: 60px;background-color: #ffffff;border-bottom: 1px solid #f2efed;">
        <div style="margin-left: 16px;font-weight: bold;">账号设置</div>
      </div>
       <el-form
      ref="ruleFormRef"
      style="width: 500px;margin-top:40px;margin-left: 30px;"
      :model="userInfo"
      status-icon
    
      label-width="auto"
      class="demo-ruleForm"
    > 
 
    <el-form-item label="原密码" >
        <el-input v-model="userInfo.oldpass" type="password"  />
      </el-form-item>
      <el-form-item label="新密码" >
        <el-input v-model="userInfo.newpass"  autocomplete="off" type="password" />
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input
          v-model="userInfo.reconfirmpass"
          type="password" 
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="submitForm">
            确认修改
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">重置内容</el-button>
      </el-form-item>
    </el-form>
  
    </div>
    
  </template>
  
  <script  setup>
  import {  ref } from 'vue'
  import { userUpdatePasswordService } from '../../api/user';
  const userInfo=ref({
       oldpass:'',
       newpass:'',
        reconfirmpass:''
  })
  
  const ruleFormRef = ref()
  const resetForm = () => {
  userInfo.value.oldpass=''
  userInfo.value.newpass=''
  userInfo.value.reconfirmpass=''
  }
 
  const submitForm=async()=>{
 try{
  let res=await userUpdatePasswordService({
        
    old_pwd:userInfo.value.oldpass ,
    new_pwd:userInfo.value.newpass,
    re_pwd: userInfo.value.reconfirmpass,
    })

ElMessage.success(res.data.message || '修改成功')

 }catch{
return
 }  
 userInfo.value={
oldpass:'',
newpass:'',
reconfirmpass:''
  }

  }
  
  </script>
  <style lang="scss">
  
  
  </style>