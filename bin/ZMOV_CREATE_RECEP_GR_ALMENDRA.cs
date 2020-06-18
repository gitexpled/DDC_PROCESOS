using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SAP.Middleware.Connector;

namespace rfcBaika
{
    public class ZMOV_CREATE_RECEP_GR_ALMENDRA
    {
        public responce_ZMOV_CREATE_RECEP_GR_ALMENDRA sapRun(request_ZMOV_CREATE_RECEP_GR_ALMENDRA import)
        {
            RfcDestination configSap = RfcDestinationManager.GetDestination("PRO_router");
            RfcRepository SapRfcRepository = configSap.Repository;
            IRfcFunction rfcFunction = SapRfcRepository.CreateFunction("ZMOV_CREATE_RECEP_GR_ALMENDRA");

            RfcStructureMetadata obj_ZMOV_ST_HEADER_ALMENDRA = SapRfcRepository.GetStructureMetadata("ZMOV_ST_HEADER_ALMENDRA");
            IRfcStructure datos_ZMOV_ST_HEADER_ALMENDRA = obj_ZMOV_ST_HEADER_ALMENDRA.CreateStructure();
            datos_ZMOV_ST_HEADER_ALMENDRA.SetValue("BUKRS", import.HEADER.BUKRS);
            datos_ZMOV_ST_HEADER_ALMENDRA.SetValue("EKORG", import.HEADER.EKORG);
            datos_ZMOV_ST_HEADER_ALMENDRA.SetValue("EKGRP", import.HEADER.EKGRP);
            datos_ZMOV_ST_HEADER_ALMENDRA.SetValue("BSART", import.HEADER.BSART);
            datos_ZMOV_ST_HEADER_ALMENDRA.SetValue("BUDAT", import.HEADER.BUDAT);
            datos_ZMOV_ST_HEADER_ALMENDRA.SetValue("LIFNR", import.HEADER.LIFNR);
            datos_ZMOV_ST_HEADER_ALMENDRA.SetValue("XBLNR", import.HEADER.XBLNR);
            datos_ZMOV_ST_HEADER_ALMENDRA.SetValue("BKTXT", import.HEADER.BKTXT);
            datos_ZMOV_ST_HEADER_ALMENDRA.SetValue("ZALMENDRA_VARIEDAD", import.HEADER.ZALMENDRA_VARIEDAD);
            datos_ZMOV_ST_HEADER_ALMENDRA.SetValue("ZPRODUCTOR", import.HEADER.ZPRODUCTOR);
            datos_ZMOV_ST_HEADER_ALMENDRA.SetValue("ZEXPORTADORA", import.HEADER.ZEXPORTADORA);
            datos_ZMOV_ST_HEADER_ALMENDRA.SetValue("ZCUARTEL", import.HEADER.ZCUARTEL);
            datos_ZMOV_ST_HEADER_ALMENDRA.SetValue("ZPATENTE", import.HEADER.ZPATENTE);
            datos_ZMOV_ST_HEADER_ALMENDRA.SetValue("ZCONDUCTOR", import.HEADER.ZCONDUCTOR);
            rfcFunction.SetValue("HEADER", datos_ZMOV_ST_HEADER_ALMENDRA);
            IRfcTable rfcTable_ITEM_DEST_I = rfcFunction.GetTable("ITEM_DEST");
            foreach (ZMOV_CREATE_RECEP_GR_ALMENDRA_ITEM_DEST row in import.ITEM_DEST)
            {
                rfcTable_ITEM_DEST_I.Append();
                ZMOV_CREATE_RECEP_GR_ALMENDRA_ITEM_DEST datoTabla = new ZMOV_CREATE_RECEP_GR_ALMENDRA_ITEM_DEST();
                rfcTable_ITEM_DEST_I.SetValue("LFPOS", row.LFPOS);
                rfcTable_ITEM_DEST_I.SetValue("MATERIAL", row.MATERIAL);
                rfcTable_ITEM_DEST_I.SetValue("QUANTITY", row.QUANTITY);
                rfcTable_ITEM_DEST_I.SetValue("PO_UNIT", row.PO_UNIT);
                rfcTable_ITEM_DEST_I.SetValue("WERKS", row.WERKS);
                rfcTable_ITEM_DEST_I.SetValue("LGORT", row.LGORT);
            }
            rfcFunction.SetValue("ITEM_DEST", rfcTable_ITEM_DEST_I);
            IRfcTable rfcTable_ITEM_GR_I = rfcFunction.GetTable("ITEM_GR");
            foreach (ZMOV_CREATE_RECEP_GR_ALMENDRA_ITEM_GR row in import.ITEM_GR)
            {
                rfcTable_ITEM_GR_I.Append();
                ZMOV_CREATE_RECEP_GR_ALMENDRA_ITEM_GR datoTabla = new ZMOV_CREATE_RECEP_GR_ALMENDRA_ITEM_GR();
                rfcTable_ITEM_GR_I.SetValue("STCK_TYPE", row.STCK_TYPE);
                rfcTable_ITEM_GR_I.SetValue("MATERIAL", row.MATERIAL);
                rfcTable_ITEM_GR_I.SetValue("BATCH", row.BATCH);
                rfcTable_ITEM_GR_I.SetValue("QUANTITY", row.QUANTITY);
                rfcTable_ITEM_GR_I.SetValue("PO_UNIT", row.PO_UNIT);
                rfcTable_ITEM_GR_I.SetValue("HSDAT", row.HSDAT);
                rfcTable_ITEM_GR_I.SetValue("PLANT", row.PLANT);
                rfcTable_ITEM_GR_I.SetValue("STGE_LOC", row.STGE_LOC);
                rfcTable_ITEM_GR_I.SetValue("FREE_ITEM", row.FREE_ITEM);
            }
            rfcFunction.SetValue("ITEM_GR", rfcTable_ITEM_GR_I);
            rfcFunction.Invoke(configSap);
            string aa = rfcFunction.ToString();
            responce_ZMOV_CREATE_RECEP_GR_ALMENDRA res = new responce_ZMOV_CREATE_RECEP_GR_ALMENDRA();
            res.MATERIALDOCUMENT = rfcFunction.GetString("MATERIALDOCUMENT");
            res.MATERIALDOCUMENT_BD = rfcFunction.GetString("MATERIALDOCUMENT_BD");
            res.PEDIDO = rfcFunction.GetString("PEDIDO");
            IRfcTable rfcTable_ITEM_DEST = rfcFunction.GetTable("ITEM_DEST");
            res.ITEM_DEST = new ZMOV_CREATE_RECEP_GR_ALMENDRA_ITEM_DEST[rfcTable_ITEM_DEST.RowCount];
            int i_ITEM_DEST = 0;
            foreach (IRfcStructure row in rfcTable_ITEM_DEST)
            {
                ZMOV_CREATE_RECEP_GR_ALMENDRA_ITEM_DEST datoTabla = new ZMOV_CREATE_RECEP_GR_ALMENDRA_ITEM_DEST();
                datoTabla.LFPOS = row.GetInt("LFPOS");
                datoTabla.MATERIAL = row.GetString("MATERIAL");
                datoTabla.QUANTITY = row.GetDecimal("QUANTITY");
                datoTabla.PO_UNIT = row.GetString("PO_UNIT");
                datoTabla.WERKS = row.GetString("WERKS");
                datoTabla.LGORT = row.GetString("LGORT");
                res.ITEM_DEST[i_ITEM_DEST] = datoTabla; ++i_ITEM_DEST;
            }
            IRfcTable rfcTable_ITEM_GR = rfcFunction.GetTable("ITEM_GR");
            res.ITEM_GR = new ZMOV_CREATE_RECEP_GR_ALMENDRA_ITEM_GR[rfcTable_ITEM_GR.RowCount];
            int i_ITEM_GR = 0;
            foreach (IRfcStructure row in rfcTable_ITEM_GR)
            {
                ZMOV_CREATE_RECEP_GR_ALMENDRA_ITEM_GR datoTabla = new ZMOV_CREATE_RECEP_GR_ALMENDRA_ITEM_GR();
                datoTabla.STCK_TYPE = row.GetString("STCK_TYPE");
                datoTabla.MATERIAL = row.GetString("MATERIAL");
                datoTabla.BATCH = row.GetString("BATCH");
                datoTabla.QUANTITY = row.GetDecimal("QUANTITY");
                datoTabla.PO_UNIT = row.GetString("PO_UNIT");
                datoTabla.HSDAT = row.GetString("HSDAT");
                datoTabla.PLANT = row.GetString("PLANT");
                datoTabla.STGE_LOC = row.GetString("STGE_LOC");
                datoTabla.FREE_ITEM = row.GetString("FREE_ITEM");
                res.ITEM_GR[i_ITEM_GR] = datoTabla; ++i_ITEM_GR;
            }
            IRfcTable rfcTable_LOG = rfcFunction.GetTable("LOG");
            res.LOG = new ZMOV_CREATE_RECEP_GR_ALMENDRA_LOG[rfcTable_LOG.RowCount];
            int i_LOG = 0;
            foreach (IRfcStructure row in rfcTable_LOG)
            {
                ZMOV_CREATE_RECEP_GR_ALMENDRA_LOG datoTabla = new ZMOV_CREATE_RECEP_GR_ALMENDRA_LOG();
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
    public class request_ZMOV_CREATE_RECEP_GR_ALMENDRA
    {
        public ZMOV_CREATE_RECEP_GR_ALMENDRA_HEADER HEADER;
        public ZMOV_CREATE_RECEP_GR_ALMENDRA_ITEM_DEST[] ITEM_DEST;
        public ZMOV_CREATE_RECEP_GR_ALMENDRA_ITEM_GR[] ITEM_GR;
    }
    public class responce_ZMOV_CREATE_RECEP_GR_ALMENDRA
    {
        public String MATERIALDOCUMENT;
        public String MATERIALDOCUMENT_BD;
        public String PEDIDO;
        public ZMOV_CREATE_RECEP_GR_ALMENDRA_ITEM_DEST[] ITEM_DEST;
        public ZMOV_CREATE_RECEP_GR_ALMENDRA_ITEM_GR[] ITEM_GR;
        public ZMOV_CREATE_RECEP_GR_ALMENDRA_LOG[] LOG;
    }
    public class ZMOV_CREATE_RECEP_GR_ALMENDRA_HEADER
    {
        public String BUKRS;
        public String EKORG;
        public String EKGRP;
        public String BSART;
        public String BUDAT;
        public String LIFNR;
        public String XBLNR;
        public String BKTXT;
        public String ZALMENDRA_VARIEDAD;
        public String ZPRODUCTOR;
        public String ZEXPORTADORA;
        public String ZCUARTEL;
        public String ZPATENTE;
        public String ZCONDUCTOR;
    }
    public class ZMOV_CREATE_RECEP_GR_ALMENDRA_ITEM_DEST
    {
        public Int32 LFPOS;
        public String MATERIAL;
        public Decimal QUANTITY;
        public String PO_UNIT;
        public String WERKS;
        public String LGORT;
    }
    public class ZMOV_CREATE_RECEP_GR_ALMENDRA_ITEM_GR
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
    }
    public class ZMOV_CREATE_RECEP_GR_ALMENDRA_LOG
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