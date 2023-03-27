<script setup>
import trash from '../components/icon/OcticonTrash16.vue'


const emits = defineEmits(['deleteList'])
const props = defineProps({ 
    addLists: {
        type: Array,
        require: true,
    },

})



</script>
 
<template>
    <div v-for=" (list, index) in addLists">
        <div class=" flex flex-row my-2">
            <span class="mr-3">{{ index + 1 }}.</span>
            <span>{{ list }} ฿</span>
            <trash class="ml-auto text-red-600" @click="$emit('deleteList', index)" />
        </div>
        <hr>
    </div>
</template>
 