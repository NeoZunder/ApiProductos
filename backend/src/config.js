import sql from 'mssql';

const config = {
  user: 'sa',
  password: 'sa',
  server: "localhost",
  port: 1433,
  database: 'gestor_de_productos',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

const connectDB = async () => {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (err) {
    console.error('Error al conectar con SQL Server:', err);
    throw err;
  }
};

export { connectDB, sql };