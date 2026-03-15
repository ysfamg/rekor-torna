import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { Resend } from "resend"

interface ContactEmailData {
  name: string
  email: string
  phone?: string
  serviceType: string
  message: string
}

async function sendEmails(data: ContactEmailData) {
  if (!process.env.RESEND_API_KEY) {
    console.log("RESEND_API_KEY not set, skipping email")
    return { success: true, skipped: true }
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const adminEmail = process.env.ADMIN_EMAIL || "admin@rekortorna.com"
  const siteName = "Rekor Torna Hidrolik"

  try {
    // Admin'e mail gönder
    await resend.emails.send({
      from: `${siteName} <noreply@${process.env.RESEND_DOMAIN || "rekortorna.com"}>`,
      to: adminEmail,
      subject: `Yeni İletişim Formu Mesajı - ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f97316, #ea580c); padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">${siteName}</h1>
            <p style="color: #fed7aa; margin: 5px 0 0 0;">Yeni İletişim Mesajı</p>
          </div>
          <div style="background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 120px;">Ad Soyad:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">E-posta:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                  <a href="mailto:${data.email}" style="color: #f97316;">${data.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Telefon:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                  ${data.phone ? `<a href="tel:${data.phone}" style="color: #f97316;">${data.phone}</a>` : '-'}
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Hizmet:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${data.serviceType}</td>
              </tr>
            </table>
            <div style="margin-top: 20px;">
              <p style="color: #64748b; margin-bottom: 5px;">Mesaj:</p>
              <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                ${data.message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
          <div style="background: #1e293b; padding: 15px; border-radius: 0 0 8px 8px; text-align: center;">
            <p style="color: #94a3b8; margin: 0; font-size: 12px;">
              Bu mail ${siteName} iletişim formu üzerinden gönderilmiştir.
            </p>
          </div>
        </div>
      `,
    })

    // Kullanıcıya onay maili gönder
    await resend.emails.send({
      from: `${siteName} <noreply@${process.env.RESEND_DOMAIN || "rekortorna.com"}>`,
      to: data.email,
      subject: `Mesajınız Alındı - ${siteName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f97316, #ea580c); padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">${siteName}</h1>
            <p style="color: #fed7aa; margin: 5px 0 0 0;">Mesajınız Alındı</p>
          </div>
          <div style="background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; border-top: none;">
            <p style="color: #1e293b; font-size: 16px;">Sayın <strong>${data.name}</strong>,</p>
            <p style="color: #475569;">
              İletişim formu üzerinden gönderdiğiniz mesaj başarıyla tarafımıza ulaşmıştır.
              En kısa sürede sizinle iletişime geçeceğiz.
            </p>
            <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 20px 0;">
              <p style="margin: 0; color: #64748b; font-size: 14px;">Gönderdiğiniz mesaj:</p>
              <p style="margin: 10px 0 0 0; color: #1e293b; font-style: italic;">
                "${data.message.substring(0, 200)}${data.message.length > 200 ? '...' : ''}"
              </p>
            </div>
            <p style="color: #475569;">
              Bize ulaşmak için:
              <br>📞 Telefon: ${process.env.SITE_PHONE || '+90 532 123 45 67'}
              <br>📧 E-posta: ${process.env.SITE_EMAIL || 'info@rekortorna.com'}
            </p>
          </div>
          <div style="background: #1e293b; padding: 15px; border-radius: 0 0 8px 8px; text-align: center;">
            <p style="color: #94a3b8; margin: 0; font-size: 12px;">
              © ${new Date().getFullYear()} ${siteName}. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error("Email sending error:", error)
    return { success: false, error }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, serviceType, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Lütfen zorunlu alanları doldurun." },
        { status: 400 }
      )
    }

    // Veritabanına kaydet
    await db.contact.create({
      data: {
        name,
        email,
        phone: phone || null,
        serviceType,
        message,
      },
    })

    // Mail gönder (API key varsa)
    await sendEmails({ name, email, phone, serviceType, message })

    return NextResponse.json({
      success: true,
      message: "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.",
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { success: false, error: "Mesajınız gönderilirken bir hata oluştu." },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const contacts = await db.contact.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    })
    return NextResponse.json({ success: true, contacts })
  } catch (error) {
    console.error("Get contacts error:", error)
    return NextResponse.json(
      { success: false, error: "Mesajlar yüklenemedi." },
      { status: 500 }
    )
  }
}
