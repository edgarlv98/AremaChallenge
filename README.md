## JS / TS
- Usar regexp para validar el siguiente string: `A0129T2019_9A0`
	- Debe de extraer los valores de `0129`, `2019` y `9A0`
	- Usar grupos nombrados

## React
- Crear un hook que pueda incrementar un numero
	- ```var { increment, decrease, setNumber, number } = useNumber();```
	- `increment(3)` debe de sumar 3 a el numero
	- `decrease(8)` debe de restar 8 al numero
	- `setNumber(10)` debe de poner el numero como 10
	- `number` es el valor del numero
	- Usar `useContext`

- Crear un componente de boton que tenga los siguientes estados
	- Color del botón
	- Texto
	- Loading
	- disabled
	- Debe de incluir los props normales como
		- className
		- style
		- onClick

- Crear un componente que use el componente de botón anterior y el hook de numero
	- Cuando se le da click al botón incrementa el numero

## Fullstack
- Crear un login de usuario/contraseña
	- Al hacer el login regresa un JWT
	- El JWT contiene el id del usuario
- Crear un sign up de usuario/contraseña
	- El formulario pide username, password, repetir password