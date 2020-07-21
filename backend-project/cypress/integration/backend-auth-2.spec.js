import * as reservationHelpers from '../helpers/reservationHelpers'
  
import * as roomHelpers from  '../helpers/roomHelpers' 



describe('testing auth-2', function(){


  /* 
   it ('Get all rooms', function(){
      roomHelpers.getAllRoomsRequest(cy)
    })

    it('Create a new room',function(){
         roomHelpers.createRoomtReques(cy)
      
    })


    it('Edit a room',function(){
      roomHelpers.EditRequestAfterGet(cy)
     })

     it.only('Edit a room',function(){
      roomHelpers.createRoomRequestAndEdit(cy)
     })
     

    it('Get all room and delete last room',function(){
      roomHelpers.deletRoomeRequestAfterGet(cy)
    }) 

   */
   it ('Get all reservations', function(){
      reservationHelpers.getAllReservationsRequest(cy)
   })

 
    it ('Create a new  reservation', function(){
   reservationHelpers.createReservationReques(cy)
    })
   

})