<template>
    <!-- <div>你好</div> -->
  <el-container> 
       <el-aside width="180px" style="background-color: #232323;display: flex;align-items: center;flex-direction: column;">
        <div class="option" style="margin-top: 30px;height: 80px;padding-left:25px" >
            <img width="86%" src="https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/111/logo (3) - 副本.png" alt="">
        </div> 
        
        <div class="option"  >
          <div class="text">
<RouterLink active-class="active" :to="'/article/manage'">
        <el-icon >
        <Document />
      </el-icon>文章管理
    </RouterLink>
    </div>
    </div>

         <div class="option"  >
          <div class="text">
<RouterLink active-class="active" :to="'/article/channel'">
        <el-icon >
      <Search/>
      </el-icon>文章分类
    </RouterLink>
    </div>
    </div>
    
    <div class="option"  >
          <div class="text">
<RouterLink active-class="active" :to="'/myself/myself'">
        <el-icon >
          <Avatar />
         </el-icon>个人资料
    </RouterLink>
    </div>
    </div>
    <div class="option"  >
          <div class="text">
<RouterLink active-class="active" :to="'/password/password'">
        <el-icon >
        <EditPen />
      </el-icon>账号设置
    </RouterLink>
    </div>
    </div>  

  
       </el-aside>
      <el-container>
        <el-header style="background-color:#ffffff;">
        
        <div>
            管理员：<strong>{{
            userStore.user.nickname || userStore.user.username
          }}</strong>
        </div>
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <!-- 展示给用户，默认看到的 -->
          <span class="el-dropdown__box">
            <el-avatar :src="userStore.user.user_pic " />
            <el-icon><CaretBottom /></el-icon>
           
          </span>

          <!-- 折叠的下拉部分 -->
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="myself" :icon="User"
                >基本资料</el-dropdown-item
              >
             
              <el-dropdown-item command="password" :icon="EditPen"
                >账号设置</el-dropdown-item
              >
              <el-dropdown-item command="logout" :icon="SwitchButton"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      
        </el-header>
        <el-main style="background-color:#f2efed;display: flex;align-items: center;padding-top: 0px;">
            <router-view></router-view>
        </el-main>
        <el-footer style="background-color:#f2efed;font-size: smaller;display: flex;justify-content: center;align-items: center;">
            <div>Create by @CrimsonVan</div>
            
        </el-footer>
      </el-container>
    </el-container>  

  
  </template>
<script setup>

import { useRouter, useRoute } from 'vue-router'
import { ArrowDown,Search,Avatar,User,Crop,EditPen,SwitchButton,CaretBottom,Document } from '@element-plus/icons-vue'
import { useUserStore } from '../../stores';
// import{ElMessageBox }from 'element-plus'
const userStore=useUserStore()
const router=useRouter()

const handleCommand = async (key) => {
  if (key === 'logout') {
    // 退出操作
   try{
    await ElMessageBox.confirm('你确认要进行退出么', '温馨提示', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    })
   } catch{
    return
   }

    // 清除本地的数据 (token + user信息)
    userStore.removeToken()
    userStore.setUser({})
    router.push('/login')
  } else {
    // 跳转操作
    router.push(`/${key}/${key}`)
  }
}
const goArticleChannel=()=>{
router.push({
    path:'/article/channel'
})
}
const goArticleManage=()=>{
router.push({
    path:'/article/manage'
})
}
const goMyselfMyself=()=>{
    router.push({
    path:'/myself/myself'
})}
const goPassword=()=>{
    router.push({
    path:'/password/password'
})
}
</script>
<style lang="scss" scoped>
    
    .el-container{
        
        margin: 0;
        height: 100%;
        .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-dropdown__box {
      display: flex;
      align-items: center;
      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }
       .option{
        // padding: 20px ;
        display: flex;
        align-items: center;
        width: 80%;
        height: 5%;
        color: #ffffff;
        margin-bottom: 20px;

        .el-dropdown-link .el-icon--right{
            color: #ffffff;
        }
        .text{
          padding-left: 20px;
          width: 100%;
          a {
                color: #ffffff;
                text-decoration: none;
               
            }
             a:hover {
                    color: #1296db;
                }
            .active {
                color: #1296db;
            } 
       }
      
      
    }
  
  }


</style>

