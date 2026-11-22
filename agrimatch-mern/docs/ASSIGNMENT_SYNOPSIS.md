# Project Synopsis: AgriMatch

## 1. Project title
**AgriMatch: A MERN-Based Farmer Government Scheme Discovery and Recommendation System**

## 2. Introduction
Farmers may find it difficult to discover agriculture-related Central and State Government schemes because information is spread across multiple department portals and notifications. AgriMatch provides a single student-project interface where a farmer can create a basic farm profile, browse a curated scheme catalogue, filter schemes by government level/state/category, and view potentially relevant schemes with reasons and official source links.

## 3. Problem statement
There is no single, simple discovery interface in this project context that combines selected Central and state agriculture scheme information with location-aware browsing and explainable suggestions. Users must otherwise visit multiple portals and interpret scheme information independently.

## 4. Objectives
- Build a responsive web application using the MERN stack.
- Provide secure user registration and login.
- Store a farmer's basic profile in MongoDB.
- Maintain scheme records with government level, state applicability, category, benefit summary and official source metadata.
- Allow search and filtering of Central and State schemes.
- Generate explainable, potentially relevant suggestions from profile attributes.
- Make limitations clear and direct users to official sources for final verification.

## 5. Scope
The assignment MVP includes a selected Central Government catalogue and Madhya Pradesh scheme catalogue. It is designed to expand to additional states by adding data records rather than redesigning the database. It does not submit applications, make official eligibility decisions, or guarantee scheme availability.

## 6. Proposed technology stack
- Frontend: React.js, Vite, React Router, CSS
- Backend: Node.js, Express.js
- Database: MongoDB Atlas, Mongoose
- Authentication: bcrypt password hashing and JWT
- Version control: Git and GitHub
- Deployment: Render (API) and Vercel (frontend)

## 7. Main modules
1. **Authentication:** registration, login and protected API routes.
2. **Farmer profile:** state, district, landholding, farmer type, irrigation, crops and interests.
3. **Scheme directory:** search and filters for government level, state and category.
4. **Scheme data management:** structured scheme information with source URL, source name, verification date and status.
5. **Recommendation engine:** rule-based state and topic matching with readable reasons and caveats.
6. **Official-source verification:** outbound links to government portals and an explicit non-guarantee disclaimer.

## 8. Expected outcome
A working full-stack web application demonstrating CRUD-style profile handling, authentication, database integration, REST APIs, filtering, and a simple explainable recommendation engine.

## 9. Future scope
- Secure admin dashboard with role-based access to add/edit/archive schemes.
- Additional State Government catalogues.
- Hindi and other regional languages.
- Notification of application windows after reliable official data integration.
- Scheme comparison and bookmark feature.
- Automated source review workflow; no unverified scraping presented as official data.

## 10. References
Refer to `SCHEME_DATA_SOURCES.md` for the official source list and `FINAL_REPORT_TEMPLATE.md` for the report structure.
