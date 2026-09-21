const API_BASE = 'http://localhost:8080';

// 获取当前登录学生ID
function getCurrentStudentId() {
    return sessionStorage.getItem('studentId');
}

// 获取当前登录学生姓名
function getCurrentStudentName() {
    return sessionStorage.getItem('studentName');
}

// 退出登录
function logout() {
    sessionStorage.clear();
    window.location.href = '/login';
}

// 显示用户角色
function displayRole() {
    const studentId = getCurrentStudentId();
    const roleSpan = document.getElementById('userRole');
    if (studentId === '1') {
        roleSpan.textContent = '👑 管理员';
    } else {
        roleSpan.textContent = '👤 普通用户';
    }
}

// 加载学生列表
function loadStudents() {
    fetch(API_BASE + '/api/student/list')
        .then(res => res.json())
        .then(data => {
            renderTable(data);
        })
        .catch(err => {
            console.error('加载失败:', err);
            document.getElementById('studentTableBody').innerHTML = '<tr><td colspan="5">加载失败</td></tr>';
        });
}

// 渲染表格
function renderTable(students) {
    const tbody = document.getElementById('studentTableBody');
    if (!students || students.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5">暂无学生数据</td></tr>';
        return;
    }

    tbody.innerHTML = students.map(student => {
        const isAdmin = student.studentId === 1;
        const role = isAdmin ? '管理员' : '普通用户';
        const roleClass = isAdmin ? 'role-admin' : 'role-user';
        const disabled = isAdmin ? 'disabled' : '';

        return `
            <tr>
                <td>${student.studentId}</td>
                <td>${student.studentName}</td>
                <td>${student.studentNum}</td>
                <td><span class="${roleClass}">${role}</span></td>
                <td>
                    <button class="btn-edit" onclick="resetPassword(${student.studentId})" ${disabled}>重置密码</button>
                    <button class="btn-delete" onclick="deleteStudent(${student.studentId})" ${disabled}>删除</button>
                </td>
            </tr>
        `;
    }).join('');
}

// 添加学生
function addStudent() {
    const studentName = document.getElementById('newStudentName').value.trim();
    const studentNum = document.getElementById('newStudentNum').value.trim();
    const password = document.getElementById('newStudentPwd').value.trim() || '123456';

    if (!studentName || !studentNum) {
        alert('请填写姓名和学号');
        return;
    }

    fetch(API_BASE + '/api/student/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentName, studentNum, password })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('添加成功');
                document.getElementById('newStudentName').value = '';
                document.getElementById('newStudentNum').value = '';
                document.getElementById('newStudentPwd').value = '';
                loadStudents();
            } else {
                alert('添加失败：' + data.message);
            }
        })
        .catch(err => alert('请求失败：' + err));
}

// 重置密码
function resetPassword(studentId) {
    if (!confirm('确定要重置该学生的密码为 123456 吗？')) return;

    fetch(API_BASE + '/api/student/reset/' + studentId, {
        method: 'PUT'
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('密码重置成功，新密码为：123456');
            } else {
                alert('重置失败：' + data.message);
            }
        })
        .catch(err => alert('请求失败：' + err));
}

// 删除学生
function deleteStudent(studentId) {
    if (!confirm('确定要删除该学生吗？删除后相关报名记录也会被删除！')) return;

    fetch(API_BASE + '/api/student/delete/' + studentId, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('删除成功');
                loadStudents();
            } else {
                alert('删除失败：' + data.message);
            }
        })
        .catch(err => alert('请求失败：' + err));
}

// 页面加载
window.onload = function() {
    const studentId = getCurrentStudentId();
    if (!studentId) {
        window.location.href = '/login';
        return;
    }
    // 只有管理员才能访问此页面
    if (studentId !== '1') {
        alert('您不是管理员，无权访问！');
        window.location.href = '/club';
        return;
    }
    displayRole();
    loadStudents();
};