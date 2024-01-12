<script setup>
import { useAuthStore } from '@/stores';


const authStore = useAuthStore();
</script>

<template>
    <body>
    <header><img srcset="src/views/itgambanner.jpg" width="807" height="111" style="position:initial; top: 0; right: 0;" /></header>

    </body>
    <nav v-show="authStore.user" class=" navbar nav justify-content-center navbar-expand-lg navbar-dark" style="background-color: #283593;">
        <div class="nav nav-pills nav-fill">
        
            <font face="fantasy"><router-link to="/" class="nav-item nav-link" style="color:white">Inicio</router-link></font>
            <font face="fantasy"><router-link to="/users" class="nav-item nav-link" style="color:white">Administrar Usuarios</router-link></font>
            <font face="fantasy"><router-link to="/inven" class="nav-item nav-link" style="color:white">Inventario de libros</router-link></font>
            <font face="fantasy"><router-link to="/espe" class="nav-item nav-link" style="color:white">Revisión Cuentas Especiales</router-link></font>
            <font face="fantasy"><router-link to="/diario" class="nav-item nav-link" style="color:white">Registro Diario</router-link></font>
            <font face="fantasy"><button @click="authStore.logout()" class="btn btn-link nav-item nav-link" style="color:white">Cerrar Sesión</button></font>
            <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success active my-2 my-sm-0" type="submit">Search</button>
    </form>
        </div>
    </nav>
</template>