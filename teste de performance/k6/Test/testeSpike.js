import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const responseTime = new Trend('response_time');
const requestErrors = new Rate('request_errors');

export const options = {
    stages: [
        { duration: '10s', target: 0 },
        { duration: '10s', target: 100 },
        { duration: '1m', target: 100 },
        { duration: '10s', target: 0 }
    ],
    thresholds: {
        http_req_duration: ['p(95)<3000'], // 95% das requisições devem responder em menos de 3s
        http_req_failed: ['rate<0.05']     // Menos de 5% de erros
    }
};

export default function () {
    const response = http.get('https://jsonplaceholder.typicode.com/users');
    
    responseTime.add(response.timings.duration);

    const checks = check(response, {
        'status is 200': (r) => r.status === 200,
        'response time OK': (r) => r.timings.duration < 3000,
    });

    requestErrors.add(!checks);

    sleep(1);
}

export function handleSummary(data) {
    return {
        'spike_test_report.html': htmlReport(data),
        'spike_test_summary.json': JSON.stringify(data, null, 2),
        stdout: textSummary(data, { indent: ' ', enableColors: true }),
    };
}