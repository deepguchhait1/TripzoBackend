const nodemailer = require("nodemailer");
const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  family: 4,   // force IPv4
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});
transporter.verify().then(() => {
  console.log("✉️  Email service ready");
}).catch((err) => {
  console.warn("⚠️  Email service not configured:", err.message);
});

// ───── Constants ─────
const BRAND = {
  name: "Tripzo",
  tagline: "Your Trusted Travel Partner",
  url: process.env.FRONTEND_URL || "http://localhost:5173",
  logo: `${process.env.FRONTEND_URL || "http://localhost:5173"}/logo.jpeg`,
  email: "tripzo.india.01@gmail.com",
  phone: "+91 123 456 7890",
  address: "123 Travel Tower, Connaught Place, New Delhi",
  color: {
    primary: "#059669",
    primaryDark: "#047857",
    accent: "#0d9488",
    dark: "#111827",
    text: "#374151",
    muted: "#6b7280",
    light: "#f9fafb",
    border: "#e5e7eb",
    white: "#ffffff",
  },
};

// ───── Professional Base Template ─────
const baseTemplate = (content, preheader = "", headerIcon = "✈️") => `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>${BRAND.name}</title>
<!--[if mso]>
<style>table,td{font-family:Arial,Helvetica,sans-serif!important;}</style>
<![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f0f2f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;">
${preheader ? `<div style="display:none;font-size:1px;color:#f0f2f5;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preheader} &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;</div>` : ""}

<!-- Outer wrapper -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f2f5;">
<tr><td align="center" style="padding:32px 16px;">

<!-- Top accent bar -->
<table role="presentation" width="640" cellpadding="0" cellspacing="0" style="max-width:640px;">
<tr><td style="height:4px;background:linear-gradient(90deg,${BRAND.color.primary},${BRAND.color.accent},${BRAND.color.primary});border-radius:4px 4px 0 0;"></td></tr>
</table>

<!-- Main card -->
<table role="presentation" width="640" cellpadding="0" cellspacing="0" style="max-width:640px;background:${BRAND.color.white};border-radius:0 0 16px 16px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05),0 10px 15px -3px rgba(0,0,0,0.05);">

  <!-- Header -->
  <tr>
    <td style="padding:36px 48px 28px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align:middle;">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td style="vertical-align:middle;padding-right:12px;">
                  <img src="${BRAND.logo}" alt="${BRAND.name}" width="44" height="44" style="width:44px;height:44px;border-radius:12px;object-fit:cover;border:2px solid #00BC7D;display:block;" />
                </td>
                <td style="vertical-align:middle;">
                  <h1 style="margin:0;font-size:24px;font-weight:800;color:${BRAND.color.dark};letter-spacing:-0.5px;">${BRAND.name}</h1>
                  <p style="margin:2px 0 0;font-size:12px;color:${BRAND.color.muted};letter-spacing:0.3px;">${BRAND.tagline}</p>
                </td>
              </tr>
            </table>
          </td>
          <td align="right" style="vertical-align:middle;">
            <a href="${BRAND.url}" style="display:inline-block;font-size:12px;font-weight:600;color:${BRAND.color.primary};text-decoration:none;padding:8px 16px;border:1.5px solid ${BRAND.color.primary};border-radius:8px;">Visit Website</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Divider -->
  <tr><td style="padding:0 48px;"><div style="height:1px;background:linear-gradient(90deg,transparent,${BRAND.color.border},transparent);"></div></td></tr>

  <!-- Body -->
  <tr>
    <td style="padding:32px 48px 40px;">
      ${content}
    </td>
  </tr>

  <!-- Footer divider -->
  <tr><td style="padding:0 48px;"><div style="height:1px;background:linear-gradient(90deg,transparent,${BRAND.color.border},transparent);"></div></td></tr>

  <!-- Footer -->
  <tr>
    <td style="padding:28px 48px 20px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">
            <!-- Social links -->
            <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
              <tr>
                <td style="padding:0 6px;"><a href="#" style="display:inline-block;width:36px;height:36px;background:${BRAND.color.light};border-radius:10px;text-align:center;line-height:36px;font-size:14px;text-decoration:none;color:${BRAND.color.muted};border:1px solid ${BRAND.color.border};">f</a></td>
                <td style="padding:0 6px;"><a href="#" style="display:inline-block;width:36px;height:36px;background:${BRAND.color.light};border-radius:10px;text-align:center;line-height:36px;font-size:14px;text-decoration:none;color:${BRAND.color.muted};border:1px solid ${BRAND.color.border};">in</a></td>
                <td style="padding:0 6px;"><a href="#" style="display:inline-block;width:36px;height:36px;background:${BRAND.color.light};border-radius:10px;text-align:center;line-height:36px;font-size:14px;text-decoration:none;color:${BRAND.color.muted};border:1px solid ${BRAND.color.border};">ig</a></td>
                <td style="padding:0 6px;"><a href="#" style="display:inline-block;width:36px;height:36px;background:${BRAND.color.light};border-radius:10px;text-align:center;line-height:36px;font-size:14px;text-decoration:none;color:${BRAND.color.muted};border:1px solid ${BRAND.color.border};">tw</a></td>
              </tr>
            </table>
            <!-- Contact row -->
            <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
              <tr>
                <td style="font-size:12px;color:${BRAND.color.muted};padding:0 12px;border-right:1px solid ${BRAND.color.border};">
                  <a href="mailto:${BRAND.email}" style="color:${BRAND.color.primary};text-decoration:none;font-weight:600;">${BRAND.email}</a>
                </td>
                <td style="font-size:12px;color:${BRAND.color.muted};padding:0 12px;">
                  <a href="tel:${BRAND.phone.replace(/\s/g, '')}" style="color:${BRAND.color.text};text-decoration:none;font-weight:600;">${BRAND.phone}</a>
                </td>
              </tr>
            </table>
            <p style="margin:0 0 6px;font-size:11px;color:#9ca3af;">${BRAND.address}</p>
            <p style="margin:0;font-size:11px;color:#d1d5db;">© ${new Date().getFullYear()} ${BRAND.name}. All rights reserved.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

