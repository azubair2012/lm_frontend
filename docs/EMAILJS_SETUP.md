# EmailJS Setup Guide — London Move Contact Form

## What is EmailJS?

EmailJS lets you send emails directly from the frontend — no backend needed. Free tier: 200 emails/month.

## Step 1: Create EmailJS Account

1. Go to [emailjs.com](https://www.emailjs.com)
2. Sign up with Google or email
3. Verify your email (required)

## Step 2: Create an Email Service

1. In EmailJS dashboard → **Email Services** → **Add Email Service**
2. Choose Gmail or Outlook (connect your client email)
3. Authorize EmailJS to send on your behalf
4. Note the **Service ID** (e.g., `gmail`, `outlook`)

## Step 3: Create an Email Template

1. Go to **Email Templates** → **Create Template**
2. Set template properties:
   - **To Email**: `admin@london-move.com`
   - **From Name**: `{{name}}`
   - **From Email**: `{{email}}`
   - **Subject**: `{{subject}}`
   - **Message**: `{{message}}`
3. Note the **Template ID** from the template settings

## Step 4: Get Your Public Keys

1. Go to **Account** → **API Keys**
2. Note:
   - **Public Key** (starts with `public_`)
   - **Service ID** (from Step 2)
   - **Template ID** (from Step 3)

## Step 5: Install EmailJS SDK

```bash
cd lm_frontend
npm install @emailjs/browser
```

## Step 6: Add Environment Variables

Create `lm_frontend/.env.local`:

```env
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
```

## Step 7: Update the Contact Form

Replace `HomeContactPreview.tsx` form with EmailJS integration:

```tsx
'use client';

import emailjs from '@emailjs/browser';
import { useState } from 'react';

// Add state for submission status
const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setStatus('sending');

  const form = e.currentTarget;

  try {
    await emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      form,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );
    setStatus('success');
    form.reset();
  } catch (error) {
    console.error('Email send failed:', error);
    setStatus('error');
  }
};
```

Update the button to show loading state:

```tsx
<button
  type="submit"
  disabled={status === 'sending'}
  className="..."
>
  {status === 'sending' ? 'Sending...' : 'Submit'}
</button>
```

Add a status message below the button:

```tsx
{status === 'success' && (
  <p className="text-green-600">Message sent successfully!</p>
)}
{status === 'error' && (
  <p className="text-red-600">Failed to send. Please try again.</p>
)}
```

## Step 8: Test

Run the frontend and submit the contact form. Check `admin@london-move.com` for incoming emails.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "Public key invalid" | Verify keys in `.env.local` match EmailJS dashboard |
| Emails not arriving | Check spam folder, verify email service connected |
| CORS errors | EmailJS handles this — not a frontend CORS issue |
| Form not submitting | Check browser console for errors |

## Security Note

EmailJS public key is... public. Someone could theoretically abuse your quota. Monitor usage at emailjs.com dashboard. The free tier has rate limits. For higher security needs, route through a backend (Resend/Nodemailer) instead.