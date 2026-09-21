function doLogin() {
    const studentNum = document.getElementById('studentNum').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('loginError');

    if (!studentNum || !password) {
        loginError.innerText = '请填写学号和密码';
        return;
    }

    // 调用登录验证接口（需要后端实现）
    fetch('http://localhost:8080/api/student/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentNum: studentNum, password: password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // 保存学生信息到 sessionStorage
                sessionStorage.setItem('studentId', data.studentId);
                sessionStorage.setItem('studentName', data.studentName);
                window.location.href = '/club';
            } else {
                loginError.innerText = data.message || '登录失败';
                loginError.className = 'error-msg';
            }
        })
        .catch(err => {
            loginError.innerText = '请求失败：' + err;
        });
}

// 回车登录
document.getElementById('password').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') doLogin();
});