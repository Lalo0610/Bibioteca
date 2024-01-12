import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { useAuthStore } from '@/stores';

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useInvenStore = defineStore({
    id: 'inven',
    state: () => ({
        inven: {},
        book: {}
    }),
    actions: {
        async register(book) {
            await fetchWrapper.post(`${baseUrl}/register`, book);
        },
        async getAll() {
            this.inven = { loading: true };
            try {
                this.inven = await fetchWrapper.get(baseUrl);    
            } catch (error) {
                this.inven = { error };
            }
        },
        async getById(id) {
            this.book = { loading: true };
            try {
                this.book = await fetchWrapper.get(`${baseUrl}/${id}`);
            } catch (error) {
                this.book = { error };
            }
        },
        async update(id, params) {
            await fetchWrapper.put(`${baseUrl}/${id}`, params);

            // update stored user if the logged in user updated their own record
            const authStore = useAuthStore();
            if (id === authStore.book.id) {
                // update local storage
                const book = { ...authStore.book, ...params };
                localStorage.setItem('book', JSON.stringify(book));

                // update auth user in pinia state
                authStore.book = book;
            }
        },
        async delete(id) {
            // add isDeleting prop to user being deleted
            this.inven.find(x => x.id === id).isDeleting = true;

            await fetchWrapper.delete(`${baseUrl}/${id}`);

            // remove user from list after deleted
            this.inven = this.inven.filter(x => x.id !== id);

            // auto logout if the logged in user deleted their own record
            const authStore = useAuthStore();
            if (id === authStore.book.id) {
                authStore.logout();
            }
        }
    }
});