# Gayifiers iOS App — AI / Team Handover

> **用途：** 換 AI、換人、或隔一段時間再開工時，先讀呢份文件，避免重複踩雷、用錯 folder、或 submit 錯 build。  
> **最後更新：** 2026-06-29  
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
| **Web Map** | `~/Downloads/gayifiers-map` | map.gayifiers.com（Supabase / Stripe） |
| **❌ 勿用** | `~/Developer/app.gayifiers` | iCloud 搞壞 `.git`，EAS 會 fail |

---

## 2. 目前狀態（2026-06-29）

### App Store Connect

| 項目 | 狀態 |
|------|------|
| **Version 1.0** | 曾被拒，修正中 resubmit |
| **最新 EAS Build** | **Build 20 — FINISHED**（commit `a96474e`） |
| **TestFlight** | Build 19 曾黑畫面；Build 20 修 Redirect 問題，**待 user 驗收** |
| **Submit** | Build 20 可能要跑 `eas submit --platform ios --latest` |
| **Distribution Add Build** | 要等 TestFlight Processing + Export Compliance 完成 |

### 功能範圍（v1.0 送審版）

- ✅ Explore：Bangkok venues（mock `data/places.ts`）
- ✅ Venue 詳情、`/venue/[id]`
- ✅ Favorites（AsyncStorage，唔使 login）
- ✅ Profile / Settings（Privacy & Support 連去 uncletullio 頁）
- ❌ 隱藏：Trending、Deals、Plus、login、IAP（過審後 v1.1 再做）

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
| **20** | ✅ FINISHED | **待驗** | 刪 index Redirect、直接開 tabs/explore |

---

## 4. 已知問題 & 已做 fix（唔好 undo）

### EAS / Git

- **一定要**喺 `~/Projects/app.gayifiers` build
- **一定要 commit** 先 `eas build`（`eas.json` 設咗 `requireCommit: true`）
- **唔好**用 `~/Developer/app.gayifiers`（git mmap timeout、`main 2` bad ref）
- `eas build` **唔會**自動 upload Connect → 要另外 `eas submit --platform ios --latest`

### iOS / Launch

- `supportsTablet: false` · iPhone only
- **唔好**加返 `app/index.tsx` 用 `<Redirect />`（TestFlight 黑畫面）
- 開 app 靠 `(tabs)/explore` + `initialRouteName: 'explore'`
- **唔好**加 `expo-splash-screen` plugin 但唔 run prebuild（曾 native crash）
- **唔好**改 `Podfile.properties.json` 加 `newArchEnabled`（Build 18 pod fail）
- `newArchEnabled: false` 喺 `app.json` + `Info.plist` `RCTNewArchEnabled` false
- Entry：`index.js` → `react-native-gesture-handler` 再 `expo-router/entry`

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
| 1 | TestFlight 確認 **Build 20** 正常 → Resubmit |
| 2 | Connect 關 Mac availability |
| 3 | 過審 → Manual release |
| 4 | v1.1：Supabase、IAP、Trending |
| 5 | map.gayifiers.com production + 會員打通 |
| 6 | 清理 duplicate Connect app (94c6dc) |

---

## 9. 換 AI 時請更新呢度

每次 session 結束，請改：

- [ ] **§2 目前狀態** — 最新 build number、TestFlight / Review 結果
- [ ] **§3 Build 紀錄** — 加新 row
- [ ] **§9 待辦** — 下個 AI 要做咩

### 待辦（user / 下個 AI）

- [ ] `eas submit` Build 20（若未 submit）
- [ ] TestFlight 驗 Build 20（Explore 有內容、唔 crash、唔黑畫面）
- [ ] Distribution Resubmit with Build 20
- [ ] 若再拒：paste **完整 rejection email** + crash `.ips`（Settings → Analytics）

---

## 10. 聯絡 / 帳號

| 用途 | 值 |
|------|-----|
| **Review / Support email** | info@uncletullio.co.uk |
| **EAS owner** | gayifiers |
| **Expo project** | https://expo.dev/accounts/gayifiers/projects/appgayifiers |

---

*呢份文件專為 Gayifiers **iOS app**。Web map 進度見 `~/Downloads/gayifiers-map` repo。*
