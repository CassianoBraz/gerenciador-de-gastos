(function ($) {

	var $window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['361px', '736px'],
		xsmall: [null, '360px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Dropdowns.
	$('#nav > ul').dropotron({
		mode: 'fade',
		noOpenerFade: true,
		speed: 300,
		alignment: 'center'
	});

	// Scrolly
	$('.scrolly').scrolly({
		speed: 1000,
		offset: function () { return $nav.height() - 5; }
	});

	// Nav.

	// Title Bar.
	$(
		'<div id="titleBar">' +
		'<a href="#navPanel" class="toggle"></a>' +
		'<span class="title">'+''+'</span>' +
		'</div>'
	)
		.appendTo($body);

	// Panel.
	$(
		'<div id="navPanel">' +
		'<nav>' +
		$('#nav').navList() +
		'</nav>' +
		'</div>'
	)
		.appendTo($body)
		.panel({
			delay: 500,
			hideOnClick: true,
			hideOnSwipe: true,
			resetScroll: true,
			resetForms: true,
			side: 'left',
			target: $body,
			visibleClass: 'navPanel-visible'
		});

})(jQuery);
$(function () {
	$("form[name='login']").validate({
		rules: {

			email: {
				required: true,
				email: true
			},
			password: {
				required: true,

			}
		},
		messages: {
			email: "Please enter a valid email address",

			password: {
				required: "Please enter password",

			}

		},
		submitHandler: function (form) {
			console.log('oi')
		}
	});
});

$(function () {

	$("form[name='registration']").validate({
		rules: {
			firstname: "required",
			lastname: "required",
			email: {
				required: true,
				email: true
			},
			password: {
				required: true,
				minlength: 5
			}
		},

		messages: {
			firstname: "Por favor insira o primeiro nome!",
			lastname: "Por favor insira o ultimo nome!",
			password: {
				required: "Forneça uma senha",
				minlength: "Sua senha deve ter pelo menos 8 caracteres"
			},
			email: "Por favor insira um endereço de e-mail válido"
		},

		submitHandler: function (form) {
			form.submit();
		}
	});
});

const login = async () => {
	const email = document.querySelector("#email").value
	const password = document.querySelector("#password").value

	if (email && password) {
	    try {
	        const response = await axios.post(`${baseURL}/sessions`, {
	            email: email,
	            password: password
	        })
	        console.log(response)
	    } catch (err) { 
	        console.log(err)
	    }

	}else{
	    console.log('digita saporra direito')
	}

}

