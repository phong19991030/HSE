/**
 * taking a photo or video by camera
 */
var cameraError;
var localstream;
function useCamera() {
	// References to all the element we will need.
	var video = document.querySelector('#video'), image = document
			.querySelector('#imgAva'), start_camera = document
	// .querySelector('#start_camera'),
	// controls = document.querySelector('.controls'),
	take_photo_btn = document.querySelector('#take_photo'),
	// delete_photo_btn = document
	// .querySelector('#delete_photo'),
	download_photo_btn = document.querySelector('#download_photo'),
			retry_photo = document.querySelector('#try_again');

	// The getUserMedia interface is used for handling
	// camera
	// input.
	// Some browsers need a prefix so here we're covering
	// all
	// the options
	navigator.getMedia = (navigator.getUserMedia
			|| navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

	if (!navigator.getMedia) {
		// displayErrorMessage("Your browser doesn't have
		// support for the navigator.getUserMedia
		// interface.");
		cameraError = "Your browser doesn't have support for the navigator.getUserMedia interface.";
	} else {

		// Request the camera.
		navigator.getMedia(
						{
							video : true
						},
						// Success Callback
						function(stream) {

							// Create an object URL for the
							// video stream and
							// set it as src of our HTLM
							// video
							// element.
							video.src = window.URL.createObjectURL(stream);
							localstream = stream;
							
							// Play the video element to
							// start
							// the stream.
							video.play();
							video.onplay = function() {
								showVideo();
							};	
						},
						// Error Callback
						function(err) {
							// displayErrorMessage(
							// "There was an error with
							// accessing the camera stream:
							// "
							// + err.name, err);
							alert('Camera is blocked. Please contact to administrator for supporting!');
							stopCamera();
							cameraError = "There was an error with accessing the camera stream: "
									+ err.name;
						});

	}

	// // Mobile browsers cannot play video without user
	// input,
	// // so here we're using a button to start it manually.
	// start_camera.addEventListener("click", function(e) {
	// if (cameraError) {
	// window.alert(cameraError);
	// }
	// e.preventDefault();
	//
	// // Start video playback manually.
	// video.play();
	// showVideo();
	//
	// });

//	if (!localstream) {
//		alert('Camera is blocked on this domain. Please contact to administrator for supporting!');
//		stopCamera();
//	}
	
	$('#try_again').click(function() {
		$('#take_photo').show();
		$('#use_photo').hide();
		$('#try_again').hide();

		$('#video_view').show();

		$('#img_view').hide();
		// useCamera();
		video.play();

	});

	take_photo_btn.addEventListener("click", function(e) {
		if (cameraError) {
			window.alert(cameraError);
		}
		e.preventDefault();

		var snap = takeSnapshot();

		// Show image.
		image.setAttribute('src', snap);
		console.log(image);

		$('#video_view').hide();

		$('#img_view').show();

		// $('#imageAva').set
		// image.classList.add("visible");
		//
		// // Enable delete and save buttons
		// delete_photo_btn.classList.remove("disabled");
		// download_photo_btn.classList.remove("disabled");
		//
		// // Set the href attribute of the download button
		// to the
		// snap url.
		// debugger;
		// $('#download_photo').click(function(){
		// debugger;
		// window.open(snap);
		// console.log(snap);
		// document.location.href= snap;
		// });
		//							

		hideUIAfterSnapshot()
		// Pause video playback of stream.
		video.pause();

	});

	// delete_photo_btn.addEventListener("click", function(e) {
	//
	// e.preventDefault();
	//
	// // Hide image.
	// image.setAttribute('src', "");
	// image.classList.remove("visible");
	//
	// // Disable delete and save buttons
	// delete_photo_btn.classList.add("disabled");
	// download_photo_btn.classList.add("disabled");
	//
	// // Resume playback of stream.
	// video.play();
	//
	// });

	function showVideo() {
		// Display the video stream and the controls.

		// hideUI();
		video.classList.add("visible");
		// controls.classList.add("visible");
	}

	function takeSnapshot() {
		// Here we're using a trick that involves a hidden
		// canvas element.

		var hidden_canvas = document.querySelector('canvas'), context = hidden_canvas
				.getContext('2d');

		var width = video.videoWidth, height = video.videoHeight;

		if (width && height) {

			// Setup a canvas with the same dimensions as
			// the
			// video.
			hidden_canvas.width = width;
			hidden_canvas.height = height;

			// Make a copy of the current frame in the video
			// on
			// the canvas.
			context.drawImage(video, 0, 0, width, height);

			// Turn the canvas image into a dataURL that can
			// be
			// used as a src for our photo.
			return hidden_canvas.toDataURL('image/png');
		}
	}

	function displayErrorMessage(error_msg, error) {
		error = error || "";
		if (error) {
			console.log(error);
		}

		// error_message.append(error_msg);

		// hideUI();
		// error_message.classList.add("visible");
		window.alert(error_msg);
	}

	function hideUIAfterSnapshot() {
		$('#take_photo').hide();
		$('#use_photo').show();
		$('#try_again').show();

	}

	function hideUI() {
		// Helper function for clearing the app UI.

		// controls.classList.remove("visible");
		// start_camera.classList.remove("visible");
		video.classList.remove("visible");
		// snap.classList.remove("visible");
		error_message.classList.remove("visible");
	}

};
