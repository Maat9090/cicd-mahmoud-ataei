const faker = require('faker')

const ENDPOINT_GET_RESERVATIONS = 'http://localhost:3000/api/reservations'
const ENDPOINT_POST_RESERVATION = 'http://localhost:3000/api/reservation/new'




//Skapar faker payload 
function createRandomreservationtPayload(){
    
      const fakerClient = faker.random.number(2) 
       const fakerStartDate = faker.date.recent()
       const fakerEndDate = faker.date.future()


    const payload = {
        "client":fakerClient,
        "room":1,
        "bill":1,
        "start":fakerStartDate,
        "end":fakerEndDate
    }    
    return payload
}



function getAllReservationsRequest(cy){
    cy.authenticateSession().then((response =>{
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_RESERVATIONS,
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



function createReservationReques(cy){
    cy.authenticateSession().then((response =>{
        let fakeReservationPayload = createRandomreservationtPayload() 
        
       
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_RESERVATION,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:fakeReservationPayload                                                                                                                                                                                                                                       
        }).then((response =>{               
           const responseAsString = JSON.stringify(response)
           expect(responseAsString).to.have.string(fakeReservationPayload.client)  
           cy.log(response.body.id) 

        }))

    }))


}



module.exports = {
    getAllReservationsRequest, 
    createReservationReques,
    createRandomreservationtPayload
}

