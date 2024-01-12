<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useDiarioStore, useAlertStore } from '@/stores';
import { router } from '@/router';

const diarioStore = useDiarioStore();
const alertStore = useAlertStore();
const route = useRoute();
const id = route.params.id;

let title = 'Registro Diario';
let daily = null;
if (id) {
    // edit mode
    title = 'Edit Daily';
    ({ daily } = storeToRefs(diarioStore));
    diarioStore.getById(id);
}

const schema = Yup.object().shape({
    fecha: Yup.string()
        .required('Fecha is required'),
    nocontrol: Yup.string()
        .required('Number of book is required'),
    nomaquina: Yup.string()
        .notRequired('Maquina is required'),
    mesa: Yup.string()
        .notRequired ('Mesa is required'),
    entrada: Yup.string()
        .required ('Entrada is required'),
    salida: Yup.string()
        .required ('Salida is required'),     
});

async function onSubmit(values) {
    try {
        let message;
        if (daily) {
            await diarioStore.update(daily.value.id, values)
            message = 'Daily updated';
        } else {
            await diarioStore.register(values);
            message = 'Daily added';
        }
        await router.push('/diario');
        alertStore.success(message);
    } catch (error) {
        alertStore.error(error);
    }
}
</script>

<template>
    <h1>{{title}}</h1>
    <template v-if="!(daily?.loading || daily?.error)">
        <Form @submit="onSubmit" :validation-schema="schema" :initial-values="daily" v-slot="{ errors, isSubmitting }">
            <div class="form-row">
                <div class="form-group col">
                    <label>Fecha</label>
                    <Field name="fecha" type="text" class="form-control" :class="{ 'is-invalid': errors.fecha }" />
                    <div class="invalid-feedback">{{ errors.fecha }}</div>
                </div>
                <div class="form-group col">
                    <label>No. Control</label>
                    <Field name="nocontrol" type="text" class="form-control" :class="{ 'is-invalid': errors.nocontrol }" />
                    <div class="invalid-feedback">{{ errors.nocontrol }}</div>
                </div>
                <div class="form-group col">
                    <label>No. Maquina</label>
                    <Field name="nomaquina" type="text" class="form-control" :class="{ 'is-invalid': errors.nomaquina }" />
                    <div class="invalid-feedback">{{ errors.nomaquina }}</div>
                </div>
            </div>
            <div class="form-group col">
                    <label>Mesa</label>
                    <Field name="mesa" type="text" class="form-control" :class="{ 'is-invalid': errors.mesa }" />
                    <div class="invalid-feedback">{{ errors.mesa }}</div>
                </div>
            

                <div class="form-group col">
                    <label>Entrada</label>
                    <Field name="entrada" type="text" class="form-control" :class="{ 'is-invalid': errors.entrada }" />
                    <div class="invalid-feedback">{{ errors.entrada }}</div>
                </div>

                <div class="form-group col">
                    <label>Salida</label>
                    <Field name="salida" type="text" class="form-control" :class="{ 'is-invalid': errors.salida }" />
                    <div class="invalid-feedback">{{ errors.salida }}</div>
                </div>

            <div class="form-group">
                <button class="btn btn-primary" :disabled="isSubmitting">
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                    Save
                </button>
                <router-link to="/diario" class="btn btn-link">Cancel</router-link>
            </div>
        </Form>
    </template>
    <template v-if="daily?.loading">
        <div class="text-center m-5">
            <span class="spinner-border spinner-border-lg align-center"></span>
        </div>
    </template>
    <template v-if="daily?.error">
        <div class="text-center m-5">
            <div class="text-danger">Error loading daily: {{daily.error}}</div>
        </div>
    </template>
</template>