# Order Management Platform

A full-stack web application designed for online order management, built with a three-tier architecture (Angular, Spring Boot, MySQL).

The system supports secure JWT-based authentication, role-based access control for admins and customers, CRUD management of categories, items, users and orders, automated PDF receipt generation, and email notifications for order confirmations, password resets and account status changes.

The platform is built as a generic order management system: it works with any domain modeled around categories, items, orders and users (customers and admins). For demonstration purposes, it has been populated with a sample restaurant dataset (menu categories and dishes).

## ⚙️ Tech Stack

- **Frontend:** Angular 16.2, TypeScript 5.1, HTML, CSS
- **Backend:** Java 17, Spring Boot 3.2, Spring Data JPA, Spring Security
- **Database:** MySQL 8
- **Build Tool:** Maven 3.9

## 🎬 Demo
The following videos showcase the platform's main features from both user perspectives.

[Customer demo](https://youtu.be/Pmn2QRhaxRQ?si=h8REsF34Tz__xuLK)

[Administrator demo](https://youtu.be/ivOkELaXgxo?si=QSRS63I1uELMiGmw)

## Core Features

### User Authentication and Security
The system provides **secure authentication and role-based access** for both administrators and customers.

- Users can create accounts, log in with email and password and log out.
- Authentication and authorization are implemented with **JSON Web Tokens (JWT)**, with token expiration for user sessions and password resets.
- Passwords are securely stored using **BCrypt hashing**.
- Server-side validation and sanitization of inputs, along with token verification, prevent malicious attempts.

### Online Ordering Workflow
Customers can browse the catalog, add items to their cart, adjust quantities and place orders. After placing an order:
- A **PDF receipt** is automatically generated with all the order details.
- Order details and the corresponding receipt are stored in the database for future reference.
- An **automatic email notification** is sent to confirm the order with the receipt.
- Customers can review past orders and download receipts at any time.

### Admin Panel
Administrators have comprehensive control over categories, items, customers and orders.

- **Category and Item Management**

  Administrators can **create, update or delete** categories and items, quickly locating specific entries through the **search function**. Items can be linked to categories, which determines whether and where they appear in the **up-to-date catalog**, and whether the category is eligible for deletion (only possible if no items are mapped to it).
- **Order Management**
    
  Administrators can **view, filter or delete** orders and the associated receipts.
- **User Management**
  
  Administrators can **approve, disable or filter** customer accounts. Status changes trigger automatic email notifications to all administrators and can restrict the affected user from logging in.

### Password Management
Users can:
- Update their password while logged in.
- Request a **password reset** via a secure email containing a **time-limited link** that expires with the reset token.