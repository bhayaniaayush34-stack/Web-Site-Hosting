# Video Assets Directory

Place your local video files (such as `.mp4`, `.webm`, or `.ogg`) in this directory.

## How to use:
1. Place a video file here, for example: `my-work-video.mp4`.
2. In `src/components/Work.tsx`, reference this video in your data list:
   ```typescript
   video: "/videos/my-work-video.mp4"
   ```
3. The `WorkVideo` component will automatically detect it is a local video file and play it in a looping HTML5 video player instead of embedding it as a YouTube iframe.
