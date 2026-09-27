/* OS · Linux — Easy 단답형(타이핑) 57문제.
 * 각 문제에 parts(명령어 풀이)·order(순서 규칙)를 같이 두고, 파일 끝에서 문제 ID 에 맞춰 window.QUIZ_PARTS 에 등록한다.
 * 이 파일은 index.html 에서 다른 linux 문제 파일보다 뒤에 로드되어야 기존 문제 ID 가 유지된다. */
window.QUIZ_BANK = window.QUIZ_BANK || {};
window.QUIZ_BANK.linux = window.QUIZ_BANK.linux || [];
window.QUIZ_PARTS = window.QUIZ_PARTS || {};

const LINUX_EASY = [
  /* ---------------- 이동 · 탐색 ---------------- */
  { q: '한 단계 상위 디렉터리로 이동하는 명령어는?', answer: 'cd ..', accept: ['cd ../'],
    explain: '`..` 은 "현재 디렉터리의 부모" 를 뜻하는 특수 이름입니다. `.` 은 현재 디렉터리입니다. 두 개를 이어 `cd ../..` 로 두 단계 위로 갈 수 있습니다.',
    example: '`/var/log/nginx` 에서 `cd ..` 하면 `/var/log` 로 이동합니다. 로그 폴더를 오가며 확인할 때 가장 많이 치는 명령입니다.',
    parts: [['cd', '`cd`(change directory): 작업 디렉터리를 바꾸는 명령입니다.'], ['..', '부모(상위) 디렉터리를 가리키는 특수 이름입니다.']] },

  { q: '직전에 있던 디렉터리로 되돌아가는 명령어는?', answer: 'cd -', accept: [],
    explain: '`-` 는 "바로 전 디렉터리" 를 뜻합니다. 셸이 환경변수 `OLDPWD` 에 이전 위치를 기억해 두었다가 이 명령에서 씁니다. 실행하면 이동한 경로를 한 줄 출력합니다.',
    example: '`/etc/nginx` 와 `/var/www/html` 두 곳을 번갈아 오갈 때 `cd -` 를 반복하면 경로를 다시 칠 필요가 없습니다.',
    parts: [['cd', '`cd`(change directory): 디렉터리 이동 명령입니다.'], ['-', '직전 디렉터리(환경변수 OLDPWD)를 뜻합니다.']] },

  { q: '현재 디렉터리의 파일 목록을 수정 시각이 최신인 것부터 자세히 보여주는 명령어는?', answer: 'ls -lt', accept: ['ls -tl', 'ls -l -t', 'ls -lat', 'ls -alt'],
    explain: '`-l` 은 자세히(long), `-t` 는 시간(time) 순 정렬입니다. 가장 최근에 바뀐 파일이 맨 위에 옵니다. 반대로 오래된 것부터 보려면 `-r`(reverse) 을 더해 `ls -ltr` 로 씁니다.',
    example: '로그 디렉터리에서 `ls -lt | head` 로 "방금 갱신된 로그가 무엇인지" 를 바로 찾습니다.',
    parts: [['ls', '`ls`(list): 파일 목록을 보여주는 명령입니다.'], ['-lt', 'l(long: 권한·소유자·크기·시각을 자세히) · t(time: 수정 시각 순으로 정렬, 최신이 위).']],
    order: '옵션 순서는 자유입니다. `ls -tl` 도 같습니다.' },

  { q: '현재 디렉터리의 파일을 크기가 큰 것부터 사람이 읽기 쉬운 단위로 나열하는 명령어는?', answer: 'ls -lhS', accept: ['ls -lSh', 'ls -Slh', 'ls -hlS', 'ls -l -h -S', 'ls -lS -h'],
    explain: '`-S` 는 크기(Size) 순 정렬, `-h` 는 K/M/G 단위(human-readable), `-l` 은 자세히 보기입니다. 셋을 붙여 쓰면 "큰 파일부터, 읽기 쉬운 단위로" 가 됩니다.',
    example: '디스크가 찼을 때 `ls -lhS /var/log | head` 로 큰 로그 파일을 바로 찾습니다.',
    parts: [['ls', '`ls`(list): 파일 목록 명령입니다.'], ['-lhS', 'l(long: 자세히) · h(human-readable: K/M/G 단위) · S(Size: 큰 파일부터 정렬).']],
    order: '옵션 글자 순서는 자유입니다. `ls -lSh` 도 같습니다.' },

  { q: '디렉터리 `logs` 안의 파일 목록을 하위 디렉터리까지 모두 재귀적으로 보여주는 명령어는?', answer: 'ls -R logs', accept: ['ls -R logs/', 'ls --recursive logs', 'ls -lR logs'],
    explain: '`-R`(recursive) 은 하위 디렉터리 안까지 계속 들어가며 나열합니다. 깊은 구조에서는 출력이 매우 길어지므로 `| less` 로 넘겨 보는 편이 좋습니다.',
    example: '배포 산출물 폴더가 예상대로 만들어졌는지 `ls -R dist` 로 한 번에 훑어봅니다.',
    parts: [['ls', '`ls`(list): 파일 목록 명령입니다.'], ['-R', '`-R`(Recursive): 하위 디렉터리까지 재귀적으로 나열합니다. 대문자 R 입니다.'], ['logs', '나열할 디렉터리입니다.']] },

  { q: '`/etc/hostname` 파일의 내용을 화면에 출력하는 명령어는?', answer: 'cat /etc/hostname', accept: ['less /etc/hostname', 'more /etc/hostname'],
    explain: '`cat` 은 파일 내용을 그대로 표준 출력에 씁니다. 짧은 파일에 알맞고, 긴 파일은 화면이 넘어가므로 `less` 로 봅니다.',
    example: '서버 이름을 확인할 때 `cat /etc/hostname`, OS 버전은 `cat /etc/os-release` 로 봅니다.',
    parts: [['cat', '`cat`(concatenate): 파일 내용을 이어서 출력하는 명령입니다.'], ['/etc/hostname', '출력할 파일의 절대 경로입니다.']] },

  { q: '파일 `app.py` 의 내용을 줄 번호를 붙여 출력하는 명령어는?', answer: 'cat -n app.py', accept: ['cat --number app.py', 'nl app.py'],
    explain: '`-n`(number) 은 모든 줄 앞에 번호를 붙입니다. 오류 메시지에 나온 줄 번호를 찾아갈 때 편리합니다. `nl` 명령도 비슷한 일을 합니다.',
    example: '"line 42 에서 SyntaxError" 가 났을 때 `cat -n app.py | sed -n 40,45p` 로 그 근처만 확인합니다.',
    parts: [['cat', '`cat`: 파일 내용을 출력하는 명령입니다.'], ['-n', '`-n`(number): 각 줄 앞에 줄 번호를 붙입니다.'], ['app.py', '출력할 파일입니다.']] },

  { q: '파일 `app.log` 의 마지막 5줄만 출력하는 명령어는?', answer: 'tail -n 5 app.log', accept: ['tail -5 app.log', 'tail -n5 app.log', 'tail --lines=5 app.log'],
    explain: '`tail` 은 파일 끝부분을 보여줍니다. 기본은 10줄이고 `-n` 으로 줄 수를 바꿉니다. 로그는 최신 내용이 끝에 쌓이므로 `tail` 이 `head` 보다 훨씬 자주 쓰입니다.',
    example: '배포 직후 `tail -n 5 /var/log/nginx/error.log` 로 새 에러가 있는지만 빠르게 봅니다.',
    parts: [['tail', '`tail`: 파일의 끝부분을 출력하는 명령입니다.'], ['-n 5', '`-n`(number of lines): 출력할 줄 수. 여기서는 마지막 5줄.'], ['app.log', '볼 파일입니다.']],
    order: '옵션 순서는 자유입니다. `tail app.log -n 5` 도 됩니다.' },

  { q: '파일 `data.txt` 의 단어 수를 세는 명령어는?', answer: 'wc -w data.txt', accept: ['wc --words data.txt', 'cat data.txt | wc -w'],
    explain: '`wc`(word count) 는 줄(-l)·단어(-w)·바이트(-c) 수를 셉니다. 옵션 없이 쓰면 셋을 모두 출력합니다.',
    example: '원고 파일의 분량을 확인하거나, `grep ... | wc -l` 로 매칭된 줄 수를 세는 식으로 씁니다.',
    parts: [['wc', '`wc`(word count): 줄·단어·바이트 수를 세는 명령입니다.'], ['-w', '`-w`(words): 단어 수만 출력합니다.'], ['data.txt', '셀 파일입니다.']] },

  { q: '파일 `app.log` 에서 "error" 가 들어간 줄을 대소문자 구분 없이 찾는 명령어는?', answer: 'grep -i error app.log', accept: ['grep -i "error" app.log', 'grep --ignore-case error app.log', 'grep -i ERROR app.log', 'grep -in error app.log'],
    explain: '`grep` 은 기본적으로 대소문자를 구분합니다. `-i`(ignore case) 를 붙여야 `Error`, `ERROR`, `error` 를 모두 찾습니다.',
    example: '프로그램마다 로그 표기가 달라(`ERROR`, `Error`) 실무에서는 거의 항상 `-i` 를 붙여 검색합니다.',
    parts: [['grep', '`grep`: 문자열(패턴)이 있는 줄을 찾는 명령입니다.'], ['-i', '`-i`(ignore case): 대소문자를 구분하지 않습니다.'], ['error', '찾을 문자열입니다.'], ['app.log', '검색할 파일입니다.']],
    order: '옵션은 패턴 앞에 두는 것이 안전합니다. 패턴 → 파일 순서는 지켜야 합니다.' },

  { q: '파일 `app.log` 에서 "DEBUG" 가 들어간 줄을 제외하고 출력하는 명령어는?', answer: 'grep -v DEBUG app.log', accept: ['grep -v "DEBUG" app.log', 'grep --invert-match DEBUG app.log', 'grep -v debug app.log'],
    explain: '`-v`(invert) 는 매칭을 뒤집어 "패턴이 없는 줄" 만 남깁니다. 시끄러운 로그 줄을 걷어내고 중요한 것만 볼 때 씁니다.',
    example: '`tail -f app.log | grep -v DEBUG` 로 디버그 메시지를 빼고 실시간 로그를 봅니다.',
    parts: [['grep', '`grep`: 패턴이 있는 줄을 찾는 명령입니다.'], ['-v', '`-v`(invert match): 패턴이 없는 줄만 출력합니다.'], ['DEBUG', '제외할 문자열입니다.'], ['app.log', '검색할 파일입니다.']] },

  { q: '파일 `app.log` 에서 "ERROR" 가 들어간 줄이 몇 줄인지만 출력하는 명령어는?', answer: 'grep -c ERROR app.log', accept: ['grep -c "ERROR" app.log', 'grep --count ERROR app.log', 'grep ERROR app.log | wc -l'],
    explain: '`-c`(count) 는 매칭된 줄의 개수만 숫자로 출력합니다. `grep ... | wc -l` 과 같은 결과이지만 명령 하나로 끝납니다.',
    example: '배포 전후로 `grep -c ERROR app.log` 값을 비교해 에러가 늘었는지 봅니다.',
    parts: [['grep', '`grep`: 패턴이 있는 줄을 찾는 명령입니다.'], ['-c', '`-c`(count): 매칭된 줄 수만 출력합니다.'], ['ERROR', '찾을 문자열입니다.'], ['app.log', '검색할 파일입니다.']] },

  { q: '파일 `names.txt` 의 줄을 알파벳 순으로 정렬해 출력하는 명령어는?', answer: 'sort names.txt', accept: ['cat names.txt | sort'],
    explain: '`sort` 는 줄 단위로 정렬해 출력합니다. 원본 파일은 바뀌지 않습니다. 숫자 정렬은 `-n`, 역순은 `-r`, 파일에 덮어쓰려면 `-o 파일` 을 씁니다.',
    example: '`sort names.txt | uniq` 처럼 정렬 후 중복을 제거하는 조합이 매우 흔합니다. `uniq` 는 인접한 중복만 지우므로 먼저 정렬해야 합니다.',
    parts: [['sort', '`sort`: 줄을 정렬해 출력하는 명령입니다.'], ['names.txt', '정렬할 파일입니다.']] },

  { q: '`/etc/passwd` 에서 `:` 로 구분된 첫 번째 필드(사용자 이름)만 잘라 출력하는 명령어는?', answer: 'cut -d: -f1 /etc/passwd', accept: ['cut -d ":" -f 1 /etc/passwd', 'cut -d : -f1 /etc/passwd', 'cut -f1 -d: /etc/passwd', "awk -F: '{print $1}' /etc/passwd"],
    explain: '`cut` 은 각 줄을 구분자로 나눠 원하는 필드만 뽑습니다. `-d`(delimiter) 로 구분자를, `-f`(field) 로 몇 번째 필드인지 지정합니다.',
    example: '서버에 어떤 계정이 있는지 `cut -d: -f1 /etc/passwd` 로 한눈에 확인합니다.',
    parts: [['cut', '`cut`: 각 줄에서 일부 필드나 글자만 잘라내는 명령입니다.'], ['-d:', '`-d`(delimiter): 필드 구분자. 여기서는 콜론(:).'], ['-f1', '`-f`(field): 뽑을 필드 번호. 첫 번째 필드.'], ['/etc/passwd', '입력 파일입니다.']],
    order: '`-d` 와 `-f` 의 순서는 자유입니다.' },

  { q: '파일 `a.txt` 의 모든 소문자를 대문자로 바꿔 출력하는 명령어는?', answer: 'tr a-z A-Z < a.txt', accept: ["tr 'a-z' 'A-Z' < a.txt", 'cat a.txt | tr a-z A-Z', "cat a.txt | tr 'a-z' 'A-Z'", 'tr [:lower:] [:upper:] < a.txt'],
    explain: '`tr`(translate) 은 글자를 다른 글자로 바꿉니다. 파일 인자를 받지 않고 표준 입력만 읽으므로 `<` 리다이렉션이나 파이프로 넣어야 합니다.',
    example: '`echo hello | tr a-z A-Z` 처럼 스크립트에서 값을 대문자로 통일할 때 씁니다.',
    parts: [['tr', '`tr`(translate): 글자를 일대일로 바꾸는 명령입니다.'], ['a-z', '바꿀 대상: 소문자 a 부터 z 까지.'], ['A-Z', '바뀔 결과: 대문자 A 부터 Z 까지.'], ['< a.txt', '`<`: 파일 내용을 표준 입력으로 넣습니다. `tr` 은 파일 이름을 직접 받지 않습니다.']],
    order: '두 글자 집합의 순서가 중요합니다. 앞이 "바꿀 것", 뒤가 "바뀔 것" 입니다.' },

  /* ---------------- 파일 조작 ---------------- */
  { q: '파일 `a.txt` 를 `backup/` 디렉터리 안으로 복사하는 명령어는?', answer: 'cp a.txt backup/', accept: ['cp a.txt backup', 'cp ./a.txt backup/', 'cp a.txt backup/a.txt'],
    explain: '`cp 원본 대상` 순서입니다. 대상이 디렉터리면 그 안에 같은 이름으로 복사됩니다. 대상이 파일 이름이면 그 이름으로 복사(같은 이름이 있으면 덮어씀)됩니다.',
    example: '설정을 고치기 전에 `cp nginx.conf nginx.conf.bak` 으로 백업해 두는 습관이 사고를 막습니다.',
    parts: [['cp', '`cp`(copy): 파일을 복사하는 명령입니다.'], ['a.txt', '원본 파일입니다.'], ['backup/', '대상 디렉터리입니다. 끝의 `/` 는 디렉터리임을 분명히 해 줍니다.']],
    order: '원본이 먼저, 대상이 뒤입니다. 순서를 바꾸면 반대로 복사됩니다.' },

  { q: '파일 `old.log` 를 삭제하되, 지우기 전에 확인을 물어보게 하는 명령어는?', answer: 'rm -i old.log', accept: ['rm --interactive old.log'],
    explain: '`rm` 은 휴지통 없이 바로 지웁니다. `-i`(interactive) 를 붙이면 파일마다 y/n 을 묻습니다. 많은 배포판이 root 에게 `rm` 을 `rm -i` 로 별칭 설정해 둡니다.',
    example: '`rm -i *.log` 처럼 와일드카드로 여러 개를 지울 때 하나씩 확인하며 실수를 줄입니다.',
    parts: [['rm', '`rm`(remove): 파일을 삭제하는 명령입니다.'], ['-i', '`-i`(interactive): 삭제 전에 확인을 묻습니다.'], ['old.log', '삭제할 파일입니다.']] },

  { q: '비어 있는 디렉터리 `tmp` 를 삭제하는 명령어는?', answer: 'rmdir tmp', accept: ['rmdir tmp/', 'rm -r tmp', 'rm -d tmp'],
    explain: '`rmdir` 은 빈 디렉터리만 지웁니다. 안에 파일이 있으면 "Directory not empty" 로 거부하므로 실수로 통째로 지울 위험이 없습니다. 내용까지 지우려면 `rm -r` 을 씁니다.',
    example: '스크립트가 만든 임시 폴더가 정말 비었는지 확인하며 정리할 때 `rmdir` 이 안전합니다.',
    parts: [['rmdir', '`rmdir`(remove directory): 빈 디렉터리를 삭제하는 명령입니다.'], ['tmp', '삭제할 디렉터리입니다.']] },

  { q: '디렉터리 `build` 를 그 안의 내용까지 통째로 삭제하는 명령어는? (확인 없이)', answer: 'rm -rf build', accept: ['rm -rf build/', 'rm -r -f build', 'rm -fr build', 'rm -r build'],
    explain: '`-r`(recursive) 은 디렉터리와 하위 전체, `-f`(force) 는 확인 없이 진행입니다. 되돌릴 수 없으므로 경로를 두 번 확인하고, 변수를 쓸 때는 비어 있지 않은지 반드시 검사합니다.',
    example: '빌드 산출물을 지우고 다시 만들 때 `rm -rf build && npm run build` 처럼 씁니다.',
    parts: [['rm', '`rm`(remove): 삭제 명령입니다.'], ['-rf', 'r(recursive: 디렉터리 안까지 전부) · f(force: 확인 없이, 없는 파일도 오류 없이).'], ['build', '삭제할 디렉터리입니다.']],
    order: '옵션 글자 순서는 자유입니다. `rm -fr build` 도 같습니다.' },

  { q: '파일 `run.sh` 에 모든 사용자의 실행 권한을 추가하는 명령어는? (심볼릭 모드)', answer: 'chmod +x run.sh', accept: ['chmod a+x run.sh', 'chmod ugo+x run.sh'],
    explain: '`+x` 는 실행(execute) 권한을 더합니다. 대상을 생략하면 `a`(all: 소유자·그룹·기타) 가 기본입니다. 스크립트를 처음 만들면 실행 권한이 없어 `./run.sh` 가 "Permission denied" 로 실패합니다.',
    example: '새로 받은 설치 스크립트를 `chmod +x install.sh && ./install.sh` 로 실행합니다.',
    parts: [['chmod', '`chmod`(change mode): 파일 권한을 바꾸는 명령입니다.'], ['+x', '`+`(추가) `x`(execute): 실행 권한을 더합니다. 대상을 안 쓰면 모두(a)에게 적용됩니다.'], ['run.sh', '권한을 바꿀 파일입니다.']] },

  { q: '파일 `report.txt` 에서 그룹과 기타 사용자의 쓰기 권한을 제거하는 명령어는? (심볼릭 모드)', answer: 'chmod go-w report.txt', accept: ['chmod g-w,o-w report.txt', 'chmod og-w report.txt'],
    explain: '`g`(group) 와 `o`(others) 를 함께 쓰고 `-w` 로 쓰기(write) 권한을 뺍니다. 소유자(u) 권한은 그대로 둡니다. 숫자 모드와 달리 "특정 권한만 빼기" 가 가능합니다.',
    example: '공유 폴더의 문서를 남이 수정하지 못하게 `chmod go-w` 로 잠급니다.',
    parts: [['chmod', '`chmod`(change mode): 권한 변경 명령입니다.'], ['go-w', 'g(group) o(others) 에게서 `-`(제거) w(write: 쓰기) 권한을 뺍니다.'], ['report.txt', '대상 파일입니다.']] },

  { q: '디렉터리 `www` 와 그 안의 모든 파일·하위 디렉터리의 소유자를 `nginx` 로 바꾸는 명령어는?', answer: 'chown -R nginx www', accept: ['chown -R nginx www/', 'chown --recursive nginx www', 'chown -R nginx: www', 'chown -R nginx:nginx www'],
    explain: '`chown` 은 파일 하나만 바꾸므로 디렉터리 전체는 `-R`(recursive) 이 필요합니다. `사용자:그룹` 형식으로 그룹까지 함께 바꿀 수 있습니다.',
    example: '웹 루트를 root 로 만든 뒤 `chown -R nginx:nginx /var/www` 로 넘겨야 웹 서버가 파일을 읽고 씁니다.',
    parts: [['chown', '`chown`(change owner): 파일 소유자를 바꾸는 명령입니다.'], ['-R', '`-R`(Recursive): 디렉터리 안까지 모두 적용합니다.'], ['nginx', '새 소유자 사용자 이름입니다.'], ['www', '대상 디렉터리입니다.']] },

  { q: '파일 `data.db` 를 가리키는 하드 링크 `data.db.link` 를 만드는 명령어는?', answer: 'ln data.db data.db.link', accept: [],
    explain: '`ln` 을 `-s` 없이 쓰면 하드 링크입니다. 같은 데이터(inode)를 가리키는 또 하나의 이름이라, 원본을 지워도 링크로 내용에 접근할 수 있습니다. 심볼릭 링크(`-s`)는 경로를 가리키는 바로가기라 원본이 사라지면 깨집니다.',
    example: '백업 도구가 바뀌지 않은 파일을 복사 대신 하드 링크로 연결해 공간을 아끼는 방식(rsync `--link-dest`)에 쓰입니다.',
    parts: [['ln', '`ln`(link): 링크를 만드는 명령입니다. `-s` 가 없으면 하드 링크입니다.'], ['data.db', '원본(대상) 파일입니다.'], ['data.db.link', '새로 만들 링크 이름입니다.']],
    order: '원본이 먼저, 링크 이름이 뒤입니다.' },

  { q: '파일 `run.sh` 의 종류(텍스트인지, 실행 파일인지 등)를 알려주는 명령어는?', answer: 'file run.sh', accept: [],
    explain: '`file` 은 확장자가 아니라 내용(매직 넘버)을 보고 파일 종류를 판별합니다. 확장자가 없거나 잘못된 파일이 무엇인지 알아낼 때 씁니다.',
    example: '다운로드한 `setup` 파일이 셸 스크립트인지 바이너리인지 `file setup` 으로 확인한 뒤 실행합니다.',
    parts: [['file', '`file`: 파일 내용을 분석해 종류를 알려주는 명령입니다.'], ['run.sh', '확인할 파일입니다.']] },

  { q: '파일 `app.conf` 의 크기·권한·소유자·마지막 수정 시각 등 상세 정보를 보여주는 명령어는?', answer: 'stat app.conf', accept: ['ls -l app.conf'],
    explain: '`stat` 은 `ls -l` 보다 자세히, 접근(Access)·수정(Modify)·상태 변경(Change) 시각과 inode 번호까지 보여줍니다.',
    example: '"누가 언제 이 설정을 바꿨지?" 를 추적할 때 `stat app.conf` 의 Modify 시각을 로그와 대조합니다.',
    parts: [['stat', '`stat`(status): 파일의 상세 메타데이터를 보여주는 명령입니다.'], ['app.conf', '확인할 파일입니다.']] },

  { q: '파일 `image.iso` 의 SHA-256 체크섬을 계산하는 명령어는?', answer: 'sha256sum image.iso', accept: ['shasum -a 256 image.iso', 'openssl dgst -sha256 image.iso'],
    explain: '다운로드한 파일이 손상되거나 변조되지 않았는지, 배포처가 공개한 체크섬과 비교합니다. `md5sum` 도 있지만 보안 검증에는 SHA-256 을 씁니다.',
    example: 'OS 설치 이미지를 받은 뒤 `sha256sum ubuntu.iso` 값이 공식 사이트의 값과 같은지 확인하고 씁니다.',
    parts: [['sha256sum', '`sha256sum`: SHA-256 해시(체크섬)를 계산하는 명령입니다.'], ['image.iso', '검사할 파일입니다.']] },

  /* ---------------- 압축 ---------------- */
  { q: '`app.tar.gz` 안에 어떤 파일이 들어 있는지 풀지 않고 목록만 보는 명령어는?', answer: 'tar -tzf app.tar.gz', accept: ['tar tzf app.tar.gz', 'tar -tf app.tar.gz', 'tar tf app.tar.gz', 'tar -ztf app.tar.gz', 'tar --list -f app.tar.gz'],
    explain: '`-t`(list) 는 목록만 출력, `-z` 는 gzip, `-f` 는 파일 지정입니다. 압축을 풀기 전에 안에 무엇이 있는지, 최상위 폴더가 있는지 확인하는 습관이 좋습니다.',
    example: '`tar -tzf release.tar.gz | head` 로 풀었을 때 현재 폴더에 파일이 흩뿌려지지 않는지 먼저 봅니다.',
    parts: [['tar', '`tar`(tape archive): 여러 파일을 하나로 묶거나 푸는 명령입니다.'], ['-tzf', 't(list: 목록만) · z(gzip 압축) · f(file: 바로 뒤에 파일 이름).'], ['app.tar.gz', '살펴볼 아카이브 파일입니다.']],
    order: '`f` 는 옵션 묶음의 맨 끝에 있어야 합니다. 바로 뒤에 파일 이름이 오기 때문입니다.' },

  { q: '`site.zip` 압축 파일을 현재 디렉터리에 푸는 명령어는?', answer: 'unzip site.zip', accept: ['unzip ./site.zip'],
    explain: 'zip 형식은 `tar` 가 아니라 `unzip` 으로 풉니다. `-d 폴더` 를 붙이면 지정한 폴더에 풀고, `-l` 은 목록만 봅니다.',
    example: '윈도우에서 만든 자료를 서버로 받았을 때 `unzip site.zip -d /var/www` 로 원하는 위치에 풉니다.',
    parts: [['unzip', '`unzip`: zip 형식 압축을 푸는 명령입니다.'], ['site.zip', '풀 파일입니다.']] },

  { q: '디렉터리 `photos` 를 하위 내용까지 포함해 `photos.zip` 으로 압축하는 명령어는?', answer: 'zip -r photos.zip photos', accept: ['zip -r photos.zip photos/', 'zip -r photos photos'],
    explain: '`zip` 은 기본적으로 파일만 담고 디렉터리 안으로 들어가지 않습니다. `-r`(recursive) 을 붙여야 하위 파일까지 포함됩니다. 결과 파일 이름이 원본보다 먼저 옵니다.',
    example: '윈도우 사용자에게 보낼 자료는 `tar.gz` 보다 `zip -r` 로 묶는 편이 받는 쪽에서 편합니다.',
    parts: [['zip', '`zip`: zip 형식으로 압축하는 명령입니다.'], ['-r', '`-r`(recursive): 디렉터리 안까지 모두 포함합니다.'], ['photos.zip', '만들어질 압축 파일 이름입니다.'], ['photos', '압축할 디렉터리입니다.']],
    order: '결과 파일(photos.zip)이 먼저, 압축할 대상이 뒤입니다. `tar` 와 마찬가지로 순서를 바꾸면 안 됩니다.' },

  { q: '파일 `big.log` 를 gzip 으로 압축해 `big.log.gz` 로 만드는 명령어는?', answer: 'gzip big.log', accept: ['gzip -9 big.log', 'gzip -k big.log'],
    explain: '`gzip` 은 파일 하나를 압축하고 원본을 삭제한 뒤 `.gz` 파일만 남깁니다. 원본을 남기려면 `-k`(keep) 를 붙입니다. 여러 파일을 묶는 기능은 없어 폴더는 `tar` 와 함께 씁니다.',
    example: '오래된 로그를 `gzip access.log.1` 로 압축하면 텍스트라 보통 1/10 크기가 됩니다.',
    parts: [['gzip', '`gzip`: 파일 하나를 gzip 형식으로 압축하는 명령입니다. 원본은 지워지고 .gz 가 남습니다.'], ['big.log', '압축할 파일입니다.']] },

  { q: '`big.log.gz` 의 압축을 풀어 원래 `big.log` 로 되돌리는 명령어는?', answer: 'gunzip big.log.gz', accept: ['gzip -d big.log.gz', 'gunzip -k big.log.gz', 'gzip -dk big.log.gz'],
    explain: '`gunzip` 은 `gzip -d`(decompress) 와 같습니다. 풀면 `.gz` 파일은 사라지고 원본 이름의 파일이 생깁니다. 풀지 않고 내용만 보려면 `zcat` 이나 `zless` 를 씁니다.',
    example: '압축된 옛 로그를 검색할 때는 풀지 않고 `zgrep ERROR access.log.2.gz` 로 바로 찾을 수 있습니다.',
    parts: [['gunzip', '`gunzip`: gzip 압축을 푸는 명령입니다. `gzip -d` 와 같습니다.'], ['big.log.gz', '풀 파일입니다.']] },

  /* ---------------- 프로세스 · 작업 ---------------- */
  { q: '시스템의 모든 프로세스를 사용자·CPU·메모리 정보와 함께 한 번에 나열하는 명령어는?', answer: 'ps aux', accept: ['ps -ef', 'ps -aux', 'ps axu'],
    explain: '`ps aux` 는 BSD 스타일(대시 없음)로 모든(a) 프로세스를 사용자(u) 정보와 함께, 터미널 없는 것(x)까지 보여줍니다. `ps -ef` 는 같은 정보의 SysV 스타일입니다.',
    example: '`ps aux | grep nginx` 로 특정 프로세스가 떠 있는지, PID 가 무엇인지 확인합니다.',
    parts: [['ps', '`ps`(process status): 현재 프로세스 목록을 보여주는 명령입니다.'], ['aux', 'a(all: 모든 사용자의 프로세스) · u(user 형식: 사용자·CPU·메모리 표시) · x(터미널에 붙지 않은 데몬도 포함). BSD 스타일이라 대시(-)가 없습니다.']] },

  { q: '정상 종료 요청에 반응하지 않는 PID 1234 프로세스를 강제로 즉시 종료하는 명령어는?', answer: 'kill -9 1234', accept: ['kill -KILL 1234', 'kill -SIGKILL 1234', 'kill -s KILL 1234'],
    explain: '`-9`(SIGKILL) 는 프로세스가 무시할 수 없는 신호라 즉시 죽습니다. 대신 정리 작업(파일 닫기, 임시 파일 삭제)을 못 하므로, 먼저 기본 `kill`(SIGTERM) 을 보내고 안 죽을 때만 씁니다.',
    example: '멈춘 프로세스에 `kill 1234` 를 보내고 몇 초 기다린 뒤에도 남아 있으면 `kill -9 1234` 로 정리합니다.',
    parts: [['kill', '`kill`: 프로세스에 신호(signal)를 보내는 명령입니다.'], ['-9', '`-9`: SIGKILL 신호. 무시할 수 없는 강제 종료입니다.'], ['1234', '대상 프로세스의 PID 입니다.']],
    order: '신호가 먼저, PID 가 뒤입니다.' },

  { q: '이름이 `node` 인 프로세스를 모두 종료(SIGTERM)하는 명령어는?', answer: 'pkill node', accept: ['killall node', 'pkill -TERM node', 'pkill -15 node'],
    explain: '`pkill` 은 PID 를 찾을 필요 없이 이름으로 신호를 보냅니다. 기본 신호는 SIGTERM(정상 종료 요청)입니다. `killall` 도 비슷하지만 이름이 정확히 일치해야 합니다.',
    example: '개발 중 여러 개 떠 있는 `node` 프로세스를 `pkill node` 로 한 번에 정리합니다. 운영 서버에서는 다른 서비스까지 죽을 수 있어 주의합니다.',
    parts: [['pkill', '`pkill`(process kill): 이름 패턴으로 프로세스를 찾아 신호를 보내는 명령입니다.'], ['node', '종료할 프로세스 이름(패턴)입니다.']] },

  { q: '현재 셸에서 백그라운드로 돌고 있거나 멈춰 있는 작업(job) 목록을 보는 명령어는?', answer: 'jobs', accept: ['jobs -l'],
    explain: '`&` 로 실행했거나 Ctrl+Z 로 멈춘 작업이 `[1]`, `[2]` 번호와 함께 나옵니다. `fg %1` 로 앞으로, `bg %1` 로 뒤에서 계속 실행시킬 수 있습니다.',
    example: '긴 다운로드를 `&` 로 뒤에 돌려놓고 `jobs` 로 아직 진행 중인지 확인합니다.',
    parts: [['jobs', '`jobs`: 현재 셸에 속한 백그라운드·정지 작업 목록을 보여주는 내장 명령입니다.']] },

  { q: 'Ctrl+Z 로 멈춘 1번 작업을 백그라운드에서 계속 실행시키는 명령어는?', answer: 'bg %1', accept: ['bg', 'bg 1'],
    explain: 'Ctrl+Z 는 작업을 정지(suspend)시킬 뿐 종료하지 않습니다. `bg` 는 정지된 작업을 백그라운드에서 재개합니다. 작업 번호를 생략하면 가장 최근 작업이 대상입니다.',
    example: '`vim` 대신 긴 빌드를 실행 중 터미널이 필요해지면 Ctrl+Z → `bg` 로 뒤에서 계속 돌리고 셸을 씁니다.',
    parts: [['bg', '`bg`(background): 정지된 작업을 백그라운드에서 이어서 실행합니다.'], ['%1', '`%번호`: 작업(job) 번호. `jobs` 에서 확인한 1번.']] },

  { q: '명령어 `./backup.sh` 를 실행하되, 셸을 계속 쓸 수 있도록 백그라운드로 보내는 방법은?', answer: './backup.sh &', accept: [],
    explain: '명령 끝에 `&` 를 붙이면 곧바로 프롬프트가 돌아오고 명령은 뒤에서 실행됩니다. 터미널을 닫으면 함께 종료될 수 있으므로 오래 걸리는 작업은 `nohup` 이나 `tmux` 와 함께 씁니다.',
    example: '`./backup.sh > backup.log 2>&1 &` 처럼 출력을 파일로 보내면서 백그라운드로 실행합니다.',
    parts: [['./backup.sh', '실행할 스크립트입니다. `./` 는 현재 디렉터리를 뜻합니다.'], ['&', '명령 끝의 `&`: 백그라운드로 실행하고 즉시 프롬프트를 돌려줍니다.']],
    order: '`&` 는 반드시 명령의 맨 끝에 붙입니다.' },

  { q: '명령 실행 결과를 화면에 보여주면서 동시에 파일 `out.txt` 에도 저장하려 할 때, 파이프 뒤에 쓰는 명령어는? (예: `ls -l | ___`)', answer: 'tee out.txt', accept: ['tee -a out.txt'],
    explain: '`>` 로 보내면 화면에는 아무것도 안 나옵니다. `tee` 는 입력을 화면(표준 출력)과 파일 양쪽에 씁니다. `-a` 는 파일에 덮어쓰지 않고 이어 붙입니다.',
    example: '긴 설치 과정을 지켜보면서 기록도 남기려면 `./install.sh 2>&1 | tee install.log` 로 실행합니다.',
    parts: [['tee', '`tee`: 입력을 화면과 파일에 동시에 쓰는 명령입니다(배관의 T자 분기에서 온 이름).'], ['out.txt', '함께 저장할 파일입니다.']] },

  { q: '명령어의 출력을 파일 `log.txt` 의 끝에 이어 붙이는 리다이렉션은? (명령어: `date`)', answer: 'date >> log.txt', accept: [],
    explain: '`>` 는 파일을 비우고 새로 쓰지만 `>>` 는 기존 내용 뒤에 추가합니다. 로그처럼 계속 쌓아야 하는 파일에는 반드시 `>>` 를 씁니다.',
    example: 'cron 에서 `date >> /var/log/job.log` 로 실행 시각을 기록하면 작업이 언제 돌았는지 이력이 남습니다.',
    parts: [['date', '현재 날짜·시각을 출력하는 명령입니다.'], ['>> log.txt', '`>>`: 출력을 파일 끝에 이어 붙입니다(append). `>` 하나면 덮어씁니다.']] },

  /* ---------------- 시스템 정보 ---------------- */
  { q: '설치된 리눅스 배포판의 이름과 버전을 확인하기 위해 보는 파일을 출력하는 명령어는?', answer: 'cat /etc/os-release', accept: ['lsb_release -a', 'hostnamectl', 'cat /etc/*-release'],
    explain: '`/etc/os-release` 는 거의 모든 배포판에 있는 표준 파일로, `NAME`, `VERSION_ID`, `PRETTY_NAME` 이 들어 있습니다. `uname -r` 은 커널 버전만 알려줍니다.',
    example: '패키지 명령이 `apt` 인지 `dnf` 인지 모를 때 `cat /etc/os-release` 로 Ubuntu 인지 Rocky 인지 먼저 확인합니다.',
    parts: [['cat', '`cat`: 파일 내용을 출력합니다.'], ['/etc/os-release', '배포판 이름·버전이 담긴 표준 파일입니다.']] },

  { q: 'CPU 의 모델명·코어 수·아키텍처 등 정보를 정리해 보여주는 명령어는?', answer: 'lscpu', accept: ['cat /proc/cpuinfo'],
    explain: '`lscpu` 는 `/proc/cpuinfo` 의 내용을 사람이 읽기 좋게 요약합니다. 코어 수, 스레드 수, 가상화 지원 여부까지 한 화면에 나옵니다.',
    example: '서버 사양을 확인하거나, 컨테이너에 CPU 를 얼마나 줄지 정할 때 `lscpu` 로 코어 수를 봅니다.',
    parts: [['lscpu', '`lscpu`(list CPU): CPU 정보를 요약해 보여주는 명령입니다.']] },

  { q: '사용 가능한 CPU(프로세서) 개수만 숫자 하나로 출력하는 명령어는?', answer: 'nproc', accept: ['nproc --all', 'grep -c processor /proc/cpuinfo'],
    explain: '`nproc` 은 현재 프로세스가 쓸 수 있는 CPU 수를 숫자로만 출력해 스크립트에서 쓰기 좋습니다. cgroup 제한이 걸린 컨테이너 안에서는 제한된 값이 나옵니다.',
    example: '병렬 빌드 시 `make -j$(nproc)` 로 코어 수만큼 동시에 컴파일합니다.',
    parts: [['nproc', '`nproc`(number of processors): 사용 가능한 CPU 개수를 출력하는 명령입니다.']] },

  { q: '최근에 시스템에 로그인한 기록(누가 언제 어디서)을 보는 명령어는?', answer: 'last', accept: ['last -n 20', 'last | head'],
    explain: '`last` 는 `/var/log/wtmp` 의 로그인·로그아웃·재부팅 이력을 최근 것부터 보여줍니다. `last reboot` 로 재부팅 이력만, `lastb` 로 실패한 로그인 시도를 봅니다.',
    example: '서버가 갑자기 재부팅된 시각을 `last reboot` 로 확인하고 그 시각의 로그를 봅니다.',
    parts: [['last', '`last`: 로그인·재부팅 이력을 최근 순으로 보여주는 명령입니다.']] },

  { q: '현재 사용자의 UID·GID 와 속한 그룹을 모두 출력하는 명령어는?', answer: 'id', accept: ['id -a'],
    explain: '`id` 는 `uid=1000(alice) gid=1000(alice) groups=1000(alice),27(sudo),999(docker)` 형식으로 보여줍니다. 권한 문제를 볼 때 "내가 그 그룹에 속해 있나" 를 확인하는 첫 명령입니다.',
    example: '`docker` 그룹에 추가한 뒤 `id` 에 안 보이면 아직 다시 로그인하지 않은 것입니다.',
    parts: [['id', '`id`(identity): 현재 사용자의 UID·GID·소속 그룹을 출력하는 명령입니다.']] },

  { q: '환경변수 `HOME` 의 값을 화면에 출력하는 명령어는?', answer: 'echo $HOME', accept: ['echo "$HOME"', 'printenv HOME', 'echo ${HOME}'],
    explain: '변수 값을 쓰려면 앞에 `$` 를 붙입니다. `echo HOME` 은 글자 그대로 HOME 을 출력합니다. `printenv` 는 환경변수만 다루는 전용 명령입니다.',
    example: '스크립트가 이상하게 동작할 때 `echo $PATH`, `echo $JAVA_HOME` 으로 변수가 기대한 값인지 확인합니다.',
    parts: [['echo', '`echo`: 인자를 화면에 출력하는 명령입니다.'], ['$HOME', '`$변수명`: 변수의 값으로 바뀝니다. HOME 은 홈 디렉터리 경로입니다.']] },

  { q: '환경변수 `APP_ENV` 를 `prod` 로 설정해 이후 실행하는 프로그램에도 전달되게 하는 명령어는?', answer: 'export APP_ENV=prod', accept: ['export APP_ENV="prod"'],
    explain: '`APP_ENV=prod` 만 쓰면 현재 셸에서만 보이는 변수입니다. `export` 를 붙여야 자식 프로세스(실행하는 프로그램)에도 전달됩니다. `=` 양옆에 공백을 넣으면 안 됩니다.',
    example: '`export APP_ENV=prod && ./server` 로 운영 모드로 실행합니다. 영구 설정은 `~/.bashrc` 에 적습니다.',
    parts: [['export', '`export`: 변수를 환경변수로 내보내 자식 프로세스에 전달합니다.'], ['APP_ENV=prod', '변수 이름=값. `=` 앞뒤에 공백이 있으면 안 됩니다.']] },

  /* ---------------- 서비스 · 패키지 · 시스템 ---------------- */
  { q: 'systemd 서비스 `nginx` 를 재시작하는 명령어는?', answer: 'systemctl restart nginx', accept: ['sudo systemctl restart nginx', 'systemctl restart nginx.service', 'service nginx restart'],
    explain: '`restart` 는 중지 후 시작이라 그 사이 잠깐 요청을 못 받습니다. 설정만 다시 읽으면 되는 서비스는 `reload` 가 연결을 끊지 않아 더 안전합니다.',
    example: '설정을 크게 바꿨을 때 `nginx -t` 로 문법 검사 후 `systemctl restart nginx` 합니다.',
    parts: [['systemctl', '`systemctl`: systemd 서비스를 제어하는 명령입니다.'], ['restart', '서비스를 중지했다가 다시 시작합니다.'], ['nginx', '대상 서비스(유닛) 이름입니다.']],
    order: '동작(restart)이 먼저, 서비스 이름이 뒤입니다.' },

  { q: '서비스 `nginx` 가 부팅 시 자동으로 시작되지 않도록 해제하는 명령어는?', answer: 'systemctl disable nginx', accept: ['sudo systemctl disable nginx', 'systemctl disable nginx.service', 'systemctl disable --now nginx'],
    explain: '`disable` 은 자동 시작 등록만 해제하고 지금 실행 중인 서비스는 건드리지 않습니다. 지금 멈추기까지 하려면 `--now` 를 붙이거나 `stop` 을 따로 실행합니다.',
    example: '더 이상 쓰지 않는 서비스를 `systemctl disable --now old-agent` 로 멈추고 부팅 목록에서도 뺍니다.',
    parts: [['systemctl', '`systemctl`: systemd 제어 명령입니다.'], ['disable', '부팅 시 자동 시작 등록을 해제합니다(지금 실행 중인 것은 그대로).'], ['nginx', '대상 서비스 이름입니다.']] },

  { q: '서비스 `nginx` 가 부팅 시 자동 시작되도록 등록되어 있는지 확인하는 명령어는?', answer: 'systemctl is-enabled nginx', accept: ['systemctl is-enabled nginx.service', 'systemctl status nginx'],
    explain: '`is-enabled` 는 `enabled` / `disabled` 한 단어로 답합니다. `is-active` 는 지금 실행 중인지를 알려줍니다. 둘은 별개라 실행 중이어도 부팅 등록은 안 돼 있을 수 있습니다.',
    example: '재부팅 후 서비스가 안 올라온 원인은 대개 `systemctl is-enabled` 가 `disabled` 인 경우입니다.',
    parts: [['systemctl', '`systemctl`: systemd 제어 명령입니다.'], ['is-enabled', '부팅 시 자동 시작 등록 여부를 enabled/disabled 로 알려줍니다.'], ['nginx', '확인할 서비스 이름입니다.']] },

  { q: '모든 systemd 저널 로그를 실시간으로 따라가며 보는 명령어는? (특정 서비스 지정 없이)', answer: 'journalctl -f', accept: ['journalctl --follow', 'sudo journalctl -f'],
    explain: '`-f`(follow) 는 `tail -f` 처럼 새 로그가 올라올 때마다 계속 출력합니다. 특정 서비스만 보려면 `-u 이름` 을, 커널 메시지만 보려면 `-k` 를 더합니다.',
    example: '장비에 USB 를 꽂거나 서비스를 재시작하면서 `journalctl -f` 로 시스템 전체 반응을 지켜봅니다.',
    parts: [['journalctl', '`journalctl`: systemd 저널(로그)을 조회하는 명령입니다.'], ['-f', '`-f`(follow): 새 로그를 실시간으로 계속 출력합니다.']] },

  { q: 'Debian/Ubuntu 에서 패키지 목록(저장소 색인)을 최신으로 갱신하는 명령어는?', answer: 'apt update', accept: ['sudo apt update', 'apt-get update', 'sudo apt-get update'],
    explain: '`apt update` 는 패키지를 설치·업그레이드하지 않고 "어떤 버전이 있는지" 목록만 새로 받습니다. 설치 전에 이걸 안 하면 옛 목록 때문에 404 오류가 납니다. 실제 업그레이드는 `apt upgrade` 입니다.',
    example: '새 서버에서 `apt update && apt install -y nginx` 가 정석 순서입니다.',
    parts: [['apt', '`apt`: Debian/Ubuntu 패키지 관리 명령입니다.'], ['update', '저장소의 패키지 목록(색인)만 갱신합니다. 설치·업그레이드는 하지 않습니다.']] },

  { q: 'Debian/Ubuntu 에서 패키지 `htop` 을 확인 질문 없이 설치하는 명령어는?', answer: 'apt install -y htop', accept: ['sudo apt install -y htop', 'apt-get install -y htop', 'sudo apt-get install -y htop', 'apt -y install htop'],
    explain: '`-y`(yes) 는 "계속하시겠습니까? [Y/n]" 질문에 자동으로 예라고 답합니다. 스크립트나 자동화에서 필수이며, 직접 칠 때는 빼고 설치 목록을 눈으로 확인하는 편이 안전합니다.',
    example: 'Dockerfile 이나 프로비저닝 스크립트에서 `apt-get install -y curl vim` 처럼 씁니다.',
    parts: [['apt', '`apt`: 패키지 관리 명령입니다.'], ['install', '패키지를 설치합니다.'], ['-y', '`-y`(yes): 확인 질문에 자동으로 예라고 답합니다.'], ['htop', '설치할 패키지 이름입니다.']],
    order: '`-y` 는 `install` 앞뒤 어디에 와도 됩니다.' },

  { q: 'RHEL/Rocky 계열에서 패키지 `htop` 을 확인 없이 설치하는 명령어는?', answer: 'dnf install -y htop', accept: ['sudo dnf install -y htop', 'yum install -y htop', 'sudo yum install -y htop', 'dnf -y install htop'],
    explain: 'RHEL 계열은 `apt` 대신 `dnf`(예전 이름 `yum`)를 씁니다. 옵션 의미는 같아 `-y` 로 확인을 생략합니다. `dnf search`, `dnf remove` 도 같은 형식입니다.',
    example: 'Rocky Linux 서버에서 `dnf install -y htop` 이 안 되면 EPEL 저장소(`dnf install -y epel-release`)를 먼저 추가합니다.',
    parts: [['dnf', '`dnf`: RHEL/Rocky/Fedora 의 패키지 관리 명령입니다(yum 의 후속).'], ['install', '패키지를 설치합니다.'], ['-y', '`-y`(yes): 확인 질문을 자동으로 승인합니다.'], ['htop', '설치할 패키지 이름입니다.']] },

  { q: '시스템을 지금 즉시 종료(전원 끄기)하는 명령어는?', answer: 'shutdown -h now', accept: ['sudo shutdown -h now', 'poweroff', 'sudo poweroff', 'systemctl poweroff', 'shutdown now'],
    explain: '`-h`(halt) 는 정지 후 전원을 끄고, `now` 는 즉시입니다. `shutdown -h +5` 처럼 분 단위로 예약하거나 `shutdown -c` 로 취소할 수 있습니다. 재부팅은 `-r` 입니다.',
    example: '서버실 작업 전에 `shutdown -h +10 "10분 후 점검으로 종료됩니다"` 로 접속자에게 알리고 끕니다.',
    parts: [['shutdown', '`shutdown`: 시스템을 안전하게 종료·재부팅하는 명령입니다.'], ['-h', '`-h`(halt): 정지 후 전원을 끕니다. 재부팅은 `-r`.'], ['now', '시각 지정. 지금 즉시.']] },

  { q: '원격 서버 `10.0.0.5` 에 사용자 `ubuntu` 로 SSH 접속하는 명령어는?', answer: 'ssh ubuntu@10.0.0.5', accept: ['ssh -l ubuntu 10.0.0.5'],
    explain: '`사용자@호스트` 형식이 기본입니다. 사용자를 생략하면 지금 로그인한 이름으로 접속을 시도합니다. 포트가 22가 아니면 `-p 포트`, 키 파일을 지정하려면 `-i 키파일` 을 붙입니다.',
    example: '클라우드 VM 은 `ssh -i my-key.pem ubuntu@10.0.0.5` 처럼 키 파일을 함께 지정하는 경우가 많습니다.',
    parts: [['ssh', '`ssh`(secure shell): 암호화된 원격 접속 명령입니다.'], ['ubuntu@10.0.0.5', '`사용자@호스트`: 접속할 계정과 서버 주소입니다.']] },

  { q: '내 SSH 공개키를 원격 서버 `web01` 의 사용자 `deploy` 계정에 등록해 비밀번호 없이 접속하게 만드는 명령어는?', answer: 'ssh-copy-id deploy@web01', accept: ['ssh-copy-id -i ~/.ssh/id_ed25519.pub deploy@web01'],
    explain: '`ssh-copy-id` 는 내 공개키를 원격의 `~/.ssh/authorized_keys` 에 올바른 권한으로 추가해 줍니다. 처음 한 번은 비밀번호를 묻고, 그다음부터 키로 접속됩니다.',
    example: '새 서버를 받으면 `ssh-copy-id deploy@web01` 한 번으로 이후 배포 스크립트가 비밀번호 없이 돌게 합니다.',
    parts: [['ssh-copy-id', '`ssh-copy-id`: 내 공개키를 원격 서버의 authorized_keys 에 복사해 주는 명령입니다.'], ['deploy@web01', '`사용자@호스트`: 키를 등록할 원격 계정과 서버입니다.']] },

  { q: '현재 사용자의 crontab(예약 작업) 목록을 출력하는 명령어는?', answer: 'crontab -l', accept: ['crontab -l -u $(whoami)'],
    explain: '`-l`(list) 은 등록된 예약 작업을 보여주고, `-e`(edit) 는 편집합니다. `-r` 은 확인 없이 전부 삭제하므로 `-e` 옆 글자라 특히 조심합니다.',
    example: '"이 서버에서 밤마다 도는 작업이 뭐지?" 를 `crontab -l` 과 `ls /etc/cron.d` 로 확인합니다.',
    parts: [['crontab', '`crontab`: 사용자별 예약 작업 표를 관리하는 명령입니다.'], ['-l', '`-l`(list): 등록된 예약 작업을 출력합니다.']] },
];

// 이 파일이 로드되기 전까지의 linux 문제 수를 기준으로 ID 를 계산해 풀이를 등록한다.
// (문제 ID 는 "linux-순번" 이며 로드 순서로 정해지므로, 이 파일은 다른 linux 파일보다 뒤에 와야 한다)
const LINUX_EASY_BASE = window.QUIZ_BANK.linux.length;
LINUX_EASY.forEach((q, i) => {
  const { parts, order, ...rest } = q;                          // parts/order 는 문제 객체에서 분리
  window.QUIZ_BANK.linux.push(Object.assign({ diff: 'easy', type: 'short' }, rest));
  const id = `linux-${String(LINUX_EASY_BASE + i + 1).padStart(3, '0')}`;
  window.QUIZ_PARTS[id] = order ? { parts, order } : { parts };
});
