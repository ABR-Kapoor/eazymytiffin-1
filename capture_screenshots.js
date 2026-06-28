const { chromium } = require('@playwright/test');
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

// Define all routes and their respective screenshot numbers
const BASE_URL = 'http://localhost:3000';
const OUT_DIR = path.join(__dirname, 'screenshot');

async function captureScreenshots() {
  // Ensure screenshot directory exists
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR);
  }

  console.log("Launching browser...");
  // Launch in non-headless mode so you can log in manually
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const takeShot = async (num, urlPath, desc) => {
    console.log(`Navigating to: ${desc} (${urlPath})`);
    await page.goto(`${BASE_URL}${urlPath}`, { waitUntil: 'networkidle' });
    // Small delay for animations/images to load
    await page.waitForTimeout(1500); 
    const filePath = path.join(OUT_DIR, `${num}.png`);
    await page.screenshot({ path: filePath, fullPage: true });
    console.log(`Saved screenshot ${num}.png`);
  };

  try {
    // 1. Landing Page
    await takeShot(1, '/', 'Landing Page');

    // 2. Sign-In Page
    await takeShot(2, '/sign-in', 'Sign-In Page');

    // -- CUSTOMER LOGIN --
    console.log("\n=========================================");
    console.log("WAITING FOR CUSTOMER LOGIN");
    console.log("Please log in as a CUSTOMER in the browser window.");
    console.log("=========================================\n");
    await askQuestion("Press ENTER here after you have successfully logged in as a Customer...");

    // Customer Routes
    await takeShot(3, '/', 'Customer Home Dashboard (Assuming /)');
    await takeShot(4, '/food', 'Food Ordering Page');
    await takeShot(5, '/food/checkout', 'Checkout Page');
    await takeShot(6, '/subscriptions', 'Subscription Management Page');
    
    // Other accessible pages
    await takeShot(13, '/payments/phonepe-mock', 'PhonePe Mock Payment Page');
    await takeShot(14, '/payments/success', 'Payment Success Page');

    // -- SIGN OUT / SWITCH TO ADMIN --
    console.log("\n=========================================");
    console.log("WAITING FOR ADMIN LOGIN");
    console.log("Please sign out of the customer account and log in as an ADMIN.");
    console.log("=========================================\n");
    await askQuestion("Press ENTER here after you have successfully logged in as an Admin...");

    // Admin Routes
    await takeShot(7, '/admin', 'Admin Dashboard');
    await takeShot(8, '/admin/subscriptions', 'Admin Subscriptions Management');
    await takeShot(9, '/admin/orders', 'Admin Tiffin Orders');
    await takeShot(10, '/admin/users', 'Admin Users Management');
    await takeShot(11, '/admin/analytics', 'Admin Analytics Page');

    // -- SIGN OUT / SWITCH TO DELIVERY BOY --
    console.log("\n=========================================");
    console.log("WAITING FOR DELIVERY BOY LOGIN");
    console.log("Please sign out of the admin account and log in as a DELIVERY BOY.");
    console.log("=========================================\n");
    await askQuestion("Press ENTER here after you have successfully logged in as a Delivery Boy...");

    // Delivery Boy Route
    await takeShot(12, '/delivery', 'Delivery Boy Dashboard');

    console.log("\n✅ All screenshots captured successfully in the /screenshot/ folder!");
  } catch (err) {
    console.error("Error capturing screenshots:", err);
  } finally {
    await browser.close();
    rl.close();
  }
}

captureScreenshots();
