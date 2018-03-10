/*
 * Copyright (C) 2016 Pivotal Software, Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package edu.eci.arsw.myrestaurant.restcontrollers;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import edu.eci.arsw.myrestaurant.beans.impl.BasicBillCalculator;
import edu.eci.arsw.myrestaurant.beans.impl.BillWithTaxesCalculator;
import edu.eci.arsw.myrestaurant.model.Order;
import edu.eci.arsw.myrestaurant.model.ProductType;
import edu.eci.arsw.myrestaurant.model.RestaurantProduct;
import edu.eci.arsw.myrestaurant.services.OrderServicesException;
import edu.eci.arsw.myrestaurant.services.RestaurantOrderServices;
import edu.eci.arsw.myrestaurant.services.RestaurantOrderServicesStub;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author hcadavid
 */
@Service
@RestController
@RequestMapping(value = "/orders")
public class OrdersAPIController {
    @Autowired
    private RestaurantOrderServices restaurant;
   
    private Gson json = new Gson();
    
    private Map<String, Order> ordersMap;
    
    private String data;
    
    @RequestMapping(method = RequestMethod.GET)
 	public ResponseEntity<?> getOrders() {
 		try{
                    ordersMap = new HashMap<>();
                    Set<Integer> ordersKey= restaurant.getTablesWithOrders();
                    for(Integer i: ordersKey) {
                    
                        ordersMap.put(i.toString(),restaurant.getTableOrder(i));
                     }
                    data=json.toJson(ordersMap);
                    return new ResponseEntity<>(data,HttpStatus.ACCEPTED);
 		} catch (OrderServicesException ex) {
 			Logger.getLogger(OrdersAPIController.class.getName()).log(Level.SEVERE, null, ex);
 			return new ResponseEntity<>(ex.getMessage(),HttpStatus.NOT_FOUND);
 		}  
 	}
        
        @RequestMapping(method = RequestMethod.GET, path="/{id}")
        public ResponseEntity<?> getOrder(@PathVariable Integer id){
            try{
                ordersMap =new HashMap<>(); 
                if(restaurant.getTableOrder(id) != null){
                    ordersMap.put(id.toString(),restaurant.getTableOrder(id));
                    data=json.toJson(ordersMap);
                    return new ResponseEntity<>(data,HttpStatus.ACCEPTED);
                }else{
                    return new ResponseEntity<>("The table hasen't orders", HttpStatus.NOT_FOUND);
                }
            }catch(OrderServicesException ex){
               Logger.getLogger(OrdersAPIController.class.getName()).log(Level.SEVERE, null, ex);
 			return new ResponseEntity<>(ex.getMessage(),HttpStatus.NOT_FOUND); 
            }
            
        }
        
        @RequestMapping(method = RequestMethod.POST)	
	public ResponseEntity<?> Setorders(@RequestBody String jsonPost ){
		try {
                    ordersMap.clear();
                    Type type = new TypeToken<Map<String, Order>>(){}.getType();
                    ordersMap= json.fromJson(jsonPost,type);
                    Set<String> tables= ordersMap.keySet();
                    for(String i:tables){
                    restaurant.addNewOrderToTable(ordersMap.get(i));
                    }
                     return new ResponseEntity<>(HttpStatus.CREATED);
		} catch (OrderServicesException ex) {
			Logger.getLogger(OrdersAPIController.class.getName()).log(Level.SEVERE, null, ex);
			return new ResponseEntity<>(ex.getMessage(),HttpStatus.FORBIDDEN);            
		}        
	
	}
        
        @RequestMapping(method = RequestMethod.GET, path="/{id}/total")
        public ResponseEntity<?> getTotalOrder(@PathVariable Integer id){
           try{
                int amount=0;
                amount=restaurant.calculateTableBill(id);                  
                    return new ResponseEntity<>(amount,HttpStatus.ACCEPTED);
                }catch(OrderServicesException ex){
                    Logger.getLogger(OrdersAPIController.class.getName()).log(Level.SEVERE, null, ex);
                    return new ResponseEntity<>(ex.getMessage(),HttpStatus.NOT_FOUND);             } 
        }
       
        @RequestMapping(method = RequestMethod.PUT , path ="/{id}")
        public ResponseEntity<?> productInOrder(@PathVariable Integer id, @RequestBody String jsonOrder ){
            Order ordenActual;
            try{
                Map<String,Integer> mapProduct = new HashMap<>();
                Type type = new TypeToken<Map<String, Integer>>(){}.getType();
                mapProduct= json.fromJson(jsonOrder,type);
                ordenActual = restaurant.getTableOrder(id);
                Set<String> key=mapProduct.keySet();
                int cont=0;
                for (String i:key){
                    if(key.size()==1)
                        ordenActual.addDish(i,mapProduct.get(i));
                    else if(cont==0) {
                        ordenActual.deleteDishes();
                        cont+=1;
                    }
                    ordenActual.addDish(i,mapProduct.get(i));
                }
                return new ResponseEntity<>(HttpStatus.OK);
            }catch(OrderServicesException ex){
                Logger.getLogger(OrdersAPIController.class.getName()).log(Level.SEVERE, null, ex);
                return new ResponseEntity<>(ex.getMessage(),HttpStatus.NOT_FOUND);              
            }
        }
        
        @RequestMapping(method = RequestMethod.DELETE, path="/{id}")
        public ResponseEntity<?> deleteOrder (@PathVariable int id){
            try{
                restaurant.releaseTable(id);
                return new ResponseEntity<>(HttpStatus.OK);
            }catch(OrderServicesException ex){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            
        }

              
    
}
