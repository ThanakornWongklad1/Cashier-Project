<script setup>
import { ref } from 'vue';

import ListComp from './components/ListComp.vue';
import ButtonComp from './components/ButtonComp.vue';
import DiscountCoupon from './components/DiscountCoupon.vue'
import history from '../data/db.json'

let isCashier = ref(true)
let isHistory = ref(false)

const changeToHis = () => {
  isCashier.value = false
  isHistory.value = true
}
const changeToCash = () => {
  isCashier.value = true
  isHistory.value = false
}

let price = ref('')
let customer = ref('guest')



let addList = ref([])

const addArray = (inputPrice) => {
  if (inputPrice > 0 && inputPrice !== "" && inputPrice !== undefined && inputPrice !== null) {
    addList.value.push(inputPrice)
    console.log(addList.value)
    price.value = ''

    // console.log(subTotal())
  } else {
    console.log('blank')
  }

}

const deleteAddList = (index) => {
  addList.value.splice(index, 1)
}


const subTotal = () => {
  let sTotal = addList.value.reduce(
    (acc, curr) => acc + curr, 0
  )
  let cal = (Math.round(sTotal * 100) / 100).toFixed(2)
  return cal
}

const criteriaDiscount = () => {
  if (customer.value === 'member') {
    if (subTotal() >= 500 && subTotal() <= 999) {
      return 0.05
    } else if (subTotal() >= 1000 && subTotal() <= 1999) {
      return 0.1
    } else if (subTotal() >= 2000 && subTotal() <= 2999) {
      return 0.2
    } else if (subTotal() >= 3000) {
      return 0.3
    } else {
      return 0
    }
  } else {
    return 0
  }
}

const discount = () => {
  let cal = (Math.round((criteriaDiscount() * subTotal()) * 100) / 100).toFixed(2)
  return cal
}
const total = () => {
  let cal = (Math.round((subTotal() - discount()) * 100) / 100).toFixed(2)
  return cal
}

const calPercent = (percent) => {
  if (criteriaDiscount() === (percent / 100)) {
    return 'bg-emerald-500 text-black'
  } else {
    return 'bg-zinc-300 text-zinc-500'
  }
}


</script>
 
<template>
  <div>
    <div class="w-full">
      <!-- header -->
      <div class="flex flex-row" style="background-color: #DFE6F9;">
        <div class=" text-xl font-bold p-3 px-8 bg-sky-900 text-yellow-500">203 Store</div>
        <!-- +1 componant -->
        <ButtonComp :buttName="'Cashier'" :buttFunc="changeToCash" />
        <ButtonComp :buttName="'History'" :buttFunc="changeToHis" />

      </div>


      <!-- content -->
      <div class="mx-32 flex flex-col" v-show="isCashier">
        <div class="font-semibold text-2xl my-3" style="color: #304477;">Cashier</div>

        <div class="bg-zinc-200 rounded-lg px-14 py-5 flex flex-col">

          <!-- input -->
          <div class="flex flex-row">
            <input type="number" class="w-full rounded-md px-8" placeholder="input price" v-model="price"
              @keyup.enter="addArray(price)">
            <ButtonComp :buttName="'Add'" :buttFunc="addArray" :parameter="price"
              class="w-24 text-center ml-4 rounded-md text-white" style="background-color: #4263EB;" />
          </div>


          <div class="my-3 text-xl">Add List</div>

          <!-- add list -->
          <div class="flex flex-col bg-white rounded-md px-8 py-3 w-full h-52 overflow-auto ">
            <!-- +1 componant -->
            <ListComp :addLists="addList" @deleteList="deleteAddList" />
          </div>

          <!-- radio button -->
          <div class="flex flex-row my-3">
            <div>Customer : </div>
            <input type="radio" name="customer" value="guest" id="guest" v-model="customer" class="ml-4 accent-blue-600"
              checked><label for="guest">Guest</label>
            <input type="radio" name="customer" value="member" id="member" v-model="customer"
              class="ml-4 accent-blue-600"><label for="member">Member</label>
          </div>

          <!-- discount -->
          <div class="flex flex-col">
            <div>Discount ( {{ customer }} ) :</div>
            <div class="flex flex-row mt-3">
              <!-- +1 componant -->
              <DiscountCoupon :calculate-function="calPercent" :percent="5" />
              <DiscountCoupon :calculate-function="calPercent" :percent="10" />
              <DiscountCoupon :calculate-function="calPercent" :percent="20" />
              <DiscountCoupon :calculate-function="calPercent" :percent="30" />
            </div>
          </div>

          <!-- summary price -->
          <div class="flex flex-col">
            <div class="text-right">Sub Total : {{ subTotal() }} ฿</div>
            <div class="text-right text-red-500">Discount : {{ discount() }} ฿</div>
            <div class="text-right text-green-600 font-semibold text-2xl">Total : {{ total() }} ฿</div>
          </div>

          <div class="flex justify-end my-5">
            <button class="w-20 rounded-md p-3 text-white" style="background-color: #4263EB;">Confirm</button>
          </div>
        </div>
      </div>


      <!-- History -->
      <div class="mt-5 mx-32 flex flex-col" v-show="!isCashier">
        <div class="font-semibold text-2xl mb-5" style="color: #304477;">History</div>

        <div class="bg-zinc-200 rounded-lg px-14 py-5 flex flex-col overflow-auto w-full h-96">
          <div class="grid grid-cols-4 text-center">
            <div class="font-semibold">Date</div>
            <div class="font-semibold">Customers</div>
            <div class="font-semibold">Discount</div>
            <div class="font-semibold">purchase</div>
          </div>
          <hr class="border-zinc-400 my-4">
          <div class="grid grid-cols-4 text-center" v-for="his in history">
            <div>{{ his.time }}</div>
            <div>{{ his.customer }}</div>
            <div>{{ his.discount }}</div>
            <div class="flex flex-row ml-12">
              <div>{{ his.purchase }}</div>
              <div class="ml-3">{{ his.edited == 'true' ? '( edited )' : '' }}</div>
            </div>
            <!-- <div>{{ his.edited == 'true' ? '( edited )' : '' }}</div> -->
          </div>
        </div>



      </div>



    </div>
  </div>
</template>
 
<style scoped></style>