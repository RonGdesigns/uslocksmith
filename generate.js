const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');
const subfolders = fs.readdirSync(imagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

let allImages = [];
for (const folder of subfolders) {
    const folderPath = path.join(imagesDir, folder);
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.webp'));
    for (const file of files) {
        allImages.push(`images/${folder}/${file}`);
    }
}

const indexHtml = fs.readFileSync('index.html', 'utf8');
const heroStartIndex = indexHtml.indexOf('<section class="hero"');
const footerStartIndex = indexHtml.indexOf('<footer>');

const headerPart = indexHtml.substring(0, heroStartIndex);
const footerPart = indexHtml.substring(footerStartIndex);

let galleryItemsHtml = '';
for (const imgPath of allImages) {
    const folderName = imgPath.split('/')[1].replace(/([A-Z])/g, ' $1').trim();
    galleryItemsHtml += `        <div class="gallery-item">\n          <img src="${imgPath}" alt="${folderName}" loading="lazy" decoding="async">\n        </div>\n`;
}

const ourWorkContent = `    <section class="hero" style="background: linear-gradient(to bottom, rgba(10,10,10,0.8), rgba(10,10,10,0.95)), url('images/Padlock%20Or%20Deadbolt/IMG_20260524_230305%20(18).webp') center/cover; padding: 100px 5%; min-height: 40vh; display: flex; flex-direction: column; justify-content: center;">
      <h1>Our Complete <span style="color: var(--primary);">Portfolio</span></h1>
      <p style="font-size: 1.2rem; color: #ccc; max-width: 600px; margin: 0 auto 30px;">See the real hardware, security systems, and mobile units we use to keep Metro Detroit safe.</p>
    </section>

    <section class="our-work-section" id="full-gallery" style="padding-top: 40px;">
      <div class="gallery-grid">
${galleryItemsHtml}      </div>
    </section>

    <section style="background: var(--secondary); padding-top: 80px;">
      <h2 class="section-title">What Our Customers Say</h2>
      <p class="section-subtitle">Real reviews from Metro Detroit</p>
      <div class="reviews-grid">
        <div class="review-card">
          <div class="stars">★★★★★</div>
          <p class="review-text">"Locked out of my car at 2am in downtown Detroit. They arrived in 15 minutes and got me back in without a scratch on the door. Highly recommend!"</p>
          <div>
            <span class="review-author">Marcus D.</span>
            <span class="review-location">📍 Detroit</span>
          </div>
        </div>
        <div class="review-card">
          <div class="stars">★★★★★</div>
          <p class="review-text">"Had my locks rekeyed after moving into a new home. Professional, fast, and fair pricing. The technician explained exactly what he was doing."</p>
          <div>
            <span class="review-author">Sarah M.</span>
            <span class="review-location">📍 Ferndale</span>
          </div>
        </div>
        <div class="review-card">
          <div class="stars">★★★★★</div>
          <p class="review-text">"Our business needed 4 maglocks installed on short notice to pass inspection. US Locksmith knocked it out in one afternoon. True pros."</p>
          <div>
            <span class="review-author">James T.</span>
            <span class="review-location">📍 Royal Oak</span>
          </div>
        </div>
      </div>
    </section>

    <section class="service-area-cluster" id="areas">
      <h2 class="section-title" style="color: var(--text-main); font-size: 2rem;">Serving the Metro Area</h2>
      <p style="color: var(--text-muted);">Our mobile units are strategically positioned for rapid response.</p>
      <div class="cluster-tags">
        <a href="locksmith-detroit.html" class="cluster-tag">Detroit</a>
        <a href="locksmith-royal-oak.html" class="cluster-tag">Royal Oak</a>
        <a href="locksmith-southfield.html" class="cluster-tag">Southfield</a>
        <a href="index.html" class="cluster-tag">Ferndale</a>
        <a href="tel:3132651111" class="cluster-tag">Oak Park</a>
        <a href="tel:3132651111" class="cluster-tag">Hazel Park</a>
        <a href="tel:3132651111" class="cluster-tag">Madison Heights</a>
        <a href="tel:3132651111" class="cluster-tag">Berkley</a>
        <a href="locksmith-detroit.html" class="cluster-tag">Midtown</a>
      </div>
    </section>

`;

const ourWorkHtml = headerPart + ourWorkContent + footerPart;
fs.writeFileSync('our-work.html', ourWorkHtml);

let mainCss = fs.readFileSync('styles.css', 'utf8');
if (!mainCss.includes('.our-work-section')) {
    const imagesCss = fs.readFileSync('images/styles.css', 'utf8');
    const cssStart = imagesCss.indexOf('/* =========================================\\n   OUR WORK GALLERY');
    const fallbackStart = imagesCss.indexOf('.our-work-section');
    const startIndex = cssStart !== -1 ? cssStart : (fallbackStart > 100 ? fallbackStart - 100 : fallbackStart);
    
    if (startIndex !== -1) {
        let cssEnd = imagesCss.indexOf('/* =========================================\\n   SEO SERVICES SECTION');
        if (cssEnd === -1) cssEnd = imagesCss.length;
        const galleryCss = imagesCss.substring(startIndex, cssEnd);
        fs.appendFileSync('styles.css', '\\n' + galleryCss);
    }
}

let mainJs = fs.readFileSync('script.js', 'utf8');
if (!mainJs.includes('lightbox')) {
    const imagesJsPath = 'images/script.js';
    if (fs.existsSync(imagesJsPath)) {
        const imagesJs = fs.readFileSync(imagesJsPath, 'utf8');
        fs.appendFileSync('script.js', '\\n' + imagesJs);
    }
}

const allFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));
for (const file of allFiles) {
    let html = fs.readFileSync(file, 'utf8');
    if (!html.includes('our-work.html')) {
        html = html.replace('<li><a href="blog.html">Blog</a></li>', '<li><a href="our-work.html">Our Work</a></li>\\n            <li><a href="blog.html">Blog</a></li>');
        fs.writeFileSync(file, html);
    }
}

console.log("SUCCESS");
