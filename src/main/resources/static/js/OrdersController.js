var ordersLoad=undefined;

var prices ={"HOTDOG":3000,
            "HAMBURGER":12300,
            "BEER":2500,
            "PIZZA":10000,
            "COKE":1300
            }


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
        var callback  = {
            onSuccess: function  (){
                for(i in item)
                {
                    $("Items").append("<tr id=''>" +
                        "               <td>" + i + "</td>" +
                        "               <td>" + orderAmountsMap[i] + "</td>" +
                        "               <td>" +
                        "                   <button type=\"button\"> Update</button>" +
                        "                   <button type=\"button\"> Delete</button>" +
                        "               </td>" +
                        "              </tr>");
                }
            },
            onFailed:  function(error){
                console.log(error);
                message();
            }
        }
        RestControllerModule.updateOrder(orderId,callback);
    };

    /**var updateOrder = function (){
        int orderId;
      var callback = {
          onSuccess: function () {
              
          },
          onFailed: function () {
              
          }
      }
      RestControllerModule.updateOrder(orderId,callback);
    };


    var deleteOrderItem = function (itemName){
        int orderId;
        var callback = {
            onSuccess: function () {

            },
            onFailed: function () {

            }
        }
        RestControllerModule.deleteOrder(orderId,callback);
    };**/

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
    }

    var loadItems =function(table){
        $("#Items").empty();
        for(i in ordersLoad[table].orderAmountsMap){
                $("#Items").append("<tr>" +
                    "                   <td>"+i+"</td>" +
                    "                   <td>"+ordersLoad[table].orderAmountsMap[i]+"</td>" +
                    "                   <td>" +
                    "                       <button type='button'> Update</button>" +
                "                            <button type='button'> Delete</button>" +
                "                       </td>" +
                "                   </tr>");


        }

    }

    return {
        showOrdersByTable : showOrdersByTable,
        addItemToOrder: addItemToOrder,
        viewOrders: viewOrders,
        loadItems: loadItems/**,
        deleteOrderItem:deleteOrderItem**/
    };
})();


