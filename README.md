# 🏥 ENAYA - Pharmacy Management System
**A Robust Pharmacy Solution Architecture powered by AngularJS**

---

## 📌 Project Overview
**ENAYA** is an integrated pharmacy management platform designed to streamline the medicine procurement process. It provides a high-performance interface for patients to browse inventory and a secure administrative dashboard for order fulfillment and sales tracking.

## 🛠️ Tech Stack & Architecture
* **Frontend:** AngularJS  - Single Page Application (SPA).
* **Backend as a Service (BaaS):** **Supabase** (PostgreSQL, Real-time Database, and RESTful APIs).
* **UI/UX:** Bootstrap 5 with Custom Clinical Theming (Teal Palette).
* **Data Persistence:** Browser LocalStorage for synchronized cart states.

---

## 🏗️ Engineering Design Patterns
Instead of a standard file-based overview, this project emphasizes modular software engineering:

### 1. Reusable Directives
Custom Directives were implemented to ensure DRY (Don't Repeat Yourself) principles and component reusability:
* `<admin-sidebar>`: Encapsulated navigation logic for the administrative portal.
* `<product-card>`: Standardized product display component used across different views.

### 2. Decoupled Services
Business logic is entirely separated from the View Layer through specialized Services:
* **`medicineService`**: Handles all asynchronous HTTP communication with Supabase APIs for fetching inventory and updating stock levels.
* **`notificationService`**: A centralized messaging system for real-time user feedback (success/error toasts).

### 3. Inventory Integrity Logic
A strict stock-validation algorithm is integrated into the quantity control logic. It prevents "Overselling" by performing boundary checks against the Supabase real-time stock value before any transaction occurs.

---

## 🚀 Technical Challenges & Solutions
* **State Persistence:** Solved the "Refresh Data Loss" problem by implementing a synchronization bridge between the AngularJS `$scope` and `localStorage`.
* **Async Data Handling:** Managed complex asynchronous data streams from Supabase to ensure the UI updates only after successful database confirmation.
* **Null Safety:** Implemented defensive programming techniques to handle undefined user states, preventing runtime errors during the checkout process.

---


## 💾 Database Schema (Supabase)
The relational database is architected for maximum data integrity:
* **`medicines`**: Central repository for product data (ID, Name, Supplier, Unit Price, Stock).
* **`invoices`**: Records the master transaction data (Customer Name, Phone, Address, Grand Total).
* **`invoice_items`**: A junction table linking invoices to specific medicines, maintaining a clear audit trail of every item sold.

---

## 🚀 Key Functional Features
* **Persistent Shopping Cart:** Automatic state-saving in `localStorage`, allowing user sessions to survive browser refreshes without data loss.
* **Dynamic Real-time Filtering:** High-speed medicine and invoice search using AngularJS filters and data-binding.
* **Order Lifecycle Tracking:** Full visibility for both user and admin into the order status (from 'Pending' to 'Delivered').

---

## 📜 License
This project is for educational and professional demonstration purposes.