</table>

</td></tr>
</table>
</body>
</html>
`;

// ───── Helpers ─────
const statusConfig = {
  pending:   { bg: "#fffbeb", border: "#f59e0b", text: "#92400e", badge: "#fef3c7", label: "Pending",   icon: "⏳" },
  confirmed: { bg: "#ecfdf5", border: "#10b981", text: "#065f46", badge: "#d1fae5", label: "Confirmed", icon: "✅" },
  cancelled: { bg: "#fef2f2", border: "#ef4444", text: "#991b1b", badge: "#fee2e2", label: "Cancelled", icon: "❌" },
  completed: { bg: "#eff6ff", border: "#3b82f6", text: "#1e40af", badge: "#dbeafe", label: "Completed", icon: "🏆" },
};

const statusBadge = (status) => {
  const s = statusConfig[status] || statusConfig.pending;
  return `<span style="display:inline-block;background:${s.badge};color:${s.text};font-size:11px;font-weight:700;padding:5px 14px;border-radius:20px;text-transform:uppercase;letter-spacing:0.8px;">${s.icon} ${s.label}</span>`;
};

const formatDate = (d) => {
  if (!d) return "TBD";
  return new Date(d).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "long", year: "numeric" });
};

const sectionTitle = (title) => `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
  <tr>
    <td style="font-size:11px;font-weight:700;color:${BRAND.color.primary};text-transform:uppercase;letter-spacing:1.2px;padding-bottom:8px;border-bottom:2px solid ${BRAND.color.primary}20;">${title}</td>
  </tr>
</table>`;

const infoRow = (label, value, icon = "") => `
<tr>
  <td style="padding:12px 16px;color:${BRAND.color.muted};font-size:13px;font-weight:500;width:140px;vertical-align:top;border-bottom:1px solid #f3f4f6;">${icon ? `<span style="margin-right:6px;">${icon}</span>` : ""}${label}</td>
  <td style="padding:12px 16px;color:${BRAND.color.dark};font-size:13px;font-weight:600;vertical-align:top;border-bottom:1px solid #f3f4f6;">${value}</td>
