/* 네트워크 — 추가 타이핑형 (진단 · 방화벽 · DNS · TLS · 인터페이스 설정) */
window.QUIZ_BANK = window.QUIZ_BANK || {};
window.QUIZ_BANK.network = window.QUIZ_BANK.network || [];
window.QUIZ_BANK.network.push(
  /* ---------------- 단답형 ---------------- */
  { diff: 'normal', type: 'short', q: '`traceroute` 대신 ICMP 로 경로의 각 홉별 손실률·지연을 **실시간으로 반복 측정**하는 도구를 사용해 `example.com` 을 진단하는 명령어는?', answer: 'mtr example.com', accept: ['mtr -n example.com', 'mtr --report example.com', 'mtr -rw example.com', 'mtr -r example.com'],
    explain: '`mtr` 은 ping 과 traceroute 를 합친 도구로, 홉별 Loss% 와 Avg/Worst 지연을 계속 갱신합니다. 중간 홉의 손실은 ICMP rate-limit 때문일 수 있으니 **마지막 홉까지 손실이 이어지는지**로 판단합니다.',
    example: '`mtr -rwc 100 example.com` 으로 100회 측정 리포트를 만들어 ISP 나 클라우드 지원에 첨부하면 "우리 쪽 문제 아니다" 논쟁을 줄일 수 있습니다.' },

  { diff: 'normal', type: 'short', q: '인터페이스 `eth0` 의 패킷 수신·송신 통계와 에러·드롭 카운터를 보는 `ip` 명령어는?', answer: 'ip -s link show eth0', accept: ['ip -s link', 'ip -s -s link show eth0', 'ip -statistics link show eth0', 'ip -s l show eth0', 'cat /proc/net/dev'],
    explain: '`-s` 는 statistics 이며 두 번(`-s -s`) 주면 에러 유형까지 세분화됩니다. RX dropped 가 늘면 링 버퍼 부족(`ethtool -G`)이나 CPU 처리 지연, RX errors 는 케이블·NIC 문제를 의심합니다.',
    example: '`watch -n1 ip -s link show eth0` 으로 카운터가 실시간으로 증가하는지 보면 현재 진행 중인 문제인지 과거 흔적인지 구분됩니다.' },

  { diff: 'hard', type: 'short', q: '`eth0` 의 NIC 링 버퍼(RX) 크기를 최대치인 4096 으로 늘리는 명령어는?', answer: 'ethtool -G eth0 rx 4096', accept: ['ethtool --set-ring eth0 rx 4096', 'sudo ethtool -G eth0 rx 4096', 'ethtool -G eth0 rx 4096 tx 4096'],
    explain: '`ethtool -g eth0` 으로 현재값과 최대값을 보고 `-G` 로 설정합니다. 트래픽 버스트 시 `rx_dropped`/`rx_missed_errors` 가 늘면 링 버퍼를 키워 커널이 처리하기 전 NIC 에서 버리는 패킷을 줄입니다. 재부팅하면 초기화되므로 udev 규칙이나 NetworkManager dispatcher 로 영구화합니다.',
    example: '10G NIC 에서 초당 수십만 패킷을 받는 로그 수집 서버나 로드밸런서에서 이 튜닝이 드롭을 없애는 경우가 많습니다.' },

  { diff: 'normal', type: 'short', q: '`api.example.com` 의 A 레코드를 **캐시 없이 권한 있는 네임서버(ns1.example.com)에 직접** 물어보는 명령어는?', answer: 'dig @ns1.example.com api.example.com A', accept: ['dig @ns1.example.com api.example.com', 'dig api.example.com A @ns1.example.com', 'dig +norecurse @ns1.example.com api.example.com', 'nslookup api.example.com ns1.example.com'],
    explain: 'DNS 를 바꿨는데 반영이 안 될 때, 권한 서버에 직접 물어 값이 맞으면 나머지는 리졸버 캐시(TTL) 문제입니다. `dig example.com NS` 로 권한 서버를 먼저 찾습니다.',
    example: '`dig +short @8.8.8.8 api.example.com` 과 `dig +short @1.1.1.1 api.example.com` 을 비교해 퍼블릭 리졸버별 전파 상태를 확인합니다.' },

  { diff: 'hard', type: 'short', q: '`api.example.com` 의 TLS 인증서 체인 전체와 검증 결과(Verify return code)를 보는 명령어는?', answer: 'openssl s_client -connect api.example.com:443 -servername api.example.com -showcerts', accept: ['openssl s_client -connect api.example.com:443 -showcerts', 'openssl s_client -showcerts -connect api.example.com:443 -servername api.example.com', 'openssl s_client -connect api.example.com:443 -servername api.example.com -showcerts </dev/null', 'echo | openssl s_client -connect api.example.com:443 -servername api.example.com -showcerts'],
    explain: '`-showcerts` 는 서버가 보낸 중간 인증서까지 출력합니다. 브라우저는 되는데 curl/Java 에서 "unable to get local issuer certificate" 가 나면 서버가 중간 인증서를 빠뜨린 것이며, 이 출력의 체인 깊이(depth)로 확인합니다. `-servername` 은 SNI 를 명시하는 옵션으로, OpenSSL 1.1.1 부터는 `-connect` 의 호스트명이 자동으로 쓰이지만 IP 로 접속하거나 구버전일 때는 필수입니다.',
    example: '마지막의 `Verify return code: 0 (ok)` 가 아니면 체인·만료·호스트명 불일치 중 하나입니다. `-CAfile` 로 사내 CA 를 지정해 재검증할 수 있습니다.' },

  { diff: 'hard', type: 'short', q: '인증서 파일 `server.crt` 의 만료일·주체(Subject)·SAN 을 출력하는 명령어는?', answer: 'openssl x509 -in server.crt -noout -text', accept: ['openssl x509 -in server.crt -text -noout', 'openssl x509 -noout -text -in server.crt', 'openssl x509 -in server.crt -noout -dates -subject -ext subjectAltName'],
    explain: '`-noout` 은 인코딩된 본문을 생략하고 `-text` 로 사람이 읽을 형식만 출력합니다. `-enddate` 만 붙이면 만료일 한 줄, `-ext subjectAltName` 으로 SAN 만 볼 수 있습니다.',
    example: '`openssl x509 -in server.crt -noout -checkend 2592000` 은 30일 안에 만료되면 종료 코드 1 을 반환해 cron 알림 스크립트에 바로 쓸 수 있습니다.' },

  { diff: 'normal', type: 'short', q: 'firewalld 를 쓰는 RHEL 서버에서 HTTPS(443/tcp)를 **영구적으로** 허용하고 즉시 반영하는 명령어는? (두 명령을 `&&` 로 연결)', answer: 'firewall-cmd --permanent --add-port=443/tcp && firewall-cmd --reload', accept: ['firewall-cmd --permanent --add-service=https && firewall-cmd --reload', 'firewall-cmd --add-port=443/tcp --permanent && firewall-cmd --reload', 'firewall-cmd --add-service=https --permanent && firewall-cmd --reload', 'sudo firewall-cmd --permanent --add-port=443/tcp && sudo firewall-cmd --reload'],
    explain: '`--permanent` 없이 추가하면 재부팅·reload 때 사라지고, `--permanent` 만 하면 reload 전까지 적용되지 않습니다. 둘 다 필요합니다. `--add-service=https` 는 미리 정의된 서비스 이름을 쓰는 방법입니다.',
    example: '`firewall-cmd --list-all` 로 현재 존(zone)의 열린 포트·서비스를 확인합니다. 다른 존에 인터페이스가 속해 있으면 규칙이 적용되지 않으니 `--get-active-zones` 도 함께 봅니다.' },

  { diff: 'hard', type: 'short', q: 'iptables 의 `INPUT` 체인 규칙을 **번호와 패킷 카운터**를 포함해 나열하는 명령어는?', answer: 'iptables -L INPUT -n -v --line-numbers', accept: ['iptables -nvL INPUT --line-numbers', 'iptables -L INPUT -nv --line-numbers', 'iptables -vnL INPUT --line-numbers', 'sudo iptables -L INPUT -n -v --line-numbers', 'iptables -L -n -v --line-numbers', 'iptables -L INPUT -vn --line-numbers', 'iptables -L INPUT --line-numbers -n -v'],
    explain: '`-n` 은 DNS 역조회를 막아 빠르게, `-v` 는 pkts/bytes 카운터로 어느 규칙이 실제로 매칭되는지, `--line-numbers` 는 `iptables -D INPUT 3` 처럼 번호로 삭제할 수 있게 해 줍니다.',
    example: '연결이 안 될 때 `watch -n1 "iptables -nvL INPUT"` 으로 DROP 규칙의 카운터가 올라가는지 보면 방화벽이 원인인지 즉시 알 수 있습니다.' },

  { diff: 'normal', type: 'short', q: 'HTTP 요청의 각 단계(DNS 해석·연결·TLS·첫 바이트·전체) 소요 시간을 초 단위로 출력하는 `curl` 명령어는? (대상: https://api.example.com/health)', answer: 'curl -o /dev/null -s -w "dns:%{time_namelookup} connect:%{time_connect} tls:%{time_appconnect} ttfb:%{time_starttransfer} total:%{time_total}\\n" https://api.example.com/health', accept: ['curl -s -o /dev/null -w "%{time_namelookup} %{time_connect} %{time_appconnect} %{time_starttransfer} %{time_total}\\n" https://api.example.com/health', 'curl -o /dev/null -s -w "%{time_namelookup} %{time_connect} %{time_appconnect} %{time_starttransfer} %{time_total}" https://api.example.com/health', 'curl -w "%{time_namelookup} %{time_connect} %{time_appconnect} %{time_starttransfer} %{time_total}\\n" -o /dev/null -s https://api.example.com/health', 'curl -s -o /dev/null -w "%{time_namelookup} %{time_connect} %{time_appconnect} %{time_starttransfer} %{time_total}" https://api.example.com/health'],
    explain: '`-w` 의 시간 변수는 누적값입니다. `time_connect` 가 크면 네트워크 지연·SYN 재전송, `time_appconnect - time_connect` 가 크면 TLS 협상, `time_starttransfer - time_appconnect` 가 크면 서버 처리 시간이 병목입니다.',
    example: '`curl -w "@format.txt"` 처럼 포맷을 파일로 빼두면 매번 긴 문자열을 치지 않아도 됩니다. API 지연 원인을 "네트워크냐 서버냐" 로 나누는 가장 빠른 방법입니다.' },

  { diff: 'hard', type: 'short', q: '인터페이스 `eth0` 에서 **SYN 패킷만** 캡처하여 어느 IP 가 접속을 시도하는지 보는 `tcpdump` 명령어는?', answer: 'tcpdump -i eth0 "tcp[tcpflags] & tcp-syn != 0 and tcp[tcpflags] & tcp-ack == 0"', accept: ['tcpdump -i eth0 "tcp[tcpflags] == tcp-syn"', 'tcpdump -i eth0 tcp[tcpflags] == tcp-syn', 'tcpdump -i eth0 "tcp[13] == 2"', 'tcpdump -ni eth0 "tcp[tcpflags] == tcp-syn"', 'tcpdump -i eth0 -n "tcp[tcpflags] & (tcp-syn) != 0 and tcp[tcpflags] & (tcp-ack) == 0"'],
    explain: '`tcp[tcpflags]` 는 TCP 헤더의 오프셋 13 바이트(0부터 셈, 플래그 바이트)입니다. SYN 만 켜진 패킷(`== tcp-syn`)이 새 연결 시도이고, SYN+ACK 는 응답입니다. `tcp[13] == 2` 는 같은 뜻의 원시 표기입니다.',
    example: 'SYN flood 의심 시 `tcpdump -ni eth0 "tcp[tcpflags] == tcp-syn" | awk \'{print $3}\' | cut -d. -f1-4 | sort | uniq -c | sort -rn | head` 로 상위 출발지 IP 를 뽑습니다.' },

  { diff: 'normal', type: 'short', q: '서버가 어떤 DNS 리졸버를 실제로 쓰는지(systemd-resolved 환경) 확인하는 명령어는?', answer: 'resolvectl status', accept: ['resolvectl', 'systemd-resolve --status', 'resolvectl dns'],
    explain: 'systemd-resolved 를 쓰는 Ubuntu 등에서는 `/etc/resolv.conf` 가 `127.0.0.53` 스텁만 가리켜 실제 업스트림이 보이지 않습니다. `resolvectl status` 가 인터페이스별 실제 DNS 서버와 검색 도메인을 보여줍니다.',
    example: 'VPN 연결 후 사내 도메인이 안 풀리면 `resolvectl status` 에서 VPN 인터페이스에 사내 DNS 와 검색 도메인이 붙었는지 확인합니다.' },

  { diff: 'hard', type: 'short', q: '`10.0.0.0/8` 대역으로 가는 트래픽이 `eth1` 의 게이트웨이 `192.168.1.254` 를 거치도록 정적 라우트를 추가하는 명령어는?', answer: 'ip route add 10.0.0.0/8 via 192.168.1.254 dev eth1', accept: ['ip route add 10.0.0.0/8 via 192.168.1.254', 'sudo ip route add 10.0.0.0/8 via 192.168.1.254 dev eth1', 'ip r add 10.0.0.0/8 via 192.168.1.254 dev eth1', 'route add -net 10.0.0.0/8 gw 192.168.1.254 dev eth1'],
    explain: '`ip route add 대상 via 게이트웨이 dev 인터페이스` 형식입니다. 재부팅하면 사라지므로 NetworkManager(`nmcli con mod eth1 +ipv4.routes "10.0.0.0/8 192.168.1.254"`)나 netplan 에 영구 등록합니다.',
    example: '두 개의 NIC 를 가진 서버에서 관리망과 서비스망을 분리할 때, 기본 게이트웨이는 하나만 두고 나머지 대역은 이런 정적 라우트로 보냅니다. `ip route get 10.1.2.3` 으로 어느 경로를 타는지 검증합니다.' },

  { diff: 'hard', type: 'short', q: '연결 상태가 `TIME_WAIT` 인 소켓 수를 세는 명령어는?', answer: 'ss -tan state time-wait | wc -l', accept: ['ss -tan | grep -c TIME-WAIT', 'ss -s', 'ss -tan state time-wait | wc -l', 'netstat -tan | grep -c TIME_WAIT', 'ss -ant | grep TIME-WAIT | wc -l', 'ss -ant state time-wait | wc -l'],
    explain: '`wc -l` 은 ss 의 헤더 한 줄도 세므로 정확한 값은 1을 빼거나 `ss -Htan ...`(H: no-header)을 씁니다. TIME_WAIT 은 능동적으로 연결을 닫은 쪽이 2MSL(보통 60초) 동안 포트를 붙잡는 정상 상태입니다. 수만 개가 쌓이면 임시 포트가 고갈되어 "Cannot assign requested address" 가 나며, 해결은 keep-alive/커넥션 풀 사용이고 `tcp_tw_reuse` 는 보조 수단입니다.',
    example: '프록시나 API 게이트웨이처럼 백엔드로 짧은 연결을 많이 여는 서버에서 흔한 증상입니다. `ss -s` 의 `timewait` 값으로 추세를 봅니다.' },

  /* ---------------- 과제형 ---------------- */
  { diff: 'hard', type: 'task', q: '웹 서버의 TLS 인증서가 만료되었습니다. 상태를 확인하고 새 인증서를 적용하세요.',
    scene: '# 상황: https://www.example.com 접속 시 브라우저가 "인증서 만료" 경고를 띄웁니다. nginx 를 씁니다.',
    steps: [
      { hint: '# 1. 서버가 실제로 제공 중인 인증서의 유효 기간(notBefore/notAfter) 확인', answer: 'openssl s_client -connect www.example.com:443 -servername www.example.com </dev/null 2>/dev/null | openssl x509 -noout -dates', accept: ['echo | openssl s_client -connect www.example.com:443 -servername www.example.com 2>/dev/null | openssl x509 -noout -dates', 'openssl s_client -connect www.example.com:443 </dev/null 2>/dev/null | openssl x509 -noout -dates', 'openssl s_client -connect www.example.com:443 -servername www.example.com | openssl x509 -noout -dates', 'curl -vI https://www.example.com'] },
      { hint: '# 2. 디스크의 새 인증서 파일 /etc/nginx/ssl/new.crt 의 만료일 확인', answer: 'openssl x509 -in /etc/nginx/ssl/new.crt -noout -enddate', accept: ['openssl x509 -in /etc/nginx/ssl/new.crt -noout -dates', 'openssl x509 -noout -enddate -in /etc/nginx/ssl/new.crt', 'openssl x509 -in /etc/nginx/ssl/new.crt -noout -text'] },
      { hint: '# 3. 인증서 경로를 바꾼 nginx 설정의 문법 검사', answer: 'nginx -t', accept: ['sudo nginx -t', 'nginx -t -c /etc/nginx/nginx.conf'] },
      { hint: '# 4. 연결을 끊지 않고 nginx 설정만 다시 읽기', answer: 'nginx -s reload', accept: ['systemctl reload nginx', 'sudo nginx -s reload', 'sudo systemctl reload nginx', 'service nginx reload'] },
    ],
    explain: '인증서를 교체해도 `reload` 를 안 하면 nginx 는 메모리의 옛 인증서를 계속 씁니다. 그리고 인증서 파일에 중간 인증서(체인)가 빠지면 브라우저는 되는데 curl/모바일 앱이 실패하므로 fullchain 을 쓰는지 확인합니다.',
    example: 'Let\'s Encrypt 는 `certbot renew` 가 갱신 후 `--deploy-hook "systemctl reload nginx"` 로 자동 reload 하도록 설정해 두면 이 사고 자체가 사라집니다.' },

  /* ---------------- 서술형 ---------------- */
  { diff: 'hard', type: 'essay', q: '`curl https://api.example.com` 이 타임아웃됩니다. 클라이언트부터 서버까지 어떤 순서로 원인을 좁혀 나가겠습니까?',
    keywords: [['DNS', 'dig', '이름 해석', 'resolve'], ['ping', 'ICMP', '도달'], ['포트', 'nc', 'telnet', '443'], ['경로', 'traceroute', 'mtr', '라우팅'], ['방화벽', '보안 그룹', 'iptables', 'NACL'], ['서버', 'ss -lntp', '리스닝', '프로세스'], ['TLS', 'openssl s_client', '인증서'], ['로그', 'tcpdump', '패킷']],
    minKeywords: 4,
    model: '먼저 `dig api.example.com` 으로 이름이 풀리는지, 풀린 IP 가 기대한 서버인지 확인합니다. 다음 `ping` 으로 도달 여부를 보되 ICMP 가 막힌 환경이 많으므로 `nc -zv api.example.com 443` 으로 포트 응답을 직접 확인합니다. 포트가 안 열리면 `mtr` 로 경로 중 어디서 끊기는지 보고, 마지막 홉 근처면 서버 앞 방화벽(보안 그룹, NACL, iptables)을 점검합니다. 서버에 접근할 수 있다면 `ss -lntp | grep 443` 으로 실제 리스닝 중인지, `0.0.0.0` 이 아니라 `127.0.0.1` 에만 바인드된 것은 아닌지 봅니다. 포트는 열리는데 curl 만 멈춘다면 `openssl s_client` 로 TLS 협상 단계를 보고, 그래도 불명확하면 양쪽에서 `tcpdump` 로 SYN 이 도착하는지, SYN-ACK 이 돌아오는지 대조합니다. SYN 은 오는데 응답이 없으면 서버 측(백로그, 리소스), SYN 자체가 안 오면 중간 경로 문제입니다.',
    explain: '계층을 아래서 위로(DNS → IP 도달 → 포트 → TLS → HTTP) 하나씩 확인하는 것이 핵심입니다. 각 단계의 도구가 다르고, 어느 단계에서 멈추는지가 곧 원인 범위입니다.',
    example: '`curl -v` 한 번이면 `Resolved`, `Connected`, `TLS handshake` 중 어디까지 출력되고 멈추는지 보이므로, 실전에서는 이것으로 단계를 먼저 특정하고 해당 도구로 파고듭니다.' },
);
