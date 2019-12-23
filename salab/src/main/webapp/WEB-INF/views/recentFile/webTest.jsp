<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width:device-width, initial-scale:1.0;">
<title>Web Test</title>
<style type="text/css">
	/* Slide */
body{margin:0; padding: 0;}

.mySlides {display: none; text-align: center;}
img {vertical-align: middle;}

/* Slideshow container */
.slideshow-container {
  /* max-width: 1200px;
  max-height: 720px; */
  position: relative;
  margin: auto;
}

/* Next & previous buttons */
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -22px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}

/* Caption text */
.text {
  color: #f2f2f2;
  background-color: rgba( 0, 0, 0, 0.5 );
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

.active {
  background-color: #717171;
}

/* Fading animation */
.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
}

.mySlides > img{
	/* max-width: 1200px;
	max-height: 720px; */
	/* width: auto;
	height: auto; */
	width: 100%;
	height: 100%;
}

@-webkit-keyframes fade {
  from {opacity: .4} 
  to {opacity: 1}
}

@keyframes fade {
  from {opacity: .4} 
  to {opacity: 1}
}

/* On smaller screens, decrease text size */
@media only screen and (max-width: 300px) {
  .prev, .next,.text {font-size: 11px}
}
	
</style>
</head>
<body>
	<div class="slideshow-container">
		<c:forEach var="page" items="${pageList }">
			<div class="mySlides fade">
	  		${page.thumbnail }
	  		<div class="text">${page.pagename }</div>
		</div>
		</c:forEach>
		<a class="prev" href="javascript:" onclick="plusSlides(-1)" onkeypress="if(event.keyCode==37) {plusSlides(-1); return false;}">&#10094;</a>
		<a class="next" href="javascript:" onclick="plusSlides(1)" onkeypress="if(event.keyCode==39) {plusSlides(1); return false;}">&#10095;</a>
	</div>
	<script type="text/javascript" src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
<script type="text/javascript">
	var slideIndex = 1;
	showSlides(slideIndex);
	function plusSlides(n) {
	  showSlides(slideIndex += n);
	}

	$(document).on('keydown', function(e){
		if(e.keyCode == 39){
			plusSlides(1);
		}
		
		if(e.keyCode == 37){
			plusSlides(-1);
		}
	});
	
	function currentSlide(n) {
	  showSlides(slideIndex = n);
	}

	function showSlides(n) {
	  var i;
	  var slides = document.getElementsByClassName("mySlides");
	  if (n > slides.length) {slideIndex = 1}    
	  if (n < 1) {slideIndex = slides.length}
	  for (i = 0; i < slides.length; i++) {
	      slides[i].style.display = "none";  
	  }
	  slides[slideIndex-1].style.display = "block";  
	}
</script>
</body>
</html>