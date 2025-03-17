# Shyara Gold

![Shyara Gold](https://your-image-link-here.com)

## Overview
Shyara Gold is a full-stack e-commerce platform that provides users with a curated selection of best-selling jewelry items, editorial content, and user-submitted jewelry designs. Built using the MERN stack, it features MongoDB Atlas for secure and scalable data storage.

## Features
- **Best-selling items API**: Fetches popular products for the homepage.
- **Editorial content API**: Delivers articles and content for the editorial section.
- **Users design data API**: Stores and retrieves user-generated jewelry designs.
- **Collection Page**: Displays various jewelry categories including Rings, Bangles, Bracelets, Necklaces, Chains, Mangalsutras, Earrings, and Pendants.
- **MongoDB Atlas Integration**: Data is securely stored and managed in MongoDB Atlas.
- **Full-stack Development**: Implemented with React.js (frontend), Node.js, and Express.js (backend).

## Tech Stack
- **Frontend**: React.js, HTML5, CSS3
- **Backend**: Node.js, Express.js, MongoDB
- **Database**: MongoDB Atlas
- **Tools**: Git, GitHub, Postman, VS Code

## Live Demo
- **Frontend**: [Shyara Gold Frontend](https://shyara-gold.netlify.app/)
- **Backend API**: [Shyara Gold Backend](https://shyara-gold.onrender.com/best_selling_items)
- **Postman API Documentation**: [View Documentation](https://documenter.getpostman.com/view/39216534/2sAYQiATE7)

---

## Backend
### Tech Stack
- Node.js
- Express.js
- MongoDB Atlas
- REST APIs

### API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/best_selling_items` | GET | Fetches best-selling jewelry items |
| `/editorial_content` | GET | Retrieves editorial content |
| `/users_designs` | GET | Fetches user-submitted jewelry designs |
| `/users_designs` | POST | Submits a new jewelry design |
| `/collections` | GET | Retrieves all jewelry categories |
| `/all_collection/ring/get_rings_data` | GET | Fetches ring data |
| `/all_collection/ring/add_rings_data` | POST | Adds new ring data |
| `/all_collection/bangle/get_bangle_data` | GET | Fetches bangle data |
| `/all_collection/bangle/add_bangle_data` | POST | Adds new bangle data |
| `/all_collection/bracelet/get_bracelet_data` | GET | Fetches bracelet data |
| `/all_collection/bracelet/add_bracelet_data` | POST | Adds new bracelet data |
| `/all_collection/chain/get_chain_data` | GET | Fetches chain data |
| `/all_collection/chain/add_chain_data` | POST | Adds new chain data |
| `/all_collection/earring/get_earring_data` | GET | Fetches earring data |
| `/all_collection/earring/add_earring_data` | POST | Adds new earring data |
| `/all_collection/mangalsutra/get_mangalsutra_data` | GET | Fetches mangalsutra data |
| `/all_collection/mangalsutra/add_mangalsutra_data` | POST | Adds new mangalsutra data |
| `/all_collection/necklace/get_necklace_data` | GET | Fetches necklace data |
| `/all_collection/necklace/add_necklace_data` | POST | Adds new necklace data |
| `/all_collection/pendant/get_pendant_data` | GET | Fetches pendant data |
| `/all_collection/pendant/add_pendant_data` | POST | Adds new pendant data |

### Setup Instructions
1. **Navigate to the backend folder**
   ```bash
   cd backend
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Set up environment variables**
   Create a `.env` file in the root directory and add your MongoDB connection string and other required variables.
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
4. **Start the backend server**
   ```bash
   npm start
   ```

---

## Frontend
### Tech Stack
- React.js
- HTML5, CSS3
- React Router

### Setup Instructions
1. **Navigate to the frontend folder**
   ```bash
   cd frontend
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start the frontend server**
   ```bash
   npm start
   ```

![Frontend UI](https://your-image-link-here.com)

---

## Contribution Guidelines
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a Pull Request.

## Contact
For any inquiries or collaboration opportunities, feel free to reach out:
- **Email**: dhruvesh.shyara.cg@gmail.com
- **LinkedIn**: [Dhruvesh Shyara](https://www.linkedin.com/in/dhruveshshyara)
- **GitHub**: [Dhruvesh1611](https://github.com/Dhruvesh1611)

