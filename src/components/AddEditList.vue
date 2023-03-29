<script setup>
import { ref, onMounted } from 'vue';
import trash from './icon/OcticonTrash16.vue'
import HistoryManagement from './HistoryManagement.vue';

const emits = defineEmits(['edit'])

const props = defineProps({
    hisList: {
        type: Object
    }
})

let price = ref('')

const updateAddList = ref({})

const currentComponant = ref('AddEditComp')
const setCurrentComponant = (currentComp) => {
    currentComponant.value = currentComp
    console.log(currentComponant.value)
}

onMounted(() => {
    // Add mode 
    if (props.hisList === undefined) {
        updateAddList.value = {
            date: "",
            customer: "Guest",
            discount: 0,
            total: 0,
            addList: []
        }
    }
    // Edit mode
    else {
        updateAddList.value = props.hisList
    }
})

const addArray = (inputPrice) => {
    if (inputPrice > 0 && inputPrice !== "" && inputPrice !== undefined && inputPrice !== null) {
        updateAddList.value.addList?.push(inputPrice)

        // add discount to updatedList
        updateAddList.value.discount = Number(discount())

        // add total to updatedList
        updateAddList.value.total = Number(total())

        // clear input
        price.value = ''

        // console.log(updateAddList.value)
    } else {
        console.log('blank')
    }
}

const deleteAddList = (index) => {
    updateAddList.value.addList?.splice(index, 1)
}

const subTotal = () => {
    let sTotal = updateAddList.value.addList?.reduce(
        (acc, curr) => acc + curr, 0
    )
    let cal = (Math.round(sTotal * 100) / 100).toFixed(2)
    return cal
}

const criteriaDiscount = () => {
    if (updateAddList.value.customer === 'Member') {
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
    updateAddList.value.discount = Number(cal)
    return cal
}

const total = () => {
    let cal = (Math.round((subTotal() - discount()) * 100) / 100).toFixed(2)
    updateAddList.value.total = Number(cal)
    return cal
}

const calPercent = (percent) => {
    if (criteriaDiscount() === (percent / 100)) {
        return 'bg-emerald-500 text-black'
    } else {
        return 'bg-zinc-300 text-zinc-500'
    }
}

const list = ref([])

const addNewList = async (newList) => {
    // console.log(newList)
    //date time
    updateAddList.value.date = new Date().toLocaleString()

    // add discount to updatedList
    updateAddList.value.discount = Number(discount())

    // add total to updatedList
    updateAddList.value.total = Number(total())


    if (updateAddList.value.total !== 0) {
        setCurrentComponant('histComp')

        try {
            const res = await fetch('http://localhost:5000/history', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    date: newList.date,
                    customer: newList.customer,
                    discount: newList.discount,
                    total: newList.total,
                    addList: newList.addList
                })
            })
            if (res.status === 201) {
                console.log('add successfully')
                // const addedList = await res.json()
                // list.value.push(addedList)
                // console.log(list.value)
            } else {
                throw new Error('cannot add')
            }
        } catch (err) {
            console.log(err)
        }
    }

}

</script>
<template>
    <div v-if="currentComponant == 'AddEditComp'">
        <div class="mx-32 flex flex-col">
            <div class="font-semibold text-2xl my-3" style="color: #304477;">Cashier</div>
            <div class="bg-zinc-200 rounded-lg px-14 py-5 flex flex-col">
                <!-- input -->
                <div class="flex flex-row">
                    <input type="number" class="w-full rounded-md px-8" placeholder="input price" v-model="price"
                        @keyup.enter="addArray(price)">
                    <button class="py-3 w-24 text-center ml-4 rounded-md text-white bg-blue-600"
                        @click="addArray(price)">Add</button>
                </div>
                <!-- header add list -->
                <div class="my-3 text-xl">Add List</div>
                <!-- add list -->
                <div class="flex flex-col bg-white rounded-md px-8 py-3 w-full h-52 overflow-auto ">
                    <div v-for=" (list, index) in updateAddList?.addList">
                        <div class=" flex flex-row my-2">
                            <span class="mr-3">{{ index + 1 }}.</span>
                            <span>{{ list }} ฿</span>
                            <trash class="ml-auto text-red-600" @click="deleteAddList(index)" />
                        </div>
                        <hr>
                    </div>
                </div>

                <!-- radio button -->
                <div class="flex flex-row my-3">
                    <div>Customer : </div>
                    <input type="radio" name="customer" value="Guest" id="guest" v-model="updateAddList.customer"
                        class="ml-4 accent-blue-600" checked><label for="guest">Guest</label>
                    <input type="radio" name="customer" value="Member" id="member" v-model="updateAddList.customer"
                        class="ml-4 accent-blue-600"><label for="member">Member</label>
                </div>

                <!-- discount -->
                <div class="flex flex-col">
                    <div>Discount ( {{ updateAddList.customer }} ) :</div>
                    <div class="flex flex-row mt-3">
                        <div class="px-10 py-4 mx-3 rounded-md font-semibol" :class="calPercent(5)">5%</div>
                        <div class="px-10 py-4 mx-3 rounded-md font-semibol" :class="calPercent(10)">10%</div>
                        <div class="px-10 py-4 mx-3 rounded-md font-semibol" :class="calPercent(20)">20%</div>
                        <div class="px-10 py-4 mx-3 rounded-md font-semibol" :class="calPercent(30)">30%</div>
                    </div>
                </div>
                <!-- summary price -->
                <div class="flex flex-col">
                    <div class="text-right">Sub Total : {{ subTotal() }} ฿</div>
                    <div class="text-right text-red-500">Discount : {{ discount() }} ฿</div>
                    <div class="text-right text-green-600 font-semibold text-2xl">Total : {{ total() }} ฿</div>
                </div>
                <div class="flex justify-end my-5">
                    <button class="w-26 rounded-md p-3 text-white bg-red-600" v-if="updateAddList.id"
                        @click="$emit('edit', updateAddList
                        )">Edit</button>
                    <button class="w-26 rounded-md p-3 text-white bg-blue-600" @click="addNewList(updateAddList)"
                        v-else>Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <HistoryManagement v-if="currentComponant == 'histComp'" />
</template>
 
<style scoped></style>
