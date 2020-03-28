# SALAB

## 개요
1. 프로젝트 명: SALAB
2. 일정 : 2019.10.01 ~ 2019.12.23
3. 팀 구성 : 장관익, 박건우, 오세준, 이승진, 최연영
4. 목적 : 

  세미프로젝트 기획단계에서 UI 설계를 위해 몇 가지 목업 및 프로토타이핑 툴들을 비교 사용하면서 불편한점을 찾게 되었다. 
kakao oven과 draw.io는 직관적인 UI로 높은 사용성을 가지고 있지만 실시간 협업이 되지 않는 다는 점이었으며, Figma는 실시간 협업이 가능하지만
Tool을 능숙하게 사용하기 위해 숙달이 필요하다는 점이었다. 이에, 직관적인 UI를 기반으로 실시간 협업이 가능한 온라인 목업 툴을 만들어
기획 단계에서의 작업 효율을 높이고자 한다.


5. 사용 기술 및 개발환경 :
  + O/S : Windows 10(개발환경)
  + Server : Apache Tomcat 8.5, Node.js 12.14.0
  + Database : Oracle 11g XE, MongoDB 4.0
  + Framework : Spring, MyBatis3.5, express, mongoose
  + Main Language : Java 8
  + Front-End : HTML, CSS3, JavaScript
  + Library/API : jQuery 3.2.1, jQuery ui 1.12.1, jQuery ui rotatable, jQuery minicolors, dom-to-image, Google Developer, BootPay, html2canvas
  + IDE : Eclipse 2018-19

## 내용
1.  구현 기능
  + 회원
    * 로그인, 회원가입, Google Login, 비밀번호 찾기, 비밀번호 변경, 회원 탈퇴
  + 관리자
    * 관리자 로그인, 1:1 문의, 공지사항, 자주 찾는 질문
  + 파일
    * 파일 생성, 파일 조회, 파일 복사, 휴지통, 파일 영구 삭제
  + 프로젝트
    * 프로젝트 생성, 프로젝트 삭제, 팀원 초대, 프로젝트 파일 생성, 프로젝트 파일 삭제
    * 프로젝트 공지사항
  + 파일 편집
    * 페이지 : 새 페이지, 삭제, 이름변경, 복사, 내보내기(pdf), 격자무늬 보이기, 웹테스트
    * component 편집 : 실행취소, 다시실행, 삭제, 잘라내기, 복사, 붙여넣기, 그룹, 그룹해제, 순서
    * image: 삽입, 삭제
    * component, image 공통 : drag, resize, rotate
    * 프로젝트 파일: 실시간 채팅, 공동작업

2.  역할 분담


