const faker = require('faker')

const ENDPOINT_GET_CLIENTS = 'http://localhost:3000/api/clients'
const ENDPOINT_POST_CLIENT = 'http://localhost:3000/api/client/new'
const ENDPOINT_GET_CLIENT = 'http://localhost:3000/api/client/'
const ENDPOINT_PUT_CLIENT = 'http://localhost:3000/api/client/'
//const ENDPOINT_PUT_CLIENT = 'http://localhost:3000/api/client/1'

//Skapar faker payload firstNamn ,...
function createRandomClientPayload(){
    const fakeName = faker.name.firstName()
    const fakeEmail = faker.internet.email()
    const fakePhone = faker.phone.phoneNumber()

    const payload = {
        "name":fakeName,
        "email":fakeEmail,
        "telephone":fakePhone
    }

    return payload
}

function getRequestAllClientsWithAssertion(cy,name, email, telephone){
    // GET request to fetch all clients
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_CLIENTS,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
        const responseAsString = JSON.stringify(response)
        expect(responseAsString).to.have.string(name)
        expect(responseAsString).to.have.string(email)
        expect(responseAsString).to.have.string(telephone)

        //cy.log(response.body[0].email)
        cy.log(response.body[response.body.length -1].id)
        cy.log(response.body.length) 

    }))
}

function getAllClientsRequest(cy){
    cy.authenticateSession().then((response =>{
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_CLIENTS,
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



function deleteRequestAfterGet(cy){
    // GET request to fetch all clients
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_CLIENTS,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
        
        let lastId = response.body[response.body.length -1].id
        cy.request({
        method: "DELETE",
        url: ENDPOINT_GET_CLIENT+ lastId,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
          //assert that the client is gone
    }).then((response =>{               
        const responseAsString = JSON.stringify(response.body)
        cy.log(responseAsString)
        expect(responseAsString).to.have.string('true')
     }))

      
    }))
}




function createClientRequest(cy){
    cy.authenticateSession().then((response =>{
        let fakeClientPayload = createRandomClientPayload() 
        
        // post request to create a client
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_CLIENT,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:fakeClientPayload 
        }).then((response =>{               
           const responseAsString = JSON.stringify(response)
           expect(responseAsString).to.have.string(fakeClientPayload.name)
        }))

        getRequestAllClientsWithAssertion(cy,fakeClientPayload.name, fakeClientPayload.email, fakeClientPayload.telephone)
    }))
}


function EditCRequestAfterGet(cy){
  //  let fakeClientPayload = createRandomClientPayload() 
   
  
  
  // GET request to fetch all client
    cy.authenticateSession().then((response =>{
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_CLIENTS,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
   
        }).then((response =>{
     const responseAsString = JSON.stringify(response)
          cy.log(responseAsString)
        
     
     }))
        EditCRequestAfterGet2(cy)
    }))
}



 function EditCRequestAfterGet2(cy){
            let fakeClientPayload = createRandomClientPayload() 
          //  let lastId = response.body[response.body.length -1].id  
          let lastId =1 
       
      // cy.log(lastId)
        cy.request({
        method: "PUT",
        url: ENDPOINT_PUT_CLIENT+ lastId,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        
        body:fakeClientPayload

          //assert that the room is edit
    }).then((response =>{               
        const responseAsString = JSON.stringify(response.body)
        cy.log(responseAsString)
      //  expect(responseAsString).to.have.string('true')
     }))

      
 // }))
//}))
}


function createClientRequestAndEdit(cy){
    cy.authenticateSession().then((response =>{
        let fakeClientPayload = createRandomClientPayload() 
        
        // post request to create a client
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_CLIENT,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:fakeClientPayload 
        }).then((response =>{               
           const responseAsString = JSON.stringify(response)
           expect(responseAsString).to.have.string(fakeClientPayload.name)
        }))
        EditRequestAfterGet(cy)
    }))
}



function createClientRequestAndEdit2(cy){

    cy.authenticateSession().then((response =>{
        let fakeClientPayload = createRandomClientPayload() 
        
        // post request to create a client
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_CLIENT,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:fakeClientPayload 
        }).then((response =>{       
            
            cy.log(response.body.id) 
            cy.log(response.body)

          const responseAsString = JSON.stringify(response)
          expect(responseAsString).to.have.string(fakeClientPayload.name)
         
        }))

       // getRequestAllClientsWithAssertion(cy,fakeClientPayload.name, fakeClientPayload.email, fakeClientPayload.telephone)
 
  /*           
           const responseAsString = JSON.stringify(response)
           expect(responseAsString).to.have.string(fakeRoomPayload.category)*/
       // }))
       // EditRequestAfterGet(cy)
   //  cy.log(response.body.id) 
   //   cy.log(response.body)
       
   let lastId = response.body.id
       cy.request({
        method: "PUT",
        url: ENDPOINT_PUT_CLIENT+ lastId,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
       
        body:fakeClientPayload

          //assert that the room is edit
    }).then((response =>{               
        const responseAsString = JSON.stringify(response.body)
        cy.log(responseAsString)
      //  expect(responseAsString).to.have.string('true')   
     }))
    
    }))    
}



function createClientRequestAndDelete(cy){
    cy.authenticateSession().then((response =>{
        let fakeClientPayload = createRandomClientPayload() 
        
        // post request to create a client
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_CLIENT,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:fakeClientPayload 
        }).then((response =>{               
           const responseAsString = JSON.stringify(response)
           expect(responseAsString).to.have.string(fakeClientPayload.name)
        }))
        deleteRequestAfterGet(cy)
    }))
}



module.exports = {
    createRandomClientPayload, 
    createClientRequest, 
    getAllClientsRequest,
    EditCRequestAfterGet,
    createClientRequestAndEdit2,
    EditCRequestAfterGet2,
    createClientRequestAndDelete 
}