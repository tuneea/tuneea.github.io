# TUNE · tuneea.github.io

Публичный сайт и API обновлений.

| Что | URL |
|-----|-----|
| Лендинг | https://tuneea.github.io/ |
| Tune GO latest | https://raw.githubusercontent.com/tuneea/tuneea.github.io/main/api/go/latest.json |
| TUNE Radio latest | https://raw.githubusercontent.com/tuneea/tuneea.github.io/main/api/app/latest.json |

## Tune GO — как выложить новую версию

APK **не** кладётся в git (файл ~67 МБ). Только GitHub Release.

Имя файла на GitHub всегда: **`tune-go.apk`**  
Тег релиза: **`tune-go-{versionName}`** (например `tune-go-0.7.8`)

Из папки `Tune_GO_v1`:

```bat
android\gradlew.bat assembleDebug
scripts\publish_update.bat
```

Можно передать свой APK и changelog:

```bat
scripts\publish_update.bat android\app\build\outputs\apk\debug\app-debug.apk "GPS names, auto-scan"
```

Скрипт:

1. Берёт локальный `app-debug.apk`
2. Заливает его в Release как `tune-go.apk`
3. Пишет `api/go/latest.json` (versionCode, sha256, downloadUrl)
4. Пушит **только json** в этот репозиторий

`versionCode` в `latest.json` должен быть **больше**, чем в установленном приложении, иначе в Настройках будет «актуально».

Не кладите keystore на GitHub.
