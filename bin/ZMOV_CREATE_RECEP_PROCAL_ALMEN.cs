using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SAP.Middleware.Connector;

namespace rfcBaika
{
    public class ZMOV_CREATE_RECEP_PROCAL_ALMEN
    {
        public responce_ZMOV_CREATE_RECEP_PROCAL_ALMEN sapRun(request_ZMOV_CREATE_RECEP_PROCAL_ALMEN import)
        {
            RfcDestination configSap = RfcDestinationManager.GetDestination("PRO_router");
            RfcRepository SapRfcRepository = configSap.Repository;
            IRfcFunction rfcFunction = SapRfcRepository.CreateFunction("ZMOV_CREATE_RECEP_PROCAL_ALMEN");

            RfcStructureMetadata obj_ZMOV_ST_HEADER_CAL = SapRfcRepository.GetStructureMetadata("ZMOV_ST_HEADER_CAL");
            IRfcStructure datos_ZMOV_ST_HEADER_CAL = obj_ZMOV_ST_HEADER_CAL.CreateStructure();
            datos_ZMOV_ST_HEADER_CAL.SetValue("BUKRS", import.HEADER.BUKRS);
            datos_ZMOV_ST_HEADER_CAL.SetValue("EKORG", import.HEADER.EKORG);
            datos_ZMOV_ST_HEADER_CAL.SetValue("EKGRP", import.HEADER.EKGRP);
            datos_ZMOV_ST_HEADER_CAL.SetValue("BSART", import.HEADER.BSART);
            datos_ZMOV_ST_HEADER_CAL.SetValue("BUDAT", import.HEADER.BUDAT);
            datos_ZMOV_ST_HEADER_CAL.SetValue("LIFNR", import.HEADER.LIFNR);
            datos_ZMOV_ST_HEADER_CAL.SetValue("XBLNR", import.HEADER.XBLNR);
            datos_ZMOV_ST_HEADER_CAL.SetValue("BKTXT", import.HEADER.BKTXT);
            rfcFunction.SetValue("HEADER", datos_ZMOV_ST_HEADER_CAL);
            IRfcTable rfcTable_ITEM_CAL_I = rfcFunction.GetTable("ITEM_CAL");
            foreach (ZMOV_CREATE_RECEP_PROCAL_ALMEN_ITEM_CAL row in import.ITEM_CAL)
            {
                rfcTable_ITEM_CAL_I.Append();
                ZMOV_CREATE_RECEP_PROCAL_ALMEN_ITEM_CAL datoTabla = new ZMOV_CREATE_RECEP_PROCAL_ALMEN_ITEM_CAL();
                rfcTable_ITEM_CAL_I.SetValue("STCK_TYPE", row.STCK_TYPE);
                rfcTable_ITEM_CAL_I.SetValue("MATERIAL", row.MATERIAL);
                rfcTable_ITEM_CAL_I.SetValue("BATCH", row.BATCH);
                rfcTable_ITEM_CAL_I.SetValue("QUANTITY", row.QUANTITY);
                rfcTable_ITEM_CAL_I.SetValue("PO_UNIT", row.PO_UNIT);
                rfcTable_ITEM_CAL_I.SetValue("HSDAT", row.HSDAT);
                rfcTable_ITEM_CAL_I.SetValue("PLANT", row.PLANT);
                rfcTable_ITEM_CAL_I.SetValue("STGE_LOC", row.STGE_LOC);
                rfcTable_ITEM_CAL_I.SetValue("FREE_ITEM", row.FREE_ITEM);
                rfcTable_ITEM_CAL_I.SetValue("BATCH_GRANEL", row.BATCH_GRANEL);
                rfcTable_ITEM_CAL_I.SetValue("ZALMENDRA_CALIBRE", row.ZALMENDRA_CALIBRE);
                rfcTable_ITEM_CAL_I.SetValue("ZNUM_EXPORTA", row.ZNUM_EXPORTA);
                rfcTable_ITEM_CAL_I.SetValue("ZALMENDRA_VARIEDAD", row.ZALMENDRA_VARIEDAD);
            }
            rfcFunction.SetValue("ITEM_CAL", rfcTable_ITEM_CAL_I);
            rfcFunction.Invoke(configSap);
            string aa = rfcFunction.ToString();
            responce_ZMOV_CREATE_RECEP_PROCAL_ALMEN res = new responce_ZMOV_CREATE_RECEP_PROCAL_ALMEN();
            res.MATERIALDOCUMENT = rfcFunction.GetString("MATERIALDOCUMENT");
            res.PEDIDO = rfcFunction.GetString("PEDIDO");
            IRfcTable rfcTable_ITEM_CAL = rfcFunction.GetTable("ITEM_CAL");
            res.ITEM_CAL = new ZMOV_CREATE_RECEP_PROCAL_ALMEN_ITEM_CAL[rfcTable_ITEM_CAL.RowCount];
            int i_ITEM_CAL = 0;
            foreach (IRfcStructure row in rfcTable_ITEM_CAL)
            {
                ZMOV_CREATE_RECEP_PROCAL_ALMEN_ITEM_CAL datoTabla = new ZMOV_CREATE_RECEP_PROCAL_ALMEN_ITEM_CAL();
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
                datoTabla.ZALMENDRA_CALIBRE = row.GetString("ZALMENDRA_CALIBRE");
                datoTabla.ZNUM_EXPORTA = row.GetString("ZNUM_EXPORTA");
                datoTabla.ZALMENDRA_VARIEDAD = row.GetString("ZALMENDRA_VARIEDAD");
                res.ITEM_CAL[i_ITEM_CAL] = datoTabla; ++i_ITEM_CAL;
            }
            IRfcTable rfcTable_LOG = rfcFunction.GetTable("LOG");
            res.LOG = new ZMOV_CREATE_RECEP_PROCAL_ALMEN_LOG[rfcTable_LOG.RowCount];
            int i_LOG = 0;
            foreach (IRfcStructure row in rfcTable_LOG)
            {
                ZMOV_CREATE_RECEP_PROCAL_ALMEN_LOG datoTabla = new ZMOV_CREATE_RECEP_PROCAL_ALMEN_LOG();
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
    public class request_ZMOV_CREATE_RECEP_PROCAL_ALMEN
    {
        public ZMOV_CREATE_RECEP_PROCAL_ALMEN_HEADER HEADER;
        public ZMOV_CREATE_RECEP_PROCAL_ALMEN_ITEM_CAL[] ITEM_CAL;
    }
    public class responce_ZMOV_CREATE_RECEP_PROCAL_ALMEN
    {
        public String MATERIALDOCUMENT;
        public String PEDIDO;
        public ZMOV_CREATE_RECEP_PROCAL_ALMEN_ITEM_CAL[] ITEM_CAL;
        public ZMOV_CREATE_RECEP_PROCAL_ALMEN_LOG[] LOG;
    }
    public class ZMOV_CREATE_RECEP_PROCAL_ALMEN_HEADER
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
    public class ZMOV_CREATE_RECEP_PROCAL_ALMEN_ITEM_CAL
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
        public String ZALMENDRA_CALIBRE;
        public String ZNUM_EXPORTA;
        public String ZALMENDRA_VARIEDAD;
    }
    public class ZMOV_CREATE_RECEP_PROCAL_ALMEN_LOG
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