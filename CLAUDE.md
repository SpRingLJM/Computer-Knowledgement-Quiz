# Computer-Knowledgement-Quiz

컴퓨터 상식 + DevOps 실무 퀴즈 사이트. 빌드 도구·서버·의존성이 없는 **순수 정적 사이트**다.

- 공개 주소: https://springljm.github.io/Computer-Knowledgement-Quiz/
- 배포: GitHub Pages (main 브랜치 루트). **main 에 push 하면 그대로 배포된다** — 별도 파이프라인 없음.

## 스택

바닐라 HTML/CSS/JS. 프레임워크·번들러·패키지 매니저를 쓰지 않는다. 스크립트는 `index.html` 에서 순서대로 로드되는 전역 객체들이다 (`Store` → `Theme` → `Scheduler` → `Quiz` → `app.js`). ES 모듈이 아니므로 **새 JS 파일을 만들면 `index.html` 에 `<script>` 태그를 반드시 추가**해야 한다.

## 구조

```
index.html        스크립트 로드 순서, 메타태그, 테마 부트스트랩(FOUC 방지 인라인)
css/style.css     CSS 변수 팔레트 — :root(다크) / :root[data-theme="light"]
js/store.js       localStorage 상태. 스키마를 바꾸면 migrate() 에 이전 데이터 처리 추가
js/theme.js       라이트/다크 토글
js/scheduler.js   오답노트 간격 반복 (1일 → 3일/7일)
js/quiz.js        TRACKS/CATEGORIES 정의, 시드 난수 일일 세트, 채점(grade/gradeEssay/gradeTask)
js/app.js         해시 라우팅 + 전 화면 렌더링
js/data/*.js      문제은행. window.QUIZ_BANK[cat] 에 등록
```

## 컨벤션

- **문제 텍스트는 한국어**, 코드 식별자·커밋 메시지는 영어.
- 모든 문제에 `explain`(해설)과 `example`(실사용 예시/사례)이 **필수**다. 하나라도 빠지면 검증에서 걸린다.
- 문제 본문에서 `` `백틱` `` 은 `<code>` 로 렌더링된다.
- 색상은 하드코딩하지 말고 CSS 변수를 쓴다. 라이트 테마가 함께 깨진다.
- 문제 유형 5종: `ox` · `mcq` · `short` · `essay` · `task`. 포맷은 README 참고.
- 트랙은 `general`(상식) / `devops`(실무). 새 분야는 `CATEGORIES` 에 `track` 과 함께 등록.

## 주의

- **heredoc 으로 JS 를 쓰지 말 것.** 이 환경의 Bash heredoc 이 백슬래시를 삼켜 `\n` 이 실제 줄바꿈이 된다. Write/Edit 도구를 쓴다.
- 단답형·과제형 채점은 `quiz.js` 의 `norm()` 으로 정규화한다 (소문자화, 앞뒤 공백, 선행 `$`, `;` `` ` `` `'` `"` 제거). 정답을 쓸 때 이 정규화를 전제로 `accept` 를 넉넉히 준다.
- 저장 키는 `devops_quiz_v1` 이다. 이름이 옛 이름이지만 **바꾸면 기존 사용자 기록이 날아간다.**

## 검증

문제은행을 고친 뒤에는 반드시 유효성 검사를 돌린다. 유형별 필수 필드, 난이도 값, mcq answer 범위, index.html 스크립트 등록 여부를 확인하고 분야별 분포를 출력한다.

```bash
node tools/validate.js        # 실패 시 exit 1
python -m http.server 8765    # http://localhost:8765
```
