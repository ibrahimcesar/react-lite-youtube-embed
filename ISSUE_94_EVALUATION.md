# Issue #94 Evaluation: Hiding Suggested Videos After Video Completion

**Issue:** [#94 - Can we hide the suggested videos after completing the video?](https://github.com/ibrahimcesar/react-lite-youtube-embed/issues/94)
**Status:** Open
**Created:** July 26, 2023
**Evaluated:** November 15, 2025

---

## Summary

The user is requesting the ability to hide YouTube's suggested/related videos that appear after a video finishes playing in the react-lite-youtube-embed component.

---

## Current Situation

### YouTube Platform Limitation

**The repository owner's assessment is correct: this is outside the library's control.**

Here's why:

1. **YouTube Changed `rel=0` Behavior (September 2018)**
   - **Before:** `rel=0` would completely disable related videos
   - **After:** `rel=0` only shows related videos **from the same channel**
   - **Cannot be fully disabled** - this is a YouTube platform decision

2. **Current `rel=0` Behavior**
   - When set, shows videos from the same channel only
   - Only truly "hides" related videos if the channel has **no other videos**
   - Not a reliable solution for most use cases

3. **No Other Native Parameter Works**
   - YouTube deprecated/removed other parameters that might have helped
   - The iframe embed API provides no parameter to fully disable related videos

---

## Codebase Analysis

### Current Implementation

The library **already supports** passing the `rel` parameter through the `params` prop:

```tsx
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video Title"
  params="rel=0"
/>
```

**However, there's a naming issue in the code:**

**Line 92** in `src/lib/index.tsx`:
```typescript
rel?: string;  // This prop is defined but...
```

**Line 230** in `src/lib/index.tsx`:
```typescript
const rel = props.rel ? "prefetch" : "preload";  // ...used for resource hints, NOT YouTube rel!
```

**Finding:** The `rel` prop currently controls resource hint behavior (`<link rel="preload|prefetch">`), not the YouTube `rel` parameter. This is a naming collision that could confuse developers.

---

## Potential Solutions

### ❌ Solution 1: Add Direct `rel` Parameter Support
**Status:** Not recommended due to naming collision

The library could add explicit support:
```typescript
// In LiteYouTubeProps
youtubeRel?: "0" | "1";  // Avoid collision with existing `rel` prop
```

**Cons:**
- Adds a prop for limited benefit (doesn't fully hide videos)
- Can already be achieved via `params="rel=0"`
- Misleading - users will expect it to fully hide videos when it doesn't

### ✅ Solution 2: Document the Workaround (Recommended)
**Status:** Most practical approach

Add clear documentation about:
1. The YouTube platform limitation
2. How to use `params="rel=0"` for same-channel videos only
3. The advanced workaround using YouTube Player API

### ✅ Solution 3: Add YouTube Player API Integration (Advanced)
**Status:** Could be a future enhancement

The **only reliable way** to prevent related videos is to use the YouTube IFrame Player API to programmatically stop the video when it ends:

```javascript
// When the video ends (state = 0), call player.stopVideo()
player.on('stateChange', function(event) {
  if (event.data === 0) {  // 0 = ended
    player.stopVideo();  // Returns to thumbnail
  }
});
```

This could be implemented as:
- A new optional prop: `hideRelatedVideos?: boolean`
- Requires `enableJsApi={true}` to work
- Adds complexity but provides the only true solution

---

## Recommendations

### 1. **Documentation Update** (Immediate - High Priority)

Add a FAQ section to README.md:

```markdown
## Frequently Asked Questions

### Can I hide the suggested/related videos after my video ends?

Due to YouTube's platform policies (changed in 2018), it's **no longer possible to completely hide related videos** using embed parameters alone.

**Your options:**

1. **Limit to same-channel videos** (partial solution):
   ```tsx
   <LiteYouTubeEmbed
     id="VIDEO_ID"
     title="Video Title"
     params="rel=0"
   />
   ```
   Note: This only shows videos from your channel, not all related videos. Only effective if your channel has few/no other videos.

2. **Use YouTube Player API** (advanced solution):
   Enable the JS API and programmatically stop the video when it ends:
   ```tsx
   <LiteYouTubeEmbed
     id="VIDEO_ID"
     title="Video Title"
     enableJsApi={true}
     params="rel=0"
   />
   ```
   Then use the YouTube IFrame API to listen for the `onStateChange` event and call `player.stopVideo()` when the video ends (state === 0). This returns the player to the thumbnail view.

   See: [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference)

**Related issue:** [#94](https://github.com/ibrahimcesar/react-lite-youtube-embed/issues/94)
```

### 2. **Fix Naming Collision** (Medium Priority)

The `rel` prop should be renamed to avoid confusion:

```typescript
// Current (confusing):
rel?: string;  // Actually controls preload/prefetch

// Suggested fix:
resourceHint?: "preload" | "prefetch";  // Clear purpose
```

Or deprecate it entirely if it's not widely used.

### 3. **Consider Advanced Feature** (Low Priority - Future Enhancement)

Add built-in support for auto-stopping video when it ends:

```typescript
export interface LiteYouTubeProps {
  // ... existing props

  /**
   * Automatically stop video when it ends to prevent showing related videos.
   * Requires enableJsApi={true} and adds YouTube Player API integration.
   * @default false
   */
  stopOnEnd?: boolean;
}
```

**Implementation complexity:** Medium
**Benefits:**
- Solves the problem completely
- Better developer experience
- No need for users to implement YouTube API themselves

**Considerations:**
- Adds external script dependency (YouTube IFrame API)
- Increases bundle size
- Requires careful iframe communication handling
- Would need new callback props for player events

---

## Issue Resolution

### Recommended Action

**Close the issue** with the following response:

---

> Thanks for raising this! Unfortunately, this is a limitation of YouTube's embed platform, not something we can solve at the library level.
>
> **Background:** YouTube changed the `rel=0` parameter behavior in September 2018. It no longer hides all related videos—it only limits them to videos from the same channel.
>
> **Current workarounds:**
>
> 1. **Use `params="rel=0"`** to limit related videos to your channel only (works well if your channel has few videos):
>    ```tsx
>    <LiteYouTubeEmbed id="VIDEO_ID" title="Title" params="rel=0" />
>    ```
>
> 2. **Use the YouTube Player API** (advanced) to programmatically stop the video when it ends. Enable the JS API and listen for the ended state:
>    ```tsx
>    <LiteYouTubeEmbed id="VIDEO_ID" title="Title" enableJsApi={true} params="rel=0" />
>    ```
>    Then use the [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference) to call `player.stopVideo()` when `event.data === 0` (ended state).
>
> We're adding documentation about this to the README in an upcoming release. We may consider adding built-in support for auto-stopping videos in the future, but for now, the workarounds above are the best options available.
>
> Closing as this is a YouTube platform limitation, not a library bug. Feel free to comment if you have questions about the workarounds!

---

### Alternative Action

**Leave open** and add label `enhancement` if you plan to implement the `stopOnEnd` feature in the future.

---

## Code Changes Required (If Documenting Only)

### File: `README.md`

**Location:** After line 633 (Usage section)

**Add new section:**

```markdown
## ❓ Frequently Asked Questions

### Can I completely hide suggested/related videos?

No, this is a YouTube platform limitation. In September 2018, YouTube changed how the `rel=0` parameter works—it now only limits related videos to the same channel, rather than hiding them completely.

**Available options:**

1. **Limit to same-channel videos:**
   ```tsx
   <LiteYouTubeEmbed id="VIDEO_ID" title="Title" params="rel=0" />
   ```

2. **Use YouTube Player API to auto-stop** (prevents related videos by returning to thumbnail):
   ```tsx
   <LiteYouTubeEmbed
     id="VIDEO_ID"
     title="Title"
     enableJsApi={true}
     params="rel=0"
   />
   ```
   Then implement the YouTube IFrame API to detect when the video ends and call `player.stopVideo()`.

See [Issue #94](https://github.com/ibrahimcesar/react-lite-youtube-embed/issues/94) for discussion.

### Why doesn't `rel=0` hide all related videos anymore?

YouTube changed this behavior in 2018 for business reasons. The embed API no longer provides any way to completely disable related videos using parameters alone. See [YouTube's official documentation](https://developers.google.com/youtube/player_parameters#rel) for details.
```

---

## Testing

No code changes required if only documenting. If implementing `stopOnEnd` feature:

- [ ] Unit tests for stopOnEnd prop
- [ ] Integration test with YouTube Player API
- [ ] Test iframe communication
- [ ] Test that player.stopVideo() is called on end event
- [ ] Test backwards compatibility (feature is opt-in)

---

## Conclusion

**Issue Validity:** Valid user request, but **not solvable at the library level** due to YouTube platform constraints.

**Recommendation:**
1. ✅ **Document the limitation and workarounds** (immediate)
2. ✅ **Fix the `rel` prop naming collision** (near-term)
3. 🔄 **Consider `stopOnEnd` feature** (future enhancement)
4. ✅ **Close issue with explanation** or label as `wontfix` / `external-limitation`

**Impact:** Low - this is a known YouTube limitation affecting all embed implementations, not specific to this library.

**User Experience:** Can be improved through better documentation and potentially a future opt-in feature for advanced users.

---

*Evaluation completed by Claude on November 15, 2025*
