function ElapsedTime(elementId, date) {
	this.id = elementId;
	this.date = date;
}

function elapsedTime(items) {
	
	setInterval(function() {
		for (var i = 0, len = items.length; i < len; i++) {
			var elapsedTime = items[i];
			
			var elapsedMillisecond = new Date().getTime() - elapsedTime.date.getTime();
			var elapsedDays = Math.floor(elapsedMillisecond / (1000 * 60 * 60 * 24));
			var elapsedHours = Math.floor(elapsedMillisecond / (1000 * 60 * 60));
			var elapsedMinutes = Math.floor(elapsedMillisecond / (1000 * 60));
			var elapsed = '';
			if (elapsedDays > 365) {
				var n = Math.floor(elapsedDays / 365);
				elapsed = n + ' year' + ((n > 1) ? 's' : '');
			} else if (elapsedDays > 30) {
				var n = Math.floor(elapsedDays / 30);
				elapsed = n + ' month' + ((n > 1) ? 's' : '');
			} else if (elapsedDays > 7) {
				var n = Math.floor(elapsedDays / 7);
				elapsed = n + ' week' + ((n > 1) ? 's' : '');
			} else {
				elapsed = (elapsedDays > 0) ? elapsedDays + (elapsedDays> 1?' days': ' day') : ((elapsedHours > 0) ? elapsedHours + (elapsedHours> 1?' hours': ' hour') : ((elapsedMinutes > 0) ? elapsedMinutes + (elapsedMinutes> 1?' minutes': ' minute') : ' Just now'));
			}
			
			var val = document.getElementById(elapsedTime.id).innerHTML;
			if (val != elapsed) {
				document.getElementById(elapsedTime.id).innerHTML = elapsed;
			}
		}
	}, 1000);
}