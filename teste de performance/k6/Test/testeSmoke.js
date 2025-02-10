import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

// Métricas customizadas
const requestErrors = new Rate('request_errors');

export const options = {
    vus: 1, // Apenas 1 usuário virtual
    duration: '1m', // Duração curta
    thresholds: {
        http_req_failed: ['rate<0.01'], // Menos de 1% de erros
        http_req_duration: ['p(95)<500'] // 95% das requisições devem responder em menos de 500ms
    }
};

export default function () {
    // Teste básico de GET
    const getResponse = http.get('https://jsonplaceholder.typicode.com/users');
    const getChecks = check(getResponse, {
        'GET /users status is 200': (r) => r.status === 200,
        'GET /users response time < 500ms': (r) => r.timings.duration < 500,
    });
    requestErrors.add(!getChecks);

    // Teste básico de POST
    const payload = JSON.stringify({ name: 'Test User', email: 'test@test.com' });
    const params = { headers: { 'Content-Type': 'application/json' } };
    const postResponse = http.post('https://jsonplaceholder.typicode.com/users', payload, params);
    const postChecks = check(postResponse, {
        'POST /users status is 201': (r) => r.status === 201,
        'POST /users response time < 500ms': (r) => r.timings.duration < 500,
    });
    requestErrors.add(!postChecks);

    sleep(1);
}

export function handleSummary(data) {
    return {
        'smoke_test_report.html': htmlReport(data),
        'smoke_test_summary.json': JSON.stringify(data, null, 2),
        stdout: textSummary(data, { indent: ' ', enableColors: true }),
    };
}