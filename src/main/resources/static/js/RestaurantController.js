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

    return {
        getOrders: getOrders
    };
    })();
