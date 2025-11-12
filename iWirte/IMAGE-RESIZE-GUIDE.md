# Image Resizing Guide - Rich Text Editor

## How to Add and Resize Images

### Step 1: Add an Image

1. Click the **image icon** in the toolbar (📷)
2. Enter the image URL in the prompt
   - Example: `https://picsum.photos/800/400`
   - Or use your own hosted image URL
3. Click OK
4. Image appears in the editor

### Step 2: Resize the Image

1. **Click on the image** in the editor
   - The image will get a red outline
   - Cursor changes to resize cursor
   
2. **Click and hold** on the image
   
3. **Drag** to resize
   - Drag down-right to make larger
   - Drag up-left to make smaller
   
4. **Release** mouse button to set the size

### Visual Indicators:

- **Hover**: Image gets a red outline
- **Selected**: Image has red outline and resize cursor
- **Resizing**: Image changes size as you drag

### Tips:

- **Start with larger images** (800px+) and resize down
- **Maintain aspect ratio** by dragging from corners
- **Click outside** the image to deselect
- **Double-click** to select again for resizing

### Recommended Image Sizes:

- **Full width**: 800-1200px wide
- **Half width**: 400-600px wide
- **Thumbnail**: 200-300px wide

### Image URL Sources:

1. **Picsum (placeholder)**:
   - `https://picsum.photos/800/400` (800x400)
   - `https://picsum.photos/600/400` (600x400)
   - `https://picsum.photos/400/300` (400x300)

2. **Unsplash (free photos)**:
   - Go to unsplash.com
   - Find an image
   - Right-click > Copy image address
   - Paste in editor

3. **Your own hosting**:
   - Upload to image hosting service
   - Use the direct URL
   - Make sure it's publicly accessible

### Troubleshooting:

**Image won't resize?**
- Make sure you clicked the image first
- Look for the red outline
- Try clicking again to reselect

**Image too small/large?**
- Delete and re-add with different URL
- Or resize by dragging

**Image not showing?**
- Check URL is correct
- Make sure URL is publicly accessible
- Try a different image URL

### Alternative: HTML Width Attribute

If drag-resize doesn't work, you can also:

1. Switch to HTML view (if available)
2. Add width attribute:
   ```html
   <img src="url" width="600">
   ```

### Best Practices:

1. **Optimize images** before uploading (compress)
2. **Use appropriate sizes** (don't use 4K images)
3. **Test on mobile** to ensure images fit
4. **Add alt text** for accessibility (future feature)

---

**Pro Tip**: Start with a larger image and resize down for better quality!
