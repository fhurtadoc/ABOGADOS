CREATE DATABASE tuderechoya;

USE tuderechoya;

CREATE TABLE usuarios(
    id_usuarios INT (100)  AUTO_INCREMENT NOT NULL,    
    nombres VARCHAR (255) NOT NULL,
    apellidos VARCHAR (255) NOT NULL,    
    telefono VARCHAR (255) NOT NULL,    
    CONSTRAINT pk_id_usuarios PRIMARY KEY (id_usuarios)    
);

INSERT INTO usuarios VALUES(NULL, 'carlos', 'hurtado', 'carlos@gmail.com', '310345453');

CREATE TABLE abogados(
    id_abogados INT (100) AUTO_INCREMENT NOT NULL,    
    nombres VARCHAR (255) NOT NULL,
    apellidos VARCHAR (255) NOT NULL,
    tarjetaP VARCHAR (255) NOT NULL,
    especilidad VARCHAR (255) NOT NULL,    
    telefono VARCHAR (255) NOT NULL,
    costohora VARCHAR (255) NOT NULL,
    imagen VARCHAR (300) NOT NULL,    
    CONSTRAINT pk_id_abogados PRIMARY KEY (id_abogados)    
);

INSERT INTO abogados VALUES (NULL, 'fabio','hurtado', '24023', 'pensiones', 
'3143934204', 10000, NULL);

CREATE TABLE username_abog(
    id INT (100)  AUTO_INCREMENT NOT NULL,
    id_abogado INT (100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PASSWORD VARCHAR(255) NOT NULL,
    CONSTRAINT pk_id PRIMARY KEY (id),    
    CONSTRAINT fk_abogado FOREIGN KEY (id_abogado) REFERENCES abogados(id_abogados),
    CONSTRAINT uq_email UNIQUE(email), 
    CONSTRAINT uq_abogado UNIQUE(id_abogado)
);

INSERT INTO username_abog VALUES( NULL, 11, 'fhurtadoc', '1234');

CREATE TABLE username_user(
    id INT (100) AUTO_INCREMENT NOT NULL,
    id_usuario INT (100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PASSWORD VARCHAR(255) NOT NULL,
    CONSTRAINT pk_id PRIMARY KEY (id),        
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuarios),
    CONSTRAINT uq_email UNIQUE(email), 
    CONSTRAINT uq_usuario UNIQUE(id_usuario)
);

INSERT INTO username_user VALUES(NULL, 1, 'CARH', '1234');

CREATE TABLE plantillas(
    id_plantillas INT (100) AUTO_INCREMENT NOT NULL,    
    nombre  VARCHAR (255) NOT NULL,
    descripcion VARCHAR (255) NOT NULL,
    cetegoria VARCHAR (255) NOT NULL,    
    ruta VARCHAR(255) NOT NULL,
    CONSTRAINT pk_id_plantillas PRIMARY KEY(id_plantillas)    
)ENGINE=InnoDb;

INSERT INTO plantillas VALUES(NULL, 'Derecho de peticion', 'derecho de peticion',
'laboral', 'aaa');


CREATE TABLE consultas(
    id_consultas INT(100) AUTO_INCREMENT NOT NULL,
    id_usuario INT(100) NOT NULL,
    id_abogado INT(100) NOT NULL,
    costo INT (100) NULL,
    horas INT (100) NULL,
    CONSTRAINT pk_consultas PRIMARY KEY(id_consultas),
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuarios),
    CONSTRAINT fk_abogado FOREIGN KEY (id_abogado) REFERENCES abogados(id_abogados)
);

INSERT INTO consultas VALUES(NULL, 1, 1, 1, 0 );


CREATE TABLE entradas (
    id_entradas INT (100) AUTO_INCREMENT NOT NULL,        
    id_abogado INT (100) NOT NULL,
    categoria VARCHAR (255) NOT NULL,
    titulo VARCHAR (255) NOT NULL,
    descripcion MEDIUMTEXT NOT NULL,
    fecha DATE NOT NULL,
    CONSTRAINT pk_id_entradas PRIMARY KEY(id_entradas),        
    CONSTRAINT fk_abogado FOREIGN KEY (id_abogado) REFERENCES usuarios(id_abogados)
);

INSERT INTO entradas VALUES (NULL, 1, 'derecho laboral', 'pensin sancion', 
'que es la pension sancion',  CURDATE());

CREATE TABLE comentarios(
    id INT (100) AUTO_INCREMENT NOT NULL,
    id_entradas INT(100) NOT NULL,
    id_usuarios INT (100) NOT NULL,
    comentario MEDIUMTEXT NOT NULL, 
    CONSTRAINT pk_id PRIMARY KEY(id),   
    CONSTRAINT fk_entradas FOREIGN KEY (id_entradas) REFERENCES entradas(id_entradas),
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuarios) REFERENCES usuarios(id_usuarios)
);

INSERT INTO comentarios VALUES(NULL, 1, 1, 'no me parece lo que dice');

CREATE TABLE actions(
    id_actions INT (100) AUTO_INCREMENT NOT NULL,
    id_entrada INT (100),
    id_usuario INT (100),
    likes INT (255),
    dislike INT (255),
    compartir INT(255),
    CONSTRAINT pk_id_actions PRIMARY KEY(id_actions),
    CONSTRAINT fk_entradas FOREIGN KEY (id_entrada) REFERENCES entradas(id_entradas),
    CONSTRAINT fk_usuarios FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuarios)
);


/*mostrar informacion de abogados completa*/

SELECT u.nombre_usuario,  a.nombres, a.tarjetaP, a.especialidad 
FROM username_abog u INNER JOIN abogados a ON a.id_abogados=u.id_abogado 
GROUP BY id_abogado;

SELECT u.*,  a.*
FROM username_abog u INNER JOIN abogados a ON a.id_abogados=u.id_abogado 
GROUP BY id_abogado;