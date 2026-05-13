# Redundant Code Report

Generated: 2026-05-12

See also: [lm_backend/docs/redundancy.md](../lm_backend/docs/redundancy.md)

---

## 1. `formatPrice` — defined twice with different signatures

**Files:**
- `src/lib/utils.ts:8` — `formatPrice(price: number): string`
- `src/lib/formatters.ts:6` — `formatPrice(price: string | number): string`

**What:** Same utility, two definitions.

**Why:** `PropertyCard` and `PropertyDetails` import from `utils.ts`. `formatters.ts` copy is dead.

**Action:** Delete `formatters.ts` copy. Make `utils.ts` version accept `string | number`.

---

## 2. `formatDate` — imported but never used

**File:** `src/components/PropertyDetails.tsx:6`

**What:** `import { formatPrice, formatDate } from '@/lib/utils'` — `formatDate` not referenced in component.

**Why:** Dead import.

**Action:** Remove from import.

---

## 3. `ImageSlider` — two components with identical export name

**Files:**
- `src/components/ImageSlideShow.tsx:21` — `function ImageSlider()`
- `src/components/InterImageSlider.tsx:36` — `function ImageSlider()`

**What:** Both export `ImageSlider`. One handles static external URLs; the other handles a single local image.

**Why:** Naming conflict. Unpredictable which is imported.

**Action:** Rename to `ImageSlideShow` and `InternationalImageSlider`.

---

## 4. `SLIDE_DURATION` — three sliders each define their own constant

**Files:**
- `src/components/HeroSlider.tsx:28` — `const SLIDE_DURATION = 10000`
- `src/components/InterImageSlider.tsx:34` — `const SLIDE_DURATION = 5000`
- `src/components/TestimonialsSlider.tsx:30` — `const SLIDE_DURATION = 6000`

**What:** Each slider hardcodes its own duration with no shared configuration.

**Why:** No central place for slider timing. Values should be unified.

**Action:** Create `src/lib/slider-config.ts` with exported duration constants per slider type.

---

## 5. JWT verification — duplicated in middleware and admin check route

**Files:**
- `src/middleware.ts:4` — `verifyToken(token: string): Promise<boolean>`
- `src/app/api/admin/check/route.ts:5` — `verifyToken(cookieValue?: string): Promise<boolean>`

**What:** Both verify JWT: check existence → encode secret → `jwtVerify` → check expiry.

**Why:** Copy-pasted auth logic.

**Action:** Create `src/lib/auth.ts` with single `verifyAdminToken`. Import everywhere.

---

## 6. `isAuthenticatedAdmin` — copy-pasted into two admin routes

**Files:**
- `src/app/api/admin/content/route.ts:7`
- `src/app/api/admin/content/[key]/route.ts:7`

**What:** Identical function definition in both files.

**Why:** Code duplication.

**Action:** Move to `src/lib/auth.ts`. Import in both routes.

---

## 7. Three near-identical upload button components

**File:** `src/app/admin/international-properties/page.tsx`

**What:** `MapButton` (lines 35-123), `BrochureButton` (lines 125-213), `UploadButton` (lines 215-333) share:
- Same `uploading`, `progress`, `error` state
- Same `handleClick` file input logic
- Same file size validation
- Same Cloudinary XHR upload logic
- Same error handling

Only differences: file type, upload endpoint, button label.

**Why:** ~80% identical code.

**Action:** Create `useCloudinaryUpload` hook and single `UploadButton` component accepting `accept` and `endpoint` props.

---

## 8. `PropertyData` type and default data split across files

**Files:**
- `src/app/international-properties/types.ts:3-11` — type definition
- `src/lib/content-registry.ts:13-85` — `DEFAULT_INTERNATIONAL_PROPERTIES` array

**What:** Type defined in `types.ts` but default data lives in `content-registry.ts`.

**Why:** Poor locality. Type and default data are tightly coupled but separated.

**Action:** Move `DEFAULT_INTERNATIONAL_PROPERTIES` to `types.ts` next to `PropertyData`.

---

## 9. Image URL construction repeated — `getImageUrl` utility exists but unused

**Files:**
- `src/components/PropertyCard.tsx:87`
- `src/components/TopPropertyCard.tsx:33`
- `src/components/PropertyGallery.tsx:57-60, 65, 73`

**What:** All manually construct `${getBaseUrl()}/api/images/${photo}`.

**Why:** `getImageUrl(filename)` exists in `utils.ts:30-33` but components don't use it.

**Action:** Use existing `getImageUrl` utility everywhere.

---

## 10. Editable content loading pattern — repeated in 3 pages

**Files:**
- `src/app/page.tsx:68-90`
- `src/app/about/page.tsx:11-35`
- `src/app/services/page.tsx:11-37`

