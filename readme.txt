Ing. Jordy Chila Avilez
PRUEBA DE CARGA – SERVICIO LOGIN

Herramienta utilizada:
- k6 v1.4.2
- Editor: Visual Studio Code 1.107.1
- Sistema Operativo: Windows 11

Estructura del proyecto:
- script.js        : Script de prueba de carga
- users.csv        : Datos de usuarios para el login
- readme.txt       : Instrucciones de ejecución
- conclusiones.txt : Hallazgos y conclusiones

Instrucciones de ejecución:

1. Verificar que k6 esté instalado:
   k6 version

2. Ubicarse en la carpeta del proyecto:
   cd prueba-carga-login-k6

3. Ejecutar la prueba con el comando:
   k6 run script.js

Descripción de la prueba:

- Se realiza una prueba de carga al endpoint:
  https://fakestoreapi.com/auth/login

- Los datos de usuario y contraseña se leen desde un archivo CSV.

- El escenario mantiene una tasa constante de carga de:
  20 iteraciones por segundo (20 TPS)
  durante un periodo de 1 minuto.

- La prueba utiliza múltiples usuarios virtuales simulados,
  alcanzando hasta 14 VUs para sostener la carga.

Validaciones implementadas:

- Código de respuesta HTTP.
- Tiempo de respuesta máximo definido (p95 < 1.5 segundos).
- Medición de la tasa de errores de la prueba mediante thresholds.

(Las validaciones corresponden a los criterios definidos
en el ejercicio; los resultados se detallan en el archivo
conclusiones.txt)

