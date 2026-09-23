/* 컨테이너 — 추가 타이핑형 (Docker 운영 · Kubernetes 트러블슈팅) */
window.QUIZ_BANK = window.QUIZ_BANK || {};
window.QUIZ_BANK.container = window.QUIZ_BANK.container || [];
window.QUIZ_BANK.container.push(
  /* ---------------- 단답형 ---------------- */
  { diff: 'easy', type: 'short', q: '중지된 컨테이너·사용하지 않는 이미지·네트워크·빌드 캐시를 한 번에 정리하는 Docker 명령어는?', answer: 'docker system prune', accept: ['docker system prune -a', 'docker system prune -f', 'docker system prune -af', 'docker system prune --all'],
    explain: '`docker system prune` 은 멈춘 컨테이너, 미사용 네트워크, dangling 이미지, 빌드 캐시를 지웁니다. `-a` 를 붙이면 컨테이너가 참조하지 않는 모든 이미지까지 지우므로 다음 배포 때 다시 pull 해야 합니다. 볼륨은 `--volumes` 를 명시해야 지워집니다.',
    example: 'CI 러너 디스크가 꽉 찼을 때 첫 조치입니다. `docker system df` 로 먼저 무엇이 얼마나 차지하는지 확인합니다.' },

  { diff: 'normal', type: 'short', q: '컨테이너 `web` 의 IP 주소만 `--format` 으로 뽑아 출력하는 `docker inspect` 명령어는?', answer: 'docker inspect -f "{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}" web', accept: ['docker inspect --format "{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}" web'],
    explain: '`docker inspect` 는 JSON 전체를 출력하므로 스크립트에서는 Go 템플릿 `--format` 으로 필드를 지정합니다. IP 는 네트워크별로 `.NetworkSettings.Networks.<이름>.IPAddress` 아래에 있습니다. 예전의 최상위 `.NetworkSettings.IPAddress` 는 기본 bridge 에서만 값이 있었고 Docker Engine 29(API v1.52)에서 제거되었으므로 `range` 로 순회합니다.',
    example: '`docker inspect -f "{{.State.ExitCode}}" job1` 로 배치 컨테이너의 종료 코드를 확인해 CI 파이프라인의 성공/실패를 판정합니다.' },

  { diff: 'normal', type: 'short', q: '컨테이너 `api` 의 로그 중 최근 100줄만, 각 줄에 타임스탬프를 붙여 출력하는 명령어는?', answer: 'docker logs --tail 100 -t api', accept: ['docker logs -t --tail 100 api', 'docker logs --tail=100 -t api', 'docker logs -n 100 -t api', 'docker logs --timestamps --tail 100 api'],
    explain: '`--tail`(`-n`) 은 끝에서부터 N 줄, `-t` 는 타임스탬프, `--since 10m` 은 최근 10분입니다. 로그가 수 GB 면 `docker logs` 전체 출력은 터미널을 멈추게 하므로 항상 범위를 제한합니다.',
    example: '`docker logs --since 2024-06-01T09:00:00 api 2>&1 | grep -i error` 로 특정 시각 이후 에러만 추립니다. 컨테이너 로그는 stderr 로도 나오므로 `2>&1` 이 필요합니다.' },

  { diff: 'normal', type: 'short', q: '`docker-compose.yml` 의 설정을 바꾼 뒤 `api` 서비스만 이미지를 다시 빌드하고 컨테이너를 재생성하는 명령어는?', answer: 'docker compose up -d --build api', accept: ['docker compose up --build -d api', 'docker-compose up -d --build api', 'docker compose up -d --build --force-recreate api'],
    explain: '`--build` 는 `build:` 섹션이 있는 서비스의 이미지를 다시 만들고, `up -d` 는 변경된 설정으로 컨테이너를 재생성합니다. 서비스명을 지정하면 나머지 서비스는 건드리지 않습니다.',
    example: '코드만 바뀐 경우 `docker compose build api && docker compose up -d --no-deps api` 로 의존 서비스(DB 등)의 재시작을 피할 수 있습니다.' },

  { diff: 'hard', type: 'short', q: 'Dockerfile 에서 컨테이너가 root 가 아닌 사용자 `app` 으로 실행되도록 지정하는 명령(instruction)은?', answer: 'USER app', accept: ['USER', 'user app'],
    explain: '`USER` 이후의 `RUN`, `CMD`, `ENTRYPOINT` 는 그 사용자로 실행됩니다. 그 전에 `RUN useradd -r app` 으로 사용자를 만들고 필요한 디렉터리 소유권을 `chown` 해 두어야 합니다. root 로 도는 컨테이너는 탈출 시 호스트 root 와 같아 보안 감사에서 지적됩니다.',
    example: 'Kubernetes 에서는 `securityContext.runAsNonRoot: true` 를 걸면 이미지에 `USER` 가 없을 때 파드가 기동조차 되지 않아 강제할 수 있습니다.' },

  { diff: 'hard', type: 'short', q: '실행 중인 컨테이너 `app` 의 파일시스템에서 이미지 대비 **변경된 파일 목록**을 보는 명령어는?', answer: 'docker diff app', accept: ['docker container diff app'],
    explain: '`docker diff` 는 A(추가)/C(변경)/D(삭제) 로 컨테이너 쓰기 레이어의 변경을 보여줍니다. 컨테이너 안에 로그나 임시 파일이 쌓여 디스크를 채우는지, 누가 설정을 손댔는지 확인할 때 씁니다.',
    example: '`docker diff app | grep "^A /var/log"` 로 컨테이너 안에 로그가 쌓이는 것을 발견하면, 로그를 stdout 으로 내보내거나 볼륨으로 빼도록 고칩니다.' },

  { diff: 'normal', type: 'short', q: '네임스페이스 `prod` 의 파드 `api-7d9f` 가 재시작을 반복합니다. **이전(크래시한) 컨테이너**의 로그를 보는 명령어는?', answer: 'kubectl logs api-7d9f -n prod --previous', accept: ['kubectl logs -p api-7d9f -n prod', 'kubectl logs api-7d9f -n prod -p', 'kubectl -n prod logs api-7d9f --previous', 'kubectl logs --previous api-7d9f -n prod', 'kubectl -n prod logs -p api-7d9f', 'kubectl logs api-7d9f --previous -n prod'],
    explain: '`CrashLoopBackOff` 상태에서는 현재 컨테이너가 막 시작해 로그가 비어 있습니다. `--previous`(`-p`) 가 직전에 죽은 컨테이너의 로그를 보여주며, 대개 여기에 실제 에러(설정 누락, DB 연결 실패)가 있습니다.',
    example: '`kubectl describe pod` 의 `Last State: Terminated, Reason: OOMKilled` 와 함께 보면 메모리 한도 때문인지 애플리케이션 오류인지 구분됩니다.' },

  { diff: 'normal', type: 'short', q: '워커 노드 `worker-2` 에 새 파드가 스케줄되지 않도록 표시하되, 기존 파드는 그대로 두는 명령어는?', answer: 'kubectl cordon worker-2', accept: ['kubectl cordon node/worker-2', 'kubectl cordon nodes/worker-2'],
    explain: '`cordon` 은 노드를 `SchedulingDisabled` 로 만들 뿐 실행 중인 파드는 건드리지 않습니다. 파드까지 다른 노드로 내보내려면 `drain`, 다시 스케줄 가능하게 하려면 `uncordon` 입니다.',
    example: '노드 점검 전 `cordon` 으로 새 파드 유입을 먼저 막고, 준비가 되면 `drain` 으로 기존 파드를 PDB 를 지키며 다른 노드로 옮긴 뒤, 점검이 끝나면 `uncordon` 합니다.' },

  { diff: 'normal', type: 'short', q: '파드 `api-7d9f` 가 `Pending` 입니다. 스케줄되지 못한 이유(이벤트)를 확인하는 명령어는?', answer: 'kubectl describe pod api-7d9f', accept: ['kubectl describe pods api-7d9f', 'kubectl describe pod/api-7d9f', 'kubectl get events --field-selector involvedObject.name=api-7d9f', 'kubectl describe po api-7d9f'],
    explain: '`describe` 출력 맨 아래 `Events` 에 `FailedScheduling: 0/3 nodes are available: insufficient cpu` 처럼 이유가 나옵니다. 리소스 부족, 노드 셀렉터·테인트 불일치, PVC 바인딩 실패가 대표적입니다.',
    example: '`Insufficient memory` 면 requests 를 낮추거나 노드를 늘리고, `node(s) had taint` 면 toleration 을 추가합니다.' },

  { diff: 'hard', type: 'short', q: '디플로이먼트 `api` 의 롤아웃 이력(리비전 목록)을 보는 명령어는?', answer: 'kubectl rollout history deployment/api', accept: ['kubectl rollout history deploy/api', 'kubectl rollout history deployment api'],
    explain: '리비전별로 되돌리려면 `kubectl rollout undo deployment/api --to-revision=2` 를 씁니다. `--record` 는 폐기되었으므로 `kubernetes.io/change-cause` 어노테이션으로 변경 사유를 남기는 것이 권장됩니다.',
    example: '배포 후 문제가 생겼는데 직전 리비전도 문제였다면 이력에서 정상이던 리비전 번호를 찾아 그쪽으로 undo 합니다.' },

  { diff: 'hard', type: 'short', q: '`ConfigMap` `app-config` 를 `config.yaml` 파일 내용으로 만드는 명령어는?', answer: 'kubectl create configmap app-config --from-file=config.yaml', accept: ['kubectl create cm app-config --from-file=config.yaml', 'kubectl create configmap app-config --from-file config.yaml', 'kubectl create configmap app-config --from-file=./config.yaml'],
    explain: '`--from-file` 은 파일명을 키로, 내용을 값으로 넣습니다. `--from-literal=KEY=VAL` 은 키-값 한 쌍씩입니다. 이미 있으면 실패하므로 갱신은 `--dry-run=client -o yaml | kubectl apply -f -` 패턴을 씁니다.',
    example: 'ConfigMap 을 바꿔도 이미 뜬 파드의 환경변수는 갱신되지 않습니다. 볼륨 마운트는 잠시 후 반영되지만, 확실히 하려면 `rollout restart` 합니다.' },

  { diff: 'hard', type: 'short', q: '파드 `api-7d9f` 의 컨테이너 `app` 에 접속해 셸을 실행하는 명령어는? (파드에 컨테이너가 여러 개)', answer: 'kubectl exec -it api-7d9f -c app -- sh', accept: ['kubectl exec -it api-7d9f -c app -- /bin/sh', 'kubectl exec -it api-7d9f -c app -- bash', 'kubectl exec -it api-7d9f --container app -- sh', 'kubectl exec -it -c app api-7d9f -- sh', 'kubectl exec -ti api-7d9f -c app -- sh'],
    explain: '멀티 컨테이너 파드에서 `-c` 를 생략하면 첫 번째 컨테이너(또는 기본 어노테이션)로 들어가 사이드카에 접속되는 실수가 잦습니다. `--` 뒤가 컨테이너 안에서 실행할 명령입니다.',
    example: '이미지에 셸이 없는 distroless 라면 `kubectl debug -it api-7d9f --image=busybox --target=app` 로 임시 디버그 컨테이너를 붙입니다.' },

  { diff: 'hard', type: 'short', q: '노드 `worker-2` 에 걸린 테인트 `dedicated=gpu:NoSchedule` 을 제거하는 명령어는?', answer: 'kubectl taint nodes worker-2 dedicated=gpu:NoSchedule-', accept: ['kubectl taint node worker-2 dedicated=gpu:NoSchedule-', 'kubectl taint nodes worker-2 dedicated-', 'kubectl taint nodes worker-2 dedicated:NoSchedule-'],
    explain: '테인트 제거는 키(또는 키=값:효과) 끝에 `-` 를 붙입니다. 라벨 제거(`kubectl label node worker-2 gpu-`)와 같은 문법입니다.',
    example: 'GPU 노드 점검을 끝내고 일반 워크로드도 받게 하거나, 실수로 건 테인트 때문에 파드가 `Pending` 인 상황을 풀 때 씁니다.' },

  { diff: 'normal', type: 'short', q: '네임스페이스 `prod` 의 리소스 사용량 제한과 현재 사용량(ResourceQuota)을 확인하는 명령어는?', answer: 'kubectl describe resourcequota -n prod', accept: ['kubectl describe quota -n prod', 'kubectl get resourcequota -n prod', 'kubectl -n prod describe resourcequota', 'kubectl get quota -n prod -o yaml'],
    explain: 'ResourceQuota 는 네임스페이스 단위로 CPU·메모리·파드 수 상한을 겁니다. 한도에 닿으면 새 파드가 `exceeded quota` 로 생성 거부되며, 이때 파드는 Pending 이 아니라 아예 만들어지지 않고 ReplicaSet 이벤트에만 기록됩니다.',
    example: '"파드 수가 늘지 않는데 에러도 안 보인다" 면 `kubectl describe rs` 의 이벤트와 quota 를 확인합니다.' },

  /* ---------------- 과제형 ---------------- */
  { diff: 'hard', type: 'task', q: '파드가 `CrashLoopBackOff` 입니다. 원인을 좁혀 나가세요.',
    scene: '# 상황: 네임스페이스 prod 의 파드 api-7d9f 가 계속 재시작됩니다.',
    steps: [
      { hint: '# 1. 파드의 상태·재시작 횟수·마지막 종료 사유(이벤트 포함) 확인', answer: 'kubectl describe pod api-7d9f -n prod', accept: ['kubectl -n prod describe pod api-7d9f', 'kubectl describe po api-7d9f -n prod', 'kubectl describe pod/api-7d9f -n prod'] },
      { hint: '# 2. 직전에 크래시한 컨테이너의 로그 확인', answer: 'kubectl logs api-7d9f -n prod --previous', accept: ['kubectl logs -p api-7d9f -n prod', 'kubectl -n prod logs api-7d9f -p', 'kubectl -n prod logs api-7d9f --previous', 'kubectl logs --previous api-7d9f -n prod', 'kubectl logs api-7d9f --previous -n prod'] },
      { hint: '# 3. 파드가 참조하는 ConfigMap·Secret·환경변수 등 스펙 전체를 YAML 로 확인', answer: 'kubectl get pod api-7d9f -n prod -o yaml', accept: ['kubectl -n prod get pod api-7d9f -o yaml', 'kubectl get po api-7d9f -n prod -o yaml', 'kubectl get pod api-7d9f -n prod -oyaml', 'kubectl get pod api-7d9f -o yaml -n prod'] },
      { hint: '# 4. 설정을 고친 뒤 디플로이먼트 api 의 파드를 순차 재기동', answer: 'kubectl rollout restart deployment/api -n prod', accept: ['kubectl -n prod rollout restart deployment/api', 'kubectl rollout restart deploy/api -n prod', 'kubectl rollout restart deployment api -n prod'] },
    ],
    explain: 'CrashLoopBackOff 의 원인은 대개 세 가지입니다: 애플리케이션 오류(로그에 스택트레이스), OOMKilled(메모리 한도), 설정 누락(환경변수·Secret 이름 오타). `describe` 의 `Last State` 와 `--previous` 로그가 이를 구분해 줍니다.',
    example: 'Liveness probe 가 너무 공격적이어서(initialDelaySeconds 부족) 정상 기동 중인 앱을 죽이는 경우도 흔합니다. 로그에 에러가 없는데 재시작된다면 probe 설정을 의심합니다.' },

  /* ---------------- 서술형 ---------------- */
  { diff: 'hard', type: 'essay', q: '컨테이너 이미지 크기를 줄이고 보안을 높이기 위한 Dockerfile 작성 원칙을 설명하세요.',
    keywords: [['멀티스테이지', 'multi-stage', '빌드 스테이지'], ['alpine', 'slim', 'distroless', '작은 베이스'], ['레이어', 'RUN 합치', '&&'], ['캐시', 'COPY 순서', '의존성 먼저'], ['.dockerignore'], ['USER', 'non-root', 'root 아닌'], ['태그 고정', 'latest 금지', 'digest'], ['불필요', '빌드 도구', '캐시 삭제', 'apt clean']],
    minKeywords: 4,
    model: '멀티스테이지 빌드로 컴파일러와 빌드 도구는 빌드 스테이지에만 두고 최종 이미지에는 산출물만 복사합니다. 베이스는 `alpine`, `-slim`, distroless 처럼 작은 것을 쓰고 `latest` 대신 태그나 digest 로 고정해 재현성을 확보합니다. `RUN` 은 `&&` 로 묶어 레이어 수를 줄이고 같은 레이어에서 패키지 캐시(`apt-get clean`, `rm -rf /var/lib/apt/lists/*`)를 지웁니다. 의존성 파일(`package.json`, `requirements.txt`)을 먼저 `COPY` 해 설치하고 소스는 나중에 복사하면 코드만 바뀔 때 빌드 캐시가 유지됩니다. `.dockerignore` 로 `.git`, `node_modules`, 테스트 데이터를 제외하고, `USER` 로 root 가 아닌 사용자로 실행하며, 비밀값은 이미지에 굽지 않고 런타임에 주입합니다. 마지막으로 `trivy` 같은 스캐너로 취약점을 점검합니다.',
    explain: '이미지가 작을수록 pull 이 빠르고 공격 표면이 줄어듭니다. 1GB 짜리 ubuntu 기반 이미지가 멀티스테이지 + distroless 로 50MB 가 되는 경우가 흔합니다.',
    example: 'Go 서비스: 빌드 스테이지 `golang:1.22` → 최종 `gcr.io/distroless/static` 에 바이너리 하나. 셸조차 없어 침입해도 할 수 있는 것이 거의 없습니다.' },

  { diff: 'extreme', type: 'essay', q: 'Kubernetes 에서 서비스가 간헐적으로 502/연결 실패를 냅니다. 파드 자체는 Running 입니다. 원인 후보를 어떤 순서로 확인하겠습니까?',
    keywords: [['readiness', 'probe', '준비'], ['endpoints', 'endpointslice', '엔드포인트'], ['롤링 업데이트', 'terminating', 'graceful', 'preStop'], ['리소스', 'CPU 스로틀', 'OOM', 'limits'], ['서비스 셀렉터', 'selector', '라벨'], ['DNS', 'CoreDNS', '이름 해석'], ['네트워크 정책', 'NetworkPolicy'], ['로그', '이벤트', 'describe']],
    minKeywords: 4,
    model: '먼저 `kubectl get endpoints svc` 로 서비스에 실제 연결된 파드 IP 가 기대만큼 있는지 봅니다. 비어 있거나 수가 적으면 셀렉터·라벨 불일치나 readiness probe 실패입니다. 간헐적이라면 롤링 업데이트나 스케일 다운 중 종료되는 파드로 트래픽이 가는 경우가 의심되므로, `preStop` 훅과 `terminationGracePeriodSeconds`, 앱의 SIGTERM 처리와 keep-alive 연결 정리를 확인합니다. 다음으로 `kubectl top` 과 컨테이너의 CPU 스로틀링(`nr_throttled`)을 보고 limits 가 너무 낮아 요청 처리 중 응답이 지연되는지 확인합니다. readiness probe 가 부하 시 타임아웃되어 파드가 엔드포인트에서 들락날락하는지 이벤트에서 확인하고, CoreDNS 지연이나 NetworkPolicy 로 일부 노드에서만 막히는지도 점검합니다. 마지막으로 인그레스 컨트롤러 로그에서 어느 업스트림이 502 를 냈는지 파드 IP 를 대조합니다.',
    explain: '"Running 인데 간헐적" 은 거의 항상 엔드포인트 변동(파드 교체·probe 플래핑) 아니면 리소스 스로틀입니다. 인그레스 로그의 업스트림 IP 와 그 시각의 파드 상태를 맞춰 보면 대부분 드러납니다.',
    example: '배포 때마다 몇 초간 502 가 난다면, 파드가 SIGTERM 을 받고 즉시 종료해 아직 엔드포인트에서 빠지지 않은 요청이 실패하는 것입니다. `preStop: sleep 5` 만 넣어도 사라지는 경우가 많습니다.' },
);
