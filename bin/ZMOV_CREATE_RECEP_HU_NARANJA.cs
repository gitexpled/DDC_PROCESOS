using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SAP.Middleware.Connector;

namespace rfcBaika
{
    public class ZMOV_CREATE_RECEP_HU_NARANJA
    {
        public responce_ZMOV_CREATE_RECEP_HU_NARANJA sapRun(request_ZMOV_CREATE_RECEP_HU_NARANJA import)
        {
            RfcDestination configSap = RfcDestinationManager.GetDestination("PRO_router");
            RfcRepository SapRfcRepository = configSap.Repository;
            IRfcFunction rfcFunction = SapRfcRepository.CreateFunction("ZMOV_CREATE_RECEP_HU_NARANJA");

            RfcStructureMetadata obj_ZMOV_ST_HEADER_PROC_NARANJA = SapRfcRepository.GetStructureMetadata("ZMOV_ST_HEADER_PROC_NARANJA");
            IRfcStructure datos_ZMOV_ST_HEADER_PROC_NARANJA = obj_ZMOV_ST_HEADER_PROC_NARANJA.CreateStructure();
            datos_ZMOV_ST_HEADER_PROC_NARANJA.SetValue("BUKRS", import.HEADER.BUKRS);
            datos_ZMOV_ST_HEADER_PROC_NARANJA.SetValue("EKORG", import.HEADER.EKORG);
            datos_ZMOV_ST_HEADER_PROC_NARANJA.SetValue("EKGRP", import.HEADER.EKGRP);
            datos_ZMOV_ST_HEADER_PROC_NARANJA.SetValue("BSART", import.HEADER.BSART);
            datos_ZMOV_ST_HEADER_PROC_NARANJA.SetValue("BUDAT", import.HEADER.BUDAT);
            datos_ZMOV_ST_HEADER_PROC_NARANJA.SetValue("LIFNR", import.HEADER.LIFNR);
            datos_ZMOV_ST_HEADER_PROC_NARANJA.SetValue("XBLNR", import.HEADER.XBLNR);
            datos_ZMOV_ST_HEADER_PROC_NARANJA.SetValue("BKTXT", import.HEADER.BKTXT);
            rfcFunction.SetValue("HEADER", datos_ZMOV_ST_HEADER_PROC_NARANJA);
            RfcStructureMetadata obj_ZMOV_ST_HDR_HU_CREA = SapRfcRepository.GetStructureMetadata("ZMOV_ST_HDR_HU_CREA");
            IRfcStructure datos_ZMOV_ST_HDR_HU_CREA = obj_ZMOV_ST_HDR_HU_CREA.CreateStructure();
            datos_ZMOV_ST_HDR_HU_CREA.SetValue("PACK_MAT", import.HEADER_HU.PACK_MAT);
            datos_ZMOV_ST_HDR_HU_CREA.SetValue("HU_EXID", import.HEADER_HU.HU_EXID);
            datos_ZMOV_ST_HDR_HU_CREA.SetValue("EXT_ID_HU_2", import.HEADER_HU.EXT_ID_HU_2);
            datos_ZMOV_ST_HDR_HU_CREA.SetValue("CONTENT", import.HEADER_HU.CONTENT);
            datos_ZMOV_ST_HDR_HU_CREA.SetValue("PACK_MAT_CUSTOMER", import.HEADER_HU.PACK_MAT_CUSTOMER);
            datos_ZMOV_ST_HDR_HU_CREA.SetValue("PACKAGE_CAT", import.HEADER_HU.PACKAGE_CAT);
            datos_ZMOV_ST_HDR_HU_CREA.SetValue("KZGVH", import.HEADER_HU.KZGVH);
            datos_ZMOV_ST_HDR_HU_CREA.SetValue("HU_GRP1", import.HEADER_HU.HU_GRP1);
            datos_ZMOV_ST_HDR_HU_CREA.SetValue("HU_GRP2", import.HEADER_HU.HU_GRP2);
            datos_ZMOV_ST_HDR_HU_CREA.SetValue("HU_GRP3", import.HEADER_HU.HU_GRP3);
            datos_ZMOV_ST_HDR_HU_CREA.SetValue("HU_GRP4", import.HEADER_HU.HU_GRP4);
            datos_ZMOV_ST_HDR_HU_CREA.SetValue("HU_GRP5", import.HEADER_HU.HU_GRP5);
            datos_ZMOV_ST_HDR_HU_CREA.SetValue("LGORT_DS", import.HEADER_HU.LGORT_DS);
            rfcFunction.SetValue("HEADER_HU", datos_ZMOV_ST_HDR_HU_CREA);
            IRfcTable rfcTable_ITEMS_I = rfcFunction.GetTable("ITEMS");
            foreach (ZMOV_CREATE_RECEP_HU_NARANJA_ITEMS row in import.ITEMS)
            {
                rfcTable_ITEMS_I.Append();
                ZMOV_CREATE_RECEP_HU_NARANJA_ITEMS datoTabla = new ZMOV_CREATE_RECEP_HU_NARANJA_ITEMS();
                rfcTable_ITEMS_I.SetValue("STCK_TYPE", row.STCK_TYPE);
                rfcTable_ITEMS_I.SetValue("MATERIAL", row.MATERIAL);
                rfcTable_ITEMS_I.SetValue("BATCH", row.BATCH);
                rfcTable_ITEMS_I.SetValue("QUANTITY", row.QUANTITY);
                rfcTable_ITEMS_I.SetValue("PO_UNIT", row.PO_UNIT);
                rfcTable_ITEMS_I.SetValue("HSDAT", row.HSDAT);
                rfcTable_ITEMS_I.SetValue("PLANT", row.PLANT);
                rfcTable_ITEMS_I.SetValue("STGE_LOC", row.STGE_LOC);
                rfcTable_ITEMS_I.SetValue("FREE_ITEM", row.FREE_ITEM);
                rfcTable_ITEMS_I.SetValue("ZNARANJA_VARIEDAD", row.ZNARANJA_VARIEDAD);
                rfcTable_ITEMS_I.SetValue("ZNARANJA_CATEGORIA", row.ZNARANJA_CATEGORIA);
                rfcTable_ITEMS_I.SetValue("ZNARANJA_CALIBRE", row.ZNARANJA_CALIBRE);
                rfcTable_ITEMS_I.SetValue("ZPRODUCTOR", row.ZPRODUCTOR);
                rfcTable_ITEMS_I.SetValue("ZSAG_SDP", row.ZSAG_SDP);
                rfcTable_ITEMS_I.SetValue("ZSAG_CSG", row.ZSAG_CSG);
                rfcTable_ITEMS_I.SetValue("ZSAG_CSP", row.ZSAG_CSP);
                rfcTable_ITEMS_I.SetValue("ZSAG_CSP_COMUNA", row.ZSAG_CSP_COMUNA);
                rfcTable_ITEMS_I.SetValue("ZSAG_CSP_PROVINCIA", row.ZSAG_CSP_PROVINCIA);
                rfcTable_ITEMS_I.SetValue("ZSAG_CSP_PACKING", row.ZSAG_CSP_PACKING);
                rfcTable_ITEMS_I.SetValue("ZNARANJA_PLU", row.ZNARANJA_PLU);
            }
            rfcFunction.SetValue("ITEMS", rfcTable_ITEMS_I);
            rfcFunction.Invoke(configSap);
            string aa = rfcFunction.ToString();
            responce_ZMOV_CREATE_RECEP_HU_NARANJA res = new responce_ZMOV_CREATE_RECEP_HU_NARANJA();
            res.MATERIALDOCUMENT = rfcFunction.GetString("MATERIALDOCUMENT");
            res.PEDIDO = rfcFunction.GetString("PEDIDO");
            IRfcTable rfcTable_ITEMS = rfcFunction.GetTable("ITEMS");
            res.ITEMS = new ZMOV_CREATE_RECEP_HU_NARANJA_ITEMS[rfcTable_ITEMS.RowCount];
            int i_ITEMS = 0;
            foreach (IRfcStructure row in rfcTable_ITEMS)
            {
                ZMOV_CREATE_RECEP_HU_NARANJA_ITEMS datoTabla = new ZMOV_CREATE_RECEP_HU_NARANJA_ITEMS();
                datoTabla.STCK_TYPE = row.GetString("STCK_TYPE");
                datoTabla.MATERIAL = row.GetString("MATERIAL");
                datoTabla.BATCH = row.GetString("BATCH");
                datoTabla.QUANTITY = row.GetDecimal("QUANTITY");
                datoTabla.PO_UNIT = row.GetString("PO_UNIT");
                datoTabla.HSDAT = row.GetString("HSDAT");
                datoTabla.PLANT = row.GetString("PLANT");
                datoTabla.STGE_LOC = row.GetString("STGE_LOC");
                datoTabla.FREE_ITEM = row.GetString("FREE_ITEM");
                datoTabla.ZNARANJA_VARIEDAD = row.GetString("ZNARANJA_VARIEDAD");
                datoTabla.ZNARANJA_CATEGORIA = row.GetString("ZNARANJA_CATEGORIA");
                datoTabla.ZNARANJA_CALIBRE = row.GetString("ZNARANJA_CALIBRE");
                datoTabla.ZPRODUCTOR = row.GetString("ZPRODUCTOR");
                datoTabla.ZSAG_SDP = row.GetString("ZSAG_SDP");
                datoTabla.ZSAG_CSG = row.GetString("ZSAG_CSG");
                datoTabla.ZSAG_CSP = row.GetString("ZSAG_CSP");
                datoTabla.ZSAG_CSP_COMUNA = row.GetString("ZSAG_CSP_COMUNA");
                datoTabla.ZSAG_CSP_PROVINCIA = row.GetString("ZSAG_CSP_PROVINCIA");
                datoTabla.ZSAG_CSP_PACKING = row.GetString("ZSAG_CSP_PACKING");
                datoTabla.ZNARANJA_PLU = row.GetString("ZNARANJA_PLU");
                res.ITEMS[i_ITEMS] = datoTabla; ++i_ITEMS;
            }
            IRfcTable rfcTable_LOG = rfcFunction.GetTable("LOG");
            res.LOG = new ZMOV_CREATE_RECEP_HU_NARANJA_LOG[rfcTable_LOG.RowCount];
            int i_LOG = 0;
            foreach (IRfcStructure row in rfcTable_LOG)
            {
                ZMOV_CREATE_RECEP_HU_NARANJA_LOG datoTabla = new ZMOV_CREATE_RECEP_HU_NARANJA_LOG();
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
    public class request_ZMOV_CREATE_RECEP_HU_NARANJA
    {
        public ZMOV_CREATE_RECEP_HU_NARANJA_HEADER HEADER;
        public ZMOV_CREATE_RECEP_HU_NARANJA_HEADER_HU HEADER_HU;
        public ZMOV_CREATE_RECEP_HU_NARANJA_ITEMS[] ITEMS;
    }
    public class responce_ZMOV_CREATE_RECEP_HU_NARANJA
    {
        public String MATERIALDOCUMENT;
        public String PEDIDO;
        public ZMOV_CREATE_RECEP_HU_NARANJA_ITEMS[] ITEMS;
        public ZMOV_CREATE_RECEP_HU_NARANJA_LOG[] LOG;
    }
    public class ZMOV_CREATE_RECEP_HU_NARANJA_HEADER
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
    public class ZMOV_CREATE_RECEP_HU_NARANJA_HEADER_HU
    {
        public String PACK_MAT;
        public String HU_EXID;
        public String EXT_ID_HU_2;
        public String CONTENT;
        public String PACK_MAT_CUSTOMER;
        public String PACKAGE_CAT;
        public String KZGVH;
        public String HU_GRP1;
        public String HU_GRP2;
        public String HU_GRP3;
        public String HU_GRP4;
        public String HU_GRP5;
        public String LGORT_DS;
    }
    public class ZMOV_CREATE_RECEP_HU_NARANJA_ITEMS
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
        public String ZNARANJA_VARIEDAD;
        public String ZNARANJA_CATEGORIA;
        public String ZNARANJA_CALIBRE;
        public String ZPRODUCTOR;
        public String ZSAG_SDP;
        public String ZSAG_CSG;
        public String ZSAG_CSP;
        public String ZSAG_CSP_COMUNA;
        public String ZSAG_CSP_PROVINCIA;
        public String ZSAG_CSP_PACKING;
        public String ZNARANJA_PLU;
    }
    public class ZMOV_CREATE_RECEP_HU_NARANJA_LOG
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