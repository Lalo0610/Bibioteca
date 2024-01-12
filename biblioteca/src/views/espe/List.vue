<script setup>
import { storeToRefs } from 'pinia';

import { useEspeStore } from '@/stores';
import { router} from '@/router';
const espeStore = useEspeStore();
const { espe } = storeToRefs(espeStore);
console.log(espe.value)

espeStore.getAll();
</script>

<template>
    <h1>Cuentas de Invitados</h1>
    <router-link to="/espe/add" class="btn btn-outline-success">Agregar Invitado</router-link>
    <table class="table table-striped">
        <thead>
            <tr>
                <th style="width: 30%">Nombre Completo</th>
                <th style="width: 30%">Correo Institucional</th>
                <th style="width: 30%">TEC de Procedencia</th>
                <th style="width: 10%"></th>
            </tr>
        </thead>
        <tbody>
            <template v-if="espe.length">
                <tr v-for="guest in espe" :key="guest.id">
                    <td>{{  guest.nombrecompleto  }}</td>
                    <td>{{ guest.correoinstitucional }}</td>
                    <td>{{  guest.tecprocedencia  }}</td>
                    <td style="white-space: nowrap">
                        <router-link :to="`/espe/edit/${guest.id}`" class="btn btn-sm btn-primary mr-1">Edit</router-link>
                        <button @click="espeStorage.delete(guest.id)" class="btn btn-sm btn-danger btn-delete-user" :disabled="guest.isDeleting">
                            <span v-if="guest.isDeleting" class="spinner-border spinner-border-sm"></span>
                            <span v-else>Delete</span>
                        </button>
                    </td>
                </tr>
            </template>
            <tr v-if="espe.loading">
                <td colspan="4" class="text-center">
                    <span class="spinner-border spinner-border-lg align-center"></span>
                </td>
            </tr>
            <tr v-if="espe.error">
                <td colspan="4">
                    <div class="text-danger">Error loading espe: {{espe.error}}</div>
                </td>
            </tr>            
        </tbody>
    </table>
</template>