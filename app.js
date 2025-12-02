// Mock data - Dữ liệu mẫu thay thế cho API thật
let students = [
    {
        id: "550e8400-e29b-41d4-a716-446655440000",
        studentCode: "SV001",
        fullName: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        phone: "0901234567",
        dateOfBirth: "2002-05-15",
        major: "Computer Science",
        gpa: 3.75,
        enrollmentYear: 2020,
        createdAt: "2020-09-01T08:00:00Z",
        updatedAt: "2024-11-20T10:30:00Z"
    },
    {
        id: "660e8400-e29b-41d4-a716-446655440001",
        studentCode: "SV002",
        fullName: "Trần Thị B",
        email: "tranthib@example.com",
        phone: "0907654321",
        dateOfBirth: "2003-08-20",
        major: "Software Engineering",
        gpa: 3.65,
        enrollmentYear: 2021,
        createdAt: "2021-09-01T08:00:00Z",
        updatedAt: "2024-11-20T10:30:00Z"
    },
    {
        id: "770e8400-e29b-41d4-a716-446655440002",
        studentCode: "SV003",
        fullName: "Lê Văn C",
        email: "levanc@example.com",
        phone: "0909876543",
        dateOfBirth: "2003-03-10",
        major: "Information Technology",
        gpa: 3.50,
        enrollmentYear: 2021,
        createdAt: "2021-09-01T08:00:00Z",
        updatedAt: "2024-11-20T10:30:00Z"
    }
];

// Chuyển đổi tab
function switchTab(tabName) {
    // Ẩn tất cả tab content
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Bỏ active khỏi tất cả tab buttons
    document.querySelectorAll('.tab').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Hiển thị tab được chọn
    document.getElementById(`${tabName}-tab`).classList.add('active');
    event.target.classList.add('active');
}

