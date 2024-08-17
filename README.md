# My Project

This is a whatsapp application

## Screenshot

![Screenshot of the Application](screenshots/app.png)

## Authentication (After deployment)

Add the URL to the authentication providers (e.g., Facebook) in MongoDB Atlas.
Add the URL to "Allowed Domains for the JavaScript SDK" in the Facebook app settings.
Add the URL to "Allowed Request Origins" in the app settings in MongoDB Atlas.

## Facebook Access Token Setup

To enable Facebook login functionality in your local environment, follow these steps to generate and configure the required access token.

### Step 1: Generate a Facebook Access Token

1. Go to the [Facebook Graph API Explorer](https://developers.facebook.com/tools/explorer/).
2. Log in with your Facebook account if prompted.
3. Select your Facebook application from the **Meta App** dropdown menu.
4. In the **Permissions** section, ensure that you check the `email` permission.
5. Click **Generate Access Token**.
6. Copy the generated access token.

### Step 2: Update Your Local Environment

1. In the root directory of the project, locate the `.example.env` file.
2. Rename `.example.env` to `.env`.
3. Open the `.env` file and replace the placeholder for the `VITE_FACEBOOK_ACCESS_TOKEN` variable with your generated access token.

   Your `.env` file should look like this:

   ```env
   VITE_FACEBOOK_ACCESS_TOKEN=your-generated-access-token-here
   ```
