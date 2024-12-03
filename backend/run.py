from app import create_app
from app.utils.auth import Auth

# Cria a aplicação
app = create_app()

# Cria a instância de Auth passando o app
auth = Auth()

@app.route('/')
def index():
    return "Running"

if __name__ == '__main__':
    app.run(debug=True)
