1.- **Applications** -> **Extensions**
2.- Add New SIP `[chain pjsip]`

**User extension**: `101`
**Display Name**: `yucef`

### Comando para chechar la llamada por UDP
```bash
sudo tcpdump -n -i any udp portrange 10000-10500
```

### Descargar el modulo manager
```bash
docker compose exec freepbx fwconsole ma downloadinstall manager
```
### Recargar el modulo de freepbx console
```bash
docker compose exec freepbx fwconsole reload
```

### Error de permisos
```bash
docker compose exec freepbx rm -f /tmp/cron.error
docker compose exec freepbx fwconsole chown
docker compose exec freepbx fwconsole reload
```

