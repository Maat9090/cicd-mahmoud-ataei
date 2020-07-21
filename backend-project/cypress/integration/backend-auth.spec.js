import * as clientHelpers from '../helpers/clientHelpers'


describe('testing auth', function(){
    it('Create a new client', function(){
       clientHelpers.createClientRequest(cy)
    })


  /* it.only('Create a client and edit it', function(){
      clientHelpers.EditCRequestAfterGet(cy)
   })*/



    it('Get all clients', function(){
        clientHelpers.getAllClientsRequest(cy)
     })

     it('Create a client and delete it', function(){
      clientHelpers.createClientRequestAndDelete(cy)
   })




})