import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { useAuthStore } from '@/stores';

const baseUrl = `${import.meta.env.VITE_API_URL}/espe`;

export const useEspeStore = defineStore({
    id: 'espe',
    state: () => ({
        espe: {},
        guest: {}
    }),
    actions: {
        async register(guest) {
            await fetchWrapper.post(`${baseUrl}/register`, guest);
        },
        async getAll() {
            this.espe = { loading: true };
            try {
                this.espe = await fetchWrapper.get(baseUrl);    
            } catch (error) {
                this.espe = { error };
            }
        },
        async getById(id) {
            this.guest = { loading: true };
            try {
                this.guest = await fetchWrapper.get(`${baseUrl}/${id}`);
            } catch (error) {
                this.guest = { error };
            }
        },
        async update(id, params) {
            await fetchWrapper.put(`${baseUrl}/${id}`, params);

            // update stored user if the logged in user updated their own record
            const authStore = useAuthStore();
            if (id === authStore.guest.id) {
                // update local storage
                const guest = { ...authStore.guest, ...params };
                localStorage.setItem('guest', JSON.stringify(guest));

                // update auth user in pinia state
                authStore.guest = guest;
            }
        },
        async delete(id) {
            // add isDeleting prop to user being deleted
            this.espe.find(x => x.id === id).isDeleting = true;

            await fetchWrapper.delete(`${baseUrl}/${id}`);

            // remove user from list after deleted
            this.espe = this.espe.filter(x => x.id !== id);

            // auto logout if the logged in user deleted their own record
            const authStore = useAuthStore();
            if (id === authStore.guest.id) {
                authStore.logout();
            }
        }
    }
});