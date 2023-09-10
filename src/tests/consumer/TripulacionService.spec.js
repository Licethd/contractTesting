import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import TripulacionService from '../../services/TripulacionService.js';
import { crearTripulacionRequestBody, crearTripulacionResponse } from '../PactResponses.js';
const { like } = MatchersV3;
describe('El API de Tripulación', () => {

    const provider = new PactV3({
        consumer: 'react-tripulacion',
        provider: 'tripulacion-service'
    });

    describe('crear tripulación', () => {
        it('retorna un id de tripulación ya creado', () => {
            //Arrange
            provider.given('crear tripulación')
                .uponReceiving('una solicitud para crear una tripulación')
                .withRequest({
                    method: 'POST',
                    path: '/api/tripulacion/registro',
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: crearTripulacionRequestBody
                }).willRespondWith({
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: like(crearTripulacionResponse)
                });
            return provider.executeTest(async mockServer => {
                // Act
                const tripulacionService = new TripulacionService(mockServer.url);
                return tripulacionService.crearTripulacion(crearTripulacionRequestBody.Descripcion).then((response) => {
                    //Assert
                    expect(response).to.be.not.null;
                    expect(response).to.be.a.string;
                    expect(response).equal(crearTripulacionResponse);
                });
            });

        });
    });


});