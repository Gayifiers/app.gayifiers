# Gayifiers iOS App — AI / Team Handover

> **用途：** 換 AI、換人、或隔一段時間再開工時，先讀呢份文件，避免重複踩雷、用錯 folder、或 submit 錯 build。  
> **最後更新：** 2026-07-01  
> **維護：** 每次重要 build / App Store 結果 / 架構改動後，更新「目前狀態」同「Build 紀錄」。

---

## 1. 專案概覽

| 項目 | 值 |
|------|-----|
| **產品** | Gayifiers iOS v1.0 — Bangkok LGBTQ+ venue 指南（mock data） |
| **技術** | Expo SDK 54 · Expo Router 6 · React Native 0.81 · TypeScript |
| **Bundle ID** | `com.uncletullio.gayifiers` |
| **EAS Project** | `@gayifiers/appgayifiers` · ID `ac6d4743-4c25-4afb-bfc6-380d6d7094bc` |
| **GitHub** | https://github.com/gayifiers/app.gayifiers |
| **Apple App** | Gayifiers · **Apple ID `6758533618`**（有 icon 嗰個） |
| **Apple Team** | RFA5J7UM9C · Uncle Tullio Ltd |
| **版本** | Marketing `1.0.0` · 本地 `buildNumber` 見 `app.json` |

### 相關但**唔同 repo** 嘅 project

| Project | Path | 用途 |
|---------|------|------|
| **iOS App（呢份 handover）** | `~/Projects/app.gayifiers` | App Store / TestFlight |
| **Web Map** | `~/Downloads/gayifiers-map` | map.gayifiers.com — 見該 repo **`HANDOVER.md`** |
| **❌ 勿用** | `~/Developer/app.gayifiers` | iCloud 搞壞 `.git`，EAS 會 fail |

---

## 2. 目前狀態（2026-07-01）

### App Store Connect

| 項目 | 狀態 |
|------|------|
| **Version 1.0** | 曾被拒（2 次），修正後 **Build 25 已 TestFlight 驗證正常** |
| **最新 EAS Build** | **Build 25 — FINISHED**（buildNumber 25） |
| **TestFlight** | Build 25 — **user 已確認 TestFlight 正常開到 Explore，冇黑畫面** |
| **下一步** | 去 App Store Connect → Distribution → 揀 Build 25 → **Resubmit to App Review** |
| **Distribution Add Build** | 要等 TestFlight Processing + Export Compliance 完成 |

### 功能範圍（v1.0 送審版）

- ✅ Explore：Bangkok venues（mock `data/places.ts`）
- ✅ Venue 詳情、`/venue/[id]`
- ✅ Favorites（AsyncStorage，唔使 login）
- ✅ Profile / Settings（Privacy & Support 連去 uncletullio 頁）
- ✅ Filter 掣（`explore.tsx`）已經係真 bottom sheet，揀 category 真係會 filter
- ❌ 隱藏：Trending、Deals、Plus、login、IAP（過審後 v1.1 再做）

### 2026-07-01 為咗避免再撞 2.2.0（似 beta/未完成）拒絕，拎走咗嘅嘢

- ❌ **「More destinations」city chip 列**（Tokyo/Osaka/Seoul/Taipei/Singapore/HK）已刪 —— 之前淨係得個名同 emoji，撳落去冇反應，會俾 reviewer 睇成「未完成」
- Filter 掣由「彈 alert 叫你用底下 chip」改做真正有用嘅 category filter sheet
- Settings「App Language」由「Follows your device language (English)」（講大咗，app 冧死英文）改做老實寫「English」
- 呢個唔代表要永遠唔做 multi-city / 多語言 —— 只係 v1.0 送審前**唔好用視覺暗示未完成嘅功能**，v1.1 先加返

### Metadata / URLs（Connect 已用或應用）

| 欄位 | URL / 內容 |
|------|------------|
| **Support** | https://www.uncletullio.co.uk/gayifiers/support |
| **Privacy** | https://www.uncletullio.co.uk/gayifiers/privacy |
| **Marketing URL** | 留空（唔填 gayifiers.com 主站） |
| **Sign-in required** | **OFF** |
| **Promotional Text** | 要提 Bangkok，**唔好**寫 trends / privacy-first |
| **Mac availability** | 建議 **關** Apple Silicon Mac（避免 ITMS-90863 warning） |

---

## 3. Build 紀錄（重要）

