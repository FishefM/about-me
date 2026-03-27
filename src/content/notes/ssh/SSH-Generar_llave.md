 ## 1. Generar par de llaves
 ```bash
 ssh-keygen -t ed25519 -C "Comentario identficador"
 ```
 * Ubicación del archivo: Ruta por defecto (~/.ssh/id_ed25519).
 * Passphrase (Contraseña)
## 2. SSH Agent
El agente SSH gestiona las llaves para no escribirlas cada vez
```bash
eval "$(ssh-agent -s)"
```


Agregar llave privada al agente

```bash
ssh-add ~/.ssh/id_ed25519
```

## 3. Copiar la llave pública
```bash
cat ~/.ssh/id_ed25519.pub
```

wl-clipboard instalado en Wayland:

```bash
cat ~/.ssh/id_ed25519.pub | wl-copy
```

## 4. Registrar la llave en el destino
 * En GitHub/GitLab: Settings > SSH and GPG keys > New SSH Key.
 * En un servidor remoto: 
 ```bash
 ssh-copy-id usuario@ip-del-servidor
 ```
