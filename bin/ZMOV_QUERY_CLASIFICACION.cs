using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SAP.Middleware.Connector;

namespace rfcBaika
{
    public class ZMOV_QUERY_CLASIFICACION
    {
        public responce_ZMOV_QUERY_CLASIFICACION sapRun(request_ZMOV_QUERY_CLASIFICACION import)
        {
            RfcDestination configSap = RfcDestinationManager.GetDestination("PRO_router");
            RfcRepository SapRfcRepository = configSap.Repository;
            IRfcFunction rfcFunction = SapRfcRepository.CreateFunction("ZMOV_QUERY_CLASIFICACION");

            rfcFunction.SetValue("ATKLA", import.ATKLA);
            rfcFunction.Invoke(configSap);
            string aa = rfcFunction.ToString();
            responce_ZMOV_QUERY_CLASIFICACION res = new responce_ZMOV_QUERY_CLASIFICACION();
            IRfcTable rfcTable_CATEGORIA = rfcFunction.GetTable("CATEGORIA");
            res.CATEGORIA = new ZMOV_QUERY_CLASIFICACION_CATEGORIA[rfcTable_CATEGORIA.RowCount];
            int i_CATEGORIA = 0;
            foreach (IRfcStructure row in rfcTable_CATEGORIA)
            {
                ZMOV_QUERY_CLASIFICACION_CATEGORIA datoTabla = new ZMOV_QUERY_CLASIFICACION_CATEGORIA();
                datoTabla.ATNAM = row.GetString("ATNAM");
                datoTabla.ATBEZ = row.GetString("ATBEZ");
                datoTabla.VALUE_CHAR = row.GetString("VALUE_CHAR");
                datoTabla.DESCRIPTION = row.GetString("DESCRIPTION");
                res.CATEGORIA[i_CATEGORIA] = datoTabla; ++i_CATEGORIA;
            }

            return res;
        }
    }
    public class request_ZMOV_QUERY_CLASIFICACION
    {
        public String ATKLA;
    }
    public class responce_ZMOV_QUERY_CLASIFICACION
    {
        public ZMOV_QUERY_CLASIFICACION_CATEGORIA[] CATEGORIA;
    }
    public class ZMOV_QUERY_CLASIFICACION_CATEGORIA
    {
        public String ATNAM;
        public String ATBEZ;
        public String VALUE_CHAR;
        public String DESCRIPTION;
    }

}