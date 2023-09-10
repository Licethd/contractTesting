import { Verifier } from '@pact-foundation/pact';
import { before, describe, it } from 'mocha';
import path from 'path';
const pactFile = path.resolve(`./react-tripulante-tripulante-service.json`);
let port;
let opts;
describe("Pact Verification", () => {
    before(async () => {
        port = 8080;

        opts = {
            provider: "tripulante-service",
            providerBaseUrl: `http://localhost:${port}`,
            logLevel: "info",
            pactUrls: [pactFile]

        };
    });
    it("Valida lo que espera el API del Tripulante", () => {
        console.log(opts)
        return new Verifier(opts)
            .verifyProvider()
            .then((output) => {
                console.log("Pact Verification Complete!");
                console.log(output);
            })
            .catch((e) => {
                console.error("Pact verification failed :(", e);
            });
    });

});