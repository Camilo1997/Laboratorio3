var ordersLoad=undefined;

var itemSelected=undefined;

var prices ={"HOTDOG":3000,
            "HAMBURGER":12300,
            "BEER":2500,
            "PIZZA":10000,
            "COKE":1300
            }

var selectOrder=1;
var isSelected=false;
var  OrdersControllerModule = (function () {
    var message= function(){
        alert("There is a problem with our servers. We apologize for the inconvince, please try again later");
    };

    var showOrdersByTable = function (){
        var callback = {
            onSuccess: function (ordersList) {
                 $('#orders').empty();
                 for (i in ordersList){
                    var tableO = ordersList[i].tableNumber;
                        $("#orders").append("<h2 class= 'masthead-brand'>"+"Table  "+tableO+"</h2>");
                        $("#orders").append("<table id="+tableO+" class='table table-striped table-sm'><thead><tr><th>Product</th><th>Quantity</th><th>Price</th></tr></thead></table>");
                        for (i in ordersList[tableO].orderAmountsMap){
                             $("#"+tableO).append("<tr><td>"+i+"</td><td>"+ordersList[tableO].orderAmountsMap[i]+"</td><td>$"+prices[i]+"</td></tr>");
                        }                    
                }
            },
            onFailed: function (error) {
                console.log(error);
                message();
            }
        }
        RestControllerModule.getOrders(callback);
    };

    var addItemToOrder = function (orderId,  item) {
        var name=item[0];
        var quantity=item[1];
        var itemJSON = JSON.parse('{ "'+name+'":'+quantity+'}');
        var callback  = {
            onSuccess: function  (){
                if(Object.keys(ordersLoad[orderId].orderAmountsMap).includes(name)){
                    quantity=parseInt(quantity)+ordersLoad[orderId].orderAmountsMap[name];
                    $("#"+name).empty()
                    $("#"+name).append(reloadItem(name,quantity));
                }else{
                    loadItems(orderId);
                    reloadPage(name,quantity);
                }




            },
            onFailed:  function(error){
                console.log(error);
                message();
            }
        }
        RestControllerModule.updateOrder(orderId,itemJSON,callback);
    };

    var updateOrder = function (){
        var nName=document.getElementById("dishN"+itemSelected).value;
        var nQuantity=document.getElementById("dishQ"+itemSelected).value;
        var dishes =ordersLoad[selectOrder].orderAmountsMap;
        delete dishes[itemSelected];
        dishes[nName]= nQuantity;
        var callback = {
            onSuccess: function () {
                    $("#"+itemSelected).empty();
                    document.getElementById(itemSelected).id = nName;
                    $("#"+nName).append(reloadItem(nName,nQuantity));
                    alert("Orden actualizada");
                    itemSelected=undefined;
                    isSelected=false;
            },
            onFailed: function (error) {
                console.log(error);
                message();
            }
        }
        RestControllerModule.updateOrder(selectOrder,dishes,callback);
    };

    var deleteOrderItem = function (itemName){
        var callback = {
            onSuccess: function () {
                document.getElementById(itemName).remove();
                alert('Se elimino correctamente');
            },
            onFailed: function (error) {
                console.log(error);
                message();
            }
        }
        RestControllerModule.deleteOrder(selectOrder,itemName,callback);
    };

    var viewOrders= function(){

        var callback ={
            onSuccess: function(orderList){
                ordersLoad=orderList;
                var count  = 0
                for(i in ordersLoad){
                    $("#viewOrders").append("<option value="+i+">Table "+i+"</option>");
                    if(count ==0){
                        loadItems(i);
                        count+=1;
                    }
                }

            },
            onFailed: function(error){
                console.log(error);
                message();
            }
        }
        RestControllerModule.getOrders(callback);
    };

    var loadItems =function(table){
        selectOrder=table;
        $("#Items").empty();
        for(i in ordersLoad[table].orderAmountsMap) {
            reloadPage(i, ordersLoad[table].orderAmountsMap[i]);

        }

    };

    var setItem = function(value){
        if(!isSelected){
            itemSelected =value;
            isSelected=true;
        }

    };

    var reloadPage= function(id,quantity){
        $("#Items").append("<tr id="+id+">" + reloadItem(id,quantity)+"</tr>");

    };

    var reloadItem= function(idItem,quantity){

        return      "<td>"+
                        "<input id='dishN"+idItem+"' type='text' name='dishName' value='"+idItem+"' onfocus='OrdersControllerModule.setItem(this.value)'>"+
                        "<input id='dishQ"+idItem+"' type='text' name='dishQuantity' value='"+quantity+"' onfocus='OrdersControllerModule.setItem(dishN"+idItem+".value)' >"+

                    "</td>" +
                    "<td>" +
                        "<button type='button' onClick='OrdersControllerModule.updateOrder()'> Update</button>" +
                        "<button type='button' onClick='OrdersControllerModule.deleteOrderItem(this.parentNode.parentNode.id)' > Delete</button>" +
                    "</td>";
    }

    return {
        showOrdersByTable : showOrdersByTable,
        addItemToOrder: addItemToOrder,
        viewOrders: viewOrders,
        loadItems: loadItems,
        updateOrder: updateOrder,
        setItem:setItem,
        deleteOrderItem:deleteOrderItem
    };
})();


