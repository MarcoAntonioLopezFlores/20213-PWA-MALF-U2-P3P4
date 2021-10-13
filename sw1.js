self.addEventListener("install", () => {
  console.log("SW: Instalado");
});

self.addEventListener("fetch", (e) => {
  /*const respOffHTML = new Response(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>20213-PWA-MALF-U2-P3P4</title>
    </head>
    <body>  
        <h1>Bienvenido a la pagina offline</h1>
        <p>Para poder usar la app necesitas conexión a internet</p>
    </body>
    </html>
    `,
    {
        headers:{
            'Content-Type':'text/html'
        }
    });*/

  /*const respOff= new Response(`
     Bienvenido  a la pagina offline

     Para poder usar la app necesitas conexión a internet
    `)*/

  //Marcara error por que aun se necesita conexión a internet
  const respOffFile = fetch("./pages/view-offline.html");

  const resp = fetch(e.request).catch(() => {
    console.log("SW: Error en la petición");
    return respOffFile;
  });

  //console.log(e.request.url);
  e.respondWith(resp);
});