</tr>`;

const ctaButton = (text, href, style = "primary") => {
  const styles = {
    primary: `background:${BRAND.color.primary};color:${BRAND.color.white};`,
    outline: `background:transparent;color:${BRAND.color.primary};border:2px solid ${BRAND.color.primary};`,
    dark: `background:${BRAND.color.dark};color:${BRAND.color.white};`,
  };
  return `<a href="${href}" style="display:inline-block;${styles[style] || styles.primary}font-weight:700;font-size:14px;padding:14px 36px;border-radius:12px;text-decoration:none;letter-spacing:0.2px;transition:opacity 0.2s;">${text}</a>`;
};

const alertBox = (message, type = "info") => {
  const types = {
    info:    { bg: "#eff6ff", border: "#3b82f6", icon: "💡", color: "#1e40af" },
    success: { bg: "#ecfdf5", border: "#10b981", icon: "✅", color: "#065f46" },
    warning: { bg: "#fffbeb", border: "#f59e0b", icon: "⚠️", color: "#92400e" },
    tip:     { bg: "#faf5ff", border: "#8b5cf6", icon: "💎", color: "#5b21b6" },
  };
  const t = types[type] || types.info;
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
    <tr><td style="background:${t.bg};border-left:4px solid ${t.border};border-radius:0 12px 12px 0;padding:16px 20px;">
      <p style="margin:0;font-size:13px;line-height:1.6;color:${t.color};">${t.icon} ${message}</p>
    </td></tr>
  </table>`;
};

// ───── Email Templates ─────

/**
 * Booking Confirmation Email
 */
const sendBookingConfirmation = async (booking) => {
  const tripName = booking.packageTitle || booking.destinationTitle || "Your Trip";

  const html = baseTemplate(`
    <!-- Greeting -->
    <p style="margin:0 0 4px;font-size:14px;color:${BRAND.color.muted};">Hello,</p>
    <h2 style="margin:0 0 6px;font-size:26px;font-weight:800;color:${BRAND.color.dark};letter-spacing:-0.5px;">Your Booking is Received! 🎉</h2>
    <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:${BRAND.color.muted};">
      Thank you, <strong style="color:${BRAND.color.dark}">${booking.name}</strong>. We've received your booking request for <strong style="color:${BRAND.color.primary}">${tripName}</strong> and our travel experts are already on it.
    </p>

    <!-- Status highlight -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td style="background:linear-gradient(135deg,${BRAND.color.primary},${BRAND.color.accent});border-radius:16px;padding:24px 28px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:middle;">
                <p style="margin:0 0 4px;font-size:12px;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:1px;font-weight:600;">Booking Status</p>
                <p style="margin:0;font-size:20px;font-weight:800;color:#ffffff;">Under Review</p>
              </td>
              <td align="right" style="vertical-align:middle;">
                <div style="width:52px;height:52px;background:rgba(255,255,255,0.2);border-radius:14px;text-align:center;line-height:52px;font-size:26px;">⏳</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Booking details -->
    ${sectionTitle("Booking Details")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.color.light};border-radius:12px;overflow:hidden;margin-bottom:24px;">
      ${infoRow("Trip", tripName, "🗺️")}
      ${booking.packageTitle ? infoRow("Package", booking.packageTitle, "📦") : ""}
      ${booking.destinationTitle ? infoRow("Destination", booking.destinationTitle, "📍") : ""}
      ${infoRow("Travel Date", formatDate(booking.travelDate), "📅")}
      ${infoRow("Travelers", booking.travelers + (booking.travelers > 1 ? " persons" : " person"), "👥")}
      ${infoRow("Contact", booking.phone, "📞")}
      ${booking.specialRequests ? infoRow("Special Requests", booking.specialRequests, "📝") : ""}
    </table>

    ${alertBox("Our travel expert will contact you within <strong>24 hours</strong> with a personalized itinerary and payment details.", "info")}

    <!-- Steps -->
    ${sectionTitle("What Happens Next")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      ${["Expert reviews your request", "Personalized itinerary is crafted", "We send you pricing & details", "Confirm & start your adventure!"].map((step, i) => `
      <tr>
        <td style="padding:10px 0;vertical-align:top;width:40px;">
          <div style="width:28px;height:28px;background:${i === 0 ? BRAND.color.primary : BRAND.color.light};border:2px solid ${i === 0 ? BRAND.color.primary : BRAND.color.border};border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;color:${i === 0 ? BRAND.color.white : BRAND.color.muted};">${i + 1}</div>
        </td>
        <td style="padding:10px 0 10px 8px;font-size:14px;color:${i === 0 ? BRAND.color.dark : BRAND.color.muted};font-weight:${i === 0 ? "600" : "400"};${i < 3 ? `border-bottom:1px dashed ${BRAND.color.border};` : ""}">${step}</td>
      </tr>`).join("")}
    </table>

    <!-- CTA -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:8px 0;">
        ${ctaButton("Explore More Packages", BRAND.url + "/packages")}
      </td></tr>
    </table>
  `, `Hi ${booking.name}, your booking for ${tripName} has been received!`, "🎫");

  return transporter.sendMail({
    from: `"${BRAND.name}" <${process.env.SMTP_EMAIL}>`,
    to: booking.email,
    subject: `Booking Received — ${tripName} | ${BRAND.name}`,
    html,
  });
};

