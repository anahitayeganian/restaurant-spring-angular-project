# Restaurant Management System
I am currently working on implementing this personal project, which is a web application developed using Angular for the front-end, Spring framework for the back-end, Hibernate and utilizes MySQL as the database management system.
It demonstrates various features such as user authentication, user roles (admin and user), CRUD operations on categories and products, order management and bill generation.

## Technologies Used

- Angular
- Spring
- Hibernate
- MySQL

## Key features

- User authentication: users can sign up, log in, and log out using their email and password;
- Security features: JSON Web Tokens are used for secure authentication and authorization;
- User roles: the system supports both admin and user roles, each with different levels of access to functionalities;
- Category and product management: admin users can add, edit and delete categories and products. Validation is implemented for ensuring data integrity;
- Order management: users can place orders by selecting products, specifying quantities and providing payment details;
- Bill generation: upon order submission, bills are automatically generated in PDF format, containing details of the order;
- Viewing and managing bills: admin users can view and delete bills. Bills can be searched and filtered based on various criteria;
- User management: admin users can approve or disable user accounts, with notification emails sent for account status changes.