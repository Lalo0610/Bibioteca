import { Layout, List, AddEdit } from '@/views/diario';

export default {
    path: '/diario',
    component: Layout,
    children: [
        { path: '', component: List },
        { path: 'add', component: AddEdit },
        { path: 'edit/:id', component: AddEdit }
    ]
};