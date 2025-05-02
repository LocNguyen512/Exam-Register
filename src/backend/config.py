import os
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()  

class Config:
    
    SQLALCHEMY_DATABASE_URI = (
<<<<<<< Updated upstream

    "mssql+pyodbc://@DESKTOP-O4BUD71\\MIN/EXAM_REGISTER"
    "?driver=ODBC+Driver+17+for+SQL+Server"
    "&trusted_connection=yes"
=======
    "mssql+pyodbc://@LAPTOP-P8ETI0BS\SQLEXPRESS1/EXAM_REGISTER"
        "?driver=ODBC+Driver+17+for+SQL+Server"
        "&trusted_connection=yes"
>>>>>>> Stashed changes
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False