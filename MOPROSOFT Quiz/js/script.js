//Haciendo la selección de todos los elementos requeridos.
//Botones para el cuestionario
const start_btn = document.querySelector(".start_btn button");
const start_btn2 = document.querySelector(".start_btn2");
const start_btn3 = document.querySelector(".start_btn3");
const start_btn4 = document.querySelector(".start_btn4");
const start_btn5 = document.querySelector(".start_btn5");
const start_btn6 = document.querySelector(".start_btn6");
const start_btn7 = document.querySelector(".start_btn7");
const start_btn8 = document.querySelector(".start_btn8");
const start_btn9 = document.querySelector(".start_btn9");
let alpha_t = "";
////////////////////////////////
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// Si se hace click sobre el boton Start
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //Muestra la caja de información disponible
    alpha_t=questions;
}
start_btn2.onclick = ()=>{
    info_box.classList.add("activeInfo"); //Muestra caja de info
    alpha_t=questions2;
}
start_btn3.onclick = ()=>{
    info_box.classList.add("activeInfo"); //Muestra caja de info
    alpha_t=questions3;
}
start_btn4.onclick = ()=>{
    info_box.classList.add("activeInfo"); //Muestra caja de info
    alpha_t=questions4;
}
start_btn5.onclick = ()=>{
    info_box.classList.add("activeInfo"); //Muestra caja de info
    alpha_t=questions5;
}
start_btn6.onclick = ()=>{
    info_box.classList.add("activeInfo"); //Muestra caja de info
    alpha_t=questions6;
}
start_btn7.onclick = ()=>{
    info_box.classList.add("activeInfo"); //Muestra caja de info
    alpha_t=questions7;
}
start_btn8.onclick = ()=>{
    info_box.classList.add("activeInfo"); //Muestra caja de info
    alpha_t=questions8;
}
start_btn9.onclick = ()=>{
    info_box.classList.add("activeInfo"); //Muestra caja de info
    alpha_t=questions9;
}
// Si se selecciona el boton de salir
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //Oculta la caja de informacion disponible
}

// Si se hace click sobre el boton de continuar cuestionario
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //Esconde la caja de información
    quiz_box.classList.add("activeQuiz"); //Muestra la caja del cuestionario
    showQuetions(0); // funcion para MostrarPreguntas
    queCounter(1); //pasando parametros al contador principal del cuestionario
    startTimer(15); //llamando a la funcion que inicia el contador
    startTimerLine(0); //llamando a la función que controla la linea de progreso.
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// Si se hace click sobre el boton para reiniciar.
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //Mostrar la caja del cuestionario
    result_box.classList.remove("activeResult"); //Esconder la caja de resultados
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //llamar a la función que muestra las preguntas
    queCounter(que_numb); //pasando el valor de la que_numb al queCounter para hacer el recuento
    clearInterval(counter); //Limpiar contador
    clearInterval(counterLine); //Limpiar lla linea del contador
    startTimer(timeValue); //Llamar a la función para iniciar el contador
    startTimerLine(widthValue); //Llamando a la funcion para iniciar la linea del contador
    timeText.textContent = "Tiempo Restante"; //Se cambia el TimeText por el Tiempo restante necesario.
    next_btn.classList.remove("show"); //hide the next button
}

