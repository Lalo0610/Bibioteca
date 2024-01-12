<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useInvenStore, useAlertStore } from '@/stores';
import { router } from '@/router';

const invenStore = useInvenStore();
const alertStore = useAlertStore();
const route = useRoute();
const id = route.params.id;

let title = 'Add Book';
let book = null;
if (id) {
    // edit mode
    title = 'Edit Book';
    ({ book } = storeToRefs(invenStore));
    invenStore.getById(id);
}

const schema = Yup.object().shape({
    numerodeadquisicion: Yup.string()
        .required('Number is required'),
    nombredelibro: Yup.string()
        .required('Name of book is required'),
    nombredelautor: Yup.string()
        .required('Name is required'),
    editorial: Yup.string()
        .required ('Editorial is required'),
    clasificacion: Yup.string()
        .required ('Clasification is required'),
    isbn: Yup.string()
        .required ('ISBN is required'),     
});

async function onSubmit(values) {
    try {
        let message;
        if (book) {
            await invenStore.update(book.value.id, values)
            message = 'Book updated';
        } else {
            await invenStore.register(values);
            message = 'Book added';
        }
        await router.push('/inven');
        alertStore.success(message);
    } catch (error) {
        alertStore.error(error);
    }
}
</script>

<template>
    <h1>{{title}}</h1>
    <template v-if="!(book?.loading || book?.error)">
        <Form @submit="onSubmit" :validation-schema="schema" :initial-values="book" v-slot="{ errors, isSubmitting }">
            <div class="form-row">
                <div class="form-group col">
                    <label>Número de Adquisición</label>
                    <Field name="numerodeadquisicion" type="text" class="form-control" :class="{ 'is-invalid': errors.numerodeadquisicion }" />
                    <div class="invalid-feedback">{{ errors.numerodeadquisicion }}</div>
                </div>
                <div class="form-group col">
                    <label>Nombre del Libro</label>
                    <Field name="nombredellibro" type="text" class="form-control" :class="{ 'is-invalid': errors.nombredelibro }" />
                    <div class="invalid-feedback">{{ errors.nombredelibro }}</div>
                </div>
                <div class="form-group col">
                    <label>Nombre del Autor</label>
                    <Field name="nombredelautor" type="text" class="form-control" :class="{ 'is-invalid': errors.nombredelautor }" />
                    <div class="invalid-feedback">{{ errors.nombredelautor }}</div>
                </div>
            </div>
            <div class="form-group col">
                    <label>Editorial</label>
                    <Field name="editorial" type="text" class="form-control" :class="{ 'is-invalid': errors.editorial }" />
                    <div class="invalid-feedback">{{ errors.editorial }}</div>
                </div>
            

                <div class="form-group col">
                    <label>Clasificación</label>
                    <Field name="clasificacion" type="text" class="form-control" :class="{ 'is-invalid': errors.clasificacion }" />
                    <div class="invalid-feedback">{{ errors.clasificacion }}</div>
                </div>

                <div class="form-group col">
                    <label>ISBN</label>
                    <Field name="isbn" type="text" class="form-control" :class="{ 'is-invalid': errors.isbn }" />
                    <div class="invalid-feedback">{{ errors.isbn }}</div>
                </div>

            <div class="form-group">
                <button class="btn btn-primary" :disabled="isSubmitting">
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                    Save
                </button>
                <router-link to="/inven" class="btn btn-link">Cancel</router-link>
            </div>
        </Form>
    </template>
    <template v-if="book?.loading">
        <div class="text-center m-5">
            <span class="spinner-border spinner-border-lg align-center"></span>
        </div>
    </template>
    <template v-if="book?.error">
        <div class="text-center m-5">
            <div class="text-danger">Error loading user: {{book.error}}</div>
        </div>
    </template>
</template>