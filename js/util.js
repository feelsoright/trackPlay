function syncHttpRequestToServer(url, type, apiData, headers) {
	let res;
	$.ajax({
		type: type,
		url: "http://192.168.0.104:9090" + url,
		headers: headers,
		data: apiData,
		async: false,
		success: function(data) {
			console.log(data)
			if(data.flag){
				res = data.data;
			}else if(data.code===20001){
				localStorage.removeItem('token');
				headers.Authorization = 'Beaere '+loginTrackPlatform();
				res = syncHttpRequestToServer(url, type, apiData, headers);
			}
		},
		error: function(e) {
			console.log(e)
			$.toast("数据获取失败，请稍后重试", "forbidden");
			res = null;
		}
	});
	return res;
}
function loginTrackPlatform() {
	let t = localStorage.getItem("token");
	if (t == undefined || t == null) {
		let url = "/user/login";
		let type = "POST";
		let apiData = {
			"username": "APIUSER",
			"password": "APIPASSWORD"
		};
		let data = syncHttpRequestToServer(url, type, apiData);
		if (data != null) {
			t = data.token;
			localStorage.setItem("token", t);
			return t;
		}
	} else {
		return t
	}
	console.log(t)
}
