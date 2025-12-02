# RESTful API - Hệ Thống Quản Lý Sinh Viên

## Base URL
```
https://api.example.com/v1
```

## Data Model - Student Object
```json
{
  "id": "string (UUID)",
  "studentCode": "string",
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "dateOfBirth": "string (ISO 8601)",
  "major": "string",
  "gpa": "number (0-4.0)",
  "enrollmentYear": "number",
  "createdAt": "string (ISO 8601)",
  "updatedAt": "string (ISO 8601)"
}
```

---

## 1. Lấy Danh Sách Tất Cả Sinh Viên

### Endpoint
```
GET /students
```

### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | integer | No | Số trang (default: 1) |
| limit | integer | No | Số lượng/trang (default: 20, max: 100) |
| major | string | No | Lọc theo chuyên ngành |
| sortBy | string | No | Sắp xếp theo field (gpa, fullName, enrollmentYear) |
| order | string | No | asc hoặc desc (default: asc) |

### Request Example
```http
GET /students?page=1&limit=20&major=Computer%20Science&sortBy=gpa&order=desc
```

### Response Success (200 OK)
```json
{
  "success": true,
  "data": {
    "students": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "studentCode": "SV001",
        "fullName": "Nguyễn Văn A",
        "email": "nguyenvana@example.com",
        "phone": "0901234567",
        "dateOfBirth": "2002-05-15",
        "major": "Computer Science",
        "gpa": 3.75,
        "enrollmentYear": 2020,
        "createdAt": "2020-09-01T08:00:00Z",
        "updatedAt": "2024-11-20T10:30:00Z"
      },
      {
        "id": "660e8400-e29b-41d4-a716-446655440001",
        "studentCode": "SV002",
        "fullName": "Trần Thị B",
        "email": "tranthib@example.com",
        "phone": "0907654321",
        "dateOfBirth": "2003-08-20",
        "major": "Computer Science",
        "gpa": 3.65,
        "enrollmentYear": 2021,
        "createdAt": "2021-09-01T08:00:00Z",
        "updatedAt": "2024-11-20T10:30:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 100,
      "itemsPerPage": 20
    }
  }
}
```

### Response Errors
**400 Bad Request** - Tham số không hợp lệ
```json
{
  "success": false,
  "error": {
    "code": "INVALID_PARAMETERS",
    "message": "Tham số không hợp lệ",
    "details": [
      {
        "field": "limit",
        "message": "Limit phải từ 1 đến 100"
      }
    ]
  }
}
```

**500 Internal Server Error** - Lỗi server
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Đã xảy ra lỗi hệ thống"
  }
}
```

---

## 2. Lấy Thông Tin Một Sinh Viên Theo ID

### Endpoint
```
GET /students/{id}
```

### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string (UUID) | Yes | ID của sinh viên |

### Request Example
```http
GET /students/550e8400-e29b-41d4-a716-446655440000
```

### Response Success (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "studentCode": "SV001",
    "fullName": "Nguyễn Văn A",
    "email": "nguyenvana@example.com",
    "phone": "0901234567",
    "dateOfBirth": "2002-05-15",
    "major": "Computer Science",
    "gpa": 3.75,
    "enrollmentYear": 2020,
    "createdAt": "2020-09-01T08:00:00Z",
    "updatedAt": "2024-11-20T10:30:00Z"
  }
}
```

### Response Errors
**404 Not Found** - Không tìm thấy sinh viên
```json
{
  "success": false,
  "error": {
    "code": "STUDENT_NOT_FOUND",
    "message": "Không tìm thấy sinh viên với ID: 550e8400-e29b-41d4-a716-446655440000"
  }
}
```

**400 Bad Request** - ID không hợp lệ
```json
{
  "success": false,
  "error": {
    "code": "INVALID_ID",
    "message": "ID sinh viên không đúng định dạng UUID"
  }
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Đã xảy ra lỗi hệ thống"
  }
}
```

---

## 3. Thêm Sinh Viên Mới

### Endpoint
```
POST /students
```

### Request Headers
```
Content-Type: application/json
```

### Request Body
```json
{
  "studentCode": "SV003",
  "fullName": "Lê Văn C",
  "email": "levanc@example.com",
  "phone": "0909876543",
  "dateOfBirth": "2003-03-10",
  "major": "Software Engineering",
  "gpa": 3.50,
  "enrollmentYear": 2021
}
```

### Field Validation Rules
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| studentCode | string | Yes | Unique, 3-20 ký tự |
| fullName | string | Yes | 2-100 ký tự |
| email | string | Yes | Định dạng email hợp lệ, unique |
| phone | string | Yes | 10-11 số |
| dateOfBirth | string | Yes | ISO 8601, tuổi từ 16-100 |
| major | string | Yes | 2-100 ký tự |
| gpa | number | No | 0.0-4.0 (default: 0.0) |
| enrollmentYear | number | Yes | Năm hợp lệ (1900-hiện tại) |

### Response Success (201 Created)
```json
{
  "success": true,
  "data": {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "studentCode": "SV003",
    "fullName": "Lê Văn C",
    "email": "levanc@example.com",
    "phone": "0909876543",
    "dateOfBirth": "2003-03-10",
    "major": "Software Engineering",
    "gpa": 3.50,
    "enrollmentYear": 2021,
    "createdAt": "2024-12-02T08:00:00Z",
    "updatedAt": "2024-12-02T08:00:00Z"
  },
  "message": "Thêm sinh viên thành công"
}
```

