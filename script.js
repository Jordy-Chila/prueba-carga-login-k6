//k6
import http from 'k6/http';
import { check, sleep } from 'k6';

//Configuracion de prueba (usuarios, carga, tiempo)
export let options = {
  scenarios: {
    carga_login: {
      executor: 'constant-arrival-rate',
      rate: 20,
      timeUnit: '1s',
      duration: '1m',
      preAllocatedVUs: 20,
      maxVUs: 50,
    },
  },
};

//lectura de archivo CSV (usuarios)
import { SharedArray } from 'k6/data';

const users = new SharedArray('usuarios', function () {
  return open('./users.csv')
    .split('\n')
    .slice(1)
    .map(line => {
      const [user, passwd] = line.split(',');
      return { user, passwd };
    });
});

//Función principal (la prueba real) - export default
export default function () {
  const usuario = users[Math.floor(Math.random() * users.length)];

  const url = 'https://fakestoreapi.com/auth/login';

  const payload = JSON.stringify({
    username: usuario.user,
    password: usuario.passwd,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(url, payload, params);

//Validaciones
  check(response, {
    'status es 200': r => r.status === 200,
    'tiempo < 1.5s': r => r.timings.duration < 1500,
  });

  sleep(1);
}