**What:** Identical `loadEditableContent` async function in all three: fetch `/api/content?keys=...`, check response, find entry by key, set state.

**Why:** 25+ line pattern copy-pasted 3 times.

**Action:** Create `useEditableContent(key)` hook in `src/hooks/useEditableContent.ts`.

---

## 11. Split imports from same module

**File:** `src/app/properties/page.tsx:5-6`

**What:**
```typescript
import { Property, SearchParams } from '@/lib/api';
import { rentmanApi } from '@/lib/api';
```

**Why:** Two import statements from same file.

**Action:** Combine into one: `import { Property, SearchParams, rentmanApi } from '@/lib/api'`.

---

## 12. Debug logging left in production JSX

**File:** `src/components/PropertyDetails.tsx:102-121`

**What:**
```typescript
if (process.env.NODE_ENV === 'development') {
  console.log('Property Description Debug:', { ... });
}
```

**Why:** Debug code remains in production. `NODE_ENV` check in component render is unusual for Next.js.

**Action:** Remove debug block or move to a proper logging utility.

---

## 13. Pagination logic — duplicated across properties and sale pages

**Files:**
- `src/app/properties/page.tsx`
- `src/app/sale/page.tsx`

**What:** Both define identical `page`, `totalPages`, `hasNext`, `hasPrev` state; `pageCache` Map; `goToPage` with caching logic; identical JSX pagination controls. ~150 lines each.

**Why:** Copy-pasted pagination.

**Action:** Create `usePagination` hook with cache support.

---

## 14. Default filter state repeated in 3 places

**Files:**
- `src/app/properties/page.tsx:18-28`
- `src/app/sale/page.tsx:18-29`
- `src/components/SearchFilters.tsx:22-32`

**What:** Each defines identical default `SearchParams`:
```typescript
{ page: 1, limit: 12, q: '', area: '', type: '', beds: undefined, minPrice: undefined, maxPrice: undefined, featured: false }
```

**Why:** Defaults defined in 3 places. Change in one doesn't propagate.

**Action:** Define `DEFAULT_SEARCH_PARAMS` in `src/lib/api.ts` and import everywhere.

---

## 15. `Property` parsing/destructuring logic duplicated in `PropertyCard`

**Files:**
- `src/lib/api.ts:42-146` — `Property` interface (~50 fields)
- `src/components/PropertyCard.tsx:38-81` — destructuring/parsing logic

**What:** `PropertyCard` re-computes `lineOne`, `lineTwo`, `totalBeds`, `parsedSalePrice`, `parsedRent`, `formattedAvailableDate`, `furnishedLabel`.

**Why:** This transformation logic belongs with the `Property` type or a transformer utility.

**Action:** Create `src/lib/property-utils.ts` with `formatPropertyAddress`, `parsePropertyPrice`, etc.

---

## Summary

| # | File(s) | Issue | Type |
|---|---------|-------|------|
| 1 | `utils.ts`, `formatters.ts` | `formatPrice` duplicate | duplicate function |
| 2 | `PropertyDetails.tsx:6` | `formatDate` unused import | dead import |
| 3 | `ImageSlideShow.tsx`, `InterImageSlider.tsx` | `ImageSlider` naming conflict | naming conflict |
| 4 | `HeroSlider`, `InterImageSlider`, `TestimonialsSlider` | `SLIDE_DURATION` x3 | repeated constants |
| 5 | `middleware.ts`, `check/route.ts` | JWT verification duplicated | duplicate logic |
| 6 | `content/route.ts`, `content/[key]/route.ts` | `isAuthenticatedAdmin` duplicated | duplicate function |
| 7 | `admin/international-properties/page.tsx` | 3 near-identical upload buttons | code duplication |
| 8 | `types.ts`, `content-registry.ts` | `PropertyData` type/data split | poor locality |
| 9 | `PropertyCard`, `TopPropertyCard`, `PropertyGallery` | image URL manual construction | repeated logic |
| 10 | `page.tsx`, `about/page.tsx`, `services/page.tsx` | editable content loading x3 | copy-pasted pattern |
| 11 | `properties/page.tsx:5-6` | split imports from same module | style issue |
| 12 | `PropertyDetails.tsx:102-121` | debug logging in production | dead code |
| 13 | `properties/page.tsx`, `sale/page.tsx` | pagination duplicated | copy-pasted code |
| 14 | `properties/page.tsx`, `sale/page.tsx`, `SearchFilters.tsx` | default filter state x3 | repeated constants |
| 15 | `api.ts`, `PropertyCard.tsx` | Property parsing logic | poor locality |

**Total: 15 findings**