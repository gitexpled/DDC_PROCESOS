using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SAP.Middleware.Connector;

namespace rfcBaika
{
    public class ZMOV_CREATE_RECEP_PROCESO_LIMO
    {
        public responce_ZMOV_CREATE_RECEP_PROCESO_LIMO sapRun(request_ZMOV_CREATE_RECEP_PROCESO_LIMO import)
        {
            RfcDestination configSap = RfcDestinationManager.GetDestination("PRO_router");
            RfcRepository SapRfcRepository = configSap.Repository;
            IRfcFunction rfcFunction = SapRfcRepository.CreateFunction("ZMOV_CREATE_RECEP_PROCESO_LIMO");

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
            rfcFunction.SetValue("I_MI", import.I_MI);
            IRfcTable rfcTable_ITEMS_I = rfcFunction.GetTable("ITEMS");
            foreach (ZMOV_CREATE_RECEP_PROCESO_LIMO_ITEMS row in import.ITEMS)
            {
                rfcTable_ITEMS_I.Append();
                ZMOV_CREATE_RECEP_PROCESO_LIMO_ITEMS datoTabla = new ZMOV_CREATE_RECEP_PROCESO_LIMO_ITEMS();
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
                rfcTable_ITEMS_I.SetValue("ZLIMON_VARIEDAD", row.ZLIMON_VARIEDAD);
                rfcTable_ITEMS_I.SetValue("ZLIMON_VARIEDAD_ET", row.ZLIMON_VARIEDAD_ET);
                rfcTable_ITEMS_I.SetValue("ZLIMON_CATEGORIA", row.ZLIMON_CATEGORIA);
                rfcTable_ITEMS_I.SetValue("ZLIMON_CALIBRE", row.ZLIMON_CALIBRE);
                rfcTable_ITEMS_I.SetValue("ZPRODUCTOR", row.ZPRODUCTOR);
                rfcTable_ITEMS_I.SetValue("ZPRODUCTOR_ET", row.ZPRODUCTOR_ET);
                rfcTable_ITEMS_I.SetValue("ZNUM_PLU", row.ZNUM_PLU);
                rfcTable_ITEMS_I.SetValue("ZPLU", row.ZPLU);
                rfcTable_ITEMS_I.SetValue("ZETIQUETADO", row.ZETIQUETADO);
                rfcTable_ITEMS_I.SetValue("ZARMADO_CJ", row.ZARMADO_CJ);
                rfcTable_ITEMS_I.SetValue("ZQUIMICO", row.ZQUIMICO);
                rfcTable_ITEMS_I.SetValue("ZNUM_EXPO", row.ZNUM_EXPO);
                rfcTable_ITEMS_I.SetValue("ZTIPO_RECEPCION", row.ZTIPO_RECEPCION);
                rfcTable_ITEMS_I.SetValue("ZCSP_EXTERNO", row.ZCSP_EXTERNO);
            }
            rfcFunction.SetValue("ITEMS", rfcTable_ITEMS_I);
            rfcFunction.Invoke(configSap);
            string aa = rfcFunction.ToString();
            responce_ZMOV_CREATE_RECEP_PROCESO_LIMO res = new responce_ZMOV_CREATE_RECEP_PROCESO_LIMO();
            res.MATERIALDOCUMENT = rfcFunction.GetString("MATERIALDOCUMENT");
            res.PEDIDO = rfcFunction.GetString("PEDIDO");
            IRfcTable rfcTable_ITEMS = rfcFunction.GetTable("ITEMS");
            res.ITEMS = new ZMOV_CREATE_RECEP_PROCESO_LIMO_ITEMS[rfcTable_ITEMS.RowCount];
            int i_ITEMS = 0;
            foreach (IRfcStructure row in rfcTable_ITEMS)
            {
                ZMOV_CREATE_RECEP_PROCESO_LIMO_ITEMS datoTabla = new ZMOV_CREATE_RECEP_PROCESO_LIMO_ITEMS();
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
                datoTabla.ZLIMON_VARIEDAD = row.GetString("ZLIMON_VARIEDAD");
                datoTabla.ZLIMON_VARIEDAD_ET = row.GetString("ZLIMON_VARIEDAD_ET");
                datoTabla.ZLIMON_CATEGORIA = row.GetString("ZLIMON_CATEGORIA");
                datoTabla.ZLIMON_CALIBRE = row.GetString("ZLIMON_CALIBRE");
                datoTabla.ZPRODUCTOR = row.GetString("ZPRODUCTOR");
                datoTabla.ZPRODUCTOR_ET = row.GetString("ZPRODUCTOR_ET");
                datoTabla.ZNUM_PLU = row.GetString("ZNUM_PLU");
                datoTabla.ZPLU = row.GetString("ZPLU");
                datoTabla.ZETIQUETADO = row.GetString("ZETIQUETADO");
                datoTabla.ZARMADO_CJ = row.GetString("ZARMADO_CJ");
                datoTabla.ZQUIMICO = row.GetString("ZQUIMICO");
                datoTabla.ZNUM_EXPO = row.GetString("ZNUM_EXPO");
                datoTabla.ZTIPO_RECEPCION = row.GetString("ZTIPO_RECEPCION");
                datoTabla.ZCSP_EXTERNO = row.GetString("ZCSP_EXTERNO");
                res.ITEMS[i_ITEMS] = datoTabla; ++i_ITEMS;
            }
            IRfcTable rfcTable_LOG = rfcFunction.GetTable("LOG");
            res.LOG = new ZMOV_CREATE_RECEP_PROCESO_LIMO_LOG[rfcTable_LOG.RowCount];
            int i_LOG = 0;
            foreach (IRfcStructure row in rfcTable_LOG)
            {
                ZMOV_CREATE_RECEP_PROCESO_LIMO_LOG datoTabla = new ZMOV_CREATE_RECEP_PROCESO_LIMO_LOG();
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
    public class request_ZMOV_CREATE_RECEP_PROCESO_LIMO
    {
        public ZMOV_CREATE_RECEP_PROCESO_LIMO_HEADER HEADER;
        public String I_MI;
        public ZMOV_CREATE_RECEP_PROCESO_LIMO_ITEMS[] ITEMS;
    }
    public class responce_ZMOV_CREATE_RECEP_PROCESO_LIMO
    {
        public String MATERIALDOCUMENT;
        public String PEDIDO;
        public ZMOV_CREATE_RECEP_PROCESO_LIMO_ITEMS[] ITEMS;
        public ZMOV_CREATE_RECEP_PROCESO_LIMO_LOG[] LOG;
    }
    public class ZMOV_CREATE_RECEP_PROCESO_LIMO_HEADER
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
    public class ZMOV_CREATE_RECEP_PROCESO_LIMO_ITEMS
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
        public String ZLIMON_VARIEDAD;
        public String ZLIMON_VARIEDAD_ET;
        public String ZLIMON_CATEGORIA;
        public String ZLIMON_CALIBRE;
        public String ZPRODUCTOR;
        public String ZPRODUCTOR_ET;
        public String ZNUM_PLU;
        public String ZPLU;
        public String ZETIQUETADO;
        public String ZARMADO_CJ;
        public String ZQUIMICO;
        public String ZNUM_EXPO;
        public String ZTIPO_RECEPCION;
        public String ZCSP_EXTERNO;
    }
    public class ZMOV_CREATE_RECEP_PROCESO_LIMO_LOG
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