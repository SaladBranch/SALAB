<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width:device-width, initial-scale:1.0;">
    <link rel="stylesheet" href="/salab/vendors/css/grid.css">
    <link rel="stylesheet" href="/salab/vendors/css/normalize.css">
    <link rel="stylesheet" href="/salab/vendors/css/toast.css">
    <link rel="stylesheet" href="/salab/resources/css/common.css">
    <link rel="stylesheet" href="/salab/resources/css/footer.css">
    <link rel="shortcut icon" type="image/x-icon" href="/salab/resources/img/logo.png">
    
    <link rel="stylesheet" href="/salab/resources/css/main.css" type="text/css">
    <link rel="stylesheet" href="/salab/resources/css/mainQuery.css" type="text/css">
    
    <script src="https://kit.fontawesome.com/08d0951667.js"></script>
    <title>Salab</title>
</head>
<body>
    <header>
        <nav>
            <div class="navbar">
                <div class="row">
                    <img src="/salab/resources/img/logo.png" class="logo">
                    <h1><a href="main.do" class="logo">Salab</a></h1>
                    <ul class="nav-menu">
                        <li><a href="#">기능</a></li>
                        <li><a href="test.do">상품</a></li>
                       	<li><button class="nav-login" onclick="modalOpen('login')">로그인</button></li>
                        <li><button class="nav-signup btn btn-full" onclick="modalOpen('enroll')">회원가입</button></li>
                    </ul>
                    <div class="mobile-menu">
                        <div class="mobile-menu-btn">
                            <input type="checkbox">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <div class="mobile-menu-list">
            <ul class="nav-mobile-menu">
                <li><a href="#">기능</a></li>
                <li><a href="#">상품</a></li>
                <li><a href="#" class="nav-login">로그인</a></li>
                <li><a href="#" class="nav-signup">회원가입</a></li>
            </ul>
        </div>
        <div class="hero-text-box">
            <h2>Apetizer for<span class="media-hero-br"></span> Creative Project<br></h2>
            <p>직관적이고 아름다운 컴포넌트들로 쉽고, 빠르게 프로토타입을 제작해보세요.</p>
            <button class="btn btn-full" onclick="modalOpen('enroll')">무료로 시작하기</button>
            <a href="#" class="btn btn-ghost">기능 둘러보기</a>
            <a class="to-down"><i class="fas fa-chevron-down"></i></a>
        </div>
        <div id="enroll-form" class="modal-form">
            <div class="modal-form-content">
                <form action="enroll.do" name="signupForm" class="signup-form" method="post">
                	<button class="google-login"><img src="/salab/resources/img/google_logo.png">Sign up with Google</button>
                    <p>or</p>
                    <input type="email" name="useremail" placeholder="이메일" required>
                    <input type="password" name="userpwd" placeholder="비밀번호(6글자 이상, 숫자나 특수문자 포함)" required>
                    <input type="text" name="userphone" placeholder="전화번호('-'제외)" onkeypress="onlyNumber();" required>
                    <button class="enroll-btn" type="submit" onclick="enrollValid(this);">회원가입</button>
                    <p class="signup-ment">
                    	계정이 있으신가요? <a class="login-link">로그인</a>
                    </p>
                </form>
                <form action="login.do" name="loginForm" class="login-form" method="post">
	                <button class="google-login">
	                    <img src="resources/img/google_logo.png">Log in with Google
	                </button>
	                <p>or</p>
	                <input type="email" name="useremail" placeholder="이메일" required>
	                <input type="password" name="userpwd" placeholder="비밀번호" required>
	                <button type="submit" class="login-btn" onclick="loginValid(this);">로그인</button>
	                <p class="login-ment">
	                    <a href="findPwd.do">비밀번호를 잊어버렸어요</a>
	                    계정이 없으신가요? <a class="enroll-link">회원가입</a>
	                </p>
	            </form>
            </div>
        </div>
    </header>
    
    <section class="section-features">
        <div class="row">
            <h2>프로토타입은 실제 서비스의 <span class="media-h2-br"></span>기초이자 토대입니다</h2>
            <p class="long-copy">
                계획했던 서비스를 더욱 명확하게 구체화하여 성공을 쌓아 올리세요.  <span class="media-br"></span> Salab은 그 과정을 도와드립니다. <br> 여기 당신을 도와줄 놀라운 툴들입니다.
            </p>
        </div>
        <div class="row">
            <div class="col span-1-of-3 feature">
                <img src="/salab/resources/img/feature1.jpg" alt="">
                <h3>강력한 협업</h3>
                <p class="feature-copy">
                    팀원들과의 협업을 통해 만들어낸 훌륭한 산출물은 실제 서비스의 튼튼한 토대가 될 것입니다.
                </p>
            </div>
            <div class="col span-1-of-3 feature">
                <img src="/salab/resources/img/feature2.png" alt="">
                <h3>커뮤니케이션</h3>
                <p class="feature-copy">
                    협업의 기반은 소통입니다. Salab은 팀원 간의 소통을 극대화 할 수 있는 방안을 마련했습니다.
                </p>
            </div>
            <div class="col span-1-of-3 feature">
                <img src="/salab/resources/img/feature3.jpg" alt="">
                <h3>코드로의 변환</h3>
                <p class="feature-copy">
                    실제 구현이 걱정되세요? Trans_CO 기능은 완성된 툴을 검토하여 코드로 변환해 드립니다.
                </p>
            </div>
        </div>
    </section>
    <section class="section-introvideo">
        <div class="row">
            <div class="col span-3-of-8 videotext">
                <h2>혁신적인 프로토타입<br>실시간 협업</h2>
                <p>
                Creative Project를 위한 최적의 프로토타입 제작을
                지금 경험해 보세요 <br><br>
                &mdash; Salab을 통해서 말이죠
                </p>
                <button class="btn btn-full" onclick="modalOpen('enroll')">무료로 시작하기</button>
            </div>
            <div class="col span-5-of-8 video">
                <video autoplay loop>
                    <source src="/salab/resources/img/Hero_Animation_60fps.mp4" type="video/mp4">
                </video>
            </div>
        </div>
    </section>
    <section class="section-feedback">
        <div class="row">
            <p>
                "SALAB이 제공하는 툴은 프로토타입 제작 과정의 효율을 극단적으로 높여주었어요."
            </p>
            <img src="/salab/resources/img/customer-3.jpg">
            <p>Oh Sae Jun. Product Manager. From KH</p>
        </div>
    </section>
    <section class="section-functions">
        <div class="row">
            <h2>작업 효율성을 높여주는 컴포넌트</h2>
            <p class="long-copy">
                컴포넌트는 설계 전반에 걸쳐 사용할 수 있는 UI 요소입니다. <br>
                여러 프로젝트에서 일관된 디자인이나 테마를 만들고 관리할 수 있도록 도와줍니다
            </p>
        </div>
        <div class="row">
            <div class="col span-1-of-2">
                <img src="/salab/resources/img/component1.png">
                <h3>Components</h3>
                <p>당신만의 개성있는 컴포넌트를 만들어 팀라이브러리로 공유해보세요.</p>
            </div>
            <div class="col span-1-of-2">
                <img src="/salab/resources/img/component3.png">
                <h3>Team Libraries</h3>
                <p>당신이 공유한 컴포넌트는 프로젝트를 더욱 풍성하게 만들것 입니다.</p>
            </div>
        </div>
    </section>
    <section class="section-feedback">
        <div class="row">
            <p>
                "기존에 사용하던 다른 프로토타이핑 툴과는 다르게 협업이 가능해서 좋았어요."
            </p>
            <img src="/salab/resources/img/customer-3.jpg">
            <p>Lee Seung Jin. Product Manager. From KH</p>
        </div>
    </section>
    <section class="section-signup">
        <div class="row">
            <h2>Salab 시작하기</h2>
            <form action="enroll.do" name="signupForm" class="signup-form" method="post">
                <button class="google-login"><img src="/salab/resources/img/google_logo.png">Sign up with Google</button>
                <p>or</p>
                <input type="email" name="useremail" placeholder="이메일" required>
                <input type="password" name="userpwd" placeholder="비밀번호(6글자 이상, 숫자나 특수문자 포함)" required>
                <input type="text" name="userphone" placeholder="전화번호('-'제외)" onkeypress="onlyNumber();" required>
                <button class="enroll-btn" type="submit" onclick="enrollValid(this);">회원가입</button>
                <p class="signup-ment">
                    계정이 있으신가요? <a class="login-link">로그인</a>
                </p>
            </form>
            <form action="login.do" name="loginForm" class="login-form" method="post">
                <button class="google-login">
                    <img src="resources/img/google_logo.png">Log in with Google
                </button>
                <p>or</p>
                <input type="email" name="useremail" placeholder="이메일" required>
                <input type="password" name="userpwd" placeholder="비밀번호" required>
                <button type="submit" class="login-btn" onclick="loginValid(this);">로그인</button>
                <p class="login-ment">
                    <a href="findPwd.do">비밀번호를 잊어버렸어요</a>
                    계정이 없으신가요? <a class="enroll-link">회원가입</a>
                </p>
            </form>
        </div>    
    </section>
    
    <c:import url="footer.jsp" />

    <script type="text/javascript" src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="/salab/vendors/js/toast.js"></script>
    <script type="text/javascript" src="/salab/resources/js/main.js"></script>
    <script type="text/javascript">
    	$(function(){
    		$('.google-login').on('click', function(){
    			location.href = "${google_url}";
    		});
    	});
    </script>
</body>
</html>