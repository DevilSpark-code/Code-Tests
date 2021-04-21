#Creación de un juego de la viborita "Snake" desarrollado en Python. 
#Importacion de librerías necesarias para trabajar con el proyecto en cuestion 
import turtle
import time
import random
#Tiempo de delay de respuesta
delay = 0.1
#Puntuaciones del juego 
Puntuacion = 0
Puntuacion_alta = 0
#Set-Up de la pantalla, definiciones, textos y colores esenciales. 
#Simplificacion de métodos usando vent como variable de acorte. 
vent = turtle.Screen()
vent.title("Juego de la viborita LS")
vent.bgcolor('orange')
vent.setup(width=600, height=600)
vent.tracer(0)

#Cabeza de la viborita
cabeza = turtle.Turtle()
cabeza.speed(0)
cabeza.shape("square")
cabeza.color("black")
cabeza.penup()
cabeza.goto(0,0)
cabeza.direction = "stop"
#Comida viborita
comida= turtle.Turtle()
comida.speed(0)
comida.shape("circle")
comida.color("red")
comida.penup()
comida.goto(0,100)

segments = []

#Tablas de puntuacion
punt = turtle.Turtle()
punt.speed(0)
punt.shape("square")
punt.color("white")
punt.penup()
punt.hideturtle()
punt.goto(0,260)
punt.write("Puntuacion: 0  Puntuacion alta: 0", align = "center", font=("ds-digital", 24, "normal"))

#Funciones de dirección para la tortuga. 
def ir_arriba():
    if cabeza.direction != "down":
        cabeza.direction = "up"
def ir_abajo():
    if cabeza.direction != "up":
        cabeza.direction = "down"
def ir_izq():
    if cabeza.direction != "right":
        cabeza.direction = "left"
def ir_der():
    if cabeza.direction != "left":
        cabeza.direction = "right"
def move():
    if cabeza.direction == "up":
        y = cabeza.ycor()
        cabeza.sety(y+20)
    if cabeza.direction == "down":
        y = cabeza.ycor()
        cabeza.sety(y-20)
    if cabeza.direction == "left":
        x = cabeza.xcor()
        cabeza.setx(x-20)
    if cabeza.direction == "right":
        x = cabeza.xcor()
        cabeza.setx(x+20)

#Atajos de teclado como macros.
vent.listen()
vent.onkeypress(ir_arriba, "w")
vent.onkeypress(ir_abajo, "s")
vent.onkeypress(ir_izq, "a")
vent.onkeypress(ir_der, "d")

#Loop principal de acción de la viborita
while True:
    vent.update()
    #Revisar por colisiones de la cabeza con el borde de la pantalla.
    if cabeza.xcor()>290 or cabeza.xcor()<-290 or cabeza.ycor()>290 or cabeza.ycor()<-290:
        time.sleep(1)
        cabeza.goto(0,0)
        cabeza.direction = "stop"
        #Esconder los segmentos del cuerpo.
        for segment in segments:
            segment.goto(1000,1000) #Fuera de rango.
        #Limpiar los segmentos. 
        segments.clear()
        #Restablecer puntcuacion
        Puntuacion = 0
        #reset delay
        delay = 0.1
        punt.clear()
        punt.write("Puntuacion: {}  Puntuacion alta : {}".format(Puntuacion, Puntuacion_alta), align="center", font=("ds-digital", 24, "normal"))

    #Revisar por colisión con el elemento principal "La comida"
    if cabeza.distance(comida) <20:
        # Mover la comida a un lugar aleatorio dependiendo de la posicion de la tortugita 
        x = random.randint(-290,290)
        y = random.randint(-290,290)
        comida.goto(x,y)

        #Añadir nuevos segmentos a la cabeza
        nueva_cabeza = turtle.Turtle()
        nueva_cabeza.speed(0)
        nueva_cabeza.shape("square")
        nueva_cabeza.color("black")
        nueva_cabeza.penup()
        segments.append(nueva_cabeza)
        
        #Acortar el Delay (velocidad)
        delay -= 0.001
        #incrementa la puntuacion
        Puntuacion += 10
        if Puntuacion > Puntuacion_alta:
            Puntuacion_alta = Puntuacion
        punt.clear()
        punt.write("Puntuacion: {}  Puntuacion alta: {}".format(Puntuacion,Puntuacion_alta), align="center", font=("ds-digital", 24, "normal")) 

    #Mueve los segmentos en orden inverso
    for index in range(len(segments)-1,0,-1):
        x = segments[index-1].xcor()
        y = segments[index-1].ycor()
        segments[index].goto(x,y)
    #Mueve el segmento cero a la cabeza. 
    if len(segments)>0:
        x = cabeza.xcor()
        y = cabeza.ycor()
        segments[0].goto(x,y)
    move()
    #Revisar por colisiones con el cuerpo. 
    for segment in segments:
        if segment.distance(cabeza)<20:
            time.sleep(1)
            cabeza.goto(0,0)
            cabeza.direction = "stop"
            #Esconder los segmentos del cuerpo.
            for segment in segments:
                segment.goto(1000,1000)
            segments.clear()
            Puntuacion = 0
            delay = 0.1
            #Actualizar la puntuación.
            punt.clear()
            punt.write("Puntuacion: {}  High Puntuacion: {}".format(Puntuacion,Puntuacion_alta), align="center", font=("ds-digital", 24, "normal"))
    time.sleep(delay)
vent.mainloop()   