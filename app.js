const Usuarios = require ("./js/usuarios")

let obj = new Usuarios();
 obj.getAllUsuario()
    .then(res => { 
        console.log(res);
        })
    .catch(err => {
         console.log(err);
    });