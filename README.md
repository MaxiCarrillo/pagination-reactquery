# Pagination RQuery

Este proyecto utiliza React, TypeScript y Vite para crear una aplicación con paginación controlada.

## Cómo levantar el proyecto

1. Instalar las dependencias:
    ```sh
    npm i
    ```

2. Iniciar el servidor de desarrollo:
    ```sh
    npm run dev
    ```

3. Abrir el navegador y entrar a `http://localhost:5173`

## Información de la API

La API devuelve la siguiente información:

```json
{
  "totalPages": 2,
  "totalElements": 11,
  "data": [
    {
      "id": "2f23ec04-2d7d-4303-93a6-bcbea54e8d19",
      "name": "Pava",
      "icon": "http://localhost:8080/api/features/svg/20241103163117_"
    },
    {
      "id": "5d6a6f38-ba9c-477b-b5dd-22447674be71",
      "name": "Wi-fi",
      "icon": "http://localhost:8080/api/features/svg/20241103163210_"
    },
    {
      "id": "3275d6d6-6ce3-49f2-9155-85e6dc32c879",
      "name": "Desayuno",
      "icon": "http://localhost:8080/api/features/svg/20241103163217_"
    },
    {
      "id": "448a092f-cbaf-4317-9c66-d0c36ea6cfd8",
      "name": "Almuerzo",
      "icon": "http://localhost:8080/api/features/svg/20241103163224_"
    },
    {
      "id": "2584b400-d34b-4966-a4e6-5570acf00661",
      "name": "Cafe",
      "icon": "http://localhost:8080/api/features/svg/20241103163229_"
    },
    {
      "id": "6c98998b-9256-4044-9025-0cd0f890d362",
      "name": "Ducha",
      "icon": "http://localhost:8080/api/features/svg/20241103163234_"
    },
    {
      "id": "871ef9bd-aa35-4bb3-9cb8-ab31cffddb7a",
      "name": "Cena",
      "icon": "http://localhost:8080/api/features/svg/20241103163239_"
    },
    {
      "id": "ad14e7fd-4991-4380-8371-dc978cc9aba7",
      "name": "Jabon",
      "icon": "http://localhost:8080/api/features/svg/20241103163244_"
    },
    {
      "id": "f95a4414-eca8-44da-afb4-d8a3a87f702a",
      "name": "Toallas",
      "icon": "http://localhost:8080/api/features/svg/20241103163249_"
    },
    {
      "id": "828af0e9-9b4f-41a7-bc87-32253376b609",
      "name": "Aire acondicionado",
      "icon": "http://localhost:8080/api/features/svg/20241103163255_"
    }
  ],
  "message": "Features retrieved successfully"
}
```

## Librerías utilizadas

Este proyecto utiliza [React Table](https://tanstack.com/table/v8) para la gestión de tablas y [React Query](https://tanstack.com/query/v4) para la gestión de datos asíncronos.