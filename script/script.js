const form = document.getElementById('form') // A declaração const cria uma variável cujo o valor é fixo, ou seja, uma constante somente leitura. Isso não significa que o valor é imutável, apenas que a variável constante não pode ser alterada ou retribuída. 
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById( 'password')
const passwordConfirmation = document.getElementById('password-confirmation')

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkInputs();
});

//addEventListener() registra uma única espera de evento em um único alvo. O alvo do evento (en-US) pode ser um único elemento (en-US) em um documento, o documento (en-US) em si, uma janela (en-US), ou um XMLHttpRequest.

// .preventDefault(): Cancela o evento se for cancelável, sem parar a propagação do mesmo.

function checkInputs() {
    const usernameValue = username.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const passwordConfirmationValue = passwordConfirmation.value;

    if (usernameValue === '') {
        setErrorFor(username, 'O nome do usuário é obrigatório.');
    } else {
        setSuccessFor(username);
    }

    if (emailValue === '') {
        setErrorFor(email, 'O email é obrigatório');
    } else if(!checkEmail(emailValue)) {
        setErrorFor(email, 'Por favor, insira um email válido.')
    } else {
        setSuccessFor(email)
    }

    if (passwordValue === '') {
        setErrorFor(password, 'A senha é obrigatória.')
    } else if(passwordValue.length < 7) {
        setErrorFor(password, 'A senha precisa ter no mínimo 7 caracteres.')
    } else {
        setSuccessFor(password);
    }

    if (passwordConfirmationValue === '') {
        setErrorFor(passwordConfirmation, 'A confirmação de senha é obrigatório')
    } else if(passwordConfirmationValue != passwordValue) {
        setErrorFor(passwordConfirmation, 'As senhas não conferem.');
    } else{
        setSuccessFor(passwordConfirmation);
    }

    const formControls = form.querySelectorAll('.form-control'); // Retorna uma lista de elementos presentes no documento (usando ordenação em profundidade, pré-ordenada e transversal dos nós do documento) que coincidam com o grupo de seletores especificado. O objeto retornado é uma NodeList.

    // O método every() testa se todos os elementos do array passam pelo teste implementado pela função fornecida. Este método retorna um valor booleano.
    const formIsValid = [... formControls].every ((formControl) => {
        return (formControl.class === 'form-control success');
    });

    if (formIsValid) {
        console.log('O formulário está 100% válido!')
    }

}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    // Adiciona a mensagem de erro 
    small.innerText = message;

    // Adiciona a classe de erro 
    formControl.className = 'form-control error';
}

function setSuccessFor(input) {
    const formControl = input.parentElement;

    // Adicionar a classe de sucesso
    formControl.className = 'form-control success';
}

function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
    }