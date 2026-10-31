### Descartar cambios locales
```bash
git fetch origin
git reset --hard origin/<rama>
```
### Guardar una copia temporal de stash
```bash
git stash
# Alternativa: crear rama
git branch respaldo-antes-de-pull
```
### Ignorar cambios locales
```bash
#Ignora cambios locales
git update-index --assume-unchanged <archivo>
```

```bash
#Ignora cambios en repo
git update-index --skip-worktree <archivo> 
```

```bash
# Para cuando queramos volver a sincronizarlos
git update-index --no-assume-unchanged <archivo>
```
