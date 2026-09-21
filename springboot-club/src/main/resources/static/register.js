
// 生成随机验证码
function generateCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
    let captcha = '';
    for (let i = 0; i < 4; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('captchaCode').innerText = captcha;
    return captcha;
}

window.onload = function() {
    generateCaptcha();
};

function validatePassword() {
    const password = document.getElementById('password').value;
    const pwdError = document.getElementById('pwdError');
    if (password.length === 0) {
        pwdError.innerText = '';
        return false;
    }
    if (password.length < 6) {
        pwdError.innerText = '❌ 密码长度至少6位';
        pwdError.className = 'error-msg';
        return false;
    }
    pwdError.innerText = '✓ 密码格式正确';
    pwdError.className = 'success-msg';
    return true;
}

function validateConfirmPassword() {
    const password = document.getElementById('password').value;
    const confirmPwd = document.getElementById('confirmPwd').value;
    const confirmError = document.getElementById('confirmError');
    if (confirmPwd.length === 0) {
        confirmError.innerText = '';
        return false;
    }
    if (password !== confirmPwd) {
        confirmError.innerText = '❌ 两次密码不一致';
        confirmError.className = 'error-msg';
        return false;
    }
    confirmError.innerText = '✓ 两次密码一致';
    confirmError.className = 'success-msg';
    return true;
}

function validateCaptcha() {
    const captchaInput = document.getElementById('captchaInput').value;
    const captchaCode = document.getElementById('captchaCode').innerText;
    const captchaError = document.getElementById('captchaError');
    if (captchaInput.length === 0) {
        captchaError.innerText = '';
        return false;
    }
    if (captchaInput.toUpperCase() !== captchaCode) {
        captchaError.innerText = '❌ 验证码错误';
        captchaError.className = 'error-msg';
        return false;
    }
    captchaError.innerText = '✓ 验证码正确';
    captchaError.className = 'success-msg';
    return true;
}

function register() {
    const isValidPwd = validatePassword();
    const isValidConfirm = validateConfirmPassword();
    const isValidCaptcha = validateCaptcha();

    if (!isValidPwd || !isValidConfirm || !isValidCaptcha) {
        alert('请正确填写表单');
        return;
    }

    const student = {
        studentName: document.getElementById('studentName').value,
        studentNum: document.getElementById('studentNum').value,
        password: document.getElementById('password').value
    };

    fetch('http://localhost:8080/api/student/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('注册成功！请登录');
                window.location.href = '/login';
            } else {
                alert('注册失败：' + data.message);
            }
        })
        .catch(err => {
            alert('请求失败：' + err);
        });
}

function resetForm() {
    document.getElementById('studentName').value = '';
    document.getElementById('studentNum').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirmPwd').value = '';
    document.getElementById('captchaInput').value = '';
    document.getElementById('pwdError').innerText = '';
    document.getElementById('confirmError').innerText = '';
    document.getElementById('captchaError').innerText = '';
    generateCaptcha();
}

document.getElementById('password').addEventListener('input', validatePassword);
document.getElementById('confirmPwd').addEventListener('input', validateConfirmPassword);
document.getElementById('captchaInput').addEventListener('input', validateCaptcha);