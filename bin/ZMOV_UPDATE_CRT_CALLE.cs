using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SAP.Middleware.Connector;

namespace rfcBaika
{
    public class ZMOV_UPDATE_CRT_CALLE
    {
        public responce_ZMOV_UPDATE_CRT_CALLE sapRun(request_ZMOV_UPDATE_CRT_CALLE import)
        {
            RfcDestination configSap = RfcDestinationManager.GetDestination("PRO_router");
            RfcRepository SapRfcRepository = configSap.Repository;
            IRfcFunction rfcFunction = SapRfcRepository.CreateFunction("ZMOV_UPDATE_CRT_CALLE");

            rfcFunction.SetValue("ZNUEZ_CALLE", import.ZNUEZ_CALLE);
            IRfcTable rfcTable_IT_CHARG_I = rfcFunction.GetTable("IT_CHARG");
            foreach (ZMOV_UPDATE_CRT_CALLE_IT_CHARG row in import.IT_CHARG)
            {
                rfcTable_IT_CHARG_I.Append();
                ZMOV_UPDATE_CRT_CALLE_IT_CHARG datoTabla = new ZMOV_UPDATE_CRT_CALLE_IT_CHARG();
                rfcTable_IT_CHARG_I.SetValue("LOW", row.LOW);
                rfcTable_IT_CHARG_I.SetValue("SIGN", "I");
                rfcTable_IT_CHARG_I.SetValue("OPTION", "EQ");
                
            }
            rfcFunction.SetValue("IT_CHARG", rfcTable_IT_CHARG_I);
            rfcFunction.Invoke(configSap);
            string aa = rfcFunction.ToString();
            responce_ZMOV_UPDATE_CRT_CALLE res = new responce_ZMOV_UPDATE_CRT_CALLE();
            IRfcTable rfcTable_IT_CHARG = rfcFunction.GetTable("IT_CHARG");
            res.IT_CHARG = new ZMOV_UPDATE_CRT_CALLE_IT_CHARG[rfcTable_IT_CHARG.RowCount];
            int i_IT_CHARG = 0;
            foreach (IRfcStructure row in rfcTable_IT_CHARG)
            {
                ZMOV_UPDATE_CRT_CALLE_IT_CHARG datoTabla = new ZMOV_UPDATE_CRT_CALLE_IT_CHARG();
                datoTabla.LOW = row.GetString("LOW");
                res.IT_CHARG[i_IT_CHARG] = datoTabla; ++i_IT_CHARG;
            }
            IRfcTable rfcTable_RETTAB_CHG = rfcFunction.GetTable("RETTAB_CHG");
            res.RETTAB_CHG = new ZMOV_UPDATE_CRT_CALLE_RETTAB_CHG[rfcTable_RETTAB_CHG.RowCount];
            int i_RETTAB_CHG = 0;
            foreach (IRfcStructure row in rfcTable_RETTAB_CHG)
            {
                ZMOV_UPDATE_CRT_CALLE_RETTAB_CHG datoTabla = new ZMOV_UPDATE_CRT_CALLE_RETTAB_CHG();
                datoTabla.TYPE = row.GetString("TYPE");
                datoTabla.ID = row.GetString("ID");
                datoTabla.NUMBER = row.GetInt("NUMBER");
                datoTabla.MESSAGE = row.GetString("MESSAGE");
                datoTabla.LOG_NO = row.GetString("LOG_NO");
                datoTabla.LOG_MSG_NO = row.GetInt("LOG_MSG_NO");
                datoTabla.MESSAGE_V1 = row.GetString("MESSAGE_V1");
                datoTabla.MESSAGE_V2 = row.GetString("MESSAGE_V2");
                datoTabla.MESSAGE_V3 = row.GetString("MESSAGE_V3");
                datoTabla.MESSAGE_V4 = row.GetString("MESSAGE_V4");
                datoTabla.PARAMETER = row.GetString("PARAMETER");
                datoTabla.ROW = row.GetInt("ROW");
                datoTabla.FIELD = row.GetString("FIELD");
                datoTabla.SYSTEM = row.GetString("SYSTEM");
                res.RETTAB_CHG[i_RETTAB_CHG] = datoTabla; ++i_RETTAB_CHG;
            }
            IRfcTable rfcTable_RETTAC = rfcFunction.GetTable("RETTAC");
            res.RETTAC = new ZMOV_UPDATE_CRT_CALLE_RETTAC[rfcTable_RETTAC.RowCount];
            int i_RETTAC = 0;
            foreach (IRfcStructure row in rfcTable_RETTAC)
            {
                ZMOV_UPDATE_CRT_CALLE_RETTAC datoTabla = new ZMOV_UPDATE_CRT_CALLE_RETTAC();
                datoTabla.TYPE = row.GetString("TYPE");
                datoTabla.ID = row.GetString("ID");
                datoTabla.NUMBER = row.GetInt("NUMBER");
                datoTabla.MESSAGE = row.GetString("MESSAGE");
                datoTabla.LOG_NO = row.GetString("LOG_NO");
                datoTabla.LOG_MSG_NO = row.GetInt("LOG_MSG_NO");
                datoTabla.MESSAGE_V1 = row.GetString("MESSAGE_V1");
                datoTabla.MESSAGE_V2 = row.GetString("MESSAGE_V2");
                datoTabla.MESSAGE_V3 = row.GetString("MESSAGE_V3");
                datoTabla.MESSAGE_V4 = row.GetString("MESSAGE_V4");
                datoTabla.PARAMETER = row.GetString("PARAMETER");
                datoTabla.ROW = row.GetInt("ROW");
                datoTabla.FIELD = row.GetString("FIELD");
                datoTabla.SYSTEM = row.GetString("SYSTEM");
                res.RETTAC[i_RETTAC] = datoTabla; ++i_RETTAC;
            }
            IRfcTable rfcTable_RETURN_MODCARACT = rfcFunction.GetTable("RETURN_MODCARACT");
            res.RETURN_MODCARACT = new ZMOV_UPDATE_CRT_CALLE_RETURN_MODCARACT[rfcTable_RETURN_MODCARACT.RowCount];
            int i_RETURN_MODCARACT = 0;
            foreach (IRfcStructure row in rfcTable_RETURN_MODCARACT)
            {
                ZMOV_UPDATE_CRT_CALLE_RETURN_MODCARACT datoTabla = new ZMOV_UPDATE_CRT_CALLE_RETURN_MODCARACT();
                datoTabla.TYPE = row.GetString("TYPE");
                datoTabla.ID = row.GetString("ID");
                datoTabla.NUMBER = row.GetInt("NUMBER");
                datoTabla.MESSAGE = row.GetString("MESSAGE");
                datoTabla.LOG_NO = row.GetString("LOG_NO");
                datoTabla.LOG_MSG_NO = row.GetInt("LOG_MSG_NO");
                datoTabla.MESSAGE_V1 = row.GetString("MESSAGE_V1");
                datoTabla.MESSAGE_V2 = row.GetString("MESSAGE_V2");
                datoTabla.MESSAGE_V3 = row.GetString("MESSAGE_V3");
                datoTabla.MESSAGE_V4 = row.GetString("MESSAGE_V4");
                datoTabla.PARAMETER = row.GetString("PARAMETER");
                datoTabla.ROW = row.GetInt("ROW");
                datoTabla.FIELD = row.GetString("FIELD");
                datoTabla.SYSTEM = row.GetString("SYSTEM");
                res.RETURN_MODCARACT[i_RETURN_MODCARACT] = datoTabla; ++i_RETURN_MODCARACT;
            }

            return res;
        }
    }
    public class request_ZMOV_UPDATE_CRT_CALLE
    {
        public String ZNUEZ_CALLE;
        public ZMOV_UPDATE_CRT_CALLE_IT_CHARG[] IT_CHARG;
    }
    public class responce_ZMOV_UPDATE_CRT_CALLE
    {
        public ZMOV_UPDATE_CRT_CALLE_IT_CHARG[] IT_CHARG;
        public ZMOV_UPDATE_CRT_CALLE_RETTAB_CHG[] RETTAB_CHG;
        public ZMOV_UPDATE_CRT_CALLE_RETTAC[] RETTAC;
        public ZMOV_UPDATE_CRT_CALLE_RETURN_MODCARACT[] RETURN_MODCARACT;
    }
    public class ZMOV_UPDATE_CRT_CALLE_IT_CHARG
    {
        public String LOW;
    }
    public class ZMOV_UPDATE_CRT_CALLE_RETTAB_CHG
    {
        public String TYPE;
        public String ID;
        public Int32 NUMBER;
        public String MESSAGE;
        public String LOG_NO;
        public Int32 LOG_MSG_NO;
        public String MESSAGE_V1;
        public String MESSAGE_V2;
        public String MESSAGE_V3;
        public String MESSAGE_V4;
        public String PARAMETER;
        public Int32 ROW;
        public String FIELD;
        public String SYSTEM;
    }
    public class ZMOV_UPDATE_CRT_CALLE_RETTAC
    {
        public String TYPE;
        public String ID;
        public Int32 NUMBER;
        public String MESSAGE;
        public String LOG_NO;
        public Int32 LOG_MSG_NO;
        public String MESSAGE_V1;
        public String MESSAGE_V2;
        public String MESSAGE_V3;
        public String MESSAGE_V4;
        public String PARAMETER;
        public Int32 ROW;
        public String FIELD;
        public String SYSTEM;
    }
    public class ZMOV_UPDATE_CRT_CALLE_RETURN_MODCARACT
    {
        public String TYPE;
        public String ID;
        public Int32 NUMBER;
        public String MESSAGE;
        public String LOG_NO;
        public Int32 LOG_MSG_NO;
        public String MESSAGE_V1;
        public String MESSAGE_V2;
        public String MESSAGE_V3;
        public String MESSAGE_V4;
        public String PARAMETER;
        public Int32 ROW;
        public String FIELD;
        public String SYSTEM;
    }

}