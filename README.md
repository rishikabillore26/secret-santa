# 🎅 Office Secret Santa Web Application

A beautiful, simple, and secure Secret Santa web application designed for office teams, featuring a Christmas-themed UI with gentle animations, manual Secret Santa assignment by the administrator, and confidential gift exchanges.

---

## 🌟 Application Flow & Features

### 1. Always-Open Employee Registration
- Any employee can register at any time via the Registration page (`/register`).
- Required fields: **Full Name**, **Work Email**, **Password** (minimum 6 characters).
- Employees always receive the `EMPLOYEE` role. The client cannot send or choose a role.
- Registration is always open and never locked.

### 2. Administrator Flow & Manual Secret Santa Assignment
- **Admin Login**:
  - The single administrator account is automatically created on startup from environment variables or `application.properties` (`ADMIN_EMAIL` / `ADMIN_PASSWORD`), only if it does not already exist.
  - Admin logs in through the standard login page (`/login`).
  - There is no admin registration anywhere.
- **Admin Dashboard**:
  - Displays total registered employees (excluding the admin himself).
  - Displays statistics for wishlist participation: **Submitted** (at least 1 wish) vs **Pending**.
  - Displays a table of all employees with their wishlist status and assignment status.
  - Each unassigned employee row features a **"🎅 Secret Santa"** button.
- **Manual Assignment**:
  - Clicking **"Secret Santa"** opens a modal listing only eligible recipients:
    1. Excludes the Santa themselves (nobody is assigned to themselves).
    2. Excludes any employee who has already been chosen as a recipient by another Santa (each person receives a gift from at most one Santa).
  - The admin selects a recipient from the candidate list and confirms.
  - Once assigned, the Santa's row permanently updates to **"Assigned ✓"** and the button is disabled.
  - **Strict Privacy**: The admin UI never displays assignment pairs or wishlist contents. No API endpoint exists that lists assignment pairs.

### 3. Employee Dashboard & Wishlist
- **Upper-Left Navigation**: A clearly visible **"🎁 My Wishlist"** button is pinned to the upper-left of the navbar.
- **Dedicated Wishlist Page** (`/wishlist`):
  - Features an animated Santa greeting.
  - Wishes are presented as festive gift tags with hover lift effects.
  - Employees can add, edit, and delete up to 3 wishes (Product Name required; Link, Price, and Note optional).
  - The 3-wish ceiling is strictly enforced on the backend.
  - The "Add Wish" button automatically hides when 3 wishes exist (no text mentioning limits).