/**
 * Booking Status Update Email
 */
const sendBookingStatusUpdate = async (booking) => {
  const tripName = booking.packageTitle || booking.destinationTitle || "Your Trip";
  const status = booking.status;
  const sc = statusConfig[status] || statusConfig.pending;

  const messages = {
    pending: `Your booking for <strong>${tripName}</strong> is under review. Our travel experts will reach out within 24 hours.`,
    confirmed: `Great news! Your booking for <strong>${tripName}</strong> has been <strong style="color:${sc.text}">confirmed</strong>. Get ready for an amazing adventure!`,
    cancelled: `Your booking for <strong>${tripName}</strong> has been cancelled. If you have questions or wish to rebook, please reach out.`,
    completed: `We hope you had an incredible trip to <strong>${tripName}</strong>! Thank you for choosing ${BRAND.name}. We'd love to hear about your experience.`,
  };

  const ctaMap = {
    pending:   { text: "View Our Packages", url: BRAND.url + "/packages" },
    confirmed: { text: "Prepare for Your Trip", url: BRAND.url },
    cancelled: { text: "Browse Packages", url: BRAND.url + "/packages" },
    completed: { text: "Share Your Feedback", url: BRAND.url + "/contact" },
  };
  const cta = ctaMap[status] || ctaMap.pending;

  const html = baseTemplate(`
    <p style="margin:0 0 4px;font-size:14px;color:${BRAND.color.muted};">Hello <strong style="color:${BRAND.color.dark}">${booking.name}</strong>,</p>
    <h2 style="margin:0 0 6px;font-size:26px;font-weight:800;color:${BRAND.color.dark};letter-spacing:-0.5px;">Booking ${sc.label} ${sc.icon}</h2>
    <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:${BRAND.color.muted};">
      ${messages[status] || "Your booking status has been updated."}
    </p>

    <!-- Status card -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td style="background:${sc.bg};border:1px solid ${sc.border}30;border-radius:16px;padding:24px 28px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:middle;">
                <p style="margin:0 0 4px;font-size:11px;color:${sc.text};opacity:0.7;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Current Status</p>
                <p style="margin:0;font-size:22px;font-weight:800;color:${sc.text};">${sc.label}</p>
              </td>
              <td align="right" style="vertical-align:middle;">
                <div style="width:52px;height:52px;background:${sc.badge};border-radius:14px;text-align:center;line-height:52px;font-size:26px;">${sc.icon}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    ${sectionTitle("Booking Summary")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.color.light};border-radius:12px;overflow:hidden;margin-bottom:28px;">
      ${infoRow("Trip", tripName, "🗺️")}
      ${infoRow("Travel Date", formatDate(booking.travelDate), "📅")}
      ${infoRow("Travelers", booking.travelers + (booking.travelers > 1 ? " persons" : " person"), "👥")}
      ${infoRow("Status", statusBadge(status))}
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:8px 0;">
        ${ctaButton(cta.text, cta.url)}
      </td></tr>
    </table>
  `, `Your ${BRAND.name} booking for ${tripName} has been ${sc.label.toLowerCase()}`, sc.icon);

  return transporter.sendMail({
    from: `"${BRAND.name}" <${process.env.SMTP_EMAIL}>`,
    to: booking.email,
    subject: `Booking ${sc.label} — ${tripName} | ${BRAND.name}`,
    html,
  });
};

/**
 * Admin — New Booking Alert
 */
