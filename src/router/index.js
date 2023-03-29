import { createRouter, createWebHistory } from 'vue-router'
import AddEditList from '../components/AddEditList.vue'
import HistoryManagement from '../components/HistoryManagement.vue'
import PathNotFound from '../views/PathNotFound.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'AddEditListView',
            component: AddEditList
        },
        {
            path: '/historyManagement',
            name: 'HistoryManagementView',
            component: HistoryManagement
        },
        {
            path: '/:pathnotfound(.*)',
            name: 'PathNotFound',
            component: PathNotFound
        }
    ]
})

export default router