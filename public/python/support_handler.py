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
username = sys.argv[1]
email = sys.argv[2]
reason = sys.argv[3]
description = sys.argv[4]

#transorming the reason part in text
if reason == "2" : 
    reason = "connexion issue"
elif reason == "3" : 
    reason ="payment issue"
elif reason == "4" : 
    reason ="report an user"
elif reason == "5" : 
    reason ="other"

#sql command to insert into the database the new values
sql = "INSERT INTO support (email, username,reason, description) VALUES (%s, %s, %s, %s)"
#values that will be used in the insert
val = (email, username, reason, description) 

#prepare the whole command 
db.cursor().execute(sql, val)

#execute the insert
db.commit()

