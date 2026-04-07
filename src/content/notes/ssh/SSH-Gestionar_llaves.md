## Generar una segunda llave
```bash
ssh-keygen -t ed25519 -C "yucef-trabajo" -f ~/.ssh/id_ed25519_trabajo
```
## Generar un archivo config
```bash
nvim ~/.ssh/config
```
```ssh
# GitHub (llave original)
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519

# Servidor
Host servidor-trabajo
    HostName 1.2.3.4
    User yucef
    Port 22
    IdentityFile ~/.ssh/id_ed25519_trabajo
    AddKeysToAgent yes

```
## Agregar al agente
```bash
ssh-add ~/.ssh/id_ed25519_trabajo
```
* -d: Delete
## Ver llaves del agente
```
ssh-add -l
```
## Conectar a servidor

Se usa una bandera 
```bash
ssh-copy-id -i ~/.ssh/id_ed25519_servidor-trabajo usuario@ip-del-servidor
```
O mediante el archivo .ssh/config (Se usa la ultima llave creada)
```bash
ssh-copy-id servidor-trabajo
```