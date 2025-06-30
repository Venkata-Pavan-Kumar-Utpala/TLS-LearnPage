**Beginner Level MCQs**

**1. During MySQL server installation, what is the commonly used for the default port number 3306?** 

a) admin 

b) password 

c) **root**

d) mysqladmin 

**Answer: c) root**

**2. Which of the following SQL commands is used to named tls\_db?** 

a) ADD DATABASE tls\_db; 

b) NEW DATABASE tls\_db; 

c) MAKE DATABASE tls\_db; 

d) **CREATE DATABASE tls\_db;** 

**Answer: d) CREATE DATABASE tls\_db;**

**3. What is the SQL command to found within the currently selected database?** 

a) SHOW DATABASES; 

b) LIST TABLES; 

c) DISPLAY TABLES; 

d) **SHOW TABLES;** 

**Answer: d) SHOW TABLES;**

**4. The Data Definition Language (DDL) commands are primarily used for what purpose in a database?** 

a) Fetching data from the database 

b) Inserting, updating, and deleting records 

c) **Defining and modifying the structure of database objects like tables, views, indexes, etc.** d) Managing user permissions 

**Answer: c) Defining and modifying the structure of database objects like tables, views, indexes, etc.**

**5. Which SQL command is used to , including all its tables?** 

a) REMOVE DATABASE tls\_db; 

b) **DROP DATABASE tls\_db;** 

c) DELETE DATABASE tls\_db; 

d) ERASE DATABASE tls\_db; 

**Answer: b) DROP DATABASE tls\_db;**

\-------------------------------------------------------------------------------- 

**Intermediate Level MCQs**

**6. To add a new column named total\_marks of type INT with a default value of 0 to an existing table named student, which ALTER TABLE command would you use?** 

a) **ALTER TABLE student ADD COLUMN total\_marks INT DEFAULT 0;** 

b) MODIFY TABLE student ADD total\_marks INT DEFAULT 0; 

c) ADD COLUMN total\_marks INT DEFAULT 0 TO student; 

d) ALTER TABLE student CREATE COLUMN total\_marks INT DEFAULT 0; 

**Answer: a) ALTER TABLE student ADD COLUMN total\_marks INT DEFAULT 0;**

**7. If you want to insert a new student record into the student table but only have values for sid, sname, mobile, and email, what is the correct INSERT statement as shown in the sources?** 

a) INSERT INTO student VALUES (3, 'Sunil', 789654321, 'sunil@gmail.com'); 

b) **INSERT INTO student (sid, sname, mobile, email) VALUES (3, 'Sunil', 789654321, 'sunil@gmail.com');** 

c) INSERT student (sid, sname, mobile, email) DATA (3, 'Sunil', 789654321, 'sunil@gmail.com'); 

d) ADD ROW TO student (sid, sname, mobile, email) VALUES (3, 'Sunil', 789654321, 'sunil@gmail.com'); 

**Answer: b) INSERT INTO student (sid, sname, mobile, email) VALUES (3, 'Sunil', 789654321, 'sunil@gmail.com');**

**8. Which Java class and method combination is explicitly shown in the sources for in a Java application?** 

a) DriverManager.loadDriver() 

b) Connection.loadDriver() 

c) **Class.forName("com.mysql.cj.jdbc.Driver");** 

d) Driver.load() 

**Answer: c) Class.forName("com.mysql.cj.jdbc.Driver");**

**9. When connecting Java with a MySQL database using JDBC, which method of the DriverManager class is used to ?** 

a) Connection.connect() 

b) **DriverManager.getConnection()** 

c) Database.open() 

d) JDBC.createConnection() 

**Answer: b) DriverManager.getConnection()**

**10. In JDBC, which method of the Statement or PreparedStatement object is typically used to execute ?** 

a) executeQuery() 

b) **executeUpdate()** 

c) execute() 

d) executeBatch() 

**Answer: b) executeUpdate()**

\-------------------------------------------------------------------------------- 

**Advanced Level MCQs**

**11. In a Java JDBC program, after executing a SELECT query, how do you from a ResultSet object (e.g., named rs) and retrieve data from columns like sid (integer) and sname (string)?** 

a) Using result.next() and result.getInteger("sid"), result.getString("sname") 

b) Using resultSet.iterate() and resultSet.getInt("sid"), resultSet.getName("sname") 

c) **Using rs.next() in a while loop, and rs.getInt("sid"), rs.getString("sname")** 

d) Using data.fetchNext() and data.getCol("sid"), data.getCol("sname") **Answer: c) Using rs.next() in a while loop, and rs.getInt("sid"), rs.getString("sname")**

**12. Based on the "Real-Life JDBC Scenario-Based Questions" and the JDBC examples, if a student has changed their phone number (stored as BIGINT), and you need to update the mobile number using their student ID via a Java JDBC program with user input, which PreparedStatement approach best reflects the pattern shown in the sources?** 

a) String updateQuery = "UPDATE student SET mobile = " + newMobile + " WHERE sid = " + studentId; ps = con.createStatement(); ps.executeUpdate(updateQuery); 

b) String updateQuery = "UPDATE student SET mobile = ? WHERE sid = ?"; ps = con.prepareStatement(updateQuery); ps.setInt(1, studentId); ps.setLong(2, newMobile); ps.executeUpdate(); 

c) **String updateQuery = "UPDATE student SET mobile = ? WHERE sid = ?"; ps = con.prepareStatement(updateQuery); ps.setLong(1, newMobile); ps.setInt(2, studentId); ps.executeUpdate();**

d) String updateQuery = "UPDATE student SET mobile = :mobile WHERE sid = :sid"; ps = con.prepareStatement(updateQuery); ps.setParam("mobile", newMobile); ps.setParam("sid", studentId); ps.executeUpdate(); 

**Answer: c) String updateQuery = "UPDATE student SET mobile = ? WHERE sid = ?"; ps = con.prepareStatement(updateQuery); ps.setLong(1, newMobile); ps.setInt(2, studentId); ps.executeUpdate();**

**13. The customer table definition includes email VARCHAR(100) NOT NULL UNIQUE. If a Java JDBC program attempts to insert a new record into such a table with an email that already exists, what is the most likely outcome, considering the UNIQUE constraint and the provided JDBC example programs' error handling?** 

a) The program will silently fail to insert the record. 

b) The program will automatically overwrite the existing record with the new one. 

c) **The MySQL database will reject the insertion due to the UNIQUE constraint, and the Java program's executeUpdate() method will likely throw a SQLException, which would be caught and printed by the e.printStackTrace() block.** 

d) The Java program will prompt the user to enter a different email address before attempting the insert. 

**Answer: c) The MySQL database will reject the insertion due to the UNIQUE constraint, and the Java program's executeUpdate() method will likely throw a SQLException, which would be caught and printed by the e.printStackTrace() block.**

