# Facial Recognition System

A full-stack facial recognition application that allows users to register their faces and login using facial recognition technology.

## Project Goals

This project demonstrates a simple facial recognition system with the following capabilities:

- **User Registration**: Register users with their full name and facial biometric data
- **Face Detection**: Real-time face detection and landmark recognition using webcam
- **Face Recognition**: Authenticate users by comparing their live face against stored face descriptors
- **SQL Storage**: Store face descriptors in a SQL Server database


## Technology Stack

- Frontend (React + Vite)
- Backend (.NET + EF Core)

### Face Recognition Library
- **face-api.js** - A JavaScript API for face detection and recognition in the browser
https://github.com/justadudewhohacks/face-api.js/

## Getting Started

### Prerequisites
- Docker and Docker Compose installed
- A webcam for face capture
- Modern web browser with camera permissions

### Running with Docker Compose

   ```bash
   git clone <repository-url>
   cd facial-recognition
   docker-compose up --build
   ```

**Access the application**
   - Frontend: http://localhost:5100
   - Backend API: http://localhost:5000


## How to Use

### Register a New User
1. Navigate to "Register Face" page
2. Enter your full name
3. Click "Open Camera" to access your webcam
4. Position your face in the camera view
5. Wait for face detection (rectangle appears)
6. Click "Take Picture" when face is detected
7. Click "Register" to save your face data

### Face Login
1. Navigate to "Face Login" page
2. The system loads existing face descriptors
3. Use your webcam to authenticate
4. Face recognition compares against stored data


## API Endpoints

### Users
- `POST /api/users` - Register a new user with face descriptor
- `GET /api/users/face-descriptor` - Get all stored face descriptors

### Request/Response Examples

**Register User:**
```json
POST /api/users
{
  "FullName": "Wilckerson",
  "FaceDescriptorJSON": "[0.123, -0.456, 0.789, ...]"
}
```