| Build | EAS | Connect / 測試 | 結果 / 原因 |
|-------|-----|----------------|-------------|
| **10** | — | Submit | ❌ **2.2.0** beta 未完成 · **2.3.3** metadata 不符 |
| **14** | ✅ | Resubmit | ❌ **2.1(a)** iPad launch crash |
| **15** | ✅ | TestFlight | ❌ 一開就 crash（EAS 未 upload 齊 untracked files） |
| **16** | ✅ | — | 源碼 commit 齊，但未充分驗 TestFlight |
| **17** | ✅ | TestFlight | 白畫面（Stack 冇 register index） |
| **18** | ❌ ERRORED | — | Pod install fail（`Podfile.properties` 改壞） |
| **19** | ✅ | TestFlight | 黑畫面（`<Redirect />` production 唔跳轉） |
| **20** | ✅ FINISHED | 未驗（HANDOVER 誤記做「已修」） | 刪 index Redirect、**但呢個從未實際解決問題** — 之後證實冧咗去 `+not-found` 頁，只係冇人發現 |
| **21**（`21657e9`） | ✅ FINISHED | 未驗 | 神秘 commit：加返 `index.tsx` + `<Redirect>`（冇 nav-ready guard），同時 `RCTNewArchEnabled` 由 `false` 沖返做 `true`（似係跑咗 `expo prebuild`），commit message 話「等 navigation ready」但完全冇改 routing code |
| **22** | ✅ FINISHED | ❌ TestFlight 黑畫面 | Revert 走 `index.tsx`（跟返「Build 20 做法」），但依家先知呢個做法本身就係錯（見 §4）|
| **23** | ✅ FINISHED | ✅ 冇黑畫面（但用 Expo Go 驗，唔係真 TestFlight） | 加返 `index.tsx` + `useRootNavigationState()` guard，搵到真正根因：**`/` 冇 route 會跳去 `+not-found`**，唔關 Redirect 事 |
| **24** | ✅ FINISHED | ❌ TestFlight 黑畫面（真機） | UI polish（drawer safe area、拎走 coming-soon chips、真 filter modal、settings 文字）；`RCTNewArchEnabled: false` 但呢次先真正喺 TestFlight 測到 —— 黑畫面持續 |
| **25** | ✅ FINISHED | ✅ **TestFlight 真機驗證正常** | `newArchEnabled: true`（`app.json` + `Podfile.properties.json` + `Info.plist` 三處一致）— 真正根因：Expo Go 強制開 New Architecture，之前用 Expo Go 測試完全冇驗證到 `false` 呢個 native 設定得唔得 |

---

## 4. 已知問題 & 已做 fix（唔好 undo）

### EAS / Git

- **一定要**喺 `~/Projects/app.gayifiers` build
- **一定要 commit** 先 `eas build`（`eas.json` 設咗 `requireCommit: true`）
- **唔好**用 `~/Developer/app.gayifiers`（git mmap timeout、`main 2` bad ref）
- `eas build` **唔會**自動 upload Connect → 要另外 `eas submit --platform ios --latest`

### iOS / Launch

- `supportsTablet: false` · iPhone only
- Entry：`index.js` → `react-native-gesture-handler` 再 `expo-router/entry`
- **唔好**加 `expo-splash-screen` plugin 但唔 run prebuild（曾 native crash）

### ⚠️ 2026-07-01 推翻咗嘅舊指引（唔好再跟）

以下兩條係之前 HANDOVER 寫低嘅「已做 fix」，但經 Build 20-25 一輪實測證實**係錯**，已經反過來：

1. ~~「唔好加返 `app/index.tsx` 用 `<Redirect />`」~~ —— **錯**。`_layout.tsx` 個 `initialRouteName: '(tabs)'` **唔會**令 `/` 自動 render `(tabs)`，冇 `index.tsx` 嘅話 `/` 直接冧去 `+not-found` 頁（dark theme 底色，睇落好似黑畫面）。**正確做法**：`app/index.tsx` 要留低，但要用 `useRootNavigationState()` gate 住先 `<Redirect>`：
   ```tsx
   import { Redirect, useRootNavigationState } from 'expo-router';
   export default function Index() {
     const rootNavigationState = useRootNavigationState();
     if (!rootNavigationState?.key) return null;
     return <Redirect href="/(tabs)/explore" />;
   }
   ```
   Build 19 個真正問題唔係「用咗 Redirect」，而係冇呢個 nav-ready guard。

2. ~~「`newArchEnabled: false`（app.json + Info.plist RCTNewArchEnabled）」~~ —— **錯，已反轉做 `true`**。Expo Go **永遠強制**開 New Architecture 唔理你點設，所以之前所有淨用 Expo Go 驗證「work 咗」都冇實際測試過 `false` 呢個設定喺真正 native TestFlight binary 度得唔得（Build 22-24 就係咁樣一直黑畫面都冇人發現）。而家三處要一致設 `true`：
   - `app.json` → `"newArchEnabled": true`
   - `ios/Podfile.properties.json` → 加 `"newArchEnabled": "true"`（**呢個先係 native 編譯層面真正生效嘅開關**，Info.plist 個 flag 淨係 runtime hint）
   - `ios/appgayifiers/Info.plist` → `RCTNewArchEnabled: true`
   - 改完淨係喺 `ios/` 度跑 `pod install`（**唔好**跑成個 `expo prebuild --clean`，見下）

### ⚠️ 唔好跑 `expo prebuild --clean`（會 rename 成個 project）