const sendAdminNewBookingAlert = async (booking) => {
  const tripName = booking.packageTitle || booking.destinationTitle || "Custom Trip";
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.SMTP_EMAIL;
  if (!adminEmail) return;

  const html = baseTemplate(`
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <td style="background:#fef3c7;border:1px solid #f59e0b30;border-radius:16px;padding:20px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:middle;">
                <p style="margin:0 0 2px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#92400e;">Action Required</p>
                <h2 style="margin:0;font-size:22px;font-weight:800;color:${BRAND.color.dark};">New Booking Received</h2>
              </td>
              <td align="right" style="vertical-align:middle;">
                <div style="font-size:32px;">🔔</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    ${sectionTitle("Customer Information")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.color.light};border-radius:12px;overflow:hidden;margin-bottom:20px;">
      ${infoRow("Customer", booking.name, "👤")}
      ${infoRow("Email", `<a href="mailto:${booking.email}" style="color:${BRAND.color.primary};text-decoration:none;font-weight:600;">${booking.email}</a>`, "✉️")}
      ${infoRow("Phone", booking.phone, "📞")}
    </table>

    ${sectionTitle("Booking Details")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.color.light};border-radius:12px;overflow:hidden;margin-bottom:24px;">
      ${infoRow("Trip", tripName, "🗺️")}
      ${infoRow("Travel Date", formatDate(booking.travelDate), "📅")}
      ${infoRow("Travelers", booking.travelers, "👥")}
      ${booking.specialRequests ? infoRow("Special Requests", booking.specialRequests, "📝") : ""}
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:8px 0;">
        ${ctaButton("View in Admin Panel", BRAND.url + "/admin/bookings", "dark")}
      </td></tr>
    </table>
  `, `New booking from ${booking.name} for ${tripName}`, "🔔");

  return transporter.sendMail({
    from: `"${BRAND.name} Admin" <${process.env.SMTP_EMAIL}>`,
    to: adminEmail,
    subject: `🔔 New Booking — ${booking.name} | ${tripName}`,
    html,
  });
};

/**
 * Admin Reply to Contact
 */
const sendContactReply = async (contact, subject, body) => {
  const html = baseTemplate(`
    <p style="margin:0 0 4px;font-size:14px;color:${BRAND.color.muted};">Hello <strong style="color:${BRAND.color.dark}">${contact.name}</strong>,</p>
    <h2 style="margin:0 0 24px;font-size:24px;font-weight:800;color:${BRAND.color.dark};letter-spacing:-0.3px;">Reply from ${BRAND.name}</h2>

    <!-- Reply body -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <td style="background:${BRAND.color.light};border-radius:14px;padding:24px 28px;border:1px solid ${BRAND.color.border};">
          <p style="margin:0;color:${BRAND.color.text};font-size:14px;line-height:1.85;white-space:pre-wrap;">${body}</p>
        </td>
      </tr>
    </table>

    <!-- Original message -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td style="border-left:3px solid ${BRAND.color.border};padding:16px 20px;background:#fafafa;border-radius:0 12px 12px 0;">
          <p style="margin:0 0 6px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;">Your Original Message</p>
          <p style="margin:0;color:${BRAND.color.muted};font-size:13px;line-height:1.7;white-space:pre-wrap;">${contact.message}</p>
        </td>
      </tr>
    </table>

    ${alertBox("Need more help? Reply to this email or visit our website to get in touch.", "tip")}

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:8px 0;">
        ${ctaButton("Contact Us Again", BRAND.url + "/contact")}
      </td></tr>
    </table>
  `, `Reply from ${BRAND.name} regarding your inquiry`, "💬");

  return transporter.sendMail({
    from: `"${BRAND.name}" <${process.env.SMTP_EMAIL}>`,
    to: contact.email,
    subject,
    html,
  });
};

/**
 * Contact Form — Acknowledgement Email
 */
