import { Layout, List, AddEdit } from '@/views/espe';

export default {
    path: '/espe',
    component: Layout,
    children: [
        { path: '', component: List },
        { path: 'add', component: AddEdit },
        { path: 'edit/:id', component: AddEdit }
    ]
};