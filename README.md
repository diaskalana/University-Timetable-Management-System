# University Timetable Management System API Documentation

Welcome to the University Timetable System API documentation. This API serves as a robust platform for managing various aspects of academic scheduling and resource allocation within educational institutions. Also, this API enables administrators, faculty, and students to efficiently manage courses, timetables, enrollments, notifications, resources, and rooms.

The API offers comprehensive functionalities for user management and authentication, allowing seamless access control and secure authentication mechanisms using JSON Web Tokens (JWT). Through this API, users can perform essential operations such as creating and managing courses, organizing class schedules, enrolling students in courses, sending notifications, and booking resources and rooms for classes or events.

With clear and concise documentation provided here, developers can easily integrate and leverage the capabilities of the University Timetable System API to enhance academic management processes, streamline operations, and ensure effective coordination of activities within educational institutions.

## Table of Contents

<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

- [User Management & Authentication](#user-management--authentication)
- [TimeTable Management](#timetable-management)
- [Course Management](#course-management)
- [Enrollment Management](#enrollment-management)
- [Notification Management](#notification-management)
- [Resource Management](#resource-management)
- [Room Management](#room-management)
- [Project Setup & Testing Instructions](#project-setup--testing-instructions)

<!-- TOC end -->

# User Management & Authentication

## End-point: /api/auth/register

### Register User

This endpoint allows you to register a new user.

**HTTP Request**  
`POST http://localhost:3000/api/auth/register`

**Parameters**

- `username` (string, required) - The username of the user.
- `email` (string, required) - The email address of the user.
- `password` (string, required) - The password for the user account.
- `role` (string, required) - The role of the user.

**Response**

- Status: 200 OK
- Content-Type: application/json
- `token` (string) - The authentication token for the registered user.

### Method: POST

> ```
> http://localhost:3000/api/auth/register
> ```

### Body (**raw**)

```json
{
  "username": "testuser",
  "email": "testuser@gmail.com",
  "password": "123",
  "role": "Admin"
}
```

### Response: 200

```json
{
  "token": "tokenValue"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /api/auth/login

### Login User

This endpoint is used to authenticate a user and obtain a token for accessing protected resources.

#### Request Body

- email (text, required): The email address of the user.
- password (text, required): The password of the user.

#### Response

- Status: 200 OK
- Content-Type: application/json
- token (string): A token to be used for accessing protected resources.

### Method: POST

> ```
> http://localhost:3000/api/auth/login
> ```

### Body (**raw**)

```json
{
  "email": "dias@gmail.com",
  "password": "123"
}
```

### Response: 200

```json
{
  "token": "tokenValue"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /api/auth/me

### Get User

This endpoint makes an HTTP GET request to retrieve the authenticated user's information. Upon a successful execution, the server responds with a status code of 200 and a JSON object containing the user's details, including their ID, username, email, role, and version.

### Method: GET

> ```
> http://localhost:3000/api/auth/me
> ```

### Response: 200

```json
{
  "user": {
    "_id": "idValue",
    "username": "testuser",
    "email": "testuser@gmail.com",
    "role": "Admin",
    "__v": 0
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /api/auth/me

### Update User

This endpoint allows the user to update their authentication details. The request body should be in raw format and include the keys "username", "email", and "password" with their respective values.

#### Request Body

- `username` (string): The user's new username.
- `email` (string): The user's new email address.
- `password` (string): The user's new password.

#### Response

Upon successful execution, the endpoint returns a status code of 200 and a JSON object with a "token" key containing the updated authentication token.

Example:

```json
{
  "token": "updatedTokenValue"
}
```

### Method: PUT

> ```
> http://localhost:3000/api/auth/me
> ```

### Body (**raw**)

```json
{
  "username": "dias",
  "email": "dias@gmail.com",
  "password": "123"
}
```

### Response: 200

```json
{
  "token": "tokenValue"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /api/auth/logout

### Logout User

This endpoint is used to log out the authenticated user.

#### **HTTP Request**

`POST http://localhost:3000/api/auth/logout`

#### **Response**

- Status: 200
- Content-Type: application/json

Upon successful logout, the response will contain a JSON object with a `message` key.

### Method: POST

> ```
> http://localhost:3000/api/auth/logout
> ```

### Response: 200

```json
{
  "message": "Logout successful"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# TimeTable Management

## End-point: /api/timetable

### Create Session (Admin Only)

This endpoint allows you to create a new timetable entry by making an HTTP POST request to the specified URL. The request should include the following parameters in the raw request body:

- day (string): The day for the timetable entry
- time (string): The time for the timetable entry
- courseId (string): The ID of the course
- facultyId (string): The ID of the faculty
- room (string): The room for the timetable entry

Upon a successful execution, the endpoint returns a 201 status code with a JSON response containing the created session object, including its unique ID and version information.

### Method: POST

> ```
> http://localhost:3000/api/timetable
> ```

### Body (**raw**)

```json
{
  "day": "Thursday",
  "time": "4pm",
  "courseId": "idValue",
  "facultyId": "idValue",
  "room": "R500"
}
```

### Response: 201

```json
{
  "session": {
    "day": "Thursday",
    "time": "4pm",
    "courseId": "idValue",
    "facultyId": "idValue",
    "room": "R500",
    "_id": "idValue",
    "__v": 0
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /api/timetable

### Get All Sessions

This endpoint retrieves the timetable information via an HTTP GET request to [http://localhost:3000/api/timetable/](http://localhost:3000/api/timetable/).

The response will have a status code of 200 and a content type of application/json. The response body will contain an array of "sessions", with each session including properties such as \_id, day, time, courseId, facultyId, room, and \_\_v.

### Method: GET

> ```
> http://localhost:3000/api/timetable
> ```

### Response: 200

```json
{
  "sessions": [
    {
      "_id": "idValue",
      "day": "Monday",
      "time": "2pm",
      "courseId": "idValue",
      "facultyId": "idValue",
      "room": "R100",
      "__v": 0
    },
    {
      "_id": "idValue",
      "day": "Thursday",
      "time": "4pm",
      "courseId": "idValue",
      "facultyId": "idValue",
      "room": "R500",
      "__v": 0
    },
    {
      "_id": "idValue",
      "day": "Thursday",
      "time": "4pm",
      "courseId": "idValue",
      "facultyId": "idValue",
      "room": "R500",
      "__v": 0
    }
  ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /api/timetable/:timeTableId

### Get Session By Id

This API endpoint retrieves the timetable information for a specific session identified by its ID.

The response will be in JSON format with the following fields:

- session (object)
  - \_id
  - day
  - time
  - courseId
  - facultyId
  - room
  - \_\_v

### Method: GET

> ```
> http://localhost:3000/api/timetable/:timeTableId
> ```

### Response: 200

```json
{
  "session": {
    "_id": "idValue",
    "day": "Monday",
    "time": "2pm",
    "courseId": "idValue",
    "facultyId": "idValue",
    "room": "R100",
    "__v": 0
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /api/timetable/:timeTableId

### Update Session (Admin Only)

This endpoint makes an HTTP PUT request to update the timetable with the specified ID. The request should include a JSON payload in the raw request body type with the keys "day", "time", "courseId", "facultyId", and "room" to update the timetable details.

#### Request Body

- `day`: (string) The day for the timetable entry.
- `time`: (string) The time for the timetable entry.
- `courseId`: (string) The ID of the course for the timetable entry.
- `facultyId`: (string) The ID of the faculty for the timetable entry.
- `room`: (string) The room for the timetable entry.

#### Response

Upon a successful update, the endpoint returns a status code of 200 and a JSON object with the updated timetable session, including the fields "\_id", "day", "time", "courseId", "facultyId", "room", and "\_\_v".

### Method: PUT

> ```
> http://localhost:3000/api/timetable/:timeTableId
> ```

### Body (**raw**)

```json
{
  "day": "Thursday{Updated}",
  "time": "4pm{Updated}",
  "courseId": "idValue",
  "facultyId": "idValue",
  "room": "R500{Updated}"
}
```

### Response: 200

```json
{
  "session": {
    "_id": "idValue",
    "day": "Thursday{Updated}",
    "time": "4pm{Updated}",
    "courseId": "idValue",
    "facultyId": "idValue",
    "room": "R500{Updated}",
    "__v": 0
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /api/timetable/:timeTableId

### Delete Session (Admin Only)

This endpoint sends an HTTP DELETE request to [http://localhost:3000/api/timetable/:timeTableId](http://localhost:3000/api/timetable/:timeTableId) to delete a specific timetable entry. Upon successful execution, the server responds with a status code of 200 and a JSON object containing a message indicating the success of the operation.

### Method: DELETE

> ```
> http://localhost:3000/api/timetable/:timeTableId
> ```

### Response: 200

```json
{
  "message": "Session deleted successfully"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# Course Management

## End-point: /api/courses

### Create Course (Admin Only)

This endpoint allows you to add a new course.

#### Request Body

- `name` (string, required): The name of the course.
- `code` (string, required): The code of the course.
- `description` (string, optional): The description of the course.
- `credits` (number, required): The credits assigned to the course.
- `faculty` (string, optional): The faculty teaching the course.

#### Response

- Status: 201 Created
- Content-Type: application/json
- `course` (object): Details of the newly added course, including its name, code, description, credits, faculty, unique identifier, and version.

### Method: POST

> ```
> http://localhost:3000/api/courses
> ```

### Body (**raw**)

```json
{
  "name": "DS",
  "code": "IT120",
  "description": "Data Structures",
  "credits": 6,
  "faculty": "65f85dfc91b18df8640922cc"
}
```

### Response: 201

```json
{
  "course": {
    "name": "DS",
    "code": "IT120",
    "description": "Data Structures",
    "credits": 6,
    "faculty": "idValue",
    "_id": "idValue",
    "__v": 0
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /api/courses

### Get All Courses

This endpoint performs an HTTP GET request to retrieve a list of courses from the server.

The response will have a status code of 200, indicating a successful request, and the content type will be in JSON format. The response body will contain an array of courses, with each course object including the following properties:

- \_id: The unique identifier for the course
- name: The name of the course
- code: The code or identifier for the course
- description: A brief description of the course
- credits: The number of credits associated with the course
- faculty: The faculty or instructor responsible for the course
- \_\_v: A version number for the course object

### Method: GET

> ```
> http://localhost:3000/api/courses
> ```

### Response: 200

```json
{
  "courses": [
    {
      "_id": "idValue",
      "name": "DSA",
      "code": "IT200",
      "description": "Data Structures and Algorithms",
      "credits": 6,
      "faculty": "idValue",
      "__v": 0
    },
    {
      "_id": "idValue",
      "name": "DS",
      "code": "IT100",
      "description": "Data Structures",
      "credits": 6,
      "faculty": "idValue",
      "__v": 0
    },
    {
      "_id": "idValue",
      "name": "DS",
      "code": "IT120",
      "description": "Data Structures",
      "credits": 6,
      "faculty": "idValue",
      "__v": 0
    }
  ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /api/courses/:courseId

### Get Course By Id

This API endpoint sends an HTTP GET request to retrieve information about a specific course. The request should be made to [http://localhost:3000/api/courses/:courseId](http://localhost:3000/api/courses/:courseId).

The response will have a status code of 200, indicating a successful request, and a content type of application/json. The response body will contain details about the course, including its ID, name, code, description, credits, and faculty.

Example response:

```json
{
  "course": {
    "_id": "",
    "name": "",
    "code": "",
    "description": "",
    "credits": 0,
    "faculty": "",
    "__v": 0
  }
}
```

### Method: GET

> ```
> http://localhost:3000/api/courses/:courseId
> ```

### Response: 200

```json
{
  "course": {
    "_id": "idValue",
    "name": "DS",
    "code": "IT120",
    "description": "Data Structures",
    "credits": 6,
    "faculty": "idValue",
    "__v": 0
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /api/courses/:courseId

### Update Course (Admin Only)

This endpoint allows the client to update a specific course by making an HTTP PUT request to the specified URL.

#### Request Body

- `name` (string): The updated name of the course.
- `code` (string): The updated code of the course.
- `description` (string): The updated description of the course.
- `credits` (number): The updated credits for the course.
- `faculty` (string): The updated faculty for the course.

#### Response

Upon a successful update, the server responds with a status code of 200 and a JSON object containing the updated course details, including the `_id`, `name`, `code`, `description`, `credits`, `faculty`, and `__v` fields.

### Method: PUT

> ```
> http://localhost:3000/api/courses/:courseId
> ```

### Body (**raw**)

```json
{
  "name": "ITP",
  "code": "IT2030",
  "description": "Information Technology Project",
  "credits": 56,
  "faculty": "idValue"
}
```

### Response: 200

```json
{
  "course": {
    "_id": "idValue",
    "name": "ITP",
    "code": "IT2030",
    "description": "Information Technology Project",
    "credits": 56,
    "faculty": "idValue",
    "__v": 0
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /api/courses/:courseId

### Delete Course (Admin Only)

This endpoint sends an HTTP DELETE request to delete a specific course.

#### Request Parameters

- `courseId` (path) : The unique identifier of the course to be deleted.

#### Response

Upon successful deletion, the server responds with a status code of 200 and a JSON object with a `message` key indicating the success of the operation.

### Method: DELETE

> ```
> http://localhost:3000/api/courses/:courseId
> ```

### Response: 200

```json
{
  "message": "Course deleted successfully"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /api/courses/assign-faculty

### Assign Faculty To Course (Admin Only)

This endpoint allows you to assign a faculty member to a specific course.

#### Request Body

- `courseId` (string): The ID of the course to which the faculty member will be assigned.
- `facultyId` (string): The ID of the faculty member to be assigned to the course.

#### Response

Upon successful assignment, the response will have a status code of 200 and a JSON object with a `message` key indicating the success of the operation.

### Method: POST

> ```
> http://localhost:3000/api/courses/assign-faculty
> ```

### Body (**raw**)

```json
{
  "courseId": "idValue",
  "facultyId": "idValue"
}
```

### Response: 200

```json
{
  "message": "Faculty assigned to course successfully"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# Enrollment Management

## End-point: /api/enrollments/enroll

### Enroll Student in Course

This endpoint allows you to enroll a student in a course.

#### **Request Body**

- `studentId` (string): The ID of the student to be enrolled.
- `courseId` (string): The ID of the course in which the student will be enrolled.

#### **Response**

- Status: 201 Created
- Content-Type: application/json
- `enrollment` (object)
  - `studentId` (string): The ID of the enrolled student.
  - `courseId` (string): The ID of the enrolled course.
  - `_id` (string): The unique ID of the enrollment.
  - `__v` (number): Version control field.

### Method: POST

> ```
> http://localhost:3000/api/enrollments/enroll
> ```

### Body (**raw**)

```json
{
  "studentId": "idValue",
  "courseId": "idValue"
}
```

### Response: 201

```json
{
  "enrollment": {
    "studentId": "idValue",
    "courseId": "idValue",
    "_id": "idValue",
    "__v": 0
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /api/enrollments/student

### Get Student Enrollments

This endpoint retrieves the enrollments for a specific student. It makes an HTTP GET request to the specified URL. The response will have a status code of 200 and a content type of application/json. The response body will contain an array of enrollments, where each enrollment object includes the \_id, studentId, courseId, and \_\_v properties.

### Method: GET

> ```
> http://localhost:3000/api/enrollments/student
> ```

### Response: 200

```json
{
  "enrollments": [
    {
      "_id": "idValue",
      "studentId": "idValue",
      "courseId": "idValue",
      "__v": 0
    }
  ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /api/enrollments/course/:courseId

### Get Course Enrollments

This endpoint retrieves the enrollments for a specific course identified by the course ID. The response will contain an array of enrollment objects, each including the unique ID, student ID, course ID, and a version identifier.

### Method: GET

> ```
> http://localhost:3000/api/enrollments/course/:courseId
> ```

### Response: 200

```json
{
  "enrollments": [
    {
      "_id": "idValue",
      "studentId": "idValue",
      "courseId": "idValue",
      "__v": 0
    }
  ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /api/enrollments/remove

### Delete Enrollments (Admin and Faculty Only)

This endpoint is used to remove an enrollment by sending an HTTP DELETE request to the specified URL. The request should include the `studentId` and `courseId` in the payload. Upon successful execution, the endpoint returns a status code of 200 along with a JSON response containing a `message` indicating the outcome of the operation.

### Method: DELETE

> ```
> http://localhost:3000/api/enrollments/remove
> ```

### Body (**raw**)

```json
{
  "studentId": "idValue",
  "courseId": "idValue"
}
```

### Response: 200

```json
{
  "message": "Student removed from course successfully"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# Notification Management

## End-point: /api/notifications

### Create Notification (Admin Only)

This endpoint allows you to create a new notification by sending an HTTP POST request to the specified URL.

#### Request Body

- `message` (string, required): The message content of the notification.
- `recipients` (array of strings, optional): The list of recipients for the notification.

#### Response

Upon a successful creation, the server will respond with a status code of 201 and a JSON object containing the newly created notification, including its unique identifier, creation timestamp, and version.

Example:

```json
{
  "notification": {
    "message": "",
    "recipients": [""],
    "_id": "",
    "createdAt": "",
    "__v": 0
  }
}
```

### Method: POST

> ```
> http://localhost:3000/api/notifications
> ```

### Body (**raw**)

```json
{
  "message": "This is a sample message",
  "recipients": ["idValue"]
}
```

### Response: 201

```json
{
  "notification": {
    "message": "This is a sample message",
    "recipients": ["idValue"],
    "_id": "idValue",
    "createdAt": "2024-03-21T13:35:55.190Z",
    "__v": 0
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /api/notifications

### Get Notifications

This endpoint makes an HTTP GET request to retrieve a list of notifications.

#### Response

- Status: 200
- Content-Type: application/json

The response will contain an array of notifications, where each notification object includes the following fields:

- `_id` (string): The unique identifier for the notification.
- `message` (string): The content of the notification message.
- `recipients` (array of strings): The list of recipients for the notification.
- `createdAt` (string): The timestamp indicating when the notification was created.
- `__v` (number): Version control field.

### Method: GET

> ```
> http://localhost:3000/api/notifications
> ```

### Response: 200

```json
{
  "notifications": [
    {
      "_id": "idValue",
      "message": "Notification message",
      "recipients": ["idValue"],
      "createdAt": "2024-03-20T13:27:22.271Z",
      "__v": 0
    },
    {
      "_id": "idValue",
      "message": "This is a sample message",
      "recipients": ["idValue"],
      "createdAt": "2024-03-21T12:18:52.043Z",
      "__v": 0
    },
    {
      "_id": "idValue",
      "message": "This is a sample message",
      "recipients": ["idValue"],
      "createdAt": "2024-03-21T13:35:55.190Z",
      "__v": 0
    }
  ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /api/notifications/:notificationId

### Get Notification By Id

This endpoint retrieves a specific notification with the given ID. The response will be in JSON format and will include the notification details such as ID, message, recipients, creation timestamp, and version.

### Method: GET

> ```
> http://localhost:3000/api/notifications/:notificationId
> ```

### Response: 200

```json
{
  "notification": {
    "_id": "idValue",
    "message": "This is a sample message",
    "recipients": ["idValue"],
    "createdAt": "2024-03-21T12:18:52.043Z",
    "__v": 0
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /api/notifications/:notificationId/send

### Send Notification (Admin Only)

This API endpoint sends a POST request to [http://localhost:3000/api/notifications/:notificationId/send](http://localhost:3000/api/notifications/:notificationId/send) in order to send a notification. The request returns a JSON response with a status code of 200 and a message indicating the success or failure of the notification sending process.

### Method: POST

> ```
> http://localhost:3000/api/notifications/:notificationId/send
> ```

### Response: 200

```json
{
  "message": "Notification sent successfully"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# Resource Management

## End-point: /api/resources

### Add Resource (Admin Only)

This endpoint allows you to add a new resource.

#### Request Body

- name (string, required): The name of the resource.

#### Response

- Status: 201 Created
- Content-Type: application/json
- resource
  - name (string): The name of the resource.
  - \_id (string): The unique identifier for the resource.
  - \_\_v (number): Version number.

### Method: POST

> ```
> http://localhost:3000/api/resources
> ```

### Body (**raw**)

```json
{
  "name": "New Resource"
}
```

### Response: 201

```json
{
  "resource": {
    "name": "New Resource",
    "_id": "idValue",
    "__v": 0
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /api/resources

### Get Resources

This endpoint sends an HTTP GET request to retrieve a list of resources.

#### Response

- Status: 200
- Content-Type: application/json

The response will contain an array of resources, where each resource object includes the following properties:

- \_id (string)
- name (string)
- \_\_v (integer)

Example response:

```json
{
  "resources": [
    {
      "_id": "",
      "name": "",
      "__v": 0
    }
  ]
}
```

### Method: GET

> ```
> http://localhost:3000/api/resources
> ```

### Response: 200

```json
{
  "resources": [
    {
      "_id": "idValue",
      "name": "Projector",
      "__v": 0
    },
    {
      "_id": "idValue",
      "name": "Laptop",
      "__v": 0
    },
    {
      "_id": "idValue",
      "name": "New Item",
      "__v": 0
    },
    {
      "_id": "idValue",
      "name": "New Resource",
      "__v": 0
    }
  ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# Room Management

## End-point: /api/rooms

### Add Room (Admin Only)

This endpoint allows you to add a new room.

#### Request Body

- `name` (string, required): The name of the room.
- `capacity` (number, required): The capacity of the room.
- `resources` (array of strings, optional): The list of resources available in the room.
- `bookedSlots` (array of objects, required): The time slots that are already booked for the room, each containing:
  - `startTime` (string, required): The start time of the booked slot.
  - `endTime` (string, required): The end time of the booked slot.

#### Response

Upon successful creation, the endpoint returns a status code of 201 and a JSON object containing the details of the newly added room, including:

- `name` (string): The name of the room.
- `capacity` (number): The capacity of the room.
- `resources` (array of strings): The list of resources available in the room.
- `bookedSlots` (array of objects): The time slots that are already booked for the room, each containing:
  - `startTime` (string): The start time of the booked slot.
  - `endTime` (string): The end time of the booked slot.
  - `_id` (string): The unique identifier of the booked slot.
- `_id` (string): The unique identifier of the room.
- `__v` (number): Version key.

### Method: POST

> ```
> http://localhost:3000/api/rooms
> ```

### Body (**raw**)

```json
{
  "name": "201",
  "capacity": 50,
  "resources": ["Projector", "Whiteboard"],
  "bookedSlots": [
    {
      "startTime": "2024-03-19T17:42:44.799Z",
      "endTime": "2024-03-19T17:42:44.799Z"
    }
  ]
}
```

### Response: 201

```json
{
  "room": {
    "name": "201",
    "capacity": 50,
    "resources": ["Projector", "Whiteboard"],
    "bookedSlots": [
      {
        "startTime": "2024-03-19T17:42:44.799Z",
        "endTime": "2024-03-19T17:42:44.799Z",
        "_id": "idValue"
      }
    ],
    "_id": "idValue",
    "__v": 0
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /api/rooms

### Get All Rooms

This endpoint makes an HTTP GET request to retrieve a list of rooms. The response will be in JSON format and will include an array of room objects, where each room object contains the room ID, name, capacity, resources, and booked slots information.

### Method: GET

> ```
> http://localhost:3000/api/rooms
> ```

### Response: 200

```json
{
  "rooms": [
    {
      "_id": "idValue",
      "name": "101",
      "capacity": 50,
      "resources": [],
      "bookedSlots": [
        {
          "startTime": "2024-03-19T17:42:44.799Z",
          "endTime": "2024-03-19T17:42:44.799Z",
          "_id": "idValue"
        }
      ],
      "__v": 0
    },
    {
      "_id": "idValue",
      "name": "101",
      "capacity": 50,
      "resources": [],
      "bookedSlots": [
        {
          "startTime": "2024-03-19T17:42:44.799Z",
          "endTime": "2024-03-19T17:42:44.799Z",
          "_id": "idValue"
        }
      ],
      "__v": 0
    },
    {
      "_id": "idValue",
      "name": "102",
      "capacity": 30,
      "resources": [],
      "bookedSlots": [
        {
          "startTime": "2024-03-19T17:42:44.799Z",
          "endTime": "2024-03-19T17:42:44.799Z",
          "_id": "idValue"
        }
      ],
      "__v": 0
    },
    {
      "_id": "idValue",
      "name": "101",
      "capacity": 50,
      "resources": [],
      "bookedSlots": [
        {
          "startTime": "2024-03-19T17:42:44.799Z",
          "endTime": "2024-03-19T17:42:44.799Z",
          "_id": "idValue"
        }
      ],
      "__v": 0
    },
    {
      "_id": "idValue",
      "name": "102",
      "capacity": 40,
      "resources": [],
      "bookedSlots": [
        {
          "startTime": "2024-03-19T17:42:44.799Z",
          "endTime": "2024-03-19T17:42:44.799Z",
          "_id": "idValue"
        }
      ],
      "__v": 0
    },
    {
      "_id": "idValue",
      "name": "201",
      "capacity": 50,
      "resources": ["Projector", "Whiteboard"],
      "bookedSlots": [
        {
          "startTime": "2024-03-19T17:42:44.799Z",
          "endTime": "2024-03-19T17:42:44.799Z",
          "_id": "idValue"
        }
      ],
      "__v": 0
    }
  ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /api/rooms/:roomId

### Get Room By Id

This endpoint retrieves the details of a specific room identified by the provided ID. The response will include the room's name, capacity, resources available, and any booked time slots.

The response will have a status code of 200, indicating a successful request, and the content type will be in JSON format. The response body will contain the room details including its ID, name, capacity, resources, and booked time slots.

Example response:

```json
{
  "room": {
    "_id": "",
    "name": "",
    "capacity": 0,
    "resources": [""],
    "bookedSlots": [
      {
        "startTime": "",
        "endTime": "",
        "_id": ""
      }
    ],
    "__v": 0
  }
}
```

### Method: GET

> ```
> http://localhost:3000/api/rooms/:roomId
> ```

### Response: 200

```json
{
  "room": {
    "_id": "idValue",
    "name": "101",
    "capacity": 50,
    "resources": [],
    "bookedSlots": [
      {
        "startTime": "2024-03-19T17:42:44.799Z",
        "endTime": "2024-03-19T17:42:44.799Z",
        "_id": "idValue"
      }
    ],
    "__v": 0
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /api/rooms/:roomId

### Update Room Details (Admin Only)

This endpoint allows you to update the details of a specific room.

#### **Request**

- Method: PUT
- URL: `http://localhost:3000/api/rooms/:roomId`
- Headers:
  - Content-Type: application/json
- Body:
  ```json
  {
    "name": "",
    "capacity": 0,
    "resources": [""],
    "bookedSlots": [
      {
        "startTime": "",
        "endTime": ""
      }
    ]
  }
  ```

#### **Response**

- Status: 200
- Content-Type: application/json
- Body:
  ```json
  {
    "room": {
      "_id": "",
      "name": "",
      "capacity": 0,
      "resources": [""],
      "bookedSlots": [
        {
          "startTime": "",
          "endTime": "",
          "_id": ""
        }
      ],
      "__v": 0
    }
  }
  ```

### Method: PUT

> ```
> http://localhost:3000/api/rooms/:roomId
> ```

### Body (**raw**)

```json
{
  "name": "201{Updated}",
  "capacity": 100,
  "resources": ["Projector{Updated}", "Whiteboard{Updated}"],
  "bookedSlots": [
    {
      "startTime": "2024-03-19T17:42:44.799Z",
      "endTime": "2024-03-19T17:42:44.799Z"
    }
  ]
}
```

### Response: 200

```json
{
  "room": {
    "_id": "idValue",
    "name": "201{Updated}",
    "capacity": 100,
    "resources": ["Projector{Updated}", "Whiteboard{Updated}"],
    "bookedSlots": [
      {
        "startTime": "2024-03-19T17:42:44.799Z",
        "endTime": "2024-03-19T17:42:44.799Z",
        "_id": "idValue"
      }
    ],
    "__v": 0
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: /api/rooms/:roomId

### Delete a Room (Admin Only)

This endpoint sends an HTTP DELETE request to delete a specific room with the given ID. Upon successful execution, the API returns a status code of 200 along with a JSON response containing a message indicating the outcome of the operation.

### Method: DELETE

> ```
> http://localhost:3000/api/rooms/:roomId
> ```

### Response: 200

```json
{
  "message": "Room deleted successfully"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# Project Setup & Testing Instructions

## Prerequisites

Before starting, ensure you have the following installed on your local machine:

- Node.js (v14.x or higher)
- MongoDB
- Git
- Nodemon (Install this npm package globally)

## Setup Instructions

1. **Clone the Repository:**

```bash
git clone https://github.com/diaskalana/University-Timetable-Management-System.git
```

2. **Navigate to the Project Directory:**

```bash
cd University-Timetable-Management-System
```

3. **Install Dependencies:**

```bash
npm install
```

4. **Set Environment Variables:**

- Create a `.env` file in the root directory.
- Add the following environment variables:

  ```
  PORT=3000
  MONGODB_URI=your_mongodb_uri
  JWT_SECRET=your_jwt_secret

  MAIL_USERNAME=your_email_username
  MAIL_PASSWORD=your_email_password
  OAUTH_CLIENTID=your_client_id
  OAUTH_CLIENT_SECRET=your_client_secret
  OAUTH_REFRESH_TOKEN=your_oauth_refresh_token
  ```

5. **Start the Server:**

```bash
npm run dev
```

6. **Access the API:**
   The API will be accessible at `http://localhost:3000/`.

## Testing

To run unit tests, execute the following command:

```bash
npm test
```

To run performance tests, execute the following command:

```bash
npm run load-test
```
