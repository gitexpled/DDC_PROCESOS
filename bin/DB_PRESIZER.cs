using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Configuration;
using System.Collections;

namespace rfcBaika
{
    public class DB_PRESIZER
    {
        public responce_DB_PRESIZER[] run(request_DB_PRESIZER datos)
        {
            ArrayList listaPresizer = new ArrayList();
            String _connectionString = ConfigurationManager.ConnectionStrings["CS2"].ToString();
            SqlConnection connection = new SqlConnection(_connectionString);
            connection.Open();
            String sql = " SELECT [Numero_palox] [id] , [NumeroDDC] [batch] , [Numero_bon_apport] [batch_granel] ,1 [turno] ,1 [linea]  ,1 [fechaProceso] ,1 [binsEspecie] ,[Nom_variete] [variedadReal] ,[Nom_variete] [variedadTim] ,[Nom_variete] [variedadTimNom] ,('CMA-'+SUBSTRING ([Nom_article],12,10)) [material] ,SUBSTRING ([Nom_article],0,4) [calidad] ,SUBSTRING ([Nom_article],5,4) [calibre] ,[Code_adherent] [productor] ,[Code_adherent] [productorTim] ,[Nom_adherent] [nombreProducTim] ,[Numero_bon_apport] [partidaConsumida] ,isnull(Poids,0) [kilos] ,Creation_palox [fechaBins] ,'0'[usuario] ,'0'[binsArchivo] ,'0'[binsMixto] ,'0'[BinsEstado] ,[Int_lot_libre1] [folioProdReProceso] ,'0'[binsUsuMdf] , ltrim(rtrim(SUBSTRING ([Nom_article],8,4))) [tipoFrio],SUBSTRING ([Nom_article],12,10) [pesoBaseCalibrado] ,'0' [BinsUsuDlt]   FROM [productionv50].[dbo].[Viewpalox]  where [NumeroDDC]=" + datos.batch + " order by SUBSTRING ([Nom_article],15,3) desc";
            SqlCommand cmd = new SqlCommand(sql, connection);
            cmd.Connection = connection;
            cmd.CommandTimeout = 0;
            SqlDataReader dataReader = cmd.ExecuteReader();
            responce_DB_PRESIZER[] data = null;
            //Read the data and store them in the list
            if (dataReader.HasRows)
            {
                 
               
              
               
                while (dataReader.Read())
                {
                    responce_DB_PRESIZER temp = new responce_DB_PRESIZER();

                    temp.id = int.Parse(dataReader[0].ToString());
                    temp.batch = dataReader[1].ToString();
                    temp.batch_granel = dataReader[2].ToString();
                    temp.turno = dataReader[3].ToString();
                    temp.linea = dataReader[4].ToString();
                    temp.fechaProceso = dataReader[5].ToString();
                    temp.binsEspecie = dataReader[6].ToString();
                    temp.variedadReal = dataReader[7].ToString();
                    temp.variedadTim = dataReader[8].ToString();
                    temp.variedadTimNom = dataReader[9].ToString();
                    temp.material = dataReader[10].ToString();
                    temp.calidad = dataReader[11].ToString();

                    try
                    {
                        temp.calibre = Int32.Parse(dataReader[12].ToString().Trim());
                    }
                    catch (Exception e)
                    {
                        
                        temp.calibre = 0;
                    }
                        
                    
                    temp.productor = dataReader[13].ToString();
                    temp.productorTim = dataReader[14].ToString();
                    temp.nombreProducTim = dataReader[15].ToString();
                    temp.partidaConsumida = dataReader[16].ToString();
                    temp.kilos = float.Parse(dataReader[17].ToString());
                    temp.fechaBins = dataReader[18].ToString();
                    temp.usuario = dataReader[19].ToString();
                    temp.binsArchivo = dataReader[20].ToString();
                    temp.binsMixto = dataReader[21].ToString();
                    temp.BinsEstado = dataReader[22].ToString();
                    temp.folioProdReProceso = dataReader[23].ToString();
                    temp.binsUsuMdf = dataReader[24].ToString();
                    temp.tipoFrio = dataReader[25].ToString();
                    temp.pesoBaseCalibrado = dataReader[26].ToString();
                    temp.BinsUsuDlt = dataReader[27].ToString();
                    listaPresizer.Add(temp);
                     
                }
                var res = new responce_DB_PRESIZER[listaPresizer.Count];

                int i = 0;
                foreach(responce_DB_PRESIZER item in listaPresizer)              
                {
                    res[i] = item;
                    i++;                    
                }
                data = res;
            }
            connection.Close();
            connection.Dispose();
            cmd.Dispose();
            return data;
        }
    }
    public class request_DB_PRESIZER
    {
        public String batch;
    }
    public class responce_DB_PRESIZER
    {
        public int id;
        public String batch;
        public String batch_granel;
        public String turno;
        public String linea;
        public String fechaProceso;
        public String binsEspecie;
        public String variedadReal;
        public String variedadTim;
        public String variedadTimNom;
        public String material;
        public String calidad;
        public int calibre;
        public String productor;
        public String productorTim;
        public String nombreProducTim;
        public String partidaConsumida;
        public float kilos;
        public String fechaBins;
        public String usuario;
        public String binsArchivo;
        public String binsMixto;
        public String BinsEstado;
        public String folioProdReProceso;
        public String binsUsuMdf;
        public String tipoFrio;
        public String pesoBaseCalibrado;
        public String BinsUsuDlt;

    }
}