`app.json` 嘅 `name` 係 `"Gayifiers"`，但 native project 一路用緊 `"appgayifiers"`（同 `slug` 一致）呢個名。`expo prebuild --clean` 會完全刪走 `ios/` 資料夾再由零根據 `app.json` 嘅 **`name`**（唔係 `slug`）重新生成，結果會將 `ios/appgayifiers.xcodeproj`、`ios/appgayifiers/` 成套 rename 做 `ios/Gayifiers.xcodeproj`、`ios/Gayifiers/`（AppDelegate、entitlements、bridging header 全部變）。2026-07-01 撞過一次，已即時 revert 冇 commit。**如果要改 native 設定（例如 newArchEnabled），淨係手動改相關檔案 + 跑 `pod install`，唔好用 `--clean` prebuild。**

### App Store 唔好做

- ❌ 改 bundle ID
- ❌ 用 duplicate app **Gayifiers (94c6dc)** / `com.gayifiers.app.gayifiers`
- ❌ 審核中改 metadata / upload 新 build（除非 Apple 要求）
- ❌ Submit Build 15–19（已知 bad）

### Warnings（可 ignore 或關 Mac availability）

- **ITMS-90863** — React.framework / Mac 兼容性 warning，delivery 仍可成功

---

## 5. 標準工作流程

### 本地

```bash
cd ~/Projects/app.gayifiers
npm install
npm run dev          # Expo Go / Simulator
npm run typecheck
```

### 打 Build + Submit

```bash
cd ~/Projects/app.gayifiers

# 1. 改完 code 一定要 commit
git add -A && git status
git commit -m "描述改動"

# 2. Build（等 FINISHED，唔好 ERRORED 就 submit）
eas build --platform ios --profile production

# 3. Submit 去 Connect
eas submit --platform ios --latest
```

### Connect 後

1. **TestFlight** → 等 Processing → 答 **Export Compliance**（No encryption / exempt）
2. 手機 **刪舊 app** → TestFlight 裝 **最新 build** → 試 Explore → venue → ❤️
3. **Distribution** → Version 1.0 → 揀新 build → **Resubmit to App Review**

### Review Notes 模板

```
No demo account required. Open the app to Explore Bangkok venues.
Tap a venue for details; use the heart icon to save favorites.
No sign-in required. iPhone-optimized app (supportsTablet: false).
```

---

## 6. 關鍵檔案地圖

```
~/Projects/app.gayifiers/
├── HANDOVER.md              ← 呢份文件
├── app.json                 ← version, buildNumber, bundleIdentifier
├── eas.json                 ← ascAppId 6758533618, requireCommit
├── index.js                 ← gesture-handler entry
├── app/
│   ├── _layout.tsx          ← Root Stack + FavoritesProvider + ErrorBoundary
│   ├── (tabs)/
│   │   ├── _layout.tsx      ← 3 tabs: explore, favorites, profile
│   │   ├── explore.tsx      ← 主畫面
│   │   ├── favorites.tsx
│   │   └── profile.tsx
│   ├── venue/[id].tsx
│   └── settings.tsx
├── components/TopNavigation.tsx
├── contexts/FavoritesContext.tsx
├── hooks/useFavorites.ts
├── data/places.ts           ← Bangkok mock venues
├── constants/strings.ts
└── ios/                     ← 已 commit；改 native 要同步 buildNumber
```

---

## 7. App Store 拒絕紀錄（原文摘要）

### Build 10 — 2026-06（首次）

- **2.2.0** — 似 beta / 未完成
- **2.3.3** — metadata 同 app 唔符（trends、privacy-first、Sign-in 等）

### Build 14 — 2026-06-29

- **2.1(a)** — iPad Air M3 launch crash（iPadOS 26.5）
- Submission ID: `46c32876-87b2-4c31-92c9-fba180128440`

---

## 8. 下一步（過審後）

| 優先 | 工作 |
|------|------|
| 1 | App Store Connect → Distribution → 揀 **Build 25** → Resubmit to App Review |
| 2 | Connect 關 Mac availability |
| 3 | 過審 → Manual release |
| 4 | v1.1：Supabase、IAP、Trending、真正接駁 `constants/strings.ts` 已寫低嘅 `STRINGS_ZH_TW` |
| 5 | map.gayifiers.com production + 會員打通 |
| 6 | 清理 duplicate Connect app (94c6dc) |

---

## 9. 換 AI 時請更新呢度

每次 session 結束，請改：

- [ ] **§2 目前狀態** — 最新 build number、TestFlight / Review 結果
- [ ] **§3 Build 紀錄** — 加新 row
- [ ] **§9 待辦** — 下個 AI 要做咩

### 待辦（user / 下個 AI）

- [ ] Distribution → Resubmit to App Review with **Build 25**
- [ ] 若再拒：paste **完整 rejection email** + crash `.ips`（Settings → Analytics）— 呢份 HANDOVER 之前淨係得摘要，冇存過完整原文，好難精準分析
- [ ] 過審後：考慮真正做 locale switching（`STRINGS_ZH_TW` 已寫低但未接駁，`expo-localization` 未裝）

---

## 10. 聯絡 / 帳號

| 用途 | 值 |
|------|-----|
| **Review / Support email** | info@uncletullio.co.uk |
| **EAS owner** | gayifiers |
| **Expo project** | https://expo.dev/accounts/gayifiers/projects/appgayifiers |

---

*呢份文件專為 Gayifiers **iOS app**。Web map 進度見 `~/Downloads/gayifiers-map` repo。*
