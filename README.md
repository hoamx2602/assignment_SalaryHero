# SALARY HERO APP

## Basic System Design
![alt text](image/salary_hero_design.png)

[hero_salary_system_design](https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Untitled%20Diagram.drawio#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D190rB9xnCYO6CqR-1Emsp9TMjQPeYJIOH%26export%3Ddownload#%7B%22pageId%22%3A%22cr6ubANpRbbj3fDNgJnN%22%7D)

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