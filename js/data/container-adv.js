window.QUIZ_BANK.container.push(
  /* ---------------- 과제형 ---------------- */
  { diff: 'easy', type: 'task', q: 'Nginx 컨테이너를 띄우고 정상 동작을 확인하세요.',
    scene: '# 상황: 테스트 서버에 웹 서버 컨테이너를 새로 올려야 합니다.',
    steps: [
      { hint: '# 1. nginx:alpine 이미지를 백그라운드로, 호스트 8080 포트를 컨테이너 80 포트에 연결해 실행', answer: 'docker run -d -p 8080:80 nginx:alpine', accept: ['docker container run -d -p 8080:80 nginx:alpine', 'docker run -d -p 8080:80 --name web nginx:alpine', 'docker run --detach -p 8080:80 nginx:alpine'] },
      { hint: '# 2. 실행 중인 컨테이너 목록 확인', answer: 'docker ps', accept: ['docker container ls', 'docker ps -a', 'docker container list'] },
      { hint: '# 3. web 컨테이너의 로그를 실시간으로 따라가며 확인', answer: 'docker logs -f web', accept: ['docker logs --follow web', 'docker container logs -f web'] },
    ],
    explain: '`-p 호스트:컨테이너` 순서를 뒤집는 실수가 잦습니다. `-d` 없이 실행하면 터미널이 컨테이너에 붙잡혀 Ctrl+C 시 컨테이너가 종료됩니다.',
    example: '`--name` 을 주지 않으면 무작위 이름이 붙어 이후 명령에서 매번 ID를 찾아야 합니다.' },

  { diff: 'normal', type: 'task', q: '컨테이너 안에 들어가 설정을 확인하고 정리하세요.',
    scene: '# 상황: api 라는 이름으로 실행 중인 컨테이너의 내부 상태를 점검해야 합니다.',
    steps: [
      { hint: '# 1. api 컨테이너 안에서 셸(/bin/sh)을 대화형으로 실행', answer: 'docker exec -it api /bin/sh', accept: ['docker exec -it api sh', 'docker exec -it api bash', 'docker exec -it api /bin/bash', 'docker container exec -it api sh'] },
      { hint: '# 2. (셸을 빠져나온 뒤) api 컨테이너를 정상 종료', answer: 'docker stop api', accept: ['docker container stop api'] },
      { hint: '# 3. 종료된 api 컨테이너를 삭제', answer: 'docker rm api', accept: ['docker container rm api', 'docker rm -f api'] },
    ],
    explain: '`docker attach` 는 실행 중인 메인 프로세스에 붙는 것이라 Ctrl+C 시 컨테이너가 죽을 수 있습니다. 점검 목적이라면 새 프로세스를 띄우는 `exec` 를 써야 합니다.',
    example: '`-it` 는 표준입력 연결(-i)과 TTY 할당(-t)의 조합으로, 둘 중 하나라도 빠지면 셸이 정상 동작하지 않습니다.' },

  { diff: 'hard', type: 'task', q: '쿠버네티스 파드가 계속 재시작합니다. 원인을 추적하세요.',
    scene: '# 상황: prod 네임스페이스의 api-7d9f 파드가 CrashLoopBackOff 상태입니다.',
    steps: [
      { hint: '# 1. prod 네임스페이스의 파드 목록과 상태 확인', answer: 'kubectl get pods -n prod', accept: ['kubectl get pod -n prod', 'kubectl get po -n prod', 'kubectl -n prod get pods'] },
      { hint: '# 2. api-7d9f 파드의 상세 정보와 이벤트 확인', answer: 'kubectl describe pod api-7d9f -n prod', accept: ['kubectl -n prod describe pod api-7d9f', 'kubectl describe po api-7d9f -n prod'] },
      { hint: '# 3. 직전에 죽은 컨테이너의 로그 확인 (현재 것이 아닌 이전 인스턴스)', answer: 'kubectl logs api-7d9f -n prod --previous', accept: ['kubectl logs -p api-7d9f -n prod', 'kubectl -n prod logs api-7d9f --previous', 'kubectl logs --previous api-7d9f -n prod'] },
    ],
    explain: 'CrashLoopBackOff 는 컨테이너가 떴다가 바로 죽기를 반복하는 상태라, 현재 로그를 보면 비어 있기 일쑤입니다. `--previous` 로 죽은 인스턴스의 로그를 봐야 진짜 오류가 나옵니다.',
    example: '`describe` 의 Events 섹션에는 이미지 풀 실패, 리소스 부족, 프로브 실패 같은 원인이 그대로 적혀 있습니다.' },

  { diff: 'hard', type: 'task', q: '디플로이먼트를 새 이미지로 배포하고 문제가 생기면 되돌리세요.',
    scene: '# 상황: prod 네임스페이스의 api 디플로이먼트를 v2 이미지로 올려야 합니다.',
    steps: [
      { hint: '# 1. api 디플로이먼트의 api 컨테이너 이미지를 myapp:v2 로 변경', answer: 'kubectl set image deployment/api api=myapp:v2 -n prod', accept: ['kubectl -n prod set image deployment/api api=myapp:v2', 'kubectl set image deploy/api api=myapp:v2 -n prod'] },
      { hint: '# 2. 롤아웃 진행 상황을 확인', answer: 'kubectl rollout status deployment/api -n prod', accept: ['kubectl -n prod rollout status deployment/api', 'kubectl rollout status deploy/api -n prod'] },
      { hint: '# 3. 문제가 발견되어 직전 버전으로 되돌리기', answer: 'kubectl rollout undo deployment/api -n prod', accept: ['kubectl -n prod rollout undo deployment/api', 'kubectl rollout undo deploy/api -n prod'] },
    ],
    explain: '`rollout status` 는 새 파드가 Ready 가 될 때까지 기다리며 실패 시 비정상 종료합니다. 그래서 CI 파이프라인의 배포 성공 판정에 그대로 쓸 수 있습니다.',
    example: '되돌릴 이력이 남으려면 변경이 파드 템플릿에 반영되어야 합니다. ConfigMap 만 바꾸고 파드 템플릿이 그대로면 롤아웃 자체가 일어나지 않습니다.' },

  /* ---------------- 서술형 ---------------- */
  { diff: 'normal', type: 'essay', q: '컨테이너가 가상머신(VM)과 어떻게 다른지, 그리고 그 차이가 실무에서 어떤 이점을 주는지 설명하세요.',
    keywords: [['커널', '공유'], ['게스트 OS', '하이퍼바이저', '전체 OS'], ['가볍', '빠른 시작', '부팅'], ['이미지', '동일한 환경', '재현'], ['격리', '네임스페이스', 'cgroup'], ['밀도', '자원']],
    minKeywords: 4,
    model: 'VM 은 하이퍼바이저 위에 게스트 OS 를 통째로 올리지만, 컨테이너는 호스트 커널을 공유하고 프로세스 수준에서 네임스페이스와 cgroup 으로 격리합니다. 그래서 컨테이너는 이미지 크기가 작고 시작이 초 단위로 빠르며, 같은 서버에 훨씬 많이 띄울 수 있습니다. 애플리케이션과 의존성을 이미지 하나로 묶으므로 개발·테스트·운영 환경이 동일하게 재현되어 "내 컴퓨터에서는 되는데" 문제가 줄어듭니다. 다만 커널을 공유하므로 격리 수준은 VM 보다 약하고, 호스트와 다른 커널이 필요하면 쓸 수 없습니다.',
    explain: '컨테이너의 본질은 "가벼운 가상머신" 이 아니라 격리된 프로세스입니다. 이 사실을 알아야 커널 파라미터나 보안 경계 문제를 올바르게 판단할 수 있습니다.',
    example: '멀티테넌트 환경에서 강한 격리가 필요하면 컨테이너만으로는 부족해 VM 기반 샌드박스를 함께 쓰는 이유가 여기 있습니다.' },

  { diff: 'hard', type: 'essay', q: '컨테이너 이미지 크기를 줄이고 빌드를 빠르게 하려면 Dockerfile 을 어떻게 작성해야 할지 설명하세요.',
    keywords: [['멀티 스테이지', 'multi-stage', '빌드 단계'], ['레이어', 'layer', '캐시'], ['alpine', 'slim', '베이스 이미지'], ['dockerignore', '불필요한 파일'], ['의존성 먼저', '순서', 'COPY'], ['RUN 합치기', '정리', 'apt clean']],
    minKeywords: 4,
    model: '먼저 빌드 도구와 실행 환경을 분리하는 멀티 스테이지 빌드를 씁니다. 컴파일은 무거운 이미지에서 하고 결과물만 가벼운 런타임 이미지로 복사하면 최종 이미지에 컴파일러가 남지 않습니다. 베이스 이미지는 alpine 이나 slim 계열을 고릅니다. 레이어 캐시를 살리려면 자주 바뀌지 않는 의존성 설치를 먼저 두고 소스 복사를 나중에 배치합니다. 패키지 설치와 캐시 정리는 한 RUN 안에서 처리해야 지운 파일이 이전 레이어에 남지 않습니다. .dockerignore 로 node_modules 나 .git 이 빌드 컨텍스트에 들어가지 않게 합니다.',
    explain: '레이어는 쌓이기만 할 뿐 이전 레이어의 파일은 삭제해도 이미지 크기에 남습니다. `RUN rm` 을 별도 레이어로 두면 용량이 전혀 줄지 않습니다.',
    example: 'package.json 만 먼저 COPY 하고 install 한 뒤 소스를 COPY 하면, 소스만 바뀌었을 때 의존성 설치가 캐시에서 재사용되어 빌드가 몇 배 빨라집니다.' },

  { diff: 'extreme', type: 'essay', q: '쿠버네티스에서 파드가 Pending 상태로 머물러 있습니다. 가능한 원인과 확인 방법을 설명하세요.',
    keywords: [['describe', '이벤트', 'events'], ['리소스', 'CPU', '메모리', 'requests'], ['노드', '스케줄링', '스케줄러'], ['taint', 'toleration', 'affinity', 'nodeSelector'], ['PVC', '볼륨', '스토리지'], ['이미지', 'ImagePull']],
    minKeywords: 4,
    model: 'Pending 은 스케줄러가 파드를 배치할 노드를 찾지 못했다는 뜻이므로 `kubectl describe pod` 의 Events 를 먼저 봅니다. 가장 흔한 원인은 requests 로 요청한 CPU·메모리를 수용할 여유 노드가 없는 경우이고, `kubectl top nodes` 와 `describe node` 로 할당 가능량을 확인합니다. 노드에 taint 가 걸려 있는데 파드에 toleration 이 없거나, nodeSelector·affinity 조건에 맞는 노드가 없어도 배치되지 않습니다. PVC 가 바인딩되지 않아 대기하는 경우도 있으니 `kubectl get pvc` 로 확인합니다. 참고로 이미지 문제로 인한 실패는 Pending 이 아니라 ContainerCreating 이나 ImagePullBackOff 로 나타납니다.',
    explain: 'Pending 과 ContainerCreating 은 다른 단계의 문제입니다. 전자는 배치 자체가 안 된 것이고 후자는 노드는 정해졌으나 컨테이너가 준비되지 않은 상태입니다.',
    example: 'requests 를 실제 사용량보다 크게 잡아 두면 노드에 여유가 있어도 스케줄이 실패합니다. 클러스터 자원이 남는데 Pending 이 쌓이면 이 설정을 먼저 봐야 합니다.' },

  { diff: 'extreme', type: 'essay', q: '컨테이너 운영에서 지켜야 할 보안 원칙을 설명하세요.',
    keywords: [['root', '비특권', 'USER'], ['이미지', '신뢰', '공식', '스캔', '취약점'], ['시크릿', '환경변수', 'Secret'], ['최소', '권한', 'capability', 'privileged'], ['읽기 전용', 'readOnly'], ['태그', 'latest', '고정']],
    minKeywords: 4,
    model: '컨테이너를 root 로 실행하지 않도록 Dockerfile 에 USER 를 지정하고, privileged 모드와 불필요한 capability 를 제거합니다. 베이스 이미지는 공식 이미지를 쓰고 latest 대신 버전을 고정하며, 정기적으로 취약점 스캔을 돌립니다. 비밀정보는 이미지에 굽거나 환경변수로 평문 노출하지 않고 Secret 이나 외부 시크릿 관리자를 통해 주입합니다. 파일시스템은 가능한 읽기 전용으로 마운트하고 쓰기가 필요한 경로만 별도 볼륨으로 엽니다. 네트워크는 기본 차단 후 필요한 통신만 허용하는 정책을 적용합니다.',
    explain: '컨테이너는 커널을 공유하므로 컨테이너 탈출 취약점이 곧 호스트 장악으로 이어집니다. root 로 돌리지 않는 것만으로도 상당수 공격 경로가 막힙니다.',
    example: '이미지 레이어에 한 번 들어간 비밀키는 이후 레이어에서 지워도 히스토리에 남아 추출 가능합니다. 빌드 시 시크릿은 별도 메커니즘으로 전달해야 합니다.' },
);
