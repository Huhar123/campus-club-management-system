const API_BASE = 'http://localhost:8080';
let allClubs = [];

// 获取当前登录学生ID
function getCurrentStudentId() {
    return sessionStorage.getItem('studentId');
}

// 获取当前登录学生学号
function getCurrentStudentNum() {
    return sessionStorage.getItem('studentNum');
}

// 退出登录
function logout() {
    sessionStorage.clear();
    window.location.href = '/login';
}

// 加载社团列表
function loadClubs() {
    fetch(API_BASE + '/api/club/list')
        .then(res => res.json())
        .then(data => {
            allClubs = data;
            renderTable(allClubs);
        })
        .catch(err => console.error('加载失败:', err));
}

// 搜索社团
function searchClub() {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    const filtered = allClubs.filter(club =>
        club.clubName.toLowerCase().includes(keyword)
    );
    renderTable(filtered);
}

// 渲染表格
function renderTable(clubs) {
    const tbody = document.getElementById('clubTableBody');
    const studentId = getCurrentStudentId();

    if (!clubs || clubs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6">暂无社团数据</td></tr>';
        return;
    }

    fetch(API_BASE + '/api/register/student/' + studentId)
        .then(res => res.json())
        .then(registers => {
            const statusMap = {};
            registers.forEach(reg => {
                if (reg.club && reg.club.clubId) {
                    statusMap[reg.club.clubId] = reg.registerStatus;
                }
            });

            tbody.innerHTML = clubs.map(club => {
                const status = statusMap[club.clubId] || '未报名';
                let statusClass = 'status-badge';
                if (status === '已报名') statusClass += ' status-registered';
                else if (status === '已入团') statusClass += ' status-joined';
                else if (status === '已取消') statusClass += ' status-cancelled';
                else statusClass += ' status-unregistered';

                let registerButtons = '';
                if (status === '未报名') {
                    registerButtons = `<button class="btn-register" onclick="applyClub(${club.clubId})">报名</button>`;
                } else {
                    registerButtons = `
                        <select class="status-select" onchange="changeStatus(${club.clubId}, this.value)">
                            <option value="">修改状态</option>
                            <option value="已报名" ${status === '已报名' ? 'selected' : ''}>已报名</option>
                            <option value="已入团" ${status === '已入团' ? 'selected' : ''}>已入团</option>
                            <option value="已取消" ${status === '已取消' ? 'selected' : ''}>已取消</option>
                        </select>
                    `;
                }

                const manageButtons = `
                    <button class="btn-edit" onclick="editClub(${club.clubId}, '${club.clubName}', '${club.clubType || ''}')">编辑</button>
                    <button class="btn-delete" onclick="deleteClub(${club.clubId})">删除</button>
                `;

                return `
                    <tr>
                        <td>${club.clubId}</td>
                        <td>${club.clubName}</td>
                        <td>${club.clubType || '-'}</td>
                        <td><span class="${statusClass}">${status}</span></td>
                        <td>${registerButtons}</td>
                        <td>${manageButtons}</td>
                    </tr>
                `;
            }).join('');
        })
        .catch(err => {
            console.error('获取报名记录失败:', err);
            tbody.innerHTML = clubs.map(club => `
                <tr>
                    <td>${club.clubId}</td>
                    <td>${club.clubName}</td>
                    <td>${club.clubType || '-'}</td>
                    <td><span class="status-badge">未知</span></td>
                    <td><button class="btn-register" onclick="applyClub(${club.clubId})">报名</button></td>
                    <td>
                        <button class="btn-edit" onclick="editClub(${club.clubId}, '${club.clubName}', '${club.clubType || ''}')">编辑</button>
                        <button class="btn-delete" onclick="deleteClub(${club.clubId})">删除</button>
                    </td>
                </tr>
            `).join('');
        });
}

// 新增社团
function addClub() {
    const clubName = document.getElementById('clubName').value;
    const clubType = document.getElementById('clubType').value;

    if (!clubName) {
        alert('请输入社团名称');
        return;
    }

    fetch(API_BASE + '/api/club/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clubName, clubType })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('添加成功');
                document.getElementById('clubName').value = '';
                document.getElementById('clubType').value = '';
                loadClubs();
            } else {
                alert('添加失败：' + data.message);
            }
        })
        .catch(err => alert('请求失败：' + err));
}

// 报名社团
function applyClub(clubId) {
    const studentId = getCurrentStudentId();
    if (!studentId) {
        alert('请先登录');
        window.location.href = '/login';
        return;
    }

    fetch(API_BASE + '/api/register/add?studentId=' + studentId + '&clubId=' + clubId, {
        method: 'POST'
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('报名成功');
                loadClubs();
            } else {
                alert('报名失败：' + data.message);
            }
        })
        .catch(err => alert('请求失败：' + err));
}

// 修改状态
function changeStatus(clubId, newStatus) {
    if (!newStatus) return;

    const studentId = getCurrentStudentId();
    if (!studentId) {
        alert('请先登录');
        window.location.href = '/login';
        return;
    }

    fetch(API_BASE + '/api/register/find?studentId=' + studentId + '&clubId=' + clubId)
        .then(res => res.json())
        .then(data => {
            if (data.registerId) {
                return fetch(API_BASE + '/api/register/status?registerId=' + data.registerId + '&newStatus=' + encodeURIComponent(newStatus), {
                    method: 'PUT'
                });
            } else {
                throw new Error('未找到报名记录');
            }
        })
        .then(res => res.json())
        .then(result => {
            if (result.success) {
                alert('状态修改成功');
                loadClubs();
            } else {
                alert('修改失败：' + result.message);
            }
        })
        .catch(err => {
            console.error('修改状态失败:', err);
            alert('修改失败：' + err.message);
        });
}

// 编辑社团
function editClub(clubId, clubName, clubType) {
    const newName = prompt('请输入新的社团名称', clubName);
    if (newName === null) return;
    if (newName.trim() === '') {
        alert('社团名称不能为空');
        return;
    }

    const newType = prompt('请输入新的社团类型', clubType || '');
    if (newType === null) return;

    fetch(API_BASE + '/api/club/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            clubId: clubId,
            clubName: newName.trim(),
            clubType: newType.trim()
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('修改成功');
                loadClubs();
            } else {
                alert('修改失败：' + data.message);
            }
        })
        .catch(err => {
            console.error('编辑失败:', err);
            alert('请求失败：' + err.message);
        });
}

// 删除社团
function deleteClub(clubId) {
    if (!confirm('确定要删除该社团吗？删除后相关报名记录也会被删除！')) {
        return;
    }

    fetch(API_BASE + '/api/club/delete/' + clubId, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('删除成功');
                loadClubs();
            } else {
                alert('删除失败：' + data.message);
            }
        })
        .catch(err => {
            console.error('删除失败:', err);
            alert('请求失败：' + err.message);
        });
}

// 页面加载
window.onload = function() {
    if (!getCurrentStudentId()) {
        window.location.href = '/login';
        return;
    }

    // 显示用户角色
    const studentId = getCurrentStudentId();
    const roleSpan = document.getElementById('userRole');
    if (roleSpan) {
        if (studentId === '1') {
            roleSpan.textContent = '👑 管理员';
        } else {
            roleSpan.textContent = '👤 普通用户';
            // 普通用户隐藏账号管理按钮
            const accountBtn = document.querySelector('.btn-account');
            if (accountBtn) accountBtn.style.display = 'none';
        }
    }

    loadClubs();
};