// Hiển thị thông báo
function showAlert(message, type = 'success') {
    const alertContainer = document.getElementById('alert-container');
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alertContainer.innerHTML = '';
    alertContainer.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// Tạo UUID đơn giản
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Load danh sách sinh viên
function loadStudents() {
    const major = document.getElementById('filter-major').value;
    const sortBy = document.getElementById('sort-by').value;
    
    let filteredStudents = [...students];
    
    // Lọc theo chuyên ngành
    if (major) {
        filteredStudents = filteredStudents.filter(s => s.major === major);
    }
    
    // Sắp xếp
    filteredStudents.sort((a, b) => {
        if (sortBy === 'gpa') {
            return b.gpa - a.gpa;
        } else if (sortBy === 'enrollmentYear') {
            return b.enrollmentYear - a.enrollmentYear;
        } else {
            return a.fullName.localeCompare(b.fullName);
        }
    });
    
    displayStudents(filteredStudents);
}

// Hiển thị danh sách sinh viên
function displayStudents(studentList) {
    const container = document.getElementById('students-list');
    
    if (studentList.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                </svg>
                <h3>Không có sinh viên nào</h3>
                <p>Hãy thêm sinh viên mới để bắt đầu</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = studentList.map(student => `
        <div class="student-card">
            <h3>${student.fullName}</h3>
            <div class="student-info"><strong>Mã SV:</strong> ${student.studentCode}</div>
            <div class="student-info"><strong>Email:</strong> ${student.email}</div>
            <div class="student-info"><strong>SĐT:</strong> ${student.phone}</div>
            <div class="student-info"><strong>Ngày sinh:</strong> ${formatDate(student.dateOfBirth)}</div>
            <div class="student-info"><strong>Chuyên ngành:</strong> ${student.major}</div>
            <div class="student-info"><strong>GPA:</strong> ${student.gpa.toFixed(2)}</div>
            <div class="student-info"><strong>Năm nhập học:</strong> ${student.enrollmentYear}</div>
            <div class="card-actions">
                <button class="btn btn-small btn-edit" onclick="editStudent('${student.id}')">✏️ Sửa</button>
                <button class="btn btn-small btn-delete" onclick="deleteStudent('${student.id}')">🗑️ Xóa</button>
            </div>
        </div>
    `).join('');
}

// Format ngày
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

// Thêm sinh viên mới
function addStudent(event) {
    event.preventDefault();
    
    const newStudent = {
        id: generateUUID(),
        studentCode: document.getElementById('add-studentCode').value,
        fullName: document.getElementById('add-fullName').value,
        email: document.getElementById('add-email').value,
        phone: document.getElementById('add-phone').value,
        dateOfBirth: document.getElementById('add-dateOfBirth').value,
        major: document.getElementById('add-major').value,
        gpa: parseFloat(document.getElementById('add-gpa').value) || 0,
        enrollmentYear: parseInt(document.getElementById('add-enrollmentYear').value),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    // Kiểm tra trùng mã sinh viên
    if (students.some(s => s.studentCode === newStudent.studentCode)) {
        showAlert('Mã sinh viên đã tồn tại!', 'error');
        return;
    }
    
    // Kiểm tra trùng email
    if (students.some(s => s.email === newStudent.email)) {
        showAlert('Email đã được sử dụng!', 'error');
        return;
    }
    
    students.push(newStudent);
    showAlert('Thêm sinh viên thành công!');
    document.getElementById('add-form').reset();
    
    // Chuyển sang tab danh sách
    switchTab('list');
    loadStudents();
}

// Tìm kiếm sinh viên theo ID
function searchStudent() {
    const id = document.getElementById('search-id').value.trim();
    const resultContainer = document.getElementById('search-result');
    
    if (!id) {
        showAlert('Vui lòng nhập ID sinh viên!', 'error');
        return;
    }
    
    const student = students.find(s => s.id === id);
    
    if (!student) {
        resultContainer.innerHTML = `
            <div class="alert alert-error">
                Không tìm thấy sinh viên với ID: ${id}
            </div>
        `;
        return;
    }
    
    resultContainer.innerHTML = `
        <div class="student-card">
            <h3>${student.fullName}</h3>
            <div class="student-info"><strong>ID:</strong> ${student.id}</div>
            <div class="student-info"><strong>Mã SV:</strong> ${student.studentCode}</div>
            <div class="student-info"><strong>Email:</strong> ${student.email}</div>
            <div class="student-info"><strong>SĐT:</strong> ${student.phone}</div>
            <div class="student-info"><strong>Ngày sinh:</strong> ${formatDate(student.dateOfBirth)}</div>
            <div class="student-info"><strong>Chuyên ngành:</strong> ${student.major}</div>
            <div class="student-info"><strong>GPA:</strong> ${student.gpa.toFixed(2)}</div>
            <div class="student-info"><strong>Năm nhập học:</strong> ${student.enrollmentYear}</div>
            <div class="card-actions">
                <button class="btn btn-small btn-edit" onclick="editStudent('${student.id}')">✏️ Sửa</button>
                <button class="btn btn-small btn-delete" onclick="deleteStudent('${student.id}')">🗑️ Xóa</button>
            </div>
        </div>
    `;
}

// Sửa sinh viên
function editStudent(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;
    
    const newName = prompt('Nhập tên mới:', student.fullName);
    if (newName && newName.trim()) {
        student.fullName = newName.trim();
        student.updatedAt = new Date().toISOString();
        showAlert('Cập nhật thành công!');
        loadStudents();
    }
}

// Xóa sinh viên
function deleteStudent(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;
    
    if (confirm(`Bạn có chắc muốn xóa sinh viên ${student.fullName}?`)) {
        students = students.filter(s => s.id !== id);
        showAlert('Xóa sinh viên thành công!');
        loadStudents();
    }
}

// Load danh sách khi trang được tải
window.addEventListener('DOMContentLoaded', () => {
    loadStudents();
});
