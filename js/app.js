'use strict';

let notificationCount = 0;

const LOAD_DELAY = 1000;
const FLEX_BIAS = 4;

class Notification {
	constructor(statement, initDelay, duration) {
		let _this = this;
		this.statement = statement;
		this.initDelay = initDelay;
		this.duration = duration;
		this.notificationCount = notificationCount++;

		this.reminder = "<div id='n" + this.notificationCount + "' class='notification'><p class='p-text-reg'>" + this.statement + "</p></div>";

		$('body').append(this.reminder);

		this.selector = $("#n" + this.notificationCount);
		this.nonWidth = (-2 * this.selector.outerWidth()).toString() + "px";
		this.animate(_this);
	}
	animate(root) {
		this.selector.css('right', this.nonWidth);
		this.selector.velocity({
			right: 32
		}, {
			duration: 700
			, delay: root.initDelay + LOAD_DELAY
			, easing: [180, 19]
		}).velocity({
			right: root.nonWidth
		}, {
			duration: 700
			, delay: root.initDelay + root.duration + LOAD_DELAY
			, easing: [100, 19]
		});
	}
}

class MobileNotification extends Notification {
	constructor(statement, initDelay, duration) {
		super(statement, initDelay, duration);
	}
	animate(root) {
		this.selector.velocity({
			bottom: -root.selector.outerHeight()
		}, {
			duration: 400
			, delay: root.initDelay + LOAD_DELAY
			, easing: [180, 19]
		});
	}
}

let sunshine = () => {
	$('.code-wrapper').hover(function () {
		$('.flex-left').css({
			"flex": `${FLEX_BIAS}`
			, "opacity": "1"
		});
		$('.flex-right').css({
			"flex": "1"
			, "opacity": "0.6"
		});
		$('button').css({
			"opacity": "0"
		});

	});
	$('.code-wrapper-light').hover(function () {
		$('.flex-right').css({
			"flex": `${FLEX_BIAS}`
			, "opacity": "1"
		});
		$('.flex-left').css({
			"flex": "1"
			, "opacity": "0.6"
		});
		$('button').css({
			"opacity": "1"
		});
	});
}

let reset = () => {
	$('.code-wrapper').hover(function () {
		$('.flex-left').css({
			"flex": "1"
			, "opacity": "1"
		});
		$('.flex-right').css({
			"flex": "1"
			, "opacity": "0.8"
		});
		$('button').css({
			"opacity": "0"
		});
	});
	$('.code-wrapper-light').hover(function () {
		$('.flex-right').css({
			"flex": "1"
			, "opacity": "1"
		});
		$('.flex-left').css({
			"flex": "1"
			, "opacity": "0.8"
		});
		$('button').css({
			"opacity": "1"
		});
	});
}


$(() => {
	$('.preloader').velocity({
		opacity: 0
	}, {
		delay: LOAD_DELAY - 300
	});

	setTimeout(() => {
		$('.preloader').css("pointerEvents", "none");
	}, LOAD_DELAY - 300);

	for (let i = 1; i <= ($('.code-wrapper').length); i++) {
		$('.code-wrapper:nth-of-type(' + i.toString() + '').css({
			'animation': 'fade ease 1s'
			, 'animation-delay': (i * 0.2).toString() * 1000 + LOAD_DELAY + 'ms'
			, 'animation-fill-mode': 'forwards'
		});
	}

	for (let i = 1; i <= ($('.code-wrapper-light').length); i++) {
		$('.code-wrapper-light:nth-of-type(' + i.toString() + '').css({
			'animation': 'fade ease 1s'
			, 'animation-delay': (i * 0.4).toString() * 1000 + LOAD_DELAY + 'ms'
			, 'animation-fill-mode': 'forwards'
		});
	}

	$('.code-wrapper').last().css("margin-bottom", "0px");

	if ($(window).width() > 800) {
		new Notification('Tap the <span class="p-highlight">spacebar</span> to enable <span class="p-highlight">Sunshine</span> mode.', 2000, 2000);
	} else {
		new MobileNotification('Sunshine mode <span class="p-highlight">isn\'t availible</span> on this device.', 4000, 2000);
	}

	let hit = false;
	$(document).keypress(() => {
		hit = hit ? false : true;
		if (!hit) {
			reset();
			if ($(window).width() > 1000) {
				new Notification('Sunshine mode <span class="p-highlight">disabled</span>.', 0, 3000);
			}
		} else {
			if ($(window).width() > 1000) {
				sunshine();
				new Notification('Sunshine mode <span class="p-highlight">enabled</span>. Move your cursor!', 0, 3000);
			}
		}
	});
});