/*admin queries */
UPDATE Admins SET username = ? WHERE username = ?;
UPDATE Admins SET password = ? WHERE username = ?;
SELECT username FROM Admins WHERE username = ?;
SELECT username FROM Admins WHERE password = ? AND username = ?;
INSERT INTO Admins VALUES (?, ?);
SELECT * FROM Events;
SELECT * FROM userData;
DELETE FROM userData WHERE UserId = ?;
DELETE FROM Events WHERE Event_Id = ?;
/* index queries */
SELECT * FROM userData WHERE UserId = ?;
SELECT UserId FROM userData WHERE email = ? AND password = ?;
SELECT email FROM userData WHERE email = ?;
INSERT INTO userData (firstname, lastname, email, emailNotifi, password) VALUES (?, ?, ?, ?, ?);
SELECT username FROM Admins WHERE username = ? AND password = ?;
SELECT Event_Id,HostId FROM Events WHERE Code = ?;
INSERT INTO Participants (First_name,Last_name,Time_availability,Time_availability_Start,Time_availability_End,Event_Id,UserId) VALUES (?,?,?,?,?,?, ?);
SELECT Event_Id FROM Events WHERE Code = ?;
insert into Participants (First_name,Last_name,Time_availability,Time_availability_Start,Time_availability_End,Event_Id) values (?,?,?,?,?,?);
