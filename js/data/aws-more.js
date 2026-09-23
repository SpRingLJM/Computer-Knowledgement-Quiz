/* Cloud · AWS — 추가 타이핑형 (EC2 · EBS · S3 · IAM · VPC 운영) */
window.QUIZ_BANK = window.QUIZ_BANK || {};
window.QUIZ_BANK.aws = window.QUIZ_BANK.aws || [];
window.QUIZ_BANK.aws.push(
  /* ---------------- 단답형 ---------------- */
  { diff: 'normal', type: 'short', q: 'EC2 인스턴스 `i-0abc123` 에 붙은 EBS 볼륨의 스냅샷을 만드는 명령어는? (볼륨 ID: vol-0def456)', answer: 'aws ec2 create-snapshot --volume-id vol-0def456', accept: ['aws ec2 create-snapshot --volume-id vol-0def456 --description backup', 'aws ec2 create-snapshot --volume-id vol-0def456 --description "backup"'],
    explain: 'EBS 스냅샷은 S3 에 증분 저장되며 볼륨이 사용 중이어도 만들 수 있습니다. 다만 파일시스템 정합성을 위해 DB 는 잠시 쓰기를 멈추거나(`fsfreeze`) 애플리케이션 레벨 백업과 병행합니다.',
    example: '`aws ec2 describe-snapshots --owner-ids self --query "Snapshots[?VolumeId==\'vol-0def456\']"` 로 특정 볼륨의 스냅샷 이력을 조회합니다.' },

  { diff: 'normal', type: 'short', q: 'EBS 볼륨 `vol-0def456` 의 크기를 200GiB 로 온라인 확장하는 명령어는?', answer: 'aws ec2 modify-volume --volume-id vol-0def456 --size 200', accept: ['aws ec2 modify-volume --size 200 --volume-id vol-0def456'],
    explain: 'EBS 는 인스턴스 실행 중에도 크기·타입·IOPS 를 늘릴 수 있습니다(줄이기는 불가). 확장 후 OS 에서 `growpart` → `resize2fs`/`xfs_growfs` 를 해야 실제 공간이 늘어나며, 한 번 수정하면 6시간 동안 다시 수정할 수 없습니다.',
    example: '`aws ec2 describe-volumes-modifications --volume-ids vol-0def456` 로 `optimizing` → `completed` 진행 상태를 확인한 뒤 OS 작업을 진행합니다.' },

  { diff: 'normal', type: 'short', q: 'EC2 인스턴스 `i-0abc123` 의 상태 검사(system/instance status check) 결과를 확인하는 명령어는?', answer: 'aws ec2 describe-instance-status --instance-ids i-0abc123', accept: ['aws ec2 describe-instance-status --instance-id i-0abc123', 'aws ec2 describe-instance-status --instance-ids i-0abc123 --include-all-instances'],
    explain: '`SystemStatus` 는 AWS 호스트 쪽(하드웨어·네트워크), `InstanceStatus` 는 OS 쪽(커널 패닉, 네트워크 설정) 문제를 뜻합니다. 시스템 상태 실패는 stop/start 로 다른 호스트로 옮기면 해결되는 경우가 많습니다.',
    example: '기본은 running 인스턴스만 나오므로, 중지된 것까지 보려면 `--include-all-instances` 를 붙입니다.' },

  { diff: 'hard', type: 'short', q: '인스턴스 `i-0abc123` 의 시스템 로그(직렬 콘솔 출력)를 디코딩해 텍스트로 보는 명령어는?', answer: 'aws ec2 get-console-output --instance-id i-0abc123 --output text', accept: ['aws ec2 get-console-output --instance-id i-0abc123 --query Output --output text', 'aws ec2 get-console-output --instance-id i-0abc123 --latest --output text'],
    explain: 'SSH 가 안 되는 인스턴스의 부팅 로그·커널 패닉·fstab 오류를 볼 수 있는 유일한 통로입니다. `--output text` 가 없으면 JSON 안에 이스케이프된 문자열로 나와 읽기 어렵습니다.',
    example: '"Give root password for maintenance" 가 보이면 fstab 오류로 emergency 모드에 빠진 것입니다. 볼륨을 떼어 다른 인스턴스에 붙여 fstab 을 고칩니다.' },

  { diff: 'normal', type: 'short', q: 'S3 버킷 `my-bucket` 의 `logs/` 아래 객체 목록을 **하위 경로까지 재귀적으로**, 사람이 읽기 좋은 크기 단위로 출력하는 명령어는?', answer: 'aws s3 ls s3://my-bucket/logs/ --recursive --human-readable', accept: ['aws s3 ls s3://my-bucket/logs/ --recursive --human-readable --summarize', 'aws s3 ls --recursive --human-readable s3://my-bucket/logs/', 'aws s3 ls s3://my-bucket/logs --recursive --human-readable'],
    explain: '`aws s3 ls` 는 기본적으로 한 단계(prefix)만 보여줍니다. `--recursive` 로 하위 전체를, `--summarize` 로 총 객체 수와 크기를 함께 출력합니다.',
    example: '`--summarize` 로 prefix 별 총 용량을 확인해 라이프사이클 규칙(30일 후 Glacier 이동)을 어디에 걸지 결정합니다.' },

  { diff: 'hard', type: 'short', q: 'S3 버킷 `my-bucket` 의 모든 퍼블릭 액세스를 차단하는 명령어는?', answer: 'aws s3api put-public-access-block --bucket my-bucket --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true', accept: ['aws s3api put-public-access-block --bucket my-bucket --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"'],
    explain: '네 설정이 모두 true 여야 ACL 과 버킷 정책 어느 쪽으로도 공개가 불가능합니다. 2023년 이후 새 버킷은 기본으로 켜져 있지만, 오래된 버킷은 명시적으로 걸어야 합니다.',
    example: '`aws s3api get-public-access-block --bucket my-bucket` 으로 현재 상태를 감사하고, 계정 전체는 `aws s3control put-public-access-block --account-id ...` 로 겁니다.' },

  { diff: 'hard', type: 'short', q: '버전 관리가 켜진 S3 버킷에서 실수로 삭제한 객체 `report.pdf` 의 **삭제 마커를 지워 복구**하려 합니다. 삭제 마커의 버전 ID 를 포함해 객체 버전 목록을 조회하는 명령어는?', answer: 'aws s3api list-object-versions --bucket my-bucket --prefix report.pdf', accept: ['aws s3api list-object-versions --bucket my-bucket --prefix report.pdf --query DeleteMarkers', 'aws s3api list-object-versions --bucket my-bucket --prefix report.pdf --query "DeleteMarkers[]"'],
    explain: '버전 관리 버킷에서 삭제는 실제 삭제가 아니라 "삭제 마커" 버전을 추가하는 것입니다. `list-object-versions` 로 마커의 `VersionId` 를 찾아 `aws s3api delete-object --bucket my-bucket --key report.pdf --version-id <마커ID>` 로 마커를 지우면 이전 버전이 다시 보입니다.',
    example: '랜섬웨어나 오작동 스크립트가 객체를 대량 삭제해도 버전 관리 + MFA Delete 가 켜져 있으면 이 방법으로 되돌릴 수 있습니다.' },

  { diff: 'normal', type: 'short', q: 'IAM 역할 `AppRole` 에 AWS 관리형 정책 `AmazonS3ReadOnlyAccess` 를 연결하는 명령어는?', answer: 'aws iam attach-role-policy --role-name AppRole --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess', accept: ['aws iam attach-role-policy --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess --role-name AppRole'],
    explain: 'AWS 관리형 정책의 ARN 은 계정 ID 자리에 `aws` 가 들어갑니다. 고객 관리형 정책은 `arn:aws:iam::123456789012:policy/이름` 입니다. 역할에 연결된 정책은 `list-attached-role-policies` 로 봅니다.',
    example: 'EC2 에 액세스 키를 넣지 말고 인스턴스 프로파일로 역할을 붙이는 것이 원칙입니다. 이 명령으로 역할에 필요한 최소 권한만 추가합니다.' },

  { diff: 'hard', type: 'short', q: 'IAM 사용자 `deploy-bot` 의 액세스 키 목록과 생성일을 조회해 오래된 키를 찾는 명령어는?', answer: 'aws iam list-access-keys --user-name deploy-bot', accept: ['aws iam list-access-keys --user-name deploy-bot --query AccessKeyMetadata', 'aws iam list-access-keys --user-name deploy-bot --output table'],
    explain: '키 교체(rotation)는 새 키 생성 → 애플리케이션 교체 → 옛 키 `update-access-key --status Inactive` → 문제 없으면 `delete-access-key` 순으로 진행합니다. 마지막 사용 시각은 `get-access-key-last-used` 로 봅니다.',
    example: '`aws iam generate-credential-report` 와 함께 90일 넘은 키를 정기적으로 찾아 교체하는 것이 보안 감사의 기본 항목입니다.' },

  { diff: 'normal', type: 'short', q: '보안 그룹 `sg-0abc123` 의 인바운드 규칙 중 **0.0.0.0/0 에서 22번 포트**를 허용하는 규칙을 제거하는 명령어는?', answer: 'aws ec2 revoke-security-group-ingress --group-id sg-0abc123 --protocol tcp --port 22 --cidr 0.0.0.0/0', accept: ['aws ec2 revoke-security-group-ingress --group-id sg-0abc123 --cidr 0.0.0.0/0 --port 22 --protocol tcp', 'aws ec2 revoke-security-group-ingress --group-id sg-0abc123 --ip-permissions IpProtocol=tcp,FromPort=22,ToPort=22,IpRanges=[{CidrIp=0.0.0.0/0}]'],
    explain: '`authorize` 의 반대가 `revoke` 이며 인자는 같습니다. 규칙은 프로토콜·포트·CIDR 이 정확히 일치해야 지워지므로, 먼저 `describe-security-groups` 로 현재 규칙을 확인합니다.',
    example: 'SSH 를 전 세계에 열어 둔 보안 그룹은 Security Hub 와 Trusted Advisor 가 경고합니다. 회사 IP 로 제한하거나 SSM Session Manager 로 대체합니다.' },

  { diff: 'hard', type: 'short', q: 'VPC `vpc-0abc123` 안의 라우트 테이블 목록과 각 라우트를 조회하는 명령어는?', answer: 'aws ec2 describe-route-tables --filters Name=vpc-id,Values=vpc-0abc123', accept: ['aws ec2 describe-route-tables --filters "Name=vpc-id,Values=vpc-0abc123"', 'aws ec2 describe-route-tables --filter Name=vpc-id,Values=vpc-0abc123'],
    explain: '프라이빗 서브넷의 인스턴스가 인터넷에 못 나가면 그 서브넷이 연결된 라우트 테이블에 `0.0.0.0/0 → nat-xxx` 가 있는지 봅니다. 서브넷이 명시적으로 연결되지 않으면 VPC 의 main 라우트 테이블을 따릅니다.',
    example: '`--query "RouteTables[].{id:RouteTableId,routes:Routes[].[DestinationCidrBlock,GatewayId,NatGatewayId]}"` 로 필요한 열만 뽑아 봅니다.' },

  { diff: 'hard', type: 'short', q: 'VPC 의 트래픽이 어디서 막히는지 추적하기 위해 **VPC 흐름 로그(Flow Logs)** 를 CloudWatch Logs 로 생성하는 명령어는? (VPC: vpc-0abc123, 로그 그룹: vpc-flow, 역할 ARN: arn:aws:iam::123456789012:role/FlowLogRole)', answer: 'aws ec2 create-flow-logs --resource-type VPC --resource-ids vpc-0abc123 --traffic-type ALL --log-group-name vpc-flow --deliver-logs-permission-arn arn:aws:iam::123456789012:role/FlowLogRole', accept: ['aws ec2 create-flow-logs --resource-ids vpc-0abc123 --resource-type VPC --traffic-type ALL --log-group-name vpc-flow --deliver-logs-permission-arn arn:aws:iam::123456789012:role/FlowLogRole', 'aws ec2 create-flow-logs --resource-type VPC --resource-ids vpc-0abc123 --traffic-type REJECT --log-group-name vpc-flow --deliver-logs-permission-arn arn:aws:iam::123456789012:role/FlowLogRole'],
    explain: 'Flow Logs 는 ENI 를 지나는 트래픽의 5-튜플과 ACCEPT/REJECT 를 기록합니다. 보안 그룹이나 NACL 어느 쪽에서 막혔는지 직접 알려주진 않지만, REJECT 기록이 있으면 인스턴스까지는 도달했다는 뜻이라 범위를 크게 좁혀 줍니다.',
    example: '`--traffic-type REJECT` 로 거부만 기록하면 비용을 아끼면서 "왜 연결이 안 되지" 를 빠르게 찾을 수 있습니다.' },

  { diff: 'normal', type: 'short', q: 'CloudWatch 에서 인스턴스 `i-0abc123` 의 최근 1시간 평균 CPU 사용률을 5분 단위로 조회하는 명령어는? (시작·종료 시각은 `--start-time`, `--end-time` 으로 준다고 가정)', answer: 'aws cloudwatch get-metric-statistics --namespace AWS/EC2 --metric-name CPUUtilization --dimensions Name=InstanceId,Value=i-0abc123 --statistics Average --period 300 --start-time 2024-06-01T09:00:00Z --end-time 2024-06-01T10:00:00Z', accept: ['aws cloudwatch get-metric-statistics --namespace AWS/EC2 --metric-name CPUUtilization --dimensions Name=InstanceId,Value=i-0abc123 --period 300 --statistics Average --start-time 2024-06-01T09:00:00Z --end-time 2024-06-01T10:00:00Z', 'aws cloudwatch get-metric-statistics --metric-name CPUUtilization --namespace AWS/EC2 --dimensions Name=InstanceId,Value=i-0abc123 --statistics Average --period 300 --start-time 2024-06-01T09:00:00Z --end-time 2024-06-01T10:00:00Z'],
    explain: '`--namespace`, `--metric-name`, `--dimensions`, `--statistics`, `--period` 다섯 가지가 필수 골격입니다. 기본 모니터링은 5분(300초) 해상도이고, 상세 모니터링을 켜야 1분 단위가 나옵니다.',
    example: '메모리 사용률은 기본 지표에 없으므로 CloudWatch Agent 를 설치해야 `CWAgent` 네임스페이스에 `mem_used_percent` 가 생깁니다.' },

  { diff: 'hard', type: 'short', q: 'CLI 에서 `--profile` 을 매번 붙이지 않도록, 현재 셸 세션의 기본 프로파일을 `prod` 로 지정하는 환경변수 설정은?', answer: 'export AWS_PROFILE=prod', accept: ['AWS_PROFILE=prod', 'set AWS_PROFILE=prod', '$env:AWS_PROFILE="prod"'],
    explain: '`AWS_PROFILE` 은 `~/.aws/config` 와 `~/.aws/credentials` 의 `[profile prod]` 섹션을 선택합니다. 우선순위는 명령줄 `--profile` > 환경변수 > 기본 프로파일이며, `AWS_ACCESS_KEY_ID` 같은 직접 자격 증명 환경변수가 있으면 그것이 프로파일보다 우선합니다.',
    example: '`aws sts get-caller-identity` 로 지금 어느 계정·역할로 실행 중인지 확인한 뒤 위험한 명령을 실행하는 습관이 사고를 막습니다.' },

  /* ---------------- 과제형 ---------------- */
  { diff: 'normal', type: 'task', q: 'EC2 의 루트 EBS 볼륨이 가득 찼습니다. 볼륨을 온라인으로 확장하고 OS 에 반영하세요.',
    scene: '# 상황: 인스턴스 i-0abc123, 루트 볼륨 vol-0def456 (현재 20GiB, ext4, NVMe 장치 /dev/nvme0n1p1)',
    steps: [
      { hint: '# 1. [로컬/CLI] 볼륨을 50GiB 로 수정', answer: 'aws ec2 modify-volume --volume-id vol-0def456 --size 50', accept: ['aws ec2 modify-volume --size 50 --volume-id vol-0def456'] },
      { hint: '# 2. [로컬/CLI] 수정 진행 상태(optimizing/completed) 확인', answer: 'aws ec2 describe-volumes-modifications --volume-ids vol-0def456', accept: ['aws ec2 describe-volumes-modifications --volume-id vol-0def456', 'aws ec2 describe-volumes-modifications --volume-ids vol-0def456 --query "VolumesModifications[].ModificationState"'] },
      { hint: '# 3. [인스턴스 SSH] 1번 파티션을 디스크 끝까지 확장', answer: 'growpart /dev/nvme0n1 1', accept: ['sudo growpart /dev/nvme0n1 1'] },
      { hint: '# 4. [인스턴스 SSH] ext4 파일시스템 확장', answer: 'resize2fs /dev/nvme0n1p1', accept: ['sudo resize2fs /dev/nvme0n1p1'] },
    ],
    explain: 'AWS 쪽 크기 변경과 OS 쪽 파티션·파일시스템 확장은 별개 작업입니다. `lsblk` 에서 디스크는 50G 인데 파티션이 20G 로 보이면 3단계, 파티션은 50G 인데 `df -h` 가 20G 면 4단계가 빠진 것입니다.',
    example: 'XFS 루트(Amazon Linux 2023 기본)라면 4단계가 `xfs_growfs /` 로 바뀝니다. `df -hT` 로 파일시스템 종류를 먼저 확인합니다.' },

  /* ---------------- 서술형 ---------------- */
  { diff: 'hard', type: 'essay', q: '프라이빗 서브넷의 EC2 인스턴스가 인터넷(예: 패키지 저장소)에 접속하지 못합니다. 원인을 어떤 순서로 확인하겠습니까?',
    keywords: [['라우트 테이블', 'route table', '0.0.0.0/0'], ['NAT 게이트웨이', 'NAT Gateway', 'NAT 인스턴스'], ['퍼블릭 서브넷', 'IGW', '인터넷 게이트웨이'], ['보안 그룹', 'security group', '아웃바운드', 'egress'], ['NACL', '네트워크 ACL', '임시 포트', 'ephemeral'], ['DNS', 'resolv', 'enableDnsSupport', 'Route 53'], ['Flow Logs', '흐름 로그'], ['VPC 엔드포인트', 'endpoint']],
    minKeywords: 4,
    model: '먼저 인스턴스가 속한 서브넷의 라우트 테이블에 `0.0.0.0/0` 이 NAT 게이트웨이로 향하는 라우트가 있는지 확인합니다. 없거나 `blackhole` 이면 NAT 게이트웨이가 삭제됐거나 다른 VPC 를 가리키는 것입니다. NAT 게이트웨이는 퍼블릭 서브넷에 있어야 하고, 그 서브넷의 라우트 테이블은 `0.0.0.0/0 → igw` 여야 하며 Elastic IP 가 붙어 있어야 합니다. 다음으로 인스턴스의 보안 그룹 아웃바운드가 443/80 을 허용하는지, 서브넷 NACL 이 아웃바운드 443 과 인바운드 임시 포트(1024-65535)를 허용하는지 봅니다. NACL 은 상태 비저장이라 응답 트래픽도 명시적으로 열어야 합니다. 그래도 안 되면 `dig` 로 DNS 해석이 되는지(VPC 의 `enableDnsSupport`, resolv.conf) 확인하고, VPC Flow Logs 에서 REJECT 기록을 보아 어느 단계에서 막히는지 좁힙니다. S3 나 ECR 만 필요하다면 NAT 없이 VPC 엔드포인트로 해결하는 편이 비용도 적습니다.',
    explain: '"NAT 가 있는데 안 된다" 의 대부분은 NAT 가 프라이빗 서브넷에 만들어졌거나, NACL 의 임시 포트 인바운드가 막힌 경우입니다. 보안 그룹은 상태 저장이라 아웃바운드만 열면 되지만 NACL 은 양방향을 다 열어야 합니다.',
    example: '`curl -m 5 https://example.com` 이 타임아웃(라우팅/방화벽)인지 `Could not resolve host`(DNS)인지에 따라 확인 순서가 갈립니다.' },
);
