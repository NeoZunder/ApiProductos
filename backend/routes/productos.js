import express from 'express';
import { connectDB, sql } from '../src/config.js'; // Asegúrate de que la ruta sea correcta

const router = express.Router();

router.get('/getProductos',async (req, res) => {
    try{
        await connectDB(); // Conectamos a la base de datos
        const productos = await sql.query('SELECT * FROM Productos');

        // Devolver el resultado
        res.json(productos.recordset); // Respondemos con los productos en formato JSON
    
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).send('Error en el servidor');
    }
    finally {
        sql.close(); // Cerramos la conexión a la base de datos
    }
})

router.get('/getProducto/:id',async (req, res) => {
    try{
        await connectDB(); // Conectamos a la base de datos
        const id = req.params.id; // Obtenemos el ID del producto de los parámetros de la URL
        const producto = await sql.query(`SELECT * FROM Productos WHERE id = ${id}`);
    
        res.json(producto.recordset); // Respondemos con el producto en formato JSON
    } 
    catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).send('Error en el servidor');
    }
    finally {
        sql.close(); // Cerramos la conexión a la base de datos
    }
})

router.get('/getProductoPrecio/:min/:max',async (req, res) => { 

    try{  
        await connectDB();
        const {min, max} = req.params; // Obtenemos los parámetros de la URL
        const query = `SELECT * FROM Productos WHERE precio BETWEEN ${min} AND ${max}`; // Consulta SQL para obtener productos en el rango de precios  
        const productos = await sql.query(query); // Ejecutamos la consulta
        
        res.json(productos.recordset);
    } 
        catch (error) {
            console.error('Error en la consulta:', error);
            res.status(500).send('Error en el servidor');
        }
        finally {
            sql.close(); // Cerramos la conexión a la base de datos
        }
})

router.post('/addProducto', async (req, res) => {
    try {
        // Conectar a la base de datos
        await connectDB();
        // Desestructurar los datos del cuerpo de la solicitud
        const { nombre, descripcion, precio, stock } = req.body;
        

        // Validación básica (puedes agregar más según sea necesario)
        if (!nombre || !descripcion || !precio || !stock) {
            return res.status(400).send("Todos los campos son obligatorios");
        }

        // Consulta SQL parametrizada para prevenir inyección SQL
        const query = `INSERT INTO Productos (nombre, descripcion, precio, stock) 
                       VALUES (@nombre, @descripcion, @precio, @stock)`;

        // Preparar la consulta
        const request = new sql.Request();
        request.input('nombre', sql.NVarChar, nombre);
        request.input('descripcion', sql.NVarChar, descripcion);
        request.input('precio', sql.Decimal, precio);
        request.input('stock', sql.Int, stock);
       

        // Ejecutar la consulta
        await request.query(query);


        // Responder con éxito
        res.status(201).send(`Producto '${nombre}' agregado correctamente`);

    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).send('Error en el servidor');
    } finally {
        // Cerrar la conexión a la base de datos
        sql.close();
    }
});

router.delete('/deleteProducto/:id', async (req, res) => { 
    try {
        await connectDB();
        const {id} = req.params; // Obtener el ID del cuerpo de la solicitud
        // Consulta para obtener el producto antes de eliminarlo
        const getProducto = new sql.Request();
        getProducto.input('id', sql.Int, id); // Asignar el ID a la consulta
        const queryGetProducto = `SELECT nombre FROM Productos WHERE id = @id`;
        const productoResult = (await getProducto.query(queryGetProducto)); // Ejecutar la consulta

        if (productoResult.recordset.length === 0) {
            return res.status(404).send('Producto no encontrado');
        }

        const deleteProducto = new sql.Request();
        deleteProducto.input('id', sql.Int, id); // Asignar el ID a la consulta 
        const queryDeleteProducto = `DELETE FROM Productos WHERE id = @id`;
        await deleteProducto.query(queryDeleteProducto);

        res.send(`Producto "${productoResult.recordset[0].nombre}" eliminado correctamente`);

    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).send('Error en el servidor');
    } finally {
        // Cerrar la conexión a la base de datos
        sql.close();
    }

});

export default router;