var cameras = [
	{
		id: 0,
		camera: document.getElementById("camera-1"),
		cameraContent: document.getElementById("camera-content-1"),
		status: "default"
	},
	{
		id: 1,
		camera: document.getElementById("camera-2"),
		cameraContent: document.getElementById("camera-content-2"),
		status: "default"
	},
	{
		id: 2,
		camera: document.getElementById("camera-3"),
		cameraContent: document.getElementById("camera-content-3"),
		status: "default"
	}
];

var cources = [
	{
		id: 0,
		cource: document.getElementById("cource-1"),
		courceDescription: document.getElementById("cource-description-1"),
		status: "default"
	},
	{
		id: 1,
		cource: document.getElementById("cource-2"),
		courceDescription: document.getElementById("cource-description-2"),
		status: "default"
	}
];

var link = {
	linkBody: document.getElementById("find-promocode-link"),
	promocodeToShow: document.getElementById("promocode"),
	isActive: false
};

var newUserForm = {
	newUserFormBlock: document.getElementById("new-user-form")
}

function setCameraAsActive(cameras, id) {
	for (var i = 0; i < cameras.length; i++) {
		if (i == id) {
			cameras[i].status = "active";
			cameras[i].camera.className = "camera camera-active";
			cameras[i].cameraContent.className = "camera-content camera-content-active";
		} else {
			
			cameras[i].status = "inactive";
			cameras[i].camera.className = "camera camera-inactive";
			cameras[i].cameraContent.className = "camera-content camera-content-inactive";
		}		
	}
}

function setCameraAsInActive(cameras) {
	for (var i = 0; i < cameras.length; i++) {
		cameras[i].status = "default";
		cameras[i].camera.className = "camera";
		cameras[i].cameraContent.className = "camera-content camera-content-inactive";
	}
}

function setCourceAsActive(cources, id) {
	for (var i = 0; i < cources.length; i++) {
		if (i == id) {
			cources[i].status = "active";
			cources[i].cource.className = "cource cource-active";
			cources[i].courceDescription.className = "cource__big-description cource__big-description-active";
		} else {
			
			cources[i].status = "inactive";
			cources[i].cource.className = "cource cource-inactive";
			cources[i].courceDescription.className = "cource__big-description cource__big-description-inactive";
		}		
	}
}

function setCourceAsInActive(cources) {
	for (var i = 0; i < cources.length; i++) {
		cources[i].status = "default";
		cources[i].cource.className = "cource";
		cources[i].courceDescription.className = "cource__big-description cource__big-description-inactive";
	}
}

function getActiveElements(elements) {
	return elements.filter(element => element.status == "active");
}

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function handleSubmit(event) {
	var activeCameras = getActiveElements(cameras);
	var activeCources = getActiveElements(cources);
	var activeCameraToPrint = activeCameras.length === 0 ? "no chosen" : activeCameras[0].id + 1;
	var activeCourceToPrint = activeCources.length === 0 ? "no chosen" : activeCources[0].id + 1;
	alert(
	[
		"email: "+ event.target["email-input"].value,	
		"promo-code: " + event.target["code-input"].value,
		"chosen cameras: " + activeCameraToPrint,
		"chosen cources: " + activeCourceToPrint
	].join('\n'));
	
	event.preventDefault();
}

for (var i = 0; i < cameras.length; i++) {
	(function (i) {
		cameras[i].camera.addEventListener("click", function () {
			if (cameras[i].status == "default" || cameras[i].status == "inactive")
				setCameraAsActive(cameras, i);
			else 
				setCameraAsInActive(cameras);
		});
	})(i);
}	

for (var i = 0; i < cources.length; i++) {
	(function (i) {
		cources[i].cource.addEventListener("click", function () {
			if (cources[i].status == "default" || cources[i].status == "inactive")
				setCourceAsActive(cources, i);
			else 
				setCourceAsInActive(cources);
		});
	})(i);
}	

link.linkBody.addEventListener("click", function () {
	link.isActive = !link.isActive;
	link.promocodeToShow.className = link.isActive ? "promocode" : "promocode promocode-hidden";
});

newUserForm.newUserFormBlock["email-input"].addEventListener("input", function(event) {
	var icon = document.getElementById("email-input-icon");
	icon.className = validateEmail(event.target.value) ? "new-user-input-block_checked" : "new-user-input-block_hidden"
});

newUserForm.newUserFormBlock.addEventListener("submit", handleSubmit);