const sendContactAcknowledgement = async (contact) => {
  const subjectLabels = {
    booking: "Booking Inquiry",
    custom: "Custom Package",
    support: "General Support",
    feedback: "Feedback",
    partnership: "Partnership",
  };
  const subjectLabel = subjectLabels[contact.subject] || contact.subject;

  const html = baseTemplate(`
    <p style="margin:0 0 4px;font-size:14px;color:${BRAND.color.muted};">Hello <strong style="color:${BRAND.color.dark}">${contact.name}</strong>,</p>
    <h2 style="margin:0 0 6px;font-size:26px;font-weight:800;color:${BRAND.color.dark};letter-spacing:-0.5px;">We Got Your Message! ✉️</h2>
    <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:${BRAND.color.muted};">
      Thank you for reaching out to ${BRAND.name}. We've received your message and our team will get back to you shortly.
    </p>

    ${sectionTitle("Message Summary")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.color.light};border-radius:12px;overflow:hidden;margin-bottom:24px;">
      ${infoRow("Topic", subjectLabel, "📋")}
      ${infoRow("Message", contact.message, "💬")}
      ${contact.phone ? infoRow("Phone", contact.phone, "📞") : ""}
    </table>

    ${alertBox(`Our team typically responds within <strong>24 hours</strong>. For urgent matters, call us at <strong>${BRAND.phone}</strong>.`, "info")}

    <!-- Timeline -->
    ${sectionTitle("What Happens Next")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      ${["Your message is received and logged", "Our team member reviews your inquiry", "We reply with a detailed response"].map((step, i) => `
      <tr>
        <td style="padding:10px 0;vertical-align:top;width:40px;">
          <div style="width:28px;height:28px;background:${i === 0 ? BRAND.color.primary : BRAND.color.light};border:2px solid ${i === 0 ? BRAND.color.primary : BRAND.color.border};border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;color:${i === 0 ? BRAND.color.white : BRAND.color.muted};">${i + 1}</div>
        </td>
        <td style="padding:10px 0 10px 8px;font-size:14px;color:${i === 0 ? BRAND.color.dark : BRAND.color.muted};font-weight:${i === 0 ? "600" : "400"};${i < 2 ? `border-bottom:1px dashed ${BRAND.color.border};` : ""}">${step}</td>
      </tr>`).join("")}
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:8px 0;">
        ${ctaButton("Visit Tripzo", BRAND.url)}
      </td></tr>
    </table>
  `, `Hi ${contact.name}, we received your message about ${subjectLabel}!`, "✉️");

  return transporter.sendMail({
    from: `"${BRAND.name}" <${process.env.SMTP_EMAIL}>`,
    to: contact.email,
    subject: `We Received Your Message — ${subjectLabel} | ${BRAND.name}`,
    html,
  });
};

/**
 * Admin — New Contact Alert
 */
const sendAdminContactAlert = async (contact) => {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.SMTP_EMAIL;
  if (!adminEmail) return;

  const subjectLabels = {
    booking: "Booking Inquiry",
    custom: "Custom Package",
    support: "General Support",
    feedback: "Feedback",
    partnership: "Partnership",
  };
  const subjectLabel = subjectLabels[contact.subject] || contact.subject;

  const html = baseTemplate(`
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <td style="background:#eff6ff;border:1px solid #3b82f630;border-radius:16px;padding:20px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:middle;">
                <p style="margin:0 0 2px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#1e40af;">New Message</p>
                <h2 style="margin:0;font-size:22px;font-weight:800;color:${BRAND.color.dark};">Contact Form Submission</h2>
              </td>
              <td align="right" style="vertical-align:middle;">
                <div style="font-size:32px;">📩</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    ${sectionTitle("Contact Details")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.color.light};border-radius:12px;overflow:hidden;margin-bottom:20px;">
      ${infoRow("Name", contact.name, "👤")}
      ${infoRow("Email", `<a href="mailto:${contact.email}" style="color:${BRAND.color.primary};text-decoration:none;font-weight:600;">${contact.email}</a>`, "✉️")}
      ${contact.phone ? infoRow("Phone", contact.phone, "📞") : ""}
      ${infoRow("Subject", subjectLabel, "📋")}
    </table>

    ${sectionTitle("Message")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <td style="background:${BRAND.color.light};border-radius:12px;padding:20px 24px;border:1px solid ${BRAND.color.border};">
          <p style="margin:0;color:${BRAND.color.text};font-size:14px;line-height:1.8;white-space:pre-wrap;">${contact.message}</p>
        </td>
      </tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:8px 0;">
          ${ctaButton("Reply in Admin Panel", BRAND.url + "/admin/contacts", "dark")}
        </td>
      </tr>
    </table>
  `, `New contact from ${contact.name} — ${subjectLabel}`, "📩");

  return transporter.sendMail({
    from: `"${BRAND.name} Admin" <${process.env.SMTP_EMAIL}>`,
    to: adminEmail,
    subject: `📩 New Contact — ${contact.name} | ${subjectLabel}`,
    html,
  });
};

/**
 * Admin \u2014 Reply/Email to Booking Customer
 */
