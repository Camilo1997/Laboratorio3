  
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

    return {
        showOrdersByTable : showOrdersByTable
    };
})();


/**function createOrder(tableO) {
    axios.post('/orders',newOrder)
        .then(function(){
            $("#orders").append("<table id="+tableO+" class='table table-striped table-sm'><thead><tr><th>Product</th><th>Quantity</th><th>Price</th></tr></thead></table>");
            for (i in newOrder[tableO].orderAmountsMap){
                $("#"+tableO).append("<tr><td>"+i+"</td><td>"+newOrder[tableO].orderAmountsMap[i]+"</td><td>$"+prices[i]+"</td></tr>");    
            }        
        })
        .catch(function(error){
            cosole.log(error);
            message();
        
        });
}

function removeOrder(tableO){
    axios.delete('/orders/'+tableO)
        .then(function(){
            document.getElementById(tableO).remove();        
        })
        .catch(function(error){
            cosole.log(error);
            message();
        });
    
}

function loadOrders(){
    nOrder={};
    axios.get('/orders')
        .then(function(response){
            nOrder = response.data
            $('#orders').empty(); 
            for (i in nOrder){
                if(nOrder[i].tableNumber!=2){
                    var tableO = nOrder[i].tableNumber;
                    $("#orders").append("<table id="+tableO+" class='table table-striped table-sm'><thead><tr><th>Product</th><th>Quantity</th><th>Price</th></tr></thead></table>");
                    for (i in nOrder[tableO].orderAmountsMap){
                         $("#"+tableO).append("<tr><td>"+i+"</td><td>"+nOrder[tableO].orderAmountsMap[i]+"</td><td>$"+prices[i]+"</td></tr>");    
                    }        
                }
            }
        })
        .catch(function(error){
            cosole.log(error);
            message();
        });
}

function message(){
    alert("There is a problem with our servers. We apologize for the inconvince, please try again later"); 
}
    
**/        

    
