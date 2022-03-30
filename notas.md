MYSQL_ADDON_HOST=bhst4gm1rzukod4cbwjz-mysql.services.clever-cloud.com
MYSQL_ADDON_DB=bhst4gm1rzukod4cbwjz
MYSQL_ADDON_USER=u2vxqmgd1gtgoz0r
MYSQL_ADDON_PORT=3306
MYSQL_ADDON_PASSWORD=ypXk9bF0Pdff4866GIeY 
MYSQL_ADDON_URI=mysql://u2vxqmgd1gtgoz0r:ypXk9bF0Pdff4866GIeY@bhst4gm1rzukod4cbwjz-mysql.services.clever-cloud.com:3306/bhst4gm1rzukod4cbwjz



INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_MODERATOR');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');

**************

INSERT INTO `educacion`(`id`, `ed_actual`, `ed_comienzo`, `ed_descripcion`, `ed_final`, `ed_institucion`, `ed_tipo`, `ed_titulo`) VALUES ('1','0','1998-01-01 00:00:00.000000','Técnico electrónico industrial. Con título intermedio Técnico en Programación y Ayudante electromecánico','2004-12-31 00:00:00.000000','ITS Villada','1','Técnico Electrónico')

INSERT INTO `educacion`(`id`, `ed_actual`, `ed_comienzo`, `ed_descripcion`, `ed_final`, `ed_institucion`, `ed_tipo`, `ed_titulo`) VALUES ('2','0','2004-01-01 00:00:00.000000','Ingeniería electrónica incompleta. Título intermedio Técnico electrónico 4to y 5to año. .','2009-12-31 00:00:00.000000','UTN Frc','1','Ingeniería Electrónico')

INSERT INTO `educacion`(`id`, `ed_actual`, `ed_comienzo`, `ed_descripcion`, `ed_final`, `ed_institucion`, `ed_tipo`, `ed_titulo`) VALUES ('3','0','2021-01-01 00:00:00.000000','Primera y segunda etapa de Argentina Programa. POO','2022-05-31 00:00:00.000000','#YoProgramo','1','Full Stack Developer Jr')


*************
INSERT INTO `skill`(`id`, `sk_habilidad`, `sk_titulo`) VALUES ('1','40','INGLES');
INSERT INTO `skill`(`id`, `sk_habilidad`, `sk_titulo`) VALUES ('2','55','ITALIANO');
INSERT INTO `skill`(`id`, `sk_habilidad`, `sk_titulo`) VALUES ('3','60','Python');
INSERT INTO `skill`(`id`, `sk_habilidad`, `sk_titulo`) VALUES ('4','45','C++');
INSERT INTO `skill`(`id`, `sk_habilidad`, `sk_titulo`) VALUES ('5','40','Java');
INSERT INTO `skill`(`id`, `sk_habilidad`, `sk_titulo`) VALUES ('6','40','Js');
INSERT INTO `skill`(`id`, `sk_habilidad`, `sk_titulo`) VALUES ('7','45','Node');
INSERT INTO `skill`(`id`, `sk_habilidad`, `sk_titulo`) VALUES ('8','40','Git');


***************

INSERT INTO `experiencia`(`id`, `exp_actual`, `exp_comienzo`, `exp_descripcion`, `exp_final`, `exp_sitio`, `exp_tipo`, `exp_titulo`) VALUES ('1','0','2004-06-31 00:00:00.000000','Mantenimiento eléctrico industrial. Tablerista Eléctrico Industrial','2004-12-31 00:00:00.000000','Kaiser Servicios','0','Mantenimiento Eléctrico');
INSERT INTO `experiencia`(`id`, `exp_actual`, `exp_comienzo`, `exp_descripcion`, `exp_final`, `exp_sitio`, `exp_tipo`, `exp_titulo`) VALUES ('2','0','2004-12-31 00:00:00.000000','Mantenimiento semafórico CBA, CCTV fibra optica. Instalación y programación de controladores de semáforos.','2010-12-31 00:00:00.000000','Telven Argentina S.A.','0','Mantenimiento Red Semáforos y CCTV');
INSERT INTO `experiencia`(`id`, `exp_actual`, `exp_comienzo`, `exp_descripcion`, `exp_final`, `exp_sitio`, `exp_tipo`, `exp_titulo`) VALUES ('3','0','2011-01-31 00:00:00.000000','Asistencia telefónica a técnicos de telefonía e instalación. RMAS, análisis de datos de robots de control. Informe de estados y busqueda de fallas remotas.','2011-06-31 00:00:00.000000','JazzPlatt Argentina S.A.','0','C.A.T A técnicos.');
INSERT INTO `experiencia`(`id`, `exp_actual`, `exp_comienzo`, `exp_descripcion`, `exp_final`, `exp_sitio`, `exp_tipo`, `exp_titulo`) VALUES ('4','1','2011-07-14 00:00:00.000000','Administrador de IT, redes, servidores y exchange. Soporte primer y segundo nivel. Ejecución de proyectos. ManageEngine Admin','','ECOGAS','0','IT Admin');

*******************
INSERT INTO `header`(`id`, `hd_nombre`, `hd_profesion`, `hd_sobremi`, `hd_urlbanner`, `hd_urlperfil`) VALUES ('1','Franco Cerioni','Full Stack Software Developer Jr.','Apasionado por la programación, migrado al mundo de los objetos.','https://cdn.pixabay.com/photo/2018/09/27/09/22/artificial-intelligence-3706562_960_720.jpg','https://cdn.pixabay.com/photo/2015/03/08/09/30/head-663997_960_720.jpg');