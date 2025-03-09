# SpiritX_Scope_01

SecureConnect - A Secure Authentication System

Overview

SecureConnect is a secure and user-friendly authentication system designed to ensure safe and efficient user registration and login. This project was developed as part of the Xcelerate hackathon and implements all required functionalities along with additional enhancements for an improved user experience.

Features

Signup Page

  1.Username and Password Fields: Users must enter a unique username and a strong password.

  2.Validation and Error Handling:

      -Username must be at least 8 characters long and unique.

      -Password must contain at least one uppercase letter, one lowercase letter, and one special character.

      -Confirm Password field must match the Password.

  3.Real-time Validation: Errors are displayed as the user types.

  4.Authentication-related Error Messages: Displayed above the CTA button.

  5.Signup Confirmation Dialog: Upon successful signup, a confirmation message is shown, and the user is redirected to the login page after 2 seconds.

  6.Password Strength Indicator: Dynamically updates based on password complexity.

  7.Additional Feature:

      -Immediate message if the entered username already exists.

      -Suggests an available username for users if the entered one is taken.

Login Page

1.Username and Password Fields: Users enter their credentials to log in.

2.Validation and Error Handling:

      -Fields cannot be empty.

      -If the username does not exist or the password is incorrect, appropriate messages are displayed.

3.Real-time Validation: Errors are displayed as the user types.

4.Post-Login Experience:

      -Successful login redirects the user to a personalized landing page.

      -Displays a welcome message: "Hello, !"

      -Implements basic session management to keep users logged in until they click the "Logout" button.

      -Clicking the "Logout" button redirects the user back to the login page.

Technologies Used

Frontend: next, TailwindCSS, JavaScript

Backend: Node.js, Express.js

Database: MySQL 

Session Management: JWT / Cookies

Contributors
     1.Ashindu Dissanayake
     2.Dasun Illangasinghe
     3.Kasun Dilhara
     4.Asith Dilusha
     5.Hiruna Nimesh