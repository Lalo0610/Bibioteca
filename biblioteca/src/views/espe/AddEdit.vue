<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useEspeStore, useAlertStore } from '@/stores';
import { router } from '@/router';

const espeStore = useEspeStore();
const alertStore = useAlertStore();
const route = useRoute();
const id = route.params.id;

let title = 'Add Guest';
let guest = null;
if (id) {
    // edit mode
    title = 'Edit Guest';
    ({ guest } = storeToRefs(espeStore));
    espeStore.getById(id);
}

const schema = Yup.object().shape({
    nombrecompleto: Yup.string()
        .required('Name is required'),
    correoinstitucional: Yup.string()
        .required('Email of book is required'),
    tecprocedencia: Yup.string()
        .required('TEC is required'),    
});

async function onSubmit(values) {
    try {
        let message;
        if (guest) {
            await invenStore.update(guest.value.id, values)
            message = 'Guest updated';
        } else {
            await espeStore.register(values);
            message = 'Guest added';
        }
        await router.push('/espe');
        alertStore.success(message);
    } catch (error) {
        alertStore.error(error);
    }
}
</script>

<template>
    <h1>{{title}}</h1>
    <template v-if="!(guest?.loading || guest?.error)">
        <Form @submit="onSubmit" :validation-schema="schema" :initial-values="guest" v-slot="{ errors, isSubmitting }">
            <div class="form-row">
                <div class="form-group col">
                    <label>Nombre Completo</label>
                    <Field name="nombrecompleto" type="text" class="form-control" :class="{ 'is-invalid': errors.nombrecompleto }" />
                    <div class="invalid-feedback">{{ errors.nombrecompleto }}</div>
                </div>
                <div class="form-group col">
                    <label>Correo Institucional</label>
                    <Field name="correoinstitucional" type="text" class="form-control" :class="{ 'is-invalid': errors.correoinstitucional }" />
                    <div class="invalid-feedback">{{ errors.correoinstitucional }}</div>
                </div>
                <div class="form-group col">
                    <label>TEC de Procedencia</label>
                    <Field name="tecprocedencia" type="text" class="form-control" :class="{ 'is-invalid': errors.tecprocedencia }" />
                    <div class="invalid-feedback">{{ errors.tecprocedencia }}</div>
                </div>
            </div>

            <div class="form-group">
                <button class="btn btn-primary" :disabled="isSubmitting">
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                    Save
                </button>
                <router-link to="/espe" class="btn btn-link">Cancel</router-link>
            </div>
        </Form>
    </template>
    <template v-if="guest?.loading">
        <div class="text-center m-5">
            <span class="spinner-border spinner-border-lg align-center"></span>
        </div>
    </template>
    <template v-if="guest?.error">
        <div class="text-center m-5">
            <div class="text-danger">Error loading guest: {{guest.error}}</div>
        </div>
    </template>
</template>