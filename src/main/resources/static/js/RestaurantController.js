

var RestControllerModule = (function () {

    var getOrders = function (callback){
        axios.get('/orders')    
            .then(function (response) {
                callback.onSuccess(response.data);
            })
            .catch(function(exception){
                callback.onFailed(exception);
            });
    };

    var updateOrder = function (orderId,item, callback){
        axios.put('/orders/'+orderId,item)
            .then(function (){
                callback.onSuccess();
            })
            .catch(function(error){
               callback.onFailed(error);
            });
    };

    var deleteOrder = function(orderId,itemName, callback){
        axios.delete('/orders/'+orderId+'/'+itemName)
            .then(function(){
                callback.onSuccess();
            })
            .catch(function (error) {
               callback.onFailed(error);
            });
    };
    return {
        getOrders: getOrders,
        updateOrder: updateOrder,
        deleteOrder: deleteOrder
    };
    })();
    
    
