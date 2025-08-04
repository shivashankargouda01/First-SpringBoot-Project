

# Skill Swap Platform

Welcome to Skill Swap, a full-stack web application designed to facilitate peer-to-peer skill exchange! Users can register, showcase skills they can teach or want to learn, search for matching partners, send swap requests, schedule exchanges, and track their progress effortlessly.

Project Overview

Skill Swap aims to create a vibrant community where learning and teaching skills is easy, interactive, and rewarding.

- User Registration & Authentication: Secure sign up and login flow with hashed passwords.
- Profile & Skill Management: Add/edit/delete skills categorized as "Can Teach" or "Want to Learn".
- Skill Search & Matching: Find users matching your skill interests.
- Swap Requests & Scheduling: Exchange swap proposals, schedule sessions, accept/reject requests.
- Responsive Modern UI: Built with React and styled with TailwindCSS.
- Robust Backend: Spring Boot REST API with JPA and MySQL database.

Project Structure

skill-swap/  
 ├── backend/    # Spring Boot backend API  
 ├── frontend/    # React frontend application  
 ├── .gitignore    # Ignored files for git  
 └── README.md    # This documentation

Tech Stack

- Frontend: React  
- Backend: Java, Spring Boot, Spring Security, JPA/Hibernate  
- Database: MySQL

Getting Started

Backend Setup

1. Navigate to backend folder:  
 cd skill-swap/backend

2. Build and run backend:  
 mvn clean package  
 java -jar target/skill-swap-backend-0.1.0-SNAPSHOT.jar

3. Ensure MySQL is running and configured in application.properties

Backend runs on http://localhost:9091

Frontend Setup

1. Navigate to frontend folder:  
 cd skill-swap/frontend

2. Install dependencies and run:  
 npm install  
 npm start

Frontend runs on http://localhost:3000

Screenshots
![image alt](https://github.com/shivashankargouda01/First-SpringBoot-Project/blob/5a7f1367d0a4d565f24275db98d45a8ed4ee3dd1/Screenshot%20(383).png)
![image alt](https://github.com/shivashankargouda01/First-SpringBoot-Project/blob/5a7f1367d0a4d565f24275db98d45a8ed4ee3dd1/Screenshot%20(386).png)
![image alt](https://github.com/shivashankargouda01/First-SpringBoot-Project/blob/5a7f1367d0a4d565f24275db98d45a8ed4ee3dd1/Screenshot%20(389).png)
![image alt](https://github.com/shivashankargouda01/First-SpringBoot-Project/blob/5a7f1367d0a4d565f24275db98d45a8ed4ee3dd1/Screenshot%20(390).png)
![image alt](https://github.com/shivashankargouda01/First-SpringBoot-Project/blob/5a7f1367d0a4d565f24275db98d45a8ed4ee3dd1/Screenshot%20(392).png)


Happy swapping!

