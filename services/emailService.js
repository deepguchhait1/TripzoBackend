import "dotenv/config";
import nodemailer from "nodemailer";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
  family: 4,
});
transporter.verify().then(() => {
  console.log("Email service ready");
}).catch((err) => {
  console.warn("Email service not configured:", err.message);
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
};

// ───── Ticket Color Palette ─────
const TICKET = {
  gold:      "#E8A317",
  goldDark:  "#C8860A",
  goldPale:  "#FDF3D0",
  stub:      "#1A1A1A",
  stubMuted: "rgba(255,255,255,0.65)",
  border:    "#C8860A",
  serif:     "Georgia,'Times New Roman',Times,serif",
  mono:      "'Courier New',Courier,monospace",
  // Torn/perforated ticket edge: semicircle radius and strip thickness (evenly spaced cutouts)
  scallop:   8,
  scallopH:  10, // strip height for top/bottom edges (px)
  scallopW:  10, // strip width for left/right edges (px)
};

// ───── SVG Icon Library ─────
// Large header icons (22px, shown in ticket stub box)
const ICONS = {
  plane: `<svg width="22" height="22" viewBox="0 0 24 24" fill="${TICKET.gold}" xmlns="http://www.w3.org/2000/svg"><path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>`,
  lock:  `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="11" width="18" height="11" rx="2" fill="${TICKET.gold}"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="${TICKET.gold}" stroke-width="2"/></svg>`,
  mail:  `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="4" width="20" height="16" rx="2" fill="${TICKET.gold}"/><path d="M2 7l10 7 10-7" stroke="${TICKET.stub}" stroke-width="1.5"/></svg>`,
  bell:  `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill="${TICKET.gold}"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="${TICKET.gold}" stroke-width="2"/></svg>`,
  chat:  `<svg width="22" height="22" viewBox="0 0 24 24" fill="${TICKET.gold}" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  inbox: `<svg width="22" height="22" viewBox="0 0 24 24" fill="${TICKET.gold}" xmlns="http://www.w3.org/2000/svg"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" fill="${TICKET.gold}"/></svg>`,
  new:   `<svg width="22" height="22" viewBox="0 0 24 24" fill="${TICKET.gold}" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
  send:  `<svg width="22" height="22" viewBox="0 0 24 24" fill="${TICKET.gold}" xmlns="http://www.w3.org/2000/svg"><polygon points="22,2 15,22 11,13 2,9"/><line x1="22" y1="2" x2="11" y2="13" stroke="${TICKET.stub}" stroke-width="1"/></svg>`,

  // Small label icons (14px, used beside infoRow labels)
  pin:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="${TICKET.goldDark}" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-right:5px;flex-shrink:0;"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>`,
  cal:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${TICKET.goldDark}" stroke-width="2" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-right:5px;flex-shrink:0;"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  users: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${TICKET.goldDark}" stroke-width="2" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-right:5px;flex-shrink:0;"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  phone: `<svg width="14" height="14" viewBox="0 0 24 24" fill="${TICKET.goldDark}" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-right:5px;flex-shrink:0;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.61 5a2 2 0 0 1 2-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.4a16 16 0 0 0 6 6l1.06-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  pkg:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${TICKET.goldDark}" stroke-width="2" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-right:5px;flex-shrink:0;"><polyline points="21,8 21,21 3,21 3,8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>`,
  note:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${TICKET.goldDark}" stroke-width="2" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-right:5px;flex-shrink:0;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  user:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="${TICKET.goldDark}" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-right:5px;flex-shrink:0;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  tag:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${TICKET.goldDark}" stroke-width="2" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-right:5px;flex-shrink:0;"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
  map:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${TICKET.goldDark}" stroke-width="2" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-right:5px;flex-shrink:0;"><polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`,
  check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="3" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-right:8px;flex-shrink:0;"><polyline points="20,6 9,17 4,12"/></svg>`,
  clock: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${TICKET.goldDark}" stroke-width="2" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-right:5px;flex-shrink:0;"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>`,
  star:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="${TICKET.goldDark}" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-right:5px;flex-shrink:0;"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>`,
  msgSm: `<svg width="14" height="14" viewBox="0 0 24 24" fill="${TICKET.goldDark}" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-right:5px;flex-shrink:0;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,

  // Alert icons (16px, shown inside alertBox)
  alertInfo: `<svg width="16" height="16" viewBox="0 0 24 24" fill="${TICKET.goldDark}" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-right:8px;flex-shrink:0;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="8" stroke="white" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="12" x2="12" y2="16" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>`,
  alertWarn: `<svg width="16" height="16" viewBox="0 0 24 24" fill="#ea580c" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-right:8px;flex-shrink:0;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13" stroke="white" stroke-width="2"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="white" stroke-width="2"/></svg>`,
  alertOk:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="#16a34a" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-right:8px;flex-shrink:0;"><circle cx="12" cy="12" r="10"/><polyline points="9,12 11,14 15,10" stroke="white" stroke-width="2" fill="none"/></svg>`,
  alertGem:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="#9333ea" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-right:8px;flex-shrink:0;"><polygon points="6,3 18,3 22,9 12,22 2,9"/><polyline points="2,9 12,14 22,9" fill="none" stroke="white" stroke-width="1"/><line x1="12" y1="3" x2="12" y2="14" stroke="white" stroke-width="1"/></svg>`,
};

// ───── Star row helper ─────
const starRow = (color = TICKET.gold, count = 7) =>
  Array(count).fill(`<span style="color:${color};font-size:10px;margin:0 2px;">&#9733;</span>`).join("");

// ───── Serial strip ─────
const serialBlock = (text = "1234567") => `
<td style="width:18px;background:${TICKET.gold};padding:8px 4px;text-align:center;vertical-align:middle;border-left:1px dashed ${TICKET.goldDark};">
  <p style="margin:0;font-size:9px;font-weight:700;color:${TICKET.stub};letter-spacing:2px;writing-mode:vertical-rl;text-orientation:mixed;transform:rotate(180deg);font-family:${TICKET.mono};">${text}</p>
</td>`;

// ───── Base Template ─────
const baseTemplate = (content, preheader = "", headerIconSvg = ICONS.plane) => `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<title>${BRAND.name}</title>
<!--[if mso]><style>table,td{font-family:Arial,Helvetica,sans-serif!important;}</style><![endif]-->
<style>
  @media only screen and (max-width: 600px) {
    body { -webkit-text-size-adjust: 100% !important; text-size-adjust: 100% !important; }
    .email-main-table { max-width: 100% !important; width: 100% !important; }
    .email-scallop-edge { display: none !important; }
    .email-padding { padding: 12px 10px !important; }
    .email-content { padding: 18px 14px 20px !important; }
    .email-footer { padding: 14px 14px 18px !important; }
    .email-hide-mobile { display: none !important; }
    .email-body-td { padding: 0 !important; }
    .email-serial { display: none !important; }
    .email-stub { width: 36px !important; min-width: 36px !important; }
    .email-perf { width: 6px !important; min-width: 6px !important; }
    .email-header-cell { padding: 12px 14px 8px !important; }
    .email-ticket-title { font-size: 28px !important; letter-spacing: 2px !important; line-height: 1.1 !important; }
    .email-tagline { font-size: 9px !important; letter-spacing: 1px !important; margin-top: 6px !important; }
    .email-btn { padding: 14px 24px !important; font-size: 15px !important; border-radius: 10px !important; width: 100% !important; max-width: 280px !important; box-sizing: border-box !important; text-align: center !important; }
    .email-main-table td, .email-main-table p { line-height: 1.55 !important; }
    .email-main-table h2 { font-size: 20px !important; line-height: 1.3 !important; margin-bottom: 10px !important; font-weight: 800 !important; }
    .email-main-table h3 { font-size: 17px !important; line-height: 1.35 !important; margin-bottom: 8px !important; }
    .email-main-table .email-content p { font-size: 15px !important; line-height: 1.6 !important; }
    .email-main-table .email-content a { font-size: 15px !important; }
    .email-main-table .email-footer p { font-size: 12px !important; line-height: 1.5 !important; }
    .email-main-table .email-footer a { font-size: 13px !important; }
    .email-main-table .email-hide-mobile { display: none !important; }
    .email-main-table .email-icons { display: none !important; }
    .email-stub-brand { font-size: 14px !important; letter-spacing: 1px !important; }
    .email-stub-admit { font-size: 8px !important; letter-spacing: 1px !important; }
    .email-stub-icon-wrap { width: 36px !important; height: 36px !important; line-height: 36px !important; border-radius: 8px !important; }
    .email-footer-social { margin-bottom: 12px !important; }
    .email-footer-social a { width: 32px !important; height: 32px !important; line-height: 32px !important; font-size: 11px !important; }
    .email-info-row { padding: 10px 12px !important; font-size: 14px !important; }
    .email-info-row div:first-child { min-width: 90px !important; }
    .email-info-row div:last-child { font-size: 14px !important; word-break: break-word !important; }
    .email-section-title { font-size: 11px !important; margin: 14px 0 10px !important; padding-bottom: 6px !important; }
    .email-alert-box { padding: 12px 14px !important; font-size: 14px !important; line-height: 1.55 !important; margin: 14px 0 !important; }
    .email-step-item { padding: 10px 0 !important; font-size: 14px !important; }
    .email-status-badge { font-size: 12px !important; padding: 6px 12px !important; }
    .email-ticket-title-cell { padding: 8px 14px 6px !important; }
    .email-dashed-cell { padding-left: 14px !important; padding-right: 14px !important; }
    .email-bottom-stars { padding: 8px 14px 12px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
${preheader ? `<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preheader} &zwnj;&nbsp;&zwnj;&nbsp;</div>` : ""}

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;min-height:100vh;">
<tr><td align="center" class="email-padding" style="padding:40px 16px;">

<!-- Outer border: torn/perforated ticket edge (semicircular cutouts, white showing through) -->
<table role="presentation" cellpadding="0" cellspacing="0" align="center" class="email-main-table" style="max-width:696px;width:100%;">
  <tr>
    <td class="email-scallop-edge" style="height:${TICKET.scallopH}px;background:${TICKET.gold};background-image:radial-gradient(circle at 50% 100%, transparent ${TICKET.scallop}px, ${TICKET.gold} ${TICKET.scallop}px);background-size:${TICKET.scallop * 2}px ${TICKET.scallop * 2}px;background-repeat:repeat-x;line-height:0;font-size:0;" colspan="3"></td>
  </tr>
  <tr>
    <td class="email-scallop-edge" style="width:${TICKET.scallopW}px;background:${TICKET.stub};background-image:radial-gradient(circle at 100% 50%, transparent ${TICKET.scallop}px, ${TICKET.stub} ${TICKET.scallop}px);background-size:${TICKET.scallop * 2}px ${TICKET.scallop * 2}px;background-repeat:repeat-y;vertical-align:top;"></td>
    <td style="padding:0;vertical-align:top;">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.25),0 0 0 2px ${TICKET.goldDark};">
<tr>

  <!-- LEFT STUB -->
  <td class="email-stub" style="width:130px;background:${TICKET.stub};padding:0;vertical-align:top;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="height:100%;">
      <tr><td style="padding:18px 0 10px;text-align:center;">${starRow(TICKET.gold, 5)}</td></tr>
      <tr><td style="padding:20px 0;text-align:center;vertical-align:middle;">
        <p class="email-stub-brand" style="margin:0;font-size:22px;font-weight:900;color:${TICKET.gold};font-family:${TICKET.serif};letter-spacing:3px;writing-mode:vertical-rl;text-orientation:mixed;transform:rotate(180deg);text-transform:uppercase;">${BRAND.name}</p>
      </td></tr>
      <tr><td style="padding:10px 0;text-align:center;">
        <p class="email-stub-admit" style="margin:0;font-size:9px;font-weight:700;color:${TICKET.stubMuted};letter-spacing:3px;text-transform:uppercase;writing-mode:vertical-rl;text-orientation:mixed;transform:rotate(180deg);">ADMIT ONE</p>
      </td></tr>
      <tr><td style="padding:16px 0;text-align:center;">
        <div class="email-stub-icon-wrap" style="display:inline-block;width:44px;height:44px;background:${TICKET.gold};border-radius:10px;text-align:center;line-height:44px;">${headerIconSvg}</div>
      </td></tr>
      <tr><td style="padding:10px 0 18px;text-align:center;">${starRow(TICKET.gold, 5)}</td></tr>
    </table>
  </td>

  <!-- PERFORATION -->
  <td class="email-perf" style="width:14px;background:${TICKET.gold};padding:0;vertical-align:top;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="height:100%;">
      <tr><td style="padding:0;text-align:center;vertical-align:top;">
        <div style="border-left:2.5px dashed ${TICKET.goldDark};margin:0 auto;height:100%;min-height:500px;width:0;"></div>
      </td></tr>
    </table>
  </td>

  <!-- MAIN BODY -->
  <td style="background:${TICKET.gold};padding:0;vertical-align:top;" class="email-body-td">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">

      <tr><td style="padding:14px 28px 8px;text-align:center;border-bottom:2px solid ${TICKET.goldDark};" class="email-header email-header-cell">
        <p style="margin:0;">${starRow(TICKET.stub, 9)}</p>
      </td></tr>

      <tr><td class="email-ticket-title-cell" style="padding:10px 28px 4px;text-align:center;">
        <p class="email-ticket-title" style="margin:0;font-size:44px;font-weight:900;color:${TICKET.stub};letter-spacing:6px;font-family:${TICKET.serif};text-transform:uppercase;line-height:1;">TICKET</p>
        <p class="email-tagline" style="margin:4px 0 0;font-size:10px;font-weight:700;color:${TICKET.goldDark};letter-spacing:2px;text-transform:uppercase;">${BRAND.tagline}</p>
      </td></tr>

      <tr><td class="email-dashed-cell" style="padding:8px 28px;"><div style="border-top:1px dashed ${TICKET.goldDark};"></div></td></tr>

      <!-- CONTENT -->
      <tr><td style="padding:24px 28px 28px;background:${TICKET.goldPale};" class="email-content">
        ${content}
      </td></tr>

      <tr><td class="email-dashed-cell" style="padding:8px 28px;background:${TICKET.goldPale};"><div style="border-top:1px dashed ${TICKET.border};"></div></td></tr>

      <!-- FOOTER -->
      <tr><td style="padding:16px 28px 14px;background:${TICKET.goldPale};text-align:center;" class="email-footer">
        <div class="email-footer-social" style="margin-bottom:10px;">
          <a href="#" style="display:inline-block;width:28px;height:28px;background:${TICKET.gold};border-radius:6px;text-align:center;line-height:28px;font-size:10px;text-decoration:none;color:${TICKET.stub};font-weight:800;border:1px solid ${TICKET.goldDark};margin:0 3px;">f</a>
          <a href="#" style="display:inline-block;width:28px;height:28px;background:${TICKET.gold};border-radius:6px;text-align:center;line-height:28px;font-size:10px;text-decoration:none;color:${TICKET.stub};font-weight:800;border:1px solid ${TICKET.goldDark};margin:0 3px;">in</a>
          <a href="#" style="display:inline-block;width:28px;height:28px;background:${TICKET.gold};border-radius:6px;text-align:center;line-height:28px;font-size:10px;text-decoration:none;color:${TICKET.stub};font-weight:800;border:1px solid ${TICKET.goldDark};margin:0 3px;">ig</a>
          <a href="#" style="display:inline-block;width:28px;height:28px;background:${TICKET.gold};border-radius:6px;text-align:center;line-height:28px;font-size:10px;text-decoration:none;color:${TICKET.stub};font-weight:800;border:1px solid ${TICKET.goldDark};margin:0 3px;">tw</a>
        </div>
        <p style="margin:0 0 3px;font-size:11px;color:${TICKET.goldDark};">
          <a href="mailto:${BRAND.email}" style="color:${TICKET.stub};text-decoration:none;font-weight:700;">${BRAND.email}</a>
          &nbsp;&middot;&nbsp;
          <a href="tel:${BRAND.phone.replace(/\s/g,'')}" style="color:${TICKET.stub};text-decoration:none;font-weight:700;">${BRAND.phone}</a>
        </p>
        <p style="margin:0 0 3px;font-size:10px;color:${TICKET.goldDark};">${BRAND.address}</p>
        <p style="margin:0;font-size:10px;color:${TICKET.goldDark};">&copy; ${new Date().getFullYear()} ${BRAND.name}. All rights reserved.</p>
      </td></tr>

      <tr><td class="email-bottom-stars" style="padding:8px 28px 14px;text-align:center;background:${TICKET.gold};border-top:2px solid ${TICKET.goldDark};">
        <p style="margin:0;">${starRow(TICKET.stub, 9)}</p>
      </td></tr>

    </table>
  </td>

  <!-- RIGHT SERIAL -->
  <td class="email-serial">${serialBlock("1234567")}</td>

</tr>
</table>
    </td>
    <td class="email-scallop-edge" style="width:${TICKET.scallopW}px;background:${TICKET.gold};background-image:radial-gradient(circle at 0% 50%, transparent ${TICKET.scallop}px, ${TICKET.gold} ${TICKET.scallop}px);background-size:${TICKET.scallop * 2}px ${TICKET.scallop * 2}px;background-repeat:repeat-y;vertical-align:top;"></td>
  </tr>
  <tr>
    <td class="email-scallop-edge" style="height:${TICKET.scallopH}px;background:${TICKET.gold};background-image:radial-gradient(circle at 50% 0%, transparent ${TICKET.scallop}px, ${TICKET.gold} ${TICKET.scallop}px);background-size:${TICKET.scallop * 2}px ${TICKET.scallop * 2}px;background-repeat:repeat-x;line-height:0;font-size:0;" colspan="3"></td>
  </tr>
</table>

</td></tr>
</table>
</body>
</html>
`;

