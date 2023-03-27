<script setup>

const props = defineProps({
    percent: {
        type: Number,
        required: true
    },
    calculateFunction: {
        type: Function,
        required: true
    }
})

</script>
 
<template>
    <div class="px-10 py-4 mx-3 rounded-md font-semibol" :class="calculateFunction(percent)">{{ percent }}%</div>
</template>
