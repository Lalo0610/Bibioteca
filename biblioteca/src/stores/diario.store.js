import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { useAuthStore } from '@/stores';

const baseUrl = `${import.meta.env.VITE_API_URL}/diario`;

export const useDiarioStore = defineStore({
    id: 'diario',
    state: () => ({
        diario: {},
        daily: {}
    }),
    actions: {
        async register(daily) {
            await fetchWrapper.post(`${baseUrl}/register`, daily);
        },
        async getAll() {
            this.diario = { loading: true };
            try {
                this.diario = await fetchWrapper.get(baseUrl);    
            } catch (error) {
                this.diario = { error };
            }
        },
        async getById(id) {
            this.daily = { loading: true };
            try {
                this.daily = await fetchWrapper.get(`${baseUrl}/${id}`);
            } catch (error) {
                this.daily = { error };
            }
        },
        async update(id, params) {
            await fetchWrapper.put(`${baseUrl}/${id}`, params);

            // update stored user if the logged in user updated their own record
            const authStore = useAuthStore();
            if (id === authStore.daily.id) {
                // update local storage
                const daily = { ...authStore.daily, ...params };
                localStorage.setItem('daily', JSON.stringify(daily));

                // update auth user in pinia state
                authStore.daily = daily;
            }
        },
        async delete(id) {
            // add isDeleting prop to user being deleted
            this.diario.find(x => x.id === id).isDeleting = true;

            await fetchWrapper.delete(`${baseUrl}/${id}`);

            // remove user from list after deleted
            this.diario = this.diario.filter(x => x.id !== id);

            // auto logout if the logged in user deleted their own record
            const authStore = useAuthStore();
            if (id === authStore.daily.id) {
                authStore.logout();
            }
        }
    }
});