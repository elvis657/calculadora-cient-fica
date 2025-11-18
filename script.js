// --- CONFIGURACIÓN ---
const PASSWORD_CORRECTA = "1234";

// --- ELEMENTOS DEL DOM ---
const passwordSection = document.getElementById("password-section");
const calculatorSection = document.getElementById("calculator-section");
const passwordInput = document.getElementById("password-input");
const btnLogin = document.getElementById("btn-login");
const passwordMessage = document.getElementById("password-message");

const operationSelect = document.getElementById("operation-select");
const inputA = document.getElementById("input-a");
const inputB = document.getElementById("input-b");
const inputBContainer = document.getElementById("input-b-container");
const btnCalcular = document.getElementById("btn-calcular");
const mensajeError = document.getElementById("mensaje-error");
const resultadoBox = document.getElementById("resultado");

// --- LOGIN / PASSWORD ---
btnLogin.addEventListener("click", function () {
    const pass = passwordInput.value.trim();

    if (pass === PASSWORD_CORRECTA) {
        passwordMessage.textContent = "Acceso permitido.";
        passwordMessage.className = "small-text success";

        // Mostrar calculadora y ocultar sección de password
        calculatorSection.classList.remove("hidden");
        passwordSection.classList.add("hidden");
    } else {
        passwordMessage.textContent = "Contraseña incorrecta. Intenta de nuevo.";
        passwordMessage.className = "small-text error";
    }
});

// --- MOSTRAR / OCULTAR SEGUNDO NÚMERO SEGÚN OPERACIÓN ---
function actualizarVisibilidadInputB() {
    const op = operationSelect.value;

    // Estas operaciones usan dos números: a y b
    const usaDosNumeros = ["suma", "resta", "multiplicacion", "division", "potencia"];

    if (usaDosNumeros.includes(op)) {
        inputBContainer.style.display = "block";
    } else {
        inputBContainer.style.display = "none";
    }
}

operationSelect.addEventListener("change", actualizarVisibilidadInputB);

// Inicial
actualizarVisibilidadInputB();

// --- FUNCIÓN PARA LEER NÚMEROS CON VALIDACIÓN ---
function leerNumero(valorTexto, nombre) {
    const numero = parseFloat(valorTexto.replace(",", ".")); // permite coma
    if (isNaN(numero)) {
        throw new Error("El valor de '" + nombre + "' no es un número válido.");
    }
    return numero;
}

// --- CALCULAR RESULTADO ---
btnCalcular.addEventListener("click", function () {
    mensajeError.textContent = "";
    resultadoBox.textContent = "";
    resultadoBox.classList.add("hidden");

    const op = operationSelect.value;

    try {
        let a = leerNumero(inputA.value, "Número a");
        let b, resultado, textoOperacion;

        // Operaciones con dos números
        if (["suma", "resta", "multiplicacion", "division", "potencia"].includes(op)) {
            b = leerNumero(inputB.value, "Número b");
        }

        switch (op) {
            case "suma":
                resultado = a + b;
                textoOperacion = `Suma: ${a} + ${b}`;
                break;
            case "resta":
                resultado = a - b;
                textoOperacion = `Resta: ${a} - ${b}`;
                break;
            case "multiplicacion":
                resultado = a * b;
                textoOperacion = `Multiplicación: ${a} × ${b}`;
                break;
            case "division":
                if (b === 0) {
                    throw new Error("No se puede dividir entre cero.");
                }
                resultado = a / b;
                textoOperacion = `División: ${a} ÷ ${b}`;
                break;
            case "potencia":
                resultado = Math.pow(a, b);
                textoOperacion = `Potencia: ${a} ^ ${b}`;
                break;
            case "raiz":
                if (a < 0) {
                    throw new Error("No se puede calcular la raíz cuadrada de un número negativo.");
                }
                resultado = Math.sqrt(a);
                textoOperacion = `Raíz cuadrada de ${a}`;
                break;
            case "seno":
                resultado = Math.sin(a * Math.PI / 180); // grados a radianes
                textoOperacion = `Seno de ${a}°`;
                break;
            case "coseno":
                resultado = Math.cos(a * Math.PI / 180);
                textoOperacion = `Coseno de ${a}°`;
                break;
            case "tangente":
                resultado = Math.tan(a * Math.PI / 180);
                textoOperacion = `Tangente de ${a}°`;
                break;
            case "log10":
                if (a <= 0) {
                    throw new Error("El logaritmo base 10 solo está definido para números mayores que 0.");
                }
                resultado = Math.log10(a);
                textoOperacion = `Logaritmo base 10 de ${a}`;
                break;
            case "ln":
                if (a <= 0) {
                    throw new Error("El logaritmo natural solo está definido para números mayores que 0.");
                }
                resultado = Math.log(a);
                textoOperacion = `Logaritmo natural (ln) de ${a}`;
                break;
            default:
                throw new Error("Operación no reconocida.");
        }

        resultadoBox.innerHTML = `
            <strong>${textoOperacion}</strong><br>
            Resultado: <strong>${resultado}</strong>
        `;
        resultadoBox.classList.remove("hidden");

    } catch (err) {
        mensajeError.textContent = err.message;
    }
});
