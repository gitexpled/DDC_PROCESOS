using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SAP.Middleware.Connector;

namespace rfcBaika
{
    public class ZMOV_CREATE_RECEP_REPROCE_NARA
    {
        public responce_ZMOV_CREATE_RECEP_REPROCE_NARA sapRun(request_ZMOV_CREATE_RECEP_REPROCE_NARA import)
        {
            RfcDestination configSap = RfcDestinationManager.GetDestination("PRO_router");
            RfcRepository SapRfcRepository = configSap.Repository;
            IRfcFunction rfcFunction = SapRfcRepository.CreateFunction("ZMOV_CREATE_RECEP_REPROCE_NARA");

            RfcStructureMetadata obj_ZMOV_ST_HEADER_REPROC_NARANJA = SapRfcRepository.GetStructureMetadata("ZMOV_ST_HEADER_REPROC_NARANJA");
            IRfcStructure datos_ZMOV_ST_HEADER_REPROC_NARANJA = obj_ZMOV_ST_HEADER_REPROC_NARANJA.CreateStructure();
            datos_ZMOV_ST_HEADER_REPROC_NARANJA.SetValue("BUKRS", import.HEADER.BUKRS);
            datos_ZMOV_ST_HEADER_REPROC_NARANJA.SetValue("EKORG", import.HEADER.EKORG);
            datos_ZMOV_ST_HEADER_REPROC_NARANJA.SetValue("EKGRP", import.HEADER.EKGRP);
            datos_ZMOV_ST_HEADER_REPROC_NARANJA.SetValue("BSART", import.HEADER.BSART);
            datos_ZMOV_ST_HEADER_REPROC_NARANJA.SetValue("BUDAT", import.HEADER.BUDAT);
            datos_ZMOV_ST_HEADER_REPROC_NARANJA.SetValue("LIFNR", import.HEADER.LIFNR);
            datos_ZMOV_ST_HEADER_REPROC_NARANJA.SetValue("XBLNR", import.HEADER.XBLNR);
            datos_ZMOV_ST_HEADER_REPROC_NARANJA.SetValue("BKTXT", import.HEADER.BKTXT);
            rfcFunction.SetValue("HEADER", datos_ZMOV_ST_HEADER_REPROC_NARANJA);
            IRfcTable rfcTable_ITEMS_I = rfcFunction.GetTable("ITEMS");
            foreach (ZMOV_CREATE_RECEP_REPROCE_NARA_ITEMS row in import.ITEMS)
            {
                rfcTable_ITEMS_I.Append();
                ZMOV_CREATE_RECEP_REPROCE_NARA_ITEMS datoTabla = new ZMOV_CREATE_RECEP_REPROCE_NARA_ITEMS();
                rfcTable_ITEMS_I.SetValue("STCK_TYPE", row.STCK_TYPE);
                rfcTable_ITEMS_I.SetValue("MATERIAL", row.MATERIAL);
                rfcTable_ITEMS_I.SetValue("BATCH", row.BATCH);
                rfcTable_ITEMS_I.SetValue("QUANTITY", row.QUANTITY);
                rfcTable_ITEMS_I.SetValue("PO_UNIT", row.PO_UNIT);
                rfcTable_ITEMS_I.SetValue("HSDAT", row.HSDAT);
                rfcTable_ITEMS_I.SetValue("PLANT", row.PLANT);
                rfcTable_ITEMS_I.SetValue("STGE_LOC", row.STGE_LOC);
                rfcTable_ITEMS_I.SetValue("FREE_ITEM", row.FREE_ITEM);
                rfcTable_ITEMS_I.SetValue("BATCH_GRANEL", row.BATCH_GRANEL);
            }
            rfcFunction.SetValue("ITEMS", rfcTable_ITEMS_I);
            rfcFunction.Invoke(configSap);
            string aa = rfcFunction.ToString();
            responce_ZMOV_CREATE_RECEP_REPROCE_NARA res = new responce_ZMOV_CREATE_RECEP_REPROCE_NARA();
            res.MATERIALDOCUMENT101 = rfcFunction.GetString("MATERIALDOCUMENT101");
            res.MATERIALDOCUMENT541 = rfcFunction.GetString("MATERIALDOCUMENT541");
            res.PEDIDO = rfcFunction.GetString("PEDIDO");
            IRfcTable rfcTable_ITEMS = rfcFunction.GetTable("ITEMS");
            res.ITEMS = new ZMOV_CREATE_RECEP_REPROCE_NARA_ITEMS[rfcTable_ITEMS.RowCount];
            int i_ITEMS = 0;
            foreach (IRfcStructure row in rfcTable_ITEMS)
            {
                ZMOV_CREATE_RECEP_REPROCE_NARA_ITEMS datoTabla = new ZMOV_CREATE_RECEP_REPROCE_NARA_ITEMS();
                datoTabla.STCK_TYPE = row.GetString("STCK_TYPE");
                datoTabla.MATERIAL = row.GetString("MATERIAL");
                datoTabla.BATCH = row.GetString("BATCH");
                datoTabla.QUANTITY = row.GetDecimal("QUANTITY");
                datoTabla.PO_UNIT = row.GetString("PO_UNIT");
                datoTabla.HSDAT = row.GetString("HSDAT");
                datoTabla.PLANT = row.GetString("PLANT");
                datoTabla.STGE_LOC = row.GetString("STGE_LOC");
                datoTabla.FREE_ITEM = row.GetString("FREE_ITEM");
                datoTabla.BATCH_GRANEL = row.GetString("BATCH_GRANEL");
                res.ITEMS[i_ITEMS] = datoTabla; ++i_ITEMS;
            }
            IRfcTable rfcTable_LOG = rfcFunction.GetTable("LOG");
            res.LOG = new ZMOV_CREATE_RECEP_REPROCE_NARA_LOG[rfcTable_LOG.RowCount];
            int i_LOG = 0;
            foreach (IRfcStructure row in rfcTable_LOG)
            {
                ZMOV_CREATE_RECEP_REPROCE_NARA_LOG datoTabla = new ZMOV_CREATE_RECEP_REPROCE_NARA_LOG();
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
                res.LOG[i_LOG] = datoTabla; ++i_LOG;
            }
            IRfcTable rfcTable_RETURN_REC = rfcFunction.GetTable("RETURN_REC");
            res.RETURN_REC = new ZMOV_CREATE_RECEP_REPROCE_NARA_RETURN_REC[rfcTable_RETURN_REC.RowCount];
            int i_RETURN_REC = 0;
            foreach (IRfcStructure row in rfcTable_RETURN_REC)
            {
                ZMOV_CREATE_RECEP_REPROCE_NARA_RETURN_REC datoTabla = new ZMOV_CREATE_RECEP_REPROCE_NARA_RETURN_REC();
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
                res.RETURN_REC[i_RETURN_REC] = datoTabla; ++i_RETURN_REC;
            }

            return res;
        }
    }
    public class request_ZMOV_CREATE_RECEP_REPROCE_NARA
    {
        public ZMOV_CREATE_RECEP_REPROCE_NARA_HEADER HEADER;
        public ZMOV_CREATE_RECEP_REPROCE_NARA_ITEMS[] ITEMS;
    }
    public class responce_ZMOV_CREATE_RECEP_REPROCE_NARA
    {
        public String MATERIALDOCUMENT101;
        public String MATERIALDOCUMENT541;
        public String PEDIDO;
        public ZMOV_CREATE_RECEP_REPROCE_NARA_ITEMS[] ITEMS;
        public ZMOV_CREATE_RECEP_REPROCE_NARA_LOG[] LOG;
        public ZMOV_CREATE_RECEP_REPROCE_NARA_RETURN_REC[] RETURN_REC;
    }
    public class ZMOV_CREATE_RECEP_REPROCE_NARA_HEADER
    {
        public String BUKRS;
        public String EKORG;
        public String EKGRP;
        public String BSART;
        public String BUDAT;
        public String LIFNR;
        public String XBLNR;
        public String BKTXT;
    }
    public class ZMOV_CREATE_RECEP_REPROCE_NARA_ITEMS
    {
        public String STCK_TYPE;
        public String MATERIAL;
        public String BATCH;
        public Decimal QUANTITY;
        public String PO_UNIT;
        public String HSDAT;
        public String PLANT;
        public String STGE_LOC;
        public String FREE_ITEM;
        public String BATCH_GRANEL;
    }
    public class ZMOV_CREATE_RECEP_REPROCE_NARA_LOG
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
    public class ZMOV_CREATE_RECEP_REPROCE_NARA_RETURN_REC
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