# Cloud_Comp_Project
Cloud Computing Group Project

Team members:
- Jad
- Alesia
- Kohanna
- Tatiana
- Viktoriia
- Laura S.

Tools used:
- Github
- Azure
- Vercel

Team Roles

Project Manager
- Assign roles and coordinate timeline
- Maintain README and documentation
- Organize team communication
- Prepare final presentation and run demo

Cloud Architect
- Design Azure resource architecture
- Create and configure Azure Storage, Table, Blob, Queue
- Configure CORS for GitHub Pages
- Assist backend deployment and environment setup
  
Backend Developer(s)
- Implement Azure Functions (AddMeal, GetMealsByArea, SubmitOrder)
- Connect Functions to Table, Blob, and Queue Storage
- Handle validation, order calculation, and error responses
- Test API endpoints locally and after deployment

Frontend Developer(s)
- Build restaurant and customer pages using HTML/CSS/JS
- Connect frontend forms to backend APIs with fetch()
- Implement meal browsing, cart system, and confirmation page
- Ensure GitHub Pages works smoothly
  
Data & Storage Engineer
- Design Table Storage schema
- Create and upload sample restaurant and meal data
- Bulk-insert data using Python script or Azure portal
- Manage Blob Storage for images if used
  
QA Tester & Demo Lead
- Test backend with Postman
- Perform full end-to-end UI testing
- Verify backend integration and error handling
- Prepare demo flow and final quality checks
  
Fastest Completion Timeline

Phase 1 — Setup & Architecture
- Create GitHub repo and README (Project Manager)
- Enable GitHub Pages (Frontend Developer)
- Set folder structure (Project Manager)
- Create Azure resources (Storage, Table, Blob, Queue) (Cloud Architect)
- Prepare placeholder frontend pages (Frontend Developer)
Deliverables for Phase 1
- GitHub repo live (Project Manager)
- Azure environment ready (Cloud Architect)
- Initial frontend pages created (Frontend Developer)

Phase 2 — Data Model & Sample Data
- Define Azure Table schema (Data Engineer)
- Create sample restaurant & meal data (Data Engineer)
- Bulk insert data into Table Storage (Data Engineer)
- Upload meal images to Blob Storage (optional) (Data Engineer)
- Backend scaffolding for Functions (Backend Developer)
Deliverables for Phase 2
- Table Storage populated (Data Engineer)
- Blob Storage configured (Data Engineer)
- Backend structure ready (Backend Developer)

Phase 3 — Backend Implementation
- Implement AddMeal Function (Backend Developer)
- Implement GetMealsByArea Function (Backend Developer)
- Implement SubmitOrder Function (Backend Developer)
- Configure CORS and environment variables (Cloud Architect)
- Deploy backend to Azure (Cloud Architect)
Deliverables for Phase 3
- All backend APIs functional (Backend Developer)
- CORS configured correctly (Cloud Architect)
- Backend validated with Postman (QA Tester)
  
Phase 4 — Frontend Integration
- Connect forms to backend via fetch() (Frontend Developer)
- Implement restaurant meal registration (Frontend Developer)
- Implement customer meal selection & order flow (Frontend Developer)
- Implement confirmation page (Frontend Developer)
- Fix backend formatting issues for frontend (Backend Developer)
Deliverables for Phase 4
- Fully functional frontend (Frontend Developer)
- Frontend-backend integration complete (QA Tester)
  
Phase 5 — Polish & Final Presentation
- Perform full system testing (QA Tester)
- Fix UI and backend bugs (Frontend & Backend Developers)
- Finalize PowerPoint (Project Manager)
- Prepare and rehearse demo (QA Tester & Project Manager)
Deliverables for Phase 5
- Bug-free working platform (All Team Members)
- Professional final presentation (Project Manager)
- Demo-ready app (QA Tester)

Project Briefing


In this group project, you will collaboratively design and build a simplified Uber Eats–like platform using Microsoft Azure services. The platform must support a two-sided interaction between:

Restaurants, who register and publish meals
Customers, who browse meals in their delivery area and place orders
Your focus will be on creating a functional serverless backend using Azure Functions and Azure Storage (Tables, Blobs, and Queues), combined with a static frontend hosted on GitHub Pages that calls these backend services.

This project is your opportunity to apply key cloud concepts from the course in a practical, real-world scenario, regardless of your prior experience with full-stack applications.

🧰 Mandatory Technology Stack
Layer
Tools & Services
Frontend
HTML, JavaScript, CSS (deployed via GitHub Pages)
Backend
Azure Functions (HTTP triggers)
Storage
Azure Table Storage (structured data) + Azure Blob Storage (optional for menu images or menu media)
Advanced
Azure Queue Storage (for handling invalid requests or dead-lettering)


🎯 Minimum Functionality Requirements

For Restaurants A form to register meals, including:
- Name of the dish
- Description
- Estimated preparation time (in minutes)
- Price
- Delivery area (e.g., “Central”, “North”, etc.)
- These entries must be stored in Azure Table Storage.

For Customers A form to:
- Choose a delivery area from a dropdown list
- View available meals from restaurants in that area (retrieved from Azure Table)
- Select multiple meals and place an order
- After submitting an order, display a confirmation page with:
- Total cost
- Estimated delivery time
  
⚠️ Note: Authentication for restaurants or customers is explicitly out of scope. For the purpose of this educational project, the system assumes that:

Any visitor to the platform can act as a customer or restaurant.
Customers provide their delivery area and address directly in the form, and this is accepted without validation or login.

⚠️ Note: Delivery Area and Time Calculation

For this project, both restaurants and customers will use a simplified concept of area (e.g., "Central", "North", "South") rather than GPS coordinates or real-world maps. Meals are matched to customers based on these predefined areas.

Similarly, the estimated delivery time can be calculated using a basic approach such as:

Estimated Time = sum(preparation times) + fixed pickup time + fixed delivery time
This is sufficient to meet project requirements.

🧠 Advanced teams are welcome to experiment with more sophisticated features, such as:

Variable delivery times based on restaurant combinations
Grouping meals by restaurant
Mock geolocation or time-of-day adjustments
Implementing creative extensions like these may positively impact your final grade.

Advanced Feature:
Use Azure Queue Storage to capture and store invalid requests, such as:
Orders missing required fields (e.g., area or selected meals)
📦 Deliverables (Single Final Submission)
Each group will submit:

A private GitHub repository containing:

Source code for frontend (HTML/CSS/JS)
Azure Functions and deployment files
A working GitHub Pages deployment.
You must mention the GitHub Page URL in your submission for me to try your platform before your demo.
A professional PowerPoint presentation (max 10 slides) that:

Presents the platform to both restaurant owners and customers
Demonstrates how the frontend and backend work together
Explains your team’s use of Azure technologies and cloud design choices
🪜 Suggested Milestones & Development Roadmap



💡 Final Message

This project may seem intimidating at first, but by building it step-by-step as a team, you'll not only meet the course requirements but develop real skills with professional applicability.

You're not expected to be perfect. You're expected to learn by doing.

