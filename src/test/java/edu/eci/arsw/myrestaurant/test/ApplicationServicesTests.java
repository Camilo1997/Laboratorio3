package edu.eci.arsw.myrestaurant.test;

import edu.eci.arsw.myrestaurant.beans.BillCalculator;
import edu.eci.arsw.myrestaurant.model.Order;
import edu.eci.arsw.myrestaurant.services.OrderServicesException;
import edu.eci.arsw.myrestaurant.services.RestaurantOrderServices;
import edu.eci.arsw.myrestaurant.services.RestaurantOrderServicesStub;
import java.util.logging.Level;
import java.util.logging.Logger;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest()
public class ApplicationServicesTests {

    @Autowired
    RestaurantOrderServices ros;

    
    @Test
    public void notExistTable() throws OrderServicesException{
        int amount=0;
        try{
            ros.calculateTableBill(2);
        }catch(OrderServicesException ex){
            assertTrue(ex.getMessage(),true);
        }
    }
    
    @Test
    public void calculateBill() throws OrderServicesException{
        Order order = new Order();
        order.setTableNumber(2);
        order.addDish("HAMBURGER", 2);
        order.addDish("COKE", 2);
        ros.addNewOrderToTable(order);
        int amount=0;
        try{
            amount=ros.calculateTableBill(1);
        }catch(OrderServicesException ex){
            assertTrue(ex.getMessage(),false);
        }
        
        assertEquals(amount,32290);
        
    }

}
