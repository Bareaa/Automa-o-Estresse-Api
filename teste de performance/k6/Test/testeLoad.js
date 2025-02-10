import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const responseTime = new Trend('response_time');
const requestErrors = new Rate('request_errors');

export const options = {
    stages: [
        { duration: '1m', target: 50 },
        { duration: '3m', target: 50 },
        { duration: '1m', target: 0 }
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% das requisições devem responder em menos de 500ms
        http_req_failed: ['rate<0.01']    // Menos de 1% de erros
    }
};

export default function () {
    const response = http.get('https://jsonplaceholder.typicode.com/users');
    
    // Registro de métricas
    responseTime.add(response.timings.duration);

    const checks = check(response, {
        'status is 200': (r) => r.status === 200,
        'response time OK': (r) => r.timings.duration < 500,
    });

    requestErrors.add(!checks);

    sleep(1);
}

export function handleSummary(data) {
    return {
        'load_test_report.html': htmlReport(data),
        'load_test_summary.json': JSON.stringify(data, null, 2),
        stdout: textSummary(data, { indent: ' ', enableColors: true }),
    };
}