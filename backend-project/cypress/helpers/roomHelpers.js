
const faker = require('faker')
const ENDPOINT_GET_ROOMS = 'http://localhost:3000/api/rooms'
const ENDPOINT_POST_ROOM = 'http://localhost:3000/api/room/new'
const ENDPOINT_PUT_ROOM  = 'http://localhost:3000/api/room/'
const ENDPOINT_DELETE_ROOM  = 'http://localhost:3000/api/room/'

     //Create faker payload 
 function createRandomRoomtPayload(){
    
    //let category[]={"double","single","twin"}
  //  const  randomCategory =
    const fakerNumber = faker.random.number(300)
    const fakerFloor = faker.random.number(10)
  //  const randomAvailable =
    const fakerPrice  = faker.random.number(10000)
  //  const RandomFeatures =

    const payload = {
        
        "features":["balcony"],
        "category":"double",
        "number":fakerNumber,
        "floor":fakerFloor,
        "available":true,
        "price":fakerPrice
    }    
    return payload
}


//Create a room

function createRoomtReques(cy){
    cy.authenticateSession().then((response =>{
        let fakeRoomPayload = createRandomRoomtPayload() 
        
        // post request to create a room
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_ROOM,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:fakeRoomPayload                                                                                                                                                                                                                                       
        }).then((response =>{               
           const responseAsString = JSON.stringify(response)
           expect(responseAsString).to.have.string(fakeRoomPayload.price)  
           cy.log(response.body.id) 
           cy.log(response.body)

          // cy.log(response.body[response.body.length -1].id)
          // cy.log(response.body.length) 
   
         //cy.log(response.body.id) 

        }))

       // getRequestAllClientsWithAssertion(cy,fakeClientPayload.name, fakeClientPayload.email, fakeClientPayload.telephone)
    }))
}


//************** Get all rooms *********************** */

function getAllRoomsRequest(cy){
    cy.authenticateSession().then((response =>{
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_ROOMS,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response =>{
            const responseAsString = JSON.stringify(response)
            cy.log(responseAsString)
           
        }))
    }))
}

 //********* Get all romms and edit last room ****************** 
function EditRequestAfterGet(cy){
    // GET request to fetch all rooms
    cy.authenticateSession().then((response =>{
        let fakeRoomPayload = createRandomRoomtPayload()
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_ROOMS,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response =>{
        //  const responseAsString = JSON.stringify(response)
           //cy.log(responseAsString)
        
        let lastId = response.body[response.body.length -1].id
        cy.request({
        method: "PUT",
        url: ENDPOINT_PUT_ROOM+ lastId,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
       
        body:fakeRoomPayload

          //assert that the room is edit
    }).then((response =>{               
        const responseAsString = JSON.stringify(response.body)
        cy.log(responseAsString)
      //  expect(responseAsString).to.have.string('true')
     }))

      
    }))
}))
}
    



//**********Create a room and edit it ********************
function createRoomRequestAndEdit(cy){

    cy.authenticateSession().then((response =>{
        let fakeRoomPayload = createRandomRoomtPayload() 
        
        // post request to create a room
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_ROOM,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:fakeRoomPayload                                                                                                                                                                                                                                       
        }).then((response =>{               

  /*           
           const responseAsString = JSON.stringify(response)
           expect(responseAsString).to.have.string(fakeRoomPayload.category)*/
       // }))
       // EditRequestAfterGet(cy)
      cy.log(response.body.id) 
      cy.log(response.body)
     /*  let lastId = response.body[response.body.length -1].id
       
       cy.request({
        method: "PUT",
        url: ENDPOINT_PUT_ROOM+ lastId,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
       
        body:fakeRoomPayload

          //assert that the room is edit
    }).then((response =>{               
        const responseAsString = JSON.stringify(response.body)
        cy.log(responseAsString)
      //  expect(responseAsString).to.have.string('true')   
     }))*/
        }))
          }))
}





/***************Delete room *****************/

function deletRoomeRequestAfterGet(cy){
    // GET request to fetch all clients
    cy.authenticateSession().then((response =>{
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_ROOMS,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            }).then((response =>{
        
        cy.log(response.body.id) 
        let lastId = response.body[response.body.length -1].id
        cy.request({
        method: "DELETE",
        url: ENDPOINT_DELETE_ROOM+ lastId,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
          //assert that the room is gone
    } ).then((response =>{               
        const responseAsString = JSON.stringify(response.body)
        cy.log(responseAsString)
        expect(responseAsString).to.have.string('true')
     }))
    }))
      
    }))
 }



module.exports = {
    getAllRoomsRequest,
    createRoomtReques,
    EditRequestAfterGet,
    createRoomRequestAndEdit,
    deletRoomeRequestAfterGet
    
}

