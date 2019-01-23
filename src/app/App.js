import React,{Component} from 'react';
import {Moment} from 'moment';
const moment = require('moment');

class App extends Component{
    
    constructor(){
        super();
        this.state={
            Nombre:'',
            Puesto:'',
            Empleados:[],
            _id: ''
        };
        this.agregarEmpleado = this.agregarEmpleado.bind(this);
        this.cambio = this.cambio.bind(this);
    }
    
    agregarEmpleado(e){
        console.log(moment().format('H:mm:ss'));
        if(this.state._id){
            fetch(`/api/tasks/${this.state._id}`,{
                method:'PUT',
                body:JSON.stringify(this.state),
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({html:'Datos Actualizados'});
                    this.setState({
                        Nombre:'',
                        Puesto:'',
                        _id: ''
                    })
                    this.obtenerDatos();
                    
                })
        }else{
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({html: 'Empleado Registrado'});
                    this.setState({Nombre:'',Puesto:''});
                    this.obtenerDatos();
                })
                .catch(err => {
                    console.log(err)
                    M.toast({html:'Hubo un error al registrar'})
                });
        }

        e.preventDefault();
    }

    componentDidMount(){
    this.obtenerDatos();
    }

    obtenerDatos(){
        fetch('/api/tasks')
         .then(res => res.json())
         .then(data => {
             
             this.setState({Empleados:data});
             console.log(this.state.Empleados);
            });
    }

    cambio(e){
        const {name,value} = e.target;
        this.setState({
            [name]:value
        });
    }

    eliminar(id){
        if(confirm('estas seguro de eliminar?')){
            fetch('/api/tasks/'+id,{
                method:'DELETE',
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res => {
                res.json()
                M.toast({html:'Registro Eliminado'})
            })
            .then(data => console.log(data));
            this.obtenerDatos();
    
            console.log('Eliminar :',id);
        }
    }

    editar(id){
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    Nombre: data.Nombre,
                    Puesto: data.Puesto,
                    _id: data._id
                })
            });
    }

    render(){
        return(
            <div>
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">Registro de Personal</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.agregarEmpleado}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input required name="Nombre" onChange={this.cambio} type="text" placeholder="Nombre del trabajador" value={this.state.Nombre}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input required name="Puesto" onChange={this.cambio} type="text" placeholder="Puesto del trabajador" value={this.state.Puesto}/>
                                            </div>
                                        </div>
                                        <button type="Submit" className="btn light-blue darken-4">
                                        Guardar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nombre</th>
                                        <th>Puesto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.Empleados.map(empleado =>{
                                            return(
                                            <tr key={empleado._id}>
                                                <td>{empleado.idEmpleado}</td>
                                                <td>{empleado.Nombre}</td>
                                                <td>{empleado.Puesto}</td>
                                                <td>
                                                    <button className="btn light-blue darken-4" onClick={()=> this.editar(empleado._id)}>
                                                       <i className="material-icons">edit</i>
                                                    </button>
                                                    <button className="btn light-blue darken-4" style={{margin:'4px'}} onClick={()=> this.eliminar(empleado._id)}>
                                                    <i className="material-icons">delete</i>
                                                    </button>
                                                </td>
                                            </tr>)
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </div>
            </div>

        )
    }
}

export default App;
