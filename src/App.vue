<script setup>
import { ref } from 'vue';

import HistoryManagement from './components/HistoryManagement.vue';
import AddEditList from './components/AddEditList.vue'


const currentComponant = ref('AddEditComp')
const setCurrentComponant = (currentComp) => {
  currentComponant.value = currentComp
  console.log(currentComponant.value)

}

</script>
 
<template>
  <div>
    <div class="w-full">
      <!-- header -->
      <div class="flex flex-row" style="background-color: #DFE6F9;">
        <div class=" text-xl font-bold p-3 px-8 bg-sky-900 text-yellow-500">203 Store</div>

        <button class="w-24 text-center py-3 " @click="setCurrentComponant('AddEditComp')">Cashier</button>
        <button class="w-24 text-center py-3 " @click="setCurrentComponant('histComp')">History</button>

      </div>


      <!-- content -->
      <AddEditList v-if="currentComponant === 'AddEditComp'" />

      <!-- History -->
      <HistoryManagement v-if="currentComponant === 'histComp'" />



    </div>
  </div>
</template>
 
<style scoped></style>