using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Configuration;

namespace rfcBaika
{
    public class DB_LOGIN
    {
        public responce_DB_LOGIN run(request_DB_LOGIN datos)
        {

            if(datos.Proceso=="setDataGranel"){
                responce_DB_LOGIN resd = new responce_DB_LOGIN();
                String _connectionStringd = ConfigurationManager.ConnectionStrings["CS"].ToString();
                SqlConnection connectiond = new SqlConnection(_connectionStringd);
                connectiond.Open();
                String sql2 = "update usuario set dataGranel ='"+datos.dataGranel+"' where usuario ='"+datos.User+"'";
                SqlCommand cmd2 = new SqlCommand(sql2, connectiond);
                cmd2.Connection = connectiond;
                cmd2.CommandTimeout = 0;
                SqlDataReader dataReader2 = cmd2.ExecuteReader();
            }

            responce_DB_LOGIN res = new responce_DB_LOGIN();
            String _connectionString = ConfigurationManager.ConnectionStrings["CS"].ToString();
            SqlConnection connection = new SqlConnection(_connectionString);
            connection.Open();
            String sql = "select * from usuario   where [usuario]='" + datos.User + "' and [clave]='" + datos.Pass + "'";
            SqlCommand cmd = new SqlCommand(sql, connection);
            cmd.Connection = connection;
            cmd.CommandTimeout = 0;
            SqlDataReader dataReader = cmd.ExecuteReader();
            //Read the data and store them in the list
            if (dataReader.HasRows)
            {
                while (dataReader.Read())
                {
                    res.idUsuario = dataReader[0].ToString();
                    res.usuario = dataReader[1].ToString();
                    res.clave = dataReader[2].ToString();
                    res.nombre = dataReader[3].ToString();
                    res.apellido = dataReader[4].ToString();
                    res.mail = dataReader[5].ToString();
                    res.acopio = dataReader[6].ToString();
                    res.almacenGranel = dataReader[7].ToString();
                    res.almacenFumigacion = dataReader[8].ToString();
                    res.sociedad = dataReader[9].ToString();
                    res.organizacion = dataReader[10].ToString();
                    res.grupoCompra = dataReader[11].ToString();
                    res.clasePedido = dataReader[12].ToString();
                    res.centro = dataReader[13].ToString();
                    res.dataGranel = dataReader[14].ToString();
                    res.exportadora = dataReader[15].ToString();
                    res.wsPrint = dataReader[16].ToString();
                    res.ipZebra = dataReader[17].ToString();
                    res.ipPrinter = dataReader[18].ToString();
                    res.zpl = dataReader[19].ToString();
                    res.almacenPallet = dataReader[20].ToString();
                    res.CSP = dataReader[21].ToString();
                    res.linea = dataReader[22].ToString();
                    res.turno = dataReader[23].ToString();                    
                    res.planta = dataReader[25].ToString();
                }
            }
            connection.Close();
            connection.Dispose();
            cmd.Dispose();
            return res;
        }
    }
    public class request_DB_LOGIN
    {
        public String User;
        public String Pass;
        public String dataGranel;
        public String Proceso;
    }
    public class responce_DB_LOGIN
    {
        public String idUsuario;
        public String usuario;
        public String clave;
        public String nombre;
        public String apellido;
        public String mail;
        public String acopio;
        public String almacenGranel;
        public String almacenFumigacion;
        public String sociedad;
        public String organizacion;
        public String grupoCompra;
        public String clasePedido;
        public String centro;
        public String dataGranel;
        public String exportadora;
        public String wsPrint;
        public String ipZebra;
        public String ipPrinter;
        public String zpl;
        public String almacenPallet;
        public String CSP;
        public String linea;
        public String turno;
        public String planta;

    }
}