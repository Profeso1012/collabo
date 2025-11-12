# Windows Installation Guide

## Prerequisites

Before you begin, make sure you have:
- Windows 10 or 11
- Internet connection
- Administrator access

## Step 1: Install Node.js

1. Go to [nodejs.org](https://nodejs.org)
2. Download the LTS (Long Term Support) version
3. Run the installer
4. Follow the installation wizard (use default settings)
5. Verify installation:
   ```powershell
   node --version
   npm --version
   ```

## Step 2: Fix PowerShell Execution Policy

Open PowerShell as Administrator and run:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Type `Y` and press Enter to confirm.

## Step 3: Navigate to Project Directory

```powershell
cd C:\Users\YourUsername\Documents\iWrite
```

Or wherever you saved the project files.

## Step 4: Install Project Dependencies

```powershell
npm install
```

This will take a few minutes. You'll see a progress bar.

### If you get errors:

**Error: "npm not found"**
- Restart your terminal
- Reinstall Node.js

**Error: "EACCES permission denied"**
- Run PowerShell as Administrator
- Try again

**Error: "network timeout"**
- Check your internet connection
- Try again with: `npm install --verbose`

## Step 5: Set Up Supabase

### Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - Name: iWrite
   - Database Password: (create a strong password)
   - Region: (choose closest to you)
5. Wait for project to be created (2-3 minutes)

### Get Your Credentials

1. In your Supabase project, click "Settings" (gear icon)
2. Click "API" in the sidebar
3. Copy these values:
   - Project URL
   - anon public key
   - service_role key (click "Reveal" first)

### Update Environment File

1. Open `.env.local` in a text editor (Notepad, VS Code, etc.)
2. Replace the placeholder values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_actual_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key
   ```
3. Save the file

### Set Up Database

1. In Supabase, click "SQL Editor" in the sidebar
2. Click "New Query"
3. Open `supabase-schema.sql` from your project
4. Copy ALL the contents
5. Paste into the Supabase SQL Editor
6. Click "Run" (or press F5)
7. You should see "Success. No rows returned"

## Step 6: Set Up Resend (Email Service)

### Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up with your email
3. Verify your email address
4. Log in to dashboard

### Get API Key

1. In Resend dashboard, click "API Keys"
2. Click "Create API Key"
3. Name it "iWrite"
4. Copy the API key (you'll only see it once!)

### Update Environment File

1. Open `.env.local` again
2. Update the Resend key:
   ```env
   RESEND_API_KEY=your_actual_resend_api_key
   ```
3. Save the file

## Step 7: Run the Development Server

```powershell
npm run dev
```

You should see:
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- event compiled client and server successfully
```

## Step 8: Open in Browser

1. Open your web browser
2. Go to: `http://localhost:3000`
3. You should see the iWrite homepage!

## Step 9: Access Admin Dashboard

1. In your browser, go to: `http://localhost:3000/admin`
2. You should see the admin dashboard
3. Click "Create New Post" to test the editor

## Common Windows Issues

### Issue: "npm is not recognized"

**Solution**:
1. Close and reopen PowerShell
2. If still not working, add Node.js to PATH:
   - Search "Environment Variables" in Windows
   - Click "Environment Variables"
   - Under "System variables", find "Path"
   - Click "Edit"
   - Add: `C:\Program Files\nodejs\`
   - Click OK
   - Restart PowerShell

### Issue: "Cannot find module"

**Solution**:
```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

### Issue: Port 3000 already in use

**Solution**:
```powershell
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- -p 3001
```

### Issue: "Access denied" errors

**Solution**:
- Run PowerShell as Administrator
- Or change folder permissions:
  - Right-click project folder
  - Properties > Security
  - Edit > Add your user
  - Give Full Control

### Issue: Slow npm install

**Solution**:
```powershell
# Use a faster registry
npm config set registry https://registry.npmjs.org/
npm install
```

## Recommended Tools for Windows

### Code Editor
- **VS Code** (recommended): [code.visualstudio.com](https://code.visualstudio.com)
- **Notepad++**: [notepad-plus-plus.org](https://notepad-plus-plus.org)

### Terminal
- **Windows Terminal** (recommended): Install from Microsoft Store
- **PowerShell 7**: [github.com/PowerShell/PowerShell](https://github.com/PowerShell/PowerShell)

### Browser
- **Chrome** (recommended for development)
- **Edge** (also good)
- **Firefox**

## VS Code Setup (Optional but Recommended)

1. Install VS Code
2. Open project folder in VS Code
3. Install recommended extensions:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - TypeScript and JavaScript Language Features

4. Open integrated terminal: `` Ctrl + ` ``
5. Run commands directly in VS Code

## Testing Your Installation

### Test 1: Homepage
- Go to `http://localhost:3000`
- Should see hero section with maroon/blue gradient
- Navigation should work

### Test 2: Services Page
- Click "Services" in navigation
- Should see all 5 services listed
- Images should load

### Test 3: Blog Page
- Click "Blog" in navigation
- Should see "No blog posts yet" (normal for new install)

### Test 4: Admin Dashboard
- Go to `http://localhost:3000/admin`
- Should see "Admin Dashboard" heading
- Click "Create New Post"

### Test 5: Rich Text Editor
- In editor, type some text
- Try formatting buttons (bold, italic, etc.)
- Should work smoothly

## Next Steps

1. ✅ Installation complete!
2. Read `SETUP-GUIDE.md` for detailed configuration
3. Read `ADMIN-ACCESS.md` to learn the admin panel
4. Create your first blog post
5. Customize the content for your brand

## Getting Help

If you're stuck:

1. **Check the error message** - Read it carefully
2. **Check browser console** - Press F12 in browser
3. **Check terminal output** - Look for error messages
4. **Restart everything**:
   ```powershell
   # Stop the server (Ctrl+C)
   # Close terminal
   # Reopen terminal
   npm run dev
   ```

## Useful Windows Commands

```powershell
# Check if Node.js is installed
node --version

# Check if npm is installed
npm --version

# List files in current directory
dir

# Change directory
cd folder-name

# Go up one directory
cd ..

# Clear terminal
cls

# Stop running server
Ctrl + C

# Open current folder in File Explorer
explorer .

# Open VS Code in current folder
code .
```

## Firewall Warning

When you first run `npm run dev`, Windows Firewall might ask for permission. Click "Allow access" to let the development server run.

## Antivirus Warning

Some antivirus software might flag npm packages. This is usually a false positive. You may need to:
1. Add an exception for the project folder
2. Temporarily disable antivirus during installation
3. Re-enable after installation completes

## Success Checklist

- [ ] Node.js installed
- [ ] npm working
- [ ] Project dependencies installed
- [ ] Supabase project created
- [ ] Database schema applied
- [ ] Environment variables configured
- [ ] Resend API key added
- [ ] Development server running
- [ ] Website loads in browser
- [ ] Admin dashboard accessible

## Congratulations!

If all checks pass, you're ready to start using iWrite! 🎉

---

**Need more help?** Check the other documentation files:
- `README.md` - Overview and features
- `SETUP-GUIDE.md` - Detailed setup
- `ADMIN-ACCESS.md` - Admin panel guide
- `QUICK-REFERENCE.md` - Common tasks
