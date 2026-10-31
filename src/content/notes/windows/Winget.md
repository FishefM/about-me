#### Node
```powershell
winget install OpenJS.NodeJS.LTS
```
#### Git
```bash
winget install Git.Git
```

#### Chocolatley
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```
#### NSSM
```shell
choco install nssm
```

##### Ejecucion de scripts
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```
