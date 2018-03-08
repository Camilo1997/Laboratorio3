

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

    var updateOrder = function (orderId, callback){
        axios.put('/orders/'+orderId,ordersAmountsMap)
            .then(function (){
                callback.onSuccess();
            })
            .catch(function(error){
               callback.onFailed(error);
            });
    };

    /**var deleteOrder = function(orderId, callback){
        axios.delete('/orders'+orderId)
            .then(function(){
                callback.onSuccess();
            })
            .catch(function (error) {
               callback.onFailed(error);
            });
    }**/
    return {
        getOrders: getOrders,
        updateOrder: updateOrder/**,
        deleteOrder: deleteOrder**/
    };
    })();
    
    
