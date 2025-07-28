# Coffee Geenie ☕

A simple, responsive **brew calculator** web app to help you craft the perfect coffee or espresso based on your preferred brewing method and strength.

---

## Features

- Select your brew method: **Espresso**, **Pour Over**, or **Moka Pot**  
- Choose strength: **Light**, **Medium**, or **Strong**  
- Adjust dose (coffee grams) with a slider (auto-recommended dose updates based on method & strength)  
- View brewing parameters instantly:  
  - Water temperature suggestion  
  - Water amount (ml)  
  - Brew ratio (coffee to water)  
  - Brewing time (seconds)  
  - Grind size tip  
- Built-in **brew timer** with Start and Reset controls  
- User preferences saved locally in browser `localStorage`  
- PWA-ready with service worker registration for offline support  
- Responsive and minimal UI styled with [Tailwind CSS](https://tailwindcss.com)

---

## Demo

Open the `index.html` file in any modern web browser (Chrome, Firefox, Edge, Safari).

---

## Usage

1. Choose your brew method from the dropdown.  
2. Select desired strength level.  
3. Adjust the dose slider or use the recommended dose set automatically.  
4. Review the calculated brewing parameters under *Results*.  
5. Use the **Start Timer** button to begin the brew countdown and **Reset Timer** to clear it.  
6. Your selections are saved for future visits.

---

## Installation & Setup

No build step required! Just clone or download the repo and open `index.html`.

To enable offline functionality and install as a Progressive Web App (PWA):

- Serve the files over HTTPS or localhost.  
- The app automatically registers the service worker (`service-worker.js`) on load.

---

## File Structure

- `index.html` — main HTML page with layout and UI  
- `script.js` — JavaScript handling logic, calculations, timer, and localStorage  
- `manifest.json` — PWA manifest file (icon and metadata)  
- `service-worker.js` — service worker for caching and offline use  
- `icons/` — app icons used by the manifest

---

## Technologies Used

- HTML5 & CSS3  
- [Tailwind CSS](https://tailwindcss.com/) for styling  
- Vanilla JavaScript for interactivity and localStorage  
- Progressive Web App (PWA) support via Service Worker

---

## Customization

- Adjust brew profiles, dose recommendations, and tips inside `script.js` to fit your personal preferences or add new brewing methods.  
- Update version number in footer and manifest for deployment.

---

## Version

**1.0.1** — Initial release with espresso, pour over, and moka pot support.

---

## Author

Gabriel Rodriguez

---

## License

This project is open-source and free to use under the MIT License.
