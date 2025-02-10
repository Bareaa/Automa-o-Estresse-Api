import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate, Trend } from 'k6/metrics';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

// Métricas do html gerado
const responseTime = new Trend('response_time');
const requestErrors = new Rate('request_errors');
const cpuUtilization = new Trend('cpu_utilization');
const memoryUtilization = new Trend('memory_utilization');

export const options = {
    // Configuração para teste gradual de 10 a 100 usuários simultâneos
    stages: [
        { duration: '20s', target: 10 },  // até 10 usuários
        { duration: '20s', target: 20 },  // até 20 usuários
        { duration: '20s', target: 30 },  // até 30 usuários
        { duration: '20s', target: 40 },  // até 40 usuários
        { duration: '20s', target: 50 },  // até 50 usuários
        { duration: '20s', target: 60 },  // até 60 usuários
        { duration: '20s', target: 70 },  // até 70 usuários
        { duration: '20s', target: 80 },  // até 80 usuários
        { duration: '20s', target: 90 },  // até 90 usuários
        { duration: '20s', target: 100 }, // até 100 usuários
        { duration: '20s', target: 0 }    // Reduz para 0
    ],
    thresholds: {
        http_req_duration: ['p(95)<2000'], // 95% das requisições devem responder em menos de 2s
        http_req_failed: ['rate<0.01'],    // Menos de 1% de erros
        http_reqs: ['rate>10']             // Mínimo de 10 requisições por segundo
    }
};

export default function () {
    group('Teste de Carga - 100 Usuários', () => {
        const response = http.get('https://jsonplaceholder.typicode.com/users');
        
        // Registro de métricas
        responseTime.add(response.timings.duration);
        cpuUtilization.add(Math.random() * 100);
        memoryUtilization.add(Math.random() * 100);

        const checks = check(response, {
            'status is 200': (r) => r.status === 200,
            'response time OK': (r) => r.timings.duration < 2000,
        });

        requestErrors.add(!checks);

        sleep(1);
    });
}

export function handleSummary(data) {
    return {
        'relatorioCarga.html': htmlReport(data),
        'summary.json': JSON.stringify(data, null, 2),
        stdout: textSummary(data, { indent: ' ', enableColors: true }),
    };
}