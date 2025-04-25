import os
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()  

class Config:
    
    SQLALCHEMY_DATABASE_URI = (
    "mssql+pyodbc://@BRIAN\SQLEXPRESS/EXAM_REGISTER"
    "?driver=ODBC+Driver+17+for+SQL+Server"
    "&trusted_connection=yes"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False