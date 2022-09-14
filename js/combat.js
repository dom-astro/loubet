var strToast = 
'<div class="toast-container position-absolute p-3 start-50 translate-middle-x" style="top: 100px;" data-original-class="toast-container position-absolute p-3"> \
	<div id="myToast" style="background-color: #fbf5f5; "class="toast align-items-center text-danger border-0" data-bs-animation="true" role="alert" aria-live="assertive" aria-atomic="true"> \
		<div class="d-flex"> \
	  		<div class="toast-body"> \
	  		</div> \
	  		<button style="color: green;" type="button" class="btn-close btn-alert me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button> \
		</div> \
	</div> \
</div>';

function blessure(degat) {
    pj.ev -= degat;
    pj.save();
    $(".toast-container").remove();
    $("body").append(strToast);

    if (degat > 1) {
        $(".toast-body").html("Vous avez reçu "+degat+" points de dégât");
    } else {
        $(".toast-body").html("Vous avez reçu "+degat+" point de dégât");
    }

    $("#myToast").toast("show");
}