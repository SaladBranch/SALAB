# SALAB

## 개요
1. 프로젝트 명: SALAB
2. 일정 : 2019.10.01 ~ 2019.12.23
3. 팀 구성 : 장관익, 박건우, 오세준, 이승진, 최연영
4. 목적 : 

  세미프로젝트 기획단계에서 UI 설계를 위해 몇 가지 목업 및 프로토타이핑 툴들을 비교 사용하면서 불편한점을 찾게 되었다. 
kakao oven과 draw.io는 직관적인 UI로 높은 사용성을 가지고 있지만 실시간 협업이 되지 않는 다는 점이 있었으며, Figma는 실시간 협업이 가능하지만
Tool을 능숙하게 사용하기 위해 숙달이 필요하다는 점이 있었다. 이에, 직관적인 UI를 기반으로 실시간 협업이 가능한 온라인 목업 툴을 만들어
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
    * 로그인, 회원가입, Google Login, 이메일 인증, 비밀번호 찾기, 비밀번호 변경, 회원 탈퇴
  + 관리자
    * 관리자 로그인, 1:1 문의, 공지사항, 자주 찾는 질문
  + 파일
    * 파일 생성, 파일 조회, 파일 정렬, 파일 복사, 휴지통, 파일 영구 삭제
  + 프로젝트
    * 프로젝트 생성, 프로젝트 삭제, 팀원 초대, 프로젝트 파일 생성, 프로젝트 파일 삭제
    * 프로젝트 공지사항
  + 파일 편집
    * 페이지 : 새 페이지, 삭제, 이름변경, 복사, 내보내기(pdf), 격자무늬 보이기, 웹테스트
    * component 편집 : 실행취소, 다시실행, 삭제, 잘라내기, 복사, 붙여넣기, 그룹, 그룹해제, 순서, 색깔, 텍스트
    * image: 삽입, 삭제
    * component, image 공통 : drag, resize, rotate
    * 라이브러리 : 라이브러리 추가, 라이브러리 삭제
    * 프로젝트 파일: 실시간 채팅, 공동작업

2.  역할 분담

| 팀원 | 역할 | 세부 담당 기능 | 
| :------------ | :-----------: | :------------------- | 
| 장관익 | 팀장, UI/UX 통일 | 로그인, 회원가입, 이메일 인증, 파일 정렬, component 편집, 라이브러리, 공동작업, 실시간채팅 | 
| 오세준 | 클래스 설계 | 파일 관리, 웹테스트, 파일 내부 페이지 관리, pdf내보내기 | 
| 이승진 | DB 설계 | component 세부 편집 |
| 박건우 | sub DB 설계 | 회원 정보, 프로젝트 생성 및 프로젝트 공지사항 |
| 최연영 | sub 클래스 설계 | 관리자 전담 |

3.  설계 주안점
  + 최대한 직관적인 UI로 사용성을 높인다.
  + 공동작업을 통해 생산성을 높인다.
  
4.  대표 산출물
+ ERD
  ![image](https://user-images.githubusercontent.com/44356083/77869991-35f4c900-727b-11ea-8048-8c68b130ca12.png)


+ Class 설계
  ![image](https://user-images.githubusercontent.com/44356083/77870061-5fadf000-727b-11ea-872b-908c7a9612f1.png)


+ 화면흐름도
  ![image](https://user-images.githubusercontent.com/44356083/77870065-63417700-727b-11ea-889b-8b508e1285c0.png)


5. Screenshot
  + Main
![image](https://user-images.githubusercontent.com/44356083/77870271-e9f65400-727b-11ea-9d7e-ba68d9e2b561.png)


  + Sign Up / Login
![image](https://user-images.githubusercontent.com/44356083/77870314-04303200-727c-11ea-9270-a6e577dbf5e4.png)


  + 로그인 후 메인
![image](https://user-images.githubusercontent.com/44356083/77870761-39894f80-727d-11ea-8b95-285789b1e401.png)


  + 파일 편집
![image](https://user-images.githubusercontent.com/44356083/77870885-9422ab80-727d-11ea-85ce-43bd4e92bc1e.png)


## 후기
모두 처음으로 진행하는 스프링프로젝트에서 안되면 될때까지 모르는 것을 찾아가며 그리고 서로 의지하며 진행하였다는 점에 가장 큰 감사의 인사를
올리고 싶다. 아직도 부족한 부분이 많고 보완해야할 부분이 너무나도 많지만 새로운 것을 배워나간다는 기쁜 마음으로 다시 정진해나가야겠다.
본 프로젝트에서 느낀 가장 큰 부족한 점은 설계의 미흡이었다. 목업 툴의 특성 상 프론트단에서 스크립트로 동시에 처리해야할 일들이 많았는데 이를꼼꼼히 틀을 잡지 않아 몇번씩 망가졌던 것은 뼈아픈 기억이다. 또한 동시작업을 처리하기 위해, 그리고 캔버스의 html 코드를 저장해두기 위해 node.js와 MongoDB를 붙여서 사용했는데 이 부분 역시 모르는 것을 찾아 그때그때 코드를 붙여가다보니 꽤나 지저분하게 만들어진 것 같다. 하지만 이렇게 또 하나 배워간다는 기쁜 마음으로 부족한 것을 메꾸어 나갈 것이다. 다시 한 번 고생한 팀원들 모두에게 깊은 감사의 인사를 전하고 싶다.
