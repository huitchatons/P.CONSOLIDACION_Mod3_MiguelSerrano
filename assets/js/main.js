class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

class Cart {
    constructor() {
        this.items = [];
    }

    addProduct(product, quantity) {
        const item = this.items.find(p => p.product.name === product.name);
        if (item) {
            item.quantity += quantity;
        } else {
            this.items.push({ product, quantity });
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }

    getItems() {
        return this.items;
    }
}

const products = [
    new Product('Leche', 1000),
    new Product('Pan de Molde', 2000),
    new Product('Queso', 1200),
    new Product('Mermelada', 890),
    new Product('Azúcar', 1300)
];

const cart = new Cart();

document.getElementById('addProductBtn').addEventListener('click', () => {
    $('#productModal').modal('show');
});

document.getElementById('addProduct').addEventListener('click', () => {
    const productNumber = parseInt(document.getElementById('productNumber').value);
    const quantity = parseInt(document.getElementById('productQuantity').value);

    if (isNaN(productNumber) || isNaN(quantity) || quantity <= 0) {
        alert('Ingrese un número de producto válido y una cantidad mayor a 0.');
        return;
    }

    const product = products[productNumber - 1];
    if (!product) {
        alert('Producto no encontrado.');
        return;
    }

    cart.addProduct(product, quantity);
    document.getElementById('message').innerText = `${quantity} ${product.name}(s) agregados al carrito.`;

    $('#productModal').modal('hide');
    $('#continueModal').modal('show');
});

document.getElementById('continue').addEventListener('click', () => {
    $('#continueModal').modal('hide');
    $('#productModal').modal('show');
});

document.getElementById('finalize').addEventListener('click', () => {
    $('#continueModal').modal('hide');
    
    // Mostrar detalles de compra
    const cartList = document.getElementById('cartList');
    cartList.innerHTML = '';
    cart.getItems().forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.quantity} x ${item.product.name} - $${item.product.price * item.quantity}`;
        cartList.appendChild(listItem);
    });

    document.getElementById('totalAmount').textContent = cart.getTotal();
    $('#paymentModal').modal('show');
});
