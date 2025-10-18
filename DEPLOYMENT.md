# Deployment Guide

This guide will help you deploy your Database Schema Designer to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed locally
- Your project pushed to a GitHub repository

## Step 1: Update Configuration

Before deploying, update the `base` path in `vite.config.ts` to match your repository name:

```typescript
base: process.env.NODE_ENV === 'production' ? '/YOUR-REPO-NAME/' : '/',
```

Replace `YOUR-REPO-NAME` with your actual GitHub repository name.

## Step 2: Enable GitHub Pages

1. Go to your GitHub repository
2. Click on **Settings**
3. Navigate to **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**

## Step 3: Push Your Code

The GitHub Actions workflow is already configured in `.github/workflows/deploy.yml`.

Simply push your code to the `main` branch:

```bash
git add .
git commit -m "feat: initial deployment setup"
git push origin main
```

## Step 4: Monitor Deployment

1. Go to the **Actions** tab in your GitHub repository
2. You should see a workflow run called "Deploy to GitHub Pages"
3. Wait for it to complete (usually 2-3 minutes)
4. Once completed, your site will be live at:
   ```
   https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
   ```

## Troubleshooting

### Build Fails

If the build fails in GitHub Actions:
1. Check the error logs in the Actions tab
2. Make sure all dependencies are in `package.json`
3. Test the build locally with `npm run build`

### Page Not Found (404)

If you get a 404 error:
1. Verify the `base` path in `vite.config.ts` matches your repo name
2. Check that GitHub Pages is enabled and set to "GitHub Actions"
3. Ensure the deployment workflow completed successfully

### Assets Not Loading

If the page loads but assets (CSS/JS) are missing:
1. Check the browser console for errors
2. Verify the `base` path is correct
3. Try adding a trailing slash to the base path

## Manual Deployment

If you prefer to deploy manually:

1. Build the project:
   ```bash
   npm run build
   ```

2. Install `gh-pages`:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add a deploy script to `package.json`:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

## Updating Your Deployment

Every time you push to the `main` branch, GitHub Actions will automatically rebuild and redeploy your site.

To deploy manually:
```bash
git add .
git commit -m "feat: add new feature"
git push origin main
```

## Custom Domain

To use a custom domain:

1. Add a `CNAME` file to the `public/` directory with your domain name
2. Configure your DNS provider to point to GitHub Pages
3. Enable custom domain in GitHub repository settings

## Environment Variables

If you need environment variables:

1. Add them to GitHub repository secrets
2. Reference them in `.github/workflows/deploy.yml`
3. Access them in your code using `import.meta.env.VITE_YOUR_VAR`

## Security

- Never commit sensitive data (API keys, passwords)
- Use environment variables for configuration
- Review the Actions logs for any exposed secrets

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Actions Documentation](https://docs.github.com/actions)