- **Recipient Reveal**:
  - If unassigned: Displays *"Your Secret Santa match isn't ready yet, check back soon!"*
  - If assigned: Displays the **"Reveal My Secret Santa Person 🎁"** button.
  - On click, plays an interactive animation (gift box shakes, lid pops open with confetti, recipient's name appears with golden glow, and their wishlist cards slide in).
  - Employees never see who their Santa is. The reveal button remains so employees can re-check their recipient's wishlist anytime.

### 4. Christmas Theme & Animations
- **Palette**: Christmas red (`#c2252b`), forest green (`#1a6f3b`), warm cream (`#faf7f2`), white, and gold accents (`#d97706`).
- **Typography**: Google Fonts (*Playfair Display*, *Mountains of Christmas*, and *Inter*).
- **Animations**: Soft background snowfall (45 flakes), twinkling top lights, gliding Santa sleigh banner on login/register, gift tag hover lifts, and reveal confetti.
- **Accessibility**: Respects `prefers-reduced-motion` by disabling transforms, floats, and falling snow for users who prefer reduced motion.

---

## 🛠️ Tech Stack & Requirements

- **Backend**: Java 17, Spring Boot 3.3.4, Spring Security, Spring Data JPA, Jakarta Validation, JJWT 0.12.5.
- **Frontend**: React 18, Vite, React Router 6, Plain CSS with Keyframe Animations.
- **Database**: MySQL 8.0+ running on `localhost:3306`.

---

## ⚙️ Environment Configuration

Configuration in `backend/src/main/resources/application.properties` (or via environment variables):

| Variable | Default Value | Description |
|---|---|---|
| `SERVER_PORT` | `8085` | Backend port |
| `DB_URL` | `jdbc:mysql://localhost:3306/secretsanta_db?...` | MySQL connection string |
| `DB_USERNAME` | `root` | Database username |
| `DB_PASSWORD` | `Root@2025` | Database password |
| `ADMIN_EMAIL` | `admin@secretsanta.local` | Initial Admin Email |
| `ADMIN_PASSWORD` | `Admin@2025` | Initial Admin Password |
| `ADMIN_NAME` | `Office Administrator` | Admin Name |
| `JWT_SECRET` | `404E635266556A...` | 256-bit secret key for HMAC-SHA256 |

> **Setting Admin Credentials**:
> You can change the initial admin credentials by exporting `ADMIN_EMAIL` and `ADMIN_PASSWORD` in your terminal prior to running the application, or editing them in `backend/src/main/resources/application.properties`.

---

## 🚀 Running the Application

### 1. Database Setup
Execute the clean schema script in MySQL:
```powershell
Get-Content database/schema.sql -Raw | mysql -u root -pRoot@2025
```

### 2. Start Backend (Port 8085)
```powershell
cd backend
mvn spring-boot:run
```
Or run the packaged JAR:
```powershell
java -jar backend/target/secretsanta-backend-1.0.0.jar
```

### 3. Start Frontend (Port 5174)
```powershell
cd frontend
npm install
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) in your browser.

---

## 🧪 Testing

Run backend tests:
```powershell
cd backend
mvn test
```
All tests verify role authorization, duplicate email rejection, wish ownership and 3-wish ceilings, manual Santa assignment constraints (no self-assignments, single assignment per Santa, single recipient per employee), and data confidentiality.

---

## ☁️ Production Deployment Guide (Render + Enzonic MySQL)

### Step 1: Create GitHub Repository & Push Code
1. Log in to [GitHub](https://github.com) and create a new repository named `secret-santa` under the account `sudhirkr2003` (if it does not exist yet).
2. Remote is already configured as `https://github.com/sudhirkr2003/secret-santa.git`. Push your project to GitHub:
   ```bash
   git branch -M main
   git push -u origin main
   ```
   *(If prompted, enter your GitHub Personal Access Token or credentials).*

---

### Step 2: Create MySQL Database on Enzonic (https://databases.enzonic.com/)
1. Sign up or log in to [Enzonic Databases](https://databases.enzonic.com/).
2. Click **Create Database** / **New Service** → Choose **MySQL**.
3. Select your desired region/plan and create the database instance.
4. Once created, note your database connection details from the Enzonic dashboard:
   - **Host** (e.g., `mysql.enzonic.com` or your instance hostname)
   - **Port** (e.g., `3306` or your assigned port)
   - **Database Name** (e.g., `secretsanta_db` or the database created for you)
   - **Username** (e.g., `root` or generated user)
   - **Password**
5. Construct your JDBC URL:
   ```
   jdbc:mysql://<HOST>:<PORT>/<DATABASE_NAME>?useSSL=true&allowPublicKeyRetrieval=true&serverTimezone=UTC
   ```
   *(Note: If Enzonic's connection does not use SSL, set `useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC`).*
6. *(Optional)* You can import `database/schema.sql` via any MySQL client or Enzonic's management tool, or let Spring Boot automatically create the required tables on initial launch via `spring.jpa.hibernate.ddl-auto=update`.

---

### Step 3: Deploy Backend on Render (Web Service)
1. Go to [Render Dashboard](https://dashboard.render.com) → Click **New +** → **Web Service**.
2. Connect your GitHub repository `sudhirkr2003/secret-santa`.
3. Configure the service settings:
   - **Name**: `secret-santa-backend`
   - **Region**: Choose the closest region (e.g., Oregon or Frankfurt)
   - **Root Directory**: `backend`
   - **Environment**: **Docker** (or Java if building natively)
     - *If Docker*: Render will automatically detect `backend/Dockerfile`.
     - *If Java/Native*:
       - Build Command: `./mvnw clean package -DskipTests`
       - Start Command: `java -jar target/secretsanta-backend-1.0.0.jar`
4. Add the following **Environment Variables** in Render:
   | Key | Value |
   |---|---|
   | `PORT` | `8085` |
   | `DB_URL` | `jdbc:mysql://<ENZONIC_HOST>:<PORT>/<DATABASE_NAME>?useSSL=true&allowPublicKeyRetrieval=true&serverTimezone=UTC` |
   | `DB_USERNAME` | *(your Enzonic MySQL username)* |
   | `DB_PASSWORD` | *(your Enzonic MySQL password)* |
   | `JWT_SECRET` | `404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970` *(or generate 64 hex chars)* |
   | `ADMIN_EMAIL` | *(your secret admin email, set directly in Render environment)* |
   | `ADMIN_PASSWORD` | *(your secret admin password, set directly in Render environment)* |
   | `CORS_ALLOWED_ORIGINS` | `https://*.onrender.com` |
5. Click **Create Web Service**. Wait for the build to finish. Copy your backend URL (e.g. `https://secret-santa-backend.onrender.com`).

---

### Step 4: Deploy Frontend on Render (Static Site)
1. In [Render Dashboard](https://dashboard.render.com), click **New +** → **Static Site**.
2. Connect the same GitHub repository `sudhirkr2003/secret-santa`.
3. Configure:
   - **Name**: `secret-santa-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add **Environment Variable**:
   | Key | Value |
   |---|---|
   | `VITE_API_BASE_URL` | `https://<YOUR_BACKEND_SERVICE>.onrender.com/api` |
5. Click **Create Static Site**.
6. When deployed, open your frontend link (e.g. `https://secret-santa-frontend.onrender.com`). Client-side routing is handled automatically via `_redirects`.

---

### ⏱️ Keeping Render & Database Awake (Health Check & Keep-Alive)

1. **Automatic Database Keep-Alive Scheduler (Internal)**:
   - The backend includes an internal Spring scheduler (`DatabaseKeepAliveScheduler`) running automatically every **3 minutes** (`@Scheduled(fixedRate = 180000)`).
   - It performs a lightweight `SELECT 1` ping against your MySQL database, keeping HikariCP pool connections active and preventing cloud database hosts (like Enzonic) from terminating idle connections.

2. **Public Health Check Endpoint (External Ping)**:
   - Endpoints: `GET /api/health` and `GET /health` (no authentication required).
   - Checks both application status and real-time database response latency, returning JSON:
     ```json
     {
       "service": "secret-santa-backend",
       "timestamp": "2026-11-24T11:05:00Z",
       "status": "UP",
       "database": {
         "status": "UP",
         "latencyMs": 4,
         "message": "Database connection is active and responsive"
       }
     }
     ```
   - **Preventing Render Inactivity Sleep**: Render free-tier web services spin down after 15 minutes of inactivity. You can set up a free periodic ping service (such as [cron-job.org](https://cron-job.org) or [UptimeRobot](https://uptimerobot.com)) to ping `https://<YOUR_BACKEND_SERVICE>.onrender.com/api/health` every 5 to 10 minutes to keep your backend awake 24/7.

