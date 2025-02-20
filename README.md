
# Instalación de librerías en el cmd
## 1 Instalar librerías necesarias
Ejecutar lo siguiente:
### `npm install`

## 2 Instalar three.js

Ejecutar lo siguiente:

### `npm install three`

## 3 Instalar React Three Fiber (para usar Three.js en React):

Ejecutar lo siguiente:

### `npm install @react-three/fiber`
## 4 Instalar Drei (utilidades y componentes adicionales para React Three Fiber):

Ejecutar lo siguiente:

### `npm install @react-three/drei`
## 5 Verificar librerías
Verificas yendo al archivo:
### `packjson`

## 6 Ejecutar proyecto
Iniciar el proyecto:
### `npm start`


# Estructura que debería tener la animación componetizado
```/src
│── /components
│   ├── ThreeScene.js   // Escena principal con el Canvas
│   ├── Model.js        // Colibrí animado
│   ├── Background.js   // Nuevo archivo para el fondo
│   ├── Sphere.js       // Ignorar este archivo, no cuenta 
│── App.js              // Junta todo
```


*Nota:* Falta implementar `Background.js`. (Asignado a Jerson)

Como será el `Background.js`
```
✔ Un cuadrado grande (pared) detrás del colibrí
✔ Otro cuadrado (piso) debajo del colibrí
```
Dónde Integrarlo
```
1 Crear Background.js para las figuras geométricas(PISO Y PARED)
2️ Importarlo en ThreeScene.js y renderizarlo antes del colibrí
3 En App.js se importa el Background.js y ThreeScene.js
```

