-- Usuarios (admin)
CREATE TABLE users (
  id INT IDENTITY(1,1) PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

-- Clientes
CREATE TABLE customers (
  id INT IDENTITY(1,1) PRIMARY KEY,
  name VARCHAR(100),
  phone VARCHAR(20),
  address TEXT
);

-- Productos
CREATE TABLE products (
  id INT IDENTITY(1,1) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

-- Proveedores
CREATE TABLE suppliers (
  id INT IDENTITY(1,1) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  contact_info TEXT
);

-- Empleados
CREATE TABLE employees (
  id INT IDENTITY(1,1) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(50),
  salary DECIMAL(10, 2),
  active BIT DEFAULT 1
);

-- Repartidores
CREATE TABLE delivery_staff (
  id INT IDENTITY(1,1) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  vehicle_info VARCHAR(100)
);

-- Jornada laboral
CREATE TABLE work_shifts (
  id INT IDENTITY(1,1) PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  opening_amount DECIMAL(10,2) NOT NULL,
  closing_amount DECIMAL(10,2),
  created_by INT,
  notes TEXT,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Gastos del turno
CREATE TABLE shift_expenses (
  id INT IDENTITY(1,1) PRIMARY KEY,
  shift_id INT NOT NULL,
  supplier_id INT,
  description TEXT,
  amount DECIMAL(10,2) NOT NULL,
  created_at DATETIME DEFAULT GETDATE(),
  FOREIGN KEY (shift_id) REFERENCES work_shifts(id) ON DELETE CASCADE,
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);

-- Dinero al delivery
CREATE TABLE delivery_funds (
  id INT IDENTITY(1,1) PRIMARY KEY,
  shift_id INT NOT NULL,
  delivery_staff_id INT NOT NULL,
  amount_assigned DECIMAL(10,2) NOT NULL,
  amount_returned DECIMAL(10,2),
  FOREIGN KEY (shift_id) REFERENCES work_shifts(id) ON DELETE CASCADE,
  FOREIGN KEY (delivery_staff_id) REFERENCES delivery_staff(id)
);

-- Pedidos
CREATE TABLE orders (
  id INT IDENTITY(1,1) PRIMARY KEY,
  customer_id INT,
  shift_id INT,
  delivery_staff_id INT,
  created_at DATETIME DEFAULT GETDATE(),
  status VARCHAR(50),
  total DECIMAL(10, 2),
  payment_method VARCHAR(10) DEFAULT 'efectivo' CHECK (payment_method IN ('efectivo', 'tarjeta')),
  delivered BIT DEFAULT 0,
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (shift_id) REFERENCES work_shifts(id),
  FOREIGN KEY (delivery_staff_id) REFERENCES delivery_staff(id)
);

-- Detalle del pedido
CREATE TABLE order_items (
  id INT IDENTITY(1,1) PRIMARY KEY,
  order_id INT,
  product_id INT,
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);
