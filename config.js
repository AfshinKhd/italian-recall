// Italian Recall V2 — Microsoft / OneDrive configuration
// 1) Register a Single-page application (SPA) in Microsoft Entra.
// 2) Add the delegated Microsoft Graph permission: Files.ReadWrite.AppFolder
// 3) Paste the Application (client) ID below.
// 4) Register your exact GitHub Pages URL as the SPA redirect URI.
//
// IMPORTANT: Do NOT put a client secret here. Browser SPAs must not contain secrets.

window.ITALIAN_RECALL_CONFIG = {
  clientId: "PASTE_MICROSOFT_ENTRA_CLIENT_ID_HERE",

  // "common" allows work/school Microsoft accounts and personal Microsoft accounts,
  // when your Entra app registration is configured for both.
  authorityTenant: "common",


  redirectUri: "https://afshinkhd.github.io/italian-recall/",

  scopes: [
    "openid",
    "profile",
    "offline_access",
    "https://graph.microsoft.com/Files.ReadWrite.AppFolder"
  ]
};
