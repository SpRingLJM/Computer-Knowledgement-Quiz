/* OS · Linux — 시스템 관리 심화 (LVM · PXE · 부팅 · 디스크/RAID · SELinux · 커널)
 * 타이핑형(short / task / essay)만 수록. 채점은 quiz.js 의 norm() 정규화를 전제로 accept 를 넉넉히 둔다. */
window.QUIZ_BANK = window.QUIZ_BANK || {};
window.QUIZ_BANK.linux = window.QUIZ_BANK.linux || [];
window.QUIZ_BANK.linux.push(
  /* ---------------- LVM ---------------- */
  { diff: 'easy', type: 'short', q: '새 디스크 `/dev/sdb` 를 LVM 물리 볼륨(PV)으로 초기화하는 명령어는?', answer: 'pvcreate /dev/sdb', accept: ['sudo pvcreate /dev/sdb', 'pvcreate -y /dev/sdb'],
    explain: 'LVM 은 PV(물리 볼륨) → VG(볼륨 그룹) → LV(논리 볼륨) 3계층입니다. `pvcreate` 는 디스크나 파티션 앞부분에 LVM 메타데이터를 써서 VG 에 편입할 수 있게 만듭니다.',
    example: '디스크 통째로 PV 를 만들면 파티션 테이블이 없어 다른 OS 도구가 "빈 디스크" 로 오인할 수 있습니다. 운영에서는 파티션(`/dev/sdb1`, 타입 8e/LVM)을 만든 뒤 PV 로 쓰는 경우가 많습니다.' },

  { diff: 'easy', type: 'short', q: 'PV `/dev/sdb` 로 볼륨 그룹 `vg_data` 를 생성하는 명령어는?', answer: 'vgcreate vg_data /dev/sdb', accept: ['sudo vgcreate vg_data /dev/sdb'],
    explain: 'VG 는 여러 PV 를 하나의 저장 공간 풀로 묶습니다. 이후 LV 는 이 풀에서 잘라 쓰므로, 디스크 경계와 무관하게 볼륨 크기를 정할 수 있습니다.',
    example: '`vgcreate vg_data /dev/sdb /dev/sdc` 처럼 PV 를 여러 개 넣어 처음부터 두 디스크를 합친 VG 를 만들 수 있습니다.' },

  { diff: 'normal', type: 'short', q: '볼륨 그룹 `vg_data` 에서 10GiB 크기의 논리 볼륨 `lv_app` 을 만드는 명령어는?', answer: 'lvcreate -L 10G -n lv_app vg_data', accept: ['lvcreate -n lv_app -L 10G vg_data', 'lvcreate --size 10G --name lv_app vg_data', 'lvcreate -L 10g -n lv_app vg_data', 'sudo lvcreate -L 10G -n lv_app vg_data', 'lvcreate -L10G -n lv_app vg_data'],
    explain: '`-L` 은 절대 크기, `-n` 은 LV 이름입니다. 생성된 장치는 `/dev/vg_data/lv_app` 과 `/dev/mapper/vg_data-lv_app` 두 경로로 접근합니다.',
    example: 'PE(physical extent) 단위(기본 4MiB)로 잘리므로 요청 크기가 살짝 올림될 수 있습니다. `lvs` 로 실제 크기를 확인합니다.' },

  { diff: 'normal', type: 'short', q: '볼륨 그룹 `vg_data` 의 남은 공간을 **전부** 사용하는 논리 볼륨 `lv_app` 을 만드는 명령어는?', answer: 'lvcreate -l 100%FREE -n lv_app vg_data', accept: ['lvcreate -n lv_app -l 100%FREE vg_data', 'lvcreate --extents 100%FREE --name lv_app vg_data', 'sudo lvcreate -l 100%FREE -n lv_app vg_data'],
    explain: '`-L` 은 바이트 단위 크기, 소문자 `-l` 은 extent 수 또는 비율(`%FREE`, `%VG`, `%PVS`)입니다. 남은 공간을 딱 맞게 쓰려면 `-l 100%FREE` 가 정답입니다.',
    example: '`-L` 로 남은 용량을 직접 계산해 넣으면 PE 반올림 때문에 "insufficient free space" 로 실패하는 일이 잦습니다.' },

  { diff: 'normal', type: 'short', q: '볼륨 그룹 `vg_data` 에 새 PV `/dev/sdc` 를 추가해 용량을 늘리는 명령어는?', answer: 'vgextend vg_data /dev/sdc', accept: ['sudo vgextend vg_data /dev/sdc'],
    explain: '`vgextend` 는 VG 에 PV 를 편입시킵니다. `/dev/sdc` 가 아직 PV 가 아니면 최신 LVM 은 자동으로 `pvcreate` 를 수행합니다.',
    example: 'VM 에 디스크를 하나 더 붙인 뒤 `vgextend` → `lvextend -r` 두 단계로 서비스 중단 없이 `/data` 를 키우는 것이 표준 절차입니다.' },

  { diff: 'normal', type: 'short', q: '논리 볼륨 `/dev/vg_data/lv_app` 을 5GiB 늘리면서 **파일시스템까지 함께** 확장하는 명령어는?', answer: 'lvextend -r -L +5G /dev/vg_data/lv_app', accept: ['lvextend -L +5G -r /dev/vg_data/lv_app', 'lvextend --resizefs -L +5G /dev/vg_data/lv_app', 'lvextend -r -L +5g /dev/vg_data/lv_app', 'lvextend -r -L +5G /dev/mapper/vg_data-lv_app', 'sudo lvextend -r -L +5G /dev/vg_data/lv_app', 'lvextend -rL +5G /dev/vg_data/lv_app'],
    explain: '`-r`(`--resizefs`) 이 없으면 LV 만 커지고 파일시스템은 그대로라 `df -h` 에 변화가 없습니다. `+5G` 처럼 `+` 를 붙여야 "5G 추가" 이고, `+` 없이 `5G` 면 "총 5G 로" 가 됩니다.',
    example: 'ext4 와 XFS 모두 마운트된 상태에서 온라인 확장이 가능합니다. 단 XFS 는 축소가 불가능하므로 처음부터 크게 잡지 않는 것이 좋습니다.' },

  { diff: 'easy', type: 'short', q: '논리 볼륨 목록을 크기·소속 VG 와 함께 요약해 보여주는 명령어는?', answer: 'lvs', accept: ['sudo lvs', 'lvdisplay', 'lvs -a', 'lvs -o+devices'],
    explain: '`pvs` / `vgs` / `lvs` 는 각 계층을 표 형태로 요약합니다. `pvdisplay` / `vgdisplay` / `lvdisplay` 는 같은 정보를 길게 출력합니다.',
    example: '`vgs` 의 `VFree` 열이 0 이면 `lvextend` 가 실패하므로, 확장 전에 항상 `vgs` 로 남은 공간을 확인합니다.' },

  { diff: 'hard', type: 'short', q: '`lvextend` 로 LV 만 늘렸는데 파일시스템이 XFS 이고 `/data` 에 마운트되어 있습니다. 파일시스템을 확장하는 명령어는?', answer: 'xfs_growfs /data', accept: ['sudo xfs_growfs /data', 'xfs_growfs /dev/vg_data/lv_app', 'xfs_growfs /dev/mapper/vg_data-lv_app'],
    explain: 'XFS 는 `xfs_growfs` 에 **마운트 포인트**를 넘기고(장치 경로도 최신 버전은 허용), ext4 는 `resize2fs /dev/장치` 를 씁니다. 파일시스템별로 도구가 다릅니다.',
    example: '`lvextend -r` 을 쓰면 이 단계를 잊을 일이 없습니다. 이미 LV 만 늘린 상황을 뒷수습할 때 이 명령이 필요합니다.' },

  { diff: 'hard', type: 'short', q: 'ext4 파일시스템이 올라간 LV `/dev/vg_data/lv_db` 를 `lvextend` 로 늘린 뒤 파일시스템을 확장하는 명령어는?', answer: 'resize2fs /dev/vg_data/lv_db', accept: ['sudo resize2fs /dev/vg_data/lv_db', 'resize2fs /dev/mapper/vg_data-lv_db'],
    explain: '`resize2fs` 는 크기 인자를 생략하면 장치 크기에 맞춰 확장합니다. 마운트 상태에서 온라인 확장이 가능하며, 축소는 반드시 언마운트 후 `e2fsck -f` 를 거쳐야 합니다.',
    example: '클라우드에서 루트 EBS 볼륨을 키운 뒤 `growpart /dev/nvme0n1 1` → `resize2fs /dev/nvme0n1p1` 순서로 반영합니다.' },

  { diff: 'hard', type: 'short', q: '`/dev/vg_data/lv_app` 의 2GiB 크기 스냅샷 `lv_app_snap` 을 만드는 명령어는?', answer: 'lvcreate -s -L 2G -n lv_app_snap /dev/vg_data/lv_app', accept: ['lvcreate --snapshot -L 2G -n lv_app_snap /dev/vg_data/lv_app', 'lvcreate -L 2G -s -n lv_app_snap /dev/vg_data/lv_app', 'lvcreate -s -n lv_app_snap -L 2G /dev/vg_data/lv_app', 'lvcreate -s -L 2G -n lv_app_snap vg_data/lv_app', 'sudo lvcreate -s -L 2G -n lv_app_snap /dev/vg_data/lv_app'],
    explain: 'LVM 스냅샷은 COW(copy-on-write) 방식이라 원본이 바뀐 블록만 스냅샷 영역에 저장됩니다. 스냅샷 크기는 "스냅샷 유지 동안 원본이 바뀔 양" 만큼이면 되고, 꽉 차면 스냅샷이 무효화됩니다.',
    example: '패키지 업그레이드 전에 스냅샷을 만들고 문제가 생기면 `lvconvert --merge` 로 되돌립니다. 스냅샷을 오래 두면 원본 쓰기 성능이 떨어지므로 작업 후 바로 `lvremove` 합니다.' },

  { diff: 'hard', type: 'short', q: '고장 징후가 있는 PV `/dev/sdb` 의 데이터를 같은 VG 의 다른 PV 로 옮기는 명령어는?', answer: 'pvmove /dev/sdb', accept: ['sudo pvmove /dev/sdb', 'pvmove /dev/sdb /dev/sdc', 'pvmove -v /dev/sdb'],
    explain: '`pvmove` 는 LV 를 온라인 상태로 둔 채 extent 를 다른 PV 로 이동합니다. 완료 후 `vgreduce vg_data /dev/sdb` 로 VG 에서 빼고 `pvremove` 하면 디스크를 안전하게 제거할 수 있습니다.',
    example: '스토리지 교체나 SAN LUN 마이그레이션 시 서비스 중단 없이 디스크를 바꾸는 표준 절차입니다. 이동 중 재부팅되어도 `pvmove` 를 다시 실행하면 이어서 진행합니다.' },

  { diff: 'normal', type: 'short', q: '논리 볼륨 `/dev/vg_data/lv_old` 를 삭제하는 명령어는?', answer: 'lvremove /dev/vg_data/lv_old', accept: ['sudo lvremove /dev/vg_data/lv_old', 'lvremove -f /dev/vg_data/lv_old', 'lvremove vg_data/lv_old', 'lvremove -y /dev/vg_data/lv_old'],
    explain: '마운트된 LV 는 삭제되지 않으므로 먼저 `umount` 하고 `/etc/fstab` 항목도 지워야 합니다. 삭제하면 데이터는 복구할 수 없습니다.',
    example: '`lvremove` 후 `vgs` 의 `VFree` 가 늘어난 것을 확인하고 그 공간을 다른 LV 확장에 씁니다.' },

  /* ---------------- PXE · 자동 설치 ---------------- */
  { diff: 'normal', type: 'short', q: 'PXE 부팅에서 클라이언트가 DHCP 로 받은 주소의 서버에서 부트로더 파일을 내려받을 때 쓰는 프로토콜은?', answer: 'TFTP', accept: ['tftp', 'trivial file transfer protocol', 'tftp (udp 69)', 'udp 69'],
    explain: 'PXE 는 DHCP 로 IP 와 부트 서버·파일명을 받고, TFTP(UDP 69) 로 부트로더를 받습니다. 펌웨어(NIC ROM)에 구현된 아주 단순한 프로토콜이라 인증·암호화가 없습니다.',
    example: '방화벽에서 UDP 67/68(DHCP) 과 UDP 69(TFTP) 가 열려 있어야 하며, TFTP 는 데이터 포트를 동적으로 쓰므로 conntrack 헬퍼가 없으면 부팅이 멈춥니다.' },

  { diff: 'normal', type: 'short', q: 'ISC DHCP 서버 설정(`dhcpd.conf`)에서 PXE 클라이언트에게 **TFTP 서버 주소**를 알려주는 지시자는?', answer: 'next-server', accept: ['next-server 10.0.0.5', 'next-server;'],
    explain: '`next-server` 는 DHCP 헤더의 siaddr 필드에 실리는 부트 서버 IP 이고, `filename` 은 받아올 부트 파일명입니다. 두 값이 있어야 클라이언트가 어디서 무엇을 받을지 알 수 있습니다.',
    example: 'DHCP 서버와 TFTP 서버가 같은 호스트라도 `next-server` 는 명시하는 편이 안전합니다. 일부 펌웨어는 값이 비면 DHCP 서버 주소를 쓰지 않고 그냥 실패합니다.' },

  { diff: 'normal', type: 'short', q: 'ISC DHCP 설정에서 PXE 클라이언트가 받아올 **부트 파일명**을 지정하는 지시자는?', answer: 'filename', accept: ['filename pxelinux.0', 'filename;'],
    explain: '`filename "pxelinux.0";` 처럼 씁니다. BIOS 와 UEFI 클라이언트는 필요한 부트로더가 다르므로, 보통 DHCP 옵션 93(client architecture)으로 분기해 파일명을 다르게 줍니다.',
    example: 'dnsmasq 를 쓰면 `dhcp-boot=pxelinux.0,,10.0.0.5` 한 줄로 파일명과 서버를 동시에 지정할 수 있습니다.' },

  { diff: 'hard', type: 'short', q: 'BIOS(레거시) PXE 부팅에서 syslinux 패키지가 제공하는 네트워크 부트로더 파일명은?', answer: 'pxelinux.0', accept: ['pxelinux', 'lpxelinux.0'],
    explain: '`pxelinux.0` 은 TFTP 로 받은 뒤 `pxelinux.cfg/` 아래 설정 파일(UUID → MAC 주소 → IP 16진수(뒷자리부터 줄여 가며) → `default` 순으로 검색)을 읽어 커널과 initrd 를 로드합니다. UEFI 에서는 대신 `grubx64.efi` 나 `shimx64.efi` 를 씁니다.',
    example: '특정 서버만 다른 이미지로 설치하려면 `pxelinux.cfg/01-aa-bb-cc-dd-ee-ff` 처럼 MAC 기반 설정 파일을 만듭니다.' },

  { diff: 'hard', type: 'short', q: 'RHEL/Rocky 8 이상에서 PXE 부팅 커널 인자로 Kickstart 파일 위치를 지정하는 파라미터 이름은?', answer: 'inst.ks', accept: ['inst.ks='],
    explain: '`inst.ks=http://10.0.0.5/ks/web.cfg` 처럼 씁니다. 설치 프로그램(Anaconda)이 이 파일을 읽어 파티션·패키지·계정 설정을 무인으로 진행합니다. 예전 `ks=` 표기는 RHEL 8 에서 폐기 예정(deprecated)이었고 RHEL 9 부터는 지원이 제거되었으므로 `inst.ks=` 를 써야 합니다.',
    example: '함께 자주 쓰는 인자로 `inst.repo=`(설치 소스), `ip=dhcp`, `inst.text`(텍스트 모드) 가 있습니다. Ubuntu 는 Kickstart 대신 autoinstall(cloud-init) 을 씁니다.' },

  { diff: 'hard', type: 'short', q: 'RHEL 계열에서 설치 완료된 시스템의 설정을 재현할 수 있게 Anaconda 가 자동 생성해 두는 Kickstart 파일의 경로는?', answer: '/root/anaconda-ks.cfg', accept: ['anaconda-ks.cfg', '~/anaconda-ks.cfg'],
    explain: '수동 설치를 한 번 하면 그 선택이 `/root/anaconda-ks.cfg` 에 남습니다. 이 파일을 다듬어 PXE 서버에 올리면 같은 구성의 서버를 반복 생산할 수 있습니다.',
    example: '`ksvalidator anaconda-ks.cfg` 로 문법을 검사한 뒤 배포합니다. 파일 안에 root 비밀번호 해시가 들어 있으므로 저장소에 올릴 때 주의해야 합니다.' },

  /* ---------------- 부팅 · systemd ---------------- */
  { diff: 'normal', type: 'short', q: 'Debian/Ubuntu 에서 `/etc/default/grub` 을 수정한 뒤 GRUB 설정 파일을 다시 생성하는 명령어는?', answer: 'update-grub', accept: ['sudo update-grub', 'grub-mkconfig -o /boot/grub/grub.cfg', 'sudo grub-mkconfig -o /boot/grub/grub.cfg'],
    explain: '`/boot/grub/grub.cfg` 는 직접 편집하지 않고 `/etc/default/grub` 과 `/etc/grub.d/` 로부터 생성합니다. `update-grub` 은 `grub-mkconfig -o /boot/grub/grub.cfg` 의 래퍼이고, RHEL 계열은 `grub2-mkconfig` 를 씁니다.',
    example: '커널 인자로 `net.ifnames=0`(인터페이스 이름 eth0 고정) 이나 `cgroup_enable=memory` 를 추가할 때 `GRUB_CMDLINE_LINUX` 를 고치고 이 명령을 실행합니다.' },

  { diff: 'normal', type: 'short', q: '서버가 GUI 없이 텍스트 모드(다중 사용자)로 부팅되도록 기본 타겟을 바꾸는 명령어는?', answer: 'systemctl set-default multi-user.target', accept: ['sudo systemctl set-default multi-user.target', 'systemctl set-default multi-user'],
    explain: 'systemd 타겟은 SysV 런레벨을 대체합니다. `multi-user.target` 이 런레벨 3, `graphical.target` 이 5 에 해당하며, `systemctl get-default` 로 현재 값을 확인합니다.',
    example: 'GUI 가 깔린 서버는 메모리를 수백 MB 낭비합니다. 원격 관리만 한다면 이 명령으로 텍스트 모드로 돌리고 필요할 때 `systemctl isolate graphical.target` 으로 잠깐 띄웁니다.' },

  { diff: 'normal', type: 'short', q: '부팅이 느릴 때, 각 유닛이 기동에 걸린 시간을 오래 걸린 순서로 보여주는 명령어는?', answer: 'systemd-analyze blame', accept: [],
    explain: '`systemd-analyze` 는 커널·initrd·userspace 총 소요 시간을, `blame` 은 유닛별 시간을, `critical-chain` 은 의존성 사슬에서 어느 유닛이 병목인지 보여줍니다.',
    example: '`NetworkManager-wait-online.service` 나 `cloud-init` 이 수십 초를 잡아먹는 경우가 많고, 필요 없으면 `systemctl disable` 로 부팅을 크게 줄일 수 있습니다.' },

  { diff: 'hard', type: 'short', q: 'RHEL 계열에서 커널 모듈이나 드라이버 설정을 바꾼 뒤 현재 커널의 initramfs 를 강제로 다시 만드는 명령어는?', answer: 'dracut -f', accept: ['dracut --force', 'sudo dracut -f', 'dracut -f /boot/initramfs-$(uname -r).img $(uname -r)'],
    explain: 'initramfs 는 루트 파일시스템을 마운트하기 전 필요한 모듈(스토리지 드라이버, LVM, multipath, 암호화 등)을 담은 임시 루트입니다. 루트 디스크 관련 설정을 바꾸고 재생성하지 않으면 부팅 시 "unable to find root device" 로 멈춥니다. Debian 계열은 `update-initramfs -u` 입니다.',
    example: '멀티패스나 iSCSI 루트, 새 RAID 컨트롤러 드라이버를 추가했다면 반드시 `dracut -f` 후 재부팅합니다.' },

  { diff: 'normal', type: 'short', q: '현재 실행 중인 커널이 부팅 시 받은 커널 명령줄(파라미터)을 확인하는 명령어는?', answer: 'cat /proc/cmdline', accept: ['/proc/cmdline', 'sudo cat /proc/cmdline'],
    explain: '`/proc/cmdline` 에는 GRUB 이 넘긴 `root=`, `ro`, `quiet`, `crashkernel=` 같은 인자가 그대로 들어 있습니다. GRUB 설정을 고쳤는데 반영이 안 됐는지 확인할 때 가장 먼저 봅니다.',
    example: '`grep -q selinux=0 /proc/cmdline` 으로 SELinux 가 커널 인자로 꺼져 있는지 스크립트에서 판단할 수 있습니다.' },

  { diff: 'normal', type: 'short', q: '**직전 부팅** 세션의 systemd 저널 로그를 보는 명령어는?', answer: 'journalctl -b -1', accept: ['journalctl -b-1', 'journalctl --boot=-1', 'sudo journalctl -b -1'],
    explain: '`-b` 는 현재 부팅, `-b -1` 은 바로 이전 부팅입니다. 갑자기 재부팅된 원인을 찾을 때 마지막 순간의 로그가 여기에 있습니다. 단, 저널이 영구 저장(persistent) 모드여야 이전 부팅 로그가 남습니다.',
    example: '`journalctl --list-boots` 로 저장된 부팅 목록을 확인하고, `journalctl -b -1 -p err` 로 에러만 추립니다.' },

  { diff: 'hard', type: 'short', q: 'journald 로그를 재부팅 후에도 유지하려면 `/etc/systemd/journald.conf` 에서 어떤 키를 `persistent` 로 설정해야 하나요?', answer: 'Storage', accept: ['Storage=persistent', 'storage=persistent'],
    explain: '기본값 `auto` 는 `/var/log/journal` 디렉터리가 있을 때만 디스크에 저장하고, 없으면 `/run/log/journal`(메모리)에만 써서 재부팅하면 사라집니다. `Storage=persistent` 는 디렉터리를 만들어서라도 디스크에 남깁니다.',
    example: '`mkdir -p /var/log/journal && systemctl restart systemd-journald` 만으로도 auto 모드에서 영구 저장이 시작됩니다. `SystemMaxUse=1G` 로 용량 상한을 함께 잡습니다.' },

  { diff: 'hard', type: 'short', q: 'root 비밀번호를 잊어 복구 모드로 들어가려 합니다. GRUB 에서 커널 라인 끝에 추가해 systemd 대신 initramfs 셸로 떨어지게 하는 인자는?', answer: 'rd.break', accept: ['rd.break enforcing=0'],
    explain: '`rd.break` 는 initramfs 단계에서 멈춰 셸을 줍니다. 루트가 `/sysroot` 에 읽기 전용으로 마운트되므로 `mount -o remount,rw /sysroot` → `chroot /sysroot` → `passwd` 순으로 진행하고, SELinux 를 쓰는 시스템은 `touch /.autorelabel` 을 잊으면 재부팅 후 로그인이 안 됩니다. `systemd.unit=rescue.target`·`emergency.target` 은 root 비밀번호를 물어보므로 잊은 경우엔 소용없고, `init=/bin/bash` 는 initramfs 가 아니라 실제 루트에서 셸을 띄우는 다른 방법입니다.',
    example: '클라우드 VM 은 콘솔 접근이 제한적이라 이 방법 대신 디스크를 떼어 다른 인스턴스에 붙여 `/etc/shadow` 를 고치는 방식도 씁니다.' },

  { diff: 'normal', type: 'short', q: '실패(failed) 상태인 systemd 유닛만 나열하는 명령어는?', answer: 'systemctl --failed', accept: ['systemctl list-units --failed', 'systemctl list-units --state=failed', 'systemctl list-units --state failed', 'sudo systemctl --failed'],
    explain: '부팅 직후나 장애 점검 시 가장 먼저 보는 명령입니다. 실패한 유닛이 있으면 `systemctl status 유닛` 과 `journalctl -u 유닛` 으로 원인을 봅니다.',
    example: '`systemctl reset-failed` 로 실패 카운터를 초기화하면 `StartLimitBurst` 에 걸려 "start request repeated too quickly" 로 안 뜨던 서비스를 다시 시작할 수 있습니다.' },

  { diff: 'easy', type: 'short', q: '서비스 `nginx` 를 부팅 시 자동 시작하도록 등록하면서 **지금 바로** 시작도 하는 명령어는?', answer: 'systemctl enable --now nginx', accept: ['sudo systemctl enable --now nginx', 'systemctl enable --now nginx.service', 'systemctl enable nginx && systemctl start nginx', 'systemctl --now enable nginx'],
    explain: '`enable` 은 심볼릭 링크를 만들어 부팅 시 시작하도록 등록만 하고 지금 시작하지는 않습니다. `--now` 를 붙이면 `start` 까지 한 번에 처리합니다. 반대는 `disable --now` 입니다.',
    example: '설치 스크립트에서 `systemctl start` 만 하고 `enable` 을 빼먹으면 재부팅 후 서비스가 안 올라옵니다. 점검 시 `systemctl is-enabled nginx` 로 확인합니다.' },

  /* ---------------- 디스크 · 파일시스템 · RAID ---------------- */
  { diff: 'easy', type: 'short', q: '디스크·파티션·LVM 구조를 트리 형태로 보여주는 명령어는?', answer: 'lsblk', accept: ['lsblk -f', 'lsblk -o NAME,SIZE,TYPE,MOUNTPOINT', 'sudo lsblk'],
    explain: '`lsblk` 는 블록 장치와 그 하위(파티션, LVM, RAID)를 계층으로 보여줍니다. `-f` 를 붙이면 파일시스템 종류·UUID·마운트 지점까지 나옵니다. `fdisk -l` 보다 읽기 쉽고 root 권한이 필요 없습니다.',
    example: '디스크를 새로 붙이고 `lsblk` 에 안 보이면 `echo "- - -" > /sys/class/scsi_host/host0/scan` 으로 SCSI 버스 재스캔을 시도합니다.' },

  { diff: 'normal', type: 'short', q: '파티션 `/dev/sdb1` 의 UUID 와 파일시스템 종류를 확인하는 명령어는?', answer: 'blkid /dev/sdb1', accept: ['blkid', 'sudo blkid /dev/sdb1', 'lsblk -f /dev/sdb1', 'lsblk -f', 'lsblk -o name,uuid,fstype /dev/sdb1'],
    explain: '`/etc/fstab` 에는 `/dev/sdb1` 같은 장치명 대신 UUID 를 쓰는 것이 원칙입니다. 디스크 추가·제거로 장치명이 바뀌어도 UUID 는 파일시스템에 저장되어 변하지 않기 때문입니다.',
    example: '`UUID=$(blkid -s UUID -o value /dev/sdb1)` 로 값만 뽑아 fstab 줄을 스크립트로 생성합니다.' },

  { diff: 'normal', type: 'short', q: '2TB 를 넘는 디스크 `/dev/sdb` 에 GPT 파티션 테이블을 만드는 `parted` 명령어는?', answer: 'parted /dev/sdb mklabel gpt', accept: ['parted -s /dev/sdb mklabel gpt', 'sudo parted /dev/sdb mklabel gpt', 'parted --script /dev/sdb mklabel gpt'],
    explain: 'MBR(msdos) 은 2TiB 와 주 파티션 4개 제한이 있어 큰 디스크에는 GPT 를 씁니다. `parted` 는 GPT 를 지원하고 `-s` 로 스크립트에서 비대화식으로 쓸 수 있습니다. `fdisk` 도 최신 버전은 GPT 를 지원합니다.',
    example: '이어서 `parted -s /dev/sdb mkpart primary 0% 100%` 로 전체를 하나의 파티션으로 만들고 `set 1 lvm on` 으로 LVM 플래그를 켭니다.' },

  { diff: 'normal', type: 'short', q: '논리 볼륨 `/dev/vg_data/lv_app` 에 XFS 파일시스템을 만드는 명령어는?', answer: 'mkfs.xfs /dev/vg_data/lv_app', accept: ['mkfs -t xfs /dev/vg_data/lv_app', 'sudo mkfs.xfs /dev/vg_data/lv_app', 'mkfs.xfs /dev/mapper/vg_data-lv_app', 'mkfs.xfs -f /dev/vg_data/lv_app'],
    explain: 'RHEL 계열 기본은 XFS, Debian 계열 기본은 ext4 입니다. XFS 는 대용량·병렬 I/O 에 강하지만 축소가 불가능하고, ext4 는 축소가 가능합니다. 이미 파일시스템이 있으면 `-f` 로 덮어써야 합니다.',
    example: '데이터베이스 볼륨은 XFS 를 많이 쓰고, 나중에 줄일 가능성이 있는 볼륨은 ext4 를 택합니다.' },

  { diff: 'normal', type: 'short', q: '`/etc/fstab` 에 항목을 추가한 뒤, 재부팅 없이 아직 마운트 안 된 항목을 모두 마운트해 **설정 오류를 미리 검증**하는 명령어는?', answer: 'mount -a', accept: ['sudo mount -a', 'mount -av'],
    explain: 'fstab 에 오타가 있으면 다음 부팅에서 emergency 모드로 떨어져 콘솔 없이는 복구가 어렵습니다. 반드시 `mount -a` 로 먼저 확인하고, `findmnt --verify` 는 마운트하지 않고 문법만 검사합니다.',
    example: '클라우드 VM 은 콘솔 접근이 번거로우므로 fstab 수정 후 `mount -a` 확인은 습관으로 만들어야 합니다.' },

  { diff: 'hard', type: 'short', q: '`/etc/fstab` 에서 해당 장치가 없거나 마운트에 실패해도 부팅이 멈추지 않고 계속되게 하는 마운트 옵션은?', answer: 'nofail', accept: ['defaults,nofail', 'nofail,x-systemd.device-timeout=10'],
    explain: '기본 동작은 fstab 의 마운트 하나라도 실패하면 emergency 모드로 진입합니다. 외장 디스크·NFS·선택적 데이터 볼륨에는 `nofail` 을 붙여 루트만 있으면 부팅되게 합니다. `_netdev` 는 네트워크가 올라온 뒤 마운트하라는 별도 옵션입니다.',
    example: '`UUID=... /data xfs defaults,nofail 0 0` 처럼 씁니다. 데이터 디스크를 떼어낸 VM 이 부팅 중 멈추는 사고의 대부분이 이 옵션 하나로 예방됩니다.' },

  { diff: 'normal', type: 'short', q: '`/dev/sdb` 의 파티션 테이블을 바꾼 뒤 재부팅 없이 커널이 새 파티션을 인식하게 하는 명령어는?', answer: 'partprobe /dev/sdb', accept: ['partprobe', 'sudo partprobe /dev/sdb', 'blockdev --rereadpt /dev/sdb'],
    explain: '`fdisk`/`parted` 로 파티션을 만들어도 디스크가 사용 중이면 커널이 테이블을 다시 읽지 못해 `/dev/sdb2` 가 안 생깁니다. `partprobe` 가 커널에 재읽기를 요청합니다.',
    example: '"Re-reading the partition table failed: Device or resource busy" 메시지가 나오면 `partprobe` 를 실행하고, 그래도 안 되면 재부팅이 필요합니다.' },

  { diff: 'hard', type: 'short', q: 'VM 하이퍼바이저에서 `/dev/sdb` 디스크 크기를 늘렸는데 `lsblk` 에 예전 크기가 보입니다. 재부팅 없이 커널이 새 크기를 인식하게 하는 명령어는?', answer: 'echo 1 > /sys/class/block/sdb/device/rescan', accept: ['echo 1 > /sys/block/sdb/device/rescan', 'echo 1 | sudo tee /sys/class/block/sdb/device/rescan', 'rescan-scsi-bus.sh -s'],
    explain: 'SCSI 장치의 sysfs `rescan` 파일에 1 을 쓰면 커널이 장치 용량을 다시 조회합니다. 이후 `growpart` → `pvresize` → `lvextend -r` 순으로 위 계층에 반영합니다.',
    example: 'AWS EBS 는 온라인 확장 후 NVMe 라 자동 인식되지만, VMware/KVM 의 SCSI 디스크는 이 rescan 이 필요한 경우가 많습니다.' },

  { diff: 'hard', type: 'short', q: '디스크 `/dev/sdb` 가 커진 뒤, 1번 파티션을 디스크 끝까지 늘리는 명령어는? (cloud-utils 제공 도구)', answer: 'growpart /dev/sdb 1', accept: ['sudo growpart /dev/sdb 1', 'parted /dev/sdb resizepart 1 100%'],
    explain: '`growpart 디스크 파티션번호` 형식이며 `/dev/sdb1` 처럼 붙여 쓰면 안 됩니다. 파티션 테이블만 고치므로 이어서 `pvresize /dev/sdb1`(LVM) 또는 `resize2fs`/`xfs_growfs`(파일시스템) 가 필요합니다.',
    example: 'EBS 볼륨을 키운 뒤 `growpart /dev/nvme0n1 1 && resize2fs /dev/nvme0n1p1` 이 정석입니다. NVMe 는 파티션에 `p` 가 붙습니다.' },

  { diff: 'hard', type: 'short', q: 'PV 가 올라간 디스크 `/dev/sdb` 자체가 커졌을 때, LVM 이 늘어난 공간을 인식하게 하는 명령어는?', answer: 'pvresize /dev/sdb', accept: ['sudo pvresize /dev/sdb', 'pvresize /dev/sdb1'],
    explain: '`vgextend` 는 새 PV 를 추가할 때 쓰고, 기존 PV 의 크기가 바뀌었을 때는 `pvresize` 입니다. 실행하면 `vgs` 의 `VFree` 가 늘어납니다.',
    example: 'SAN 에서 LUN 을 확장한 경우 `rescan` → (`growpart`) → `pvresize` → `lvextend -r` 4단계로 무중단 확장이 완료됩니다.' },

  { diff: 'hard', type: 'short', q: '`/dev/sdb` 와 `/dev/sdc` 로 소프트웨어 RAID 1(미러) 배열 `/dev/md0` 을 만드는 명령어는?', answer: 'mdadm --create /dev/md0 --level=1 --raid-devices=2 /dev/sdb /dev/sdc', accept: ['mdadm -C /dev/md0 -l 1 -n 2 /dev/sdb /dev/sdc', 'mdadm --create /dev/md0 -l1 -n2 /dev/sdb /dev/sdc', 'mdadm --create /dev/md0 --level=mirror --raid-devices=2 /dev/sdb /dev/sdc', 'sudo mdadm --create /dev/md0 --level=1 --raid-devices=2 /dev/sdb /dev/sdc', 'mdadm --create /dev/md0 --level 1 --raid-devices 2 /dev/sdb /dev/sdc', 'mdadm --create /dev/md0 --raid-devices=2 --level=1 /dev/sdb /dev/sdc', 'mdadm -C /dev/md0 -n 2 -l 1 /dev/sdb /dev/sdc'],
    explain: '`--level`(`-l`) 은 RAID 레벨, `--raid-devices`(`-n`) 는 구성 디스크 수입니다. 생성 직후 초기 동기화가 백그라운드로 진행되며 `/proc/mdstat` 에서 진행률을 봅니다. 재부팅 후에도 배열이 조립되게 `mdadm --detail --scan >> /etc/mdadm.conf` 로 설정을 남겨야 합니다.',
    example: '하드웨어 RAID 컨트롤러가 없는 서버나 클라우드 VM 에서 두 볼륨을 미러링해 단일 디스크 장애를 견디게 할 때 씁니다.' },

  { diff: 'normal', type: 'short', q: '소프트웨어 RAID 배열의 상태와 동기화 진행률을 확인하는 가장 간단한 명령어는?', answer: 'cat /proc/mdstat', accept: ['/proc/mdstat', 'mdadm --detail /dev/md0', 'mdadm -D /dev/md0', 'watch cat /proc/mdstat'],
    explain: '`/proc/mdstat` 는 배열 목록과 `[UU]`(정상) / `[U_]`(디스크 하나 빠짐) 상태, 리빌드 진행률을 보여줍니다. 세부 정보는 `mdadm --detail` 로 봅니다.',
    example: '`[U_]` 가 보이면 `mdadm /dev/md0 --fail /dev/sdc --remove /dev/sdc` 후 새 디스크를 `--add` 하면 자동으로 리빌드가 시작됩니다.' },

  { diff: 'normal', type: 'short', q: '언마운트된 ext4 파티션 `/dev/sdb1` 의 파일시스템 무결성을 검사하고 복구하는 명령어는?', answer: 'fsck.ext4 /dev/sdb1', accept: ['fsck /dev/sdb1', 'e2fsck -f /dev/sdb1', 'e2fsck /dev/sdb1', 'fsck -y /dev/sdb1', 'sudo fsck.ext4 /dev/sdb1', 'e2fsck -fy /dev/sdb1'],
    explain: '마운트된 파일시스템에 `fsck` 를 돌리면 오히려 손상됩니다. 반드시 언마운트하거나 복구 모드에서 실행합니다. XFS 는 `fsck` 가 아무것도 안 하고 `xfs_repair` 를 써야 합니다.',
    example: '부팅 중 "UNEXPECTED INCONSISTENCY; RUN fsck MANUALLY" 가 뜨면 emergency 셸에서 이 명령을 실행한 뒤 재부팅합니다.' },

  { diff: 'hard', type: 'short', q: 'NFS 서버 `nas01` 의 export `/export/data` 를 로컬 `/mnt/data` 에 마운트하는 명령어는?', answer: 'mount -t nfs nas01:/export/data /mnt/data', accept: ['mount nas01:/export/data /mnt/data', 'sudo mount -t nfs nas01:/export/data /mnt/data', 'mount -t nfs4 nas01:/export/data /mnt/data', 'mount -t nfs -o vers=4 nas01:/export/data /mnt/data'],
    explain: 'NFS 는 `서버:/경로` 형식으로 소스를 지정합니다. 클라이언트에 `nfs-utils`(RHEL) 또는 `nfs-common`(Debian) 패키지가 있어야 하며, 서버 측 export 목록은 `showmount -e nas01` 로 확인합니다.',
    example: 'fstab 에는 `nas01:/export/data /mnt/data nfs defaults,_netdev,nofail 0 0` 처럼 `_netdev` 를 붙여 네트워크가 뜬 뒤 마운트되게 합니다.' },

  { diff: 'hard', type: 'short', q: 'iSCSI 타겟 서버 `10.0.0.5` 가 제공하는 타겟(IQN) 목록을 검색(discovery)하는 명령어는?', answer: 'iscsiadm -m discovery -t st -p 10.0.0.5', accept: ['iscsiadm -m discovery -t sendtargets -p 10.0.0.5', 'sudo iscsiadm -m discovery -t st -p 10.0.0.5', 'iscsiadm --mode discovery --type sendtargets --portal 10.0.0.5', 'iscsiadm -m discovery -t st -p 10.0.0.5:3260', 'iscsiadm -m discovery -p 10.0.0.5 -t st'],
    explain: 'iSCSI 는 SCSI 명령을 TCP(기본 3260 포트)로 실어 나르는 블록 스토리지 프로토콜입니다. discovery 로 IQN 을 얻은 뒤 `iscsiadm -m node -T <IQN> -p 10.0.0.5 --login` 하면 `/dev/sdX` 로 디스크가 나타납니다.',
    example: '스토리지 어레이(PowerStore, Unity 등)의 iSCSI LUN 을 리눅스 호스트에 붙일 때 이 절차를 거치고, 다중 경로면 `multipath -ll` 로 경로를 확인합니다.' },

  { diff: 'hard', type: 'short', q: 'SAN 스토리지에 다중 경로로 연결된 LUN 의 경로 상태(active/failed)를 확인하는 명령어는?', answer: 'multipath -ll', accept: ['multipath -l', 'sudo multipath -ll', 'multipathd show paths', 'multipathd -k"show paths"'],
    explain: 'device-mapper-multipath 는 같은 LUN 으로 가는 여러 경로(FC/iSCSI)를 하나의 `/dev/mapper/mpathX` 장치로 묶어 경로 장애를 견디고 부하를 분산합니다. `-ll` 은 현재 경로 상태를 실시간으로 조회합니다.',
    example: 'FC 케이블 하나를 뽑아도 서비스가 유지되는지 검증할 때 `multipath -ll` 에서 해당 경로가 `failed` 로 바뀌고 나머지가 `active` 인지 확인합니다.' },

  { diff: 'normal', type: 'short', q: '디스크 공간은 남았는데 파일 생성이 안 되는 상황에서, 파일시스템별 **inode** 사용률을 확인하는 명령어는?', answer: 'df -i', accept: ['df -ih', 'df --inodes', 'sudo df -i'],
    explain: 'inode 는 파일 메타데이터 슬롯이며 파일시스템 생성 시 개수가 고정됩니다. 작은 파일 수백만 개(세션 파일, 캐시, 메일 큐)가 쌓이면 용량이 남아도 inode 가 고갈되어 "No space left on device" 가 납니다.',
    example: 'inode 고갈 시 `find /var/spool -xdev -type f | wc -l` 처럼 파일 수가 많은 디렉터리를 찾아 정리하거나, XFS 로 재생성(동적 inode) 을 검토합니다.' },

  { diff: 'normal', type: 'short', q: '장치별 디스크 I/O 사용률(`%util`)과 대기 시간(`await`)을 1초 간격으로 확장 출력하는 명령어는?', answer: 'iostat -x 1', accept: ['iostat -xz 1', 'iostat -dx 1', 'iostat -xm 1'],
    explain: '`sysstat` 패키지의 `iostat -x` 는 장치별 `r/s`, `w/s`, `await`(요청당 평균 대기 ms), `%util` 을 보여줍니다. `%util` 이 100% 에 가깝고 `await` 가 수십 ms 이상이면 디스크가 병목입니다.',
    example: 'DB 서버 지연 시 `iostat -x 1` 에서 특정 LV 의 `await` 만 높다면 그 볼륨을 더 빠른 스토리지 티어로 옮기는 근거가 됩니다.' },

  /* ---------------- SELinux ---------------- */
  { diff: 'easy', type: 'short', q: 'SELinux 의 현재 동작 모드(Enforcing / Permissive / Disabled)를 출력하는 명령어는?', answer: 'getenforce', accept: ['sestatus', 'sudo getenforce'],
    explain: '`getenforce` 는 한 단어로, `sestatus` 는 정책 종류와 함께 상세히 출력합니다. Enforcing 은 정책 위반을 차단, Permissive 는 차단하지 않고 로그만 남깁니다.',
    example: '"권한은 맞는데 접근이 안 된다" 는 RHEL 계열 장애의 첫 확인 사항이 `getenforce` 입니다. Enforcing 이면 SELinux 거부 로그를 봅니다.' },

  { diff: 'normal', type: 'short', q: 'SELinux 를 재부팅 없이 **임시로** Permissive 모드로 전환하는 명령어는?', answer: 'setenforce 0', accept: ['setenforce permissive', 'setenforce Permissive', 'sudo setenforce 0'],
    explain: '`setenforce 0` 은 현재 세션에만 적용되고 재부팅하면 `/etc/selinux/config` 의 설정으로 돌아갑니다. 장애 원인이 SELinux 인지 빠르게 분리할 때 쓰고, 확인 후 `setenforce 1` 로 되돌립니다.',
    example: 'Permissive 로 바꿨더니 되면 SELinux 문제입니다. 그때 끄고 끝내지 말고 `ausearch` 로 거부 항목을 찾아 불리언이나 컨텍스트를 고치는 것이 올바른 해결입니다.' },

  { diff: 'hard', type: 'short', q: '파일을 다른 곳에서 옮겨와 SELinux 컨텍스트가 어긋난 `/var/www` 디렉터리를 정책 기본값으로 **재귀 복원**하는 명령어는?', answer: 'restorecon -Rv /var/www', accept: ['restorecon -R /var/www', 'restorecon -rv /var/www', 'sudo restorecon -Rv /var/www', 'restorecon -R -v /var/www', 'restorecon -vR /var/www'],
    explain: '`cp` 는 대상 위치의 기본 컨텍스트를 받지만 `mv` 는 원래 컨텍스트를 그대로 가져옵니다. 홈 디렉터리에서 `mv` 한 파일은 `user_home_t` 라 httpd 가 읽지 못하고, `restorecon` 이 `httpd_sys_content_t` 로 바로잡습니다.',
    example: '`ls -Z /var/www/html` 로 컨텍스트를 확인하고, 커스텀 경로에는 `semanage fcontext -a -t httpd_sys_content_t "/srv/web(/.*)?"` 로 규칙을 등록한 뒤 `restorecon` 합니다.' },

  { diff: 'hard', type: 'short', q: 'SELinux Enforcing 상태에서 nginx/httpd 가 비표준 포트 **8081/tcp** 를 리스닝할 수 있게 허용하는 명령어는?', answer: 'semanage port -m -t http_port_t -p tcp 8081', accept: ['semanage port -m -p tcp -t http_port_t 8081'],
    explain: 'SELinux 는 웹 서버 도메인이 바인드할 수 있는 포트를 `http_port_t` 타입으로 제한합니다(80, 443, 8008, 8443 등). 다른 포트는 `semanage port` 로 타입에 추가해야 하며, 이미 다른 타입에 속한 포트는 `-m`(modify) 을 씁니다.',
    example: '`semanage port -l | grep http_port_t` 로 현재 허용된 포트를 확인합니다. `semanage` 는 `policycoreutils-python-utils` 패키지에 들어 있습니다.' },

  { diff: 'hard', type: 'short', q: '최근 발생한 SELinux 접근 거부(AVC) 기록을 감사 로그에서 검색하는 명령어는?', answer: 'ausearch -m avc -ts recent', accept: ['ausearch -m AVC -ts recent', 'ausearch -m avc', 'grep denied /var/log/audit/audit.log', 'sealert -a /var/log/audit/audit.log', 'ausearch -m avc -ts today', 'grep avc /var/log/audit/audit.log', 'ausearch -ts recent -m avc'],
    explain: 'SELinux 거부는 `/var/log/audit/audit.log` 에 `type=AVC ... denied` 로 기록됩니다. `ausearch -m avc` 가 이를 구조적으로 검색하고, `sealert` 나 `audit2why` 는 원인과 해결 명령까지 제안합니다.',
    example: '`ausearch -m avc -ts recent | audit2allow -M mypol` 로 커스텀 정책 모듈을 만들 수 있지만, 그 전에 관련 불리언(`getsebool -a | grep httpd`)으로 해결되는지 먼저 봅니다.' },

  /* ---------------- 커널 · 패키지 · 시간 · 네트워크 설정 ---------------- */
  { diff: 'easy', type: 'short', q: '현재 커널에 로드된 모듈 목록을 보여주는 명령어는?', answer: 'lsmod', accept: ['lsmod | less', 'cat /proc/modules'],
    explain: '`lsmod` 는 `/proc/modules` 를 읽기 좋게 보여줍니다. 특정 모듈 정보는 `modinfo 모듈명`, 로드는 `modprobe 모듈명`, 해제는 `modprobe -r` 입니다.',
    example: '쿠버네티스 노드 준비 시 `lsmod | grep br_netfilter` 로 브리지 넷필터 모듈이 올라와 있는지 확인합니다.' },

  { diff: 'normal', type: 'short', q: '커널 모듈 `br_netfilter` 를 지금 로드하는 명령어는?', answer: 'modprobe br_netfilter', accept: ['sudo modprobe br_netfilter'],
    explain: '`modprobe` 는 의존 모듈까지 함께 로드하고, `insmod` 는 파일 경로를 직접 지정해 단일 모듈만 올립니다. 재부팅 후에도 유지하려면 `/etc/modules-load.d/*.conf` 에 모듈명을 적어 둡니다.',
    example: 'kubeadm 사전 준비: `echo br_netfilter > /etc/modules-load.d/k8s.conf && modprobe br_netfilter` 후 `sysctl net.bridge.bridge-nf-call-iptables=1` 을 설정합니다.' },

  { diff: 'normal', type: 'short', q: '`/etc/sysctl.d/99-custom.conf` 에 `vm.swappiness=10` 을 적은 뒤, 재부팅 없이 **모든 sysctl 설정 파일**을 다시 읽어 적용하는 명령어는?', answer: 'sysctl --system', accept: ['sudo sysctl --system'],
    explain: '`sysctl -p` 는 인자 없이 쓰면 `/etc/sysctl.conf` 만 읽습니다. `/etc/sysctl.d/` 아래 파일까지 모두 적용하려면 `--system` 을 써야 합니다. `-w` 는 즉시 적용만 하고 파일에는 남기지 않습니다.',
    example: '`sysctl vm.swappiness` 로 적용 값을 확인합니다. 파일 이름 앞 숫자(99-)가 클수록 나중에 읽혀 우선합니다.' },

  { diff: 'normal', type: 'short', q: 'RHEL 계열에서 `/usr/bin/ssh` 파일이 어느 패키지에 속하는지 확인하는 명령어는?', answer: 'rpm -qf /usr/bin/ssh', accept: ['rpm -q --whatprovides /usr/bin/ssh', 'dnf provides /usr/bin/ssh', 'yum provides /usr/bin/ssh', 'rpm -qf $(which ssh)'],
    explain: '`rpm -qf`(query file) 는 설치된 패키지 DB 를 조회하고, `dnf provides` 는 설치되지 않은 패키지까지 저장소에서 찾습니다. Debian 계열은 `dpkg -S /usr/bin/ssh` 입니다.',
    example: '"이 바이너리가 어디서 왔지?" 를 확인하거나, `rpm -V 패키지` 로 파일이 변조되었는지 검증할 때 씁니다.' },

  { diff: 'normal', type: 'short', q: 'Debian/Ubuntu 에서 `/usr/bin/ssh` 파일을 소유한 패키지를 찾는 명령어는?', answer: 'dpkg -S /usr/bin/ssh', accept: ['dpkg-query -S /usr/bin/ssh', 'dpkg --search /usr/bin/ssh', 'apt-file search /usr/bin/ssh'],
    explain: '`dpkg -S` 는 설치된 패키지 파일 목록에서 검색합니다. 미설치 패키지까지 찾으려면 `apt-file` 을 설치해 `apt-file search` 를 씁니다.',
    example: '`dpkg -L openssh-client` 는 반대로 패키지가 설치한 파일 목록을 보여줍니다. 설정 파일 위치를 찾을 때 유용합니다.' },

  { diff: 'normal', type: 'short', q: 'chrony 를 쓰는 서버에서 NTP 동기화 상태(오프셋, 동기화 소스)를 확인하는 명령어는?', answer: 'chronyc tracking', accept: ['chronyc sources', 'chronyc sources -v', 'timedatectl', 'timedatectl status', 'sudo chronyc tracking'],
    explain: '`chronyc tracking` 은 기준 서버·오프셋·드리프트를, `chronyc sources` 는 소스별 상태(`^*` 가 현재 동기화 중)를 보여줍니다. `timedatectl` 은 `System clock synchronized: yes` 로 요약합니다.',
    example: '시간이 어긋나면 TLS 인증서 검증 실패, Kerberos 인증 실패, 분산 DB 의 트랜잭션 충돌이 생깁니다. 클러스터 노드 간 시간 차는 항상 점검 대상입니다.' },

  { diff: 'easy', type: 'short', q: '시스템 시간대를 `Asia/Seoul` 로 설정하는 명령어는?', answer: 'timedatectl set-timezone Asia/Seoul', accept: ['sudo timedatectl set-timezone Asia/Seoul', 'ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime'],
    explain: '`timedatectl` 은 `/etc/localtime` 심볼릭 링크를 갱신합니다. 사용 가능한 값은 `timedatectl list-timezones` 로 봅니다. 서버는 UTC 로 두고 애플리케이션에서 변환하는 방식도 널리 씁니다.',
    example: 'cron 이 예상과 다른 시각에 도는 원인이 시간대 설정인 경우가 많습니다. `date` 로 현재 시간대 표기(KST/UTC)를 확인합니다.' },

  { diff: 'easy', type: 'short', q: '시스템 호스트명을 `web01` 로 영구 변경하는 명령어는?', answer: 'hostnamectl set-hostname web01', accept: ['sudo hostnamectl set-hostname web01', 'hostnamectl hostname web01'],
    explain: '`hostnamectl` 은 `/etc/hostname` 과 커널의 호스트명을 함께 갱신합니다. `hostname web01` 은 재부팅하면 사라집니다. `/etc/hosts` 에 새 이름을 추가하지 않으면 `sudo` 가 느려지는 증상이 생길 수 있습니다.',
    example: '클라우드 이미지는 cloud-init 이 부팅 때 호스트명을 덮어쓰므로, 유지하려면 `preserve_hostname: true` 를 설정합니다.' },

  { diff: 'normal', type: 'short', q: 'NetworkManager 연결 프로파일 `eth0` 의 설정을 바꾼 뒤, 변경을 적용하기 위해 연결을 다시 활성화하는 명령어는?', answer: 'nmcli con up eth0', accept: ['nmcli connection up eth0', 'nmcli c up eth0', 'sudo nmcli con up eth0', 'nmcli con reload && nmcli con up eth0'],
    explain: '`nmcli con mod` 로 바꾼 설정은 프로파일에만 저장되고 인터페이스에는 반영되지 않습니다. `nmcli con up` 이 프로파일을 다시 읽어 적용합니다. 원격 세션에서 실행하면 잠시 끊길 수 있습니다.',
    example: '고정 IP 설정: `nmcli con mod eth0 ipv4.method manual ipv4.addresses 10.0.0.10/24 ipv4.gateway 10.0.0.1 ipv4.dns 10.0.0.2` 후 `nmcli con up eth0`.' },

  { diff: 'normal', type: 'short', q: '사용자 `deploy` 의 crontab 을 root 권한으로 편집하는 명령어는?', answer: 'crontab -u deploy -e', accept: ['crontab -e -u deploy', 'sudo crontab -u deploy -e'],
    explain: '사용자별 crontab 은 `/var/spool/cron/` 아래에 저장되며 직접 편집하지 말고 `crontab` 명령으로 다룹니다. `-l` 은 조회, `-r` 은 전체 삭제(확인 없음!)입니다.',
    example: '`crontab -e` 를 치려다 `-r` 로 잘못 치면 복구가 어렵습니다. 중요한 crontab 은 `crontab -l > backup.cron` 으로 백업하거나 `/etc/cron.d/` 에 파일로 두는 편이 안전합니다.' },

  { diff: 'normal', type: 'short', q: '마운트된 모든 파일시스템을 트리 구조로 보여주는 명령어는?', answer: 'findmnt', accept: [],
    explain: '`findmnt` 는 `mount` 출력보다 읽기 쉽고 `findmnt /data` 처럼 특정 경로가 어느 장치에 어떤 옵션으로 마운트됐는지 바로 알려줍니다.',
    example: '`findmnt -o TARGET,SOURCE,FSTYPE,OPTIONS /data` 로 `ro`(읽기 전용) 로 떨어진 볼륨을 찾습니다. 디스크 에러 시 커널이 자동으로 ro 재마운트하는 경우가 있습니다.' },

  { diff: 'hard', type: 'short', q: 'RHEL 계열에서 현재 활성화된 `tuned` 성능 프로파일을 확인하는 명령어는?', answer: 'tuned-adm active', accept: ['tuned-adm list', 'sudo tuned-adm active', 'tuned-adm profile_info'],
    explain: '`tuned` 는 워크로드별 커널 파라미터·I/O 스케줄러·CPU governor 묶음(프로파일)을 적용하는 데몬입니다. `throughput-performance`, `virtual-guest`, `latency-performance` 등이 있으며 `tuned-adm profile 이름` 으로 바꿉니다.',
    example: 'DB 서버가 가상 머신인데 `balanced` 프로파일이면 `tuned-adm profile virtual-guest` 로 바꾸는 것만으로 I/O 지연이 개선되는 경우가 있습니다.' },

  /* ---------------- 과제형 ---------------- */
  { diff: 'normal', type: 'task', q: '새 디스크 `/dev/sdb` 를 LVM 으로 구성해 XFS 로 `/data` 에 마운트하세요.',
    scene: '# 상황: 100GB 디스크 /dev/sdb 가 추가되었습니다. 전체를 하나의 LV 로 씁니다.',
    steps: [
      { hint: '# 1. /dev/sdb 를 물리 볼륨으로 초기화', answer: 'pvcreate /dev/sdb', accept: ['sudo pvcreate /dev/sdb'] },
      { hint: '# 2. 볼륨 그룹 vg_data 생성', answer: 'vgcreate vg_data /dev/sdb', accept: ['sudo vgcreate vg_data /dev/sdb'] },
      { hint: '# 3. 남은 공간 전부를 쓰는 논리 볼륨 lv_data 생성', answer: 'lvcreate -l 100%FREE -n lv_data vg_data', accept: ['lvcreate -n lv_data -l 100%FREE vg_data', 'sudo lvcreate -l 100%FREE -n lv_data vg_data'] },
      { hint: '# 4. XFS 파일시스템 생성', answer: 'mkfs.xfs /dev/vg_data/lv_data', accept: ['mkfs -t xfs /dev/vg_data/lv_data', 'mkfs.xfs /dev/mapper/vg_data-lv_data', 'sudo mkfs.xfs /dev/vg_data/lv_data'] },
      { hint: '# 5. 마운트 포인트를 만들고 마운트 (한 줄)', answer: 'mkdir -p /data && mount /dev/vg_data/lv_data /data', accept: ['mkdir /data && mount /dev/vg_data/lv_data /data', 'mkdir -p /data; mount /dev/vg_data/lv_data /data', 'mkdir -p /data && mount /dev/mapper/vg_data-lv_data /data'] },
    ],
    explain: 'PV → VG → LV → 파일시스템 → 마운트 순서입니다. 마지막으로 `/etc/fstab` 에 `UUID=... /data xfs defaults,nofail 0 0` 을 추가하고 `mount -a` 로 검증해야 재부팅 후에도 유지됩니다.',
    example: '나중에 디스크를 하나 더 붙이면 `vgextend` → `lvextend -r` 두 줄로 `/data` 가 무중단 확장됩니다. 처음부터 LVM 으로 잡는 이유입니다.' },

  { diff: 'normal', type: 'task', q: '`/data`(LV `/dev/vg_data/lv_data`, XFS) 가 95% 찼습니다. VG 에 새 디스크 `/dev/sdc` 를 붙여 온라인으로 20GiB 늘리세요.',
    scene: '# 상황: 서비스 중단 없이 볼륨을 확장해야 합니다.',
    steps: [
      { hint: '# 1. 볼륨 그룹의 남은 공간(VFree) 확인', answer: 'vgs', accept: ['vgs vg_data', 'vgdisplay vg_data', 'vgdisplay', 'sudo vgs'] },
      { hint: '# 2. 새 디스크 /dev/sdc 를 vg_data 에 추가', answer: 'vgextend vg_data /dev/sdc', accept: ['sudo vgextend vg_data /dev/sdc'] },
      { hint: '# 3. LV 를 20GiB 늘리면서 파일시스템까지 함께 확장', answer: 'lvextend -r -L +20G /dev/vg_data/lv_data', accept: ['lvextend -L +20G -r /dev/vg_data/lv_data', 'lvextend --resizefs -L +20G /dev/vg_data/lv_data', 'lvextend -r -L +20G /dev/mapper/vg_data-lv_data', 'sudo lvextend -r -L +20G /dev/vg_data/lv_data', 'lvextend -rL +20G /dev/vg_data/lv_data'] },
      { hint: '# 4. /data 의 새 용량 확인', answer: 'df -h /data', accept: ['df -h', 'df -hT /data'] },
    ],
    explain: '`-r` 을 빼면 LV 만 커지고 `df -h` 는 그대로입니다. 그 경우 XFS 는 `xfs_growfs /data`, ext4 는 `resize2fs /dev/vg_data/lv_data` 를 따로 실행합니다.',
    example: 'VG 에 이미 여유가 있다면 2단계는 생략하고 3단계만 실행하면 됩니다. 1단계에서 VFree 를 확인하는 이유입니다.' },

  { diff: 'normal', type: 'task', q: '메모리 부족으로 OOM 이 발생합니다. 2GiB 스왑 파일을 만들어 활성화하세요.',
    scene: '# 상황: 스왑이 없는 VM 입니다. 파일 기반 스왑을 추가합니다.',
    steps: [
      { hint: '# 1. 2GiB 크기의 /swapfile 을 즉시 할당', answer: 'fallocate -l 2G /swapfile', accept: ['dd if=/dev/zero of=/swapfile bs=1M count=2048', 'sudo fallocate -l 2G /swapfile', 'fallocate -l 2GiB /swapfile'] },
      { hint: '# 2. 스왑 파일 권한을 root 만 읽고 쓸 수 있게 설정', answer: 'chmod 600 /swapfile', accept: ['chmod 0600 /swapfile', 'sudo chmod 600 /swapfile'] },
      { hint: '# 3. 파일을 스왑 영역으로 포맷', answer: 'mkswap /swapfile', accept: ['sudo mkswap /swapfile'] },
      { hint: '# 4. 스왑 활성화', answer: 'swapon /swapfile', accept: ['sudo swapon /swapfile'] },
    ],
    explain: '권한이 600 이 아니면 `swapon` 이 "insecure permissions" 경고를 냅니다. 재부팅 후에도 쓰려면 fstab 에 `/swapfile none swap sw 0 0` 을 추가하고, `free -h` 나 `swapon --show` 로 확인합니다.',
    example: 'XFS/btrfs 위의 스왑 파일은 `fallocate` 로 만들면 안 되는 경우가 있어(홀이 생김) `dd` 를 권장합니다. 스왑은 OOM 을 늦출 뿐이라 근본 원인(메모리 누수, 과도한 워커 수)은 따로 잡아야 합니다.' },

  { diff: 'hard', type: 'task', q: 'VG `vg_data` 의 낡은 디스크 `/dev/sdb` 를 새 디스크 `/dev/sdd` 로 무중단 교체하세요.',
    scene: '# 상황: /dev/sdb 에서 SMART 경고가 반복됩니다. 서비스는 계속 떠 있어야 합니다.',
    steps: [
      { hint: '# 1. 새 디스크 /dev/sdd 를 vg_data 에 추가', answer: 'vgextend vg_data /dev/sdd', accept: ['sudo vgextend vg_data /dev/sdd'] },
      { hint: '# 2. /dev/sdb 의 데이터(extent)를 /dev/sdd 로 온라인 이동', answer: 'pvmove /dev/sdb /dev/sdd', accept: ['pvmove /dev/sdb', 'sudo pvmove /dev/sdb /dev/sdd', 'pvmove -v /dev/sdb /dev/sdd'] },
      { hint: '# 3. 비워진 /dev/sdb 를 볼륨 그룹에서 제거', answer: 'vgreduce vg_data /dev/sdb', accept: ['sudo vgreduce vg_data /dev/sdb'] },
      { hint: '# 4. /dev/sdb 의 LVM 메타데이터 삭제', answer: 'pvremove /dev/sdb', accept: ['sudo pvremove /dev/sdb'] },
    ],
    explain: '`pvmove` 는 LV 가 마운트된 상태에서도 동작하며, 대상 PV 를 생략하면 VG 내 다른 PV 로 알아서 분산합니다. `vgreduce` 는 PV 가 완전히 비어야 성공하므로 `pvs` 로 `PFree` 가 `PSize` 와 같은지 먼저 봅니다.',
    example: '스토리지 어레이 교체(구 LUN → 신 LUN) 도 같은 절차입니다. 호스트 입장에서는 그냥 PV 교체이며, 애플리케이션은 아무것도 모릅니다.' },

  { diff: 'hard', type: 'task', q: '두 디스크로 RAID 1 을 구성하고, 재부팅 후에도 자동 조립되도록 설정을 남기세요.',
    scene: '# 상황: /dev/sdb, /dev/sdc 두 개의 빈 디스크가 있습니다.',
    steps: [
      { hint: '# 1. /dev/sdb, /dev/sdc 로 RAID 1 배열 /dev/md0 생성', answer: 'mdadm --create /dev/md0 --level=1 --raid-devices=2 /dev/sdb /dev/sdc', accept: ['mdadm -C /dev/md0 -l 1 -n 2 /dev/sdb /dev/sdc', 'mdadm --create /dev/md0 -l1 -n2 /dev/sdb /dev/sdc', 'mdadm --create /dev/md0 --level 1 --raid-devices 2 /dev/sdb /dev/sdc', 'sudo mdadm --create /dev/md0 --level=1 --raid-devices=2 /dev/sdb /dev/sdc', 'mdadm --create /dev/md0 --raid-devices=2 --level=1 /dev/sdb /dev/sdc'] },
      { hint: '# 2. 배열 상태와 초기 동기화 진행률 확인', answer: 'cat /proc/mdstat', accept: ['mdadm --detail /dev/md0', 'mdadm -D /dev/md0', 'watch cat /proc/mdstat'] },
      { hint: '# 3. 배열 정의를 스캔해 /etc/mdadm.conf 에 추가 (Debian 은 /etc/mdadm/mdadm.conf)', answer: 'mdadm --detail --scan >> /etc/mdadm.conf', accept: ['mdadm --detail --scan >> /etc/mdadm/mdadm.conf', 'mdadm --detail --scan | tee -a /etc/mdadm.conf', 'mdadm -Ds >> /etc/mdadm.conf', 'mdadm --examine --scan >> /etc/mdadm.conf'] },
      { hint: '# 4. mdadm.conf 를 부팅 초기에 반영하도록 initramfs 재생성 (RHEL 계열)', answer: 'dracut -f', accept: ['dracut --force', 'update-initramfs -u', 'sudo dracut -f'] },
    ],
    explain: '`mdadm.conf` 가 없어도 대개 자동 조립되지만, 장치명이 `/dev/md127` 처럼 바뀌어 fstab 이 깨질 수 있습니다. 설정을 남기고 initramfs 에 반영해야 이름이 고정됩니다.',
    example: '동기화가 끝나기 전에도 배열을 포맷·마운트해 쓸 수 있습니다. 다만 동기화 중에는 I/O 성능이 떨어지므로 야간에 진행하는 편이 좋습니다.' },

  /* ---------------- 서술형 ---------------- */
  { diff: 'normal', type: 'essay', q: 'LVM 의 3계층 구조(PV · VG · LV)를 설명하고, 디스크를 직접 파티션해 쓰는 방식 대비 어떤 장점이 있는지 서술하세요.',
    keywords: [['PV', '물리 볼륨', 'physical volume'], ['VG', '볼륨 그룹', 'volume group'], ['LV', '논리 볼륨', 'logical volume'], ['확장', 'lvextend', '온라인', '무중단'], ['여러 디스크', '풀', '합쳐', '묶'], ['스냅샷', 'snapshot'], ['pvmove', '이동', '교체']],
    minKeywords: 4,
    model: '디스크나 파티션을 `pvcreate` 로 PV(물리 볼륨)로 만들고, 여러 PV 를 `vgcreate` 로 VG(볼륨 그룹)라는 하나의 저장 풀로 묶습니다. 그 풀에서 `lvcreate` 로 필요한 크기만큼 LV(논리 볼륨)를 잘라 파일시스템을 올립니다. 장점은 첫째, 물리 디스크 경계에 얽매이지 않아 여러 디스크를 합쳐 하나의 큰 볼륨을 만들 수 있고, 둘째, 서비스 중단 없이 `vgextend` 와 `lvextend -r` 로 온라인 확장이 가능하며, 셋째, 스냅샷으로 백업이나 업그레이드 전 복구 지점을 만들 수 있고, 넷째, `pvmove` 로 디스크를 무중단 교체할 수 있다는 점입니다. 파티션 방식은 크기를 바꾸려면 언마운트와 재파티션이 필요하고 디스크를 넘어서는 볼륨을 만들 수 없습니다.',
    explain: '"나중에 늘릴 수 있는가" 가 핵심입니다. 운영 서버의 데이터 볼륨을 LVM 없이 잡으면 용량 부족 시 서비스를 내려야 하므로, 대부분의 배포판 설치 기본값이 LVM 인 이유입니다.',
    example: '클라우드에서도 EBS 볼륨 여러 개를 하나의 VG 로 묶고 스트라이프 LV(`lvcreate -i`)로 만들어 IOPS 를 합산하거나, 온프레미스 SAN LUN 을 PV 로 써서 스토리지 마이그레이션을 `pvmove` 한 줄로 끝내는 식으로 활용합니다.' },

  { diff: 'hard', type: 'essay', q: 'PXE 네트워크 부팅으로 서버 OS 가 자동 설치되기까지의 흐름을 단계별로 설명하세요.',
    keywords: [['DHCP', 'IP'], ['next-server', 'TFTP 서버', '부트 서버'], ['TFTP', '부트로더', 'pxelinux', 'grubx64'], ['커널', 'vmlinuz', 'initrd', 'initramfs'], ['HTTP', 'NFS', '설치 소스', 'repo'], ['Kickstart', 'preseed', 'autoinstall', '응답 파일', '무인'], ['UEFI', 'BIOS']],
    minKeywords: 4,
    model: '서버가 NIC 의 PXE ROM 으로 부팅하면 먼저 DHCP 요청을 보내고, DHCP 서버는 IP 와 함께 `next-server`(TFTP 서버 주소)와 `filename`(부트 파일명)을 응답합니다. 클라이언트는 TFTP 로 부트로더(BIOS 는 `pxelinux.0`, UEFI 는 `grubx64.efi`)를 받아 실행하고, 부트로더는 설정 파일(`pxelinux.cfg/default` 등)을 읽어 커널(`vmlinuz`)과 `initrd` 를 역시 TFTP 로 내려받아 메모리에서 부팅합니다. 커널 인자에 지정된 설치 소스(`inst.repo=http://...`)와 응답 파일(`inst.ks=`, Ubuntu 는 autoinstall) 위치에 따라 설치 프로그램이 HTTP/NFS 로 패키지를 받아 파티션·패키지·계정 설정을 무인으로 진행합니다. 설치가 끝나면 재부팅하고, 이때 BIOS 부팅 순서가 로컬 디스크 우선이어야 다시 PXE 로 들어가지 않습니다.',
    explain: '각 단계가 서로 다른 프로토콜(DHCP → TFTP → HTTP)을 쓰므로, 어디서 멈췄는지에 따라 확인할 서비스가 달라집니다. "PXE-E53: No boot filename received" 면 DHCP, "TFTP open timeout" 이면 TFTP, 커널 로드 후 멈추면 설치 소스 문제입니다.',
    example: '수십 대 서버를 동시에 배포하는 데이터센터나 쿠버네티스 베어메탈 노드 프로비저닝(Metal³, MAAS, Foreman)의 밑바닥이 모두 이 PXE 흐름입니다.' },

  { diff: 'hard', type: 'essay', q: '전원을 켠 뒤 로그인 프롬프트가 뜨기까지 리눅스 부팅 과정을 순서대로 설명하세요.',
    keywords: [['BIOS', 'UEFI', '펌웨어', 'POST'], ['부트로더', 'GRUB'], ['커널', 'vmlinuz'], ['initramfs', 'initrd'], ['루트 파일시스템', 'root=', '/sysroot', '마운트'], ['systemd', 'PID 1', 'init'], ['타겟', 'target', 'multi-user', 'graphical', '유닛']],
    minKeywords: 4,
    model: '전원이 들어오면 펌웨어(BIOS 또는 UEFI)가 POST 로 하드웨어를 점검하고 부팅 장치를 찾습니다. BIOS 는 MBR 의 부트 코드를, UEFI 는 ESP 파티션의 `.efi` 파일을 실행해 부트로더(GRUB)를 띄웁니다. GRUB 은 `grub.cfg` 의 메뉴에 따라 커널(`vmlinuz`)과 `initramfs` 를 메모리에 올리고 커널 인자(`root=`, `ro` 등)를 넘깁니다. 커널은 하드웨어를 초기화한 뒤 initramfs 를 임시 루트로 마운트하고, 그 안의 드라이버(스토리지, LVM, RAID, 암호화)로 실제 루트 파일시스템을 찾아 `/sysroot` 에 마운트한 다음 그쪽으로 전환(switch_root)합니다. 이어 PID 1 인 systemd 가 실행되어 기본 타겟(`multi-user.target` 또는 `graphical.target`)에 필요한 유닛들을 의존성 순서로 병렬 기동하고, 마지막으로 getty 나 디스플레이 매니저가 로그인 프롬프트를 띄웁니다.',
    explain: '어느 단계에서 멈췄는지가 곧 진단입니다. GRUB 메뉴도 안 나오면 펌웨어/부트로더, "unable to mount root fs" 면 initramfs/커널 인자, 유닛이 실패하면 systemd 단계입니다.',
    example: '`systemd-analyze` 가 보여주는 `firmware / loader / kernel / initrd / userspace` 시간이 정확히 이 단계들입니다. initrd 가 길면 대개 스토리지 타임아웃, userspace 가 길면 특정 서비스가 원인입니다.' },

  { diff: 'hard', type: 'essay', q: 'RAID 0, 1, 5, 10 의 차이를 용량 효율·장애 허용·성능 관점에서 비교하고, 데이터베이스 서버에 어떤 레벨을 권할지 이유와 함께 서술하세요.',
    keywords: [['RAID 0', '스트라이핑', 'striping'], ['RAID 1', '미러', 'mirror'], ['RAID 5', '패리티', 'parity'], ['RAID 10', '1+0', '미러 후 스트라이프'], ['용량', '효율', '50%', 'N-1'], ['쓰기 성능', 'write penalty', '패리티 계산'], ['리빌드', 'rebuild', '재구성'], ['장애', '디스크 하나', '허용']],
    minKeywords: 5,
    model: 'RAID 0 은 데이터를 여러 디스크에 스트라이핑해 용량과 성능을 모두 합산하지만 디스크 하나만 죽어도 전체가 날아가므로 임시 데이터에만 씁니다. RAID 1 은 미러링으로 용량 효율이 50% 지만 디스크 하나 장애를 견디고 읽기 성능이 좋으며 리빌드가 단순 복사라 빠릅니다. RAID 5 는 패리티를 분산 저장해 N-1 의 용량 효율과 1개 디스크 장애 허용을 얻지만, 쓰기마다 패리티를 다시 계산하는 write penalty 가 있고 대용량 디스크에서는 리빌드 중 두 번째 장애 위험이 커집니다. RAID 10 은 미러 쌍을 스트라이핑한 것으로 용량 효율은 50% 지만 패리티 계산이 없어 랜덤 쓰기 성능이 가장 좋고, 서로 다른 미러 쌍이면 여러 디스크 장애도 견딥니다. 랜덤 쓰기가 많고 지연에 민감한 데이터베이스에는 RAID 10 을 권하고, 읽기 위주의 대용량 저장에는 RAID 5/6 이 비용 효율적입니다.',
    explain: '스토리지 엔지니어 면접의 단골 주제이며 핵심은 "쓰기 패널티" 와 "리빌드 시간" 입니다. RAID 5 의 쓰기는 읽기-수정-쓰기로 4번의 I/O 가 발생하고, 10TB 급 디스크의 리빌드는 하루 이상 걸려 그 사이 추가 장애에 노출됩니다.',
    example: '최신 어레이(PowerStore, PowerScale 등)는 전통 RAID 대신 분산 패리티나 erasure coding 을 쓰지만, "용량 효율 vs 장애 허용 vs 쓰기 성능" 의 트레이드오프는 동일하게 적용됩니다.' },
);
