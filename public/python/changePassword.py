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
newPass = sys.argv[1]
oldPass = sys.argv[2]
username = sys.argv[3]


#sql command to insert into the database the new values
sql = f"UPDATE accounts SET password = %s WHERE password = %s AND username = %s"
#values that will be used in the insert
val = (newPass, oldPass, username) 

#prepare the whole command 
db.cursor().execute(sql, val)

#execute the insert
db.commit()

