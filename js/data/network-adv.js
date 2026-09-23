window.QUIZ_BANK.network.push(
  /* ---------------- 과제형 ---------------- */
  { diff: 'easy', type: 'task', q: '특정 사이트에 접속이 안 됩니다. 어디서 막히는지 단계별로 확인하세요.',
    scene: '# 상황: 서버에서 api.example.com 으로 요청이 실패합니다.',
    steps: [
      { hint: '# 1. 도메인이 어떤 IP 로 해석되는지 확인', answer: 'dig api.example.com', accept: ['nslookup api.example.com', 'dig +short api.example.com', 'host api.example.com'] },
      { hint: '# 2. 해당 호스트까지 네트워크가 닿는지 확인 (4회만)', answer: 'ping -c 4 api.example.com', accept: ['ping -c4 api.example.com', 'ping -c 4 api.example.com -W 2'] },
      { hint: '# 3. 443 포트가 열려 있는지 확인', answer: 'nc -zv api.example.com 443', accept: ['nc -vz api.example.com 443', 'telnet api.example.com 443', 'curl -v telnet://api.example.com:443'] },
    ],
    explain: '이름 해석 → 도달성 → 포트 개방 순으로 좁히면 어느 계층의 문제인지 한 번에 드러납니다. 세 단계 중 어디서 실패하는지가 곧 원인의 위치입니다.',
    example: 'ICMP 를 막아 둔 환경에서는 ping 이 실패해도 정상일 수 있으므로, 포트 확인 결과를 더 신뢰해야 합니다.' },

  { diff: 'normal', type: 'task', q: '서버의 네트워크 상태를 점검하세요.',
    scene: '# 상황: 서비스 응답이 느려 연결 상태를 확인해야 합니다.',
    steps: [
      { hint: '# 1. 리스닝 중인 TCP 포트를 프로세스 정보와 함께 확인', answer: 'ss -lntp', accept: ['ss -tlnp', 'ss -lntup', 'netstat -lntp', 'ss -ltnp', 'ss -tnlp'] },
      { hint: '# 2. 현재 소켓 상태별 통계 요약 확인', answer: 'ss -s', accept: ['ss --summary'] },
      { hint: '# 3. 서버의 라우팅 테이블 확인', answer: 'ip route', accept: ['ip r', 'ip route show', 'route -n', 'netstat -rn'] },
    ],
    explain: 'TIME_WAIT 이나 CLOSE_WAIT 이 비정상적으로 많이 쌓였는지는 `ss -s` 요약에서 바로 보입니다. CLOSE_WAIT 누적은 애플리케이션이 소켓을 닫지 않는다는 신호입니다.',
    example: '`ip` 명령이 `ifconfig`·`route`·`netstat` 을 대체했습니다. 최신 컨테이너 이미지에는 구 도구가 아예 없는 경우가 많습니다.' },

  { diff: 'hard', type: 'task', q: 'HTTPS API 응답을 자세히 확인해야 합니다.',
    scene: '# 상황: API 호출이 간헐적으로 실패해 응답 헤더와 인증서를 봐야 합니다.',
    steps: [
      { hint: '# 1. https://api.example.com/health 의 응답 헤더만 확인', answer: 'curl -I https://api.example.com/health', accept: ['curl --head https://api.example.com/health'] },
      { hint: '# 2. 같은 요청을 상세 로그와 함께 보내 TLS 핸드셰이크 과정 확인', answer: 'curl -v https://api.example.com/health', accept: ['curl -vvv https://api.example.com/health', 'curl --verbose https://api.example.com/health'] },
      { hint: '# 3. 서버 인증서의 유효 기간 확인', answer: 'openssl s_client -connect api.example.com:443', accept: ['echo | openssl s_client -connect api.example.com:443', 'openssl s_client -connect api.example.com:443 -servername api.example.com'] },
      { hint: '# 4. 응답에 걸린 단계별 시간 측정 (총 소요 시간 출력)', answer: 'curl -o /dev/null -s -w %{time_total} https://api.example.com/health', accept: ['curl -w %{time_total} -o /dev/null -s https://api.example.com/health', 'curl -s -o /dev/null -w %{time_total} https://api.example.com/health'] },
    ],
    explain: '`-I` 는 HEAD 요청을 보내므로 서버가 HEAD 를 다르게 처리하면 실제 GET 과 결과가 다를 수 있습니다. 그럴 때는 `-i` 로 본문까지 포함해 확인합니다.',
    example: '인증서 만료로 인한 장애는 예고 없이 전면 중단으로 나타납니다. 만료일 모니터링은 필수 점검 항목입니다.' },

  { diff: 'hard', type: 'task', q: '방화벽 규칙을 확인하고 필요한 포트를 열어야 합니다.',
    scene: '# 상황: 우분투 서버에서 ufw 로 웹 서비스 포트를 허용해야 합니다.',
    steps: [
      { hint: '# 1. 현재 방화벽 상태와 규칙을 번호와 함께 확인', answer: 'ufw status numbered', accept: ['sudo ufw status numbered'] },
      { hint: '# 2. 443 포트를 TCP 로 허용', answer: 'ufw allow 443/tcp', accept: ['sudo ufw allow 443/tcp', 'ufw allow https'] },
      { hint: '# 3. 특정 대역 10.0.0.0/8 에서만 22 포트 접근 허용', answer: 'ufw allow from 10.0.0.0/8 to any port 22', accept: ['sudo ufw allow from 10.0.0.0/8 to any port 22', 'ufw allow from 10.0.0.0/8 to any port 22 proto tcp'] },
    ],
    explain: 'SSH 를 막아 버리면 원격 접속이 끊겨 복구가 어렵습니다. 방화벽 규칙을 바꿀 때는 SSH 허용을 먼저 확인하고, 가능하면 콘솔 접근 수단을 확보한 뒤 작업합니다.',
    example: '클라우드에서는 보안 그룹과 OS 방화벽 두 겹이 있어, 한쪽만 열고 왜 안 되는지 찾는 일이 흔합니다.' },

  /* ---------------- 서술형 ---------------- */
  { diff: 'normal', type: 'essay', q: '브라우저에 주소를 입력한 뒤 화면이 보이기까지 어떤 일이 일어나는지 설명하세요.',
    keywords: [['DNS', '이름 해석', '도메인'], ['TCP', '연결', '핸드셰이크'], ['TLS', 'HTTPS', '인증서', '암호화'], ['HTTP 요청', 'GET', '응답'], ['렌더링', '파싱', 'HTML', '그리기'], ['캐시']],
    minKeywords: 4,
    model: '먼저 브라우저가 캐시와 hosts 를 확인한 뒤 DNS 로 도메인을 IP 로 바꿉니다. 그 IP 에 TCP 연결을 맺고, HTTPS 라면 TLS 핸드셰이크로 인증서를 검증하고 암호화 키를 교환합니다. 이어 HTTP GET 요청을 보내고 서버가 HTML 을 응답합니다. 브라우저는 HTML 을 파싱하면서 CSS·JS·이미지 같은 하위 자원을 추가로 요청하고, 받은 내용을 배치해 화면에 그립니다. 각 단계마다 캐시가 개입해 재방문 시 상당 부분을 건너뜁니다.',
    explain: '장애 진단은 이 단계들을 순서대로 짚는 일입니다. DNS 실패, 연결 거부, 인증서 오류, 5xx 응답은 각각 다른 계층의 문제입니다.',
    example: '"사이트가 안 열린다" 는 신고를 받으면 어느 단계에서 멈췄는지부터 물어야 원인 범위가 절반 이하로 줄어듭니다.' },

  { diff: 'hard', type: 'essay', q: 'TCP 와 UDP 의 차이를 설명하고, 각각 어떤 상황에 적합한지 서술하세요.',
    keywords: [['연결 지향', '핸드셰이크', '3-way'], ['신뢰성', '재전송', '순서 보장'], ['비연결', '오버헤드', '빠른'], ['흐름 제어', '혼잡 제어'], ['영상', '스트리밍', '게임', 'DNS', 'VoIP'], ['웹', '파일 전송', 'HTTP']],
    minKeywords: 4,
    model: 'TCP 는 연결 지향 프로토콜로 3-way 핸드셰이크로 연결을 맺고, 순서 보장과 재전송으로 신뢰성을 제공하며 흐름 제어와 혼잡 제어를 수행합니다. 대신 연결 설정과 확인 응답에 따른 지연과 오버헤드가 있습니다. UDP 는 연결 없이 데이터그램을 던지기만 해 오버헤드가 작고 지연이 짧지만 도착과 순서를 보장하지 않습니다. 따라서 웹·파일 전송처럼 하나라도 빠지면 안 되는 경우에는 TCP 를, 실시간 영상·음성·게임처럼 늦게 도착한 데이터가 무의미한 경우에는 UDP 를 씁니다. DNS 질의도 짧고 재시도가 쉬워 주로 UDP 를 씁니다.',
    explain: '"UDP 는 신뢰성이 없어 나쁘다" 가 아니라, 신뢰성 회복을 프로토콜에 맡길지 애플리케이션이 직접 할지의 선택입니다. HTTP/3 은 UDP 위에 자체 신뢰성을 구현한 예입니다.',
    example: '화상통화에서 지난 프레임을 재전송받아 봐야 소용이 없습니다. 차라리 건너뛰고 최신 프레임을 받는 편이 품질에 유리합니다.' },

  { diff: 'extreme', type: 'essay', q: '서비스 응답이 간헐적으로 느려집니다. 네트워크 관점에서 어떻게 원인을 좁히겠습니까?',
    keywords: [['지연', 'latency', 'ping', 'RTT'], ['패킷 손실', 'loss', 'mtr', 'traceroute'], ['DNS', '이름 해석 시간'], ['커넥션', 'TIME_WAIT', 'CLOSE_WAIT', '소켓'], ['대역폭', '포화', '트래픽'], ['curl', '단계별 시간'], ['MTU', '단편화']],
    minKeywords: 4,
    model: '먼저 `curl -w` 로 DNS 해석·연결·TLS·첫 바이트까지의 단계별 시간을 측정해 어느 구간에서 지연이 생기는지 봅니다. 이름 해석이 느리면 DNS 서버나 캐시 문제이고, 연결 수립이 느리면 경로나 방화벽 문제입니다. `mtr` 로 구간별 지연과 패킷 손실을 확인해 특정 홉에서 손실이 나는지 봅니다. 서버 쪽에서는 `ss -s` 로 TIME_WAIT·CLOSE_WAIT 누적과 소켓 고갈 여부를 확인하고, 인터페이스 통계에서 에러·드롭과 대역폭 포화를 점검합니다. 간헐성이 특정 시간대에 몰린다면 배치 작업이나 백업 트래픽과의 시간 상관을 확인합니다.',
    explain: '간헐적 지연은 평균값으로는 보이지 않습니다. 단계별 시간 측정과 구간별 손실률처럼 분포를 드러내는 지표를 봐야 원인이 잡힙니다.',
    example: 'VPN 이나 터널 구간에서 MTU 가 맞지 않으면 큰 패킷만 실패해, 작은 요청은 되는데 큰 응답만 멈추는 기묘한 증상이 나타납니다.' },

  { diff: 'extreme', type: 'essay', q: 'HTTPS 통신에서 인증서가 하는 역할과, 인증서 오류가 발생하는 원인들을 설명하세요.',
    keywords: [['신원', '서버 확인', '인증'], ['CA', '인증 기관', '체인', '신뢰'], ['공개키', '키 교환', '암호화'], ['만료', '기간'], ['도메인 불일치', 'CN', 'SAN'], ['중간 인증서', '체인 누락'], ['시계', '시간']],
    minKeywords: 4,
    model: '인증서는 이 서버가 해당 도메인의 주인이 맞다는 것을 신뢰할 수 있는 인증 기관(CA)이 보증하는 문서이며, 그 안의 공개키로 안전하게 키를 교환해 이후 통신을 암호화합니다. 브라우저는 서버 인증서에서 시작해 중간 인증서를 거쳐 내장된 루트 CA 까지 체인이 이어지는지 검증합니다. 오류 원인은 유효 기간 만료, 접속한 도메인이 인증서의 SAN 목록에 없는 불일치, 중간 인증서를 서버가 함께 보내지 않은 체인 누락, 신뢰되지 않은 자체 서명 인증서, 그리고 클라이언트 기기의 시계가 크게 틀린 경우입니다.',
    explain: '체인 누락은 특히 골치 아픈데, 브라우저는 캐시된 중간 인증서 덕에 정상으로 보이지만 서버 간 호출이나 모바일에서는 실패해 "나는 되는데" 상황이 만들어집니다.',
    example: '인증서 자동 갱신이 실패한 채 방치되어 만료일에 서비스 전체가 멈추는 사고가 매년 반복됩니다. 만료 30일 전 알람이 기본입니다.' },
);
