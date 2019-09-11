# API Reference

## Table of Contens

- [Asset](#asset)
  - [Object](#object)
  - [Book](#book)
- [Participant](#participant)
  - [Concept](#concept)
  - [Peer](#peer)
  - [Client](#client)
  - [QA](#qa)
- [Transaction](#transaction)
  - [Create Book](#create-book)
  - [Add Feedback](#add-feedback)
  - [hashtag](#hashtag)
  - [vote_qa](#vote_qa)
  - [select_feedback](#select_feedback)

## Asset

### Object

Asset에 implement되는 추상 객체입니다.

| Property |  Type  | Description |
| :------- | :----: | ----------: |
| Obj_id   | String | 객체 식별자 |

### Book

검수에 맡겨질 Asset 중 ISBN, Author(client)를 보유하고 있는 Asset 입니다.

| Property       | Type     | Description                       |
| -------------- | -------- | --------------------------------- |
| ISBN           | String   | 고유 넘버                         |
| name           | String   | 이름                              |
| description    | String   | 설명                              |
| client         | Client   | 검수를 요청한 Client 객체         |
| valid          | Boolean  | 검수 진행 상태 flag               |
| select_comment | String[] | 투표를 받은 검수 현황             |
| feedbacks      | String[] | 검수 이력들                       |
| vote_qa        | String[] | 투표를 받은 검수를 진행한 QA의 id |
| qa_num         | Double   | 참여한 QA 수                      |
| qa_selec       | Double[] | qa 투표                           |
| QAs            | QA[]     | 검수에 참여한 QA 객체             |
| order_qa       | QA[]     | 검수에 참여한 QA들의 순서         |

## Participant

### Concept

사용자 정보를 저장하는 Concept 입니다.

| Property | Type   | Description |
| -------- | ------ | ----------- |
| name     | String | 사용자 이름 |
| age      | String | 사용자 나이 |

### Peer

Participant에 의해 implement되는 추상 객체입니다.

| Property | Type   | Description |
| -------- | ------ | ----------- |
| P_id     | String | 객체 식별자 |

### Client

Asset을 보유하고 있고, 해당 Asset의 검수를 요청하는 사용자 입니다.

| Property | Type     | Description                 |
| -------- | -------- | --------------------------- |
| info     | Info     | 클라이언트 정보             |
| books    | Object[] | 검수를 요청한 Asset(Book)들 |

### QA

Asset에 대한 검수를 진행하는 사용자 입니다.

| Property              | Type     | Description              |
| --------------------- | -------- | ------------------------ |
| info                  | Info     | QA 정보                  |
| contributes           | String[] | 참여한 검수 기록들       |
| select_value          | Double   | 기여도                   |
| hash                  | String[] | 평판 태그                |
| contributed_book_list | Book[]   | 검수한 Asset(Book)객체들 |

## Transaction

### Create Book

검수를 요청할 Asset(Book)을 등록하는 트랜잭션 입니다.

| Parameter   | Type   | Description               |
| ----------- | ------ | ------------------------- |
| ISBN        | String | 고유 넘버                 |
| name        | name   | Asset(Book)이름           |
| description | String | 설명                      |
| client      | Client | 검수를 요청한 Client 객체 |

### Add Feedback

QA가 검수를 진행하고 이를 등록하는 트랜잭션 입니다.

| Parameter | Type   | Description            |
| --------- | ------ | ---------------------- |
| comment   | String | 검수 내용              |
| book      | Book   | 검수한 Asset(Book)객체 |
| qa        | QA     | 검수를 진행한 QA객체   |

### hashtag

QA들의 평판을 해쉬태그 형태로 부여하는 트랜잭션 입니다.

| Parameter  | Type   | Description          |
| ---------- | ------ | -------------------- |
| qa_comment | String | QA에 대한 평판       |
| qa         | QA     | 검수를 진행한 QA객체 |

### vote_qa

검수자들의 검수 내용을 확인한 뒤 이에 투표하는 트랜잭션 입니다.

| Parameter | Type | Description                        |
| --------- | ---- | ---------------------------------- |
| book      | Book | 검수 내용이 기록된 Asset(Book)객체 |
| qa        | QA   | 검수를 진행한 QA객체               |

### select_feedback

최다 득표를 받은 검수자의 검수 작업 내용을 채택하는 트랜잭션 입니다.

| Parameter | Type | Description                        |
| --------- | ---- | ---------------------------------- |
| book      | Book | 검수 내용이 기록된 Asset(Book)객체 |
