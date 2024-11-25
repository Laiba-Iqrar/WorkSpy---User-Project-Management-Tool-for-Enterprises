# WorkSpy: User and Project Management Tool  

**WorkSpy** is a user and project management tool that streamlines task management, user monitoring, and timesheet reporting with a focus on efficiency and transparency.

---

## Features  

- **Role-Based Access Control**: Secure authentication with user-specific dashboards.  
- **Project and Task Management**: Track project statuses, assign tasks, and monitor progress.  
- **Timesheet Reporting**: Log and visualize weekly working hours, task statuses, and approvals.  
- **Notifications**: Alerts for pending tasks, timesheet reviews, and deadlines.  
- **Charts and Analytics**: Interactive visualizations powered by Chart.js.  

---

## Technologies Used  

- **Backend**: Node.js, Express.js  
- **Database**: MySQL  
- **Frontend**: EJS, HTML, CSS, Chart.js  
- **Authentication**: JSON Web Tokens (JWT) and Express-Session  
- **Encryption**: bcrypt.js  

---

## Installation and Setup  

### Prerequisites  

- Node.js (v14+)  
- MySQL Server (v8+)  
- Git  

### Steps  

1. **Clone Repository**:  
   ```bash  
   git clone https://github.com/Laiba-Iqrar/WorkSpy---User-Project-Management-Tool-for-Enterprises.git 
   cd workspy  
   ```  

2. **Install Dependencies**:  
   ```bash  
   npm install  
   ```  

3. **Configure Environment Variables**:  
   Create a `.env` file:  
   ```env  
   DB_HOST=localhost  
   DB_USER=root  
   DB_PASSWORD=yourpassword  
   DB_NAME=workspy  
   SESSION_SECRET=your_secret_key  
   ```  

4. **Setup Database**:  
   Run the schema file to create tables:  
   ```sql  
   source schema.sql;  
   ```  

5. **Start Server**:  
   ```bash  
   npm start  
   ```  
   Access the application at `http://localhost:3000`.  

---

## Application Structure  

```plaintext  
workspy/  
├── controllers/  
│   ├── userController.js        # User-related logic  
│   ├── projectController.js     # Project-related logic  
│   ├── reportController.js      # Reports and charts  
├── models/  
│   ├── userModel.js             # User database queries  
│   ├── projectModel.js          # Project database queries  
├── routes/  
│   ├── userRoutes.js            # User API endpoints  
│   ├── projectRoutes.js         # Project API endpoints  
├── views/  
│   ├── dashboard.ejs            # Dashboard page  
│   ├── login.ejs                # Login page  
├── public/  
│   ├── styles.css               # Frontend styles  
│   ├── scripts/  
│       └── charts.js            # Chart.js scripts  
├── app.js                       # Entry point  
├── db.js                        # MySQL database connection  
├── package.json                 # Dependencies and scripts  
├── schema.sql                   # Database schema  
└── README.md                    # Documentation  
```  

---

## Key Routes  

### **Authentication**  

- `POST /login`: Authenticate users and start a session.  
- `GET /logout`: End user session.  

### **Project Management**  

- `GET /projects`: List all projects.  
- `POST /projects`: Create a new project.  
- `PUT /projects/:id`: Update a project.  
- `DELETE /projects/:id`: Delete a project.  

### **Reports**  

- `GET /reports`: Fetch task, timesheet, and approval data for charts.  

---

## Future Enhancements  

1. **Advanced Analytics**: Filters for date ranges, user-specific insights, and performance metrics.  
2. **Export Features**: PDF and Excel report generation.  
3. **Mobile Optimization**: Enhanced responsiveness for mobile users.  
4. **Integration**: APIs for external task management and time-tracking tools.  

---

## License  

This project is licensed under the MIT License.  

For questions or contributions, contact Laiba Iqrar at laibaiqrarahmedkhan@gmail.com.  
