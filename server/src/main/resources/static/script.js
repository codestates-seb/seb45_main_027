document.getElementById('tipForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', document.getElementById('title').value);
    formData.append('content', document.getElementById('content').value);
    formData.append('coverPhoto', document.getElementById('coverPhoto').files[0]);

    const tipImagesInput = document.getElementById('tipImages');
    for (const file of tipImagesInput.files) {
        formData.append('tipImages', file);
    }

    fetch('http://localhost:8080/tip/your-endpoint', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log('서버 응답:', data);
        // 여기에서 서버의 응답을 처리할 수 있습니다.
    })
    .catch(error => {
        console.error('에러 발생:', error);
    });
});