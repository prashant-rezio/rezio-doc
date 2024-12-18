# PostgreSQL Backup, Restore, and Django Connection Setup

This document provides a comprehensive guide on **backing up PostgreSQL from AWS RDS**, **restoring it into a Docker container**, and **connecting it to a Django application**.

---

## **1. Take PostgreSQL Database Dump**

### **Step 1: Install PostgreSQL Tools (if needed)**
```bash
brew install postgresql
```

### **Step 2: Create Database Backup Using `pg_dump`**
```bash
pg_dump -h <AWS_RDS_ENDPOINT> -U <DB_USERNAME> -d <DB_NAME> -p 5432 -F c -b -v -f db_dump.backup
```

**Example:**
```bash
pg_dump -h rezio-staging.cfwuacqgqc0d.me-central-1.rds.amazonaws.com -U aketai -d rezio_staging -p 5432 -F c -b -v -f rezio_staging.backup
```

### **Options Explained:**
- `-h`: AWS RDS endpoint
- `-U`: Database username
- `-d`: Database name
- `-p`: Database port (usually 5432)
- `-F c`: Format as custom backup
- `-b`: Include blobs
- `-v`: Verbose mode
- `-f`: Output file name

---

## **2. Restore the Database in Docker**

### **Step 1: Run PostgreSQL in Docker**
```bash
docker run --name postgres_local -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=rezio_staging_local -p 5432:5432 -d postgres:16.6
```

### **Step 2: Copy the Backup to the Docker Container**
```bash
docker cp db_dump.backup postgres_local:/db_dump.backup
```

### **Step 3: Restore the Backup**
```bash
docker exec -it postgres_local bash
pg_restore -U postgres -d rezio_staging_local -v /db_dump.backup
```

### **Step 4: Verify the Restore**
```bash
psql -U postgres -d rezio_staging_local
\dt
SELECT * FROM user_user LIMIT 5;
```

---

## **3. Connect PostgreSQL to Django App**

### **Step 1: Update Django `settings.py`**
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'rezio_staging_local',   # Docker DB name
        'USER': 'postgres',               # Docker username
        'PASSWORD': 'postgres',           # Docker password
        'HOST': 'localhost',              # Docker host
        'PORT': '5432',                   # Docker port
    }
}
```

### **Step 2: Apply Django Migrations**
```bash
python manage.py makemigrations
python manage.py migrate
```

### **Step 3: Test the Connection**
```bash
python manage.py runserver
```

Access: **http://localhost:8000**

---

## **4. Troubleshooting & Additional Commands**

### **Check Docker Container Status**
```bash
docker ps
```

### **Check PostgreSQL Logs**
```bash
docker logs postgres_local
```

### **Manually Test PostgreSQL Connection**
```bash
psql -h localhost -U postgres -d rezio_staging_local
```

### **Inspect Docker Network**
```bash
docker network inspect bridge
```

### **Check Django Database Shell**
```bash
python manage.py dbshell
```

### **Recreate Docker Container (if needed)**
```bash
docker stop postgres_local && docker rm postgres_local
```

---

By following these steps, you can successfully take a database dump from AWS RDS, restore it in Docker, and connect it to a Django application for local development and testing.

