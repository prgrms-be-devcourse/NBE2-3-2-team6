<img width="1710" alt="스크린샷 2025-01-05 21 20 28" src="https://github.com/user-attachments/assets/0e6c801a-11ec-48ac-9c84-501aff7fa7f1" />



## 👋 프로젝트 소개
REDBOX는 사용자에게 기부받은 헌혈증이 모이는 곳이며, 모인 헌혈증은 REDBOX에서 관리합니다.

## 🚀 배포 링크
👉 [프로젝트 바로가기](https://react-practice-7f2j.vercel.app/)

## 🤷‍ 기획배경
최근 5년간 헌혈증서 발급 수에 비해 9.13%만이 실제 수혈 비용 청구에 사용하였고, 헌혈증서 발급에 5년간 5억 8천 4백만원 지출, 헌혈자가 직접 헌혈증서를 양도해야만 사용할 수 있어 접근성이 제한되는 문제가 발생합니다.
직관적이고 손쉬운 사용이 가능한 온라인 플랫폼 REDBOX를 통해 접근성 제한 문제를 해결하고 넓은 범위의 이용자들이 편리하게 이용할 수 있게 하고자 기획하였습니다.


## 🧑‍🤝‍🧑 참가인원 및 역할

<table>
  <tr>
    <td>
        <a href="https://github.com/jeong-sys">
            <img src="https://avatars.githubusercontent.com/jeong-sys?v=4" width="100px" />
        </a>
    </td>
    <td>
        <a href="https://github.com/Jhyngu">
            <img src="https://avatars.githubusercontent.com/Jhyngu?v=4" width="100px" />
        </a>
    </td>
    <td>
        <a href="https://github.com/leeys9423">
            <img src="https://avatars.githubusercontent.com/leeys9423?v=4" width="100px" />
        </a>
    </td>
    <td>
        <a href="https://github.com/Bin-Choi">
            <img src="https://avatars.githubusercontent.com/Bin-Choi?v=4" width="100px" />
        </a>
    </td>
  </tr>
  <tr>
    <td><b>허유정(팀장)</b></td>
    <td><b>정현구</b></td>
    <td><b>이영섭</b></td>
    <td><b>최성빈</b></td>
  </tr>
  <tr>
    <td><b>요청 게시판, 관리자</b></td>
    <td><b>인증, 통계</b></td>
    <td><b>레디스, 배포</b></td>
    <td><b>기부, 관리자</b></td>
  </tr>
</table>



## ⚙️ 주요기능
- 사용자는 회원가입 및 로그인이 가능하다.
  - 소셜 로그인(네이버)도 가능하다.
- 사용자는 직접 헌혈증을 등록할 수 있다.
  - 헌혈증 증서번호는 중복될 수 없다.
- 사용자는 레드박스 또는 개인에게 헌혈증을 기부할 수 있다.
- 사용자는 헌혈의 집 위치 조회가 가능하다
- 사용자는 헌혈증 요청 게시글 작성이 가능하다
- 관리자는 사용자로부터 게시글 등록 요청을 수락, 거절 가능하다
- 관리자는 공지사항, 헌혈기사 등록이 가능하다
- <a href="https://www.notion.so/api-fe7b0fad54584ab5bed724476a29bc14?pvs=4">API 명세서</a>



## 🗒️ 다이어그램

<details>
  <summary><b>💽 ERD</b></summary>

  <img width="1131" alt="스크린샷 2025-01-05 21 42 10" src="https://github.com/user-attachments/assets/c6e901a0-42ad-4e90-ac5d-b6fb0f59c77d" />

</details>

<details>
  <summary><b>🔀 시스템 아키텍처</b></summary>

![-2024-12-11-1647](https://github.com/user-attachments/assets/e1a434e5-e0e8-4144-8222-e43239125a50)

</details>



## 🛠️ 사용기술

### BE
![Java](https://img.shields.io/badge/Java-007396?style=flat-square&logo=java&logoColor=white)
![image](https://img.shields.io/badge/Spring_Boot-F2F4F9?style=flat-square&logo=spring-boot)

### FE
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)

### DB 접근
![Static Badge](https://img.shields.io/badge/Spring_data_JPA-lightgreen)
![Static Badge](https://img.shields.io/badge/QueryDsl-black)

### DB
![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=flat-square&logo=mariadb&logoColor=white)
<img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=Redis&logoColor=white">

### 인증 관련
<img src="https://img.shields.io/badge/Spring Security-6DB33F?style=flat-square&logo=Spring Security&logoColor=white"> <img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=JSON%20web%20tokens&logoColor=white"> <img src="https://img.shields.io/badge/OAuth 2.0-3EAAAF?style=flat-square&logo=oauth&logoColor=white">


### 기타
<img src="https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/Slack-4A154B?style=flat-square&logo=slack&logoColor=white"> <img src="https://img.shields.io/badge/IntelliJ IDEA-4A154B?style=flat-square&logo=intellijidea&logoColor=white"> ![Jira](https://img.shields.io/badge/Jira-0052CC?style=flat-square&logo=jira&logoColor=white)




## 📦 패키지 구조

<details>
  <summary><b>펼치기</b></summary>

```
📦 backend [redbox]
 ┣ 📂.gradle
 ┣ 📂.idea
 ┣ 📂build
 ┣ 📂gradle
 ┣ 📂redis
 ┣ 📂src
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📂generated
 ┃ ┃ ┣ 📂java
 ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃   ┗ 📂redbox
 ┃ ┃ ┃     ┗ 📂domain
 ┃ ┃ ┃       ┣ 📂admin
 ┃ ┃ ┃       ┃ ┣ 📂application
 ┃ ┃ ┃       ┃ ┣ 📂controller
 ┃ ┃ ┃       ┃ ┣ 📂dto
 ┃ ┃ ┃       ┃ ┗ 📂exception
 ┃ ┃ ┃       ┣ 📂article
 ┃ ┃ ┃       ┃ ┣ 📂controller
 ┃ ┃ ┃       ┃ ┣ 📂dto
 ┃ ┃ ┃       ┃ ┣ 📂entity
 ┃ ┃ ┃       ┃ ┣ 📂exception
 ┃ ┃ ┃       ┃ ┣ 📂repository
 ┃ ┃ ┃       ┃ ┗ 📂service
 ┃ ┃ ┃       ┣ 📂attach
 ┃ ┃ ┃       ┃ ┣ 📂dto
 ┃ ┃ ┃       ┃ ┣ 📂entity
 ┃ ┃ ┃       ┃ ┣ 📂exception
 ┃ ┃ ┃       ┃ ┣ 📂repository
 ┃ ┃ ┃       ┃ ┣ 📂service
 ┃ ┃ ┃       ┃ ┗ 📂strategy
 ┃ ┃ ┃       ┣ 📂auth
 ┃ ┃ ┃       ┃ ┣ 📂controller
 ┃ ┃ ┃       ┃ ┣ 📂dto
 ┃ ┃ ┃       ┃ ┣ 📂entity
 ┃ ┃ ┃       ┃ ┣ 📂exception
 ┃ ┃ ┃       ┃ ┣ 📂filter
 ┃ ┃ ┃       ┃ ┣ 📂repository
 ┃ ┃ ┃       ┃ ┣ 📂service
 ┃ ┃ ┃       ┃ ┗ 📂util
 ┃ ┃ ┃       ┣ 📂dashboard
 ┃ ┃ ┃       ┃ ┣ 📂controller
 ┃ ┃ ┃       ┃ ┣ 📂dto
 ┃ ┃ ┃       ┃ ┗ 📂service
 ┃ ┃ ┃       ┣ 📂donation
 ┃ ┃ ┃       ┃ ┣ 📂application
 ┃ ┃ ┃       ┃ ┣ 📂config
 ┃ ┃ ┃       ┃ ┣ 📂controller
 ┃ ┃ ┃       ┃ ┣ 📂dto
 ┃ ┃ ┃       ┃ ┣ 📂entity
 ┃ ┃ ┃       ┃ ┣ 📂exception
 ┃ ┃ ┃       ┃ ┗ 📂repository
 ┃ ┃ ┃       ┣ 📂notice
 ┃ ┃ ┃       ┃ ┣ 📂controller
 ┃ ┃ ┃       ┃ ┣ 📂dto
 ┃ ┃ ┃       ┃ ┣ 📂entity
 ┃ ┃ ┃       ┃ ┣ 📂exception
 ┃ ┃ ┃       ┃ ┣ 📂repository
 ┃ ┃ ┃       ┃ ┗ 📂service
 ┃ ┃ ┃       ┣ 📂redbox
 ┃ ┃ ┃       ┃ ┣ 📂application
 ┃ ┃ ┃       ┃ ┣ 📂controller
 ┃ ┃ ┃       ┃ ┣ 📂dto
 ┃ ┃ ┃       ┃ ┗ 📂exception
 ┃ ┃ ┃       ┣ 📂redcard
 ┃ ┃ ┃       ┃ ┣ 📂dto
 ┃ ┃ ┃       ┃ ┣ 📂entity
 ┃ ┃ ┃       ┃ ┣ 📂exception
 ┃ ┃ ┃       ┃ ┣ 📂repository
 ┃ ┃ ┃       ┃ ┗ 📂service
 ┃ ┃ ┃       ┣ 📂request
 ┃ ┃ ┃       ┃ ┣ 📂application
 ┃ ┃ ┃       ┃ ┣ 📂controller
 ┃ ┃ ┃       ┃ ┣ 📂dto
 ┃ ┃ ┃       ┃ ┣ 📂entity
 ┃ ┃ ┃       ┃ ┣ 📂exception
 ┃ ┃ ┃       ┃ ┗ 📂repository
 ┃ ┃ ┃       ┗ 📂user
 ┃ ┃ ┃         ┣ 📂controller
 ┃ ┃ ┃         ┣ 📂dto
 ┃ ┃ ┃         ┣ 📂entity
 ┃ ┃ ┃         ┣ 📂exception
 ┃ ┃ ┃         ┣ 📂infra.s3
 ┃ ┃ ┃         ┣ 📂oauth2
 ┃ ┃ ┃         ┗ 📂util
 ┃ ┗ 📂resources
 ┃   ┣ 📂templates
 ┃   ┗ 📂static
 ┃     ┗ 📂emoticons
 ┃   ┣ .env
 ┃   ┗ application.yml
 ┗ 📂test
   ┣ 📂java
   ┃ ┗ 📂com
   ┃   ┗ 📂redbox
   ┃     ┗ 📂domain
   ┃       ┣ 📂donation.repository
   ┃       ┣ 📂redbox.application
   ┃       ┣ 📂redcard
   ┃       ┗ 📂user
   ┗ RedboxApplicationTests

```

</details>
