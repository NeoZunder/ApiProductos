BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Administradores] (
    [id] INT NOT NULL IDENTITY(1,1),
    [username] VARCHAR(50) NOT NULL,
    [email] VARCHAR(255) NOT NULL,
    [password] VARCHAR(255) NOT NULL,
    [creado_en] DATETIME CONSTRAINT [DF__Administr__cread__17036CC0] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK__Administ__3213E83F9D273C7E] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ__Administ__F3DBC572269E0199] UNIQUE NONCLUSTERED ([username]),
    CONSTRAINT [Administradores_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[productos] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(100) NOT NULL,
    [descripcion] TEXT,
    [precio] DECIMAL(10,2) NOT NULL,
    [stock] INT NOT NULL,
    CONSTRAINT [PK__producto__3213E83FB9750087] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[trabajadores] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [Nombre] NCHAR(10),
    [Telefono] NCHAR(10),
    CONSTRAINT [PK_trabajadores] PRIMARY KEY CLUSTERED ([Id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
