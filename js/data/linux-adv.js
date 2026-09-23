window.QUIZ_BANK.linux.push(
  /* ---------------- 과제형 ---------------- */
  { diff: 'normal', type: 'task', q: '디스크가 가득 차 서비스가 멈췄습니다. 원인을 찾아 정리하세요.',
    scene: '# 상황: 웹 서버에서 "No space left on device" 오류가 발생했습니다.',
    steps: [
      { hint: '# 1. 마운트된 파일시스템별 사용량을 사람이 읽기 좋은 단위로 확인', answer: 'df -h', accept: ['df -h /', 'df --human-readable'] },
      { hint: '# 2. /var/log 아래에서 용량을 많이 쓰는 디렉터리를 한 단계만 합산해 확인', answer: 'du -sh /var/log/*', accept: ['du -sh /var/log/*/', 'du -h -s /var/log/*'] },
      { hint: '# 3. 삭제하지 않고 app.log 파일의 내용만 비워 0바이트로 만들기', answer: 'truncate -s 0 /var/log/app.log', accept: ['> /var/log/app.log', ': > /var/log/app.log', 'truncate --size 0 /var/log/app.log', 'cat /dev/null > /var/log/app.log'] },
    ],
    explain: '`rm` 으로 로그를 지우면 프로세스가 파일 핸들을 잡고 있어 용량이 반환되지 않습니다. `truncate -s 0` 이나 리다이렉션으로 내용만 비워야 즉시 공간이 회수됩니다.',
    example: '이미 `rm` 해 버렸다면 `lsof | grep deleted` 로 핸들을 잡고 있는 프로세스를 찾아 재시작해야 공간이 돌아옵니다.' },

  { diff: 'normal', type: 'task', q: '배포용 계정을 새로 만들고 sudo 권한을 부여하세요.',
    scene: '# 상황: 신규 입사자에게 deploy 계정을 발급해야 합니다.',
    steps: [
      { hint: '# 1. 홈 디렉터리를 만들면서 deploy 사용자 생성', answer: 'useradd -m deploy', accept: ['adduser deploy', 'useradd --create-home deploy', 'useradd -m -s /bin/bash deploy'] },
      { hint: '# 2. deploy 사용자를 sudo 그룹에 추가 (기존 그룹 유지)', answer: 'usermod -aG sudo deploy', accept: ['usermod -a -G sudo deploy', 'gpasswd -a deploy sudo', 'usermod -aG wheel deploy'] },
      { hint: '# 3. deploy 사용자가 속한 그룹 확인', answer: 'groups deploy', accept: ['id deploy', 'id -nG deploy'] },
    ],
    explain: '`usermod` 에서 `-a` 를 빠뜨리고 `-G` 만 쓰면 기존 보조 그룹이 모두 날아갑니다. 이 한 글자 때문에 권한을 잃는 사고가 흔합니다.',
    example: 'RHEL 계열은 sudo 그룹 대신 `wheel` 을 씁니다. 배포 대상 OS를 먼저 확인해야 합니다.' },

  { diff: 'hard', type: 'task', q: '8080 포트를 이미 누가 쓰고 있어 서비스가 뜨지 않습니다. 찾아서 정리하세요.',
    scene: '# 상황: 애플리케이션 기동 시 "Address already in use" 오류가 납니다.',
    steps: [
      { hint: '# 1. 8080 포트를 리스닝 중인 프로세스를 PID와 함께 확인', answer: 'ss -lntp | grep 8080', accept: ['ss -tlnp | grep 8080', 'lsof -i :8080', 'netstat -lntp | grep 8080', 'ss -lntp sport = :8080'] },
      { hint: '# 2. 확인된 PID 4321 프로세스의 실행 명령줄 전체를 확인', answer: 'ps -p 4321 -o args', accept: ['ps -fp 4321', 'ps -ef | grep 4321', 'ps -p 4321 -o cmd', 'cat /proc/4321/cmdline'] },
      { hint: '# 3. 해당 프로세스에 정상 종료 시그널(SIGTERM) 전송', answer: 'kill 4321', accept: ['kill -15 4321', 'kill -TERM 4321', 'kill -SIGTERM 4321'] },
    ],
    explain: '`kill -9`(SIGKILL) 를 먼저 쓰면 프로세스가 정리 작업을 못 하고 죽어 임시 파일이나 락이 남습니다. SIGTERM 으로 먼저 시도하고 응답이 없을 때만 -9 를 씁니다.',
    example: '`ss` 가 `netstat` 을 대체했습니다. 최신 배포판에는 net-tools 가 기본 설치되지 않는 경우가 많습니다.' },

  { diff: 'hard', type: 'task', q: 'systemd 서비스 설정을 바꾼 뒤 반영하고 상태를 확인하세요.',
    scene: '# 상황: /etc/systemd/system/api.service 의 유닛 파일을 수정했습니다.',
    steps: [
      { hint: '# 1. 변경된 유닛 파일을 systemd 가 다시 읽도록 설정 재적재', answer: 'systemctl daemon-reload', accept: ['sudo systemctl daemon-reload', 'systemctl daemon-reexec'] },
      { hint: '# 2. api 서비스 재시작', answer: 'systemctl restart api', accept: ['sudo systemctl restart api', 'systemctl restart api.service'] },
      { hint: '# 3. api 서비스의 현재 상태 확인', answer: 'systemctl status api', accept: ['sudo systemctl status api', 'systemctl status api.service', 'systemctl is-active api'] },
      { hint: '# 4. api 서비스 로그를 최근 것부터 실시간으로 따라가며 확인', answer: 'journalctl -u api -f', accept: ['journalctl -fu api', 'journalctl -u api.service -f', 'journalctl -u api -f -n 100'] },
    ],
    explain: '유닛 파일을 고치고 `daemon-reload` 없이 restart 하면 예전 설정으로 뜹니다. 증상이 "분명히 고쳤는데 안 바뀐다" 로 나타나 시간을 많이 잡아먹습니다.',
    example: '부팅 시 자동 시작까지 원하면 `systemctl enable api` 를 따로 해야 하며, `enable --now` 로 한 번에 처리할 수 있습니다.' },

  /* ---------------- 서술형 ---------------- */
  { diff: 'hard', type: 'essay', q: '리눅스 서버의 부하가 갑자기 높아졌습니다. 원인을 어떤 순서로 좁혀 나가겠습니까?',
    keywords: [['uptime', 'load average', 'top', 'htop'], ['CPU', '사용률'], ['메모리', 'free', 'OOM', '스왑'], ['디스크', 'iostat', 'iowait', 'df'], ['네트워크', 'ss', '연결 수'], ['로그', 'journalctl', 'dmesg'], ['프로세스', 'ps']],
    minKeywords: 4,
    model: '먼저 `uptime` 이나 `top` 으로 load average 와 CPU 사용률을 봅니다. load 는 높은데 CPU 사용률이 낮다면 I/O 대기(iowait)를 의심하고 `iostat` 과 `df` 로 디스크를 확인합니다. CPU 가 실제로 높다면 `top` 에서 상위 프로세스를 찾아 `ps` 로 실행 인자를 확인합니다. `free -h` 로 메모리와 스왑 사용량을 보고, 스왑이 활발하면 메모리 부족입니다. `dmesg` 에서 OOM Killer 기록도 확인합니다. 네트워크는 `ss -s` 로 연결 수 급증 여부를 봅니다. 마지막으로 `journalctl` 에서 부하가 시작된 시각의 로그를 확인해 배포나 배치 작업과 시간이 겹치는지 대조합니다.',
    explain: 'load average 는 실행 대기 + I/O 대기 프로세스 수라, CPU 사용률과 함께 봐야 의미가 생깁니다. "load 8인데 CPU 는 한가하다" 는 거의 항상 디스크나 네트워크 대기입니다.',
    example: '백업 스크립트가 업무 시간에 돌아 iowait 가 치솟는 경우가 대표적이며, 시각 대조만으로 원인이 드러납니다.' },

  { diff: 'hard', type: 'essay', q: 'SSH 로 서버에 접속되지 않습니다. 어떤 순서로 원인을 확인하겠습니까?',
    keywords: [['ping', '네트워크', '도달'], ['포트', '22', 'telnet', 'nc', 'ss'], ['방화벽', 'security group', 'ufw', 'iptables'], ['키', '권한', 'authorized_keys', '600'], ['sshd', '데몬', '서비스'], ['로그', 'auth.log', 'journalctl'], ['-v', '디버그']],
    minKeywords: 4,
    model: '먼저 서버가 살아 있는지 `ping` 으로 확인하고, 다음으로 22번 포트가 열려 있는지 `nc -zv host 22` 로 봅니다. 포트가 막혀 있으면 클라우드 보안 그룹과 서버 방화벽(ufw/iptables) 규칙을 확인합니다. 포트는 열렸는데 인증에서 막히면 `ssh -v` 로 어느 단계에서 끊기는지 확인하고, 키 파일 권한(600)과 서버의 authorized_keys 권한, 홈 디렉터리 권한을 점검합니다. 서버 콘솔로 접근 가능하다면 `systemctl status sshd` 로 데몬 상태를, `journalctl -u sshd` 나 auth.log 로 거절 사유를 봅니다.',
    explain: '"접속이 안 된다" 는 네트워크 도달·포트 개방·인증 세 단계 중 어디서 막혔는지에 따라 원인이 완전히 다릅니다. `ssh -v` 의 출력이 그 경계를 정확히 알려 줍니다.',
    example: '키 파일 권한이 644 이면 SSH 가 키를 아예 무시합니다. 증상은 "비밀번호를 묻는다" 로 나타나 원인을 놓치기 쉽습니다.' },

  { diff: 'extreme', type: 'essay', q: '로그 파일이 계속 쌓여 디스크를 채웁니다. 임시 조치와 근본 대책을 나누어 설명하세요.',
    keywords: [['truncate', '비우기', '리다이렉션'], ['rm', '핸들', 'lsof', 'deleted'], ['logrotate', '로테이션'], ['보관 주기', 'retention', '압축'], ['모니터링', '알람', '임계치'], ['중앙 로그', '수집', 'journald']],
    minKeywords: 4,
    model: '임시로는 `truncate -s 0` 로 내용만 비웁니다. `rm` 을 쓰면 프로세스가 파일 핸들을 잡고 있어 공간이 반환되지 않으므로, 이미 지웠다면 `lsof | grep deleted` 로 확인해 해당 프로세스를 재시작해야 합니다. 근본적으로는 logrotate 로 크기나 주기 기준 회전, 압축, 보관 개수를 설정하고 애플리케이션이 회전 후 파일 핸들을 다시 열도록 postrotate 를 구성합니다. 로그 레벨이 과도하게 낮게 설정되어 있지 않은지도 점검합니다. 마지막으로 디스크 사용률 임계치 알람을 걸어 가득 차기 전에 인지하도록 하고, 장기적으로는 로그를 중앙 수집 시스템으로 보내 서버 디스크에 쌓이지 않게 합니다.',
    explain: '디스크 풀 장애는 "지웠는데 공간이 안 생긴다" 는 함정 때문에 대응이 길어집니다. 열린 파일 핸들의 동작을 알고 있어야 몇 분 만에 끝납니다.',
    example: 'DEBUG 레벨로 배포된 애플리케이션이 하루에 수십 GB 를 남겨 디스크를 채우는 사고가 흔합니다.' },

  { diff: 'extreme', type: 'essay', q: '리눅스 파일 권한 `-rw-r--r--` 와 소유자·그룹 개념을 설명하고, 실무에서 권한을 다룰 때 지켜야 할 원칙을 덧붙이세요.',
    keywords: [['소유자', 'owner', 'user'], ['그룹', 'group'], ['기타', 'other', '전체'], ['읽기', '쓰기', '실행', 'rwx'], ['644', '755', '600', '숫자'], ['최소 권한', '777', '위험'], ['디렉터리', '실행 권한']],
    minKeywords: 4,
    model: '`-rw-r--r--` 는 맨 앞이 파일 종류이고, 이어지는 세 자리씩이 각각 소유자·그룹·기타 사용자의 읽기(r)·쓰기(w)·실행(x) 권한입니다. 이 경우 소유자는 읽고 쓸 수 있고 나머지는 읽기만 가능하며 숫자로는 644 입니다. 실행 파일과 디렉터리는 755, 키나 비밀 설정 파일은 소유자만 읽도록 600 을 씁니다. 디렉터리의 x 는 실행이 아니라 진입 권한을 뜻합니다. 원칙은 최소 권한으로, 문제가 생겼다고 777 을 주는 것은 해결이 아니라 위험을 덮는 것이며 소유자나 그룹을 조정해 푸는 것이 옳습니다.',
    explain: '권한 문제는 대개 소유권 문제입니다. 웹 서버가 파일을 못 읽는다면 권한을 열 것이 아니라 해당 파일의 그룹을 웹 서버 그룹으로 맞추는 것이 정석입니다.',
    example: 'SSH 개인키가 600 이 아니면 클라이언트가 사용을 거부하고, authorized_keys 가 그룹 쓰기 가능이면 서버가 키 인증을 거절합니다.' },
);
