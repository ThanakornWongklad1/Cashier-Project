<script setup>

</script>
 
<template>
    <div class="w-full">
        <div class="flex flex-row" style="background-color: #DFE6F9;">
            <div class=" text-xl font-bold p-3 px-8" style="background-color:#304477; color: #FFC635;">203 Store</div>
            <RouterLink :to="{ name: 'AddEditListView' }" active-class="active" class="w-24 text-center py-3">
                Cashier
            </RouterLink>
            <RouterLink :to="{ name: 'HistoryManagementView' }" active-class="active" class="w-24 text-center py-3">
                History
            </RouterLink>

        </div>
    </div>
</template>
 
<style scoped>
.active {
    background-color: #6d7eb1;
    color: white;
    transition: color, background-color 0.8s ease;

    /* transition: background-color 0.5s ease; */
}
</style>