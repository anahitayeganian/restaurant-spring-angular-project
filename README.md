# Restaurant Management System

A full-stack web application designed to streamline restaurant operations, built with Angular, Java, Spring Boot, Hibernate, and MySQL.

This system supports online ordering, secure authentication, role-based access for admins and regular users, CRUD operations for menu categories, items, users, and orders, automated receipt generation and email notifications, and user management.

## ⚙️ Tech Stack

- **Frontend:** Angular, HTML, CSS
- **Backend:** Java, Spring Boot
- **ORM:** Hibernate
- **Database:** MySQL

<!--
## 📸 Screenshots

<Insert screenshots if available — e.g., admin interface, blog post list, post detail>
-->

## Core Features

### User Authentication and Security
The system provides secure authentication and **role-based access** for both admins and users. New accounts require admin approval before accessing ordering features.

- Users can create accounts, log in with email and password, and log out.
- Authentication and authorization are implemented with **JSON Web Tokens (JWT)** with token expiration for user sessions and password resets.
- Passwords are securely stored using **BCrypt hashing**.
- Server-side enforcement of role-based access prevents malicious attempts to bypass the UI, whether through the browser or by accessing backend functionality directly.

### Online Ordering Workflow
Users can browse menu categories, add items to their cart, adjust quantities, enter payment details, and place orders. After placing an order:
- A **PDF receipt** is automatically generated with all the order details.
- Order details and the corresponding receipt are stored in the database for future reference.
- The receipt is downloaded locally to the user's computer.
- An **automatic email notification** is sent to confirm the order.
- Users can review past orders and download receipts at any time.

### Admin Panel
Admins have comprehensive control over categories, items, users, and orders, ensuring smooth restaurant operations.

- **Category and Item Management**

  Admins can **create, update, or delete** menu categories and items, quickly locating specific entries through the **search function**. Items can be linked to categories, which determines whether and where they appear in the **up-to-date menu**.
- **User Management**
  
  Admins can **approve, disable, filter, or modify** user accounts. Status changes trigger automatic email notifications to the affected user and all admins.
- **Order Management**
  
  Admins can **view, edit, or delete** orders and the associated receipts.

### Password Management
Users can:
- Update their password while logged in.
- Request a **password reset** via a secure email containing a **time-limited link** that expires with the reset token.