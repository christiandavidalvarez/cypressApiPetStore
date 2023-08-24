function getRandomArbitrary(min, max) {
    const upper = max + 1                      // random() upper limit is excluded
    return Math.floor(Math.random() * (max - min) + min)
  }

  let id=getRandomArbitrary(105,905)
context('peticiones Rest',()=>{

    it('Agregar una mascota a la tienda mediante un servicio POST',()=>{
        cy.request('POST','https://petstore.swagger.io/v2/pet',{
            id: 101,
            category: {
              id: id,
              name: 'raza-1'
            },
            name: 'dinosaur',
            photoUrls: [
              'string'
            ],
            tags: [
              {
                id: 1,
                name: 'string'
              }
            ],
            status: 'available'
          }).then((response)=>{
            cy.log(response.body)
            expect(response.status).to.eq(200)
          })
    })
})

