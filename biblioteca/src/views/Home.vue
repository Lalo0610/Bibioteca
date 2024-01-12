<script setup>
import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
    <div v-if="user">
        <b><font face="Arial Black"><h1 style="color:#FF6D00">Hola {{user.firstName}}!</h1></font></b>
        <div class="alert alert-primary" role="alert"><font face="Tahoma">
            Has iniciado sesión en el Sistema de Administración de la Biblioteca del ITGAM</font>
</div>
        <center><img srcset="src/views/users/biblio.jpg" width="600" height="500"/></center>
        <br><br>
    </div>
    <body>
                
        <form>
 <center><div class="media-container-row mbr-white" style="font-family:Roboto,'Opens Sans', sans-serif">
                                <div class="col-12 col-md-3 mbr-fonts-style display-7" style="font-family:Roboto,'Opens Sans', sans-serif" >
                                    <p class="mbr-text" style="color:darkblue">
                                        <footer><font face="Bradley Hand"><strong>Dirección:</strong>
                                        <br>
                                        <br><a style="color:black"><strong>Calle 608 No. 300 y Av. 412, Col. San Juan de Aragón, Alcaldía. Gustavo A. Madero, C.P. 07470, México, CDMX</strong></a><br>
                                        <br>
                                        <br><strong>Contacto:</strong></font>&nbsp;<br></footer>
                                        <font face="Bradley Hand "><br><a style="color:black"><strong>Teléfonos: <br>
                                            (55) 2651-7864 y (55) 2651-6275 </strong></a></font><br></p>
                                </div>
                                </div>
                            
                                <div class="col-12 col-md-3 mbr-fonts-style display-7" style="font-family:Roboto,'Opens Sans', sans-serif">
                                    <p class="mbr-text" style="color:darkblue"><strong><font face="Bradley Hand">Redes Sociales</font></strong><br>
                                        <br><font face="Bradley Hand"><strong>
                                        <a style="color:red" href="https://web.facebook.com/profile.php?id=100032494910892">Facebook</a><br>
                                        <a style="color:red" href="https://www.instagram.com/tecnm_itgam/">Instagram</a><br>
                                        <a style="color:red" href="https://www.gamadero.tecnm.mx/" data-toggle="modal" data-target="#modalQuejas">Página Oficial</a><br>
                                    </strong></font>
                                        <br>
                                        <strong><font face="Bradley Hand">Localizacion en el Mapa:</font> </strong>
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.850463168333!2d-99.06421928982952!3d19.462013039666346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1fba1933eec83%3A0x30b9a0b2b63fb2e7!2sTecNM%20Instituto%20Tecnol%C3%B3gico%20de%20Gustavo%20A.%20Madero!5e0!3m2!1ses-419!2smx!4v1701403035853!5m2!1ses-419!2smx" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
					
                                    </p>
                                </div>
                                <footer><div class="media-container-row mbr-white" style="font-family:Roboto,'Opens Sans', sans-serif">
                                    <div class="col-sm-6 copyright">
                                        <p class="mbr-text mbr-fonts-style display-7"> <font face="Bradley Hand"><strong>Copyright © 2023 Eduardo Guerrero Rodríguez</strong></font></p>
                                        <br/>
                                <strong><font face="Bradley Hand">SISTEMA DE ADMINISTRACION DE LA BIBLIOTECA DEL ITGAM</font></strong>
                                        <p class="mbr-text mbr-fonts-style display-7"><font face="Bradley Hand"><strong>Última actualización: 28/11/2023</strong></font></p>
                                   </div>
                                </div>
                                </footer></center>
                            </form>
    </body>
</template>