using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SAP.Middleware.Connector;

namespace rfcBaika
{
    public class ZMOV_CREATE_RECEP_PT_LIMON
    {
        public responce_ZMOV_CREATE_RECEP_PT_LIMON sapRun(request_ZMOV_CREATE_RECEP_PT_LIMON import)
        {
            RfcDestination configSap = RfcDestinationManager.GetDestination("PRO_router");
            RfcRepository SapRfcRepository = configSap.Repository;
            IRfcFunction rfcFunction = SapRfcRepository.CreateFunction("ZMOV_CREATE_RECEP_PT_LIMON");

            RfcStructureMetadata obj_ZMOV_ST_HEADER_PROC_LIMON = SapRfcRepository.GetStructureMetadata("ZMOV_ST_HEADER_PROC_LIMON");
            IRfcStructure datos_ZMOV_ST_HEADER_PROC_LIMON = obj_ZMOV_ST_HEADER_PROC_LIMON.CreateStructure();
            datos_ZMOV_ST_HEADER_PROC_LIMON.SetValue("BUKRS", import.HEADER.BUKRS);
            datos_ZMOV_ST_HEADER_PROC_LIMON.SetValue("EKORG", import.HEADER.EKORG);
            datos_ZMOV_ST_HEADER_PROC_LIMON.SetValue("EKGRP", import.HEADER.EKGRP);
            datos_ZMOV_ST_HEADER_PROC_LIMON.SetValue("BSART", import.HEADER.BSART);
            datos_ZMOV_ST_HEADER_PROC_LIMON.SetValue("BUDAT", import.HEADER.BUDAT);
            datos_ZMOV_ST_HEADER_PROC_LIMON.SetValue("LIFNR", import.HEADER.LIFNR);
            datos_ZMOV_ST_HEADER_PROC_LIMON.SetValue("XBLNR", import.HEADER.XBLNR);
            datos_ZMOV_ST_HEADER_PROC_LIMON.SetValue("BKTXT", import.HEADER.BKTXT);
            rfcFunction.SetValue("HEADER", datos_ZMOV_ST_HEADER_PROC_LIMON);
            rfcFunction.Invoke(configSap);
            string aa = rfcFunction.ToString();
            responce_ZMOV_CREATE_RECEP_PT_LIMON res = new responce_ZMOV_CREATE_RECEP_PT_LIMON();
            res.MATERIALDOCUMENT = rfcFunction.GetString("MATERIALDOCUMENT");
            res.PEDIDO = rfcFunction.GetString("PEDIDO");
            IRfcTable rfcTable_ITEMS = rfcFunction.GetTable("ITEMS");
            res.ITEMS = new ZMOV_CREATE_RECEP_PT_LIMON_ITEMS[rfcTable_ITEMS.RowCount];
            int i_ITEMS = 0;
            foreach (IRfcStructure row in rfcTable_ITEMS)
            {
                ZMOV_CREATE_RECEP_PT_LIMON_ITEMS datoTabla = new ZMOV_CREATE_RECEP_PT_LIMON_ITEMS();
                datoTabla.STCK_TYPE = row.GetString("STCK_TYPE");
                datoTabla.MATERIAL = row.GetString("MATERIAL");
                datoTabla.BATCH = row.GetString("BATCH");
                datoTabla.QUANTITY = row.GetDecimal("QUANTITY");
                datoTabla.PO_UNIT = row.GetString("PO_UNIT");
                datoTabla.HSDAT = row.GetString("HSDAT");
                datoTabla.PLANT = row.GetString("PLANT");
                datoTabla.STGE_LOC = row.GetString("STGE_LOC");
                datoTabla.FREE_ITEM = row.GetString("FREE_ITEM");
                datoTabla.ZLIMON_VARIEDAD = row.GetString("ZLIMON_VARIEDAD");
                datoTabla.ZLIMON_CATEGORIA = row.GetString("ZLIMON_CATEGORIA");
                datoTabla.ZLIMON_CALIBRE = row.GetString("ZLIMON_CALIBRE");
                datoTabla.ZLIMON_PLU = row.GetString("ZLIMON_PLU");
                datoTabla.ZPRODUCTOR = row.GetString("ZPRODUCTOR");
                datoTabla.ZSAG_SDP = row.GetString("ZSAG_SDP");
                datoTabla.ZSAG_CSG = row.GetString("ZSAG_CSG");
                datoTabla.ZSAG_CSP = row.GetString("ZSAG_CSP");
                datoTabla.ZSAG_CSP_COMUNA = row.GetString("ZSAG_CSP_COMUNA");
                datoTabla.ZSAG_CSP_PROVINCIA = row.GetString("ZSAG_CSP_PROVINCIA");
                datoTabla.ZSAG_CSP_PACKING = row.GetString("ZSAG_CSP_PACKING");
                res.ITEMS[i_ITEMS] = datoTabla; ++i_ITEMS;
            }
            IRfcTable rfcTable_LOG = rfcFunction.GetTable("LOG");
            res.LOG = new ZMOV_CREATE_RECEP_PT_LIMON_LOG[rfcTable_LOG.RowCount];
            int i_LOG = 0;
            foreach (IRfcStructure row in rfcTable_LOG)
            {
                ZMOV_CREATE_RECEP_PT_LIMON_LOG datoTabla = new ZMOV_CREATE_RECEP_PT_LIMON_LOG();
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

            return res;
        }
    }
    public class request_ZMOV_CREATE_RECEP_PT_LIMON
    {
        public ZMOV_CREATE_RECEP_PT_LIMON_HEADER HEADER;
    }
    public class responce_ZMOV_CREATE_RECEP_PT_LIMON
    {
        public String MATERIALDOCUMENT;
        public String PEDIDO;
        public ZMOV_CREATE_RECEP_PT_LIMON_ITEMS[] ITEMS;
        public ZMOV_CREATE_RECEP_PT_LIMON_LOG[] LOG;
    }
    public class ZMOV_CREATE_RECEP_PT_LIMON_HEADER
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
    public class ZMOV_CREATE_RECEP_PT_LIMON_ITEMS
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
        public String ZLIMON_VARIEDAD;
        public String ZLIMON_CATEGORIA;
        public String ZLIMON_CALIBRE;
        public String ZLIMON_PLU;
        public String ZPRODUCTOR;
        public String ZSAG_SDP;
        public String ZSAG_CSG;
        public String ZSAG_CSP;
        public String ZSAG_CSP_COMUNA;
        public String ZSAG_CSP_PROVINCIA;
        public String ZSAG_CSP_PACKING;
    }
    public class ZMOV_CREATE_RECEP_PT_LIMON_LOG
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