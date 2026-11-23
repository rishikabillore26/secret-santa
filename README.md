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
