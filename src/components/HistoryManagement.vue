<script setup>
import { ref, onMounted } from 'vue';
import { getHistory } from '../composable/getHistory.js'
import trash from './icon/OcticonTrash16.vue'
import editIcon from './icon/MaterialSymbolsEditSquareOutlineRounded.vue'

const historyList = ref([])
onMounted(async () => {
    historyList.value = await getHistory()
    // console.log(historyList.value)
})
const deleteQuestion = async (deleteId) => {
    try {
        const res = await fetch(`http://localhost:5000/history/${deleteId}`, {
            method: 'DELETE'
        })
        if (res.ok) {
            historyList.value = historyList.value.filter((his) => {
                return his.id !== deleteId
            })
        } else throw new error('Error, cannot delete data!')
    } catch (error) {
        console.log(error)
    }
}


</script>
 
<template>
    <div class="w-full mt-10">

        <div class="bg-zinc-200 rounded-3xl w-9/12 mx-auto flex flex-col" style="height: 50rem;">
            <div class="font-bold text-3xl my-auto text-center py-10" style="color: #304477;">
                History
            </div>
            <div class="bg-white overflow-auto w-full" style="height: 35rem;">
                <div class="grid grid-cols-6 text-center font-semibold py-4">
                    <div class="col-span-2 ml-36">Date</div>
                    <div>Customers</div>
                    <div>Discount</div>
                    <div class="col-span-2 mr-36">Purchase</div>
                </div>
                <div class="grid grid-cols-6 text-center py-3 hover:bg-zinc-100 rounded-lg " v-for="history in historyList">
                    <editIcon class="ml-16" />
                    <div class="">{{ history.date }}</div>
                    <div class="">{{ history.customer }}</div>
                    <div class="text-red-500">{{ history.discount }}%</div>
                    <div class="">{{ history.total }}</div>
                    <trash class="text-red-500 ml-10" @click="deleteQuestion(history.id)" />
                </div>
            </div>
            <button class="bg-white py-3 px-14 rounded-xl my-10 mx-auto font-semibold">Back</button>
        </div>
    </div>
</template>
 
<style scoped></style>
