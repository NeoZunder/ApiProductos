import express from 'express';
import { connectDB, sql } from '../src/config.js'; // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Rutas relacionadas con trabajadores
router.get('/getAllTrabajadores', async (req, res) => {
  try {

    await connectDB();
    const request = new sql.Request();
    const result = await request.query('SELECT * FROM trabajadores');

    res.json(result.recordset);

  } catch (error) {
    
    console.error('Error al consultar trabajadores:', error);
    res.status(500).send('Error en el servidor');

  } finally {
    sql.close();
  }
});

router.get('/getTrabajadorByTel/:tel', async (req, res) => {
  try {
    await connectDB();

    const { tel } = req.params; // Obtenemos el teléfono del trabajador de los parámetros de la URL
    const request = new sql.Request();
    const result = await request.query(`SELECT * FROM trabajadores WHERE telefono = ${tel}`)

    res.json(result.recordset);

  } catch (error) {
    
    console.error('Error al consultar trabajadores:', error);
    res.status(500).send('Error en el servidor');

  } finally {
    sql.close();
  }
});

router.post('/postTrabajador', async (req, res) => {

  try{

    await connectDB(); // Conectamos a la base de datos
    
    const { nombre, telefono } = req.body; // Obtenemos el nombre y teléfono del cuerpo de la solicitud
    const request = new sql.Request();
      request.input('nombre', sql.VarChar, req.body.nombre, nombre); // Obtenemos el nombre del cuerpo de la solicitud
      request.input('telefono', sql.VarChar, req.body.telefono, telefono); // Obtenemos el teléfono del cuerpo de la solicitud

      if (!nombre || !telefono ) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    const query = `INSERT INTO trabajadores (nombre, telefono) VALUES (@nombre, @telefono)`; // Consulta SQL para insertar un nuevo trabajador
    await request.query(query); // Ejecutamos la consulta 
    
    res.send(`Se ha agregado un nuevo trabajador
      nombre: ${nombre},
      telefono: ${telefono}`); // Respondemos con un mensaje de éxito

  } catch (error) {
    console.error('Error al agregar trabajador:', error);
    res.status(500).send('Error en el servidor');

  } finally {
    sql.close();
  }
    
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Actualizando el producto con ID: ${id}`);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Eliminando el producto con ID: ${id}`);
});

export default router;