# Translation Content Quality Assurance System(TCQAS)

Hyperledger기반 번역 콘텐츠 검수 시스템

## Table of contents

- [What is TCQAS](#what-is-tcqas)
- [How To Install](#how-to-install)
  - [Requirements](#requirements)
  - [STEP 1: Install CLI Tools](#step-1-install-cli-tools)
  - [STEP 2: Install Playground](#step-2-install-playground)
  - [STEP 3: Clone Repository](#step-3-clone-repository)
  - [STEP 4: Starting and stopping Hyperledger Fabric](#step-4-starting-and-stopping-hyperledger-fabric)
  - [STEP 5: Install Dependencies](#step-5-install-dependencies)
  - [STEP 6: Deploy the business network](#step-6-deploy-the-business-network)
  - [STEP 7: Start the web app ("Playground")](#step-7-start-the-web-app-playground)
- [API Reference](#api-reference)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## What is TCQAS

- 지적 재산 콘텐츠는 문학, 도서, 애니메이션 등을 포함하여 그 종류가 다양하고 이러한 콘텐츠는 다양한 문화 및 언어권에 포함되어 제작되기 때문에 번역자 및 이에 대한 검수 평가를 통해 현지화 되어 유통됩니다.
- 하지만 기존 시스템은 비공식적으로 구성되어 있어 실제 검수 요청자 및 검수자 등 관련 이해관계자가 요청과 처리과정을 투명하게 확인할 수 없으며 작업을 통해 나온 결과에 대해 책임을 부여하기가 어렵습니다.
- 또한 검수 과정에서 품질 제고를 위해 검수 사항과 관련된 정보 공유 및 상호간의 합의와 승인 절차가 요구됩니다.
- 이러한 기존 시스템 상 문제점을 개선하고 요구사항을 만족시키는 시스템 구성을 위해 하이퍼레저 패브릭 블록체인 기반의 번역 콘텐츠 검수 시스템을 제안 및 구현하고 이에 대한 내부 프로세스 및 평판 시스템과 안전성을 고려한 승인 정책을 제시합니다.

## How To Install

**⚠️Windows에서는 설치가 안됩니다.** Windows에서는 VMware와 같은 가상머신을 이용해야 합니다.
현재 적용 가능한 OS는 Ubuntu와 MacOS 입니다.

### Requirements

- OS: Ubuntu Linux 14.04 / 16.04 LTS (both 64-bit), or Mac OS 10.12
- Memory: at least 4GB
- Docker Engine: Version 17.03 or higher
- Docker-Compose: Version 1.8 or higher
- Node: 8.9 or higher (note version 9 and higher is not supported)
- npm: v5.x
- git: 2.9.x or higher
- Python: 2.7.x
- A code editor of your choice, we recommend VSCode.

### STEP 1: Install CLI Tools

몇 가지 유용항 CLI 도구를 먼저 설치해야 합니다. 거의 모든 필수적인 요소를 포함하는 composer-cli를 제일 먼저 설치합니다.

```
npm install -g composer-cli@0.20
```

다음, REST 서버를 실행할 수 있는 유틸리티를 설치합니다

```
npm install -g composer-rest-server@0.20
```

유용한 유틸리티 assets을 설치하는 도구도 같이 설치합니다.

```
npm install -g generator-hyperledger-composer@0.20
```

마지막으로 Skeleton Code를 자동으로 생성하는 Yeoman을 설치합니다.

```
npm install -g yo
```

### STEP 2: Install Playground

만약 이전에 Composer를 온라인에서 사용해 보셨다면, Playground라는 브라우저 애플리케이션을 보신 적이 있으실 겁니다.
사실 Playground를 로컬 머신에도 설치할 수 있습니다. 다음 명령을 통해 Playground를 설치해줍니다.

```
npm install -g composer-playground@0.20
```

### STEP 3: Clone Repository

그런 다음 해당 레포지토리를 클론해 줍니다

```
git clone https://github.com/eunsukimme/Translation-Content-Quality-Assurance-System
```

### STEP 4: Starting and stopping Hyperledger Fabric

fabric-dev-servers 폴더에는 런타임을 컨트롤할 수 있는 몇 가지 스크립트가 포함되어 있습니다.
만약 새로운 런타임을 시작하고자 한다면, start 스크립트를 실행한 이후 PeearAdminCard를 생성해야 합니다.

```
  cd Translation-Content-Quality-Assurance-System/fabric-dev-servers
  export FABRIC_VERSION=hlfv12
  ./startFabric.sh
  ./createPeerAdminCard.sh
```

런타임을 중지하고 싶을 땐 fabric-dev-servers/stopFabric.sh 를, 다시 시작하고 싶을 땐 fabric-dev-servers/startFabric.sh 스크립트를 실행하면 됩니다.
중지하고 난 뒤 fabric-dev-servers/teardownFabric.sh를 실행하게 되면, 다음 번에 다시 start 할 때 새롭게 PeerAdmin 카드를 생성해 주어야 합니다.

### STEP 5: Install Dependencies

qa-network 폴더로 이동하고 package.json에 명시된 dependencies를 설치해 줍시다

```
cd ../qa-network && npm install
```

### STEP 6: Deploy the business network

하이퍼레저 패브릭에 TCQAS business network를 배포하기 위해선 peer에 해당 네트워크를 설치해야 하며, 그런 다음 business network를 시작할 수 있습니다.
그리고 network administrator를 위한 새로운 participant, identity, associated card 가 만들어져야합니다.
마지막으로, network administrator의 business network card가 import되어야 하며, 그런 다음 network는 ping 요청에 응답할 수 있게 됩니다.\
\
TCQAS network를 설치하기 위해, qa-network 경로에서 다음 명령을 실행해 줍니다.

```
composer network install --card PeerAdmin@hlfv1 --archiveFile qa-network@0.0.1.bna
```

network를 시작해 주기 위해 다음 명령을 실행해 줍니다.

```
composer network start --networkName qa-network --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
```

network administrator의 identity를 business network card로 import하기 위해 다음 명령을 실행해 줍니다.

```
composer card import --file networkadmin.card
```

자, 이제 TCQAS network가 정상적으로 배포되었는지 확인하기 위해 다음 명령을 실행해 줍니다.

```
composer network ping --card admin@qa-network
```

### STEP 7: Start the web app ("Playground")

이제 본격적으로 Playground를 테스트 할 수 있습니다. 다음 명령을 실행해 줍니다.

```
  composer-playground
```

위 명령은 자동적으로 http://localhost:8080/login 창을 띄울 것입니다. 이전에 만든 PeerAdminCard인 PeerAdmin@hlfv1 이 "My Business Network"화면에 나타난 것을 확인할 수 있습니다. 만약 보이지 않는다면 런타임을 재시작 해줍니다.\
\
<img width="1680" alt="Screen Shot 2019-09-11 at 8 16 51 PM" src="https://user-images.githubusercontent.com/31213226/64693042-5fadf480-d4d1-11e9-8b3b-25272643fe9a.png">\
\
Connect Now를 클릭하면 Playground 에서 TCQAS network를 확인할 수 있습니다! Define 탭에서 network 모델을 확인할 수 있습니다.\
\
<img width="1680" alt="Screen Shot 2019-09-11 at 8 17 56 PM" src="https://user-images.githubusercontent.com/31213226/64693078-718f9780-d4d1-11e9-9c8d-de7cf4f4732a.png">\
\
Test 탭에서는 TCQAS network의 transaction을 직접 생성하면서 테스트할 수 있습니다. \
\
<img width="1680" alt="Screen Shot 2019-09-11 at 8 18 05 PM" src="https://user-images.githubusercontent.com/31213226/64693274-de0a9680-d4d1-11e9-942c-8782f539bf99.png">\
\
Playground를 다루는 자세한 방법은 [공식 Document](https://hyperledger.github.io/composer/latest/tutorials/playground-tutorial.html)를 참고하세요.

## API Reference

TCQAS의 Participant, Asset, Transaction에 대한 자세한 설명은 [API Reference](https://github.com/eunsukimme/Translation-Content-Quality-Assurance-System/wiki/API-Reference)를 참고하세요.

## License

MIT

## Acknowledgments

TCQAS는 부경대 링크플러스 사업단의 지원을 받아 수행되었습니다.

CISC-S 2019 Submission 108

- title: 블록체인 기반의 번역 콘텐츠 검수 시스템
- paper: [link](https://github.com/eunsukimme/Translation-Content-Quality-Assurance-System/blob/master/document/CISC-S_2019_paper_108.pdf)
- Author Keywords:
  - blockchain
  - Inspection system
  - reputation system
- Sumitted: May 31, 09:43 GMT
