# Setting Up Grafana with AWS RDS PostgreSQL Database

This guide walks through the end-to-end process of setting up Grafana on an AWS EC2 instance and connecting it securely to an AWS RDS PostgreSQL database.

---

## **1. Setting Up Grafana on EC2**

### **Step 1: Connect to Your EC2 Instance**
SSH into your EC2 instance:
```bash
ssh -i /path/to/your-key.pem ec2-user@<your-ec2-public-dns>
```

### **Step 2: Install Grafana**
1. Add the Grafana repository:
   ```bash
   sudo yum install -y https://dl.grafana.com/oss/release/grafana-9.4.7-1.x86_64.rpm
   ```

2. Install Grafana:
   ```bash
   sudo yum install grafana -y
   ```

3. Start the Grafana service:
   ```bash
   sudo systemctl start grafana-server
   sudo systemctl enable grafana-server
   ```

4. Verify Grafana is running:
   ```bash
   sudo systemctl status grafana-server
   ```

---

## **2. Configuring Security Groups**
### **Step 1: Update Security Group for EC2**
1. Go to the AWS Management Console.
2. Navigate to the **Security Groups** section under **EC2**.
3. Edit the security group attached to your EC2 instance to allow inbound traffic:
   - **Protocol**: TCP
   - **Port Range**: 3000
   - **Source**: Your IP (or `0.0.0.0/0` for testing).

### **Step 2: Update Security Group for RDS**
1. Navigate to **RDS** → **Databases**.
2. Select your database instance.
3. Add an inbound rule to the associated security group:
   - **Protocol**: TCP
   - **Port Range**: 5433
   - **Source**: EC2 instance’s private IP or its security group.

---

## **3. Download AWS RDS Root Certificate**
1. SSH into your EC2 instance:
   ```bash
   ssh -i /path/to/your-key.pem ec2-user@<your-ec2-public-dns>
   ```

2. Download the certificate:
   ```bash
   sudo curl -o /etc/grafana/me-central-1-bundle.pem https://truststore.pki.rds.amazonaws.com/global-bundle.pem
   ```

3. Verify the certificate:
   ```bash
   cat /etc/grafana/me-central-1-bundle.pem
   ```

4. Set appropriate permissions:
   ```bash
   sudo chmod 644 /etc/grafana/me-central-1-bundle.pem
   ```

---

## **4. Test Database Connectivity**
### **Step 1: Using `psql` Command**
Test the connection to your RDS instance with SSL:
```bash
psql "host=<rds-endpoint> port=5433 dbname=<db-name> user=<db-user> sslmode=verify-full sslrootcert=/etc/grafana/me-central-1-bundle.pem"
```

If successful, you should see:
```
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, compression: off)
```

---

## **5. Configure Grafana Data Source**
### **Step 1: Log in to Grafana**
- Open your browser and navigate to:
  ```
  http://<your-ec2-public-dns>:3000
  ```
- Log in using the default credentials:
  - Username: `admin`
  - Password: `admin` (change this immediately).

### **Step 2: Add PostgreSQL Data Source**
1. Go to **Configuration** → **Data Sources** → **Add Data Source**.
2. Select **PostgreSQL**.

### **Step 3: Configure Connection Settings**
Fill in the following details:

| Field                | Value                                                                                   |
|----------------------|-----------------------------------------------------------------------------------------|
| **Host**             | `<rds-endpoint>:5433`                                                                  |
| **Database**         | `<db-name>`                                                                            |
| **User**             | `<db-user>`                                                                            |
| **Password**         | `<db-password>`                                                                        |
| **SSL Mode**         | `verify-full`                                                                          |
| **TLS/SSL Certificate** | `/etc/grafana/me-central-1-bundle.pem`                                              |

3. Save and Test.

---

## **6. Troubleshooting**
### **Issue: `pq: couldn't parse pem in sslrootcert`**
- Ensure the certificate file is correctly formatted:
  ```bash
  cat /etc/grafana/me-central-1-bundle.pem
  ```
- Re-download the certificate:
  ```bash
  sudo curl -o /etc/grafana/me-central-1-bundle.pem https://truststore.pki.rds.amazonaws.com/global-bundle.pem
  ```
- Remove extraneous content (if any):
  ```bash
  sudo nano /etc/grafana/me-central-1-bundle.pem
  ```

### **Issue: `no pg_hba.conf entry`**
- Update the RDS security group to allow access from your EC2 instance’s IP or security group.

---

## **7. Final Security Recommendations**
1. Restrict security group rules to trusted IP addresses.
2. Regularly update Grafana and PostgreSQL to patch security vulnerabilities.
3. Use strong passwords and enable monitoring for RDS and EC2 instances.

---

## **Conclusion**
By following these steps, you’ve set up Grafana on your EC2 instance and connected it securely to an AWS RDS PostgreSQL database with SSL encryption. Let me know if you have further questions or issues!
