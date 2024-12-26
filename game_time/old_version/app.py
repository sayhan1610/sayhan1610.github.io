from flask import Flask, send_from_directory, render_template
import os
from threading import Thread

app = Flask(__name__, static_folder='static', template_folder='.')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/<path:filename>')
def static_files(filename):
    folder_path = os.path.join(app.root_path, '.')
    return send_from_directory(folder_path, filename)

def run():
    app.run(host='0.0.0.0', port=8080)

if __name__ == '__main__':
    server = Thread(target=run)
    server.start()