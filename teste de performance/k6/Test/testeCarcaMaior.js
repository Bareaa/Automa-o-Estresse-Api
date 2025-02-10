import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate, Trend } from 'k6/metrics';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

// Simulando teste de carga com requisições do tipo get, put, post e delete
const responseTime = new Trend('response_time');
const requestErrors = new Rate('request_errors');

export const options = {
    stages: [
        { duration: '1m', target: 100 },
        { duration: '3m', target: 100 },
        { duration: '1m', target: 0 }
    ],
    thresholds: {
        http_req_duration: ['p(95)<2000'],
        http_req_failed: ['rate<0.01'],
        http_reqs: ['rate>10']
    }
};

export default function () {
    group('Teste de Carga - Operações CRUD', () => {
        // GET
        const getResponse = http.get('https://jsonplaceholder.typicode.com/users');
        check(getResponse, {
            'GET /users status is 200': (r) => r.status === 200,
            'GET /users response time < 2000ms': (r) => r.timings.duration < 2000,
        });
        responseTime.add(getResponse.timings.duration);
        requestErrors.add(getResponse.status !== 200);

        // POST
        const postPayload = JSON.stringify({
            name: 'Robson Silva',
            username: 'robsonsilva',
            email: 'robson.silva@exemplo.com',
            address: {
                street: 'Rua das Flores',
                suite: 'Apto 101',
                city: 'São Paulo',
                zipcode: '01000-000',
                geo: { lat: '-23.5505', lng: '-46.6333' }
            },
            phone: '(11) 98765-4321',
            website: 'robsonsilva.com.br',
            company: {
                name: 'Empresa Brasileira',
                catchPhrase: 'Inovação e Qualidade',
                bs: 'Soluções em TI'
            }
        });
        const postResponse = http.post('https://jsonplaceholder.typicode.com/users', postPayload, {
            headers: { 'Content-Type': 'application/json' }
        });
        check(postResponse, {
            'POST /users status is 201': (r) => r.status === 201,
            'POST /users response time < 2000ms': (r) => r.timings.duration < 2000,
        });
        responseTime.add(postResponse.timings.duration);
        requestErrors.add(postResponse.status !== 201);

        // PUT
        const putPayload = JSON.stringify({
            name: 'Robson Silva Atualizado',
            username: 'robsonsilva',
            email: 'robson.silva@exemplo.com'
        });
        const putResponse = http.put('https://jsonplaceholder.typicode.com/users/1', putPayload, {
            headers: { 'Content-Type': 'application/json' }
        });
        check(putResponse, {
            'PUT /users/1 status is 200': (r) => r.status === 200,
            'PUT /users/1 response time < 2000ms': (r) => r.timings.duration < 2000,
        });
        responseTime.add(putResponse.timings.duration);
        requestErrors.add(putResponse.status !== 200);

        // DELETE
        const deleteResponse = http.del('https://jsonplaceholder.typicode.com/users/1');
        check(deleteResponse, {
            'DELETE /users/1 status is 200': (r) => r.status === 200,
            'DELETE /users/1 response time < 2000ms': (r) => r.timings.duration < 2000,
        });
        responseTime.add(deleteResponse.timings.duration);
        requestErrors.add(deleteResponse.status !== 200);

        sleep(1);
    });
}

export function handleSummary(data) {
    return {
        'load_test_report.html': htmlReport(data),
        'load_test_summary.json': JSON.stringify(data, null, 2),
        stdout: textSummary(data, { indent: ' ', enableColors: true }),
    };
}