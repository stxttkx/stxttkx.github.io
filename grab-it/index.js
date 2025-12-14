// 获取当前选中的网盘类型（123云盘或蓝奏云存储）
function getPanName() {
	// 获取所有 name 为 cloudType 的单选按钮
	const radios = document.getElementsByName('cloudType');
	let panName = '';
	for (let i = 0; i < radios.length; i++) {
		if (radios[i].checked) {
			panName = radios[i].value;
			break;
		}
	}
	// 返回选中的网盘类型
	return panName;
}

// 获取用户输入的分享链接
function getShareLink() {
    const shareLinkInput = document.getElementById('inputUrl');
    return shareLinkInput.value.trim();
}

//获取文件下载链接（云智API提供技术支持）
function download() {
    let pan = getPanName();
    let downloadLink = '';
    var result = document.getElementById('resultMsg');
	result.textContent = '请稍候...'
	if ( pan == '123' ) {
		const inputUrl = getShareLink();
		fetch(`https://api.jkyai.top/API/123wpjx.php?url=${encodeURIComponent(inputUrl)}`)
			.then(response => response.json())
			.then(data => {
				if (data.DownloadURL) {
					downloadLink = data.DownloadURL;
                    result.textContent = '下载链接获取成功！';
                    var startDownload = document.getElementById('toDownload');
                    startDownload.innerHTML=`
                    <input id=\"innerFileName\" placeholder=\"输入下载后的文件名，回车确认\" onkeyup=\"handleKeyPress(event)\">
                    <script>
                        function handleKeyPress(event) {
                            // 如果按下的是回车键
                            if (event.keyCode === 13) {
                            // 获取输入框的值
                            var fileName = event.target.value;
                            }
                        }
                    </script>
                    <a href=\"${downloadLink}\" download=\"${fileName}\">点击下载</a>`;
				}
			})
			.catch(error => {
				result.textContent = '服务器异常！';
			});
	} else {
        if ( pan == 'lanzou' ) {
		    const inputUrl = getShareLink();
		    fetch(`https://api.jkyai.top/API/lzypjx.php?url=${encodeURIComponent(inputUrl)}`)
			    .then(response => response.json())
			    .then(data => {
				    if (data.DownloadURL) {
					    downloadLink = data.DownloadURL;
                        result.innerText = '下载链接获取成功！';
                        var startDownload = document.getElementById('toDownload');
                        startDownload.innerHTML=`
                        <input id=\"innerFileName\" placeholder=\"输入下载后的文件名，回车确认\" onkeyup=\"handleKeyPress(event)\">
                        <script>
                            function handleKeyPress(event) {
                                // 如果按下的是回车键
                                if (event.keyCode === 13) {
                                // 获取输入框的值
                                var fileName = event.target.value;
                                }
                            }
                        </script>
                        <a href=\"${downloadLink}\" download=\"${fileName}\">点击下载</a>`;
				    }
			    })
			    .catch(error => {
				    result.textContent = '服务器异常！';
			    });
	    }
    }
}