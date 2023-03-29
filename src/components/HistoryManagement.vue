<script setup>
import { ref, onMounted } from 'vue';
import { getHistory } from '../composable/getHistory.js'
import trash from './icon/OcticonTrash16.vue'
import editIcon from './icon/MaterialSymbolsEditSquareOutlineRounded.vue'
import AddEditList from './AddEditList.vue';

const historyList = ref([])

const currentComponant = ref('histComp')
const setCurrentComponant = (currentComp) => {
    currentComponant.value = currentComp
    console.log(currentComponant.value)
}

const editHis = ref(undefined)
const setEditMode = (history) => {
    editHis.value = history
    setCurrentComponant('AddEditComp')
}

onMounted(async () => {
    historyList.value = await getHistory()
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

const editHistory = async (updatedHistory) => {
    console.log(updatedHistory)
    try {
        const res = await fetch(`http://localhost:5000/history/${updatedHistory.id}`,
            {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    date: updatedHistory.date,
                    customer: updatedHistory.customer,
                    discount: updatedHistory.discount,
                    total: updatedHistory.total,
                    addList: updatedHistory.addList
                })
            })
        if (res.status === 200) {
            console.log('update successfully')

            const edited = await res.json()
            historyList.value = historyList.value.map((list) => {
                if (list.id === edited.id) {
                    list.date = edited.date
                    list.customer = edited.customer
                    list.discount = edited.discount
                    list.total = edited.total
                    list.addList = edited.addList
                }
                return list
            })
            console.log(historyList)

            setCurrentComponant('histComp')
            editHis.value = undefined
        } else {
            throw new Error('cannot edit')
        }
    }
    catch (err) {
        console.log(err)
    }
}

</script>
<template>
    <div class="w-full mt-10" v-if="currentComponant == 'histComp'">
        <div class="bg-zinc-200 rounded-3xl w-6/12 mx-auto flex flex-col" style="height: 50rem;">
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
                    <editIcon class="ml-16" @click="setEditMode(history)" />
                    <div class="mr-auto">{{ history.date }}</div>
                    <div class="">{{ history.customer }}</div>
                    <div class="text-red-500">{{ history.discount !== 0 ? history.discount : '-' }}</div>
                    <div class="">{{ history.total }}</div>
                    <trash class="text-red-500 ml-10" @click="deleteQuestion(history.id)" />
                </div>
            </div>
            <button class="bg-white py-3 px-14 rounded-xl my-10 mx-auto font-semibold"
                @click="setCurrentComponant('AddEditComp')">Back</button>
        </div>
    </div>
    <AddEditList v-if="currentComponant === 'AddEditComp'" :hisList="editHis" @edit="editHistory" />
</template>
<style scoped></style>
