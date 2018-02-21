var orders= [{"order":{"Product":"PIZZA", "Quantity":3 ,"Price":10000}},{"order":{"Product":"HOTDOG", "Quantity":1 ,"Price":3000}},{"order":{"Product":"COKE","Quantity":4 ,"Price":1300}}];

addOrders();

function addOrders(){
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

