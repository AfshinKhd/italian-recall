# Italian Recall V2

A small static web app for Italian active recall and spaced repetition.

## What changed in V2

- No manual progress import/export.
- Automatic OneDrive synchronization.
- `words.json` and `progress.json` are automatically created in each user's own OneDrive App Folder.
- Separate review history for each verb tense.
- Present, passato prossimo, future, or mixed-tenses study.
- General vocabulary entries: nouns, adjectives, adverbs, expressions, etc.
- Local cache remains available if OneDrive is temporarily unavailable.
- Responsive layout for desktop and phone.

## Privacy model

The GitHub Pages website itself is public static HTML/CSS/JavaScript.

Each person signs in with THEIR OWN Microsoft account. Microsoft Graph then gives the app access only to that user's application folder when using `Files.ReadWrite.AppFolder`.

On first access Microsoft creates an app folder automatically under:

    OneDrive / Apps / <your Microsoft Entra application name>/

The app then creates:

    words.json
    progress.json

A different user gets a different folder in their own OneDrive. Their words and progress are not stored in the GitHub repository.

## One-time Microsoft setup

You only do this once for the web app.

1. Open Microsoft Entra admin center.
2. Go to **App registrations** -> **New registration**.
3. Name it, for example: `Italian Recall`.
4. Supported account types:
   - choose **Accounts in any organizational directory and personal Microsoft accounts** if you want other people to use their own work/school or personal Microsoft accounts.
5. Register the app.
6. Copy the **Application (client) ID**.
7. Open **Authentication** -> **Add a platform** -> **Single-page application**.
8. Add the exact GitHub Pages URL, for example:

       https://YOUR-USERNAME.github.io/italian-recall/

9. Open **API permissions** -> **Add a permission** -> **Microsoft Graph** -> **Delegated permissions**.
10. Add:

       Files.ReadWrite.AppFolder

11. Open `config.js` and replace:

       PASTE_MICROSOFT_ENTRA_CLIENT_ID_HERE

   with the Application (client) ID.

Do NOT create or paste a client secret into this project. This is a browser SPA and uses OAuth Authorization Code + PKCE.

## GitHub Pages

Put these files in the repository root:

    index.html
    app.js
    config.js
    starter-words.js
    README.md

Then enable GitHub Pages for that repository.

Open the published HTTPS page and click the Settings button -> **Connect OneDrive**.

## What happens on first sign-in

The app automatically:

1. Opens/creates its OneDrive App Folder.
2. Checks for `words.json`.
3. If `words.json` does not exist, copies the starter deck into it.
4. Checks for `progress.json`.
5. Creates it if needed.
6. Merges the newest local/OneDrive review state.
7. Continues automatic sync after reviews.

## Editing words

After the first sign-in, edit the PRIVATE `words.json` in your OneDrive App Folder, not `starter-words.js`.

If OneDrive is synchronized on Windows, the folder normally appears under your local OneDrive `Apps` directory. You can edit `words.json` in VS Code or any text editor.

In the app, Settings -> **Reload words** immediately reloads the file. The app also reloads it when you return to the page after it has been in the background.

### Verb format

```json
{
  "id": "verb-vedere",
  "kind": "verb",
  "english": "see",
  "italian": "vedere",
  "tenses": {
    "presente": {
      "label": "Present",
      "forms": {
        "io": "vedo",
        "tu": "vedi",
        "luiLei": "vede",
        "noi": "vediamo",
        "voi": "vedete",
        "loro": "vedono"
      },
      "example": "Vedo il mare dalla finestra."
    }
  }
}
```

You can add `passato_prossimo`, `futuro_semplice`, or future tense categories later without redesigning the app.

### General vocabulary format

```json
{
  "id": "vocab-sedia",
  "kind": "vocab",
  "category": "noun",
  "english": "chair",
  "italian": "sedia",
  "article": "la",
  "gender": "feminine",
  "plural": "sedie",
  "example": "La sedia è vicino alla finestra."
}
```

For an adjective, adverb, phrase, or expression, just omit noun-only fields such as `article`, `gender`, and `plural`.

## Spaced repetition

Initial intervals:

- Again: 10 minutes, and the card is placed back into the current session.
- Hard: about 1 day.
- Good: about 3 days.
- Easy: about 7 days.

Successful intervals expand automatically on later reviews.

Each verb tense has separate progress. For example:

    vedere :: presente
    vedere :: passato_prossimo
    vedere :: futuro_semplice

are treated as independent review units.

## Offline / sync behavior

Every review is first saved instantly in browser storage, then synchronized to OneDrive shortly afterward.

If the network is unavailable, studying still works with the local cached deck and progress. When the browser is online again, the app attempts to synchronize automatically.

If two devices changed different cards, V2 merges progress card-by-card using the newest update timestamp.
