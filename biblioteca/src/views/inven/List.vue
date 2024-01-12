<script setup>
import { storeToRefs } from 'pinia';

import { useInvenStore } from '@/stores';

const invenStore = useInvenStore();
const { inven } = storeToRefs(invenStore);
console.log(inven.value)

invenStore.getAll();
</script>

<template>
    <h1>Inventario de Libros</h1>
    <router-link to="/inven/add" class="btn btn-outline-success">Agregar Libro</router-link>
    <table class="table table-striped">
        <thead>
            <tr>
                <th style="width: 30%">Número de Adquisición</th>
                <th style="width: 30%">Nombre del libro</th>
                <th style="width: 30%">Nombre del Autor</th>
                <th style="width: 30%">Editorial</th>
                <th style="width: 30%">Clasificación</th>
                <th style="width: 30%">ISBN</th>
                <th style="width: 10%"></th>
            </tr>
        </thead>
        <tbody>
            <template v-if="inven.length">
                <tr v-for="book in inven" :key="book.id">
                    <td>{{  book.numerodeadquisicion  }}</td>
                    <td>{{ book.nombredellibro }}</td>
                    <td>{{  book.nombredelautor  }}</td>
                    <td>{{  book.editorial  }}</td>
                    <td>{{  book.clasificacion  }}</td>
                    <td>{{  book.isbn  }}</td>
                    <td style="white-space: nowrap">
                        <router-link :to="`/inven/edit/${book.id}`" class="btn btn-sm btn-primary mr-1">Edit</router-link>
                        <button @click="invenStorage.delete(book.id)" class="btn btn-sm btn-danger btn-delete-user" :disabled="book.isDeleting">
                            <span v-if="book.isDeleting" class="spinner-border spinner-border-sm"></span>
                            <span v-else>Delete</span>
                        </button>
                    </td>
                </tr>
            </template>
            <tr v-if="inven.loading">
                <td colspan="4" class="text-center">
                    <span class="spinner-border spinner-border-lg align-center"></span>
                </td>
            </tr>
            <tr v-if="inven.error">
                <td colspan="4">
                    <div class="text-danger">Error loading inven: {{inven.error}}</div>
                </td>
            </tr>            
        </tbody>
    </table>
</template>