<script setup>

const props = defineProps({
    buttName: {
        type: String,
        require: true
    },
    buttFunc: {
        type: Function,
        require: true
    },
    parameter:{
        require:false
    }
})

</script>
 
<template>
    <div>
        <button class="w-24 text-center py-3 "  @click="buttFunc(parameter)">{{ buttName }}</button>
    </div>
</template>