# Uso Básico de React Query

# Objetivo 
El objetivo de este ejemplo es aprender a utilizar `React-Query` ejecutando una pequeño CRUD de productos en este caso.

# Introduccion

Este README te guiará a través del uso básico de React Query, una potente librería de gestión de datos en aplicaciones React. React Query simplifica la gestión de datos, especialmente cuando se trata de realizar solicitudes de red, caché y actualizaciones de datos en tiempo real.

## ¿Qué es React Query?
React Query es una librería de gestión de estado y datos que se centra en la gestión de datos de manera eficiente, proporcionando herramientas para recuperar, almacenar en caché y actualizar datos de forma sencilla en aplicaciones React. Algunos de los conceptos clave de React Query incluyen:

<b>Query</b>: Una consulta que representa una solicitud de datos. React Query maneja la recuperación de datos de una manera optimizada, gestionando automáticamente el almacenamiento en caché, la invalidación de caché y las actualizaciones de datos en tiempo real.

<b>Query Client</b>: El núcleo de React Query es el cliente de consulta (Query Client). Es el centro de control que gestiona todas las consultas y sus resultados.

<b>Mutation</b>: Las mutaciones son solicitudes para modificar datos en el servidor. React Query también simplifica este proceso al proporcionar herramientas para enviar mutaciones y actualizar el estado de la caché en consecuencia.

Hooks Principales: React Query ofrece una serie de ganchos personalizados para interactuar con el cliente de consulta y las consultas. Algunos de los ganchos más utilizados incluyen useQuery, useMutation, useQueryClient, useQueryErrorResetBoundary, entre otros.

<strong>Comencemos!</strong>

1. Vamos a generar el proyecto con `Vite` (les dejo la [documentacion](https://vitejs.dev/))

```bash
npm create vite
```

2. Luego colocamos el nombre del proyecto, seleccionamos el framework que vamos a utilizar: React en este ejemplo y por ultimo el lenguaje: javascript

3. Accedemos a la carpeta y ejecutamos el comando `npm install`
```bash
npm install
```

4. Ahora vamos a instalar `React-Query`. Aqui les dejo la documentacion a [TanStack](https://tanstack.com/query/v3/) o a [NPM](https://www.npmjs.com/package/react-query)

```bash
npm i react-query
```

5. Abrimos el proyecto de Vite que viene como ejemplo y ahora si viene la parte divertida! Limpiemos el template que trae el proyecto de Vite... borrando todo el codigo de los archivos `App.jsx`, `App.css` y `index.css`

6. Vamos al archivo que es <b>el punto de entrada</b> de nuestra aplicación (Importante: concepto de punto de entrada). En este ejemplo es el archivo `main.jsx` porque estamos en un proyecto Vite, pero en otro proyecto puede ser el archivo `index.jsx`.

7. Lo primero que debemos hacer es "envolver" nuestra aplicacion en un contexto. "Envolver" quiere decir, que vamos a proporcionar a toda nuestra aplicacion el poder acceder a un contexto. Esto en el codigo se ve asi:

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
```

A esto le falta un poquito! Notese que solamente estamos "envolviendo" la aplicacion en un componente que se llama <b>ReactClientProvider</b> importado desde `@tanstack/react-query` pero debemos indicar a que cliente se va a conectar... Para eso debemos usar <b>QueryClient</b> y pasarle al provider el contexto, el cliente a quien va a realizar las consultas. Entonces nuestro codigo nos quedara asi:

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
```

### Conceptos tecnicos, mejor explicado por mi amigo chatGPT
`QueryClientProvider` es un componente proporcionado por React Query que juega un papel fundamental en la configuración y gestión de la biblioteca en una aplicación React. Para entender su concepto y uso, es esencial comprender los siguientes puntos:

<b>Proporciona un contexto para React Query:</b> Sí, `QueryClientProvider` crea un contexto en tu aplicación. Un contexto es una característica de React que permite compartir datos entre componentes sin necesidad de pasar explícitamente las propiedades de un componente a otro. En el caso de React Query, el contexto creado por `QueryClientProvider` permite que todos los componentes de tu aplicación accedan al mismo cliente de consulta (QueryClient) y, por lo tanto, compartan la misma instancia de este cliente.

<b>El "QueryClient":</b> El cliente de consulta (QueryClient) es una instancia central de React Query que se encarga de gestionar todas las consultas, mutaciones y datos en tu aplicación. Contiene la lógica para realizar consultas, administrar la caché, manejar errores y más. Al utilizar `QueryClientProvider`, estás configurando esta instancia globalmente en tu aplicación.

<b>Propósito de `QueryClientProvider`:</b> El propósito principal de `QueryClientProvider` es configurar y proporcionar el cliente de consulta a todos los componentes de tu aplicación, de modo que puedan acceder a él y realizar consultas y mutaciones de manera sencilla. Sin `QueryClientProvider`, sería más complicado gestionar el ciclo de vida del cliente de consulta y compartirlo entre componentes.

<b>Uso en la configuración inicial:</b> Normalmente, `QueryClientProvider` se utiliza en el punto de entrada de tu aplicación, como index.js o App.js. En ese lugar, configuras una instancia de QueryClient y la pasas como prop a `QueryClientProvider`. Esto asegura que el cliente de consulta esté disponible en toda tu aplicación.

8. Instalacion de `react-query-devtools`. React Query proporciona una herramienta que es un debugger. Esta herramienta se llama `react-query-devtools`. Su documentacion [aqui](https://tanstack.com/query/v4/docs/react/devtools)

```bash
npm i @tanstack/react-query-devtools
```

React Query Devtools es una herramienta que complementa la librería React Query y que facilita la depuración y el seguimiento de las consultas y mutaciones en una aplicación React. Aquí tienes un breve resumen de sus principales características:

<b>Inspección de Consultas y Mutaciones:</b> Permite visualizar y depurar todas las consultas y mutaciones realizadas en la aplicación, incluyendo detalles como los datos recuperados, los errores, el estado de carga y más.

<b>Panel de Control:</b> Ofrece un panel de control interactivo que permite pausar, reiniciar o forzar la reejecución de consultas y mutaciones en tiempo real para probar diferentes escenarios.

<b>Seguimiento en Tiempo Real:</b> Proporciona una visión en tiempo real de las actualizaciones de datos y cambios en las consultas a medida que se ejecutan y se refrescan.

<b>Integración Sencilla:</b> Puede integrarse fácilmente en una aplicación React que ya esté utilizando React Query, lo que lo convierte en una herramienta valiosa para el desarrollo y la depuración.

<b>Facilita la Identificación de Problemas:</b> Ayuda a los desarrolladores a identificar y solucionar problemas relacionados con las consultas y mutaciones, lo que mejora la calidad y el rendimiento de la aplicación.

9. Integracion de `react-query-devtools`. Una vez instalada la herramienta, debemos integrarla en nuestra aplicacion, para ello, en el archivo que representa el "punto de entrada" de nuestra aplicacion agregaremos las siguientes lineas:

```javascript
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
```
y el compoente:

```javascript
<ReactQueryDevtools />
```

Quedando finalmente nuestro codigo:

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
```

10. Instalacion de un backend "falso". React-query nos sirve para realizar consultas a un backend o a una base de datos, como no es el objetivo de este proyecto crear un backend, vamos a instalar una herramienta que nos permita interactuar con un backend: `json-server`

11. 