var orders = {
    "table_id": 1,
    "products": [{
        "product": "PIZZA",
        "quantity": 3,
        "price": "$15.000"
        },
        {
        "product": "HAMBURGER",
        "quantity": 1,
        "price": "$12.300"
        }
        ]
}

createOrder();

function addOrders(){
    createOrder();
    for (i=0;i < orders.length;i++){
        addOrder(i);
    }
}



function addOrder(i){
    var table= document.getElementById("OrdersBody");
    var newOrder = table.insertRow();
    var Price = newOrder.insertCell(0);
    var Quantity = newOrder.insertCell(0);
    var Product = newOrder.insertCell(0);
    Price.innerHTML= "$"+orders[i].order.Price;
    Quantity.innerHTML= orders[i].order.Quantity;
    Product.innerHTML= orders[i].order.Product;
}

function createOrder() {
    var body = document.getElementsByTagName('body')[0];
    var order = document.createElement('table');
    for (i=0;i< orders.products.length;i++){
        var newOrder = order.insertRow();
        var Price = newOrder.insertCell(0);
        var Quantity = newOrder.insertCell(0);
        var Product = newOrder.insertCell(0);
        Price.innerHTML= "$"+orders.products[i].price;
        Quantity.innerHTML= orders.products[i].quantity
        Product.innerHTML= orders.products[i].product
    }
    
    
}