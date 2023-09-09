import { Dropdown } from "bootstrap";
import Swal from "sweetalert2";
import { validarFormulario, Toast, confirmacion} from "../funciones";
import Datatable from "datatables.net-bs5";
import { lenguaje  } from "../lenguaje";
import L from "leaflet";

const butonActualizar = document.getElementById("actualizar");

const map = L.map('mapa', {
    center: [15.52, -90.32],
    zoom: 8,
    maxZoom: 15,
    minZoom: 1,
})
const mapLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

const carreteraLayer = L.tileLayer('https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://waymarkedtrails.org">waymarkedtrails.org</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

const markerLayer = L.layerGroup();
const icono = L.icon({
    iconUrl: './images/liv.jpg',
    iconSize: [35, 35]
})

L.circle([14.57, -90.53], { radius: 5000 }).addTo(markerLayer);
const popup = L.popup()
    .setLatLng([14.57, -90.53])
    .setContent('<p>Hello world!<br />This is a nice popup.</p>')


    var latlngs = [
        [45.51, -122.68],
        [37.77, -122.43],
        [34.04, -118.2]
    ];

var polyline = L.polyline(latlngs, { color: 'red' }).addTo(markerLayer);


mapLayer.addTo(map)
carreteraLayer.addTo(map)
markerLayer.addTo(map)

map.on('click', (e) => {
    console.log(e);
    alert('diste click sobre el mapa')
})


const buscar = async () => {
    const url = `/mapa_martinez/API/mapa/buscar`;
    const config = {
        method: 'GET'
    }

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();

        console.log(data);

        if (data && data.length > 0) {
            data.forEach(registro => {
                const latitud = parseFloat(registro.mapa_latitud);
                const longitud = parseFloat(registro.mapa_longitud);

                if (!isNaN(latitud) && !isNaN(longitud)) {
                    const NuevoMarcador = L.marker([latitud, longitud], {
                        icon: icono,
                        draggable: true
                    });

                    const popup = L.popup()
                        .setLatLng([latitud, longitud])
                        .setContent(`<p>Nombre: ${registro.mapa_nombre}</p>
                        <p>Latitud: ${registro.mapa_latitud} </p>
                        <p>Longitud: ${registro.mapa_longitud} </p>`);
      


                    NuevoMarcador.bindPopup(popup);
                    NuevoMarcador.addTo(markerLayer);
                }
            });
        } else {
            Toast.fire({
                title: 'No se encontraron registros',
                icon: 'info'
            });
        }

    } catch (error) {
        console.error('Error al cargar los datos desde la base de datos:', error);
    }
}

// butonActualizar.addEventListener("click", buscar)

butonActualizar.addEventListener("click", () => {
    Toast.fire({
        title: 'Actualizando...',
        icon: 'info',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
    });

});