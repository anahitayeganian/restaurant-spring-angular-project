# Restaurant Management System

A full-stack web application designed to streamline restaurant operations.

Built with Angular, Spring Framework, Hibernate, and MySQL, the system supports online order processing, secure authentication, role-based functionalities for admins and regular users, CRUD operations for menu categories and items, bill generation, automated email notifications, and user management.

## ⚙️ Tech Stack

- **Backend:** Java, Spring Framework
- **ORM:** Hibernate
- **Database:** MySQL
- **Frontend:** Angular

## Core Features

- **User authentication:** Users can sign up, log in using email and password, and log out. An admin must activate the new account before the user can access ordering features.
- **Security features:** JSON Web Tokens (JWT) are used for secure authentication and authorization. BCrypt for password hashing. Token expiration for sessions and password-reset flows.
- **Online ordering:** Users can browse menu categories and items, add items to a cart, specify quantities, provide payment details, and submit orders. Once an order is placed:
  - A PDF bill is generated automatically with order details and total amount.
  - The bill is saved in the database and a copy is downloaded to the user's computer.
  - Notification emails are sent automatically.
- **User roles:** The system supports two roles, admin and user, each with distinct dashboards and role-specific permissions.
- **Category and item management:** Admins can add, update, and delete categories and items, each presented in a list with a search filter to quickly narrow down results by typing keywords.
- **User management:** Admins can approve or disable user accounts using a toggle button to change their status. Status changes trigger notification emails to alert both the user and all admins. A filter functionality allows admins to refine the user list.
- **Viewing and managing bills:**
  - Admins can access all users' bills, remove any entry, or open the PDF for a selected one.
  - Users can view their own bills and download the PDF of any particular one.
- **Password change and reset:** Users can update their password at any time while logged in. If they forget it, they can request a reset, which sends an email containing a secure link that remains active until the associated reset token expires.