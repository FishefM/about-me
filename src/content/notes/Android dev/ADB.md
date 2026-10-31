### Aplicacion
```bash
 adb logcat -v color --pid=$(adb shell pidof -s com.tokiserver.tokitube)
```

### Proceso
```bash
  adb logcat -v color -v time | grep --line-buffered -iE "tokitube|Toki|okhttp|ExoPlayer"
```