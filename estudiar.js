//original
function iniciarVibracion() {
    try {
      var modo = document.getElementById("modo").value;
      resetInterno(); // reset sin mensajes
  
      var isPC = !/Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  
      if (!navigator.vibrate) {
        logError("❌ Este navegador no soporta la API de vibración.");
        return;
      }
  
      if (modo === "manual") {
        navigator.vibrate(10000);
        encenderLuz();
        setTimeout(apagarLuz, 10000);
      } else if (modo === "temporizado") {
        navigator.vibrate(5000);
        encenderLuz();
        setTimeout(apagarLuz, 5000);
      } else if (modo === "secuencia") {
        secuenciaIntervalo = setInterval(function () {
          navigator.vibrate([2000, 2000]);
          encenderLuz();
          setTimeout(apagarLuz, 2000);
        }, 4000);
        navigator.vibrate([2000, 2000]);
        encenderLuz();
        setTimeout(apagarLuz, 2000);
      }
    } catch (error) {
      logError("⚠️ Error al iniciar: " + error.message);
    }
  }
  
  function finalizarVibracion() {
    try {
      resetInterno();
  
      var isPC = !/Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isPC) {
        logError("❌ Este dispositivo no tiene vibrador (posiblemente es un PC o portátil).");
        return;
      }
  
      setTimeout(function () {
        if (navigator.vibrate) {
          navigator.vibrate(1);
          setTimeout(function () {
            navigator.vibrate(0);
          }, 1);
        }
        logError("✔️ Finalizar solicitado. Si el dispositivo sigue vibrando, puede ser un retraso del sistema.");
      }, 200);
    } catch (error) {
      logError("⚠️ Error al finalizar: " + error.message);
    }
  }





//nuevo..
/*
vamos a hacer que los modos manual y temporizado usen vibraciones en “bloques cortos” que se puedan interrumpir rápidamente, tal como ya lo hace el modo secuencia.

✅ ¿Qué cambia?
En vez de navigator.vibrate(10000), haremos pequeños pulsos de vibración.

Usamos setInterval para mantener la vibración activa por el tiempo total deseado (10s para manual, 5s para temporizado).

Esto permite que navigator.vibrate(0) interrumpa al instante.
*/
function iniciarVibracion() {
    try {
      var modo = document.getElementById("modo").value;
      resetInterno(); // Limpiar cualquier vibración previa
  
      var isPC = !/Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  
      if (!navigator.vibrate) {
        logError("❌ Este navegador no soporta la API de vibración.");
        return;
      }
  
      if (modo === "manual") {
        // Simulación de 10 segundos de vibración con intervalos
        let tiempoTotal = 10000;
        let paso = 500; // vibrar por 500 ms cada vez
        let acumulado = 0;
        encenderLuz();
        secuenciaIntervalo = setInterval(function(){
          if (acumulado >= tiempoTotal) {
            clearInterval(secuenciaIntervalo);
            secuenciaIntervalo = null;
            apagarLuz();
          } else {
            navigator.vibrate(paso);
            acumulado += paso;
          }
        }, paso);
        navigator.vibrate(paso); // <- ¡Vibración inmediata!
      } else if (modo === "temporizado") {
        // Simulación de 5 segundos de vibración con intervalos
        let tiempoTotal = 5000;
        let paso = 500;
        let acumulado = 0;
        encenderLuz();
        secuenciaIntervalo = setInterval(function(){
          if (acumulado >= tiempoTotal) {
            clearInterval(secuenciaIntervalo);
            secuenciaIntervalo = null;
            apagarLuz();
          } else {
            navigator.vibrate(paso);
            acumulado += paso;
          }
        }, paso);
        navigator.vibrate(paso); // <- ¡Vibración inmediata!
      } else if (modo === "secuencia") {
        // Vibrar 2s, parar 2s, repetir
        secuenciaIntervalo = setInterval(function () {
          navigator.vibrate([2000, 2000]);
          encenderLuz();
          setTimeout(apagarLuz, 2000);
        }, 4000);
        navigator.vibrate([2000, 2000]); // vibración inmediata
        encenderLuz();
        setTimeout(apagarLuz, 2000);
      }
    } catch (error) {
      logError("⚠️ Error al iniciar: " + error.message);
    }
  }
  