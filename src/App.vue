<script setup>
import { ref } from 'vue';
import HistoryManagement from './components/HistoryManagement.vue';
import AddEditList from './components/AddEditList.vue'
import NavBar from './components/NavBar.vue';
import { RouterView } from 'vue-router';




// const currentComponant = ref('AddEditComp')
// const setCurrentComponant = (currentComp) => {
//   currentComponant.value = currentComp
//   console.log(currentComponant.value)
// }
</script>

<template>
  <div>
    <div class="w-full">
      <NavBar />
      <RouterView></RouterView>
    </div>
  </div>
</template>
 
<style scoped></style>
