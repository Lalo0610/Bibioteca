<script setup>
import { storeToRefs } from 'pinia';

import { useDiarioStore } from '@/stores';

const diarioStore = useDiarioStore();
const { diario } = storeToRefs(diarioStore);
console.log(diario.value)

diarioStore.getAll();
</script>

<template>
    <h1>Registro Diario</h1>
    <router-link to="/diario/add" class="btn btn-outline-success">Agregar Registro</router-link>
    <table class="table table-striped">
        <thead>
            <tr>
                <th style="width: 30%">Fecha</th>
                <th style="width: 30%">No. Control</th>
                <th style="width: 30%">No. Maquina</th>
                <th style="width: 30%">Mesa</th>
                <th style="width: 30%">Entrada</th>
                <th style="width: 30%">Salida</th>
                <th style="width: 10%"></th>
            </tr>
        </thead>
        <tbody>
            <template v-if="diario.length">
                <tr v-for="daily in diario" :key="daily.id">
                    <td>{{  daily.fecha  }}</td>
                    <td>{{ daily.nocontrol }}</td>
                    <td>{{  daily.nomaquina  }}</td>
                    <td>{{  daily.mesa  }}</td>
                    <td>{{  daily.entrada  }}</td>
                    <td>{{  daily.salida  }}</td>
                    <td style="white-space: nowrap">
                        <router-link :to="`/diario/edit/${daily.id}`" class="btn btn-sm btn-primary mr-1">Edit</router-link>
                        <button @click="diarioStorage.delete(daily.id)" class="btn btn-sm btn-danger btn-delete-user" :disabled="daily.isDeleting">
                            <span v-if="daily.isDeleting" class="spinner-border spinner-border-sm"></span>
                            <span v-else>Delete</span>
                        </button>
                    </td>
                </tr>
            </template>
            <tr v-if="diario.loading">
                <td colspan="4" class="text-center">
                    <span class="spinner-border spinner-border-lg align-center"></span>
                </td>
            </tr>
            <tr v-if="diario.error">
                <td colspan="4">
                    <div class="text-danger">Error loading diario: {{diario.error}}</div>
                </td>
            </tr>            
        </tbody>
    </table>
</template>