// Si se activa el botón de Abandonar Quiz
quit_quiz.onclick = ()=>{
    window.location.reload(); //Recargar la ventana actual
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// Si se hace click sobre el botón de "Siguiente pregunta"
next_btn.onclick = ()=>{
    if(que_count < alpha_t.length - 1){ //Poner un limite sobre las preguntas en relación al total de las mismas
        que_count++; //Incrementar el valor del que_count
        que_numb++; //Incrementar el valor del que_numb
        showQuetions(que_count); //llamar a la funcion para mostrar las preguntas
        queCounter(que_numb); //passando el valor de que_numb al contador
        clearInterval(counter); //Limpiar contador
        clearInterval(counterLine); //Limpiar la linea del contador
        startTimer(timeValue); //Llamar a la funcion para iniciar el contador
        startTimerLine(widthValue); //Llamar a la funcion para iniciar la linea
        timeText.textContent = "Tiempo Restante"; //Cambiar el timeText por el tiempoo restante 
        next_btn.classList.remove("show"); //Ocultar el boton para la siguiente pregunta
    }else{
        clearInterval(counter); //Limpiar contador
        clearInterval(counterLine); //Limpiar lineadel contador
        showResult(); //Llamar a funcion de mostrar resultados
    }
}

// Obteniendo las preguntas y respuestas de un Array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //creando una nueva etiqueta span y div para la pregunta y la opción y pasando el valor usando el índice del Array
    let que_tag = '<span>'+ alpha_t[index].numb + ". " + alpha_t[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ alpha_t[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ alpha_t[index].options[1] +'</span></div>'
    que_text.innerHTML = que_tag; //Añadiendo un nuevo span en la que_tag
    option_list.innerHTML = option_tag; //Añadiendo un nuevo div en la option_tag
    
    const option = option_list.querySelectorAll(".option");

    // definir en click la definición para cada uno de las opciones
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// Crear nuevas etiquetas para las etiquetas de acertado o fallido
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//Si el usuario ha seleccionado una respuesta
function optionSelected(answer){
    clearInterval(counter); //Limpiar el contador
    clearInterval(counterLine); //Limpiar la lindea del contador
    let userAns = answer.textContent; //Obtener la opción selleccionada por el usuario
    let correcAns = alpha_t[que_count].answer; //Obteniendo la opción correcta del array
    const allOptions = option_list.children.length; //Obteniendo todos los items para las opciones
    
    if(userAns == correcAns){ //Si la opción seleccionada por el usuario es acertada
        userScore += 1; //Subir el valor de la puntuación con 1
        answer.classList.add("correct"); //añadiendo color verde a la respuesta "correcta"
        answer.insertAdjacentHTML("beforeend", tickIconTag); //añadiendo el ícono del tick para la opción correcta
        console.log("Respuesta correcta");
        console.log("Tus respuestas correctas hasta ahora = " + userScore);
    }else{
        answer.classList.add("incorrect"); //Seleccionando color rojo para la respuesta incorrecta
        answer.insertAdjacentHTML("beforeend", crossIconTag); //añadiendo la cruz a la respuesta incorrecta
        console.log("Respuesta incorrecta");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //Si hay una opción disponible dentro del arreglo funcional
                option_list.children[i].setAttribute("class", "option correct"); //añadir color verde a la respuesta "correcta"
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //añadir el tick a la respuesta "correcta"
                console.log("Auto marcado de respuesta correcta");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //Una vez que el usuario selecciona una respuesta, deshabilitar las demás
    }
    next_btn.classList.add("show"); //Mostrar el botón para continuar si el usuario seleccionó alguna opción especial. 
}

function showResult(){
    // variable de promediado de resultados 
    var percentage = ((userScore/alpha_t.length) *100 );
    info_box.classList.remove("activeInfo"); //Esconder la caja de información
    quiz_box.classList.remove("activeQuiz"); //Esconder la caja del cuestionario
    result_box.classList.add("activeResult"); //Mostrar la caja de Resultados
    const scoreText = result_box.querySelector(".score_text");
    if (percentage > 80){ 
       
        let scoreTag = '<span>Felicitaciones! ,Conseguiste <p>'+ userScore +'</p> de <p>'+ alpha_t.length +'</p></span>';
        scoreText.innerHTML = scoreTag; 
    }
    else if(percentage > 50){ 
        let scoreTag = '<span>Bien! , Obtuviste <p>'+ userScore +'</p> de <p>'+ alpha_t.length +'</p> aunque podrías mejorar</span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 15
        let scoreTag = '<span>Lo sentimos , Solamente obtuviste <p>'+ userScore +'</p> de <p>'+ alpha_t.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //Cambiando el valor del tiempo con el contador 
        time--; //Decremento del contador
        if(time < 9){ //Si el contador tiene menos de nueve
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //Añade un cero al izquierda 
        }
        if(time < 0){ //Si el contador ha llegado a menos de cero
            clearInterval(counter); //Limpiar contador
            timeText.textContent = "Tiempo Agotado"; //Cambiar el Tiempo Restante Por tiempo Agotado
            const allOptions = option_list.children.length; //Obten todos los items de opciones
            let correcAns = alpha_t[que_count].answer; //Obtener la respuesta correcta del Array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //Si hay una opcion que coinicida con el input del usuario
                    option_list.children[i].setAttribute("class", "option correct"); //Añadir verde a la respuesta "correctas"
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //Añadir el tick a la respuesta "correcta"
                    console.log("Tiempo Agotado, respuesta marcada automaticamente");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //Cuando el usuario seleccione una respuesta, deshabilitar el resto
            }
            next_btn.classList.add("show"); //Mostrar el boton de Siguiente si el usuario tomo una decision
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //Aumentar el valor del temporizador con 1 
        time_line.style.width = time + "px"; //Incrementando el valloor de time_lline con px mas el tiempo
        if(time > 549){ //Ei el tiempo es mayor a 549
            clearInterval(counterLine); //Limpiar el contador
        }
    }
}

function queCounter(index){
    //Crear en el footer una nueva etiqueta para definir el tota de preguntas y el progreso
    let totalQueCounTag = '<span><p>'+ index +'</p> de <p>'+ alpha_t.length +'</p> Preguntas</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //Añadir nueva etiqueta debajo del contador.
}