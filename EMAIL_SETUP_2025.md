# 🚀 Modern Email System Setup Guide (2025)

## Environment Variables Setup

Tambahkan variabel berikut ke file `.env.local` Anda:

```bash
# === PRIMARY EMAIL SERVICE (RESEND) ===
RESEND_API_KEY=your_resend_api_key_here
FROM_EMAIL=onboarding@resend.dev  # atau domain email Anda

# === FALLBACK EMAIL SERVICE (GMAIL SMTP) ===
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password

# === EMAIL CONFIGURATION ===
TO_EMAIL=revorahmat@gmail.com
CONTACT_RATE_LIMIT=3  # Max emails per IP per hour

# === SECURITY ===
EMAIL_ENCRYPTION_KEY=your-32-char-encryption-key-here
```

## Setup Instructions

### 1. Resend.com Setup (Primary - Recommended untuk 2025)

1. **Daftar di Resend.com**:
   - Kunjungi https://resend.com
   - Daftar dengan email Anda
   - Free tier: 3,000 emails/month

2. **Dapatkan API Key**:
   - Masuk ke dashboard Resend
   - Klik "API Keys" di sidebar
   - Klik "Create API Key"
   - Copy API key dan masukkan ke `RESEND_API_KEY`

3. **Verify Domain (Optional tapi Recommended)**:
   - Tambahkan domain Anda di Resend dashboard
   - Ikuti instruksi DNS setup
   - Gunakan domain email Anda sebagai `FROM_EMAIL`

### 2. Gmail SMTP Setup (Fallback)

1. **Enable 2-Factor Authentication** di Gmail
2. **Generate App Password**:
   - Google Account Settings → Security
   - 2-Step Verification → App passwords
   - Select app: "Mail", device: "Other"
   - Copy generated password ke `GMAIL_APP_PASSWORD`

### 3. Environment File Example

Buat file `.env.local`:

```bash
# Resend (Primary)
RESEND_API_KEY=re_abc123xyz789
FROM_EMAIL=contact@yourdomain.com

# Gmail (Fallback)
GMAIL_USER=yourname@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop

# Configuration
TO_EMAIL=revorahmat@gmail.com
CONTACT_RATE_LIMIT=3
EMAIL_ENCRYPTION_KEY=your-super-secret-32-character-key
```

## Features Included

✅ **Modern Email API** - Resend.com primary service
✅ **Fallback System** - Gmail SMTP sebagai backup
✅ **Professional Templates** - HTML email templates
✅ **Auto-Reply** - Confirmation email ke sender
✅ **Spam Protection** - Rate limiting dan validation
✅ **Real-time Notifications** - Toast notifications
✅ **Form Validation** - Zod schema validation
✅ **Mobile Optimized** - Responsive email templates
✅ **Analytics Ready** - Email tracking dan logging

## Security Features

🔒 **Rate Limiting** - Max 3 emails per IP per hour
🔒 **Input Sanitization** - XSS dan injection protection
🔒 **Validation** - Strict email dan field validation
🔒 **Error Handling** - Graceful fallbacks
🔒 **Environment Security** - Encrypted sensitive data

## Testing

Setelah setup:
1. Isi form kontak di website
2. Check email masuk di `TO_EMAIL`
3. Check sender mendapat confirmation email
4. Verify fallback system works jika Resend down

---

**Next Steps**: Implementasi API routes dan UI components akan dilakukan setelah environment variables di-setup.
