import { Layout, List, AddEdit } from '@/views/inven';

export default {
    path: '/inven',
    component: Layout,
    children: [
        { path: '', component: List },
        { path: 'add', component: AddEdit },
        { path: 'edit/:id', component: AddEdit }
    ]
};