using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SAP.Middleware.Connector;

namespace rfcBaika
{
    public class ZMOV_CREATE_ENVIO_PART
    {
        public responce_ZMOV_CREATE_ENVIO_PART sapRun(request_ZMOV_CREATE_ENVIO_PART import)
        {
            RfcDestination configSap = RfcDestinationManager.GetDestination("PRO_router");
            RfcRepository SapRfcRepository = configSap.Repository;
            IRfcFunction rfcFunction = SapRfcRepository.CreateFunction("ZMOV_CREATE_ENVIO_PART");

            RfcStructureMetadata obj_BAPI2017_GM_HEAD_01 = SapRfcRepository.GetStructureMetadata("BAPI2017_GM_HEAD_01");
            IRfcStructure datos_BAPI2017_GM_HEAD_01 = obj_BAPI2017_GM_HEAD_01.CreateStructure();
            datos_BAPI2017_GM_HEAD_01.SetValue("PSTNG_DATE", import.HEADER.PSTNG_DATE);
            datos_BAPI2017_GM_HEAD_01.SetValue("REF_DOC_NO", import.HEADER.REF_DOC_NO);
            datos_BAPI2017_GM_HEAD_01.SetValue("HEADER_TXT", import.HEADER.HEADER_TXT);
            rfcFunction.SetValue("HEADER", datos_BAPI2017_GM_HEAD_01);
            IRfcTable rfcTable_ITEMS_I = rfcFunction.GetTable("ITEMS");
            foreach (ZMOV_CREATE_ENVIO_PART_ITEMS row in import.ITEMS)
            {
                rfcTable_ITEMS_I.Append();
                ZMOV_CREATE_ENVIO_PART_ITEMS datoTabla = new ZMOV_CREATE_ENVIO_PART_ITEMS();
                rfcTable_ITEMS_I.SetValue("BATCH", row.BATCH);
                rfcTable_ITEMS_I.SetValue("PLANT", row.PLANT);
                rfcTable_ITEMS_I.SetValue("VENDOR", row.VENDOR);
            }
            rfcFunction.SetValue("ITEMS", rfcTable_ITEMS_I);
            rfcFunction.Invoke(configSap);
            string aa = rfcFunction.ToString();
            responce_ZMOV_CREATE_ENVIO_PART res = new responce_ZMOV_CREATE_ENVIO_PART();
            res.MATERIALDOCUMENT = rfcFunction.GetString("MATERIALDOCUMENT");
            IRfcTable rfcTable_ITEMS = rfcFunction.GetTable("ITEMS");
            res.ITEMS = new ZMOV_CREATE_ENVIO_PART_ITEMS[rfcTable_ITEMS.RowCount];
            int i_ITEMS = 0;
            foreach (IRfcStructure row in rfcTable_ITEMS)
            {
                ZMOV_CREATE_ENVIO_PART_ITEMS datoTabla = new ZMOV_CREATE_ENVIO_PART_ITEMS();
                datoTabla.BATCH = row.GetString("BATCH");
                datoTabla.PLANT = row.GetString("PLANT");
                datoTabla.VENDOR = row.GetString("VENDOR");
                res.ITEMS[i_ITEMS] = datoTabla; ++i_ITEMS;
            }
            IRfcTable rfcTable_RETURN = rfcFunction.GetTable("RETURN");
            res.RETURN = new ZMOV_CREATE_ENVIO_PART_RETURN[rfcTable_RETURN.RowCount];
            int i_RETURN = 0;
            foreach (IRfcStructure row in rfcTable_RETURN)
            {
                ZMOV_CREATE_ENVIO_PART_RETURN datoTabla = new ZMOV_CREATE_ENVIO_PART_RETURN();
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
                res.RETURN[i_RETURN] = datoTabla; ++i_RETURN;
            }

            return res;
        }
    }
    public class request_ZMOV_CREATE_ENVIO_PART
    {
        public ZMOV_CREATE_ENVIO_PART_HEADER HEADER;
        public ZMOV_CREATE_ENVIO_PART_ITEMS[] ITEMS;
    }
    public class responce_ZMOV_CREATE_ENVIO_PART
    {
        public String MATERIALDOCUMENT;
        public ZMOV_CREATE_ENVIO_PART_ITEMS[] ITEMS;
        public ZMOV_CREATE_ENVIO_PART_RETURN[] RETURN;
    }
    public class ZMOV_CREATE_ENVIO_PART_HEADER
    {
        public String PSTNG_DATE;
        public String REF_DOC_NO;
        public String HEADER_TXT;
    }
    public class ZMOV_CREATE_ENVIO_PART_ITEMS
    {
        public String BATCH;
        public String PLANT;
        public String VENDOR;
    }
    public class ZMOV_CREATE_ENVIO_PART_RETURN
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