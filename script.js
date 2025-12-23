// 当前选中的图表ID
let currentChartId = null;

// 打开上传图片模态框
function openUploadModal(chartId) {
    currentChartId = chartId;
    document.getElementById('uploadModal').style.display = 'block';
}

// 打开嵌入代码模态框
function openCodeModal(chartId) {
    currentChartId = chartId;
    document.getElementById('codeModal').style.display = 'block';
}

// 关闭模态框
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    currentChartId = null;
    
    // 重置表单
    if (modalId === 'uploadModal') {
        document.getElementById('imageUpload').value = '';
    } else if (modalId === 'codeModal') {
        document.getElementById('codeInput').value = '';
    }
}

// 上传图片并替换图表
function uploadImage() {
    const fileInput = document.getElementById('imageUpload');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('请选择一张图片');
        return;
    }
    
    // 检查文件类型
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        alert('请选择有效的图片文件（JPEG、PNG、GIF、WebP）');
        return;
    }
    
    // 创建文件读取器
    const reader = new FileReader();
    
    reader.onload = function(e) {
        // 获取当前图表内容容器
        const chartContent = document.querySelector(`#chart-${currentChartId} .chart-content`);
        
        if (chartContent) {
            // 创建新的图片元素
            const newImage = document.createElement('img');
            newImage.src = e.target.result;
            newImage.alt = `图表${currentChartId}`;
            newImage.className = 'chart-image';
            
            // 清空容器并添加新图片
            chartContent.innerHTML = '';
            chartContent.appendChild(newImage);
            
            // 关闭模态框
            closeModal('uploadModal');
            
            alert('图片上传成功');
        }
    };
    
    reader.onerror = function() {
        alert('图片读取失败');
    };
    
    // 读取文件
    reader.readAsDataURL(file);
}

// 嵌入代码并替换图表
function embedCode() {
    const codeInput = document.getElementById('codeInput');
    const code = codeInput.value.trim();
    
    if (!code) {
        alert('请输入要嵌入的代码');
        return;
    }
    
    // 获取当前图表内容容器
    const chartContent = document.querySelector(`#chart-${currentChartId} .chart-content`);
    
    if (chartContent) {
        // 清空容器并添加代码内容
        chartContent.innerHTML = code;
        
        // 关闭模态框
        closeModal('codeModal');
        
        alert('代码嵌入成功');
    }
}

// 点击模态框外部关闭模态框
window.onclick = function(event) {
    const uploadModal = document.getElementById('uploadModal');
    const codeModal = document.getElementById('codeModal');
    
    if (event.target === uploadModal) {
        closeModal('uploadModal');
    } else if (event.target === codeModal) {
        closeModal('codeModal');
    }
}

// 键盘事件监听（ESC键关闭模态框）
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        if (document.getElementById('uploadModal').style.display === 'block') {
            closeModal('uploadModal');
        } else if (document.getElementById('codeModal').style.display === 'block') {
            closeModal('codeModal');
        }
    }
});