// ───── Helpers ─────
const statusConfig = {
  pending:   { bg: "#fffbeb", border: "#f59e0b", text: "#92400e", badge: "#fef3c7", label: "Pending",
    svgIcon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#92400e" stroke-width="2" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>` },
  confirmed: { bg: "#ecfdf5", border: "#10b981", text: "#065f46", badge: "#d1fae5", label: "Confirmed",
    svgIcon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#065f46" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><polyline points="9,12 11,14 15,10" stroke="white" stroke-width="2" fill="none"/></svg>` },
  cancelled: { bg: "#fef2f2", border: "#ef4444", text: "#991b1b", badge: "#fee2e2", label: "Cancelled",
    svgIcon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#991b1b" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15" stroke="white" stroke-width="2"/><line x1="9" y1="9" x2="15" y2="15" stroke="white" stroke-width="2"/></svg>` },
  completed: { bg: "#eff6ff", border: "#3b82f6", text: "#1e40af", badge: "#dbeafe", label: "Completed",
    svgIcon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#1e40af" xmlns="http://www.w3.org/2000/svg"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>` },
};

const statusBadge = (status) => {
  const s = statusConfig[status] || statusConfig.pending;
  return `<span class="email-status-badge" style="display:inline-flex;align-items:center;gap:5px;background:${s.badge};color:${s.text};font-size:11px;font-weight:700;padding:5px 12px;border-radius:20px;text-transform:uppercase;letter-spacing:0.8px;">${s.svgIcon} ${s.label}</span>`;
};

const formatDate = (d) => {
  if (!d) return "TBD";
  return new Date(d).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "long", year: "numeric" });
};

// Section title — pure div, no table
const sectionTitle = (title) => `
<div class="email-section-title" style="margin:16px 0 12px;padding-bottom:8px;border-bottom:2px solid ${TICKET.goldDark};">
  <p style="margin:0;font-size:10px;font-weight:800;color:${TICKET.goldDark};text-transform:uppercase;letter-spacing:2px;font-family:${TICKET.serif};">${title}</p>
</div>`;

// Info row — div flex row (no table)
const infoRow = (label, value, iconSvg = "") => `
<div class="email-info-row" style="display:flex;align-items:flex-start;padding:10px 14px;border-bottom:1px dashed ${TICKET.border};background:#fff8e1;">
  <div style="min-width:130px;font-size:12px;font-weight:600;color:#7a5200;display:flex;align-items:center;padding-right:8px;">${iconSvg}${label}</div>
  <div style="font-size:13px;font-weight:700;color:${TICKET.stub};flex:1;">${value}</div>
</div>`;

const ctaButton = (text, href, style = "primary") => {
  const styles = {
    primary: `background:${TICKET.stub};color:${TICKET.gold};border:2px solid ${TICKET.goldDark};`,
    outline: `background:transparent;color:${TICKET.stub};border:2px solid ${TICKET.stub};`,
    dark:    `background:${TICKET.goldDark};color:#fff;border:2px solid ${TICKET.goldDark};`,
  };
  return `<a href="${href}" style="display:inline-block;${styles[style] || styles.primary}font-weight:800;font-size:13px;padding:12px 32px;border-radius:8px;text-decoration:none;letter-spacing:1.5px;text-transform:uppercase;font-family:${TICKET.serif};">${text}</a>`;
};

// Alert box — div-based, no inner table
const alertBox = (message, type = "info") => {
  const types = {
    info:    { bg: "#fffde7", border: TICKET.goldDark, icon: ICONS.alertInfo, color: "#5c3d00" },
    success: { bg: "#f0fdf4", border: "#16a34a",       icon: ICONS.alertOk,   color: "#14532d" },
    warning: { bg: "#fff7ed", border: "#ea580c",       icon: ICONS.alertWarn, color: "#7c2d12" },
    tip:     { bg: "#fdf4ff", border: "#9333ea",       icon: ICONS.alertGem,  color: "#581c87" },
  };
  const t = types[type] || types.info;
  return `
<div class="email-alert-box" style="margin:16px 0;background:${t.bg};border-left:4px solid ${t.border};border-radius:0 10px 10px 0;padding:14px 18px;display:flex;align-items:flex-start;">
  ${t.icon}
  <p style="margin:0;font-size:13px;line-height:1.6;color:${t.color};">${message}</p>
</div>`;
};

// Step item — div-based
const stepItem = (step, i, total) => `
<div class="email-step-item" style="display:flex;align-items:center;padding:10px 0;${i < total - 1 ? `border-bottom:1px dashed ${TICKET.border};` : ""}">
  <div style="width:28px;height:28px;flex-shrink:0;background:${i === 0 ? TICKET.stub : TICKET.goldPale};border:2px solid ${i === 0 ? TICKET.goldDark : TICKET.border};border-radius:50%;text-align:center;line-height:24px;font-size:11px;font-weight:800;color:${i === 0 ? TICKET.gold : TICKET.goldDark};margin-right:12px;">${i + 1}</div>
  <p style="margin:0;font-size:13px;color:${i === 0 ? TICKET.stub : "#7a5200"};font-weight:${i === 0 ? "700" : "500"};">${step}</p>
</div>`;

// ───── Email Templates ─────

/**
 * Booking Confirmation Email
 */
const sendBookingConfirmation = async (booking) => {
  const tripName = booking.packageTitle || booking.destinationTitle || "Your Trip";
  const steps = ["Expert reviews your request", "Personalized itinerary is crafted", "We send you pricing &amp; details", "Confirm &amp; start your adventure!"];

  const html = baseTemplate(`
    <p style="margin:0 0 4px;font-size:14px;color:#7a5200;">Hello,</p>
    <h2 style="margin:0 0 8px;font-size:24px;font-weight:900;color:${TICKET.stub};font-family:${TICKET.serif};">Your Booking is Received!</h2>
    <p style="margin:0 0 22px;font-size:15px;line-height:1.7;color:#7a5200;">
      Thank you, <strong style="color:${TICKET.stub}">${booking.name}</strong>. We've received your booking request for <strong style="color:${TICKET.goldDark}">${tripName}</strong> and our travel experts are already on it.
    </p>

    <div style="background:${TICKET.stub};border:2px solid ${TICKET.goldDark};border-radius:12px;padding:18px 22px;margin-bottom:22px;display:flex;align-items:center;justify-content:space-between;">
      <div>
        <p style="margin:0 0 4px;font-size:10px;color:${TICKET.stubMuted};text-transform:uppercase;letter-spacing:2px;font-weight:700;">Booking Status</p>
        <p style="margin:0;font-size:20px;font-weight:800;color:${TICKET.gold};font-family:${TICKET.serif};">Under Review</p>
      </div>
      <div style="width:44px;height:44px;background:${TICKET.gold};border-radius:10px;display:flex;align-items:center;justify-content:center;">
        ${ICONS.clock}
      </div>
    </div>

    ${sectionTitle("Booking Details")}
    <div style="border-radius:10px;overflow:hidden;border:1px solid ${TICKET.border};margin-bottom:18px;">
      ${infoRow("Trip", tripName, ICONS.map)}
      ${booking.packageTitle ? infoRow("Package", booking.packageTitle, ICONS.pkg) : ""}
      ${booking.destinationTitle ? infoRow("Destination", booking.destinationTitle, ICONS.pin) : ""}
      ${infoRow("Travel Date", formatDate(booking.travelDate), ICONS.cal)}
      ${infoRow("Travelers", booking.travelers + (booking.travelers > 1 ? " persons" : " person"), ICONS.users)}
      ${infoRow("Contact", booking.phone, ICONS.phone)}
      ${booking.specialRequests ? infoRow("Special Requests", booking.specialRequests, ICONS.note) : ""}
    </div>

    ${alertBox("Our travel expert will contact you within <strong>24 hours</strong> with a personalized itinerary and payment details.", "info")}

    ${sectionTitle("What Happens Next")}
    <div style="margin-bottom:22px;">
      ${steps.map((s, i) => stepItem(s, i, steps.length)).join("")}
    </div>

    <div style="text-align:center;padding:8px 0;">
      ${ctaButton("Explore More Packages", BRAND.url + "/packages")}
    </div>
  `, `Hi ${booking.name}, your booking for ${tripName} has been received!`, ICONS.plane);

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
    pending:   `Your booking for <strong>${tripName}</strong> is under review. Our travel experts will reach out within 24 hours.`,
    confirmed: `Great news! Your booking for <strong>${tripName}</strong> has been <strong style="color:${TICKET.goldDark}">confirmed</strong>. Get ready for an amazing adventure!`,
    cancelled: `Your booking for <strong>${tripName}</strong> has been cancelled. If you have questions or wish to rebook, please reach out.`,
    completed: `We hope you had an incredible trip to <strong>${tripName}</strong>! Thank you for choosing ${BRAND.name}. We'd love to hear about your experience.`,
  };

  const ctaMap = {
    pending:   { text: "View Our Packages",     url: BRAND.url + "/packages" },
    confirmed: { text: "Prepare for Your Trip", url: BRAND.url },
    cancelled: { text: "Browse Packages",        url: BRAND.url + "/packages" },
    completed: { text: "Share Your Feedback",    url: BRAND.url + "/contact" },
  };
  const cta = ctaMap[status] || ctaMap.pending;

  const html = baseTemplate(`
    <p style="margin:0 0 4px;font-size:14px;color:#7a5200;">Hello <strong style="color:${TICKET.stub}">${booking.name}</strong>,</p>
    <h2 style="margin:0 0 8px;font-size:24px;font-weight:900;color:${TICKET.stub};font-family:${TICKET.serif};">Booking ${sc.label}</h2>
    <p style="margin:0 0 22px;font-size:15px;line-height:1.7;color:#7a5200;">${messages[status] || "Your booking status has been updated."}</p>

    <div style="background:${TICKET.stub};border:2px solid ${TICKET.goldDark};border-radius:12px;padding:18px 22px;margin-bottom:22px;display:flex;align-items:center;justify-content:space-between;">
      <div>
        <p style="margin:0 0 4px;font-size:10px;color:${TICKET.stubMuted};text-transform:uppercase;letter-spacing:2px;font-weight:700;">Current Status</p>
        <p style="margin:0;font-size:22px;font-weight:800;color:${TICKET.gold};font-family:${TICKET.serif};">${sc.label}</p>
      </div>
      <div style="width:44px;height:44px;background:${sc.badge};border-radius:10px;display:flex;align-items:center;justify-content:center;">
        ${sc.svgIcon}
      </div>
    </div>

    ${sectionTitle("Booking Summary")}
    <div style="border-radius:10px;overflow:hidden;border:1px solid ${TICKET.border};margin-bottom:22px;">
      ${infoRow("Trip", tripName, ICONS.map)}
      ${infoRow("Travel Date", formatDate(booking.travelDate), ICONS.cal)}
      ${infoRow("Travelers", booking.travelers + (booking.travelers > 1 ? " persons" : " person"), ICONS.users)}
      ${infoRow("Status", statusBadge(status))}
    </div>

    <div style="text-align:center;padding:8px 0;">
      ${ctaButton(cta.text, cta.url)}
    </div>
  `, `Your ${BRAND.name} booking for ${tripName} has been ${sc.label.toLowerCase()}`, ICONS.plane);

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
    <div style="background:#fef3c7;border:1px solid #f59e0b40;border-radius:12px;padding:18px 22px;margin-bottom:22px;display:flex;align-items:center;justify-content:space-between;">
      <div>
        <p style="margin:0 0 2px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#92400e;">Action Required</p>
        <h2 style="margin:0;font-size:20px;font-weight:900;color:${TICKET.stub};font-family:${TICKET.serif};">New Booking Received</h2>
      </div>
      ${ICONS.bell}
    </div>

    ${sectionTitle("Customer Information")}
    <div style="border-radius:10px;overflow:hidden;border:1px solid ${TICKET.border};margin-bottom:18px;">
      ${infoRow("Customer", booking.name, ICONS.user)}
      ${infoRow("Email", `<a href="mailto:${booking.email}" style="color:${TICKET.goldDark};text-decoration:none;font-weight:700;">${booking.email}</a>`, ICONS.mail)}
      ${infoRow("Phone", booking.phone, ICONS.phone)}
    </div>

    ${sectionTitle("Booking Details")}
    <div style="border-radius:10px;overflow:hidden;border:1px solid ${TICKET.border};margin-bottom:22px;">
      ${infoRow("Trip", tripName, ICONS.map)}
      ${infoRow("Travel Date", formatDate(booking.travelDate), ICONS.cal)}
      ${infoRow("Travelers", booking.travelers, ICONS.users)}
      ${booking.specialRequests ? infoRow("Special Requests", booking.specialRequests, ICONS.note) : ""}
    </div>

    <div style="text-align:center;padding:8px 0;">
      ${ctaButton("View in Admin Panel", BRAND.url + "/admin/bookings", "dark")}
    </div>
  `, `New booking from ${booking.name} for ${tripName}`, ICONS.bell);

  return transporter.sendMail({
    from: `"${BRAND.name} Admin" <${process.env.SMTP_EMAIL}>`,
    to: adminEmail,
    subject: `New Booking — ${booking.name} | ${tripName}`,
    html,
  });
};

/**
 * Admin Reply to Contact
 */
const sendContactReply = async (contact, subject, body) => {
  const html = baseTemplate(`
    <p style="margin:0 0 4px;font-size:14px;color:#7a5200;">Hello <strong style="color:${TICKET.stub}">${contact.name}</strong>,</p>
    <h2 style="margin:0 0 18px;font-size:22px;font-weight:900;color:${TICKET.stub};font-family:${TICKET.serif};">Reply from ${BRAND.name}</h2>

    <div style="background:#fff8e1;border-radius:12px;padding:20px 22px;border:1px solid ${TICKET.border};margin-bottom:18px;">
      <p style="margin:0;color:${TICKET.stub};font-size:14px;line-height:1.85;white-space:pre-wrap;">${body}</p>
    </div>

    <div style="border-left:3px solid ${TICKET.border};padding:14px 18px;background:#fffde7;border-radius:0 10px 10px 0;margin-bottom:18px;">
      <p style="margin:0 0 6px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;">Your Original Message</p>
      <p style="margin:0;color:#7a5200;font-size:13px;line-height:1.7;white-space:pre-wrap;">${contact.message}</p>
    </div>

    ${alertBox("Need more help? Reply to this email or visit our website to get in touch.", "tip")}

    <div style="text-align:center;padding:8px 0;">
      ${ctaButton("Contact Us Again", BRAND.url + "/contact")}
    </div>
  `, `Reply from ${BRAND.name} regarding your inquiry`, ICONS.chat);

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
    booking:     "Booking Inquiry",
    custom:      "Custom Package",
    support:     "General Support",
    feedback:    "Feedback",
    partnership: "Partnership",
  };
  const subjectLabel = subjectLabels[contact.subject] || contact.subject;
  const steps = ["Your message is received and logged", "Our team member reviews your inquiry", "We reply with a detailed response"];

  const html = baseTemplate(`
    <p style="margin:0 0 4px;font-size:14px;color:#7a5200;">Hello <strong style="color:${TICKET.stub}">${contact.name}</strong>,</p>
    <h2 style="margin:0 0 8px;font-size:24px;font-weight:900;color:${TICKET.stub};font-family:${TICKET.serif};">We Got Your Message!</h2>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#7a5200;">
      Thank you for reaching out to ${BRAND.name}. We've received your message and our team will get back to you shortly.
    </p>

    ${sectionTitle("Message Summary")}
    <div style="border-radius:10px;overflow:hidden;border:1px solid ${TICKET.border};margin-bottom:18px;">
      ${infoRow("Topic", subjectLabel, ICONS.tag)}
      ${infoRow("Message", contact.message, ICONS.msgSm)}
      ${contact.phone ? infoRow("Phone", contact.phone, ICONS.phone) : ""}
    </div>

    ${alertBox(`Our team typically responds within <strong>24 hours</strong>. For urgent matters, call us at <strong>${BRAND.phone}</strong>.`, "info")}

    ${sectionTitle("What Happens Next")}
    <div style="margin-bottom:22px;">
      ${steps.map((s, i) => stepItem(s, i, steps.length)).join("")}
    </div>

    <div style="text-align:center;padding:8px 0;">
      ${ctaButton("Visit Tripzo", BRAND.url)}
    </div>
  `, `Hi ${contact.name}, we received your message about ${subjectLabel}!`, ICONS.mail);

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
    booking:     "Booking Inquiry",
    custom:      "Custom Package",
    support:     "General Support",
    feedback:    "Feedback",
    partnership: "Partnership",
  };
  const subjectLabel = subjectLabels[contact.subject] || contact.subject;

  const html = baseTemplate(`
    <div style="background:#eff6ff;border:1px solid #3b82f640;border-radius:12px;padding:18px 22px;margin-bottom:22px;display:flex;align-items:center;justify-content:space-between;">
      <div>
        <p style="margin:0 0 2px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#1e40af;">New Message</p>
        <h2 style="margin:0;font-size:20px;font-weight:900;color:${TICKET.stub};font-family:${TICKET.serif};">Contact Form Submission</h2>
      </div>
      ${ICONS.inbox}
    </div>

    ${sectionTitle("Contact Details")}
    <div style="border-radius:10px;overflow:hidden;border:1px solid ${TICKET.border};margin-bottom:18px;">
      ${infoRow("Name", contact.name, ICONS.user)}
      ${infoRow("Email", `<a href="mailto:${contact.email}" style="color:${TICKET.goldDark};text-decoration:none;font-weight:700;">${contact.email}</a>`, ICONS.mail)}
      ${contact.phone ? infoRow("Phone", contact.phone, ICONS.phone) : ""}
      ${infoRow("Subject", subjectLabel, ICONS.tag)}
    </div>

    ${sectionTitle("Message")}
    <div style="background:#fff8e1;border-radius:10px;padding:18px 22px;border:1px solid ${TICKET.border};margin-bottom:20px;">
      <p style="margin:0;color:${TICKET.stub};font-size:14px;line-height:1.8;white-space:pre-wrap;">${contact.message}</p>
    </div>

    <div style="text-align:center;padding:8px 0;">
      ${ctaButton("Reply in Admin Panel", BRAND.url + "/admin/contacts", "dark")}
    </div>
  `, `New contact from ${contact.name} — ${subjectLabel}`, ICONS.inbox);

  return transporter.sendMail({
    from: `"${BRAND.name} Admin" <${process.env.SMTP_EMAIL}>`,
    to: adminEmail,
    subject: `New Contact — ${contact.name} | ${subjectLabel}`,
    html,
  });
};

/**
 * Admin — Reply to Booking Customer
 */
const sendBookingReply = async (booking, subject, body) => {
  const tripName = booking.packageTitle || booking.destinationTitle || "Your Trip";

  const html = baseTemplate(`
    <p style="margin:0 0 4px;font-size:14px;color:#7a5200;">Hello <strong style="color:${TICKET.stub}">${booking.name}</strong>,</p>
    <h2 style="margin:0 0 18px;font-size:22px;font-weight:900;color:${TICKET.stub};font-family:${TICKET.serif};">Message from ${BRAND.name}</h2>

    <div style="background:#fff8e1;border-radius:12px;padding:20px 22px;border:1px solid ${TICKET.border};margin-bottom:18px;">
      <p style="margin:0;color:${TICKET.stub};font-size:14px;line-height:1.85;white-space:pre-wrap;">${body}</p>
    </div>

    <div style="border-left:3px solid ${TICKET.goldDark};padding:14px 18px;background:#fff8e1;border-radius:0 10px 10px 0;margin-bottom:18px;">
      <p style="margin:0 0 6px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:${TICKET.goldDark};">Booking Reference</p>
      <p style="margin:0;color:${TICKET.stub};font-size:13px;line-height:1.7;display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
        <span style="display:inline-flex;align-items:center;">${ICONS.map} ${tripName}</span>
        &bull;
        <span style="display:inline-flex;align-items:center;">${ICONS.cal} ${formatDate(booking.travelDate)}</span>
        &bull;
        <span style="display:inline-flex;align-items:center;">${ICONS.users} ${booking.travelers} traveler${booking.travelers > 1 ? "s" : ""}</span>
      </p>
    </div>

    ${alertBox(`Need assistance? Reply to this email or call us at <strong>${BRAND.phone}</strong>. We're here to help!`, "tip")}

    <div style="text-align:center;padding:8px 0;">
      ${ctaButton("Visit Tripzo", BRAND.url)}
    </div>
  `, `Message from ${BRAND.name} regarding ${tripName}`, ICONS.mail);

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
      <h2 style="margin:0 0 8px;font-size:24px;font-weight:900;color:${TICKET.stub};font-family:${TICKET.serif};">Verify Your Email</h2>
      <p style="margin:0 0 26px;font-size:15px;line-height:1.7;color:#7a5200;">
        Use the verification code below to complete your action. This code expires in <strong>10 minutes</strong>.
      </p>

      <div style="display:inline-block;background:#fff8e1;border:2px dashed ${TICKET.goldDark};border-radius:14px;padding:22px 44px;margin-bottom:22px;text-align:center;">
        <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${TICKET.goldDark};">Your Code</p>
        <p style="margin:0;font-size:40px;font-weight:800;letter-spacing:12px;color:${TICKET.stub};font-family:${TICKET.mono};">${otp}</p>
      </div>

      ${alertBox("If you didn't request this code, you can safely ignore this email. Someone may have entered your email by mistake.", "warning")}
    </div>
  `, `Your ${BRAND.name} verification code is ${otp}`, ICONS.lock);

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
    <h2 style="margin:0 0 8px;font-size:24px;font-weight:900;color:${TICKET.stub};font-family:${TICKET.serif};">You're Subscribed!</h2>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#7a5200;">
      Welcome to the ${BRAND.name} newsletter! You'll be the first to know about our latest travel packages, exclusive deals, and travel inspiration.
    </p>

    ${alertBox("You'll receive email notifications whenever we launch exciting new travel packages. Stay tuned for amazing adventures!", "success")}

    <div style="text-align:center;padding:16px 0 8px;">
      ${ctaButton("Explore Packages", BRAND.url + "/packages")}
    </div>
  `, "Welcome to Tripzo Newsletter!", ICONS.inbox);

  return transporter.sendMail({
    from: `"${BRAND.name}" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: `Welcome to ${BRAND.name} Newsletter!`,
    html,
  });
};

