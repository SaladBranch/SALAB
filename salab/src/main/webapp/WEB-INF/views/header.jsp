<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>상품</title>
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
                        <li><a href="#">상품</a></li>
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
        <div id="enroll-form" class="modal-form">
            <div class="modal-form-content">
                <form action="enroll.do" class="signup-form" method="post">
                    <button class="google-login"><img src="/salab/resources/img/google_logo.png">Sign up with Google</button>
                    <p>or</p>
                    <input type="email" name="useremail" placeholder="이메일">
                    <input type="password" name="userpwd" placeholder="비밀번호">
                    <input type="text" name="userphone" placeholder="전화번호('-'제외)">
                    <button class="enroll-btn">회원가입</button>
                    <p class="signup-ment">
                        계정이 있으신가요? <a class="login-link">로그인</a>
                    </p>
                </form>
                <form action="login.do" class="login-form">
                    <button class="google-login">
                        <img src="/salab/resources/img/google_logo.png">Log in with Google
                    </button>
                    <p>or</p>
                    <input type="email" name="useremail" placeholder="이메일">
                    <input type="password" name="userpwd" placeholder="비밀번호">
                    <button class="login-btn">로그인</button>
                    <p class="login-ment">
                        <a href="#">비밀번호를 잊어버렸어요</a>
                        계정이 없으신가요? <a class="enroll-link">회원가입</a>
                    </p>
                </form>
            </div>
        </div>
    </header>
</body>
</html>