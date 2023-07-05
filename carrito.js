var productos = [];
const IVA = 0.16;

function agregarCarrito() {

    let nombre = document.getElementById('nombre').value;
    let precio = document.getElementById('precio').value;
    let cantidad = document.getElementById('cantidad').value;

    console.log(nombre);
    console.log(cantidad);
    console.log(precio);

    if (esValido(nombre) && esValido(precio) && esValido(cantidad)) {

        let producto = {
            nombre: nombre,
            precio: precio,
            cantidad: cantidad
        };

        productos.push(producto);


        iterarProductos();

    } else {
        alert("Ingrese los datos correctamente.")
    }


}


function esValido(valor) {
    return valor !== undefined && valor !== '' && valor !== null;
}


function calcularSubtotal(precio, cantidad) {
    if (esValido(precio) && esValido(cantidad)) {
        return precio * cantidad;
    }
    return 0;
}

function calcularIVA(valor) {
    if (esValido(valor) && valor > 0) {
        return valor * IVA;
    }
    return 0;
}

function actualizarIvaTotal() {
    if (productos.length === 0) {
        document.getElementById("iva").innerText = "0";
        document.getElementById("total").innerText = "0";
        document.getElementById("subtotal").innerText = "0";
    } else {

        let subtotal = 0;
        for (let i = 0; i < productos.length; i++) {
            const producto = productos[i];
            subtotal = subtotal + calcularSubtotal(producto.precio, producto.cantidad);
        }
        let iva = calcularIVA(subtotal);
        let total = subtotal + iva;

        document.getElementById("subtotal").innerText = subtotal;
        document.getElementById("iva").innerText = iva;
        document.getElementById("total").innerText = total;
    }
}



function iterarProductos() {

    let filas = '';

    for (let i = 0; i < productos.length; i++) {

        const producto = productos[i];

        let fila = `
                <tr>
                    <td>${(i + 1)}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.cantidad}</td>
                    <td>${calcularSubtotal(producto.precio, producto.cantidad)}</td>
                </tr>
        
        `;

        filas = filas + fila;
    }

    if (!esValido(filas)) {
        filas = `  <tr>
                    <td colspan="5">Sin productos agregados.</td>
                    </tr>`;
    }

    document.getElementById("tbodyCarrito").innerHTML = filas;
}


function generarFolio() {
    let folio = "KRM-" + new Date().getTime();
    document.getElementById("folio").innerHTML = folio;
}


function cerrarCarrito() {
    if (productos.length === 0) {
        alert("Se deben agregar productos al carrito.")
    } else {
        iterarProductos();
        actualizarIvaTotal();
    }

}

iterarProductos();

generarFolio();