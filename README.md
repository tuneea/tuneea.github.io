# TUNE · tuneea.github.io

Публичный сайт и API обновлений для **pv.tune.ea**.

| Что | URL |
|-----|-----|
| Лендинг | https://tuneea.github.io/ |
| Latest | https://raw.githubusercontent.com/tuneea/tuneea.github.io/main/api/app/latest.json |
| Diagnostics (GET stub) | https://tuneea.github.io/api/app/diagnostics.json |

## Как выложить новую версию APK

1. Положи APK в `releases/`
2. Посчитай sha256 и размер
3. Обнови `api/app/latest.json` (`versionCode` > установленного в приложении, сейчас порог **8**)
4. Commit + push

## Diagnostics

POST на GitHub Pages не работает. В приложении отправка отключена; здесь только GET-заглушка.
