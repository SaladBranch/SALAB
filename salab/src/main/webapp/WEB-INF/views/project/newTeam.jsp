<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>new Team</title>
    <link rel="stylesheet" href="/salab/resources/css/project/newTeam.css">
    <link rel="stylesheet" href="c/salab/resources/css/common.css">
</head>
<body>
  <div class="top">
      <div class="lev"><p class="first">① 프로젝트 생성</p></div>
      <div class="lev"><p class="second">② 팀원 초대</p></div>
      <div class="lev"><p class="third">③ 완료</p></div>
  </div>
  
   <div class="middle">
       <p class="projectTile">프로젝트 이름을 입력해주세요</p>
       
   </div>
    <div class="middle">
        <form action="investTeam.do">
        <input id="input" type="text" name="projectname" placeholder="프로젝트 이름">
        <p>프로젝트를 생성 후에 팀원을 초대할 수 있습니다.</p>
        <button class="btn" type="submit">프로젝트 생성</button>
    </form>
    </div>
</body>
</html>