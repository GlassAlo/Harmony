#import 2 elements that we will use
import mysql.connector 
import sys

#creating a connection to the database  
db = mysql.connector.connect(
    host= 'localhost',
    user= 'root',
    password= '@Q>ZmA1vDMf!4Tm#dz3(',
    database= 'interface'
)

#receiving all the arguments from the form (using node js to grab them and send them here)
newUsername = sys.argv[1]
oldUsername = sys.argv[2]

#sql command to insert into the database the new values
sql = f"UPDATE accounts SET username = %s WHERE username = %s"
val = (newUsername, oldUsername)

#prepare the whole command 
db.cursor().execute(sql, val)

#execute the insert
db.commit()

