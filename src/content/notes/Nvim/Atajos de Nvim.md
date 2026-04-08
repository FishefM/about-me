

## Navegación

- `0` / `$`: Ir al inicio / final de la línea.
- `gg` / `G`: Ir al inicio / final del archivo.
- `{` / `}`: Saltar párrafos completos.
- `Ctrl + u` / `Ctrl + d`: Subir o bajar media pantalla (scroll rápido).

## Edición y Modos

- `o`: Abrir una nueva línea debajo y entrar en modo insertar.
- `ctrl + v`: Visual Block

## Operaciones de Texto (Corte y Confección)

- `dd`: Borrar (cortar) la línea actual.
- `yy`: Copiar (yank) la línea actual.
- `p`: Pegar después del cursor.
- `u`: Deshacer (undo).
- `Ctrl + r`: Rehacer (redo).

## 4. Gestión de Ventanas (Splits)

Si usas un gestor de ventanas como Hyprland, estos te resultarán muy naturales:

- `:split` o `:sp`: División horizontal.
- `:vsplit` o `:vs`: División vertical.
- `Ctrl + w` + `h/j/k/l`: Moverse entre las divisiones.
- `Ctrl + w` + `q`: Cerrar la división actual.
    

---

### Atajos de "Calidad de Vida" (Comandos de Sistema)

- `:w`: Guardar.
    
- `:q`: Salir.
    
- `:wq`: Guardar y salir.
    
- `:q!`: Salir sin guardar cambios.
    
- `/%palabra%`: Buscar una palabra en el archivo (`n` para siguiente, `N` para anterior).
    

> **Tip para tu setup:** Si usas **Dracula Pro**, asegúrate de tener activado el `termguicolors` en tu `init.lua` o `init.vim` para que los colores se vean perfectos en **Kitty**.

¿Estás configurando algún plugin específico como **Telescope** o **LSP** ahora mismo?