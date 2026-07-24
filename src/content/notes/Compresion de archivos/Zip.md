## 1. Crear y Comprimir

| Comando                          | Descripción                                           |
| -------------------------------- | ----------------------------------------------------- |
| `zip archivo.zip nota.txt`       | Comprime un solo archivo.                             |
| `zip -r archivo.zip carpeta/`    | Comprime una carpeta entera de forma **recursiva**.   |
| `zip -9 -r archivo.zip carpeta/` | Comprime aplicando el **nivel máximo de compresión**. |
| `zip -q -r archivo.zip carpeta/` | Modo **silencioso**.                                  |

---

## 2. Modificar y Actualizar

* **Agregar o actualizar archivos existentes:**
```bash
zip -u archivo.zip documento.txt

```


* **Mover archivos dentro del ZIP** (comprime y elimina el archivo original):
```bash
zip -m archivo.zip documento.txt

```


* **Eliminar un archivo específico del interior del ZIP:**
```bash
zip -d archivo.zip "carpeta/basura.txt"

```



---

## 3. Exclusiones y Seguridad

* **Excluir tipos de archivo o patrones:**
```bash
zip -r proyecto.zip proyecto/ -x "*.log" "*.tmp"

```


* **Proteger con contraseña (cifrado):**
```bash
zip -e -r secreto.zip datos_sensibles/

```



---

## 4. Inspeccionar y Extraer (`unzip`)

* **Listar contenido sin descomprimir:**
```bash
unzip -l archivo.zip
# Ver permisos y fechas:
zipinfo archivo.zip

```


* **Descomprimir en el directorio actual:**
```bash
unzip archivo.zip

```


* **Descomprimir en una carpeta específica:**
```bash
unzip archivo.zip -d /ruta/de/destino/

```

>[!INFO] Si se trabaja con archivos muy grandes se puede dividir en partes con `-s`:

```bash
zip -s 500m -r parte.zip carpeta_gigante/ 
```

