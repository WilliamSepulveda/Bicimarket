const { ObjectId } = require('mongodb');
const connect = require('../db/connect');

module.exports = class Usuarios extends connect {
    collectionUsuarios;

    constructor() {
        super();
        this.collectionUsuarios =('usuarios');
    }
    async getAllUsuario(projection) {
        await this.open();   
        this.collectionUsuarios = this.db.collection('usuario');        
        let res = await this.collectionUsuarios.find({}).project(projection).toArray();
        await this.conection.close();  
        return res;
    }
}