const sendBookingReply = async (booking, subject, body) => {
  const tripName = booking.packageTitle || booking.destinationTitle || "Your Trip";

  const html = baseTemplate(`
    <p style="margin:0 0 4px;font-size:14px;color:${BRAND.color.muted};">Hello <strong style="color:${BRAND.color.dark}">${booking.name}</strong>,</p>
    <h2 style="margin:0 0 24px;font-size:24px;font-weight:800;color:${BRAND.color.dark};letter-spacing:-0.3px;">Message from ${BRAND.name}</h2>

    <!-- Message body -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <td style="background:${BRAND.color.light};border-radius:14px;padding:24px 28px;border:1px solid ${BRAND.color.border};">
          <p style="margin:0;color:${BRAND.color.text};font-size:14px;line-height:1.85;white-space:pre-wrap;">${body}</p>
        </td>
      </tr>
    </table>

    <!-- Booking reference -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td style="border-left:3px solid ${BRAND.color.primary};padding:16px 20px;background:#ecfdf5;border-radius:0 12px 12px 0;">
          <p style="margin:0 0 6px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:${BRAND.color.primary};">Booking Reference</p>
          <p style="margin:0;color:${BRAND.color.text};font-size:13px;line-height:1.7;">\ud83d\uddfa\ufe0f ${tripName} &bull; \ud83d\udcc5 ${formatDate(booking.travelDate)} &bull; \ud83d\udc65 ${booking.travelers} traveler${booking.travelers > 1 ? "s" : ""}</p>
        </td>
      </tr>
    </table>

    ${alertBox(`Need assistance? Reply to this email or call us at <strong>${BRAND.phone}</strong>. We're here to help!`, "tip")}

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:8px 0;">
        ${ctaButton("Visit Tripzo", BRAND.url)}
      </td></tr>
    </table>
  `, `Message from ${BRAND.name} regarding ${tripName}`, "\u2709\ufe0f");

  return transporter.sendMail({
    from: `"${BRAND.name}" <${process.env.SMTP_EMAIL}>`,
    to: booking.email,
    subject,
    html,
  });
};

/**
 * OTP Verification Email
 */
const sendOtpEmail = async (email, otp) => {
  const html = baseTemplate(`
    <div style="text-align:center;">
      <h2 style="margin:0 0 8px;font-size:26px;font-weight:800;color:${BRAND.color.dark};letter-spacing:-0.5px;">Verify Your Email</h2>
      <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:${BRAND.color.muted};">
        Use the verification code below to complete your action. This code expires in <strong>10 minutes</strong>.
      </p>

      <!-- OTP box -->
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 28px;">
        <tr>
          <td style="background:${BRAND.color.light};border:2px dashed ${BRAND.color.primary};border-radius:16px;padding:24px 48px;text-align:center;">
            <p style="margin:0 0 4px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:${BRAND.color.muted};">Your Code</p>
            <p style="margin:0;font-size:40px;font-weight:800;letter-spacing:12px;color:${BRAND.color.primary};font-family:'Courier New',monospace;">${otp}</p>
          </td>
        </tr>
      </table>

      ${alertBox("If you didn't request this code, you can safely ignore this email. Someone may have entered your email by mistake.", "warning")}
    </div>
  `, `Your ${BRAND.name} verification code is ${otp}`, "🔐");

  return transporter.sendMail({
    from: `"${BRAND.name}" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: `Your Verification Code — ${BRAND.name}`,
    html,
  });
};

/**
 * Subscription Confirmation Email
 */
