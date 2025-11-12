# Quick Test Guide - All New Features

## 🚀 Before Testing:

1. **Update Supabase** (IMPORTANT!):
   ```sql
   ALTER TABLE comments 
   ADD COLUMN IF NOT EXISTS parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
   ADD COLUMN IF NOT EXISTS author_name TEXT DEFAULT 'Anonymous';
   
   CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON comments(parent_id);
   ```

2. **Restart Server**:
   ```bash
   npm run dev
   ```

---

## ✅ Test Checklist:

### 1. Rich Text Editor (2 minutes)
- [ ] Go to `/admin/login`
- [ ] Login with `iwriteadmin`
- [ ] Click "Create New Post"
- [ ] Type in the content field
- [ ] **Expected**: Can type freely ✅

---

### 2. Reactions System (3 minutes)
- [ ] Visit any blog post
- [ ] Click "Like" button
- [ ] **Expected**: Count increases, button turns maroon ✅
- [ ] Click "Love" button
- [ ] **Expected**: Like decreases, Love increases ✅
- [ ] Click "Love" again
- [ ] **Expected**: Love decreases, button turns gray ✅
- [ ] Refresh page
- [ ] **Expected**: Your reaction is still there ✅

**Test switching reactions**:
- [ ] Click "Like"
- [ ] Click "Dislike"
- [ ] **Expected**: Like goes down, Dislike goes up ✅

---

### 3. Nested Comments (5 minutes)
- [ ] Scroll to comments section
- [ ] Enter name: "John"
- [ ] Write comment: "Great post!"
- [ ] Click "Post Comment"
- [ ] **Expected**: Comment appears with name "John" ✅

**Test replies**:
- [ ] Click "Reply" on your comment
- [ ] Enter name: "Jane"
- [ ] Write reply: "I agree!"
- [ ] Click "Post Reply"
- [ ] **Expected**: Reply appears indented under comment ✅

**Test nested replies**:
- [ ] Click "Reply" on Jane's reply
- [ ] Write another reply
- [ ] **Expected**: Reply appears further indented ✅

**Test anonymous**:
- [ ] Leave name field blank
- [ ] Write comment
- [ ] **Expected**: Shows as "Anonymous" ✅

---

### 4. Welcome Modal (2 minutes)
- [ ] Visit a blog post (new tab or incognito)
- [ ] Wait 1 second
- [ ] **Expected**: Modal appears with blur ✅
- [ ] **Expected**: See welcome message with emojis ✅
- [ ] Click "Continue Reading"
- [ ] **Expected**: Modal closes ✅
- [ ] Refresh page
- [ ] **Expected**: Modal doesn't show again ✅
- [ ] Visit different blog post
- [ ] **Expected**: Modal shows again ✅

---

## 🐛 Troubleshooting:

### Editor still not working?
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check console for errors

### Reactions not updating?
- Check Supabase connection
- Look at Network tab in DevTools
- Verify blog ID is correct

### Comments not nesting?
- **Did you run the SQL update?** ← Most common issue!
- Check Supabase table structure
- Verify `parent_id` column exists

### Modal not showing?
- Clear localStorage: `localStorage.clear()`
- Try incognito mode
- Check console for errors

---

## 📊 Expected Behavior:

### Reactions:
```
Initial: [ Like: 0 ] [ Love: 0 ] [ Dislike: 0 ]

Click Like:
→ [ Like: 1 ] [ Love: 0 ] [ Dislike: 0 ]

Click Love:
→ [ Like: 0 ] [ Love: 1 ] [ Dislike: 0 ]

Click Love again:
→ [ Like: 0 ] [ Love: 0 ] [ Dislike: 0 ]
```

### Comments:
```
Comment 1 (John)
  ↳ Reply 1 (Jane)
    ↳ Reply 2 (Bob)
  ↳ Reply 3 (Alice)

Comment 2 (Anonymous)
  ↳ Reply 1 (Mike)
```

### Modal:
```
First visit: Shows modal
After clicking "Continue": Doesn't show again
Different blog: Shows modal again
```

---

## ✨ Success Criteria:

All features working if:
- ✅ Can type in editor
- ✅ Reactions add/remove/switch
- ✅ Comments can be replied to
- ✅ Replies show indented
- ✅ Modal appears once per blog
- ✅ Database updates correctly

---

## 🎯 Quick Demo Flow:

1. **Create a post** (1 min)
   - Login to admin
   - Create post with title and content
   - Publish

2. **Test reactions** (1 min)
   - Visit post
   - Click like, love, dislike
   - Switch between them

3. **Test comments** (2 min)
   - Add comment
   - Reply to it
   - Reply to reply

4. **See modal** (30 sec)
   - Open in new tab
   - Wait for modal
   - Click continue

**Total time: ~5 minutes**

---

## 📝 Notes:

- Modal shows once per blog (uses localStorage)
- Reactions are per-user (uses localStorage)
- Comments are global (in database)
- All features work offline-first, sync to DB

---

**Everything should work perfectly!** 🎉

If any test fails, check the troubleshooting section above.
