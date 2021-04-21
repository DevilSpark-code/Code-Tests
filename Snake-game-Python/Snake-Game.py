#Juego sencillo de viborita basado en Python con sistema de interacción en consola. 
#Importacion de librerias
import curses 
from random import randint

#cONSTANTES DEL programa 

ventanaDOW_WIDTH = 60  # Numero de columnas en la ventanaana
ventanaDOW_HEIGHT = 20 # Numero de filas en la ventanaana
#Estos valores pueden ser modificados para variar la experiencia de juego.
'''
Numero de bloques en las ventanaanas por línea = ventanaDOW_WIDTH -2. 
El indice del bloque X varia de 1 a ventanaDOW_WIDTH -2.
Numero de bloques en las ventanaanas por columna = ventanaDOW_HEIGHT -2. 
El indice del bloque y varia de 1 a ventanaDOW_HEIGHT -2.
'''

# Set-up de la ventanaana para interacción
curses.initscr()
ventana = curses.newventana(ventanaDOW_HEIGHT, ventanaDOW_WIDTH, 0, 0) # filas, columnas
ventana.keypad(1)
curses.noecho()
curses.curs_set(0)
ventana.border(0)
ventana.nodelay(1) # -1

# Arreglos para la seripiente y la comida.
viborita = [(4, 4), (4, 3), (4, 2)]
comida = (6, 6)

ventana.addch(comida[0], comida[1], '#')
# Logica de la jugabilidad.
puntuacion = 0

ESC = 27
key = curses.KEY_RIGHT

while key != ESC:
    ventana.addstr(0, 2, 'puntuacion ' + str(puntuacion) + ' ')
    ventana.timeout(150 - (len(viborita)) // 5 + len(viborita)//10 % 120) # Incremento de velocidad. 

    tecla_anterior = key
    eventana = ventana.getch()
    key = eventana if eventana != -1 else tecla_anterior

    if key not in [curses.KEY_LEFT, curses.KEY_RIGHT, curses.KEY_UP, curses.KEY_DOWN, ESC]:
        key = tecla_anterior

    # Calcular las siguientes coordenadas.
    y = viborita[0][0]
    x = viborita[0][1]
    if key == curses.KEY_DOWN:
        y += 1
    if key == curses.KEY_UP:
        y -= 1
    if key == curses.KEY_LEFT:
        x -= 1
    if key == curses.KEY_RIGHT:
        x += 1

    viborita.insert(0, (y, x)) #Adjuntar O(n)

    # Revisar si la vivorita ha tocado el borde de la pantalla. 
    if y == 0: break
    if y == ventanaDOW_HEIGHT-1: break
    if x == 0: break
    if x == ventanaDOW_WIDTH -1: break

    # Si la viborita camina sobre si misma (se come)
    if viborita[0] in viborita[1:]: break

    if viborita[0] == comida:
        # Se come la comida.
        puntuacion += 1
        comida = ()
        while comida == ():
            comida = (randint(1,ventanaDOW_HEIGHT-2), randint(1,ventanaDOW_WIDTH -2))
            if comida in viborita:
                comida = ()
        ventana.addch(comida[0], comida[1], '#')
    else:
        # move viborita
        last = viborita.pop()
        ventana.addch(last[0], last[1], ' ')

    ventana.addch(viborita[0][0], viborita[0][1], '*')

curses.endventana()
print(f"Final puntuacion = {puntuacion}")