const sendSubscriptionConfirmation = async (email) => {
  const html = baseTemplate(`
    <h2 style="margin:0 0 6px;font-size:26px;font-weight:800;color:${BRAND.color.dark};letter-spacing:-0.5px;">You're Subscribed! 🎉</h2>
    <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:${BRAND.color.muted};">
      Welcome to the ${BRAND.name} newsletter! You'll be the first to know about our latest travel packages, exclusive deals, and travel inspiration.
    </p>

    ${alertBox("You'll receive email notifications whenever we launch exciting new travel packages. Stay tuned for amazing adventures!", "success")}

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
      <tr><td align="center" style="padding:8px 0;">
        ${ctaButton("Explore Packages", BRAND.url + "/packages")}
      </td></tr>
    </table>
  `, "Welcome to Tripzo Newsletter!", "📬");

  return transporter.sendMail({
    from: `"${BRAND.name}" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: `Welcome to ${BRAND.name} Newsletter! 🌍`,
    html,
  });
};

/**
 * New Package Notification — sent to all active subscribers
 */
const sendNewPackageNotification = async (email, pkg) => {
  const priceFormatted = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(pkg.price);
  const originalFormatted = pkg.originalPrice ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(pkg.originalPrice) : null;
  const discount = pkg.originalPrice ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100) : 0;

  const html = baseTemplate(`
    <h2 style="margin:0 0 6px;font-size:26px;font-weight:800;color:${BRAND.color.dark};letter-spacing:-0.5px;">New Package Alert! 🗺️</h2>
    <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:${BRAND.color.muted};">
      We just launched a brand new travel package that we think you'll love!
    </p>

    <!-- Package Card -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;border-radius:16px;overflow:hidden;border:1px solid ${BRAND.color.border};">
      ${pkg.image ? `<tr><td><img src="${pkg.image}" alt="${pkg.title}" style="width:100%;max-height:250px;object-fit:cover;display:block;" /></td></tr>` : ""}
      <tr>
        <td style="padding:24px;">
          <h3 style="margin:0 0 8px;font-size:22px;font-weight:800;color:${BRAND.color.dark};">${pkg.title}</h3>
          ${pkg.destinations && pkg.destinations.length ? `<p style="margin:0 0 12px;font-size:13px;color:${BRAND.color.muted};">📍 ${pkg.destinations.join(", ")}</p>` : ""}
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
            <tr>
              <td style="padding-right:16px;"><span style="font-size:12px;color:${BRAND.color.muted};">⏱ ${pkg.duration}</span></td>
              ${pkg.rating ? `<td><span style="font-size:12px;color:${BRAND.color.muted};">⭐ ${pkg.rating}/5</span></td>` : ""}
            </tr>
          </table>
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr>
              <td style="font-size:24px;font-weight:800;color:${BRAND.color.primary};">${priceFormatted}</td>
              ${originalFormatted ? `<td style="padding-left:12px;font-size:14px;color:${BRAND.color.muted};text-decoration:line-through;">${originalFormatted}</td>` : ""}
              ${discount > 0 ? `<td style="padding-left:8px;"><span style="background:#dcfce7;color:#166534;font-size:11px;font-weight:700;padding:4px 10px;border-radius:12px;">${discount}% OFF</span></td>` : ""}
            </tr>
          </table>
        </td>
      </tr>
    </table>

    ${pkg.highlights && pkg.highlights.length ? `
    ${sectionTitle("Highlights")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${pkg.highlights.slice(0, 5).map((h) => `
      <tr><td style="padding:6px 0;font-size:14px;color:${BRAND.color.text};">✅ ${h}</td></tr>`).join("")}
    </table>` : ""}

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:8px 0;">
        ${ctaButton("View Package", BRAND.url + "/packages/" + pkg._id)}
      </td></tr>
    </table>

    <p style="margin:20px 0 0;font-size:12px;color:${BRAND.color.muted};text-align:center;">
      You're receiving this because you subscribed to ${BRAND.name} newsletter.
    </p>
  `, `New package: ${pkg.title} — starting at ${priceFormatted}`, "🆕");

  return transporter.sendMail({
    from: `"${BRAND.name}" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: `🆕 New Package: ${pkg.title} — ${priceFormatted} | ${BRAND.name}`,
    html,
  });
};

/**
 * Newsletter / Bulk Email — sent from admin to subscribers
 */
const sendNewsletterEmail = async (email, subject, body) => {
  const html = baseTemplate(`
    <h2 style="margin:0 0 6px;font-size:26px;font-weight:800;color:${BRAND.color.dark};letter-spacing:-0.5px;">${subject}</h2>
    <div style="margin:0 0 28px;font-size:15px;line-height:1.8;color:${BRAND.color.text};white-space:pre-wrap;">${body}</div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
      <tr><td align="center" style="padding:8px 0;">
        ${ctaButton("Visit Tripzo", BRAND.url)}
      </td></tr>
    </table>

    <p style="margin:20px 0 0;font-size:12px;color:${BRAND.color.muted};text-align:center;">
      You're receiving this because you subscribed to ${BRAND.name} newsletter.
    </p>
  `, subject, "📢");

  return transporter.sendMail({
    from: `"${BRAND.name}" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: `${subject} | ${BRAND.name}`,
    html,
  });
};

module.exports = {
  sendBookingConfirmation,
  sendBookingStatusUpdate,
  sendAdminNewBookingAlert,
  sendContactAcknowledgement,
  sendAdminContactAlert,
  sendContactReply,
  sendBookingReply,
  sendOtpEmail,
  sendSubscriptionConfirmation,
  sendNewPackageNotification,
  sendNewsletterEmail,
};
