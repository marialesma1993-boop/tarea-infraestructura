// Agregar producto al carrito
function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Verificar si el producto ya existe
    const existingProduct = cart.find(item => item.productName === productName);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ productName, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} se añadió al carrito`);
}

// Eliminar un producto del carrito
function removeFromCart(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.productName !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart(); // Volver a renderizar la tabla
}

// Vaciar el carrito completo
function clearCart() {
    localStorage.removeItem('cart');
    renderCart();
}

// Función para renderizar el carrito en la tabla
function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartBody = document.getElementById('cart-body');
    const totalContainer = document.getElementById('total');
    const clearButton = document.getElementById('clear-cart-btn');

    // Si el carrito está vacío
    if (cart.length === 0) {
        cartBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;">El carrito está vacío</td>
            </tr>
        `;
        totalContainer.textContent = '0';
        clearButton.style.display = 'none';
        return;
    }

    // Mostrar productos
    cartBody.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.productName}</td>
            <td>$${item.price.toLocaleString('es-CO')}</td>
            <td>${item.quantity}</td>
            <td>$${subtotal.toLocaleString('es-CO')}</td>
            <td><button class="remove-btn">Eliminar</button></td>
        `;

        // Agregar evento al botón eliminar
        row.querySelector('.remove-btn').addEventListener('click', () => {
            removeFromCart(item.productName);
        });

        cartBody.appendChild(row);
    });

    totalContainer.textContent = total.toLocaleString('es-CO');
    clearButton.style.display = 'inline-block';
}

// Ejecutar renderCart solo si estamos en cart.html
if (window.location.pathname.includes('cart.html')) {
    renderCart();
}