### Response Errors
**400 Bad Request** - Dữ liệu không hợp lệ
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu không hợp lệ",
    "details": [
      {
        "field": "email",
        "message": "Email không đúng định dạng"
      },
      {
        "field": "gpa",
        "message": "GPA phải từ 0.0 đến 4.0"
      }
    ]
  }
}
```

**409 Conflict** - Dữ liệu trùng lặp
```json
{
  "success": false,
  "error": {
    "code": "DUPLICATE_ENTRY",
    "message": "Sinh viên đã tồn tại",
    "details": [
      {
        "field": "studentCode",
        "message": "Mã sinh viên SV003 đã được sử dụng"
      }
    ]
  }
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Đã xảy ra lỗi khi tạo sinh viên"
  }
}
```

---

## 4. Cập Nhật Thông Tin Sinh Viên

### Endpoint
```
PUT /students/{id}
```

### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string (UUID) | Yes | ID của sinh viên |

### Request Headers
```
Content-Type: application/json
```

### Request Body
```json
{
  "fullName": "Nguyễn Văn A (Updated)",
  "email": "nguyenvana.new@example.com",
  "phone": "0901234999",
  "dateOfBirth": "2002-05-15",
  "major": "Computer Science",
  "gpa": 3.85,
  "enrollmentYear": 2020
}
```

**Lưu ý:** 
- Không thể cập nhật `studentCode` (immutable)
- Tất cả các field đều optional, chỉ gửi field cần cập nhật
- Validation rules giống như POST

### Response Success (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "studentCode": "SV001",
    "fullName": "Nguyễn Văn A (Updated)",
    "email": "nguyenvana.new@example.com",
    "phone": "0901234999",
    "dateOfBirth": "2002-05-15",
    "major": "Computer Science",
    "gpa": 3.85,
    "enrollmentYear": 2020,
    "createdAt": "2020-09-01T08:00:00Z",
    "updatedAt": "2024-12-02T09:15:00Z"
  },
  "message": "Cập nhật sinh viên thành công"
}
```

### Response Errors
**400 Bad Request** - Dữ liệu không hợp lệ
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu không hợp lệ",
    "details": [
      {
        "field": "phone",
        "message": "Số điện thoại phải có 10-11 chữ số"
      }
    ]
  }
}
```

**404 Not Found** - Không tìm thấy sinh viên
```json
{
  "success": false,
  "error": {
    "code": "STUDENT_NOT_FOUND",
    "message": "Không tìm thấy sinh viên với ID: 550e8400-e29b-41d4-a716-446655440000"
  }
}
```

**409 Conflict** - Email trùng lặp
```json
{
  "success": false,
  "error": {
    "code": "DUPLICATE_ENTRY",
    "message": "Email đã được sử dụng bởi sinh viên khác"
  }
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Đã xảy ra lỗi khi cập nhật sinh viên"
  }
}
```

---

## 5. Xóa Sinh Viên Theo ID

### Endpoint
```
DELETE /students/{id}
```

### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string (UUID) | Yes | ID của sinh viên |

### Request Example
```http
DELETE /students/550e8400-e29b-41d4-a716-446655440000
```

### Response Success (200 OK)
```json
{
  "success": true,
  "message": "Xóa sinh viên thành công",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "deletedAt": "2024-12-02T10:00:00Z"
  }
}
```

### Alternative Success (204 No Content)
Không có response body, chỉ trả về status code 204.

### Response Errors
**404 Not Found** - Không tìm thấy sinh viên
```json
{
  "success": false,
  "error": {
    "code": "STUDENT_NOT_FOUND",
    "message": "Không tìm thấy sinh viên với ID: 550e8400-e29b-41d4-a716-446655440000"
  }
}
```

**400 Bad Request** - ID không hợp lệ
```json
{
  "success": false,
  "error": {
    "code": "INVALID_ID",
    "message": "ID sinh viên không đúng định dạng UUID"
  }
}
```

**409 Conflict** - Không thể xóa do ràng buộc
```json
{
  "success": false,
  "error": {
    "code": "CANNOT_DELETE",
    "message": "Không thể xóa sinh viên do có dữ liệu liên quan (điểm, học phí...)"
  }
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Đã xảy ra lỗi khi xóa sinh viên"
  }
}
```

---

## Tổng Hợp Mã Lỗi HTTP

| Status Code | Mô Tả | Khi Nào Sử Dụng |
|-------------|-------|------------------|
| 200 OK | Thành công | GET, PUT, DELETE thành công |
| 201 Created | Tạo mới thành công | POST thành công |
| 204 No Content | Thành công không có nội dung | DELETE thành công (alternative) |
| 400 Bad Request | Yêu cầu không hợp lệ | Validation lỗi, tham số sai |
| 404 Not Found | Không tìm thấy | Resource không tồn tại |
| 409 Conflict | Xung đột dữ liệu | Trùng lặp, ràng buộc |
| 500 Internal Server Error | Lỗi server | Lỗi hệ thống, database |

## Authentication & Authorization (Khuyến nghị)

Nên thêm authentication header cho tất cả requests:
```http
Authorization: Bearer <access_token>
```

Các mã lỗi bổ sung:
- **401 Unauthorized**: Token không hợp lệ hoặc hết hạn
- **403 Forbidden**: Không có quyền truy cập

## Rate Limiting (Khuyến nghị)

Response headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1638446400
```

Mã lỗi:
- **429 Too Many Requests**: Vượt quá giới hạn request

## Versioning

API sử dụng versioning qua URL: `/v1/students`

Khi có breaking changes, tăng version: `/v2/students`
