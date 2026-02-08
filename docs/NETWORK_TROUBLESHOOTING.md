# Network / API connectivity troubleshooting

## Symptom

- **Public API works** (e.g. jsonplaceholder) → device has internet.
- **`https://be.ipractus.com` fails** in Expo Go with "Network request failed" or "Network Error".

The API is reachable from your development machine (`curl https://be.ipractus.com/api/` returns 200), so the issue is between the **device/emulator** and the API when using Expo Go.

---

## Quick fix: local API proxy (Expo Go)

**Use this when you want to keep using Expo Go** and the device cannot reach `be.ipractus.com` directly. The app talks to your Mac over Wi‑Fi; your Mac forwards requests to the API. This has been verified to work.

1. **Terminal 1 – start the proxy**
   ```bash
   npm run proxy:api
   ```
   Leave it running. It listens on port **3099** and forwards to `https://be.ipractus.com`.

2. **Get your Mac’s LAN IP**  
   Shown in the Expo “Metro waiting on” line (e.g. `10.0.0.142`).

3. **Terminal 2 – start Expo with the proxy as API base**  
   Phone must be on the **same Wi‑Fi** as your Mac.
   ```bash
   EXPO_PUBLIC_API_BASE=http://10.0.0.142:3099/api npx expo start --clear
   ```
   Replace `10.0.0.142` with your Mac’s IP.

4. Open the app in **Expo Go** and use login as usual. Requests go: phone → Mac:3099 → be.ipractus.com.

**Production / dev build:** When you’re not using the proxy, don’t set `EXPO_PUBLIC_API_BASE` (or set it to `https://be.ipractus.com/api`) so the app talks to the real API.

---

## Alternative: development build (no proxy)

Expo Go uses a shared runtime where **your app’s network/SSL settings in `app.json` are ignored**. A **development build** uses your native config and can often reach `be.ipractus.com` directly, so you don’t need the proxy.

**On a physical Android device (e.g. Pixel 6) – no Android SDK on your Mac needed:**

1. `npm install -g eas-cli` (if needed), then `eas login`
2. `eas build --profile development --platform android`
3. Install the APK on your phone (link or QR from the EAS build page)
4. Run `npx expo start --clear` and open the project from the **development build** app (not Expo Go)

---

## Other checks (if the proxy isn’t an option)

### Same network (physical device)

- Use the **same Wi‑Fi** as your Mac (not mobile data).
- Avoid guest or isolated Wi‑Fi that might block certain domains.

### Android emulator DNS

- In AVD Manager → edit the emulator → set DNS to `8.8.8.8`, then cold boot.
- Confirm API from host: `curl -s -o /dev/null -w "%{http_code}" https://be.ipractus.com/api/` (expect 200).

### Override API base (local or tunnel backend)

If the backend runs locally or behind a tunnel:

```bash
EXPO_PUBLIC_API_BASE=http://YOUR_MAC_IP:PORT/api npx expo start --clear
```

- **Android emulator:** use `10.0.2.2` for the host (e.g. `http://10.0.2.2:3000/api`).
- **Physical device:** use your Mac’s LAN IP; `app.json` has `usesCleartextTraffic: true` for Android.

### Backend / firewall

- Ensure the API allows requests from mobile IPs (no allowlist that excludes your device).
- If the API is behind a VPN/firewall, the device may not have the same access as your Mac.

---

## Quick checks

| Check | Command / action |
|-------|------------------|
| API reachable from Mac | `curl -s -o /dev/null -w "%{http_code}" https://be.ipractus.com/api/` (expect 200) |
| App platform in logs | Look for `[authApi.login] Platform: android` or `ios` |
| In-app diagnostics | Use the in-app connectivity check (public API vs your API). |

---

## References

- **Proxy script:** `scripts/dev-api-proxy.js` – forwards `http://0.0.0.0:3099` → `https://be.ipractus.com`
- **API config:** `src/config/api.ts` – `API_BASE_URL` and `EXPO_PUBLIC_API_BASE`
- **Connectivity test:** `src/services/api/connectivity.ts` – in-app network diagnostics
- **Native config:** `app.json` – iOS ATS and Android `usesCleartextTraffic` (apply in dev builds, not in Expo Go)
