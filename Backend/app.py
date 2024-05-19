from flask import Flask, jsonify, request, render_template
import numpy as np
import pandas as pd
from pandas_datareader import data as pdr
from time import sleep
from datetime import datetime
import yfinance as yf
import sqlite3
import threading
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)

# User Database initiated using sqlite
conn = sqlite3.connect('./users.db', check_same_thread=False)
c = conn.cursor()
# Create table if it doesn't exist
c.execute('''CREATE TABLE IF NOT EXISTS users
             (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT)''')
c.execute('''CREATE TABLE IF NOT EXISTS REL
             (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT)''')
c.execute('''CREATE TABLE IF NOT EXISTS TATA
             (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT)''')
c.execute('''CREATE TABLE IF NOT EXISTS HDFC
             (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT)''')
c.execute('''CREATE TABLE IF NOT EXISTS SBI
             (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT)''')
c.execute('''CREATE TABLE IF NOT EXISTS ARTL
             (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT)''')
c.execute('''CREATE TABLE IF NOT EXISTS ICICI
             (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT)''')
conn.commit()

@app.route('/users/<string:table_name>', methods=['GET'])
def get_users(table_name):
    try:
        rows = c.execute(f"SELECT * FROM {table_name}").fetchall()
        users = [{'id': row[0], 'email': row[1]} for row in rows]
        return jsonify(users)
    except sqlite3.OperationalError as e:
        if "no such table" in str(e):
            return jsonify({'error': f'Table {table_name} does not exist'}), 404
        else:
            return jsonify({'error': str(e)}), 500

@app.route('/users/<string:table_name>', methods=['POST'])
def add_user(table_name):
    email = request.json.get('email')
    if email:
        try:
            c.execute(f"INSERT INTO {table_name} (email) VALUES (?)", (email,))
            conn.commit()
            return jsonify({'message': f'User added successfully to {table_name} table'}), 201
        except sqlite3.OperationalError as e:
            if "no such table" in str(e):
                return jsonify({'error': f'Table {table_name} does not exist'}), 404
            else:
                return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Email is required'}), 400
    

@app.route('/users/<string:table_name>/<string:email>', methods=['DELETE'])
def delete_user(table_name, email):
    try:
        c.execute(f"DELETE FROM {table_name} WHERE email = ?", (email,))
        conn.commit()
        if c.rowcount > 0:
            return jsonify({'message': f'User with email {email} deleted successfully from {table_name} table'})
        else:
            return jsonify({'error': 'User not found'}), 404
    except sqlite3.OperationalError as e:
        if "no such table" in str(e):
            return jsonify({'error': f'Table {table_name} does not exist'}), 404
        else:
            return jsonify({'error': str(e)}), 500


@app.route('/admin', methods=['GET', 'POST'])
def admin_dashboard():
    global varA, varB  # Access the global variables

    if request.method == 'POST':
        # Update the values of varA and varB from the form data
        varA = float(request.form.get('varA', varA))
        varB = float(request.form.get('varB', varB))

    # Render the admin dashboard template with the current values of varA and varB
    return render_template('admin.html', varA=varA, varB=varB)


def send_mail(table_name):
    # Sending mails to database stored mails using smtplib library
    emails = [row[0] for row in c.execute(f"SELECT email FROM {table_name}")]
    print(emails)
    # Configure SMTP server details
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    smtp_username = "ixperimentals.misc@gmail.com"
    smtp_password = "mlup ghfn xglt avsj"

    # Create a secure SMTP connection
    server = smtplib.SMTP(smtp_server, smtp_port)
    server.starttls()
    server.login(smtp_username, smtp_password)

    # Construct the email message
    msg = MIMEMultipart()
    msg["Subject"] = "Stock/Forex Alert"
    msg["From"] = smtp_username
    msg["To"] = ", ".join(emails)
    msg.attach(MIMEText("Stock price or forex rate condition met. Please check the application."))

    # Send the email to all recipients
    server.send_message(msg)
    print(f"Emails sent to: {', '.join(emails)}")

    server.quit()



yf.pdr_override()
varA = 123
varB = 234
stock = "AMZN"



def monitor_stocks_thread():
    # Create a new SQLite connection for this thread
    thread_conn = sqlite3.connect('users.db', check_same_thread=False)
    thread_c = thread_conn.cursor()

    yf.pdr_override()
    # varA = 0
    # varB = 0
    stock = "AMZN"
    global varA, varB 

    while True:
        df = yf.download(tickers=stock, period='1d', interval='1m')
        forex_data = yf.download(tickers="USDINR=X", period="1d", interval="1m")
        print("USDINR: ")
        if forex_data.iloc[-1]['Low'] > varA:
            # send_mail() to emails in table REL
            send_mail("REL")
        elif df.iloc[-1]['High'] > varB:
            # send_mail() to emails in table REL
            send_mail("REL")
        print("AMAZON: ")
        sleep(60)

    thread_conn.close()


# @app.route('/monitor_stocks', methods=['GET'])
# def monitor_stocks():
#     while True:
#         df = yf.download(tickers=stock, period='1d', interval='1m')
#         forex_data = yf.download(tickers="USDINR=X", period="1d", interval="1m")
#         print("USDINR: ")
#         if forex_data.iloc[-1]['Low'] > varA:
#             send_mail()
#         print("AMAZON: ")
#         if df.iloc[-1]['High'] > varB:
#             send_mail()
#         sleep(60)
#     return 'Monitoring stocks'

if __name__ == '__main__':
    monitoring_thread = threading.Thread(target=monitor_stocks_thread)
    monitoring_thread.start()
    app.run(debug=True)