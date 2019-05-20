let curso = [{
    id_c:1,
    nombre:"Excel Financiero",
    duracion:"21 días",
    valor: 125000,
},
{
    id_c:2,
    nombre:"node js",
    duracion:"1 mes",
    valor: 0,
},
{
    id_c:3,
    nombre:"Psicografología",
    duracion:"2 meses",
    valor: 200000,
}];
  
let Informacion=(id,n,d,v,callback)=>{
        let info_curso = ("El id es "+id+", el curso se llama "+n+" tiene una duracion de "+d+" y un valor de "+v+" pesos.");
        callback(info_curso);
}


let i=0;
function Informe(){
    setTimeout(function(){
        Informacion(curso[i].id_c, curso[i].nombre, curso[i].duracion, curso[i].valor,function(info_curso){console.log(info_curso)});
        i++;
        if(i<curso.length){
            Informe();
        }
    },2000);  
}


const datos={
    id_curso:{
        default:0,
        alias:'id',
        demand:true
    },
    nombre_interesado:{
        alias:'n',
        demand:true
    },
    cedula:{
        alias:'cc',
        demand:true
    }
}

const argv = require('yargs')
            .command('inscribir','Inscribir datos del interesado',datos)
            .argv

idv=argv.id            
let curEnc = curso.find(arr => arr.id_c==idv);


if(curEnc!=undefined){
    c=curso[argv.id];
    const fs = require('fs');
    let crearArchivo = (datos) =>{
        texto = 'El estudiante ' + argv.n + '\n' +
                'con cedula '+ argv.cc +'\n' +
                'Se ha matriculado en el curso llamado ' + curEnc.nombre; 
                fs.writeFile("matricula.txt", texto, (err) => {
        if (err) throw (err);
            console.log('se ha creado el archivo')
        });
    }
    crearArchivo(datos);
}
else if(curEnc==undefined&&argv.id>0){
    console.log('El id no corresponde a ningun curso')
}
else{
    Informe();
}