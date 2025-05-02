import os
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()  

class Config:
    SQLALCHEMY_DATABASE_URI = (
    "mssql+pyodbc://@DESKTOP-O4BUD71\\MIN/Exam_Register"
    "?driver=ODBC+Driver+17+for+SQL+Server"
    "&trusted_connection=yes"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False