/**
 * New Package Notification
 */
const sendNewPackageNotification = async (email, pkg) => {
  const priceFormatted = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(pkg.price);
  const originalFormatted = pkg.originalPrice ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(pkg.originalPrice) : null;
  const discount = pkg.originalPrice ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100) : 0;

  const html = baseTemplate(`
    <h2 style="margin:0 0 8px;font-size:24px;font-weight:900;color:${TICKET.stub};font-family:${TICKET.serif};">New Package Alert!</h2>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#7a5200;">
      We just launched a brand new travel package that we think you'll love!
    </p>

    <div style="border-radius:12px;overflow:hidden;border:1px solid ${TICKET.border};background:#fff8e1;margin-bottom:20px;">
      ${pkg.image ? `<img src="${pkg.image}" alt="${pkg.title}" style="width:100%;max-height:220px;object-fit:cover;display:block;"/>` : ""}
      <div style="padding:18px 20px;">
        <h3 style="margin:0 0 8px;font-size:20px;font-weight:800;color:${TICKET.stub};font-family:${TICKET.serif};">${pkg.title}</h3>
        ${pkg.destinations && pkg.destinations.length ? `<p style="margin:0 0 8px;font-size:13px;color:#7a5200;display:flex;align-items:center;">${ICONS.pin} ${pkg.destinations.join(", ")}</p>` : ""}
        <p style="margin:0 0 10px;font-size:12px;color:#7a5200;display:flex;align-items:center;gap:12px;">
          <span style="display:inline-flex;align-items:center;">${ICONS.clock} ${pkg.duration}</span>
          ${pkg.rating ? `<span style="display:inline-flex;align-items:center;">${ICONS.star} ${pkg.rating}/5</span>` : ""}
        </p>
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
          <span style="font-size:22px;font-weight:900;color:${TICKET.stub};font-family:${TICKET.serif};">${priceFormatted}</span>
          ${originalFormatted ? `<span style="font-size:14px;color:#7a5200;text-decoration:line-through;">${originalFormatted}</span>` : ""}
          ${discount > 0 ? `<span style="background:#dcfce7;color:#166534;font-size:11px;font-weight:700;padding:3px 10px;border-radius:12px;">${discount}% OFF</span>` : ""}
        </div>
      </div>
    </div>

    ${pkg.highlights && pkg.highlights.length ? `
    ${sectionTitle("Highlights")}
    <div style="margin-bottom:18px;">
      ${pkg.highlights.slice(0, 5).map((h) => `
      <div style="display:flex;align-items:center;padding:6px 0;font-size:14px;color:${TICKET.stub};">
        ${ICONS.check} ${h}
      </div>`).join("")}
    </div>` : ""}

    <div style="text-align:center;padding:8px 0;">
      ${ctaButton("View Package", BRAND.url + "/packages/" + pkg._id)}
    </div>
    <p style="margin:16px 0 0;font-size:12px;color:#7a5200;text-align:center;">
      You're receiving this because you subscribed to ${BRAND.name} newsletter.
    </p>
  `, `New package: ${pkg.title} — starting at ${priceFormatted}`, ICONS.new);

  return transporter.sendMail({
    from: `"${BRAND.name}" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: `New Package: ${pkg.title} — ${priceFormatted} | ${BRAND.name}`,
    html,
  });
};

/**
 * Newsletter / Bulk Email
 */
const sendNewsletterEmail = async (email, subject, body) => {
  const html = baseTemplate(`
    <h2 style="margin:0 0 8px;font-size:24px;font-weight:900;color:${TICKET.stub};font-family:${TICKET.serif};">${subject}</h2>
    <div style="margin:0 0 20px;font-size:15px;line-height:1.8;color:${TICKET.stub};white-space:pre-wrap;">${body}</div>

    <div style="text-align:center;padding:8px 0;">
      ${ctaButton("Visit Tripzo", BRAND.url)}
    </div>
    <p style="margin:16px 0 0;font-size:12px;color:#7a5200;text-align:center;">
      You're receiving this because you subscribed to ${BRAND.name} newsletter.
    </p>
  `, subject, ICONS.send);

  return transporter.sendMail({
    from: `"${BRAND.name}" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: `${subject} | ${BRAND.name}`,
    html,
  });
};

export {
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