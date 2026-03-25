# Bienvenidos a mis notas

Este es un ejemplo de una nota en Markdown que incluye un diagrama de **Mermaid**.

## Diagrama de Flujo

```mermaid
graph TD
    A[Inicio] --> B{¿Funciona?}
    B -- Sí --> C[¡Genial!]
    B -- No --> D[Revisar configuración]
    C --> E[Fin]
    D --> B
```

## Lista de tareas
- [ ] Crear ruta /notes
- [ ] Implementar sidebar
- [ ] Configurar Fuse.js
