    function getRandomArbitrary(min, max) {
        const upper = max + 1                      // random() upper limit is excluded
        return Math.floor(Math.random() * (max - min) + min)
    }

    let id_generated=getRandomArbitrary(105,905)
    let urlHostPetStore='https://petstore.swagger.io/v2/pet'
    let nameChanged='Puppy'.concat(id_generated)
    let statusChanged='sold'

    describe('peticiones Rest de una Pet Store',()=>{

    it('Agregar una mascota a la tienda mediante un servicio POST',()=>{
        cy.request('POST',urlHostPetStore,{
            id: id_generated,
            category: {
              id: id_generated,
              name: 'raza'.concat(id_generated)
            },
            name: 'dinosaur'.concat(id_generated),
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

    it('Consultar la mascota agregada a la tienda de mascotas',()=>{
        cy.request(urlHostPetStore.concat("/",id_generated)).then((response)=>{
            cy.log(response.body)
            expect(response.status).to.eq(200)
            expect(response.body).property('name').to.eq('dinosaur'.concat(id_generated))
            expect(response.body).property('status').to.eq('available')
        })
    })

    it('Modificar el nombre y el status de la mascota agregada',()=>{
        cy.request({
            url: urlHostPetStore.concat("/",id_generated),
            method: 'POST',
            headers:{
               'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'name='+nameChanged+'&status='+statusChanged
        }).then((response)=>{
            cy.log(response)
            expect(response.status).to.eq(200)
        })
    })

    it('Consultar que la modificacion de mascota se haya realizado con los valores cambiados',()=>{
        var bodyChangedPet=''
        cy.request(urlHostPetStore.concat('/','findByStatus','?status=',statusChanged)).
        then((response)=>{
            cy.log(response.body)
            bodyChangedPet=response.body.filter(function(x){ return x.id == id_generated; })
            cy.log(bodyChangedPet)
           expect(bodyChangedPet[0]).property('name').to.eq(nameChanged)
        })
    })
})

