# GitRank

Application type: Web Page
<br>
## 0. Contact
1. 2021312819 강건한 hoskal09@g.skku.edu
   FE(html+css+Js)
2. 2019310390 나인호: gnih1226@gmail.com 
   FE(html+css+Js)  
3. 2019315505 이원규: stbaker517@g.skku.edu 
   BE(nodejs+Express)



## 1. Environment settings
#### 1) 코드를 다운받습니다.
- tag에서 v2.2 이상을 다운 받습니다.
- 혹은 git clone을 사용합니다.

#### 2) 먼저, /backend/gitrank/으로 들어가신 다음 npm start으로 서버를 엽니다.
```
cd backend/gitrank
```
```
npm start
```
![image](https://user-images.githubusercontent.com/59384684/204947244-78529fb8-2478-47cc-97da-ffd27eff6732.png)

<br>

#### 3) CORS Error를 해결하기 위해 browser 설정을 들어가서 Access-Control-Origin을 *로 변경합니다.

##### - **이때, Gitrank의 경우 CORS ERROR를 피하기 위해 잠시 모든 접근을 허용해주는 것이므로, Gitrank 이용이 끝나셨으면 기존 값으로 복구시켜야 안전합니다.**

- Chrome의 경우 Google에 Allow Cors를 검색하시면 플러그인이 검색됩니다.
![image](https://user-images.githubusercontent.com/59384684/204947378-af86b9f4-1da5-407c-9856-fd69b43b2e23.png)

- 해당 플로그인을 설치하신 다음 우측 상단 퍼즐 모양 아이콘을 클릭하셔서 설치된 플러그인을 활성화 합니다.
![image](https://user-images.githubusercontent.com/59384684/204947531-01ccdae3-06f5-4c09-9707-5db4a9f3bfca.png)

- 왼쪽에 위치한 이미지를 통해 on/off를 설정하실 수 있습니다.
- 오른쪽에서 Open options page를 클릭해서 설정 창에 들어갑니다.
![image](https://user-images.githubusercontent.com/59384684/204948494-840111ff-03f8-4a4b-8ab4-7577780e215f.png)

- 5.Access-Control-Origin을 *으로 체크하신 다음, 밑으로 내려서 Add a rule 버튼을 눌러줍니다.

![image](https://user-images.githubusercontent.com/59384684/204948616-023413af-8bf2-47a1-b1c9-bbfeeccbfe4e.png)

***
![image](https://user-images.githubusercontent.com/59384684/204948725-de640754-3773-4fac-83a5-241b344711de.png)

<br>

#### 4) 다음으로, /frontend/signin.html을 여시면 됩니다.
![image](https://user-images.githubusercontent.com/59384684/204946506-dd8df495-3774-4d59-b37e-ec32fec7ba0b.png)

<br>

#### 5) privateInfo 관련 문제가 발생하셨으면, /backend/gitrank/routes 에 privateInfo.js 파일을 생성합니다.
- Github API Key를 발급받으시고, 키를 넣어주시면 됩니다.

![image](https://user-images.githubusercontent.com/59384684/204950669-c26bc71b-27e4-455e-9817-9bdc0008e7f7.png)

## 2. User's Guide

### 1) signin.html
![image](https://user-images.githubusercontent.com/59384684/204946506-dd8df495-3774-4d59-b37e-ec32fec7ba0b.png)

- 첫 화면입니다.
- 회원정보가 없으므로, 회원가입을 진행합니다.
- 상단의 [Sign Up]()을 클릭합니다.

***

- 회원가입이 완료되었으면 ID와 PW를 입력하고 로그인 합니다.
- 로그인 과정에서 3가지 경우가 발생할 수 있습니다.
1. ID와 PW가 일치한 경우 : 로그인이 성공하였기에, rank.html으로 화면이 변경됩니다.
![image](https://user-images.githubusercontent.com/59384684/204951464-3e3b707d-38e8-422e-8985-16b002e3e62c.png)
- 이때, 이미 로그인한 유저가 다시 시도하면, "error:already signedin"이 출력됩니다.
2. ID가 틀린 경우 : "error:no such user"이 출력됩니다.
![image](https://user-images.githubusercontent.com/59384684/204951642-9a53de6e-6dfd-4355-a136-e0b2f9f14975.png)
3. PW가 틀린 경우 : "error:password doesn't match"이 출력됩니다.
![image](https://user-images.githubusercontent.com/59384684/204951768-01851558-058f-44fb-b58c-b656b409cd62.png)
***
- 다른 페이지에서 넘어오거나, 새로운 창으로 signin을 접속하실 경우, 중복 로그인 방지를 위해 기존에 접속했던 유저는 로그아웃 됩니다.
![image](https://user-images.githubusercontent.com/59384684/204951961-c9be85a4-0a11-4637-9eca-84acbdaba321.png)
<br>

### 2) signup.html

![image](https://user-images.githubusercontent.com/59384684/204952196-104bbe2c-3561-4bcd-b1da-cb701e63827e.png)
- 회원가입 화면입니다.
- 이미 회원가입을 진행하셨다면, [Log in]()을 눌러 로그인 화면으로 넘어가시면 됩니다.
- ID, PW, GITHUB는 향후 수정이 불가하오니 정확한 정보를 입력해주십시오.
- ID, GITHUB는 중복이 불가능합니다.
<br>

- Interests와 Language는 체크박스로 구현되었습니다.
- 자유롭게 선택하시면 됩니다. 단, 적어도 한개씩은 선택하셔야 합니다.
- 그렇지 않으면, 경고문이 출력되고 회원가입이 진행되지 않습니다.
![image](https://user-images.githubusercontent.com/59384684/204952830-ae29b5b2-d0a5-46da-adad-2f2c235fb0cd.png)

- 모든 정보를 입력하셨으면 SIGN UP 버튼을 눌러 회원가입을 완료합니다.
- 회원가입을 성공하면 자동으로 로그인 화면으로 넘어갑니다.
<br>

- 회원가입한 정보는 자동으로 /backend/gitrank/DB/에 있는 DB_user.json, DB_profilfe.json에 저장됩니다.
- DB_user.json은 모든 이용자의 ID와 PW를 관리합니다.
- DB_profile.json은 모든 이용자의 ID, GITHUB, 프로필 이미지, Interests, Skills(Languages), Contact(E-mail address), Comment, Score를 관리합니다.
<br>

### 3) rank.html
![image](https://user-images.githubusercontent.com/59384684/204953693-79fb6d85-4211-4510-9d66-6a7e3b1968a5.png)
- 로그인을 성공하면, 저희 앱의 메인 페이지인 rank 화면으로 넘어옵니다.
- 가입한 유저들의 순위를 확인하실 수 있으며, 순위는 score 내림차순으로 매겨집니다.
- 자신이 찾는 특정 유저를 검색하실 수도 있습니다.
<br>

- 더 많은 유저가 회원가입하면,
![image](https://user-images.githubusercontent.com/59384684/204954085-8ec09514-3928-46d4-99a2-a155f44b902a.png)

***

#### Search
검색은 총 3가지 방식으로 할 수 있습니다.
![image](https://user-images.githubusercontent.com/59384684/204954596-6bca54a9-5d92-4cab-83cb-e8edb550f0dc.png)

ID, Interests, Skills를 눌러서 방식을 변경하실 수 있습니다.
<br>
<br>

##### 1. ID : 특정 ID를 검색합니다. ID를 입력하고 Search 버튼을 클릭합니다.
a. 검색한 ID가 유효하면(정확하면),
<br>

![image](https://user-images.githubusercontent.com/59384684/204954991-ee9f5294-a2f2-48f9-9296-b03da8154e5a.png)
<br>
b. 검색한 ID가 유효하지 않으면,
<br>

![image](https://user-images.githubusercontent.com/59384684/204955140-a615d9c0-8610-4012-a957-b27b1a0c89e2.png)
<br>
c. 아무것도 입력하지 않으면,
<br>

![image](https://user-images.githubusercontent.com/59384684/204955454-37a9d119-dffd-43b4-8afb-26fd0239d1fb.png)
<br>
모든 이용자를 불러옵니다. 이는 Interests, Skills에서도 마찬가지입니다.
<br>
<br>

##### 2. Interests : 검색한 Interest를 갖고 있는 유저들을 출력합니다. 검색된 유저들은 Score 순으로 순위가 매겨집니다.
드롭다운을 눌러서 Interests를 선택합니다.

![image](https://user-images.githubusercontent.com/59384684/204954596-6bca54a9-5d92-4cab-83cb-e8edb550f0dc.png)
<br>
ID와 같은 방법으로 검색하시면 됩니다.
이때, 대소문자를 구분하셔야 합니다.

![image](https://user-images.githubusercontent.com/59384684/204956101-95202666-8944-46f4-b048-a6bdaad59836.png)
<br>
마찬가지로, 검색창이 비워져 있으면 모든 유저가 출력됩니다.
<br>
<br>

##### 3. Skills : 검색한 Skill을 갖고 있는 유저들을 출력합니다. 검색된 유저들은 Score 순으로 순위가 매겨집니다.
Interests와 같은 방식입니다.
다만, C#의 경우 검색이 안되고 있습니다. 참고하시기 바랍니다.
<br>
- 현재 Interest와 Skills의 경우 1개를 입력한 경우에만 검색이 성공합니다.
- 다중 검색이 가능하도록 해보세요!!
<br>

***

#### Profile

- 순위창에서 각 유저의 ID는 버튼으로 되어 있습니다.
- 클릭하시면, 해당 유저의 프로필 화면으로 넘어갑니다.

<img width="696" alt="image" src="https://user-images.githubusercontent.com/59384684/204959109-cea3ba26-1627-4a6f-9ee7-f1d6c5d453eb.png">

<br>

- 마지막으로 nav에 위치한 My profile을 누르면, 내 프로필 화면으로,
- Sign Out을 누르면 로그인 화면으로 이동합니다. signin에서 설명한 대로, 기존에 로그인된 정보는 로그아웃됩니다.
<br>

### 4) profile.html

![image](https://user-images.githubusercontent.com/59384684/204959761-3b60e903-b7e6-4145-977f-9d2fd1b3e468.png)
<br>
유저의 프로필 페이지 입니다.
<br>
- Github에 있는 유저의 Github를 클릭하면, 해당 유저의 Github 페이지로 이동합니다.
<br>

- Contact에 있는 e-mail 주소를 누르면 해당 유저에게 메일을 보내실 수 있습니다.

![image](https://user-images.githubusercontent.com/59384684/204960107-f8ea9952-7bd6-4c53-8a9e-fb770c2d0df9.png)

<br>

- Rating Score 밑의 그림은 해당 유저의 Github 활동을 보여줍니다.

![image](https://user-images.githubusercontent.com/59384684/204960233-f9f4816b-1acc-4bfd-8540-8c9a55f9dbbb.png)
<br>
그림은 [잔디]("https://ghchart.rshah.org/) 를 사용하였습니다.
"https://ghchart.rshah.org/ + user.GITHUB을 하시면, 해당 유저의 활동을 볼 수 있습니다.

<br>

### 5) myprofile.html

![image](https://user-images.githubusercontent.com/59384684/204960618-042a8e17-38f7-4f05-b372-1c655a41e4db.png)
<br>
내 프로필 화면입니다.
- nav의 Edit을 눌러 정보를 수정하실 수 있습니다.

***
v2.2에서 Score 갱신 버튼이 추가되었습니다.
![image](https://user-images.githubusercontent.com/59384684/204960925-64473366-99de-4631-b103-c48bedbbbf40.png)
<br>
- Refresh를 누르면 내 점수가 새롭게 갱신됩니다.
- 갱신된 점수는 자동으로 DB에서도 갱신됩니다.
***
<br>

### 6) edit.html

![image](https://user-images.githubusercontent.com/59384684/204961103-f72c3f20-d3f0-48bc-b6f6-ad225f5c39e1.png)
<br>
내 프로필 수정 페이지 입니다.
- 회원가입과 동일하게 Intersts와 Skills는 체크박스로 구현되어 있습니다.
- 수정하기 전 정보들이 기본적으로 입력되어 있습니다.
<br>

- 이미지는 Upload 버튼을 눌러 수정하실 수 있습니다.

![image](https://user-images.githubusercontent.com/59384684/204961323-8fdad67e-415e-45cd-ab0d-b5bb349de5d3.png)
<br>
***
![image](https://user-images.githubusercontent.com/59384684/204961352-1564412e-7354-4fdd-9332-1a0fd0ac356d.png)
<br>
이미지 크기를 포함해서 모든 정보는 5mb보다 작아야 합니다.
제한은 /backend/gitrank/app.js에서 수정하실 수 있습니다.
```
app.use(bodyParser.json({ limit: 5000000 }));
```
***

- 수정이 끝났으면 Done 버튼을 수정을 완료합니다.
이제 수정한 대로 프로필이 변경되었습니다.

![image](https://user-images.githubusercontent.com/59384684/204961754-ddfc1efe-ed2c-45c5-b54f-45faf898e2f2.png)
<br>

- 수정한 정보는 서버와 DB에서도 변경됩니다.
***
<br>
이제, 검색 기능을 사용해서 원하는 유저와 연락을 주고 받고, 팀을 맺어보세요!!

<br>
<br>

## 3. Developer Process
### 1) Backend - Nickel
<br>

### 2) Frontend - Nainho, GeonhanKang
<br>

1. 디자인을 figma을 통해 구체화 하였습니다. - GeonhanKang
- https://www.figma.com/file/TaEClcdcmMnILS2NVMk9js/Untitled?node-id=0%3A1&t=NKB6CDXMMmJ9IpN2-1
<br>

2. figma를 이용해서 1차로 HTML을 개발하였습니다. - Nainho, GeonhanKang
- branch : frontend, inho, frontend_htmlcss, rank, rankpage 참고
- signin.html, signup.html, rank.html, profile.html, myprofile.html, edit.html
<br>

3. Local storage를 이용해서 JS를 구현하였습니다. - Nainho
- tag : v0.2.0 참고
- signin.js, signup.js, rank.js, myprofile.js, edit.js
<br>

4. Backend와 연동하여 서버에 데이터를 저장하게 하였습니다. - Nainho
- tag : v1.0 참고
- signin.js, signup.js, rank.js, myprofile.js, profile.js, edit.js
<br>

5. HTML을 Bootstrap을 사용해서 다듬었습니다. - GeonhanKang
- branch : frontend_htmlcss 참고
- signin.html, rank.html, profile.html, myprofile.html, edit.html
<br>

6. Backend에서 추가된 DB를 붙여서, 서버가 종료되어도 데이터를 보존하게 하였습니다. - Nainho
- tag : v2.0 참고
<br>

7. 세부 기능이 구체화 되었습니다. - Nainho
- tag : v2.1 이상 참고
<br>

#### a) HTML - Nainho, GeonhanKang

1) signin.html
2) signup.html
3) rank.html
4) profile.html
5) myprofile.html
6) edit.html

<br>

#### b) JS - Nainho

1) signin.js
- window.onload : 이미 로그인된 유저가 있으면, 로그아웃 시키기
- Log in 버튼(id=btn_login)의 클릭 이벤트 : 입력받은 ID, PW 검사하고 backend에 정보를 보내서 로그인
- 로그인이 완료되면 ID와 PW 정보를 local stroage에 저장하고, rank로 페이지 이동.

<br>

2) signup.js
- Sign Up 버튼(id=btn_signup)의 클릭 이벤트 : 입력받은 정보를 backend에 보낸다.
- Interests, Skills의 체크박스가 클릭되면 그 내용 array에 저장하여 backend로 전송.
- 회원가입을 성공하면 local storage에 저장하고, signin으로 페이지 이동

<br>

3) rank.js
- window.onload : 순위창을 비운다음, 서버에서 유저들의 정보를 가져와서 순서대로 나열.
- dropdown 안의 버튼 클릭 이벤트 : 각 버튼이 클릭되면, id=search_item의 innerHTML 변경하고, 검색어의 종류를 변경. (target 1: ID, 2: Interests, 3:Skills)
- loadTable() : 정보가 들어오면 순위창에 집어넣는다. ID는 버튼으로, 클릭이 되면 해당 유저의 정보를 서버에서 받아온 다음, 그 유저의 프로필 화면으로 넘어간다.
- Search 버튼(id=btn_search)의 클릭 이벤트 : target에 맞게 검색창(id=data_searched)을 검색한다. 서버에서 정보를 받아온 다음, 순위창을 갱신한다.

<br>

4) profile.js
- window.onload : profile이 저장된 local storage의 정보를 바탕으로 프로필 구성.

<br>

5) myprofile.js
- window.onload : local storage에 저장된 로그인 유저 정보를 이용해서 서버에서 정보를 가져온다. 받은 정보를 토대로 프로필을 구성한다.
- refresh 버튼(id=refresh)의 클릭 이벤트 : score을 backend에 요청해서 그 정보를 갱신한다. 갱신된 점수를 받아와서 id=user_rank에 다시 쓴다.

<br>

6) edit.js
- window.onload : local storage에 저장된 로그인 유저 정보를 이용해서 서버에서 정보를 가져온다. 받은 정보를 토대로 수정 전 정보를 default 값으로 입력한다.
- checkITR() : 입력된 Interests를 토대로 체크박스를 체크한다.
- checkSK() : 입력된 Skills를 토대로 체크박스를 체크한다.
- Done 버튼(id=btn_done)의 클릭 이벤트 : 수정된 정보를 서버에 전달한다. 전달받은 정보를 토대로 서버에서 갱신이 성공적으로 이뤄지면, myprofile으로 이동한다.
- readImage() : Upload를 통해서 이미지를 변경한다.

<br>
우수 프로젝트 시상 프로그램에 지원합니다.
