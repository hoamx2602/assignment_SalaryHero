# SALARY HERO APP

## Basic System Design
![alt text](image/salary_hero_design.png)

[hero_salary_system_design](https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Untitled%20Diagram.drawio#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D190rB9xnCYO6CqR-1Emsp9TMjQPeYJIOH%26export%3Ddownload#%7B%22pageId%22%3A%22cr6ubANpRbbj3fDNgJnN%22%7D)

## ENVs
1. Auth:
```
NODE_ENV=development
APP_NAME=auth
PORT=3006

MONGODB_URI=mongodb://root:password123@mongodb-primary:27017

RABBIT_MQ_URI=amqp://rabbitmq:rabbitmq@rabbitmq:5672/
RABBIT_MQ_AUTH_QUEUE=auth
RABBIT_MQ_SALARY_QUEUE=salary

JWT_SECRET=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCRHTAynMt7rWFcjDFdAeY2KjEcAF1i4sY+Xl6EVA8N7hCp/1Pfv5Gm4MUgfLW210LVfntnZjtbAt4yol218VCeIrGXLf89g/AwS/zlQ34uxwg7F5xjpr8ABoX3Q5DRViVuneLBt8ipBZd5vZZTF60ELmMGlWH3ZSS4lDtcg40EfQIDAQAB
JWT_EXPIRATION=84600

```
2. Consumer
```
NODE_ENV=development
APP_NAME=consumer

RABBIT_MQ_URI=amqp://rabbitmq:rabbitmq@rabbitmq:5672/
RABBIT_MQ_SALARY_QUEUE=salary

MONGODB_URI=mongodb://root:password123@mongodb-primary:27017
```
3. Salary
```
NODE_ENV=development
APP_NAME=salary
PORT=3005

MONGODB_URI=mongodb://root:password123@mongodb-primary:27017

RABBIT_MQ_URI=amqp://rabbitmq:rabbitmq@rabbitmq:5672/
RABBIT_MQ_SALARY_QUEUE=salary
RABBIT_MQ_AUTH_QUEUE=auth
CURRENT_TIMEZONE_SERVER=7
```

## Install & Run
Run: 
```
$ docker compose up -d --build
```

## Docs
- Auth: http://localhost:3006/api/docs
- Salary: http://localhost:3005/api/docs

## Flow test:
1. Create new company
2. Create new user belong to this company
3. Create user salary configuration

For exactly 00h00 (midnight at company timezone) then the cron will create new task for calculation daily salary